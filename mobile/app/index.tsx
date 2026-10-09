import { useState } from 'react';
import { Text } from 'react-native';
import { ErrorText, Field } from '../src/components/form';
import { Card, Chip, Screen } from '../src/components/ui';
import { useSession, type Role } from '../src/session';
import { useTheme } from '../src/theme';

const demoRoles: { role: Role; label: string }[] = [
  { role: 'parent', label: 'כניסה כהורה' },
  { role: 'staff', label: 'כניסה כצוות' },
  { role: 'admin', label: 'כניסה כמנהלת' },
];

export default function Welcome() {
  const t = useTheme();
  const { demo, signInDemo, signIn, signUp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (demo) {
    return (
      <Screen title="ביחד" subtitle="ניהול משפחתון, הורים וצוות">
        <Card>
          <Text style={{ color: t.ink, fontSize: 16, textAlign: 'right' }}>
            מצב הדגמה: השרת עדיין לא מחובר (חסרות הגדרות Supabase). בחרו תפקיד כדי לראות את המסכים.
          </Text>
        </Card>
        {demoRoles.map(({ role, label }) => (
          <Chip key={role} label={label} onPress={() => signInDemo(role)} />
        ))}
      </Screen>
    );
  }

  const submit = async () => {
    if (!email.trim() || !password) {
      setError('נא למלא דוא״ל וסיסמה');
      return;
    }
    setBusy(true);
    setError(null);
    const err = await (mode === 'in' ? signIn : signUp)(email, password);
    setError(err);
    setBusy(false);
  };

  return (
    <Screen title="ביחד" subtitle={mode === 'in' ? 'התחברות' : 'יצירת חשבון'}>
      <Card>
        <Field
          label="דוא״ל"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />
        <Field
          label="סיסמה"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete={mode === 'in' ? 'current-password' : 'new-password'}
          onSubmitEditing={submit}
        />
        <ErrorText>{error}</ErrorText>
      </Card>
      <Chip label={busy ? 'רגע…' : mode === 'in' ? 'התחברות' : 'יצירת חשבון'} onPress={busy ? undefined : submit} />
      <Chip
        label={mode === 'in' ? 'אין לי חשבון עדיין' : 'כבר יש לי חשבון'}
        tone="warn"
        onPress={() => {
          setMode(mode === 'in' ? 'up' : 'in');
          setError(null);
        }}
      />
    </Screen>
  );
}
