import Svg, { Circle, Ellipse, G, Rect } from 'react-native-svg';

export type SceneName = 'a' | 'b' | 'c';

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
