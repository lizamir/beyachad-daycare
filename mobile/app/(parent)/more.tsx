import { useState } from 'react';
import { Switch, View } from 'react-native';
import { MoreScreen } from '../../src/components/roleTabs';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, CardTitle, ListRow } from '../../src/components/ui';
import { childCard as c, events } from '../../src/data/demo';
import { theme } from '../../src/theme';

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 1, paddingVertical: 4 }}>
      <Txt size={12} color={theme.muted}>{label}</Txt>
      <Txt size={14}>{value}</Txt>
    </View>
  );
}

export default function More() {
  const [absent, setAbsent] = useState(false);
  const [consents, setConsents] = useState(Object.fromEntries(c.consents.map((x) => [x.id, x.on])));

  return (
    <MoreScreen>
      <Card>
        <CardTitle note={`נולדה ${c.birth}`}>{`כרטיס ילד · ${c.name}`}</CardTitle>
        <Line label="אלרגיות" value={c.allergies} />
        <Line label="העדפות אוכל" value={c.food} />
        <Line label="הנחיות טיפול" value={c.care} />
        <Txt size={12} color={theme.muted}>שינוי בהנחיות טיפול עובר בדיקת צוות לפני שהוא נכנס לתוקף.</Txt>
        <Btn label="בקשת תיקון" tone="soft" />
      </Card>

      <Card>
        <CardTitle>אנשי קשר לשעת חירום</CardTitle>
        {c.contacts.map((p) => (
          <ListRow key={p.id} icon="call-outline" color={theme.mint} title={p.name} sub={p.phone} />
        ))}
      </Card>

      <Card>
        <CardTitle>מורשים לאיסוף</CardTitle>
        {c.pickup.map((n) => (
          <ListRow key={n} icon="person-outline" color={theme.cobalt} title={n} />
        ))}
        <Txt size={12} color={theme.muted}>בקשת שינוי באיסוף לא מחליפה אישור של הצוות בפועל.</Txt>
        <Btn label="בקשת שינוי באיסוף היום" tone="soft" />
      </Card>

      <Card>
        <CardTitle>דיווח היעדרות</CardTitle>
        {absent ? (
          <>
            <Badge label="דווחה היעדרות למחר" tone="warn" dot />
            <Btn label="ביטול הדיווח" tone="soft" onPress={() => setAbsent(false)} />
          </>
        ) : (
          <Btn label="נועה לא תגיע מחר" onPress={() => setAbsent(true)} />
        )}
      </Card>

      <Card>
        <CardTitle>אישורים</CardTitle>
        {c.consents.map((x) => (
          <ListRow
            key={x.id}
            title={x.title}
            sub={`${x.version} · אושר ${x.date}`}
            right={
              <Switch
                accessibilityLabel={x.title}
                value={consents[x.id]}
                onValueChange={(v) => setConsents((p) => ({ ...p, [x.id]: v }))}
                trackColor={{ true: theme.mint, false: '#c8d1ea' }}
              />
            }
          />
        ))}
        <Txt size={12} color={theme.muted}>ביטול אישור צילום חל מרגע הביטול. תמונות קודמות מטופלות לפי בקשתך מול הצוות.</Txt>
      </Card>

      <Card>
        <CardTitle>חופשות ואירועים</CardTitle>
        {events.map((e) => (
          <ListRow key={e.id} icon="calendar-outline" color={theme.coral} title={`${e.day} ${e.month} · ${e.title}`} sub={e.sub} right={<Badge label={e.tag} tone={e.tone} />} />
        ))}
      </Card>
    </MoreScreen>
  );
}
