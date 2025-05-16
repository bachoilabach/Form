import ExntendVideoList from '@/components/ExtendVideo/ExntendVideoList';
import ExtendVideoInformation from '@/components/ExtendVideo/ExtendVideoInformation';
import ProgressBar from '@/components/ExtendVideo/ProgressBar';
import VideoControl from '@/components/ExtendVideo/VideoControl';
import { Colors } from '@/constants/Colors';
import { VIDEO_WIDTH } from '@/constants/Video';
import { YOUTUBE_VIDEO_HEIGHT } from '@/constants/YouTubeVideo';
import { useExtendVideoDetail } from '@/hooks/useVideoExtendDetail';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { memo, useRef } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';

const ExtendVideoDetail = () => {
  const { params } = useRoute();
  const { id } = params as { id: string };
  const videoRef = useRef<VideoRef>(null);

  const {
    extendDetailVideo,
    isFetching,
    isFirstFrameRendered,
    showControls,
    isPlaying,
    togglePlay,
    handleFirstFrameRender,
    onBuffer,
    onLoad,
    onProgress,
    currentTime,
    duration,
    doubleTapToSeekForward,
    doubleTapToSeekBackward,
    showSeekBackwardIcon,
    showSeekForwardIcon,
    singleTapToOpenControl,
    currentTimeForUI,
  } = useExtendVideoDetail({ id, videoRef: videoRef });

  if (isFetching) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView>
      <View style={styles.videoWrapper}>
        <View>
          <Video
            ref={videoRef}
            source={{ uri: extendDetailVideo?.url }}
            style={styles.video}
            resizeMode="contain"
            onBuffer={onBuffer}
            onLoad={onLoad}
            onProgress={onProgress}
            onReadyForDisplay={handleFirstFrameRender}
          />
          <VideoControl
            isFirstFrameRendered={isFirstFrameRendered}
            showControls={showControls}
            togglePlayPause={togglePlay}
            isPlaying={isPlaying}
            showSeekBackwardIcon={showSeekBackwardIcon}
            showSeekForwardIcon={showSeekForwardIcon}
            singleTapToOpenControl={singleTapToOpenControl}
            doubleTapToSeekBackward={doubleTapToSeekBackward}
            doubleTapToSeekForward={doubleTapToSeekForward}
            currentTimeForUI={currentTimeForUI}
            duration={duration}
          />

          {!isFirstFrameRendered && (
            <View style={styles.thumbnailWrapper}>
              <Image
                source={{ uri: extendDetailVideo?.thumbnail }}
                style={styles.thumbnail}
                contentFit="cover"
                priority="low"
              />
              <ActivityIndicator size="large" color="white" style={styles.spinner} />
            </View>
          )}
          <ProgressBar currentTime={currentTime} duration={duration} />
        </View>
      </View>

      <ExntendVideoList
        listHeaderComponent={<ExtendVideoInformation extendVideoDetail={extendDetailVideo} />}
      />
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

  thumbnailWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
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
    zIndex: 4,
    backgroundColor: Colors.light.backgroundPlayPauseButton,
    padding: 10,
    borderRadius: 999,
  },
});
