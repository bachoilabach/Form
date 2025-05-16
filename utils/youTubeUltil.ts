export const createParams = (params: Record<string, string | number>) => ({
  ...params,
  key: process.env.EXPO_PUBLIC_API_KEY,
});

export const youtubeUri = (videoId: string) => `vnd.youtube://${videoId}`;
