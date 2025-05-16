import http from '@/api/pixabay.cofig';
import { PER_PAGE, QUERY } from '@/constants/Video';
import { VideoParams, VideoResponse } from '@/models/video.model';

export const getVideos = async (page: number): Promise<VideoResponse[]> => {
  const res = await http.get<VideoParams, VideoResponse[]>('/videos/', {
    params: {
      q: QUERY,
      per_page: PER_PAGE,
      page: page,
    },
  });
  return res;
};
