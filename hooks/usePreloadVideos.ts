import { VideoModel } from '@/models/video.model';
import { useVideoPlayer, VideoSource } from 'expo-video';
import { useEffect } from 'react';

export function usePreloadVideos(videos: VideoModel[], currentIndex: number) {
  const player1 = useVideoPlayer(null, (p) => {
    p.loop = true;
  });

  const player2 = useVideoPlayer(null, (p) => {
    p.loop = true;
  });

  const preloadList = videos.slice(currentIndex + 1, currentIndex + 3);

  const getUrl = (video: VideoModel): string => {
    return video.videos.tiny.url;
  };

  useEffect(() => {
    if (preloadList[0]) {
      const source1: VideoSource = { uri: getUrl(preloadList[0]) };
      player1.replaceAsync(source1);
    }
    if (preloadList[1]) {
      const source2: VideoSource = { uri: getUrl(preloadList[1]) };
      player2.replaceAsync(source2);
    }
  }, [preloadList[0], preloadList[1]]);

  return {
    preloadPlayers: [player1, player2],
  };
}
