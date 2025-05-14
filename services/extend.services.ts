import { ExtendVideoModel } from '@/models/extend.model';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getAllVideos = async (): Promise<ExtendVideoModel[]> => {
  try {
    const res = await axios.get<ExtendVideoModel[]>('http://localhost:3002/videos');
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
    return [];
  }
};

export const getDetailExtendVideo = async (videoId: string): Promise<ExtendVideoModel> => {
  try {
    const res = await axios.get<ExtendVideoModel>("http://localhost:3002/videos",{
      params : {
        id: videoId
      }
    });
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
    return {} as ExtendVideoModel;
  }
};
