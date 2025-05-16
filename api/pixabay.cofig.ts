import axios, { AxiosError, isAxiosError } from 'axios';
import { Status } from '@/hooks/useShowToast';
import { toastService } from '@/services/toast.services';

const httpPixabay = axios.create({
  baseURL: 'https://pixabay.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpPixabay.interceptors.request.use(
  (config) => {
    if (!config.params) config.params = {};
    config.params['key'] = '49295111-1f2715b732cb0635e7d8dcf58';
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

httpPixabay.interceptors.response.use(
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

export default httpPixabay;
