import { Dimensions } from 'react-native';

export const PER_PAGE = 5;
export const QUERY = 'nature';

const { height, width } = Dimensions.get('window');
export const VIDEO_HEIGHT = height;
export const VIDEO_WIDTH = width;

export const END_REACHED_THRESHOLD = 2;

export const ITEM_VISIBLE_PERCENT_THRESHOLD = 80;

export const initPage = 1