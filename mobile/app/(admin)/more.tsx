import { MoreScreen } from '../../src/components/roleTabs';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, ListRow } from '../../src/components/ui';
import { adminDay, events, staffList } from '../../src/data/demo';
import { theme } from '../../src/theme';

export default function More() {
  return (
    <MoreScreen>
      <Card>
        <CardTitle note="הרשאות נאכפות בשרת">צוות והרשאות</CardTitle>
        {staffList.map((s) => (
          <ListRow key={s.id} icon="person-outline" color={theme.mint} title={s.name} sub={s.perms.join(' · ')} right={<Badge label={s.role} tone="cool" />} />
        ))}
        <Txt size={12} color={theme.muted}>לצוות אין גישה לכספים. הזמנת איש צוות חדש תתווסף עם חיבור השרת.</Txt>
      </Card>

      <Card>
        <CardTitle>אישורים</CardTitle>
        {adminDay.todo.slice(0, 1).map((t) => (
          <ListRow key={t.id} icon={t.icon} color={t.color} title={t.title} sub={t.sub} right={<Badge label={t.tag} tone={t.tone} />} />
        ))}
        <ListRow icon="checkmark" color={theme.mint} title="אישורי פעילות מחוץ למשפחתון" sub="כל 10 המשפחות אישרו" right={<Badge label="הושלם" tone="ok" />} />
      </Card>

      <Card>
        <CardTitle>חופשות ואירועים</CardTitle>
        {events.map((e) => (
          <ListRow key={e.id} icon="calendar-outline" color={theme.coral} title={`${e.day} ${e.month} · ${e.title}`} sub={e.sub} right={<Badge label={e.tag} tone={e.tone} />} />
        ))}
      </Card>

      <Card>
        <CardTitle>הגדרות משפחתון</CardTitle>
        <ListRow title="סוג מסגרת" sub="משפחתון" />
        <ListRow title="אזור זמן" sub="Asia/Jerusalem" />
        <ListRow title="שעות פעילות" sub="טרם הוגדרו" right={<Badge label="להשלמה" tone="warn" />} />
      </Card>
    </MoreScreen>
  );
}
