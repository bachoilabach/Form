import { DURATION_VIDEO_SNIPPET } from '@/constants/Video';
import {
  VIDEO_SNIPPET_HEIGHT,
  VIDEO_SNIPPET_OFFSET,
  VIDEO_SNIPPET_THRESHOLD,
} from '@/constants/YouTubeVideo';
import { VideoSnippetModel } from '@/models/youtube_video.model';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type VideoSnippetModal = {
  onClose: () => void;
  snippet: VideoSnippetModel;
};

const VideoSnippet = (videoSnippetProps: VideoSnippetModal) => {
  const translateY = useRef(new Animated.Value(VIDEO_SNIPPET_HEIGHT)).current;
  const { onClose, snippet } = videoSnippetProps;
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: DURATION_VIDEO_SNIPPET,
      useNativeDriver: true,
    }).start();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > VIDEO_SNIPPET_OFFSET;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > VIDEO_SNIPPET_THRESHOLD) {
          Animated.timing(translateY, {
            toValue: VIDEO_SNIPPET_HEIGHT,
            duration: DURATION_VIDEO_SNIPPET,
            useNativeDriver: true,
          }).start(() => {
            onClose();
          });
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: DURATION_VIDEO_SNIPPET,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: VIDEO_SNIPPET_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
      <View style={styles.content}>
        <View style={styles.header} {...panResponder.panHandlers}>
          <Text style={styles.headerTitle}>Nội dung mô tả</Text>
          <Pressable onPress={handleClose}>
            <Text style={styles.buttonClose}>X</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.body}>
          <Text style={styles.title}>{snippet.title}</Text>
          <Text style={styles.description}>{snippet.description}</Text>
          <Text style={styles.channel}>Kênh: {snippet.channelTitle}</Text>
          <Text style={styles.publish}>Phát hành: {snippet.publishedAt}</Text>
        </ScrollView>
      </View>
    </Animated.View>
  );
};

export default VideoSnippet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: VIDEO_SNIPPET_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonClose: {
    fontSize: 20,
    padding: 10,
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  channel: {
    fontSize: 14,
    marginBottom: 4,
  },
  publish: {
    fontSize: 14,
    marginBottom: 12,
  },
  thumbnailWrapper: {
    marginTop: 10,
    alignItems: 'center',
  },
  thumbnail: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
});
