import { I18nManager, Platform, type DimensionValue, type ViewStyle } from 'react-native';

// react-native-web מפרש start/end תמיד משמאל לימין, בלי קשר ל־dir של הדף.
// לכן מיקום אבסולוטי נקבע כאן לפי כיוון הכתיבה בפועל (עברית: ההתחלה בצד ימין).
const rtl = () => Platform.OS === 'web' || I18nManager.isRTL;

export const S = (v: DimensionValue): ViewStyle => (rtl() ? { right: v } : { left: v });
export const E = (v: DimensionValue): ViewStyle => (rtl() ? { left: v } : { right: v });
export const MS = (v: number): ViewStyle => (rtl() ? { marginRight: v } : { marginLeft: v });
