import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, useWindowDimensions } from 'react-native';
import { ND, useReducedMotion } from '../lib/motion';
import { theme } from '../theme';

// קונפטי שנופל על כל המסך. כל שינוי ב־fire מפעיל מטח חדש (0 = כבוי).
export function Confetti({ fire, count = 44 }: { fire: number; count?: number }) {
  const reduced = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        delay: Math.random() * 400,
        dur: 1800 + Math.random() * 1400,
        drift: (Math.random() - 0.5) * 140,
        spin: (Math.random() - 0.5) * 900,
        color: theme.fun[i % theme.fun.length],
        w: 6 + Math.random() * 6,
        h: 9 + Math.random() * 8,
        round: Math.random() < 0.3,
      })),
    // מטח חדש = פיזור חדש
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fire, count, width],
  );
  const vals = useRef<Animated.Value[]>([]);
  if (vals.current.length !== count) vals.current = pieces.map(() => new Animated.Value(0));

  useEffect(() => {
    if (!fire || reduced) return;
    setVisible(true);
    vals.current.forEach((v) => v.setValue(0));
    const anim = Animated.parallel(
      pieces.map((p, i) =>
        Animated.timing(vals.current[i], {
          toValue: 1,
          duration: p.dur,
          delay: p.delay,
          easing: Easing.bezier(0.2, 0.6, 0.4, 1),
          useNativeDriver: ND,
        }),
      ),
    );
    anim.start(() => setVisible(false));
    return () => anim.stop();
  }, [fire, reduced, pieces]);

  if (!visible) return null;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => {
        const v = vals.current[i];
        return (
          <Animated.View
            key={i}
            style={{
              position: 'absolute',
              left: p.x,
              top: -24,
              width: p.w,
              height: p.round ? p.w : p.h,
              borderRadius: p.round ? p.w / 2 : 2,
              backgroundColor: p.color,
              opacity: v.interpolate({ inputRange: [0, 0.85, 1], outputRange: [1, 1, 0] }),
              transform: [
                { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, height * 0.95] }) },
                { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [0, p.drift] }) },
                { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin}deg`] }) },
              ],
            }}
          />
        );
      })}
    </View>
  );
}
