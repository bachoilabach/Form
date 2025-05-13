export interface VideoFile {
  url: string;
  width: number;
  height: number;
  size: number;
  thumbnail: string;
}

export interface VideoFiles {
  large: VideoFile;
  medium: VideoFile;
  small: VideoFile;
  tiny: VideoFile;
}

export interface VideoModel {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration: number;
  videos: VideoFiles;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  noAiTraining: boolean;
}
export interface VideoResponse {
  total: number;
  totalHits: number;
  hits: VideoModel[];
}

export type VideoParams = {
  q: string;
  per_page: number;
  page: number;
};

export type VideoCardProps = {
  video: VideoModel;
  index: number;
  currentVisibleIndex: number;
};
