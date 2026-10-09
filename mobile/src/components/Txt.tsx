import { Text, type TextProps } from 'react-native';
import { theme } from '../theme';

const family = {
  400: 'Rubik_400Regular',
  500: 'Rubik_500Medium',
  600: 'Rubik_600SemiBold',
  700: 'Rubik_700Bold',
} as const;

type Props = TextProps & { w?: keyof typeof family; size?: number; color?: string };

// במקום Text רגיל: גופן Rubik לפי משקל (ב־React Native כל משקל הוא משפחה נפרדת)
export function Txt({ w = 400, size = 15, color = theme.ink, style, ...rest }: Props) {
  return <Text {...rest} style={[{ fontFamily: family[w], fontSize: size, color, lineHeight: Math.round(size * 1.4) }, style]} />;
}
