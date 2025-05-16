import axios, { AxiosError, isAxiosError } from 'axios';
import { Status } from '@/hooks/useShowToast';
import { toastService } from '@/services/toast.services';

const httpSurvey = axios.create({
  baseURL: 'http://10.10.113.12:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpSurvey.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

const extractAxiosErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    return (
      (error.response.data as any)?.message || error.response.statusText || 'Unknown server error'
    );
  } else if (error.request) {
    return 'No response received from server';
  } else {
    return error.message;
  }
};

httpSurvey.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (isAxiosError(error)) {
      const message = extractAxiosErrorMessage(error);
      toastService.showToast(Status.error, message);
    } else {
      toastService.showToast(Status.error, 'Unexpected error occurred');
    }

    return Promise.reject(error);
  },
);

export default httpSurvey;
