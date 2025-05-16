/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    activityIndicatorColor: '#fff',
    textButton: '#EEEEEE',
    button: '#33CCFF',
    controlOverlay: 'rgba(0,0,0,0.3)',
    backgroundPlayPauseButton: 'rgba(0,0,0,0.6)',
    progressBar: '#444',
    bufferBar: '#888',
    playedBar: '#cd201f',
    backgroundDuration: '#020304',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    backgroundVideos: 'black',
  },
  toast: {
    success: '#4CAF50',
    error: '#F44336',
  },
};

export const activityIndicatorColor = '#fff';
