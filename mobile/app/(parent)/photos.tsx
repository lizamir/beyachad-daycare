import { useState } from 'react';
import { View } from 'react-native';
import { Scene } from '../../src/components/Scene';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, Empty, Screen, Seg } from '../../src/components/ui';
import { photos } from '../../src/data/demo';
import { theme } from '../../src/theme';

type Decision = 'saved' | 'declined' | 'wrong';
const ME = 'נועה';

export default function Photos() {
  const [seg, setSeg] = useState<'group' | 'mine'>('group');
  const [dec, setDec] = useState<Record<string, Decision>>({});
  const set = (id: string, d: Decision | undefined) =>
    setDec((p) => {
      const n = { ...p };
      if (d) n[id] = d;
      else delete n[id];
      return n;
    });
  const saved = photos.filter((p) => dec[p.id] === 'saved');
  const shown = seg === 'group' ? photos : saved;

  return (
    <Screen title="תמונות" subtitle="אלבום הקבוצה והאלבום של נועה">
      <Seg
        value={seg}
        onChange={setSeg}
        options={[
          { value: 'group', label: 'אלבום הקבוצה' },
          { value: 'mine', label: `האלבום של ${ME}` },
        ]}
      />
      {shown.length === 0 && (
        <Card>
          <Empty text="עוד לא נוספו תמונות לאלבום של נועה. בחרו בתמונה מהאלבום הקבוצתי ״להוסיף לאלבום שלי״. התיוג לבד לא מוסיף אותה." />
        </Card>
      )}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        {shown.map((p) => {
          const tagged = p.tags.includes(ME);
          const d = dec[p.id];
          return (
            <Card key={p.id} style={{ width: '48%', padding: 8, gap: 6 }}>
              <View style={{ aspectRatio: 1, borderRadius: 12, overflow: 'hidden' }}>
                <Scene name={p.scene} label={p.caption} />
              </View>
              <Txt w={600} size={13}>{p.caption}</Txt>
              <Txt size={12} color={theme.muted}>{p.time}{p.tags.length ? ` · ${p.tags.join(', ')}` : ''}</Txt>
              {tagged && d === undefined && seg === 'group' && (
                <View style={{ gap: 6 }}>
                  <Badge label="מתויגת: נועה" tone="cool" />
                  <Btn label="להוסיף לאלבום שלי" onPress={() => set(p.id, 'saved')} />
                  <Btn label="לא תודה" tone="soft" onPress={() => set(p.id, 'declined')} />
                  <Btn label="זו לא נועה" tone="ghost" onPress={() => set(p.id, 'wrong')} />
                </View>
              )}
              {d === 'saved' && (
                <View style={{ gap: 6 }}>
                  <Badge label="באלבום שלי" tone="ok" dot />
                  {seg === 'mine' && <Btn label="להסיר מהאלבום שלי" tone="soft" onPress={() => set(p.id, undefined)} />}
                </View>
              )}
              {d === 'declined' && <Badge label="לא נוספה" tone="mute" />}
              {d === 'wrong' && <Badge label="דווח לצוות: תיוג שגוי" tone="warn" />}
            </Card>
          );
        })}
      </View>
      <Txt size={12.5} color={theme.muted}>
        הסרה מהאלבום שלך לא מוחקת את התמונה מהאלבום הקבוצתי.
      </Txt>
    </Screen>
  );
}
