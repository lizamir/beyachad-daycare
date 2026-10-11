// נתוני דמו בדיוניים בלבד. אין להכניס כאן פרטים של ילדים אמיתיים.
import type { DayEvent } from '../lib/day';

export const parentDay = {
  childName: 'נועה',
  dayLabel: 'יום שלישי',
  updatedAgo: 'עודכן לפני 8 דקות',
  arrival: '08:10',
  pickup: '16:00',
  lastPhoto: { scene: 'a' as const, caption: 'נועה בארגז חול', time: '13:52' },
  morePhotos: 6,
  events: [
    { id: 'e1', kind: 'meal', start: '09:00', end: '09:25', title: 'ארוחת בוקר', detail: 'אכלה כמעט הכול', amount: 0.9 },
    { id: 'e2', kind: 'care', start: '10:30', title: 'החלפת חיתול', detail: 'ללא הערות' },
    { id: 'e3', kind: 'meal', start: '11:50', end: '12:10', title: 'ארוחת צהריים', detail: 'אכלה חצי מהמנה', amount: 0.5 },
    { id: 'e4', kind: 'sleep', start: '12:15', end: '13:30', title: 'שנת צהריים', detail: 'שעה ורבע' },
  ] as DayEvent[],
  pending: { title: 'ארוחת ארבע ופעילות', detail: 'טרם עודכן' },
  notice: 'מחר להביא בגדים להחלפה',
  status: 'ערה ומשחקת',
  sleepingLabel: 'נועה ישנה עכשיו. שקט, שקט…',
  birthday: { title: 'נועה בת שנה היום!', candles: 1, plan: 'בעשר וחצי חוגגים בגן עם כתר, שירים ועוגת בננה' },
  milestone: { icon: 'footsteps-outline' as const, title: 'שלושה צעדים לבד!', by: 'מירב, 11:05', note: 'נועה הלכה מהשטיח עד הספה, וצחקה כל הדרך.' },
  stickers: [
    { day: 'א׳', label: 'יום של צחוקים', icon: 'happy-outline' as const, color: '#ff7a6b' },
    { day: 'ב׳', label: 'ציירה קשת', icon: 'color-palette-outline' as const, color: '#a89cf0' },
    { day: 'ג׳', label: 'תגיע ב־16:00', icon: 'star' as const, color: '#ffc23d', pending: true },
  ],
};

export type KidEvents = { meals: [string, string][]; sleeps: [string, string][]; care: string[] };

export const staffGroup = {
  name: 'הקבוצה שלי',
  alerts: [
    { id: 'a1', level: 'bad' as const, icon: 'warning-outline' as const, lead: 'אלרגיה לאגוזים:', text: 'יובל. ארוחת ארבע ללא אגוזים' },
    { id: 'a2', level: 'warn' as const, icon: 'swap-horizontal' as const, lead: 'שינוי באיסוף:', text: 'מיה תיאסף היום על ידי סבתא רחל' },
  ],
  kids: [
    { id: 'k1', name: 'נועה', arrival: '08:10', meals: [['09:00', '09:25'], ['11:50', '12:10']], sleeps: [['12:15', '13:30']], care: ['10:30'], last: 'פעילות · 13:52', flag: { tone: 'pink' as const, text: 'יום הולדת' } },
    { id: 'k2', name: 'יובל', arrival: '08:30', meals: [['09:05', '09:30'], ['11:50', '12:10']], sleeps: [['12:20', '13:40']], care: ['11:00', '13:45'], last: 'חיתול · 13:45', flag: { tone: 'bad' as const, text: 'אלרגיה' } },
    { id: 'k3', name: 'מיה', arrival: '07:55', meals: [['09:00', '09:20']], sleeps: [['12:10', '13:15']], care: ['10:15'], last: 'קמה משינה · 13:15', flag: { tone: 'warn' as const, text: 'שינוי באיסוף' } },
    { id: 'k4', name: 'איתי', arrival: '09:10', meals: [['09:30', '09:50']], sleeps: [], care: [], last: 'ארוחת בוקר · 09:50', flag: { tone: 'warn' as const, text: 'אין עדכון 5 שעות', stale: true } },
    { id: 'k5', name: 'אורי', arrival: '08:00', meals: [['09:00', '09:20'], ['11:55', '12:15']], sleeps: [['12:30', '14:00']], care: ['10:20'], last: 'קם משינה · 14:00' },
    { id: 'k6', name: 'תמר', arrival: '08:45', meals: [['09:10', '09:35'], ['11:50', '12:05']], sleeps: [['12:15', '13:20']], care: ['10:40', '13:30'], last: 'שירותים · 13:30' },
    { id: 'k7', name: 'אדם', arrival: '08:20', meals: [['09:00', '09:15']], sleeps: [['12:20', '13:25']], care: ['10:50'], last: 'ארוחת צהריים · 12:00', flag: { tone: 'warn' as const, text: 'אין עדכון שעתיים', stale: true } },
    { id: 'k8', name: 'ליה', arrival: '08:35', meals: [['09:05', '09:30'], ['11:50', '12:10']], sleeps: [['12:15', '13:35']], care: ['10:25', '13:50'], last: 'חיתול · 13:50' },
  ] as (KidEvents & { id: string; name: string; arrival: string; last: string; flag?: { tone: 'bad' | 'warn' | 'pink'; text: string; stale?: boolean } })[],
  absent: [
    { id: 'k9', name: 'שירה', note: 'ההורה דיווח היעדרות' },
    { id: 'k10', name: 'דניאל', note: 'ההורה דיווח היעדרות' },
  ],
  total: 10,
};

