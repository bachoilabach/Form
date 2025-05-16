import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ExtendVideoModel } from '@/models/extend.model';
type ExtendVideoInforProps = {
  extendVideoDetail: ExtendVideoModel | undefined;
};
const ExtendVideoInformation = (ExtendDetailVideoProps: ExtendVideoInforProps) => {
  const { extendVideoDetail } = ExtendDetailVideoProps;
  if (!extendVideoDetail) {
    return (
      <View>
        <Text>Đang tải dữ liệu</Text>
      </View>
    );
  }

  return (
    <View style={styles.textContainer}>
      <Text style={styles.title}>{extendVideoDetail.title}</Text>
      <Text style={styles.author}>Tác giả: {extendVideoDetail.author}</Text>
      <Text style={styles.description}>Mô tả: {extendVideoDetail.description}</Text>
      <Text style={styles.releaseYear}>Phát hành: {extendVideoDetail.releaseYear}</Text>
    </View>
  );
};
export default memo(ExtendVideoInformation);
const styles = StyleSheet.create({
  textContainer: {
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 4,
  },
  releaseYear: {
    fontSize: 16,
    fontStyle: 'italic',
    color: Colors.light.text,
  },
});
