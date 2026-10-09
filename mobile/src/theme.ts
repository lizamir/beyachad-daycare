// העיצוב הנבחר: פס היום + תמונת גיבור + צבע קבוע לכל סוג אירוע (ראו docs/DESIGN.he.md)
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
  sun: '#ffc933',
  sunInk: '#4a3300',
  coral: '#ff5d4a',
  mint: '#2fc58b',
  now: '#e8404f',

  // צבע לכל סוג אירוע, חוזר בכל המסכים
  kind: { arrival: '#2f5bea', meal: '#f2a20c', sleep: '#4a42c7', care: '#0f9d8a' },
  kindTint: { meal: '#fff3da', sleep: '#e9e7ff', care: '#d9f5ef', presence: '#edf1fb' },
  future: '#d9e1f6',
} as const;

export type Theme = typeof theme;
export const useTheme = (): Theme => theme;

export const tones = {
  ok: { bg: '#d3f5e5', fg: '#0a6a43' },
  warn: { bg: '#ffe8b8', fg: '#6b4300' },
  bad: { bg: '#ffd9d4', fg: '#8f1d12' },
  cool: { bg: '#dbe5ff', fg: '#1c3aa8' },
  mute: { bg: '#e8ecf5', fg: '#4d5b7c' },
} as const;
export type Tone = keyof typeof tones;

export const radius = { card: 18, chip: 999 };
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
