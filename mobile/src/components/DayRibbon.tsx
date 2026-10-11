import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, View, type DimensionValue, type ViewStyle } from 'react-native';
import { ND, useReducedMotion } from '../lib/motion';
import { E, MS, S } from '../lib/dir';
import { NOW, pct, span, toMin, type DayEvent } from '../lib/day';
import { theme } from '../theme';
import { Txt } from './Txt';

const LABEL_W = 42;
const GAP = 8;

const LANES: { label: string; kind: DayEvent['kind'] | 'presence' }[] = [
  { label: 'נוכחות', kind: 'presence' },
  { label: 'אוכל', kind: 'meal' },
  { label: 'שינה', kind: 'sleep' },
  { label: 'טיפול', kind: 'care' },
];

const nowPct = parseFloat(pct(toMin(NOW)));
const asPct = (n: number) => `${n}%` as DimensionValue;
// החלק שאחרי "עכשיו" עד סוף הציר: מה שטרם עודכן
const futureW = asPct(100 - nowPct);

function Future({ radius }: { radius: number }) {
  return (
    <View
      pointerEvents="none"
      style={{ position: 'absolute', top: 0, bottom: 0, ...E(0), width: futureW, backgroundColor: theme.future, borderRadius: radius }}
    />
  );
}

function Hit({
  id,
  label,
  selected,
  onSelect,
  point,
  style,
}: {
  id: string;
  label: string;
  selected: boolean;
  onSelect?: (id: string) => void;
  point?: boolean;
  style: ViewStyle;
}) {
  const base: ViewStyle = point
    ? { position: 'absolute', top: 4, width: 14, height: 14, borderRadius: 7, ...MS(-7) }
    : { position: 'absolute', top: 2, bottom: 2, borderRadius: 5, minWidth: 10 };
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => onSelect?.(id)}
      hitSlop={6}
      style={[base, style, selected && { borderWidth: 2, borderColor: theme.ink }]}
    />
  );
}

// עקבות קטנות שהולכות על נתיב הנוכחות, מההגעה ועד עכשיו
function Footprints({ arrival }: { arrival: string }) {
  const reduced = useReducedMotion();
  const steps = 5;
  const from = parseFloat(pct(toMin(arrival)));
  const vals = useRef(Array.from({ length: steps }, () => new Animated.Value(reduced ? 1 : 0))).current;
  useEffect(() => {
    if (reduced) return;
    Animated.stagger(220, vals.map((v) => Animated.timing(v, { toValue: 1, duration: 260, useNativeDriver: ND }))).start();
  }, [reduced, vals]);
  return (
    <>
      {vals.map((v, i) => {
        const at = from + ((nowPct - from) * (i + 0.6)) / steps;
        return (
          <Animated.View
            key={i}
            pointerEvents="none"
            style={{
              position: 'absolute', top: i % 2 ? 3 : 7, ...S(asPct(at)), zIndex: 2,
              opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0, 0.75] }),
              transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }, { rotate: '-90deg' }],
            }}
          >
            <Ionicons name="footsteps" size={11} color="#fff" />
          </Animated.View>
        );
      })}
    </>
  );
}

// הפס המלא: ארבעה נתיבים (נוכחות, אוכל, שינה, טיפול) וקו "עכשיו"
export function DayRibbon({
  arrival,
  events,
  selectedId,
  onSelect,
}: {
  arrival: string;
  events: DayEvent[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  return (
    <View>
      <View style={{ gap: 6 }}>
        {LANES.map((lane) => {
          const tint = lane.kind === 'presence' ? theme.kindTint.presence : theme.kindTint[lane.kind];
          return (
            <View key={lane.kind} style={{ flexDirection: 'row', alignItems: 'center', gap: GAP }}>
              <Txt w={500} size={11} color={theme.muted} style={{ width: LABEL_W }}>{lane.label}</Txt>
              <View style={{ flex: 1, height: 22, borderRadius: 6, backgroundColor: tint }}>
                <Future radius={6} />
                {lane.kind === 'presence' && (
                  <Hit
                    id="arrival"
                    label={`נוכחת מ־${arrival}`}
                    selected={selectedId === 'arrival'}
                    onSelect={onSelect}
                    style={{ ...S(pct(toMin(arrival))), width: span(arrival, NOW), backgroundColor: '#9db6f7' }}
                  />
                )}
                {lane.kind === 'presence' && <Footprints arrival={arrival} />}
                {events
                  .filter((e) => e.kind === lane.kind)
                  .map((e) => (
                    <Hit
                      key={e.id}
                      id={e.id}
                      label={`${e.title} ${e.start}`}
                      selected={selectedId === e.id}
                      onSelect={onSelect}
                      point={!e.end}
                      style={{
                        ...S(pct(toMin(e.start))),
                        backgroundColor: theme.kind[e.kind],
                        ...(e.end ? { width: span(e.start, e.end) } : null),
                      }}
                    />
                  ))}
              </View>
            </View>
          );
        })}
      </View>

      <View style={{ flexDirection: 'row', gap: GAP, marginTop: 4 }}>
        <View style={{ width: LABEL_W }} />
        <View style={{ flex: 1, height: 16 }}>
          {[8, 10, 12, 14, 16].map((h) => (
            <View key={h} style={{ position: 'absolute', ...S(pct(h * 60)), width: 24, ...MS(-12), alignItems: 'center' }}>
              <Txt w={500} size={11} color={theme.muted}>{String(h).padStart(2, '0')}</Txt>
            </View>
          ))}
        </View>
      </View>

      {/* קו "עכשיו" חוצה את כל הנתיבים */}
      <View pointerEvents="none" style={{ position: 'absolute', top: -4, bottom: 20, ...S(LABEL_W + GAP), ...E(0) }}>
        <View style={{ position: 'absolute', top: 0, bottom: 0, width: 2, borderRadius: 2, backgroundColor: theme.now, ...S(pct(toMin(NOW))) }} />
      </View>
    </View>
  );
}

// פס קטן לילד ברשימת הצוות
export function MiniRibbon({
  arrival,
  meals,
  sleeps,
  care,
}: {
  arrival: string;
  meals: [string, string][];
  sleeps: [string, string][];
  care: string[];
}) {
  const bar = (from: string, to: string, color: string, key: string) => (
    <View key={key} style={{ position: 'absolute', top: 0, bottom: 0, borderRadius: 3, backgroundColor: color, ...S(pct(toMin(from))), width: span(from, to) }} />
  );
  return (
    <View style={{ height: 10, borderRadius: 5, backgroundColor: theme.kindTint.presence }}>
      <Future radius={5} />
      <View style={{ position: 'absolute', top: 3, bottom: 3, borderRadius: 3, backgroundColor: '#cddafb', ...S(pct(toMin(arrival))), width: span(arrival, NOW) }} />
      {meals.map(([a, b], i) => bar(a, b, theme.kind.meal, `m${i}`))}
      {sleeps.map(([a, b], i) => bar(a, b, theme.kind.sleep, `s${i}`))}
      {care.map((t, i) => (
        <View key={`c${i}`} style={{ position: 'absolute', top: 0, bottom: 0, width: 6, borderRadius: 3, backgroundColor: theme.kind.care, ...S(pct(toMin(t))), ...MS(-3) }} />
      ))}
      <View style={{ position: 'absolute', top: -2, bottom: -2, width: 2, backgroundColor: theme.now, ...S(pct(toMin(NOW))) }} />
    </View>
  );
}
