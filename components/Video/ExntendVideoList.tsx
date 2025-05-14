import { ExtendVideoModel } from '@/models/extend.model';
import { getAllVideos } from '@/services/extend.services';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import ExtendVideoItem from './ExtendVideoItem';
type ExtendVideoListProps = {
  listHeaderComponent?: React.ReactElement;
};
const ExntendVideoList = (extendVideoListProps: ExtendVideoListProps) => {
  const { listHeaderComponent } = extendVideoListProps;
  const [videos, setVideos] = useState<ExtendVideoModel[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleGetVideos = async () => {
    try {
      setLoading(true);
      const res = await getAllVideos();
      setVideos(res);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetVideos();
  }, []);
  const renderItem = ({ item }: { item: ExtendVideoModel }) => <ExtendVideoItem {...item} />;
  if (loading) return <ActivityIndicator size={'large'} />;
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
