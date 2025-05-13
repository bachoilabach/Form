import { Platform } from "react-native";

export const KEY_BOARD_OFFSET = Platform.OS === 'ios' ? 100 : 0
export const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
