import { ForwardIcon, PauseIcon, PlayIcon } from '@/assets/icons/SvgIcon';
import ExntendVideoList from '@/components/Video/ExntendVideoList';
import { Colors } from '@/constants/Colors';
import { VIDEO_WIDTH } from '@/constants/Video';
import { YOUTUBE_VIDEO_HEIGHT } from '@/constants/YouTubeVideo';
import { useExtendVideoDetail } from '@/hooks/useVideoExtendDetail';
import { formatTime } from '@/utils/extendVideo';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { VideoView } from 'expo-video';
import React, { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const ExtendVideoDetail = () => {
  const { params } = useRoute();
  const { id, url, thumbnail } = params as { id: string; url: string; thumbnail: string };
  const {
    extendDetailVideo,
    togglePlayPause,
    isFetching,
    showControls,
    isFirstFrameRendered,
    handleFirstFrameRender,
    toggleControlsWithTimeout,
    isPlaying,
    player,
    isBuffering,
    bufferedBarStyle,
    playedBarStyle,
    currentTime,
    duration,
    handleSeekBySeconds,
  } = useExtendVideoDetail(id, url);
  const doubleTapRight = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        handleSeekBySeconds(10);
      }
    });
  const ListHeaderComponent = () => {
    return (
      <View style={styles.textContainer}>
        {extendDetailVideo ? (
          <>
            <Text style={styles.title}>{extendDetailVideo.title}</Text>
            <Text style={styles.author}>Tác giả: {extendDetailVideo.author}</Text>
            <Text style={styles.description}>Mô tả: {extendDetailVideo.description}</Text>
            <Text style={styles.releaseYear}>Phát hành: {extendDetailVideo.releaseYear}</Text>
          </>
        ) : (
          <Text>Đang tải dữ liệu...</Text>
        )}
      </View>
    );
  };

  if (isFetching) return <ActivityIndicator size={'large'} />;

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={toggleControlsWithTimeout}>
        <View style={styles.videoWrapper}>
          <VideoView
            player={player}
            style={styles.video}
            nativeControls={false}
            onFirstFrameRender={handleFirstFrameRender}
          />
          <View style={styles.progressBarContainer}>
            <View style={[styles.bufferedBar, bufferedBarStyle]} />
            <View style={[styles.playedBar, playedBarStyle]} />
          </View>
          <View style={{zIndex:10}}>
            <GestureDetector gesture={Gesture.Exclusive(doubleTapRight)}>
              <ForwardIcon />
            </GestureDetector>
          </View>
          {showControls && (
            <>
              <View style={styles.duration}>
                <Text
                  style={styles.textDuration}
                >{`${formatTime(currentTime)}/${formatTime(duration)}`}</Text>
              </View>
              <View style={[styles.controlsOverlay, StyleSheet.absoluteFill]}>
                {!isFirstFrameRendered || isBuffering ? (
                  <ActivityIndicator size="large" color="white" style={styles.spinner} />
                ) : (
                  <Pressable onPress={togglePlayPause} style={styles.playPauseButton}>
                    <Text style={styles.playPauseText}>
                      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
                    </Text>
                  </Pressable>
                )}
              </View>
            </>
          )}

          {!isFirstFrameRendered && (
            <View style={styles.thumbnailWrapper}>
              <Image
                source={{ uri: thumbnail }}
                style={[styles.thumbnail]}
                contentFit="cover"
                priority={'low'}
              />
              <ActivityIndicator size="large" color="white" style={styles.spinner} />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>

      <ExntendVideoList listHeaderComponent={<ListHeaderComponent />} />
    </SafeAreaView>
  );
};

export default memo(ExtendVideoDetail);

const styles = StyleSheet.create({
  video: {
    width: VIDEO_WIDTH,
    height: YOUTUBE_VIDEO_HEIGHT,
  },
  videoWrapper: {
    backgroundColor: 'black',
    position: 'relative',
  },
  controlsOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.controlOverlay,
  },
  playPauseButton: {
    padding: 10,
    backgroundColor: Colors.light.backgroundPlayPauseButton,
    borderRadius: 50,
  },
  playPauseText: {
    fontSize: 30,
    color: 'white',
  },
  thumbnailWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  thumbnail: {
    opacity: 0.4,
    zIndex: 2,
    width: VIDEO_WIDTH,
    height: YOUTUBE_VIDEO_HEIGHT,
    ...StyleSheet.absoluteFillObject,
  },
  spinner: {
    zIndex: 3,
    backgroundColor: Colors.light.backgroundPlayPauseButton,
    padding: 8,
    borderRadius: 999,
  },
  progressBarContainer: {
    height: 4,
    width: '100%',
    backgroundColor: Colors.light.progressBar,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 4,
  },

  bufferedBar: {
    height: '100%',
    backgroundColor: Colors.light.bufferBar,
    position: 'absolute',
    left: 0,
  },

  playedBar: {
    height: '100%',
    backgroundColor: Colors.light.playedBar,
    position: 'absolute',
    left: 0,
  },
  textContainer: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  releaseYear: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.light.text,
  },
  duration: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    padding: 4,
    backgroundColor: Colors.light.backgroundDuration,
    borderRadius: 12,
  },
  textDuration: {
    color: Colors.light.textButton,
  },
  forward: {},
});
