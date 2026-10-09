import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ReactNode } from 'react';
import { useSession } from '../session';
import { useTheme } from '../theme';
import { Chip, Screen } from './ui';

type Icon = keyof typeof Ionicons.glyphMap;
export type TabDef = { name: string; title: string; icon: Icon };

export function RoleTabs({ tabs }: { tabs: TabDef[] }) {
  const t = useTheme();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.accent,
        tabBarInactiveTintColor: t.muted,
        tabBarStyle: { backgroundColor: t.surface, borderTopColor: t.line },
        tabBarLabelStyle: { fontSize: 11, fontFamily: 'Rubik_600SemiBold' },
      }}
    >
      {tabs.map((d) => (
        <Tabs.Screen
          key={d.name}
          name={d.name}
          options={{
            title: d.title,
            tabBarIcon: ({ color, size }) => <Ionicons name={d.icon} size={size} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
}

export function MoreScreen({ children }: { children?: ReactNode }) {
  const { signOut } = useSession();
  return (
    <Screen title="עוד">
      {children}
      <Chip label="התנתקות" tone="warn" onPress={signOut} />
    </Screen>
  );
}
