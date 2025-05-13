import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
export enum SnapAlignments {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export enum DecelerationRates {
  FAST = 'fast',
  NORMAL = 'normal',
}

export const FlatListVideoConfig = {
  pagingEnabled: true,
  initialNumToRender: 5,
  snapToInterval: height,
  decelerationRate: DecelerationRates.FAST,
  showsVerticalScrollIndicator: false,
  snapToAlignment: SnapAlignments.START,
  removeClippedSubviews: true,
  windowSize: 5,
  maxToRenderPerBatch: 4,
};
