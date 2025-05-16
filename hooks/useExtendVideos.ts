import { useEffect, useState } from 'react';
import { ExtendVideoModel } from '@/models/extend.model';
import { getAllVideos } from '@/services/extend.services';
import { toastService } from '@/services/toast.services';
import { extractAxiosErrorMessage } from '@/utils/errorUtil';
import { Status } from './useShowToast';

export function useExtendVideos() {
  const [videos, setVideos] = useState<ExtendVideoModel[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleGetVideos = async () => {
    try {
      setLoading(true);
      const res = await getAllVideos();
      if (!res || res.length === 0) {
        toastService.showToast(Status.error, 'Không có video nào');
        return;
      }
      setVideos(res);
    } catch (error) {
      extractAxiosErrorMessage(error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetVideos();
  }, []);
  return {
    loading,
    videos,
  };
}
