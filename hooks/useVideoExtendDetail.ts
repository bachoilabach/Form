import { timeUpdateEventConfig } from '@/constants/ExtendVideo';
import { ExtendVideoModel } from '@/models/extend.model';
import { getDetailExtendVideo } from '@/services/extend.services';
import { useEvent } from 'expo';
import { useVideoPlayer } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { DimensionValue } from 'react-native';
import Toast from 'react-native-toast-message';

export function useExtendVideoDetail(id: string, url: string) {
  const [extendDetailVideo, setExtendVideoDetail] = useState<ExtendVideoModel>();

  const [isFetching, setFetching] = useState<boolean>(false);
  const [isFirstFrameRendered, setFirstFrameRendered] = useState<boolean>(false);
  const [showControls, setShowControls] = useState(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const hideControlsTimeout = useRef<number | null>(null);

  const player = useVideoPlayer({ uri: url }, (player) => {
    player.showNowPlayingNotification = true;
    player.bufferOptions = {
      minBufferForPlayback: 5,
      preferredForwardBufferDuration: 30,
      maxBufferBytes: 0,
      waitsToMinimizeStalling: true,
    };
    player.timeUpdateEventInterval = 1;
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const updateCurrentTime = useEvent(player, 'timeUpdate', {
    currentTime: player.currentTime,
    ...timeUpdateEventConfig,
  });
  const status = useEvent(player, 'statusChange', {
    status: player.status,
  });

  const handleStatusChange = () => {
    if (status.status === 'loading') {
      setIsBuffering(true);
    } else {
      setIsBuffering(false);
    }
  };

  useEffect(() => {
    handleStatusChange();
  }, [status]);

  const handleGetExtendDetailVideo = async () => {
    try {
      setFetching(true);
      const res = await getDetailExtendVideo(id);
      const result = res[0];
      setExtendVideoDetail(result);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    handleGetExtendDetailVideo();
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

  const hideControl = () => {
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setShowControls(true);
      player.pause();
    } else {
      player.play();
      hideControl();
    }
  };

  const toggleControlsWithTimeout = () => {
    if (!showControls) {
      setShowControls(true);

      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }

      if (!isPlaying) {
        hideControl();
      }
    } else {
      setShowControls(false);
    }
  };

  const handleFirstFrameRender = () => {
    setFirstFrameRendered(true);
  };

  const { currentTime } = player ?? 0;
  const { duration } = player ?? 1;
  const { bufferedPosition } = player ?? 0;

  const playedPercentage = (currentTime / duration) * 100;
  const bufferedPercentage = (bufferedPosition / duration) * 100;

  const bufferedBarStyle = {
    width: `${bufferedPercentage}%` as DimensionValue,
  };
  const playedBarStyle = {
    width: `${playedPercentage}%` as DimensionValue,
  };
  const handleSeekBySeconds = (second: number) =>{
    player.seekBy(second)
  }

  return {
    player,
    extendDetailVideo,
    isFetching,
    isFirstFrameRendered,
    showControls,
    isPlaying,
    togglePlayPause,
    handleFirstFrameRender,
    toggleControlsWithTimeout,
    updateCurrentTime,
    isBuffering,
    bufferedBarStyle,
    playedBarStyle,
    currentTime,
    duration,
    handleSeekBySeconds
  };
}
