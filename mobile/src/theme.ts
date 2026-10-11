// גנלי: רקע כחול בהיר, פס היום, וצבע קבוע לכל סוג אירוע (ראו docs/DESIGN.he.md)
export const theme = {
  ground: '#e6edff',
  surface: '#ffffff',
  soft: '#dbe5ff',
  line: '#d6dff5',
  ink: '#0f2147',
  muted: '#5a6c93',
  accent: '#2f5bea',
  onAccent: '#ffffff',
  warn: '#6b4300',
  warnSoft: '#ffe8b8',
  danger: '#8f1d12',
  dangerSoft: '#ffd9d4',

  cobalt: '#2f5bea',
  sun: '#ffc23d',
  sunInk: '#4a3300',
  coral: '#ff7a6b',
  mint: '#5cc9a0',
  sky: '#7cc3f5',
  lilac: '#a89cf0',
  pink: '#f59ac0',
  now: '#e8404f',
  night: '#24204a',

  // צבעי השמחה: לוגו, קונפטי, פסים מתפתלים
  fun: ['#ff7a6b', '#ffc23d', '#5cc9a0', '#7cc3f5', '#a89cf0', '#f59ac0', '#ff9a3c'],

  // צבע לכל סוג אירוע, חוזר בכל המסכים
  kind: { arrival: '#2f5bea', meal: '#f2a20c', sleep: '#4a42c7', care: '#0f9d8a' },
  kindTint: { meal: '#fff3da', sleep: '#ecebff', care: '#ddf5ef', presence: '#edf1fb' },
  future: '#d9e1f6',
  shadow: '0px 4px 14px rgba(47, 91, 234, 0.10)',
} as const;

export type Theme = typeof theme;
export const useTheme = (): Theme => theme;

export const tones = {
  ok: { bg: '#d6f4e7', fg: '#0a6a43' },
  warn: { bg: '#ffe8b8', fg: '#6b4300' },
  bad: { bg: '#ffd9d4', fg: '#8f1d12' },
  cool: { bg: '#e3e8ff', fg: '#2a3fa8' },
  pink: { bg: '#ffe0ec', fg: '#9b2a5c' },
  mute: { bg: '#e8ecf5', fg: '#4d5b7c' },
} as const;
export type Tone = keyof typeof tones;

export const radius = { card: 22, chip: 999 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
