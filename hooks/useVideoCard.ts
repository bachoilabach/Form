import { VIDEO_HEIGHT, VIDEO_WIDTH } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEvent } from 'expo';
import { useVideoPlayer } from 'expo-video';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useVideoCard(video: VideoModel, shouldPlay: boolean) {
  const bottomTabHeight = useBottomTabBarHeight();
  const { userImageURL } = video;
  const { width, height, url } = video.videos.tiny;
  const videoSource = {
    uri: url,
    useCaching: true,
  };
  const paddingBottomVideoCard = {
    paddingBottom: bottomTabHeight,
  };
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);

  const player = useVideoPlayer({ uri: url }, (player) => {
    player.loop = true;
  });

  const videoLandScape = useMemo(() => {
    let isLandscape = width > height;
    return isLandscape
      ? {
          width: VIDEO_HEIGHT,
          height: VIDEO_WIDTH,
          transform: [{ rotate: '90deg' }],
        }
      : {
          width: VIDEO_WIDTH,
          height: VIDEO_HEIGHT,
        };
  }, [video]);

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handlePlayVideo = () => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handlePlayOrPause = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, []);

  const onFirstFrameRender = () => {
    setVideoLoaded(true);
  };

  useEffect(() => {
    handlePlayVideo();
  }, [shouldPlay]);

  return {
    bottomTabHeight,
    userImageURL,
    videoLandScape,
    isPlaying,
    handlePlayOrPause,
    player,
    isVideoLoaded,
    onFirstFrameRender,
    paddingBottomVideoCard,
  };
}
