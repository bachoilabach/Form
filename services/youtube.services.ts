import httpYoutube from '@/api/youtube.config';
import { MAX_RESULTS, TYPE } from '@/constants/YouTubeVideo';
import { YouTubeVideoPart } from '@/enums/YouTube';
import { VideoDetailModel, YouTubeVideoSearchModel } from '@/models/youtubeVideo.model';
import {
  SearchVideosArgs,
  YouTubeSearchParams,
  YouTubeVideoDetailsParams,
} from '@/types/youtubeApi.types';

export const searchVideos = async (
  searchVideoArgs: SearchVideosArgs,
): Promise<YouTubeVideoSearchModel> => {
  const { query, nextPageToken, channelId } = searchVideoArgs;
  const params: YouTubeSearchParams = {
    part: YouTubeVideoPart.SNIPPET,
    maxResults: MAX_RESULTS,
    q: query,
    type: TYPE,
    pageToken: nextPageToken || '',
    channelId: channelId || '',
  };
  const res = await httpYoutube.get<YouTubeSearchParams, YouTubeVideoSearchModel>('/search', {
    params: { ...params },
  });
  return res;
};

export const getVideoDetails = async (videoId: string): Promise<VideoDetailModel> => {
  const params: YouTubeVideoDetailsParams = {
    id: videoId,
    part: `${YouTubeVideoPart.CONTENT_DETAILS},${YouTubeVideoPart.SNIPPET}`,
  };
  const res = await httpYoutube.get<YouTubeVideoDetailsParams, VideoDetailModel>('/videos', {
    params: {
      ...params,
    },
  });
  return res;
};
