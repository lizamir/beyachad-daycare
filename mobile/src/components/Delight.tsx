// רגעים קטנים של שמחה: עוגת יום הולדת, מצב לילה, צלחת, רגע גדול ומדבקות.
// כל האנימציות נעצרות כשהמכשיר מוגדר ל"הפחתת תנועה".
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { E, S } from '../lib/dir';
import { ND, useReducedMotion } from '../lib/motion';
import { theme } from '../theme';
import { Txt } from './Txt';
import { type IconName } from './ui';

const loop = (v: Animated.Value, to: number, ms: number, delay = 0) =>
  Animated.loop(
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(v, { toValue: to, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
      Animated.timing(v, { toValue: 0, duration: ms, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
    ]),
  );

/* ───────── עוגת יום הולדת: נגיעה בנרות מכבה אותם ───────── */
function Flame({ out }: { out: boolean }) {
  const reduced = useReducedMotion();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduced || out) return;
    const a = loop(v, 1, 380);
    a.start();
    return () => a.stop();
  }, [reduced, out, v]);
  if (out) return <View style={{ height: 16 }} />;
  return (
    <Animated.View
      style={{
        width: 10, height: 16, borderRadius: 8, borderTopLeftRadius: 2, backgroundColor: theme.sun,
        alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 2,
        transform: [{ rotate: '45deg' }, { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.12] }) }],
      }}
    >
      <View style={{ width: 4, height: 6, borderRadius: 3, backgroundColor: '#ff9a3c' }} />
    </Animated.View>
  );
}

export function BirthdayCake({ candles, onBlow }: { candles: number; onBlow: () => void }) {
  const [out, setOut] = useState(false);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={out ? 'הנרות כבויים' : 'נגיעה מכבה את הנרות'}
      disabled={out}
      onPress={() => {
        setOut(true);
        onBlow();
      }}
      style={{ alignItems: 'center' }}
    >
      <View style={{ flexDirection: 'row', gap: 14, alignItems: 'flex-end' }}>
        {Array.from({ length: candles }).map((_, i) => (
          <View key={i} style={{ alignItems: 'center', gap: 2 }}>
            <Flame out={out} />
            <View style={{ width: 8, height: 26, borderRadius: 3, backgroundColor: theme.sky, borderWidth: 2, borderColor: '#fff' }} />
          </View>
        ))}
      </View>
      <View style={{ width: 104, height: 26, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: '#fff0b8' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 }}>
          {theme.fun.slice(0, 5).map((c) => <View key={c} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c }} />)}
        </View>
      </View>
      <View style={{ width: 136, height: 36, borderRadius: 12, backgroundColor: theme.pink, overflow: 'hidden' }}>
        <View style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 8 }}>
          {[10, 16, 9, 14, 11, 15, 10].map((h, i) => <View key={i} style={{ flex: 1, height: h, backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />)}
        </View>
      </View>
      <View style={{ width: 160, height: 8, borderRadius: 4, backgroundColor: theme.line, marginTop: 2 }} />
      <Txt w={600} size={13} color={theme.muted} style={{ marginTop: 6 }}>
        {out ? 'הנרות כובו. יום הולדת שמח!' : 'נגעו בעוגה כדי לכבות את הנרות'}
      </Txt>
    </Pressable>
  );
}

/* ───────── מצב לילה על תמונת הראש כשהילד ישן ───────── */
const STARS = [[12, 14], [30, 30], [70, 10], [86, 26], [22, 52], [58, 22], [92, 48]];

export function NightOverlay({ label }: { label: string }) {
  const reduced = useReducedMotion();
  const fade = useRef(new Animated.Value(reduced ? 1 : 0)).current;
  const twinkle = useRef(STARS.map(() => new Animated.Value(0))).current;
  const zs = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 900, useNativeDriver: ND }).start();
    if (reduced) return;
    const anims = [
      ...twinkle.map((v, i) => loop(v, 1, 900 + i * 170, i * 120)),
      ...zs.map((v, i) =>
        Animated.loop(
          Animated.sequence([
            Animated.delay(i * 700),
            Animated.timing(v, { toValue: 1, duration: 2100, easing: Easing.out(Easing.quad), useNativeDriver: ND }),
            Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: ND }),
          ]),
        ),
      ),
    ];
    anims.forEach((a) => a.start());
    return () => anims.forEach((a) => a.stop());
  }, [reduced, fade, twinkle, zs]);

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: fade }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.night, opacity: 0.84 }]} />
      {STARS.map(([x, y], i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute', left: `${x}%`, top: `${y}%`, width: 5, height: 5, borderRadius: 3, backgroundColor: '#fff6c9',
            opacity: reduced ? 0.8 : twinkle[i].interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }),
          }}
        />
      ))}
      {/* ירח: עיגול צהוב שעיגול בצבע הלילה "נוגס" בו */}
      <View style={{ position: 'absolute', top: '16%', ...S('12%'), width: 52, height: 52 }}>
        <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff3c4' }} />
        <View style={{ position: 'absolute', top: -6, ...E(-12), width: 50, height: 50, borderRadius: 25, backgroundColor: '#3a3566' }} />
      </View>
      {zs.map((v, i) => (
        <Animated.View
          key={i}
          style={{
            position: 'absolute', top: '40%', ...E(`${22 + i * 9}%`),
            opacity: reduced ? 0.8 : v.interpolate({ inputRange: [0, 0.2, 0.8, 1], outputRange: [0, 1, 1, 0] }),
            transform: [{ translateY: reduced ? 0 : v.interpolate({ inputRange: [0, 1], outputRange: [10, -46] }) }],
          }}
        >
          <Txt w={700} size={18 + i * 6} color="#fff6c9">z</Txt>
        </Animated.View>
      ))}
      <View style={{ position: 'absolute', top: '58%', left: 0, right: 0, alignItems: 'center' }}>
        <Txt w={600} size={15} color="#fff6c9">{label}</Txt>
      </View>
    </Animated.View>
  );
}

