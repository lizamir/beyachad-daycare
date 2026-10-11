import { View } from 'react-native';
import { Logo } from '../../src/components/Logo';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, Disc, Screen } from '../../src/components/ui';
import { adminDay as d } from '../../src/data/demo';
import { theme } from '../../src/theme';

const AVATAR = { g: '#9be8c4', y: '#ffd978', x: '#dfe4f0' } as const;

function Tile({ bg, fg, label, value, unit, foot }: { bg: string; fg: string; label: string; value: string; unit?: string; foot?: string }) {
  return (
    <View style={{ flex: 1, minHeight: 104, borderRadius: 22, padding: 12, backgroundColor: bg, justifyContent: 'space-between' }}>
      <Txt w={600} size={12} color={fg}>{label}</Txt>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
        <Txt w={700} size={34} color={fg} style={{ lineHeight: 38 }}>{value}</Txt>
        {unit ? <Txt w={600} size={13} color={fg}>{unit}</Txt> : null}
      </View>
      {foot ? <Txt size={11.5} color={fg}>{foot}</Txt> : <View />}
    </View>
  );
}

function Pay({ n, label, sum, bg, fg }: { n: number; label: string; sum: string; bg: string; fg: string }) {
  return (
    <View style={{ flex: 1, backgroundColor: bg, borderRadius: 12, padding: 10 }}>
      <Txt w={700} size={19} color={fg}>{n}</Txt>
      <Txt w={600} size={12} color={fg}>{label}</Txt>
      <Txt size={11.5} color={fg}>{sum}</Txt>
    </View>
  );
}

export default function AdminHome() {
  const p = d.payments;
  return (
    <Screen>
      <Logo size={26} />
      <View>
        <Txt size={13} color={theme.muted}>יום שלישי · 14:40</Txt>
        <Txt accessibilityRole="header" w={700} size={25}>{d.title}</Txt>
      </View>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={{ flex: 1.4, flexDirection: 'row' }}>
          <Tile bg={theme.cobalt} fg="#fff" label="ילדים נוכחים" value={String(d.present)} unit={`מתוך ${d.total}`} foot="2 נעדרים בדיווח הורים" />
        </View>
        <Tile bg={theme.coral} fg="#fff" label="צוות" value={String(d.staff.present)} unit={`/ ${d.staff.total}`} />
        <Tile bg={theme.sun} fg={theme.sunInk} label="הודעות" value={String(d.pendingMessages)} foot="ממתינות" />
      </View>

      <Card>
        <CardTitle note="לפי ילד">עדכונים אחרונים</CardTitle>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10 }}>
          {d.coverage.map(([name, st]) => (
            <View key={name} style={{ width: '20%', alignItems: 'center', gap: 3 }}>
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: AVATAR[st], alignItems: 'center', justifyContent: 'center' }}>
                <Txt w={700} size={15} color={st === 'x' ? '#8a95b3' : '#10224a'}>{name[0]}</Txt>
              </View>
              <Txt w={600} size={11.5}>{name}</Txt>
            </View>
          ))}
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
          <Badge label="עודכן בשעה האחרונה" tone="ok" />
          <Badge label="יותר משעתיים" tone="warn" />
          <Badge label="נעדר" tone="mute" />
        </View>
      </Card>

      <Card>
        <CardTitle note="10 משפחות">{`תשלומים · ${p.month}`}</CardTitle>
        <View accessibilityLabel="6 שולמו, 3 ממתינים, 1 באיחור" style={{ flexDirection: 'row', height: 14, borderRadius: 7, overflow: 'hidden', gap: 2 }}>
          <View style={{ flex: p.paid.n, backgroundColor: theme.mint }} />
          <View style={{ flex: p.pending.n, backgroundColor: theme.sun }} />
          <View style={{ flex: p.late.n, backgroundColor: theme.coral }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          <Pay n={p.paid.n} label="שולם" sum={p.paid.sum} bg="#d3f5e5" fg="#0a6a43" />
          <Pay n={p.pending.n} label="ממתין" sum={p.pending.sum} bg="#ffe8b8" fg="#6b4300" />
          <Pay n={p.late.n} label="באיחור" sum={p.late.sum} bg="#ffd9d4" fg="#8f1d12" />
        </View>
      </Card>

      <Card>
        <CardTitle>לטיפול</CardTitle>
        {d.todo.map((t) => (
          <View key={t.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 }}>
            <Disc icon={t.icon} color={t.color} />
            <View style={{ flex: 1 }}>
              <Txt w={600} size={14}>{t.title}</Txt>
              <Txt size={13} color={theme.muted}>{t.sub}</Txt>
            </View>
            <Badge label={t.tag} tone={t.tone} />
          </View>
        ))}
      </Card>

      <Card>
        <CardTitle>בקרוב</CardTitle>
        {d.upcoming.map((u) => (
          <View key={u.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 }}>
            <View style={{ backgroundColor: u.tone === 'pink' ? '#ffe0ec' : '#edf1fb', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4, alignItems: 'center', minWidth: 46 }}>
              <Txt w={700} size={11} color="#4d5b7c">{u.month}</Txt>
              <Txt w={700} size={17}>{u.day}</Txt>
            </View>
            <View style={{ flex: 1 }}>
              <Txt w={600} size={14}>{u.title}</Txt>
              <Txt size={13} color={theme.muted}>{u.sub}</Txt>
            </View>
            <Badge label={u.tag} tone={u.tone} />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
