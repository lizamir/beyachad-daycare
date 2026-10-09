import { createContext, useContext, useState, type ReactNode } from 'react';

export type Role = 'parent' | 'staff' | 'admin';

type Session = { role: Role | null; signIn: (role: Role) => void; signOut: () => void };

const Ctx = createContext<Session>({ role: null, signIn: () => {}, signOut: () => {} });

// שלב הדגמה: בחירת תפקיד מקומית. יוחלף בהתחברות Supabase (דוא״ל וסיסמה)
// כשההרשאות יאכפו בשרת (RLS).
export function SessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  return (
    <Ctx.Provider value={{ role, signIn: setRole, signOut: () => setRole(null) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useSession = () => useContext(Ctx);

export const roleHome = {
  parent: '/(parent)',
  staff: '/(staff)',
  admin: '/(admin)',
} as const;
