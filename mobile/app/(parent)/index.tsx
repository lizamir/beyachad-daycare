import { Text, View } from 'react-native';
import { Card, Screen, SectionTitle } from '../../src/components/ui';
import { parentDay } from '../../src/data/demo';
import { useTheme } from '../../src/theme';

export default function ParentToday() {
  const t = useTheme();
  const d = parentDay;
  return (
    <Screen title={`היום של ${d.childName}`} subtitle={d.dayLabel}>
      <Card>
        {d.timeline.map((item) => (
          <View key={item.id} style={{ flexDirection: 'row', gap: 12, minHeight: 44, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ color: t.ink, fontSize: 17, fontWeight: '600', textAlign: 'right' }}>{item.title}</Text>
              {item.detail ? (
                <Text style={{ color: t.muted, fontSize: 15, textAlign: 'right' }}>{item.detail}</Text>
              ) : null}
            </View>
            {item.time ? <Text style={{ color: t.muted, fontSize: 15 }}>{item.time}</Text> : null}
          </View>
        ))}
      </Card>

      <SectionTitle>תמונות מהיום</SectionTitle>
      <Card>
        <Text style={{ color: t.muted, fontSize: 16, textAlign: 'right' }}>
          {d.photoCount} תמונות חדשות באלבום הקבוצתי. תצוגה מקדימה תתווסף עם העלאת תמונות.
        </Text>
      </Card>

      <SectionTitle>הודעה מהמשפחתון</SectionTitle>
      <Card style={{ backgroundColor: t.soft }}>
        <Text style={{ color: t.ink, fontSize: 17, textAlign: 'right' }}>{d.notice}</Text>
      </Card>
    </Screen>
  );
}
