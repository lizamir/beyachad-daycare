import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// פסים צבעוניים מתפתלים ברקע (השראה: פוסטר הצבעים). שקופים למחצה כדי להישאר רגועים.
export function Squiggles({ opacity = 0.45 }: { opacity?: number }) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" opacity={opacity}>
        <Path d="M-30 90 C 50 10, 120 170, 210 90 S 360 10, 440 100" stroke="#f59ac0" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M320 -30 C 270 70, 410 110, 350 210" stroke="#ffc23d" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M-20 620 C 70 560, 140 700, 240 640" stroke="#5cc9a0" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M250 820 C 290 720, 430 760, 420 680" stroke="#7cc3f5" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M-40 760 C 30 720, 60 820, 140 790" stroke="#ff9a3c" strokeWidth={16} strokeLinecap="round" fill="none" />
        <Path d="M380 420 C 330 460, 360 520, 420 520" stroke="#a89cf0" strokeWidth={16} strokeLinecap="round" fill="none" />
      </Svg>
    </View>
  );
}
