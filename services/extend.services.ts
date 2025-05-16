import httpExtend from '@/api/extend.config';
import { ExtendVideoModel } from '@/models/extend.model';

export const getAllVideos = async (): Promise<ExtendVideoModel[]> => {
  const res = await httpExtend.get<ExtendVideoModel[]>('/videos');
  return res;
};

export const getDetailExtendVideo = async (videoId: string): Promise<ExtendVideoModel[]> => {
  const res = await httpExtend.get<ExtendVideoModel[]>('/videos', {
    params: {
      id: videoId,
    },
  });
  return res;
};
