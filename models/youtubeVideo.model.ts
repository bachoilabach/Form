export interface YouTubeVideoSearchModel {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeVideoSearchItemsModel[];
}
export interface YouTubeVideoSearchItemsModel {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoDetailModel {
  kind: string;
  etag: string;
  items: VideoDetailItem;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}
export interface VideoSnippetModel {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
    standard: Thumbnail;
    maxres: Thumbnail;
  };
  channelTitle: string;
  tags: string[];
  liveBroadcastContent: string;
  publishTime: string;
  localized: {
    title: string;
    description: string;
  };
}
export interface VideoDetailItem {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippetModel;
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: Record<string, unknown>;
    projection: string;
  };
}
