import axios, { AxiosError, isAxiosError } from 'axios';
import { Status } from '@/hooks/useShowToast';
import { toastService } from '@/services/toast.services';

const httpYoutube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpYoutube.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    config.params['key'] = process.env.EXPO_PUBLIC_API_KEY;
    return config;
  },
  (error) => Promise.reject(error),
);

const extractAxiosErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    return (
      (error.response.data as any)?.error?.message ||
      error.response.statusText ||
      'Unknown server error'
    );
  } else if (error.request) {
    return 'No response received from server';
  } else {
    return error.message;
  }
};

httpYoutube.interceptors.response.use(
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

export default httpYoutube;
