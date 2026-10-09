// נתוני דמו בדיוניים בלבד. אין להכניס כאן פרטים של ילדים אמיתיים.

export type TimelineItem = { id: string; icon: string; title: string; detail: string; time: string };

export const parentDay = {
  childName: 'נועה',
  dayLabel: 'יום שלישי',
  timeline: [
    { id: '1', icon: '🟢', title: 'נועה הגיעה למשפחתון', detail: '', time: '08:10' },
    { id: '2', icon: '🍽️', title: 'ארוחת בוקר', detail: 'אכלה כמעט הכול', time: '09:00' },
    { id: '3', icon: '😴', title: 'שנת צהריים', detail: 'שעה ורבע', time: '12:15–13:30' },
    { id: '4', icon: '🧸', title: 'פעילות היום', detail: 'משחקי תחושה', time: '' },
  ] as TimelineItem[],
  photoCount: 6,
  notice: 'מחר להביא בגדים להחלפה',
};

export type AttendanceState = 'present' | 'expected' | 'absent' | 'left';

export const staffGroup = {
  name: 'הקבוצה שלי',
  present: 8,
  total: 10,
  quickActions: ['הגעה', 'ארוחה', 'שינה', 'טיפול', 'תמונה'],
  alerts: [
    { id: 'a1', text: 'אלרגיה לאגוזים — יובל', level: 'danger' as const },
    { id: 'a2', text: 'שינוי במורשה לאיסוף — מיה (היום)', level: 'warn' as const },
  ],
  children: [
    { id: 'c1', name: 'נועה', state: 'present' as AttendanceState, last: 'שנת צהריים הסתיימה · 13:30' },
    { id: 'c2', name: 'יובל', state: 'present' as AttendanceState, last: 'ארוחת בוקר · 09:00' },
    { id: 'c3', name: 'מיה', state: 'present' as AttendanceState, last: 'החלפת חיתול · 11:40' },
    { id: 'c4', name: 'איתי', state: 'present' as AttendanceState, last: 'טרם עודכן' },
    { id: 'c5', name: 'שירה', state: 'absent' as AttendanceState, last: 'הורה דיווח היעדרות' },
    { id: 'c6', name: 'אורי', state: 'expected' as AttendanceState, last: 'צפוי להגיע ב־10:00' },
  ],
};

export const adminDay = {
  title: 'המשפחתון היום',
  attendance: { present: 8, total: 10 },
  staffPresent: { present: 2, total: 2 },
  pendingMessages: 3,
  payments: { paid: 6, pending: 3, late: 1 },
  todo: ['2 אישורי צילום חסרים', 'תזכורת תשלום לשלוש משפחות'],
  upcoming: ['יום שלישי הבא — סגור (חג)', 'מסיבת חנוכה — 14:00'],
};

export const stateLabel: Record<AttendanceState, string> = {
  present: 'נוכח',
  expected: 'צפוי',
  absent: 'נעדר',
  left: 'יצא',
};
