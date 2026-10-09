import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Scene } from '../../src/components/Scene';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, Screen } from '../../src/components/ui';
import { photos as seed, staffGroup, type Photo } from '../../src/data/demo';
import { theme } from '../../src/theme';

const scenes = ['a', 'b', 'c'] as const;

export default function StaffPhotos() {
  const [list, setList] = useState<Photo[]>(seed);
  const [open, setOpen] = useState<string | null>(null);

  const upload = () => {
    const n = list.length;
    // בהמשך: בחירת תמונה מהמכשיר והעלאה לאחסון מוגן
    setList((p) => [{ id: `new${n}`, scene: scenes[n % 3], caption: 'תמונה חדשה', time: '14:41', tags: [] }, ...p]);
  };
  const toggleTag = (id: string, name: string) =>
    setList((p) => p.map((x) => (x.id === id ? { ...x, tags: x.tags.includes(name) ? x.tags.filter((t) => t !== name) : [...x.tags, name] } : x)));

  return (
    <Screen title="תמונות" subtitle="אלבום הקבוצה. התיוג מוצג להורים לאישור">
      <Btn label="העלאת תמונה" onPress={upload} />
      {list.map((p) => (
        <Card key={p.id}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ width: 96, height: 96, borderRadius: 14, overflow: 'hidden' }}>
              <Scene name={p.scene} label={p.caption} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Txt w={600} size={15}>{p.caption}</Txt>
              <Txt size={12.5} color={theme.muted}>{p.time}</Txt>
              {p.tags.length === 0 ? <Badge label="ממתינה לתיוג" tone="warn" /> : <Txt size={13}>{p.tags.join(', ')}</Txt>}
              <Btn label={open === p.id ? 'סיום תיוג' : 'תיוג ילדים'} tone="soft" onPress={() => setOpen(open === p.id ? null : p.id)} />
            </View>
          </View>
          {open === p.id && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {staffGroup.kids.map((k) => {
                const on = p.tags.includes(k.name);
                return (
                  <Pressable
                    key={k.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                    onPress={() => toggleTag(p.id, k.name)}
                    style={{ minHeight: 40, paddingHorizontal: 14, borderRadius: 999, justifyContent: 'center', backgroundColor: on ? theme.cobalt : '#e8ecf5' }}
                  >
                    <Txt w={600} size={13.5} color={on ? '#fff' : theme.ink}>{k.name}</Txt>
                  </Pressable>
                );
              })}
            </View>
          )}
        </Card>
      ))}
    </Screen>
  );
}
