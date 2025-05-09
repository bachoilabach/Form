import VideoCard from '@/components/Video/VideoCard';
import { Colors } from '@/constants/Colors';
import { END_REACHED_THRESHOLD } from '@/constants/Video';
import { FlatListVideoConfig } from '@/enums/Videos';
import { useVideos } from '@/hooks/useVideos';
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
    videos,
    isLoading,
    handleLoadMoreVideos,
    isRefreshing,
    pullToRefresh,
    isLoadingMore,
    currentVisibleIndex,
    onViewableItemsChanged,
    viewabilityConfig,
  } = useVideos();
  const renderItem = ({ item, index }: any) => (
    <VideoCard video={item} index={index} currentVisibleIndex={currentVisibleIndex} />
  );

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
      {isLoading ? (
        <SafeAreaView>
          <ActivityIndicator size={'large'} color={'#fff'} />
        </SafeAreaView>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={videos}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderItem}
            {...FlatListVideoConfig}
            onEndReached={handleLoadMoreVideos}
            onEndReachedThreshold={END_REACHED_THRESHOLD}
            refreshing={isRefreshing}
            onRefresh={pullToRefresh}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            ListFooterComponent={
              isLoadingMore ? <ActivityIndicator size={'large'} color={'#fff'} /> : null
            }
            contentContainerStyle={{paddingBottom: 100}}
          />
        </View>
      )}
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
