import { GestureType } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

export type ExtendVideoControlType = {
  showSeekBackwardIcon: boolean;
  singleTapToOpenControl: GestureType;
  doubleTapToSeekBackward: GestureType;
  doubleTapToSeekForward: GestureType;
  showSeekForwardIcon: boolean;
  isFirstFrameRendered: boolean;
  showControls: boolean;
  togglePlayPause: () => void;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

export type ProgressBarType = {
  currentTime: number,
  duration: number
};
