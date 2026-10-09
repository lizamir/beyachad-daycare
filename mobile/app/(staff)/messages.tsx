import { useState } from 'react';
import { View } from 'react-native';
import { Txt } from '../../src/components/Txt';
import { Badge, Btn, Card, Screen } from '../../src/components/ui';
import { inquiries } from '../../src/data/demo';
import { theme } from '../../src/theme';

const quick = ['נועה אכלה היטב', 'בסדר, תודה על העדכון', 'נחזור אליך בהמשך'];

export default function StaffMessages() {
  const [replies, setReplies] = useState<Record<string, string>>({});
  const pending = inquiries.filter((q) => !q.done && !replies[q.id]).length;
  return (
    <Screen title="הודעות" subtitle={`${pending} פניות ממתינות למענה`}>
      {inquiries.map((q) => {
        const answered = q.done || replies[q.id];
        return (
          <Card key={q.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
              <Txt w={600} size={14} style={{ flex: 1 }}>{q.from}</Txt>
              <Txt size={12.5} color={theme.muted}>{q.time}</Txt>
            </View>
            <Txt size={15}>{q.text}</Txt>
            {replies[q.id] ? <Txt size={13.5} color="#0a6a43">נשלחה תשובה: {replies[q.id]}</Txt> : null}
            {answered ? (
              <Badge label="טופלה" tone="ok" dot />
            ) : (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
                {quick.map((t) => (
                  <Btn key={t} label={t} tone="soft" onPress={() => setReplies((r) => ({ ...r, [q.id]: t }))} />
                ))}
              </View>
            )}
          </Card>
        );
      })}
    </Screen>
  );
}
