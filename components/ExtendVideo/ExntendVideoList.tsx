import React from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useExtendVideos } from '@/hooks/useExtendVideos';
import { ExtendVideoModel } from '@/models/extend.model';
import ExtendVideoItem from './ExtendVideoItem';
type ExtendVideoListProps = {
  listHeaderComponent?: React.ReactElement;
};
const ExntendVideoList = (extendVideoListProps: ExtendVideoListProps) => {
  const { listHeaderComponent } = extendVideoListProps;
  const { loading, videos } = useExtendVideos();
  const renderItem = ({ item }: { item: ExtendVideoModel }) => <ExtendVideoItem {...item} />;
  if (loading && videos?.length === 0) {
    return <ActivityIndicator size={'large'} />;
  }
  if (videos?.length === 0) {
    return <Text>Không có video nào!</Text>;
  }
  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      ListHeaderComponent={listHeaderComponent}
    />
  );
};

export default ExntendVideoList;
