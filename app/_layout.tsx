import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';

const EventDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#7C3AED',
    background: '#FAFAFF',
    card: '#FFFFFF',
    text: '#1A1033',
    border: '#E2E8F0',
  },
};

const EventDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#A78BFA',
    background: '#0D0B1A',
    card: '#1C1830',
    text: '#F1EEF9',
    border: '#2D2A4A',
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? EventDarkTheme : EventDefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        {/* Manter rotas legadas durante migração */}
        <Stack.Screen name="pages/notifications" />
        <Stack.Screen name="pages/profile" />
        <Stack.Screen name="pages/diary" />
        <Stack.Screen name="pages/page" />
        <Stack.Screen name="pages/settings/account" />
        <Stack.Screen name="pages/settings/notifications" />
        <Stack.Screen name="pages/settings/privacy" />
        <Stack.Screen name="pages/settings/sync" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true, title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
