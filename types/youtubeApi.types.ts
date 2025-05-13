export interface YouTubeSearchParams {
  part: string;
  maxResults: number;
  q?: string;
  type: string;
  pageToken?: string;
  channelId?: string;
}

export interface SearchVideosArgs {
  query: string;
  nextPageToken?: string;
  channelId?: string;
}

export interface YouTubeVideoDetailsParams {
  part: string;
  id: string;
}
