import { useCallback, useEffect, useState } from 'react';
import { SurveyResponse } from '@/models/survey.model';
import { fetchSurvey } from '@/services/survey.services';
import { toastService } from '@/services/toast.services';
import { extractAxiosErrorMessage } from '@/utils/errorUtil';
import { Status } from './useShowToast';

export function useSurvey() {
  const [surveys, setSurveys] = useState<SurveyResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefresh] = useState<boolean>(false);

  const handleGetAllSurveys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchSurvey();
      if (!res || res.length === 0) {
        setSurveys([]);
        toastService.showToast(Status.error, 'Không tìm thấy survey nào');
        return;
      }
      setSurveys(res);
    } catch (error) {
      extractAxiosErrorMessage(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const pullToRefresh = useCallback(async () => {
    setRefresh(true);
    await handleGetAllSurveys();
    setRefresh(false);
  }, [handleGetAllSurveys]);

  useEffect(() => {
    handleGetAllSurveys();
  }, []);

  return {
    surveys,
    loading,
    isRefreshing,
    pullToRefresh,
  };
}
