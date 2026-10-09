import { useState } from 'react';
import { View } from 'react-native';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, CardTitle, Screen } from '../../src/components/ui';
import { familiesFinance } from '../../src/data/demo';
import { theme, type Tone } from '../../src/theme';

const shekel = (n: number) => `₪${n.toLocaleString('he-IL')}`;
const TODAY = '2026-10-09';
const iso = (d: string) => d.split('.').reverse().join('-');

type F = (typeof familiesFinance)[number];
const state = (f: F): { label: string; tone: Tone } => {
  if (f.paid >= f.amount) return { label: 'שולם', tone: 'ok' };
  if (f.paid > 0) return { label: 'שולם חלקית', tone: 'warn' };
  return iso(f.due) < TODAY ? { label: 'באיחור', tone: 'bad' } : { label: 'ממתין', tone: 'warn' };
};

export default function Finance() {
  const [list, setList] = useState<F[]>(familiesFinance);
  // רישום תשלום קובע את הסכום ששולם לסכום החיוב. לחיצה חוזרת לא מוסיפה כלום (אין חיוב או תשלום כפול).
  const record = (id: string) => setList((p) => p.map((f) => (f.id === id ? { ...f, paid: f.amount } : f)));

  const sum = (pred: (f: F) => boolean, v: (f: F) => number) => list.filter(pred).reduce((n, f) => n + v(f), 0);
  const collected = sum(() => true, (f) => f.paid);
  const total = sum(() => true, (f) => f.amount);
  const late = sum((f) => state(f).tone === 'bad', (f) => f.amount - f.paid);

  return (
    <Screen title="כספים" subtitle="אוקטובר 2026 · ללא סליקה בגרסה הראשונה">
      <View style={{ backgroundColor: theme.cobalt, borderRadius: 18, padding: 16, gap: 4 }}>
        <Txt w={600} size={13} color="#fff">נגבה החודש</Txt>
        <Txt w={700} size={36} color="#fff" style={{ lineHeight: 40 }}>{shekel(collected)}</Txt>
        <Txt size={13} color="#fff">מתוך {shekel(total)}{late ? ` · באיחור ${shekel(late)}` : ''}</Txt>
      </View>

      <Card>
        <CardTitle note="לחיצה על ״רישום תשלום״ מעדכנת את היתרה">משפחות</CardTitle>
        {list.map((f) => {
          const st = state(f);
          const owed = f.amount - f.paid;
          return (
            <View key={f.id} style={{ paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#e6ecf9', gap: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ flex: 1 }}>
                  <Txt w={600} size={14}>{f.child} · {f.parent}</Txt>
                  <Txt size={12.5} color={theme.muted}>{owed > 0 ? `יתרה ${shekel(owed)} · עד ${f.due}` : 'שולם במלואו'}</Txt>
                </View>
                <Badge label={st.label} tone={st.tone} />
              </View>
              {owed > 0 && <Btn label={`רישום תשלום ${shekel(owed)}`} tone="soft" onPress={() => record(f.id)} />}
            </View>
          );
        })}
      </Card>
      <Txt size={12.5} color={theme.muted}>
        הפקת חשבונית תתבצע באמצעות שירות מסמכים חיצוני. מסמך שהופק אינו הוכחה לקבלת תשלום.
      </Txt>
    </Screen>
  );
}
