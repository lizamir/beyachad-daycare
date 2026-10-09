import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, space, theme, tones, type Tone } from '../theme';
import { Txt } from './Txt';

export type IconName = keyof typeof Ionicons.glyphMap;

export function Screen({
  title,
  subtitle,
  children,
  flush,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  flush?: boolean; // בלי ריפוד עליון, למסך שפותח בתמונה
}) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: theme.ground }}
      contentContainerStyle={{
        paddingHorizontal: flush ? 0 : space.lg,
        paddingTop: flush ? 0 : insets.top + space.lg,
        paddingBottom: space.xl,
        gap: space.md,
      }}
    >
      {title ? (
        <View style={{ gap: 2 }}>
          <Txt accessibilityRole="header" w={700} size={26}>{title}</Txt>
          {subtitle ? <Txt size={15} color={theme.muted}>{subtitle}</Txt> : null}
        </View>
      ) : null}
      {children}
    </ScrollView>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function CardTitle({ children, note }: { children: string; note?: string }) {
  return (
    <View style={s.cardTitle}>
      <Txt accessibilityRole="header" w={700} size={14}>{children}</Txt>
      {note ? <Txt size={12} color={theme.muted}>{note}</Txt> : null}
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return <Txt accessibilityRole="header" w={700} size={18} style={{ marginTop: space.sm }}>{children}</Txt>;
}

// תג סטטי (לא לחיץ)
export function Badge({ label, tone = 'ok', dot }: { label: string; tone?: Tone; dot?: boolean }) {
  const t = tones[tone];
  return (
    <View style={[s.badge, { backgroundColor: t.bg }]}>
      {dot ? <View style={[s.dot, { backgroundColor: t.fg }]} /> : null}
      <Txt w={600} size={12.5} color={t.fg}>{label}</Txt>
    </View>
  );
}

// עיגול צבעוני עם אייקון
export function Disc({ icon, color, size = 30 }: { icon: IconName; color: string; size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={icon} size={size * 0.56} color="#fff" />
    </View>
  );
}

// כפתור
export function Chip({
  label,
  tone = 'soft',
  onPress,
}: {
  label: string;
  tone?: 'soft' | 'warn' | 'danger';
  onPress?: () => void;
}) {
  const bg = tone === 'warn' ? theme.warnSoft : tone === 'danger' ? theme.dangerSoft : theme.cobalt;
  const fg = tone === 'warn' ? theme.warn : tone === 'danger' ? theme.danger : '#fff';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [s.chip, { backgroundColor: bg, opacity: pressed ? 0.75 : 1 }]}
    >
      <Txt w={600} size={16} color={fg}>{label}</Txt>
    </Pressable>
  );
}

export function Placeholder({ title, note }: { title: string; note: string }) {
  return (
    <Screen title={title}>
      <Card>
        <Txt size={16} color={theme.muted}>{note}</Txt>
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: theme.surface, borderRadius: radius.card, padding: 14, gap: space.sm },
  cardTitle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 11, paddingVertical: 5, borderRadius: radius.chip, alignSelf: 'flex-start' },
  dot: { width: 8, height: 8, borderRadius: 4 },
  chip: { paddingHorizontal: space.lg, paddingVertical: space.md, borderRadius: radius.chip, minHeight: 48, justifyContent: 'center', alignItems: 'center' },
});

// שורת רשימה: עיגול אייקון, כותרת, שורת משנה ותוכן בצד
export function ListRow({
  icon,
  color = theme.cobalt,
  title,
  sub,
  right,
}: {
  icon?: IconName;
  color?: string;
  title: string;
  sub?: string;
  right?: ReactNode;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 }}>
      {icon ? <Disc icon={icon} color={color} /> : null}
      <View style={{ flex: 1 }}>
        <Txt w={600} size={14}>{title}</Txt>
        {sub ? <Txt size={13} color={theme.muted}>{sub}</Txt> : null}
      </View>
      {right}
    </View>
  );
}

// בורר קטעים (לשוניות פנימיות)
export function Seg<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <View accessibilityRole="tablist" style={{ flexDirection: 'row', backgroundColor: '#d3def8', borderRadius: 999, padding: 4 }}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            style={{ flex: 1, minHeight: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? '#fff' : 'transparent' }}
          >
            <Txt w={on ? 700 : 500} size={14} color={on ? theme.ink : theme.muted}>{o.label}</Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

// כפתור קטן בתוך כרטיס
export function Btn({
  label,
  onPress,
  tone = 'primary',
  disabled,
}: {
  label: string;
  onPress?: () => void;
  tone?: 'primary' | 'soft' | 'ghost';
  disabled?: boolean;
}) {
  const bg = tone === 'primary' ? theme.cobalt : tone === 'soft' ? '#dbe5ff' : 'transparent';
  const fg = tone === 'primary' ? '#fff' : '#1c3aa8';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({ backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.75 : 1, borderRadius: 999, paddingHorizontal: 16, minHeight: 40, alignItems: 'center', justifyContent: 'center' })}
    >
      <Txt w={600} size={14} color={fg}>{label}</Txt>
    </Pressable>
  );
}

// כותרת "דף ריק" כשאין עדיין תוכן
export function Empty({ text }: { text: string }) {
  return <Txt size={14} color={theme.muted}>{text}</Txt>;
}
