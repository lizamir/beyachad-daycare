import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { useSession } from '../session';
import { useTheme } from '../theme';
import { Card, Chip, Screen } from './ui';

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
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
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

export function MoreScreen({ items }: { items: string[] }) {
  const t = useTheme();
  const { signOut } = useSession();
  return (
    <Screen title="עוד">
      <Card>
        {items.map((label) => (
          <Pressable key={label} accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center' }}>
            <Text style={{ color: t.ink, fontSize: 17, textAlign: 'right' }}>{label}</Text>
          </Pressable>
        ))}
      </Card>
      <Chip label="התנתקות" tone="warn" onPress={signOut} />
    </Screen>
  );
}