/* ───────── צלחת שמתמלאת לפי כמה הילד אכל ───────── */
function pie(cx: number, cy: number, r: number, frac: number) {
  if (frac <= 0) return '';
  if (frac >= 0.999) return `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
  const a = frac * Math.PI * 2;
  const x = cx + r * Math.sin(a);
  const y = cy - r * Math.cos(a);
  return `M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${a > Math.PI ? 1 : 0} 1 ${x} ${y} Z`;
}

export function Plate({ amount, size = 44 }: { amount: number; size?: number }) {
  const reduced = useReducedMotion();
  const v = useRef(new Animated.Value(0)).current;
  const [frac, setFrac] = useState(reduced ? amount : 0);
  useEffect(() => {
    if (reduced) {
      setFrac(amount);
      return;
    }
    v.setValue(0);
    const id = v.addListener(({ value }) => setFrac(value));
    Animated.timing(v, { toValue: amount, duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [amount, reduced, v]);
  const c = size / 2;
  return (
    <Svg width={size} height={size} accessibilityLabel={`אכלה בערך ${Math.round(amount * 100)} אחוז`}>
      <Circle cx={c} cy={c} r={c - 1} fill="#fff" stroke={theme.line} strokeWidth={2} />
      <Circle cx={c} cy={c} r={c * 0.72} fill="#fff7f2" />
      <Path d={pie(c, c, c * 0.6, frac)} fill={theme.kind.meal} />
    </Svg>
  );
}

/* ───────── רגע גדול: כוכבים קופצים סביב האייקון ───────── */
const STAR_POS = [[-34, -18], [34, -22], [-26, 22], [30, 20], [0, -38]];

export function MilestoneBurst({ icon }: { icon: IconName }) {
  const reduced = useReducedMotion();
  const pops = useRef(STAR_POS.map(() => new Animated.Value(reduced ? 1 : 0))).current;
  useEffect(() => {
    if (reduced) return;
    Animated.stagger(
      140,
      pops.map((v) => Animated.spring(v, { toValue: 1, friction: 4, tension: 120, useNativeDriver: ND })),
    ).start();
  }, [reduced, pops]);
  return (
    <View style={{ width: 96, height: 96, alignItems: 'center', justifyContent: 'center' }}>
      {STAR_POS.map(([x, y], i) => (
        <Animated.View key={i} style={{ position: 'absolute', transform: [{ translateX: x }, { translateY: y }, { scale: pops[i] }] }}>
          <Ionicons name="star" size={i === 4 ? 18 : 13} color={theme.fun[i]} />
        </Animated.View>
      ))}
      <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: theme.lilac, alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={28} color="#fff" />
      </View>
    </View>
  );
}

/* ───────── מדבקת סוף היום ───────── */
export function Sticker({
  color, icon, label, day, pending, index = 0,
}: { color: string; icon: IconName; label: string; day: string; pending?: boolean; index?: number }) {
  const reduced = useReducedMotion();
  const pop = useRef(new Animated.Value(reduced ? 1 : 0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduced) return;
    Animated.sequence([
      Animated.delay(index * 140),
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 110, useNativeDriver: ND }),
    ]).start();
    if (pending) {
      const a = loop(pulse, 1, 1100);
      a.start();
      return () => a.stop();
    }
  }, [reduced, pending, index, pop, pulse]);
  const tilt = ['-8deg', '6deg', '-4deg', '9deg', '-6deg'][index % 5];
  return (
    <View style={{ alignItems: 'center', gap: 4, width: 64 }}>
      <Animated.View
        style={{
          width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center',
          backgroundColor: pending ? 'transparent' : color, borderWidth: pending ? 2 : 3,
          borderStyle: pending ? 'dashed' : 'solid', borderColor: pending ? theme.muted : '#fff',
          boxShadow: pending ? undefined : theme.shadow,
          transform: [
            { rotate: tilt },
            { scale: pending && !reduced ? pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) : pop },
          ],
        }}
      >
        {pending ? <Txt w={700} size={20} color={theme.muted}>?</Txt> : <Ionicons name={icon} size={24} color="#fff" />}
      </Animated.View>
      <Txt w={700} size={12}>{day}</Txt>
      <Txt size={11} color={theme.muted} style={{ textAlign: 'center' }}>{label}</Txt>
    </View>
  );
}

/* ───────── קפיצה קטנה (לאווטאר שעודכן) ───────── */
export function useBounce() {
  const reduced = useReducedMotion();
  const v = useRef(new Animated.Value(1)).current;
  const bounce = () => {
    if (reduced) return;
    Animated.sequence([
      Animated.spring(v, { toValue: 1.3, friction: 3, tension: 200, useNativeDriver: ND }),
      Animated.spring(v, { toValue: 1, friction: 4, useNativeDriver: ND }),
    ]).start();
  };
  return { scale: v, bounce };
}