export const adminDay = {
  title: 'המשפחתון היום',
  present: 8,
  total: 10,
  staff: { present: 2, total: 2 },
  pendingMessages: 3,
  // g = עודכן בשעה האחרונה, y = יותר משעתיים, x = נעדר
  coverage: [
    ['נועה', 'g'], ['יובל', 'g'], ['מיה', 'g'], ['איתי', 'y'], ['אורי', 'g'],
    ['תמר', 'g'], ['אדם', 'y'], ['ליה', 'g'], ['שירה', 'x'], ['דניאל', 'x'],
  ] as [string, 'g' | 'y' | 'x'][],
  payments: {
    month: 'אוקטובר',
    paid: { n: 6, sum: '₪10,800' },
    pending: { n: 3, sum: '₪5,400' },
    late: { n: 1, sum: '₪1,800' },
  },
  todo: [
    { id: 't1', icon: 'camera-outline' as const, color: '#ff5d4a', title: '2 אישורי צילום חסרים', sub: 'משפחות איתי ודניאל', tag: 'דחוף', tone: 'bad' as const },
    { id: 't2', icon: 'card-outline' as const, color: '#f2a20c', title: 'תזכורת תשלום', sub: '3 משפחות שטרם שילמו', tag: 'שליחה', tone: 'warn' as const },
    { id: 't3', icon: 'warning-outline' as const, color: '#4a42c7', title: 'הנחיית אלרגיה חדשה', sub: 'יובל · ממתינה לאישור צוות', tag: 'בדיקה', tone: 'cool' as const },
  ],
  upcoming: [
    { id: 'u0', month: 'אוק׳', day: '11', title: 'יום ההולדת של נועה', sub: 'בת שנה · חוגגים ב־10:30', tag: 'יום הולדת', tone: 'pink' as const },
    { id: 'u1', month: 'אוק׳', day: '20', title: 'המשפחתון סגור', sub: 'חג', tag: 'חופשה', tone: 'mute' as const },
    { id: 'u2', month: 'דצמ׳', day: '14', title: 'מסיבת חנוכה', sub: '14:00 עם ההורים', tag: 'אירוע', tone: 'cool' as const },
  ],
};

// ───────── מסכים נוספים ─────────

export type Photo = { id: string; scene: 'a' | 'b' | 'c'; caption: string; time: string; tags: string[] };
export const photos: Photo[] = [
  { id: 'p1', scene: 'a', caption: 'ארגז חול', time: '13:52', tags: ['נועה', 'אורי'] },
  { id: 'p2', scene: 'b', caption: 'ציור קשת', time: '11:20', tags: ['נועה', 'מיה', 'תמר'] },
  { id: 'p3', scene: 'c', caption: 'מגדל קוביות', time: '10:05', tags: ['יובל'] },
  { id: 'p4', scene: 'a', caption: 'משחק בחוץ', time: '09:40', tags: ['אדם', 'ליה'] },
  { id: 'p5', scene: 'b', caption: 'פעילות יצירה', time: '09:15', tags: [] },
  { id: 'p6', scene: 'c', caption: 'ארוחת בוקר', time: '09:00', tags: ['נועה'] },
];

export const announcements = [
  { id: 'n1', title: 'מחר להביא בגדים להחלפה', body: 'נא להביא סט בגדים נוסף בתיק, בגלל פעילות המים.', time: 'היום 10:12', needsRead: true, readBy: 6, of: 9 },
  { id: 'n2', title: 'המשפחתון סגור ב־20 באוקטובר', body: 'חג. נחזור לפעילות רגילה למחרת.', time: 'אתמול', needsRead: false, readBy: 9, of: 9 },
  { id: 'n3', title: 'מסיבת חנוכה', body: 'ב־14 בדצמבר בשעה 14:00. נשמח לראות את כולם.', time: 'לפני 3 ימים', needsRead: true, readBy: 8, of: 9 },
];

export const inquiries = [
  { id: 'q1', from: 'דנה, אמא של נועה', text: 'האם נועה אכלה היום ארוחת צהריים?', time: '13:40', done: false },
  { id: 'q2', from: 'איל, אבא של יובל', text: 'אאחר באיסוף בעשרים דקות.', time: '12:05', done: true },
  { id: 'q3', from: 'רונית, אמא של תמר', text: 'אפשר להקדים את האיסוף מחר ל־15:30?', time: '11:30', done: false },
  { id: 'q4', from: 'גל, אבא של ליה', text: 'שכחנו כובע בבוקר, אפשר להשאיר בגן?', time: '09:50', done: false },
];

