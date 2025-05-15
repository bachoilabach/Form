import { YouTubeVideoListConfig } from '@/constants/YouTubeVideo';
import { useYouTubeVideo } from '@/hooks/useYouTubeVideo';
import { YouTubeVideoSearchItemsModel } from '@/models/youtube_video.model';
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
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

  const keyExtractor = (item: YouTubeVideoSearchItemsModel, index: number) =>
    `${item.id.videoId}-${index}`;

  if (isLoading && videos.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={isRefreshing}
      onRefresh={pullToRefresh}
      onEndReached={handleLoadMoreVideos}
      contentContainerStyle={{ paddingBottom: 20 }}
      {...YouTubeVideoListConfig}
      ListFooterComponent={isLoadingMore ? <ActivityIndicator size="large" /> : null}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default YouTubeVideoList;
