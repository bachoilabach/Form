import YouTubeVideoList from '@/components/Video/YouTubeVideoList';
import { NUMBER_OF_LINES, YOUTUBE_VIDEO_HEIGHT } from '@/constants/YouTubeVideo';
import { useYouTubeVideoDetail } from '@/hooks/useYouTubeVideoDetail';
import { useRoute } from '@react-navigation/native';
import React, { memo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoSnippet from '../(modals)/video-snippet';

const VIDEO_WIDTH = Dimensions.get('window').width;

export default memo(function YouTubeVideoDetail() {
  const { params } = useRoute();
  const { videoId, title } = params as { videoId: string; title: string };
  const {
    handleCloseVideoSnippet,
    hanldeOpenVideoSnippet,
    isVideoSnippetVisible,
    videoDetail,
    snippet,
    openYoutubeVideo,
    channelId
  } = useYouTubeVideoDetail(videoId);

  if (!videoDetail) return <ActivityIndicator />;

  const ListHeaderComponent = () => {
    return (
      <View style={styles.description}>
        <TouchableOpacity style={styles.controlsContainer} onPress={hanldeOpenVideoSnippet}>
          <Text numberOfLines={NUMBER_OF_LINES} style={styles.title}>
            {title}
          </Text>
        </TouchableOpacity>
        <View style={styles.openYoutubeContainer}>
          <Text style={styles.watchOnYoutube}>Watch on YouTube</Text>
          <TouchableOpacity onPress={() => openYoutubeVideo(videoId)} style={styles.openYoutube}>
            <Text style={styles.openYoutubeText}>Open</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <YoutubePlayer
          height={YOUTUBE_VIDEO_HEIGHT}
          width={VIDEO_WIDTH}
          videoId={videoId}
          play={true}
        />
        <YouTubeVideoList channelId={channelId} ListHeaderComponent={<ListHeaderComponent />} />
      </View>
      {isVideoSnippetVisible && (
        <VideoSnippet onClose={handleCloseVideoSnippet} snippet={snippet} />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  more: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'light',
  },
  description: {
    padding: 10,
    zIndex: 999,
  },
  openYoutubeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openYoutube: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginTop: 10,
  },
  openYoutubeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  watchOnYoutube: {
    fontSize: 16,
    fontWeight: 'light',
  },
});
