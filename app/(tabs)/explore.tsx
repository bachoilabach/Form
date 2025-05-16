import VideoCard from '@/components/Video/VideoCard';
import { Colors } from '@/constants/Colors';
import { END_REACHED_THRESHOLD } from '@/constants/Video';
import { FlatListVideoConfig } from '@/enums/Videos';
import { useVideos } from '@/hooks/useVideos';
import { VideoModel } from '@/models/video.model';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Explore() {
  const {
    videoList,
    isLoading,
    pullToRefresh,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
    handleLoadMoreVideos,
  } = useVideos();
  const renderItem = ({ item, index }: { item: VideoModel; index: number }) => (
    <VideoCard video={item} index={index} currentVisibleIndex={currentVisibleIndex} />
  );
  const keyExtractor = (item: VideoModel, index: number) => `${item.id}-${index}`;
  if (isLoading && videoList.length === 0) {
    return (
      <SafeAreaView>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </SafeAreaView>
    );
  }
  if (videoList.length === 0) {
    return (
      <Text>Không có video</Text>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupButton}>
        <TouchableOpacity onPress={pullToRefresh}>
          <Text style={styles.textButton}>For you</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pullToRefresh}>
          <Text style={styles.textButton}>Explore</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={videoList}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          {...FlatListVideoConfig}
          onEndReached={handleLoadMoreVideos}
          onEndReachedThreshold={END_REACHED_THRESHOLD}
          refreshing={isLoading}
          onRefresh={pullToRefresh}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          ListFooterComponent={
            isLoading ? <ActivityIndicator size={'large'} color={'#fff'} /> : null
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignContent: 'center',
    backgroundColor: Colors.dark.backgroundVideos,
  },
  groupButton: {
    position: 'absolute',
    top: 50,
    left: '50%',
    zIndex: 999,
    transform: [{ translateX: -80 }],
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: Colors.light.textButton,
    fontSize: 24,
  },
});
