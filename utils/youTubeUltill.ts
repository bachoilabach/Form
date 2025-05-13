import { API_KEY } from '@/constants/YouTubeVideo';

export const createParams = (params: Record<string, string | number>) => ({
  ...params,
  key: API_KEY,
});

export const youtubeUrl = (videoId: string) => `vnd.youtube://${videoId}`;
