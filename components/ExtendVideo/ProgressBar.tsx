import { Colors } from '@/constants/Colors';
import { ProgressBarType } from '@/types/extendVideoControl.type';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const ProgressBar = ({ currentTime, duration }: ProgressBarType) => {
  const animatedStyle = useAnimatedStyle(() => {
    const percentage = (currentTime.value / duration) * 100;
    return {
      width: `${percentage}%`,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.light.progressBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 6,
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.light.playedBar,
  },
});
