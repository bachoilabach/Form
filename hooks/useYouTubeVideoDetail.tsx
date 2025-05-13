import { VideoDetailItem } from '@/models/youtube_video.model';
import { getVideoDetails } from '@/services/youtube.services';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

export function useYouTubeVideoDetail(videoId: string) {
  const [videoDetail, setVideoDetail] = useState<VideoDetailItem>();
  const [isVideoSnippetVisible, setIsVideoSnippetVisible] = useState<boolean>(false);
  const hanldeOpenVideoSnippet = () => {
    setIsVideoSnippetVisible(true);
  };
  const handleCloseVideoSnippet = () => {
    setIsVideoSnippetVisible(false);
  };

  const handleGetVideoDetail = async () => {
    try {
      const res = await getVideoDetails(videoId);
      const { items }: { items: VideoDetailItem[] } = res;
      const videoItems = items[0];
      setVideoDetail(videoItems);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    handleGetVideoDetail();
  }, [videoId]);
  return {
    videoDetail,
    isVideoSnippetVisible,
    hanldeOpenVideoSnippet,
    handleCloseVideoSnippet,
  };
}
