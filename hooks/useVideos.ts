import { ITEM_VISIBLE_PERCENT_THRESHOLD } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { getVideos } from '@/services/video.services';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';

type LoadingState = {
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
};

export function useVideos() {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState<number>(0);

  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
  });

  const setLoadingFlags = (state: Partial<LoadingState>) =>
    setLoadingState((prev) => ({ ...prev, ...state }));

  const handleGetVideos = async (requestedPage: number) => {
    const isInitial = requestedPage === 1 && !loadingState.isRefreshing;

    try {
      if (isInitial) setLoadingFlags({ isLoading: true });
      if (!isInitial) setLoadingFlags({ isLoadingMore: true });

      const res = await getVideos(requestedPage);
      const { hits } = res;

      if (requestedPage === 1) {
        setVideos(hits);
      } else {
        setVideos((prev) => [...prev, ...hits]);
      }
      setPage(requestedPage);
    } catch (error: any) {
      Toast.show({ type: 'error', text1: error.message });
    } finally {
      setLoadingFlags({ isLoading: false, isLoadingMore: false, isRefreshing: false });
    }
  };

  const pullToRefresh = async () => {
    setLoadingFlags({ isRefreshing: true });
    await handleGetVideos(1);
  };

  const handleLoadMoreVideos = async () => {
    if (Object.values(loadingState).some(Boolean)) return;
    await handleGetVideos(page + 1);
  };

  useEffect(() => {
    handleGetVideos(1);
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
