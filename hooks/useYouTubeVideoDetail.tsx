import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { VideoDetailItem, VideoSnippetModel } from '@/models/youtubeVideo.model';
import { toastService } from '@/services/toast.services';
import { getVideoDetails } from '@/services/youtube.services';
import { extractAxiosErrorMessage } from '@/utils/errorUtil';
import { youtubeUri } from '@/utils/youTubeUltil';
import { Status } from './useShowToast';

export function useYouTubeVideoDetail(videoId: string) {
  const [videoDetail, setVideoDetail] = useState<VideoDetailItem>();
  const [isVideoSnippetVisible, setIsVideoSnippetVisible] = useState<boolean>(false);
  const [snippet, setSnippet] = useState<VideoSnippetModel>();
  const hanldeOpenVideoSnippet = () => {
    setIsVideoSnippetVisible(true);
  };
  const handleCloseVideoSnippet = () => {
    setIsVideoSnippetVisible(false);
  };
  const handleGetVideoDetail = async () => {
    try {
      const res = await getVideoDetails(videoId);
      const { items }: { items: VideoDetailItem } = res;
      if (res! || !items) {
        setVideoDetail(undefined);
        setSnippet(undefined);
        const msg = 'Không tìm thấy video chi tiết';
        toastService.showToast(Status.error, msg);
        return;
      }
      const { snippet } = items[0];
      const videoItems = items[0];
      setVideoDetail(videoItems);
      setSnippet(snippet);
    } catch (error) {
      extractAxiosErrorMessage(error);
      setVideoDetail(undefined);
      setSnippet(undefined);
    }
  };

  useEffect(() => {
    handleGetVideoDetail();
  }, [videoId]);

  const openYoutubeVideo = async (videoId: string) => {
    Linking.openURL(youtubeUri(videoId)).catch((err) => console.error('Failed to open URL:', err));
  };
  return {
    videoDetail,
    isVideoSnippetVisible,
    hanldeOpenVideoSnippet,
    handleCloseVideoSnippet,
    snippet,
    openYoutubeVideo,
  };
}
