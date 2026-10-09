import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase, supabaseConfigured } from './lib/supabase';

export type Role = 'parent' | 'staff' | 'admin';

// loading: בודקים התחברות קיימת · out: לא מחובר · needsSetup: מחובר בלי שיוך למסגרת · ready: יש תפקיד
type Status = 'loading' | 'out' | 'needsSetup' | 'ready';

type Session = {
  status: Status;
  role: Role | null;
  institutionId: string | null;
  demo: boolean;
  signInDemo: (role: Role) => void;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  createInstitution: (name: string, displayName: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

const noop = async () => null;
const Ctx = createContext<Session>({
  status: 'loading',
  role: null,
  institutionId: null,
  demo: !supabaseConfigured,
  signInDemo: () => {},
  signIn: noop,
  signUp: noop,
  createInstitution: noop,
  signOut: async () => {},
});

function hebrewError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login')) return 'דוא״ל או סיסמה שגויים';
  if (m.includes('already registered')) return 'כתובת הדוא״ל כבר רשומה';
  if (m.includes('password') && m.includes('characters')) return 'הסיסמה קצרה מדי (לפחות 6 תווים)';
  if (m.includes('confirm')) return 'יש לאשר את כתובת הדוא״ל דרך המייל שנשלח';
  if (m.includes('network') || m.includes('fetch')) return 'אין חיבור לשרת. בדקו את החיבור ונסו שוב';
  return 'משהו השתבש. נסו שוב';
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>(supabaseConfigured ? 'loading' : 'out');
  const [role, setRole] = useState<Role | null>(null);
  const [institutionId, setInstitutionId] = useState<string | null>(null);

  // טוענים את התפקיד מהשרת. ה־RLS מבטיח שנראה רק את השיוכים שלנו.
  const loadMembership = useCallback(async () => {
    if (!supabase) return;
    const { data: auth } = await supabase.auth.getSession();
    if (!auth.session) {
      setRole(null);
      setInstitutionId(null);
      setStatus('out');
      return;
    }
    const { data, error } = await supabase
      .from('memberships')
      .select('role, institution_id')
      .order('created_at')
      .limit(1);
    if (error) {
      setStatus('out');
      return;
    }
    if (!data || data.length === 0) {
      setRole(null);
      setInstitutionId(null);
      setStatus('needsSetup');
      return;
    }
    setRole(data[0].role as Role);
    setInstitutionId(data[0].institution_id);
    setStatus('ready');
  }, []);

  useEffect(() => {
    if (!supabase) return;
    loadMembership();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') loadMembership();
    });
    return () => sub.subscription.unsubscribe();
  }, [loadMembership]);

  const value: Session = {
    status,
    role,
    institutionId,
    demo: !supabaseConfigured,
    signInDemo: (r) => {
      setRole(r);
      setStatus('ready');
    },
    signIn: async (email, password) => {
      if (!supabase) return 'השרת לא מוגדר';
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      return error ? hebrewError(error.message) : null;
    },
    signUp: async (email, password) => {
      if (!supabase) return 'השרת לא מוגדר';
      const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
      if (error) return hebrewError(error.message);
      // אם אישור דוא״ל מופעל בשרת אין עדיין session
      if (!data.session) return 'נשלח מייל אישור. אשרו אותו ואז התחברו';
      return null;
    },
    createInstitution: async (name, displayName) => {
      if (!supabase) return 'השרת לא מוגדר';
      const { error } = await supabase.rpc('create_institution', {
        p_name: name.trim(),
        p_display_name: displayName.trim(),
      });
      if (error) return hebrewError(error.message);
      await loadMembership();
      return null;
    },
    signOut: async () => {
      if (supabase) await supabase.auth.signOut();
      setRole(null);
      setInstitutionId(null);
      setStatus('out');
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useSession = () => useContext(Ctx);
