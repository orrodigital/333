import { Slot, Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../src/libs/queryClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
        <Slot />
        <StatusBar style="auto" />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}