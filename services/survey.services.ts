import httpSurvey from '@/api/survey.config';
import { SurveyResponse } from '@/models/survey.model';

export const fetchSurvey = async (): Promise<SurveyResponse[]> => {
  const res = await httpSurvey.get<any, SurveyResponse[]>('/surveys');
  return res;
};

export const submitSurveys = async (
  survey: SurveyResponse,
): Promise<SurveyResponse | undefined> => {
  const res = await httpSurvey.post<SurveyResponse>('/surveys', survey);
  return res;
};
