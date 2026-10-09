import { Text, View } from 'react-native';
import { Card, Chip, Screen, SectionTitle } from '../../src/components/ui';
import { adminDay } from '../../src/data/demo';
import { useTheme } from '../../src/theme';

function Stat({ label, value }: { label: string; value: string }) {
  const t = useTheme();
  return (
    <Card style={{ flex: 1, minWidth: 140 }}>
      <Text style={{ color: t.muted, fontSize: 14, textAlign: 'right' }}>{label}</Text>
      <Text style={{ color: t.ink, fontSize: 24, fontWeight: '700', textAlign: 'right' }}>{value}</Text>
    </Card>
  );
}

export default function AdminHome() {
  const t = useTheme();
  const d = adminDay;
  return (
    <Screen title={d.title}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        <Stat label="ילדים נוכחים" value={`${d.attendance.present} מתוך ${d.attendance.total}`} />
        <Stat label="צוות נוכח" value={`${d.staffPresent.present} מתוך ${d.staffPresent.total}`} />
        <Stat label="הודעות ממתינות" value={String(d.pendingMessages)} />
      </View>

      <SectionTitle>תשלומים החודש</SectionTitle>
      <Card>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Chip label={`שולם · ${d.payments.paid}`} />
          <Chip label={`ממתין · ${d.payments.pending}`} tone="warn" />
          <Chip label={`באיחור · ${d.payments.late}`} tone="danger" />
        </View>
      </Card>

      <SectionTitle>לטיפול</SectionTitle>
      <Card>
        {d.todo.map((line) => (
          <Text key={line} style={{ color: t.ink, fontSize: 16, textAlign: 'right', minHeight: 32 }}>
            • {line}
          </Text>
        ))}
      </Card>

      <SectionTitle>בקרוב</SectionTitle>
      <Card>
        {d.upcoming.map((line) => (
          <Text key={line} style={{ color: t.ink, fontSize: 16, textAlign: 'right', minHeight: 32 }}>
            • {line}
          </Text>
        ))}
      </Card>
    </Screen>
  );
}
