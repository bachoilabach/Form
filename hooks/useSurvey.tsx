import { SurveyResponse } from "@/models/survey.model";
import { fetchSurvey } from "@/services/survey.services";
import { useCallback, useEffect, useState } from "react";
import Toast from "react-native-toast-message";

export function useSurvey() {
  const [surveys, setSurveys] = useState<SurveyResponse[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefresh] = useState<boolean>(false);

  const handleGetAllSurveys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchSurvey();
      setSurveys(res);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
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
