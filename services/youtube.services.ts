import { BASE_URL, MAX_RESULTS, TYPE } from '@/constants/YouTubeVideo';
import { YouTubeVideoPart } from '@/enums/YouTube';
import { VideoDetailModel, YouTubeVideoSearchModel } from '@/models/youtube_video.model';
import {
  SearchVideosArgs,
  YouTubeSearchParams,
  YouTubeVideoDetailsParams,
} from '@/types/youtubeApi.types';
import { createParams } from '@/utils/youTubeUltill';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const searchVideos = async (
  searchVideoArgs: SearchVideosArgs,
): Promise<YouTubeVideoSearchModel> => {
  try {
    const { query, nextPageToken, channelId } = searchVideoArgs;
    const params: YouTubeSearchParams = {
      part: YouTubeVideoPart.SNIPPET,
      maxResults: MAX_RESULTS,
      q: query,
      type: TYPE,
      pageToken: nextPageToken || '',
      channelId: channelId || '',
    };
    const res = await axios.get<YouTubeSearchParams,YouTubeVideoSearchModel>(`${BASE_URL}/search`, {
      params: createParams({ ...params }),
    });
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
    return {} as YouTubeVideoSearchModel;
  }
};

export const getVideoDetails = async (videoId: string): Promise<VideoDetailModel> => {
  try {
    const params: YouTubeVideoDetailsParams = {
      part: `${YouTubeVideoPart.CONTENT_DETAILS},${YouTubeVideoPart.SNIPPET}`,
      id: videoId,
    };
    const res = await axios.get<YouTubeVideoDetailsParams,VideoDetailModel>(`${BASE_URL}/videos`, {
      params: createParams({
        ...params,
      }),
    });
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.message,
    });
    return {} as VideoDetailModel;
  }
};
