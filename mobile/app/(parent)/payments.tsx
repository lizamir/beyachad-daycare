import { View } from 'react-native';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, Screen } from '../../src/components/ui';
import { familyCharges } from '../../src/data/demo';
import { theme, type Tone } from '../../src/theme';

const shekel = (n: number) => `₪${n.toLocaleString('he-IL')}`;

function status(c: (typeof familyCharges)[number]): { label: string; tone: Tone } {
  if (c.paid >= c.amount) return { label: 'שולם', tone: 'ok' };
  if (c.paid > 0) return { label: 'שולם חלקית', tone: 'warn' };
  return { label: 'פתוח', tone: 'cool' };
}

export default function Payments() {
  const balance = familyCharges.reduce((n, c) => n + (c.amount - c.paid), 0);
  const next = familyCharges.find((c) => c.paid < c.amount);
  return (
    <Screen title="תשלומים" subtitle="החשבון של המשפחה שלך בלבד">
      <View style={{ backgroundColor: balance > 0 ? theme.cobalt : theme.mint, borderRadius: 18, padding: 16, gap: 4 }}>
        <Txt w={600} size={13} color="#fff">{balance > 0 ? 'יתרה לתשלום' : 'אין יתרה לתשלום'}</Txt>
        <Txt w={700} size={38} color="#fff" style={{ lineHeight: 42 }}>{shekel(balance)}</Txt>
        {next && <Txt size={13} color="#fff">לתשלום עד {next.due}</Txt>}
      </View>

      <Card>
        <CardTitle>חיובים קודמים</CardTitle>
        {familyCharges.map((c) => {
          const st = status(c);
          return (
            <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderTopWidth: 1, borderTopColor: '#e6ecf9' }}>
              <View style={{ flex: 1 }}>
                <Txt w={600} size={14}>{c.period}</Txt>
                <Txt size={12.5} color={theme.muted}>{c.doc || `לתשלום עד ${c.due}`}</Txt>
              </View>
              <Txt w={600} size={15}>{shekel(c.amount)}</Txt>
              <Badge label={st.label} tone={st.tone} />
            </View>
          );
        })}
      </Card>

      <Txt size={12.5} color={theme.muted}>
        התשלום מתבצע מחוץ לאפליקציה. המנהלת רושמת אותו כאן אחרי שהתקבל, והיתרה מתעדכנת.
      </Txt>
    </Screen>
  );
}
