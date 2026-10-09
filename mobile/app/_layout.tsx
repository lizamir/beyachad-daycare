import { Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold } from '@expo-google-fonts/rubik';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupRtl } from '../src/rtl';
import { SessionProvider, useSession } from '../src/session';
import { useTheme } from '../src/theme';

setupRtl();

function Routes() {
  const { status, role } = useSession();
  const t = useTheme();
  const [fontsLoaded] = useFonts({ Rubik_400Regular, Rubik_500Medium, Rubik_600SemiBold, Rubik_700Bold });
  if (status === 'loading' || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: t.ground }}>
        <ActivityIndicator color={t.accent} />
      </View>
    );
  }
  const ready = status === 'ready';
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === 'out'}>
        <Stack.Screen name="index" />
      </Stack.Protected>
      <Stack.Protected guard={status === 'needsSetup'}>
        <Stack.Screen name="setup" />
      </Stack.Protected>
      <Stack.Protected guard={ready && role === 'parent'}>
        <Stack.Screen name="(parent)" />
      </Stack.Protected>
      <Stack.Protected guard={ready && role === 'staff'}>
        <Stack.Screen name="(staff)" />
      </Stack.Protected>
      <Stack.Protected guard={ready && role === 'admin'}>
        <Stack.Screen name="(admin)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <StatusBar style="dark" />
        <Routes />
      </SessionProvider>
    </SafeAreaProvider>
  );
}
