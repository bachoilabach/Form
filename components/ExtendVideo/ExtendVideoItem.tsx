import { Colors } from '@/constants/Colors';
import { VIDEO_WIDTH } from '@/constants/Video';
import { YOUTUBE_VIDEO_HEIGHT } from '@/constants/YouTubeVideo';
import { ExtendVideoModel } from '@/models/extend.model';
import { changeTime } from '@/utils/extendVideo';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ExtendVideoItem = (extendVideoProps: ExtendVideoModel) => {
  const { thumbnail, title, duration, releaseYear, author, id, url } = extendVideoProps;
  const handleMoveToExtendDetailVideo = () => {
    router.push({
      pathname: '/(videos)/extend-video-detail',
      params: { id: id, url: url, thumbnail: thumbnail },
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleMoveToExtendDetailVideo}>
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
        <Text style={[styles.section, styles.time]}>{changeTime(duration)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.section}>Release: {releaseYear}</Text>
        <Text style={styles.section}>Author: {author}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ExtendVideoItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  thumbnailWrapper: {
    width: VIDEO_WIDTH,
    height: YOUTUBE_VIDEO_HEIGHT,
    paddingHorizontal: 12,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    rowGap: 4,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  section: {
    fontSize: 16,
    fontWeight: '500',
  },
  time: {
    backgroundColor: Colors.light.backgroundDuration,
    padding: 4,
    position: 'absolute',
    bottom: 10,
    right: 20,
    borderRadius: 8,
    color: '#fff',
  },
});
