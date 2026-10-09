import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, space, useTheme } from '../theme';

export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: t.ground }}
      contentContainerStyle={{ padding: space.lg, paddingTop: insets.top + space.lg, gap: space.md }}
    >
      <View style={{ gap: 2 }}>
        <Text accessibilityRole="header" style={[s.title, { color: t.ink }]}>{title}</Text>
        {subtitle ? <Text style={[s.sub, { color: t.muted }]}>{subtitle}</Text> : null}
      </View>
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const t = useTheme();
  return <View style={[s.card, { backgroundColor: t.surface, borderColor: t.line }, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: string }) {
  const t = useTheme();
  return <Text accessibilityRole="header" style={[s.section, { color: t.ink }]}>{children}</Text>;
}

export function Chip({
  label,
  tone = 'soft',
  onPress,
}: {
  label: string;
  tone?: 'soft' | 'warn' | 'danger';
  onPress?: () => void;
}) {
  const t = useTheme();
  const bg = tone === 'warn' ? t.warnSoft : tone === 'danger' ? t.dangerSoft : t.soft;
  const fg = tone === 'warn' ? t.warn : tone === 'danger' ? t.danger : t.accent;
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : 'text'}
      onPress={onPress}
      style={({ pressed }) => [s.chip, { backgroundColor: bg, opacity: pressed ? 0.7 : 1 }]}
    >
      <Text style={{ color: fg, fontWeight: '600', fontSize: 15 }}>{label}</Text>
    </Pressable>
  );
}

export function Placeholder({ title, note }: { title: string; note: string }) {
  const t = useTheme();
  return (
    <Screen title={title}>
      <Card>
        <Text style={{ color: t.muted, fontSize: 16, textAlign: 'right' }}>{note}</Text>
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 26, fontWeight: '700', textAlign: 'right' },
  sub: { fontSize: 16, textAlign: 'right' },
  section: { fontSize: 18, fontWeight: '700', textAlign: 'right', marginTop: space.sm },
  card: { borderWidth: 1, borderRadius: radius.card, padding: space.lg, gap: space.sm },
  chip: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.chip,
    minHeight: 44,
    justifyContent: 'center',
  },
});
