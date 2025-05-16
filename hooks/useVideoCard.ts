import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEvent } from 'expo';
import { useVideoPlayer } from 'expo-video';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '@/constants/Video';
import { VideoModel } from '@/models/video.model';

export function useVideoCard(video: VideoModel, index: number, currentVisibleIndex: number) {
  const bottomTabHeight = useBottomTabBarHeight();
  const { userImageURL } = video;
  const { width, height, url, thumbnail } = video.videos.tiny;

  const shouldPlay = useMemo(() => index === currentVisibleIndex, [index, currentVisibleIndex]);
  const paddingBottomVideoCard = {
    paddingBottom: bottomTabHeight,
  };
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);

  const player = useVideoPlayer({ uri: url }, (player) => {
    player.loop = true;
  });

  const videoLandScape = useMemo(() => {
    const isLandscape = width > height;
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

  const handlePlayVideo = useCallback(() => {
    if (shouldPlay) {
      player.play();
    } else {
      player.pause();
    }
  }, [shouldPlay]);

  const togglePlay = useCallback(() => {
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
    togglePlay,
    player,
    isVideoLoaded,
    onFirstFrameRender,
    paddingBottomVideoCard,
    thumbnail,
  };
}
