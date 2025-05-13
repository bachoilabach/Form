import { VIDEO_WIDTH } from '@/constants/Video';
import { YOUTUBE_VIDEO_HEIGHT } from '@/constants/YouTubeVideo';
import { YouTubeVideoSearchItemsModel } from '@/models/youtube_video.model';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const YouTubeVideoItem = (YouTubeVideoProps: YouTubeVideoSearchItemsModel) => {
  const { snippet, id } = YouTubeVideoProps;
  const { thumbnails, title, channelTitle } = snippet;
  const handleNavigateToVideoDetail = () => {
    router.push({
      pathname: '/(videos)/video-detail',
      params: { videoId: id.videoId, title: title },
    });
  };
  return (
    <TouchableOpacity style={[styles.card]} onPress={handleNavigateToVideoDetail}>
      <Image source={{ uri: thumbnails.high.url }} contentFit="cover" style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.channel}>{channelTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(YouTubeVideoItem);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  thumbnail: {
    width: VIDEO_WIDTH,
    height: YOUTUBE_VIDEO_HEIGHT,
  },
  infoContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  channel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
