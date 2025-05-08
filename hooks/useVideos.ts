import { ITEM_VISIBLE_PERCENT_THRESHOLD } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { getVideos } from '@/services/video.services';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

export function useVideos() {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);
  const handleGetVideos = async (requestedPage: number) => {
    try {
      if (requestedPage === 1 && !isRefreshing) {
        setLoading(true);
      }

      if (requestedPage !== 1) {
        setLoadingMore(true);
      }

      const res = await getVideos(requestedPage);
      const { hits } = res;
      if (requestedPage === 1) {
        setVideos(hits);
      } else {
        setVideos((prev) => [...prev, ...hits]);
      }

      setPage(requestedPage);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message,
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  const pullToRefresh = async () => {
    await handleGetVideos(1);
    setRefreshing(false);
  };

  const handleLoadMoreVideos = async () => {
    if (isLoadingMore || isRefreshing || isLoading) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    await handleGetVideos(nextPage);
  };

  useEffect(() => {
    handleGetVideos(1);
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
    isLoading,
    isRefreshing,
    isLoadingMore,
    handleGetVideos,
    handleLoadMoreVideos,
    pullToRefresh,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
  };
}
