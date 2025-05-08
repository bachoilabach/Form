import http from '@/axios.cofig';
import { PER_PAGE, QUERY } from '@/constants/Video';
import { VideoParams, VideoResponse } from '@/models/video.model';
import Toast from 'react-native-toast-message';

export const getVideos = async (page: number): Promise<VideoResponse[]> => {
  try {
    const res = await http.get<VideoParams, VideoResponse[]>('/videos/', {
      params: {
        q: QUERY,
        per_page: PER_PAGE,
        page: page,
      },
    });
    return res;
  } catch (error: any) {
    console.log('❌ Lỗi:', error.message);
    Toast.show({
      type: 'error',
      text1: error.message,
    });
    return [];
  }
};