export const familyCharges = [
  { id: 'c1', period: 'אוקטובר 2026', amount: 1800, paid: 0, due: '10.10.2026', doc: '' },
  { id: 'c2', period: 'ספטמבר 2026', amount: 1800, paid: 1800, due: '10.09.2026', doc: 'חשבונית 2041' },
  { id: 'c3', period: 'אוגוסט 2026', amount: 1800, paid: 1800, due: '10.08.2026', doc: 'חשבונית 2018' },
];

export const childCard = {
  name: 'נועה', birth: '14.02.2025', allergies: 'אין אלרגיות ידועות',
  food: 'ללא דבש. בקבוק לפני שנת הצהריים.', care: 'מתעוררת בעדינות, אוהבת שמיכה קטנה.',
  contacts: [
    { id: 'ct1', name: 'דנה, אמא', phone: '050-000-0001' },
    { id: 'ct2', name: 'איל, אבא', phone: '050-000-0002' },
    { id: 'ct3', name: 'רחל, סבתא (חירום)', phone: '050-000-0003' },
  ],
  pickup: ['דנה, אמא', 'איל, אבא', 'רחל, סבתא'],
  consents: [
    { id: 'cs1', title: 'צילום והעלאה לאלבום הקבוצתי', version: 'נוסח 2', date: '01.09.2026', on: true },
    { id: 'cs2', title: 'פעילות מחוץ למשפחתון', version: 'נוסח 1', date: '01.09.2026', on: true },
  ],
};

export const events = [
  { id: 'ev1', month: 'אוק׳', day: '20', title: 'המשפחתון סגור', sub: 'חג', tag: 'חופשה', tone: 'mute' as const },
  { id: 'ev2', month: 'דצמ׳', day: '14', title: 'מסיבת חנוכה', sub: '14:00 עם ההורים', tag: 'אירוע', tone: 'cool' as const },
];

export const familiesFinance = [
  { id: 'f1', child: 'נועה', parent: 'דנה ואיל', amount: 1800, paid: 0, due: '10.10.2026' },
  { id: 'f2', child: 'יובל', parent: 'מיכל ואיל', amount: 1800, paid: 1800, due: '10.10.2026' },
  { id: 'f3', child: 'מיה', parent: 'ענת ויואב', amount: 1800, paid: 1800, due: '10.10.2026' },
  { id: 'f4', child: 'איתי', parent: 'שרון', amount: 1800, paid: 0, due: '01.10.2026' },
  { id: 'f5', child: 'אורי', parent: 'נוי ואסף', amount: 1800, paid: 1800, due: '10.10.2026' },
  { id: 'f6', child: 'תמר', parent: 'רונית ודן', amount: 1800, paid: 0, due: '10.10.2026' },
  { id: 'f7', child: 'אדם', parent: 'הילה ועמית', amount: 1800, paid: 1800, due: '10.10.2026' },
  { id: 'f8', child: 'ליה', parent: 'גל ומאיה', amount: 1800, paid: 1800, due: '10.10.2026' },
  { id: 'f9', child: 'שירה', parent: 'טל ויובל', amount: 1800, paid: 0, due: '10.10.2026' },
  { id: 'f10', child: 'דניאל', parent: 'עדי', amount: 1800, paid: 1800, due: '10.10.2026' },
];

export const childrenAdmin = familiesFinance.map((f, i) => ({
  id: f.id, name: f.child, parent: f.parent,
  allergy: f.child === 'יובל' ? 'אגוזים' : '',
  consentMissing: f.child === 'איתי' || f.child === 'דניאל',
  group: 'הקבוצה שלי',
  birth: ['14.02.2025', '03.06.2024', '22.11.2024', '09.01.2025', '30.07.2024', '18.03.2025', '05.05.2024', '27.09.2024', '11.12.2024', '02.04.2025'][i],
}));

export const staffList = [
  { id: 's1', name: 'מירב', role: 'צוות', perms: ['נוכחות', 'ארוחות ושינה', 'טיפול', 'תמונות'] },
  { id: 's2', name: 'יעל', role: 'צוות', perms: ['נוכחות', 'ארוחות ושינה', 'טיפול', 'תמונות'] },
];

export const staffInfo = [
  { id: 'i1', name: 'יובל', note: 'אלרגיה לאגוזים. ללא אגוזים בארוחת ארבע.', tone: 'bad' as const },
  { id: 'i2', name: 'מיה', note: 'היום תיאסף על ידי סבתא רחל.', tone: 'warn' as const },
  { id: 'i3', name: 'נועה', note: 'בקבוק לפני שנת הצהריים. ללא דבש.', tone: 'cool' as const },
  { id: 'i4', name: 'איתי', note: 'אוהב שיר הרדמה, צריך חיבוק בהתעוררות.', tone: 'cool' as const },
];
