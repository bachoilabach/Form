import { initPage, ITEM_VISIBLE_PERCENT_THRESHOLD } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { getVideos } from '@/services/video.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

export type LoadingState = {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
};

export function useVideos() {
  const [videoList, setVideoList] = useState<VideoModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
  });

  const setLoadingFlags = useCallback(
    (state: Partial<LoadingState>) => setLoadingState((prev) => ({ ...prev, ...state })),
    [],
  );

  const cacheVideoList = useCallback(async (videos: VideoModel[]) => {
    try {
      const maxVideos = 50;
      const cacheData = {
        videos: videos.slice(-maxVideos),
        timestamp: Date.now(),
      };
      await AsyncStorage.setItem('cachedVideos', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching videos:', error);
    }
  }, []);

  const loadCachedVideoList = useCallback(async () => {
    const ttl = 5 * 60 * 1000;
    try {
      const cached = await AsyncStorage.getItem('cachedVideos');
      if (!cached) return [];

      const { videos, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > ttl;

      if (isExpired) {
        await AsyncStorage.removeItem('cachedVideos');
        return [];
      }
      return videos;
    } catch (error) {
      console.error('Error retrieving cached videos:', error);
      return [];
    }
  }, []);

  const fetchVideos = async (requestedPage: number) => {
    const isInitial = requestedPage === initPage && !loadingState.isRefreshing;

    try {
      if (isInitial) setLoadingFlags({ isLoading: true });
      else setLoadingFlags({ isLoadingMore: true });

      const res = await getVideos(requestedPage);
      const { hits } = res;

      if (requestedPage === initPage) {
        setVideoList(hits);
        cacheVideoList(hits);
      } else {
        setVideoList((prev) => {
          const updatedList = [...prev, ...hits];
          cacheVideoList(updatedList);
          return updatedList;
        });
      }

      setCurrentPage(requestedPage);
    } catch (error: any) {
      Toast.show({ type: 'error', text1: error.message });
    } finally {
      setLoadingFlags({ isLoading: false, isLoadingMore: false, isRefreshing: false });
    }
  };

  const pullToRefresh = useCallback(async () => {
    setLoadingFlags({ isRefreshing: true });
    await AsyncStorage.removeItem('cachedVideos');
    await fetchVideos(initPage);
  }, []);

  const handleLoadMoreVideos = debounce(async () => {
    if (Object.values(loadingState).some(Boolean)) return;
    const nextPage = currentPage + 1;
    await fetchVideos(nextPage);
  }, 1000);

  const initializeVideos = async () => {
    const cached = await loadCachedVideoList();
    if (cached.length > 0) {
      setVideoList(cached);
    }
    await fetchVideos(initPage);
  };

  useEffect(() => {
    initializeVideos();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const firstVisibleIndex = viewableItems[0].index;
      setCurrentVisibleIndex(firstVisibleIndex ?? 0);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD,
  };

  return {
    videoList,
    ...loadingState,
    fetchVideos,
    handleLoadMoreVideos,
    pullToRefresh,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
  };
}
