import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Confetti } from '../../src/components/Confetti';
import { DayRibbon } from '../../src/components/DayRibbon';
import { BirthdayCake, MilestoneBurst, NightOverlay, Plate, Sticker } from '../../src/components/Delight';
import { Scene } from '../../src/components/Scene';
import { Txt } from '../../src/components/Txt';
import { Badge, Card, CardTitle, Disc, Screen, Seg, type IconName } from '../../src/components/ui';
import { parentDay as d } from '../../src/data/demo';
import { E, S } from '../../src/lib/dir';
import { type DayEvent } from '../../src/lib/day';
import { theme } from '../../src/theme';

const kindIcon: Record<DayEvent['kind'], IconName> = {
  meal: 'restaurant-outline',
  sleep: 'moon-outline',
  care: 'water-outline',
};

// מצב הדגמה: איך המסך נראה ביום הולדת, כשהילד ישן, וביום רגיל
type Mode = 'birthday' | 'sleeping' | 'regular';

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
  const [mode, setMode] = useState<Mode>('birthday');
  const [selected, setSelected] = useState<string>('arrival');
  const [confetti, setConfetti] = useState(0);

  useEffect(() => {
    if (mode === 'birthday') setConfetti((n) => n + 1);
  }, [mode]);

  const ev = d.events.find((e) => e.id === selected);
  const caption =
    mode === 'birthday' ? d.birthday.title : mode === 'sleeping' ? 'נועה בשנת צהריים' : d.lastPhoto.caption;
  const status =
    mode === 'birthday'
      ? { label: 'חוגגת!', tone: 'pink' as const }
      : mode === 'sleeping'
        ? { label: 'ישנה מ־12:15', tone: 'cool' as const }
        : { label: d.status, tone: 'ok' as const };

  return (
    <View style={{ flex: 1 }}>
      <Screen flush>
        <View style={{ height: 318 + insets.top, borderBottomLeftRadius: 34, borderBottomRightRadius: 34, overflow: 'hidden' }}>
          <Scene name={mode === 'birthday' ? 'party' : d.lastPhoto.scene} label={caption} />
          {mode === 'sleeping' && <NightOverlay label={d.sleepingLabel} />}
          <View style={{ position: 'absolute', ...S(14), top: insets.top + 12, backgroundColor: mode === 'birthday' ? theme.pink : theme.sun, borderRadius: 999, paddingHorizontal: 11, paddingVertical: 5 }}>
            <Txt w={700} size={12} color={mode === 'birthday' ? '#fff' : theme.sunInk}>
              {mode === 'birthday' ? 'יום הולדת שמח' : `התמונה האחרונה · ${d.lastPhoto.time}`}
            </Txt>
          </View>
          <View style={{ position: 'absolute', ...S(12), ...E(12), bottom: 12, backgroundColor: '#fff', borderRadius: 22, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10, boxShadow: theme.shadow }}>
            <View style={{ flex: 1 }}>
              <Txt accessibilityRole="header" w={700} size={20}>{caption}</Txt>
              <Txt size={13} color={theme.muted}>{d.dayLabel} · {d.updatedAgo}</Txt>
            </View>
            <Badge label={status.label} tone={status.tone} dot />
          </View>
        </View>

        <View style={{ paddingHorizontal: 14, gap: 14 }}>
          {mode === 'birthday' && (
            <Card style={{ backgroundColor: '#ffe9f1', alignItems: 'center' }}>
              <CardTitle>{`חוגגים לנועה`}</CardTitle>
              <BirthdayCake candles={d.birthday.candles} onBlow={() => setConfetti((n) => n + 1)} />
              <Txt size={14} style={{ textAlign: 'center' }}>{d.birthday.plan}</Txt>
            </Card>
          )}

          <Card>
            <CardTitle note="נגעו בפס לפרטים">{`היום של ${d.childName}`}</CardTitle>
            <DayRibbon arrival={d.arrival} events={d.events} selectedId={selected} onSelect={setSelected} />
            <View accessibilityRole="summary" style={{ marginTop: 6, backgroundColor: '#eef2fc', borderRadius: 14, padding: 10, minHeight: 56, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              {ev?.amount != null ? (
                <Plate key={ev.id} amount={ev.amount} />
              ) : (
                <Disc icon={ev ? kindIcon[ev.kind] : 'footsteps'} color={ev ? theme.kind[ev.kind] : theme.kind.arrival} size={40} />
              )}
              <View style={{ flex: 1 }}>
                <Txt w={600} size={14}>{ev ? ev.title : `הגיעה ${d.arrival}`}</Txt>
                <Txt size={13} color={theme.muted}>
                  {ev ? `${ev.start}${ev.end ? `–${ev.end}` : ''} · ${ev.detail}` : `איסוף צפוי ${d.pickup}`}
                </Txt>
              </View>
            </View>
          </Card>

          <Card style={{ backgroundColor: '#f1eeff', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MilestoneBurst icon={d.milestone.icon} />
            <View style={{ flex: 1, gap: 2 }}>
              <Txt w={600} size={12} color="#5b4fc4">רגע גדול</Txt>
              <Txt w={700} size={17}>{d.milestone.title}</Txt>
              <Txt size={13}>{d.milestone.note}</Txt>
              <Txt size={12} color={theme.muted}>{d.milestone.by}</Txt>
            </View>
          </Card>

          <Card>
            <CardTitle>מה קרה</CardTitle>
            {[...d.events].reverse().map((e) => (
              <Row key={e.id} icon={kindIcon[e.kind]} color={theme.kind[e.kind]} title={e.title} detail={e.detail} time={e.end ?? e.start} />
            ))}
            <Row icon="footsteps" color={theme.kind.arrival} title="הגיעה" detail="נכנסה בחיוך" time={d.arrival} />
            <Row icon="cube-outline" color="#c5cde4" title={d.pending.title} detail={d.pending.detail} time="בהמשך" dim />
          </Card>

          <Card style={{ backgroundColor: '#eaf8f2' }}>
            <CardTitle note="מדבקה אחת בכל סוף יום">המדבקות של השבוע</CardTitle>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {d.stickers.map((s, i) => (
                <Sticker key={s.day} index={i} {...s} />
              ))}
            </View>
          </Card>

          <Card>
            <CardTitle note={`${d.morePhotos} חדשות`}>עוד תמונות מהיום</CardTitle>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {(['b', 'c', 'a'] as const).map((n) => (
                <View key={n} style={{ flex: 1, aspectRatio: 1, borderRadius: 16, overflow: 'hidden' }}>
                  <Scene name={n} label="תמונה מהיום" />
                </View>
              ))}
            </View>
          </Card>

          <View style={{ backgroundColor: theme.sun, borderRadius: 18, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="bag-handle-outline" size={20} color={theme.sunInk} />
            <Txt size={14} w={500} color={theme.sunInk} style={{ flex: 1 }}>
              <Txt size={14} w={700} color={theme.sunInk}>מהמשפחתון: </Txt>
              {d.notice}
            </Txt>
          </View>

          <View style={{ gap: 6, marginTop: 6 }}>
            <Txt w={600} size={12} color={theme.muted}>תצוגת דמו: איך המסך נראה כש…</Txt>
            <Seg
              value={mode}
              onChange={setMode}
              options={[
                { value: 'birthday', label: 'יום הולדת' },
                { value: 'sleeping', label: 'ישנה' },
                { value: 'regular', label: 'יום רגיל' },
              ]}
            />
          </View>
        </View>
      </Screen>
      <Confetti fire={confetti} />
    </View>
  );
}
