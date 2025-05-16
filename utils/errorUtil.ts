import { isAxiosError } from 'axios';

export function extractAxiosErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return error.response?.data?.error?.message || error.response?.data?.message || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}
