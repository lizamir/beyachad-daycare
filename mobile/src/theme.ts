import { useColorScheme } from 'react-native';

// צבעים מתוך הסקיצה (prototype/daycare-first-sketch.html)
const light = {
  ground: '#f3f7f4',
  surface: '#ffffff',
  soft: '#e5f1eb',
  line: '#dce6df',
  ink: '#253c3b',
  muted: '#5d7370',
  accent: '#276a53',
  onAccent: '#ffffff',
  warn: '#b4561b',
  warnSoft: '#fbeadc',
  danger: '#b3261e',
  dangerSoft: '#fbe3e1',
};

const dark: typeof light = {
  ground: '#14201f',
  surface: '#1c2928',
  soft: '#2d4940',
  line: '#3e5550',
  ink: '#edf5f2',
  muted: '#9db5b0',
  accent: '#a3d5bc',
  onAccent: '#14201f',
  warn: '#f0b27a',
  warnSoft: '#3d2c1c',
  danger: '#f2b8b5',
  dangerSoft: '#42201e',
};

export type Theme = typeof light;

export function useTheme(): Theme {
  return useColorScheme() === 'dark' ? dark : light;
}

export const radius = { card: 16, chip: 999 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
