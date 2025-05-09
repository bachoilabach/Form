import { initPage, ITEM_VISIBLE_PERCENT_THRESHOLD } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { getVideos } from '@/services/video.services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

type LoadingState = {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
};

export function useVideos() {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [page, setPage] = useState<number>(initPage);
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

  const cacheVideos = useCallback(async (videos: VideoModel[]) => {
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

  const getCachedVideos = useCallback(async () => {
    const ttl = 5 * 60 * 1000
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

  const handleGetVideos = async (requestedPage: number) => {
    const isInitial = requestedPage === initPage && !loadingState.isRefreshing;

    try {
      if (isInitial) setLoadingFlags({ isLoading: true });
      if (!isInitial) setLoadingFlags({ isLoadingMore: true });

      const res = await getVideos(requestedPage);
      const { hits } = res;

      if (requestedPage === initPage) {
        setVideos(hits);
        cacheVideos(hits);
      } else {
        setVideos((prev) => {
          const updatedVideos = [...prev, ...hits];
          cacheVideos(updatedVideos);
          return updatedVideos;
        });
      }
      setPage(requestedPage);
    } catch (error: any) {
      Toast.show({ type: 'error', text1: error.message });
    } finally {
      setLoadingFlags({ isLoading: false, isLoadingMore: false, isRefreshing: false });
    }
  };

  const pullToRefresh = useCallback(async () => {
    setLoadingFlags({ isRefreshing: true });
    await AsyncStorage.removeItem('cachedVideos');
    await handleGetVideos(initPage);
  }, []);

  const handleLoadMoreVideos = debounce(async () => {
    if (Object.values(loadingState).some(Boolean)) return;
    const nextPage = page + 1
    await handleGetVideos(nextPage);
  }, 1000);

  const initVideos = async () => {
    const cachedVideos = await getCachedVideos();
    if (cachedVideos.length > 0) {
      setVideos(cachedVideos);
    }
    await handleGetVideos(initPage);
  };
  useEffect(() => {
    initVideos();
    return () => {};
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
    videos,
    ...loadingState,
    handleGetVideos,
    handleLoadMoreVideos,
    pullToRefresh,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
  };
}
