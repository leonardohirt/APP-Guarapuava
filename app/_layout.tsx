import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.cardBorderSubtle,
      primary: colors.gold,
    },
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { 
            fontWeight: '700',
            fontSize: 18,
          },
          headerShadowVisible: false,
        }}
      />
      <StatusBar style="light" />
    </ThemeProvider>
  );
}