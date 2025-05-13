import { SurveyResponse } from '@/models/survey.model';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const fetchSurvey = async (): Promise<SurveyResponse[]> => {
  try {
    const res = await axios.get<any, SurveyResponse[]>('http://10.10.113.30:3001/surveys');
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error.message,
    });
  }
};

export const submitSurveys = async (
  survey: SurveyResponse,
): Promise<SurveyResponse | undefined> => {
  try {
    const res = await axios.post<SurveyResponse>('http://10.10.113.30:3001/surveys', survey);
    const { data } = res;
    return data;
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: error.message,
    });
  }
};
