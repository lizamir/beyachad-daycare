import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Field } from '../../src/components/form';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, CardTitle, Screen, SectionTitle } from '../../src/components/ui';
import { announcements as seed, inquiries } from '../../src/data/demo';
import { theme } from '../../src/theme';

type A = (typeof seed)[number];

export default function AdminMessages() {
  const [list, setList] = useState<A[]>(seed);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [needsRead, setNeedsRead] = useState(true);

  const publish = () => {
    if (!title.trim()) return;
    setList((p) => [{ id: String(Date.now()), title: title.trim(), body: body.trim(), time: 'עכשיו', needsRead, readBy: 0, of: 9 }, ...p]);
    setTitle('');
    setBody('');
  };
  const pending = inquiries.filter((q) => !q.done);

  return (
    <Screen title="הודעות" subtitle={`${pending.length} פניות הורים ממתינות למענה`}>
      <Card>
        <CardTitle>הודעה חדשה לכל ההורים</CardTitle>
        <Field label="כותרת" value={title} onChangeText={setTitle} />
        <Field label="תוכן" value={body} onChangeText={setBody} multiline />
        <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: needsRead }} onPress={() => setNeedsRead((v) => !v)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, minHeight: 40 }}>
          <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: theme.cobalt, backgroundColor: needsRead ? theme.cobalt : 'transparent', alignItems: 'center', justifyContent: 'center' }}>
            {needsRead && <Txt w={700} size={13} color="#fff">✓</Txt>}
          </View>
          <Txt size={14}>לבקש אישור קריאה</Txt>
        </Pressable>
        <Btn label="פרסום" onPress={publish} disabled={!title.trim()} />
      </Card>

      <SectionTitle>הודעות שפורסמו</SectionTitle>
      {list.map((a) => (
        <Card key={a.id}>
          <Txt w={700} size={15}>{a.title}</Txt>
          {a.body ? <Txt size={14}>{a.body}</Txt> : null}
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Txt size={12} color={theme.muted}>{a.time}</Txt>
            {a.needsRead ? <Badge label={`נקראה ${a.readBy} מתוך ${a.of}`} tone={a.readBy === a.of ? 'ok' : 'warn'} /> : <Badge label="ללא אישור קריאה" tone="mute" />}
          </View>
        </Card>
      ))}

      <SectionTitle>פניות הורים</SectionTitle>
      <Card>
        {pending.map((q) => (
          <View key={q.id} style={{ paddingVertical: 6 }}>
            <Txt w={600} size={14}>{q.from}</Txt>
            <Txt size={13.5} color={theme.muted}>{q.text}</Txt>
          </View>
        ))}
      </Card>
    </Screen>
  );
}
