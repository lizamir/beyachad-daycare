import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MiniRibbon } from '../../src/components/DayRibbon';
import { Txt } from '../../src/components/Txt';
import { Badge, type IconName } from '../../src/components/ui';
import { staffGroup as g } from '../../src/data/demo';
import { theme } from '../../src/theme';

const AVATAR = ['#ffd978', '#9be8c4', '#b9ccff', '#ffb7ad', '#d7c9ff', '#9fe0ee', '#ffcf9e', '#c8e6a0'];

const actions: { label: string; icon: IconName; color: string }[] = [
  { label: 'הגעה', icon: 'checkmark', color: '#bcd0ff' },
  { label: 'ארוחה', icon: 'restaurant-outline', color: '#ffd88a' },
  { label: 'שינה', icon: 'moon-outline', color: '#cfc9ff' },
  { label: 'טיפול', icon: 'water-outline', color: '#9fe6d8' },
  { label: 'תמונה', icon: 'camera-outline', color: '#ffb9ae' },
];

export default function StaffHome() {
  const insets = useSafeAreaInsets();
  const [picked, setPicked] = useState<string[]>([]);
  const [msg, setMsg] = useState('נגעו בילדים כדי לבחור כמה לעדכון קבוצתי');
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const present = g.kids.length;

  return (
    <View style={{ flex: 1, backgroundColor: theme.ground }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingTop: insets.top + 16, gap: 12 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Txt size={13} color={theme.muted}>יום שלישי · 14:40</Txt>
            <Txt accessibilityRole="header" w={700} size={25}>{g.name}</Txt>
            <View style={{ flexDirection: 'row', gap: 4, marginTop: 6 }}>
              {Array.from({ length: g.total }).map((_, i) => (
                <View key={i} style={{ width: 14, height: 8, borderRadius: 3, backgroundColor: i < present ? theme.mint : '#c8d1ea' }} />
              ))}
            </View>
          </View>
          <Badge label={`${present} מתוך ${g.total} נוכחים`} tone="cool" />
        </View>

        {g.alerts.map((a) => (
          <View
            key={a.id}
            accessibilityRole="alert"
            style={{ borderRadius: 14, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: a.level === 'bad' ? '#ffd9d4' : '#ffe8b8' }}
          >
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
              style={({ pressed }) => ({ flex: 1, minHeight: 64, borderRadius: 16, backgroundColor: a.color, alignItems: 'center', justifyContent: 'center', gap: 4, opacity: pressed ? 0.7 : 1 })}
            >
              <Ionicons name={a.icon} size={20} color="#10224a" />
              <Txt w={700} size={12} color="#10224a">{a.label}</Txt>
            </Pressable>
          ))}
        </View>

        <Txt size={12.5} color={theme.muted}>{msg}</Txt>

        <View style={{ gap: 8 }}>
          {g.kids.map((k, i) => {
            const on = picked.includes(k.id);
            return (
              <Pressable
                key={k.id}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                onPress={() => toggle(k.id)}
                style={{ backgroundColor: on ? '#f1f5ff' : '#fff', borderRadius: 16, padding: 12, borderWidth: 2, borderColor: on ? theme.cobalt : 'transparent' }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: AVATAR[i % AVATAR.length], alignItems: 'center', justifyContent: 'center' }}>
                    <Txt w={700} size={16} color="#10224a">{k.name[0]}</Txt>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Txt w={600} size={15}>{k.name}</Txt>
                    <Txt size={12.5} color={theme.muted}>{k.last}</Txt>
                  </View>
                  <Badge label={k.flag?.text ?? 'נוכח'} tone={k.flag?.tone ?? 'ok'} />
                </View>
                <View style={{ marginTop: 8 }}>
                  <MiniRibbon arrival={k.arrival} meals={k.meals} sleeps={k.sleeps} care={k.care} />
                </View>
              </Pressable>
            );
          })}
          {g.absent.map((k) => (
            <View key={k.id} style={{ backgroundColor: '#fff', borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, opacity: 0.65 }}>
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: '#dfe4f0', alignItems: 'center', justifyContent: 'center' }}>
                <Txt w={700} size={16} color="#10224a">{k.name[0]}</Txt>
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
              <Txt w={700} size={12.5} color="#10224a">{a.label}</Txt>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
