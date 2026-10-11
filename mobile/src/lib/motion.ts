import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

// ב־web אין native driver לאנימציות
export const ND = Platform.OS !== 'web';

// מכבד את הגדרת "הפחתת תנועה" של המכשיר: בלי קונפטי, כוכבים מנצנצים וקפיצות
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduced).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduced);
    return () => sub.remove();
  }, []);
  return reduced;
}
