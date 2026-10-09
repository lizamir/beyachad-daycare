import { useState } from 'react';
import { View } from 'react-native';
import { Field } from '../../src/components/form';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, CardTitle, Screen, SectionTitle } from '../../src/components/ui';
import { announcements } from '../../src/data/demo';
import { theme } from '../../src/theme';

export default function Messages() {
  const [read, setRead] = useState<string[]>(['n3']);
  const [draft, setDraft] = useState('');
  const [sent, setSent] = useState<{ id: string; text: string }[]>([]);

  const send = () => {
    if (!draft.trim()) return;
    setSent((s) => [{ id: String(Date.now()), text: draft.trim() }, ...s]);
    setDraft('');
  };

  return (
    <Screen title="הודעות" subtitle="הודעות מהמשפחתון ופנייה לצוות">
      {announcements.map((a) => {
        const isRead = !a.needsRead || read.includes(a.id);
        return (
          <Card key={a.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <Txt w={700} size={15} style={{ flex: 1 }}>{a.title}</Txt>
              {!isRead && <Badge label="חדשה" tone="warn" />}
            </View>
            <Txt size={14}>{a.body}</Txt>
            <Txt size={12} color={theme.muted}>{a.time}</Txt>
            {a.needsRead && !isRead && <Btn label="אישרתי קריאה" onPress={() => setRead((r) => [...r, a.id])} />}
            {a.needsRead && isRead && <Badge label="אישרת קריאה" tone="ok" dot />}
          </Card>
        );
      })}

      <SectionTitle>פנייה לצוות</SectionTitle>
      <Card>
        <CardTitle note="הצוות עונה בשעות הפעילות">כתבו לנו</CardTitle>
        <Field label="ההודעה שלך" value={draft} onChangeText={setDraft} multiline placeholder="למשל: אאחר מחר באיסוף" />
        <Btn label="שליחה" onPress={send} disabled={!draft.trim()} />
      </Card>
      {sent.map((m) => (
        <Card key={m.id} style={{ backgroundColor: '#dbe5ff' }}>
          <Txt size={14}>{m.text}</Txt>
          <Badge label="נשלחה לצוות" tone="ok" />
        </Card>
      ))}
    </Screen>
  );
}
