import { YouTubeVideoSearchItemsModel } from '@/models/youtube_video.model';
import { searchVideos } from '@/services/youtube.services';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { LoadingState } from './useVideos';

export function useYouTubeVideo(channelId?: string) {
  const [videos, setVideos] = useState<YouTubeVideoSearchItemsModel[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    isRefreshing: false,
    isLoadingMore: false,
  });
  const setLoadingFlags = useCallback(
    (state: Partial<LoadingState>) => setLoadingState((prev) => ({ ...prev, ...state })),
    [],
  );

  const fetchYouTubeVideo = async (pageToken?: string, isRefresh = false) => {
    try {
      if (!pageToken && !isRefresh) setLoadingFlags({ isLoading: true });
      if (isRefresh) setLoadingFlags({ isRefreshing: true });
      if (pageToken && !isRefresh) setLoadingFlags({ isLoadingMore: true });

      const res = await searchVideos({
        query: 'nhạc remix',
        nextPageToken: pageToken,
        ...(channelId && { channelId }),
      });

      let { items, nextPageToken: newPageToken } = res;

      if (isRefresh || !pageToken) {
        items = items.sort(() => 0.5 - Math.random());
        setVideos(items);
      } else {
        setVideos((prev) => [...prev, ...items]);
      }

      setNextPageToken(newPageToken || null);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoadingFlags({ isLoading: false, isLoadingMore: false, isRefreshing: false });
    }
  };

  const pullToRefresh = async () => {
    await fetchYouTubeVideo(undefined, true);
  };

  const handleLoadMoreVideos = debounce(async () => {
    if (nextPageToken) {
      await fetchYouTubeVideo(nextPageToken);
    }
  }, 1000);

  useEffect(() => {
    fetchYouTubeVideo();
  }, []);

  return {
    videos,
    pullToRefresh,
    handleLoadMoreVideos,
    ...loadingState,
  };
}
