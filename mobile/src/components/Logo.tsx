import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';
import { Txt } from './Txt';

// גנלי: כל אות בצבע אחר ובהטיה קטנה, ופס מתפתל צבעוני מתחת
const LETTERS = [
  { ch: 'ג', color: '#ff7a6b', rotate: '-6deg', lift: 0 },
  { ch: 'נ', color: '#ffb020', rotate: '4deg', lift: -3 },
  { ch: 'ל', color: '#5cc9a0', rotate: '-3deg', lift: 1 },
  { ch: 'י', color: '#7c8cf0', rotate: '8deg', lift: -2 },
];

export function Logo({ size = 48, tagline }: { size?: number; tagline?: string }) {
  const w = size * 2.7;
  return (
    <View accessible accessibilityRole="header" accessibilityLabel={tagline ? `גנלי, ${tagline}` : 'גנלי'} style={{ alignItems: 'flex-start', gap: 2 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: size * 0.04 }}>
        {LETTERS.map((l) => (
          <Txt
            key={l.ch}
            w={700}
            size={size}
            color={l.color}
            style={{ lineHeight: size * 1.15, transform: [{ rotate: l.rotate }, { translateY: l.lift }] }}
          >
            {l.ch}
          </Txt>
        ))}
        {/* שמש קטנה במקום נקודה */}
        <View style={{ width: size * 0.22, height: size * 0.22, borderRadius: size, backgroundColor: theme.sun, marginBottom: size * 0.62, marginHorizontal: size * 0.04 }} />
      </View>
      <Svg width={w} height={size * 0.26} viewBox="0 0 135 13">
        <Path d="M2 7 C 12 1, 20 12, 32 6" stroke="#ff7a6b" strokeWidth={4} strokeLinecap="round" fill="none" />
        <Path d="M38 6 C 48 0, 56 12, 68 6" stroke="#ffc23d" strokeWidth={4} strokeLinecap="round" fill="none" />
        <Path d="M74 6 C 84 0, 92 12, 104 6" stroke="#5cc9a0" strokeWidth={4} strokeLinecap="round" fill="none" />
        <Path d="M110 6 C 118 1, 126 11, 133 6" stroke="#7cc3f5" strokeWidth={4} strokeLinecap="round" fill="none" />
      </Svg>
      {tagline ? <Txt w={500} size={Math.max(13, size * 0.3)} color={theme.muted}>{tagline}</Txt> : null}
    </View>
  );
}
