import { YouTubeVideoListConfig } from '@/constants/YouTubeVideo';
import { useYouTubeVideo } from '@/hooks/useYouTubeVideo';
import { YouTubeVideoSearchItemsModel } from '@/models/youtube_video.model';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import YouTubeVideoItem from './YouTubeVideoItem';
type YouTubeVideoListProps = {
  channelId?: string;
  ListHeaderComponent?: React.ReactElement;
};
const YouTubeVideoList = (YouTubeVideoProps: YouTubeVideoListProps) => {
  const { channelId, ListHeaderComponent } = YouTubeVideoProps;
  const { isLoading, videos, isRefreshing, pullToRefresh, handleLoadMoreVideos, isLoadingMore } =
    useYouTubeVideo(channelId);

  const renderItem = ({ item }: { item: YouTubeVideoSearchItemsModel }) => (
    <YouTubeVideoItem {...item} />
  );

  if (isLoading && videos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id.videoId}-${index}`}
        refreshing={isRefreshing}
        onRefresh={pullToRefresh}
        onEndReached={handleLoadMoreVideos}
        contentContainerStyle={{ paddingBottom: 20 }}
        {...YouTubeVideoListConfig}
        ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" /> : null}
        ListHeaderComponent={ListHeaderComponent}
      />
    </SafeAreaView>
  );
};

export default YouTubeVideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
