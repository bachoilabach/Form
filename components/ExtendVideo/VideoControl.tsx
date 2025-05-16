import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from '@/assets/icons/SvgIcon';
import { Colors } from '@/constants/Colors';
import { ExtendVideoControlType } from '@/types/extendVideoControl.type';
import { formatTime } from '@/utils/extendVideo';

const VideoControl = (extendVideoControlProps: ExtendVideoControlType) => {
  const {
    currentTimeForUI,
    doubleTapToSeekBackward,
    doubleTapToSeekForward,
    duration,
    isFirstFrameRendered,
    showControls,
    isPlaying,
    showSeekBackwardIcon,
    showSeekForwardIcon,
    singleTapToOpenControl,
    togglePlayPause,
  } = extendVideoControlProps;
  return (
    <>
      {showSeekBackwardIcon && (
        <View style={styles.seekIconLeft}>
          <BackwardIcon />
        </View>
      )}

      {/* Gesture overlay */}
      <GestureDetector gesture={singleTapToOpenControl}>
        <View style={[StyleSheet.absoluteFillObject]} />
      </GestureDetector>

      {/* Gesture seek by */}
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.gestureRow}>
          <GestureDetector gesture={doubleTapToSeekBackward}>
            <View style={styles.backward} />
          </GestureDetector>

          <View style={styles.center} />

          <GestureDetector gesture={doubleTapToSeekForward}>
            <View style={styles.forward} />
          </GestureDetector>
        </View>
      </View>

      {showSeekForwardIcon && (
        <View style={styles.seekIconRight}>
          <ForwardIcon />
        </View>
      )}

      {isFirstFrameRendered && showControls && (
        <>
          <View style={[styles.controlsOverlay, StyleSheet.absoluteFill]} pointerEvents="box-none">
            <Pressable onPress={togglePlayPause} style={styles.playPauseButton}>
              {!isPlaying ? <PlayIcon /> : <PauseIcon />}
            </Pressable>
          </View>
          <View style={styles.duration}>
            <Text
              style={styles.textDuration}
            >{`${formatTime(currentTimeForUI)}/${formatTime(duration)}`}</Text>
          </View>
        </>
      )}
    </>
  );
};

export default memo(VideoControl);

const styles = StyleSheet.create({
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.controlOverlay,
    zIndex: 5,
  },
  playPauseButton: {
    padding: 20,
    backgroundColor: Colors.light.backgroundPlayPauseButton,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    zIndex: 4,
    backgroundColor: Colors.light.backgroundPlayPauseButton,
    padding: 10,
    borderRadius: 999,
  },
  control: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gestureRow: {
    flexDirection: 'row',
    flex: 1,
  },
  backward: {
    flex: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  center: {
    flex: 1,
  },
  forward: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  seekIconLeft: {
    position: 'absolute',
    left: 50,
    top: '50%',
    zIndex: 10,
  },
  seekIconRight: {
    position: 'absolute',
    right: 50,
    top: '50%',
    zIndex: 10,
  },
  duration: {
    backgroundColor: Colors.light.backgroundDuration,
    padding: 4,
    position: 'absolute',
    bottom: 10,
    left: 10,
    borderRadius: 12,
    zIndex: 11,
  },
  textDuration: {
    color: Colors.light.textButton,
  },
});
