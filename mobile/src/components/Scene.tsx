import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';

export type SceneName = 'a' | 'b' | 'c' | 'party';

// ציורים זמניים במקום תמונות אמיתיות (שיוחלפו בתמונות מהאחסון)
export function Scene({ name, label }: { name: SceneName; label: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" accessibilityLabel={label}>
      {name === 'a' && (
        <>
          <Rect width={120} height={90} fill="#8fd3ff" />
          <Circle cx={96} cy={22} r={12} fill="#ffd23f" />
          <Ellipse cx={30} cy={96} rx={90} ry={38} fill="#6fcf97" />
          <Rect x={28} y={58} width={64} height={22} rx={4} fill="#f2b66d" />
          <Rect x={52} y={44} width={15} height={15} rx={2} fill="#ff4b3a" />
          <Rect x={70} y={52} width={10} height={7} rx={2} fill="#4a42c7" />
        </>
      )}
      {name === 'party' && (
        // דיוקן יום הולדת: באפליקציה האמיתית זו תמונת הפרופיל של הילד, והכובע מונח מעליה
        <>
          <Rect width={120} height={90} fill="#ffe0ec" />
          {[[12, 70, '#ffc23d'], [30, 12, '#5cc9a0'], [86, 70, '#7cc3f5'], [108, 52, '#ff7a6b'], [16, 44, '#a89cf0'], [96, 8, '#ff9a3c']].map(([x, y, c], i) => (
            <Circle key={i} cx={x as number} cy={y as number} r={2.2} fill={c as string} />
          ))}
          <Ellipse cx={20} cy={26} rx={9} ry={11} fill="#7cc3f5" />
          <Path d="M20 37 q-3 10 2 20 q4 10 -1 20" stroke="#5a6c93" strokeWidth={0.8} fill="none" />
          <Ellipse cx={101} cy={24} rx={9} ry={11} fill="#ffc23d" />
          <Path d="M101 35 q3 10 -2 20 q-4 10 1 20" stroke="#5a6c93" strokeWidth={0.8} fill="none" />
          <Ellipse cx={90} cy={44} rx={6.5} ry={8} fill="#a89cf0" />
          <G transform="translate(12 -2) scale(0.8)">
          <Ellipse cx={60} cy={98} rx={30} ry={20} fill="#7cc3f5" />
          <Circle cx={38.5} cy={59} r={4.5} fill="#ffd9b8" />
          <Circle cx={81.5} cy={59} r={4.5} fill="#ffd9b8" />
          <Circle cx={60} cy={58} r={22} fill="#ffd9b8" />
          <Path d="M50 57 q3 -3 6 0" stroke="#0f2147" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Path d="M64 57 q3 -3 6 0" stroke="#0f2147" strokeWidth={2} fill="none" strokeLinecap="round" />
          <Circle cx={47} cy={64} r={3.5} fill="#ff9fb2" opacity={0.85} />
          <Circle cx={73} cy={64} r={3.5} fill="#ff9fb2" opacity={0.85} />
          <Path d="M55 67 q5 5 10 0 z" stroke="#0f2147" strokeWidth={1.6} fill="#ff7a6b" strokeLinejoin="round" />
          <G transform="rotate(-12 60 36)">
            <Path d="M47 38 L60 4 L73 38 Z" fill="#ff7a6b" />
            <Circle cx={60} cy={20} r={2} fill="#fff" />
            <Circle cx={55.5} cy={30} r={2} fill="#ffc23d" />
            <Circle cx={64.5} cy={30} r={2} fill="#5cc9a0" />
            <Rect x={45} y={35} width={30} height={5} rx={2.5} fill="#ffc23d" />
            <Circle cx={60} cy={4} r={4.5} fill="#ffc23d" />
          </G>
          </G>
        </>
      )}
      {name === 'b' && (
        <>
          <Rect width={120} height={90} fill="#ffe3f1" />
          <G fill="none" strokeWidth={9}>
            <Circle cx={60} cy={90} r={56} stroke="#ff4b3a" />
            <Circle cx={60} cy={90} r={45} stroke="#ffc933" />
            <Circle cx={60} cy={90} r={34} stroke="#44d19a" />
            <Circle cx={60} cy={90} r={23} stroke="#4aa8ff" />
          </G>
        </>
      )}
      {name === 'c' && (
        <>
          <Rect width={120} height={90} fill="#cfe9ff" />
          <Rect y={68} width={120} height={22} fill="#f2b66d" />
          <Rect x={30} y={48} width={22} height={22} fill="#ff4b3a" />
          <Rect x={54} y={48} width={22} height={22} fill="#ffc933" />
          <Rect x={78} y={48} width={22} height={22} fill="#44d19a" />
          <Rect x={42} y={26} width={22} height={22} fill="#4aa8ff" />
          <Rect x={66} y={26} width={22} height={22} fill="#ff8fc7" />
          <Rect x={54} y={4} width={22} height={22} fill="#4a42c7" />
        </>
      )}
    </Svg>
  );
}
