import { I18nManager, Platform } from 'react-native';

// עברית בלבד, מימין לשמאל. בנייטיב השינוי נכנס לתוקף אחרי טעינה מחדש ראשונה.
export function setupRtl() {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'he';
  }
}
