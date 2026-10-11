import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Confetti } from '../../src/components/Confetti';
import { MiniRibbon } from '../../src/components/DayRibbon';
import { useBounce } from '../../src/components/Delight';
import { Logo } from '../../src/components/Logo';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, type IconName } from '../../src/components/ui';
import { staffGroup as g } from '../../src/data/demo';
import { theme } from '../../src/theme';

const AVATAR = ['#ffd978', '#9be8c4', '#b9ccff', '#ffb7ad', '#d7c9ff', '#9fe0ee', '#ffcf9e', '#c8e6a0'];

const actions: { label: string; icon: IconName; color: string }[] = [
  { label: 'הגעה', icon: 'footsteps', color: '#c9d6ff' },
  { label: 'ארוחה', icon: 'restaurant-outline', color: '#ffd88a' },
  { label: 'שינה', icon: 'moon-outline', color: '#d6d0ff' },
  { label: 'טיפול', icon: 'water-outline', color: '#a8ead9' },
  { label: 'תמונה', icon: 'camera-outline', color: '#ffc0b5' },
];

type Kid = (typeof g.kids)[number];

function KidRow({ kid, color, picked, done, onToggle, onDone }: { kid: Kid; color: string; picked: boolean; done: boolean; onToggle: () => void; onDone: () => void }) {
  const { scale, bounce } = useBounce();
  const stale = kid.flag?.stale && !done;
  const badge = done && kid.flag?.stale ? { tone: 'ok' as const, text: 'עודכן עכשיו' } : kid.flag ?? { tone: 'ok' as const, text: 'נוכח' };
  return (
    <View style={{ backgroundColor: picked ? '#eef2fc' : '#fff', borderRadius: 20, padding: 12, borderWidth: 2, borderColor: picked ? theme.cobalt : 'transparent', boxShadow: theme.shadow }}>
    <Pressable accessibilityRole="button" accessibilityState={{ selected: picked }} onPress={onToggle}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Animated.View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: color, alignItems: 'center', justifyContent: 'center', transform: [{ scale }] }}>
          <Txt w={700} size={16} color="#0f2147">{kid.name[0]}</Txt>
          {kid.flag?.tone === 'pink' && (
            <View style={{ position: 'absolute', top: -9, transform: [{ rotate: '-14deg' }] }}>
              <Ionicons name="triangle" size={16} color={theme.coral} />
            </View>
          )}
        </Animated.View>
        <View style={{ flex: 1 }}>
          <Txt w={600} size={15}>{kid.name}</Txt>
          <Txt size={12.5} color={theme.muted}>{done && kid.flag?.stale ? 'עדכון מלא · 14:41' : kid.last}</Txt>
        </View>
        <Badge label={badge.text} tone={badge.tone} />
      </View>
      <View style={{ marginTop: 8 }}>
        <MiniRibbon arrival={kid.arrival} meals={kid.meals} sleeps={kid.sleeps} care={kid.care} />
      </View>
    </Pressable>
      {stale && (
        <View style={{ marginTop: 8, alignItems: 'flex-start' }}>
          <Btn
            label="סימנתי עדכון"
            tone="soft"
            onPress={() => {
              bounce();
              onDone();
            }}
          />
        </View>
      )}
    </View>
  );
}

