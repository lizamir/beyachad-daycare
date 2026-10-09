import { MoreScreen } from '../../src/components/roleTabs';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, ListRow } from '../../src/components/ui';
import { events, staffInfo } from '../../src/data/demo';
import { theme } from '../../src/theme';

export default function More() {
  return (
    <MoreScreen>
      <Card>
        <CardTitle note="רק מידע נחוץ לטיפול">הנחיות לילדים</CardTitle>
        {staffInfo.map((i) => (
          <ListRow key={i.id} title={i.name} sub={i.note} right={<Badge label={i.tone === 'bad' ? 'אלרגיה' : i.tone === 'warn' ? 'איסוף' : 'טיפול'} tone={i.tone} />} />
        ))}
      </Card>

      <Card>
        <CardTitle>מורשים לאיסוף היום</CardTitle>
        <ListRow icon="person-outline" color={theme.cobalt} title="נועה" sub="דנה (אמא), איל (אבא), רחל (סבתא)" />
        <ListRow icon="swap-horizontal" color={theme.kind.meal} title="מיה" sub="שינוי להיום: סבתא רחל" right={<Badge label="חדש" tone="warn" />} />
        <Txt size={12} color={theme.muted}>הצוות מאשר בפועל את האיסוף. בקשת הורה לבדה לא מחליפה אישור.</Txt>
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
