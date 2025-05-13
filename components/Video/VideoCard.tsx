import { PlayIcon } from '@/assets/icons/SvgIcon';
import { Colors } from '@/constants/Colors';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '@/constants/Video';
import { useVideoCard } from '@/hooks/useVideoCard';
import { VideoCardProps } from '@/models/video.model';
import { Image } from 'expo-image';
import { VideoView } from 'expo-video';
import { memo } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export default memo(function VideoCard(videoProps: VideoCardProps) {
  const { video, index, currentVisibleIndex } = videoProps;
  const {
    handlePlayOrPause,
    videoLandScape,
    player,
    isPlaying,
    userImageURL,
    isVideoLoaded,
    onFirstFrameRender,
    paddingBottomVideoCard,
    thumbnail,
  } = useVideoCard(video, index, currentVisibleIndex);
  return (
    <View style={[styles.card, paddingBottomVideoCard]}>
      {player && (
        <Pressable onPress={handlePlayOrPause}>
          <VideoView
            style={[videoLandScape]}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls={false}
            contentFit="contain"
            onFirstFrameRender={onFirstFrameRender}
          />
        </Pressable>
      )}

      {!isVideoLoaded && (
        <View style={[videoLandScape, styles.thumbnailWrapper]}>
          <Image
            source={{ uri: thumbnail }}
            style={[StyleSheet.absoluteFill, styles.thumbnail]}
            contentFit="cover"
            priority={'low'}
          />
          <ActivityIndicator size="large" color="white" style={styles.spinner} />
        </View>
      )}

      {!isPlaying && isVideoLoaded && (
        <View style={styles.playPause}>
          <PlayIcon />
        </View>
      )}

      <View style={styles.videoInformation}>
        <Image source={{ uri: userImageURL }} style={styles.userAva} />
        <Text style={styles.title}>ID: {video.id}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: VIDEO_WIDTH,
    height: VIDEO_HEIGHT,
    paddingTop: 48,
    backgroundColor: Colors.dark.backgroundVideos,
  },
  playPause: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -12 }],
    opacity: 0.4,
    zIndex: 2,
  },
  videoInformation: {
    position: 'absolute',
    bottom: 120,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    zIndex: 3,
  },
  title: {
    color: Colors.light.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userAva: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  thumbnailWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  thumbnail: {
    zIndex: 1,
    opacity: 0.4,
  },

  spinner: {
    zIndex: 2,
  },
});
