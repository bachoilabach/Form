import { GestureType } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';
import { SharedValue } from 'react-native-reanimated';

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
  currentTimeForUI: number;
  duration: number;
};

export type ProgressBarType = {
  currentTime: SharedValue<number>;
  duration: number;
};
