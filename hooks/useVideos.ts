import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { initPage, ITEM_VISIBLE_PERCENT_THRESHOLD } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { toastService } from '@/services/toast.services';
import { getVideos } from '@/services/video.services';
import { extractAxiosErrorMessage } from '@/utils/errorUtil';
import { Status } from './useShowToast';

export function useVideos() {
  const [videoList, setVideoList] = useState<VideoModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initPage);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const fetchVideos = async (requestedPage: number, isRefresh = false) => {
    const isInitialLoad = requestedPage === initPage && !isRefresh;
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await getVideos(requestedPage);
      if ((!res || res.length === 0) && requestedPage === initPage) {
        toastService.showToast(Status.error, 'Không có video nào');
        setVideoList([]);
        return;
      }
      const { hits } = res;

      if (isRefresh || isInitialLoad) {
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
    } catch (error) {
      extractAxiosErrorMessage(error);
      if (requestedPage === initPage) {
        setVideoList([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pullToRefresh = useCallback(async () => {
    await AsyncStorage.removeItem('cachedVideos');
    await fetchVideos(initPage, true);
  }, []);

  const handleLoadMoreVideos = debounce(async () => {
    if (isLoading) return;
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
    isLoading,
    fetchVideos,
    handleLoadMoreVideos,
    pullToRefresh,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
  };
}