export default function StaffHome() {
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(0);
  const [msg, setMsg] = useState('נגעו בילדים כדי לבחור כמה לעדכון קבוצתי');
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const present = g.kids.length;
  const staleIds = g.kids.filter((k) => k.flag?.stale).map((k) => k.id);
  const allDone = staleIds.every((id) => done.includes(id));

  const markDone = (id: string) => {
    const next = [...done, id];
    setDone(next);
    if (staleIds.every((s) => next.includes(s))) setTimeout(() => setConfetti((n) => n + 1), 350);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.ground }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: insets.top + 14, gap: 12 }}>
        <Logo size={26} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Txt size={13} color={theme.muted}>יום שלישי · 14:40</Txt>
            <Txt accessibilityRole="header" w={700} size={25}>{g.name}</Txt>
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
              {Array.from({ length: g.total }).map((_, i) => (
                <View key={i} style={{ width: 14, height: 8, borderRadius: 4, backgroundColor: i < present ? theme.fun[i % theme.fun.length] : '#c8d1ea' }} />
              ))}
            </View>
          </View>
          <Badge label={`${present} מתוך ${g.total} נוכחים`} tone="cool" />
        </View>

        {allDone ? (
          <View style={{ borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#d6f4e7' }}>
            <Ionicons name="sparkles" size={20} color="#0a6a43" />
            <Txt w={600} size={14} color="#0a6a43" style={{ flex: 1 }}>כל הקבוצה עודכנה. ההורים רואים את היום של הילדים.</Txt>
          </View>
        ) : null}

        {g.alerts.map((a) => (
          <View key={a.id} accessibilityRole="alert" style={{ borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: a.level === 'bad' ? '#ffd9d4' : '#ffe8b8' }}>
            <Ionicons name={a.icon} size={20} color={a.level === 'bad' ? '#7d170d' : '#5f3c00'} />
            <Txt size={14} w={500} color={a.level === 'bad' ? '#7d170d' : '#5f3c00'} style={{ flex: 1 }}>
              <Txt size={14} w={700} color={a.level === 'bad' ? '#7d170d' : '#5f3c00'}>{a.lead} </Txt>
              {a.text}
            </Txt>
          </View>
        ))}

        <View style={{ flexDirection: 'row', gap: 8 }}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              accessibilityRole="button"
              onPress={() => setMsg(`"${a.label}": בחרו ילד מהרשימה`)}
              style={({ pressed }) => ({ flex: 1, minHeight: 66, borderRadius: 20, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center', gap: 4, transform: [{ scale: pressed ? 0.94 : 1 }] })}
            >
              <Ionicons name={a.icon} size={21} color="#0f2147" />
              <Txt w={700} size={12} color="#0f2147">{a.label}</Txt>
            </Pressable>
          ))}
        </View>

        <Txt size={12.5} color={theme.muted}>{msg}</Txt>

        <View style={{ gap: 10 }}>
          {g.kids.map((k, i) => (
            <KidRow key={k.id} kid={k} color={AVATAR[i % AVATAR.length]} picked={picked.includes(k.id)} done={done.includes(k.id)} onToggle={() => toggle(k.id)} onDone={() => markDone(k.id)} />
          ))}
          {g.absent.map((k) => (
            <View key={k.id} style={{ backgroundColor: '#fff', borderRadius: 20, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, opacity: 0.65 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#dfe4f0', alignItems: 'center', justifyContent: 'center' }}>
                <Txt w={700} size={16} color="#0f2147">{k.name[0]}</Txt>
              </View>
              <View style={{ flex: 1 }}>
                <Txt w={600} size={15}>{k.name}</Txt>
                <Txt size={12.5} color={theme.muted}>{k.note}</Txt>
              </View>
              <Badge label="נעדר" tone="mute" />
            </View>
          ))}
        </View>
      </ScrollView>

      {picked.length > 0 && (
        <View accessibilityRole="toolbar" style={{ backgroundColor: theme.ink, padding: 12, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
          <Txt w={600} size={13.5} color="#fff" style={{ flexGrow: 1 }}>עדכון קבוצתי · {picked.length} ילדים</Txt>
          {actions.slice(1).map((a) => (
            <Pressable
              key={a.label}
              accessibilityRole="button"
              onPress={() => setMsg(`נפתח "${a.label}" ל־${picked.length} ילדים, עם התאמה אישית לכל ילד לפני האישור`)}
              style={{ backgroundColor: a.color, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, minHeight: 36, justifyContent: 'center' }}
            >
              <Txt w={700} size={12.5} color="#0f2147">{a.label}</Txt>
            </Pressable>
          ))}
        </View>
      )}
      <Confetti fire={confetti} />
    </View>
  );
}
