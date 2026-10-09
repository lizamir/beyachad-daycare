import { Text, View } from 'react-native';
import { Card, Chip, Screen, SectionTitle } from '../../src/components/ui';
import { staffGroup, stateLabel } from '../../src/data/demo';
import { useTheme } from '../../src/theme';

export default function StaffHome() {
  const t = useTheme();
  const g = staffGroup;
  return (
    <Screen title={g.name} subtitle={`${g.present} מתוך ${g.total} ילדים נוכחים`}>
      {g.alerts.map((a) => (
        <Card key={a.id} style={{ backgroundColor: a.level === 'danger' ? t.dangerSoft : t.warnSoft }}>
          <Text
            accessibilityRole="alert"
            style={{ color: a.level === 'danger' ? t.danger : t.warn, fontSize: 16, fontWeight: '600', textAlign: 'right' }}
          >
            {a.text}
          </Text>
        </Card>
      ))}

      <SectionTitle>פעולות מהירות</SectionTitle>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {g.quickActions.map((label) => (
          <Chip key={label} label={label} onPress={() => {}} />
        ))}
      </View>

      <SectionTitle>הילדים</SectionTitle>
      <Card>
        {g.children.map((c) => (
          <View key={c.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 52 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: t.ink, fontSize: 17, fontWeight: '600', textAlign: 'right' }}>{c.name}</Text>
              <Text style={{ color: t.muted, fontSize: 14, textAlign: 'right' }}>{c.last}</Text>
            </View>
            <Chip label={stateLabel[c.state]} tone={c.state === 'absent' ? 'warn' : 'soft'} />
          </View>
        ))}
      </Card>
    </Screen>
  );
}
