import { Ionicons } from '@expo/vector-icons';
import { E, MS, S } from '../../src/lib/dir';
import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DayRibbon } from '../../src/components/DayRibbon';
import { Scene } from '../../src/components/Scene';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, Disc, Screen, type IconName } from '../../src/components/ui';
import { parentDay as d } from '../../src/data/demo';
import { type DayEvent } from '../../src/lib/day';
import { theme } from '../../src/theme';

const kindIcon: Record<DayEvent['kind'], IconName> = {
  meal: 'restaurant-outline',
  sleep: 'moon-outline',
  care: 'water-outline',
};

function Row({ icon, color, title, detail, time, dim }: { icon: IconName; color: string; title: string; detail: string; time: string; dim?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 9, opacity: dim ? 0.7 : 1 }}>
      <Disc icon={icon} color={dim ? '#c5cde4' : color} />
      <View style={{ flex: 1 }}>
        <Txt w={600} size={14}>{title}</Txt>
        <Txt size={13} color={theme.muted}>{detail}</Txt>
      </View>
      <Txt w={500} size={13} color={theme.muted}>{time}</Txt>
    </View>
  );
}

export default function ParentToday() {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<string>('arrival');
  const ev = d.events.find((e) => e.id === selected);
  const detail = ev
    ? { icon: kindIcon[ev.kind], color: theme.kind[ev.kind], head: ev.title, rest: `${ev.start}${ev.end ? `–${ev.end}` : ''} · ${ev.detail}` }
    : { icon: 'checkmark' as IconName, color: theme.kind.arrival, head: `הגיעה ${d.arrival}`, rest: `איסוף צפוי ${d.pickup}` };

  return (
    <Screen flush>
      <View style={{ height: 318 + insets.top, borderBottomStartRadius: 30, borderBottomEndRadius: 30, overflow: 'hidden' }}>
        <Scene name={d.lastPhoto.scene} label={d.lastPhoto.caption} />
        <View style={{ position: 'absolute', ...S(14), top: insets.top + 12, backgroundColor: theme.sun, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 5 }}>
          <Txt w={700} size={12} color={theme.sunInk}>התמונה האחרונה · {d.lastPhoto.time}</Txt>
        </View>
        <View
          style={{
            position: 'absolute', ...S(12), ...E(12), bottom: 12, backgroundColor: '#fff', borderRadius: 20,
            padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Txt accessibilityRole="header" w={700} size={21}>{d.lastPhoto.caption}</Txt>
            <Txt size={13} color={theme.muted}>{d.dayLabel} · {d.updatedAgo}</Txt>
          </View>
          <Badge label="ערה ומשחקת" tone="ok" dot />
        </View>
      </View>

      <View style={{ paddingHorizontal: 14, gap: 12 }}>
        <Card>
          <CardTitle note="נגעו בפס לפרטים">{`היום של ${d.childName}`}</CardTitle>
          <DayRibbon arrival={d.arrival} events={d.events} selectedId={selected} onSelect={setSelected} />
          <View
            accessibilityRole="summary"
            style={{ marginTop: 6, backgroundColor: '#eef2fc', borderRadius: 12, padding: 10, minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: 10 }}
          >
            <Disc icon={detail.icon} color={detail.color} />
            <View style={{ flex: 1 }}>
              <Txt w={600} size={14}>{detail.head}</Txt>
              <Txt size={13} color={theme.muted}>{detail.rest}</Txt>
            </View>
          </View>
        </Card>

        <Card>
          <CardTitle>מה קרה</CardTitle>
          {[...d.events].reverse().map((e) => (
            <Row key={e.id} icon={kindIcon[e.kind]} color={theme.kind[e.kind]} title={e.title} detail={e.detail} time={e.end ?? e.start} />
          ))}
          <Row icon="checkmark" color={theme.kind.arrival} title="הגיעה" detail="נכנסה בחיוך" time={d.arrival} />
          <Row icon="cube-outline" color="#c5cde4" title={d.pending.title} detail={d.pending.detail} time="בהמשך" dim />
        </Card>

        <Card>
          <CardTitle note={`${d.morePhotos} חדשות`}>עוד תמונות מהיום</CardTitle>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {(['b', 'c', 'a'] as const).map((n) => (
              <View key={n} style={{ flex: 1, aspectRatio: 1, borderRadius: 12, overflow: 'hidden' }}>
                <Scene name={n} label="תמונה מהיום" />
              </View>
            ))}
          </View>
        </Card>

        <View style={{ backgroundColor: theme.sun, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Ionicons name="bag-handle-outline" size={20} color={theme.sunInk} />
          <Txt size={14} w={500} color={theme.sunInk} style={{ flex: 1 }}>
            <Txt size={14} w={700} color={theme.sunInk}>מהמשפחתון: </Txt>
            {d.notice}
          </Txt>
        </View>
      </View>
    </Screen>
  );
}
