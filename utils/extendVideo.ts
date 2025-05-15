import AsyncStorage from '@react-native-async-storage/async-storage';

export function changeTime(time: string): string {
  let hour = 0;
  let minute = 0;

  const hourMatch = time.match(/(\d+)h/);
  if (hourMatch) {
    hour = parseInt(hourMatch[1], 10);
  }

  const minuteMatch = time.match(/(\d+)m/);
  if (minuteMatch) {
    minute = parseInt(minuteMatch[1], 10);
  }

  const result =
    hour === 0
      ? `${minute.toString().padStart(2, '0')}:00`
      : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`;
  return result;
}
export function formatTime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  } else {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

export const saveCurrentTime = async (videoId: string, time: number) => {
  try {
    await AsyncStorage.setItem(`video-progress-${videoId}`, time.toString());
  } catch (e) {
    console.log('Failed to save progress', e);
  }
};
