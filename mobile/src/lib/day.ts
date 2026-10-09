// ציר היום בפס: 07:00 עד 17:00
export const DAY_START = 7 * 60;
export const DAY_SPAN = 10 * 60;

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export const pct = (min: number): `${number}%` => `${((min - DAY_START) / DAY_SPAN) * 100}%`;
export const span = (from: string, to: string): `${number}%` =>
  `${((toMin(to) - toMin(from)) / DAY_SPAN) * 100}%`;

// השעה "עכשיו" בנתוני הדמו. באפליקציה אמיתית: השעה בפועל באזור Asia/Jerusalem.
export const NOW = '14:40';

export type Kind = 'meal' | 'sleep' | 'care';
export type DayEvent = {
  id: string;
  kind: Kind;
  start: string;
  end?: string; // בלי שעת סיום = נקודה (למשל החלפת חיתול)
  title: string;
  detail: string;
};
