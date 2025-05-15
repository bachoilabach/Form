import { seekBackwardSecond, seekForwardSecond } from '@/constants/ExtendVideo';
import { ExtendVideoModel } from '@/models/extend.model';
import { getDetailExtendVideo } from '@/services/extend.services';
import { saveCurrentTime } from '@/utils/extendVideo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { VideoRef } from 'react-native-video';

type OnBufferData = { isBuffering: boolean };
type OnLoadData = { duration: number };
type OnProgressData = { currentTime: number };
type UseExtendVideoProps = {
  id: string;
  videoRef: RefObject<VideoRef>;
};
export function useExtendVideoDetail({ id, videoRef }: UseExtendVideoProps) {
  const [extendDetailVideo, setExtendVideoDetail] = useState<ExtendVideoModel>();
  const [isFetching, setFetching] = useState<boolean>(false);
  const [isFirstFrameRendered, setFirstFrameRendered] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isBuffering, setIsBuffering] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const currentTime = useSharedValue(0);
  const [duration, setDuration] = useState<number>(1);
  const hideControlsTimeout = useRef<number | null>(null);
  const [showSeekForwardIcon, setShowSeekForwardIcon] = useState(false);
  const [showSeekBackwardIcon, setShowSeekBackwardIcon] = useState(false);
  const [currentTimeForUI, setCurrentTimeForUI] = useState<number>(0);

  useEffect(() => {
    handleGetExtendDetailVideo();
    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, []);

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

  const hideControl = () => {
    hideControlsTimeout.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const onPlay = () => {
    videoRef.current.resume();
    setIsPlaying(true);
  };

  const onPause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  const toggleControlsWithTimeout = () => {
    if (!showControls) {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      hideControl();
    } else {
      setShowControls(false);
    }
  };

  const handleFirstFrameRender = () => {
    setFirstFrameRendered(true);
  };

  const handleSeekBySeconds = (second: number) => {
    videoRef.current.seek(currentTime.value + second);
  };

  const onBuffer = (data: OnBufferData) => {
    console.log('Buffering::', data.isBuffering);
    setIsBuffering(data.isBuffering);
  };

  const onLoad = async (data: OnLoadData) => {
    setDuration(data.duration);
    try {
      const saved = await AsyncStorage.getItem(`video-progress-${id}`);
      const savedTime = saved ? parseFloat(saved) : 0;

      if (savedTime && videoRef.current) {
        videoRef.current.seek(savedTime);
      }
    } catch (e) {
      console.log('Failed to load saved time', e);
    }
  };

  const onProgress = (data: OnProgressData) => {
    currentTime.value = data.currentTime;
    if (Math.floor(currentTime.value) % 5 === 0) {
      saveCurrentTime(id, currentTime.value);
    }
  };

  const showIconTemporarily = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 600);
  };

  const doubleTapToSeekForward = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(handleSeekBySeconds)(seekForwardSecond);
      runOnJS(showIconTemporarily)(setShowSeekForwardIcon);
    });

  const doubleTapToSeekBackward = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(handleSeekBySeconds)(seekBackwardSecond);
      runOnJS(showIconTemporarily)(setShowSeekBackwardIcon);
    });

  const singleTapToOpenControl = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      runOnJS(toggleControlsWithTimeout)();
    });

  useAnimatedReaction(
    () => currentTime.value,
    (value, prev) => {
      if (Math.floor(value) !== Math.floor(prev ?? 0)) {
        runOnJS(setCurrentTimeForUI)(value);
      }
    },
    [],
  );

  return {
    videoRef,
    extendDetailVideo,
    isFetching,
    isFirstFrameRendered,
    showControls,
    isPlaying,
    togglePlayPause,
    handleFirstFrameRender,
    toggleControlsWithTimeout,
    isBuffering,
    currentTime,
    duration,
    handleSeekBySeconds,
    onBuffer,
    onLoad,
    onProgress,
    doubleTapToSeekBackward,
    doubleTapToSeekForward,
    singleTapToOpenControl,
    showSeekForwardIcon,
    showSeekBackwardIcon,
    currentTimeForUI,
  };
}
