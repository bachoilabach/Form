import { VIDEO_HEIGHT, VIDEO_WIDTH } from './Video';

export const API_KEY = 'AIzaSyA8fcAt6gHvJWywSEHae4i0Ns01xCrOj-s';
export const BASE_URL = 'https://www.googleapis.com/youtube/v3';
export const MAX_RESULTS = 20;
export const PART = 'snippet';
export const TYPE = 'video';
export const YOUTUBE_VIDEO_HEIGHT = (VIDEO_WIDTH * 9) / 16;
export const VIDEO_SNIPPET_HEIGHT = VIDEO_HEIGHT - YOUTUBE_VIDEO_HEIGHT - 100;
export const VIDEO_SNIPPET_THRESHOLD = 100;
export const VIDEO_SNIPPET_OFFSET = 10;

export const YouTubeVideoListConfig = {
  showsVerticalScrollIndicator: false,
  onEndReachedThreshold: 0.5,
  initialNumToRender: 10,
  maxToRenderPerBatch: 10,
};

export const NUMBER_OF_LINES = 2