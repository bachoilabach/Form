import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { YouTubeVideoSearchItemsModel } from '@/models/youtubeVideo.model';
import { toastService } from '@/services/toast.services';
import { searchVideos } from '@/services/youtube.services';
import { FetchYouTubeVideoParams } from '@/types/youtubeApi.types';
import { extractAxiosErrorMessage } from '@/utils/errorUtil';
import { Status } from './useShowToast';

export function useYouTubeVideo(channelId?: string) {
  const [videos, setVideos] = useState<YouTubeVideoSearchItemsModel[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchYouTubeVideo = async ({ pageToken, isRefresh = false }: FetchYouTubeVideoParams) => {
    try {
      setIsLoading(true);

      const res = await searchVideos({
        query: 'nhạc remix',
        nextPageToken: pageToken,
        ...(channelId && { channelId }),
      });

      let { items, nextPageToken: newPageToken } = res;
      if (items.length === 0) {
        if (!pageToken || isRefresh) {
          toastService.showToast(Status.error, 'Không có video phù hợp');
          setVideos([]);
        } else {
          toastService.showToast(Status.error, 'Không có video để tải thêm');
        }
        return;
      }
      if (isRefresh || !pageToken) {
        items = items.sort(() => 0.5 - Math.random());
        setVideos(items);
      } else {
        setVideos((prev) => [...prev, ...items]);
      }
      setNextPageToken(newPageToken || null);
    } catch (error) {
      extractAxiosErrorMessage(error);
      if (!pageToken || isRefresh) {
        setVideos([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pullToRefresh = async () => {
    await fetchYouTubeVideo({ pageToken: undefined, isRefresh: true });
  };

  const handleLoadMoreVideos = useCallback(
    debounce(async () => {
      if (nextPageToken && !isLoading) {
        await fetchYouTubeVideo({ pageToken: nextPageToken });
      }
    }, 1000),
    [nextPageToken],
  );

  useEffect(() => {
    fetchYouTubeVideo({ pageToken: undefined, isRefresh: false });
  }, []);

  return {
    videos,
    pullToRefresh,
    handleLoadMoreVideos,
    isLoading,
  };
}
