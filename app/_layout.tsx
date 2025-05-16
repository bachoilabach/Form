import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ToastProvider } from '@/components/ToastMessage/ToastProvider';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Linking from 'expo-linking';
import { useEffect } from 'react';
import { Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const parsed = Linking.parse(url);
      console.log('Deeplink parsed:', parsed);

      if (parsed.hostname === 'videos') {
        const [screen, id] = parsed.path?.split('/') || [];

        if (screen === 'extend-video-detail' && id) {
          router.push({
            pathname: '/(videos)/extend-video-detail',
            params: { id },
          });
        }
      }
    });

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <>
      <GestureHandlerRootView>
        <ToastProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
              <Stack.Screen
                name="(modals)/survey-form"
                options={{
                  presentation: 'modal',
                  title: 'Survey Form',
                  headerRight: () => <Button title="Close" onPress={() => router.back()} />,
                }}
              />
              <Stack.Screen
                name="(modals)/video-snippet"
                options={{
                  presentation: 'modal',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(videos)/video-detail"
                options={{
                  title: 'Video Detail',
                  headerLeft: () => <Button title="Back" onPress={() => router.back()} />,
                }}
              />
              <Stack.Screen
                name="(videos)/extend-video-detail"
                options={{
                  title: '',
                  headerShown: false,
                  headerLeft: () => <Button title="Back" onPress={() => router.back()} />,
                }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    </>
  );
}
