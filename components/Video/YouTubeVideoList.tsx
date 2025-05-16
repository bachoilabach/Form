import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { YouTubeVideoListConfig } from '@/constants/YouTubeVideo';
import { useYouTubeVideo } from '@/hooks/useYouTubeVideo';
import { YouTubeVideoSearchItemsModel } from '@/models/youtubeVideo.model';
import YouTubeVideoItem from './YouTubeVideoItem';
type YouTubeVideoListProps = {
  channelId?: string;
  ListHeaderComponent?: React.ReactElement;
};
const YouTubeVideoList = (YouTubeVideoProps: YouTubeVideoListProps) => {
  const { channelId, ListHeaderComponent } = YouTubeVideoProps;
  const { isLoading, videos, pullToRefresh, handleLoadMoreVideos } = useYouTubeVideo(channelId);

  const renderItem = ({ item }: { item: YouTubeVideoSearchItemsModel }) => (
    <YouTubeVideoItem {...item} />
  );

  const keyExtractor = (item: YouTubeVideoSearchItemsModel, index: number) =>
    `${item.id.videoId}-${index}`;

  if (isLoading && videos.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  if (videos.length === 0) {
    return <Text style={styles.noVideosText}>Không có video nào!</Text>;
  }

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={isLoading}
      onRefresh={pullToRefresh}
      onEndReached={handleLoadMoreVideos}
      contentContainerStyle={{ paddingBottom: 20 }}
      {...YouTubeVideoListConfig}
      ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default YouTubeVideoList;

const styles = StyleSheet.create({
  noVideosText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
