import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, Screen } from '../../src/components/ui';
import { childrenAdmin } from '../../src/data/demo';
import { theme } from '../../src/theme';

const AVATAR = ['#ffd978', '#9be8c4', '#b9ccff', '#ffb7ad', '#d7c9ff', '#9fe0ee', '#ffcf9e', '#c8e6a0'];

export default function Children() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <Screen title="ילדים ומשפחות" subtitle={`${childrenAdmin.length} ילדים`}>
      {childrenAdmin.map((c, i) => {
        const on = open === c.id;
        return (
          <Pressable key={c.id} accessibilityRole="button" accessibilityState={{ expanded: on }} onPress={() => setOpen(on ? null : c.id)}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: AVATAR[i % AVATAR.length], alignItems: 'center', justifyContent: 'center' }}>
                  <Txt w={700} size={16} color="#10224a">{c.name[0]}</Txt>
                </View>
                <View style={{ flex: 1 }}>
                  <Txt w={600} size={15}>{c.name}</Txt>
                  <Txt size={12.5} color={theme.muted}>{c.parent}</Txt>
                </View>
                {c.allergy ? <Badge label="אלרגיה" tone="bad" /> : null}
                {c.consentMissing ? <Badge label="חסר אישור צילום" tone="warn" /> : null}
              </View>
              {on && (
                <View style={{ gap: 4, marginTop: 4 }}>
                  <Txt size={13}><Txt w={600} size={13}>נולד/ה: </Txt>{c.birth}</Txt>
                  <Txt size={13}><Txt w={600} size={13}>קבוצה: </Txt>{c.group}</Txt>
                  <Txt size={13}><Txt w={600} size={13}>אלרגיות: </Txt>{c.allergy || 'אין ידועות'}</Txt>
                  <Txt size={12} color={theme.muted}>הוספת ילד ועריכת פרטים יתווספו עם חיבור השרת.</Txt>
                </View>
              )}
            </Card>
          </Pressable>
        );
      })}
    </Screen>
  );
}
