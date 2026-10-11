import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ErrorText, Field } from '../src/components/form';
import { Logo } from '../src/components/Logo';
import { Squiggles } from '../src/components/Squiggles';
import { Txt } from '../src/components/Txt';
import { Btn, Card, Chip } from '../src/components/ui';
import { useSession, type Role } from '../src/session';
import { theme } from '../src/theme';

const demoRoles: { role: Role; label: string }[] = [
  { role: 'parent', label: 'הורה' },
  { role: 'staff', label: 'צוות' },
  { role: 'admin', label: 'מנהלת' },
];

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { demo, signInDemo, signIn, signUp } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <View style={{ flex: 1, backgroundColor: theme.ground }}>
      <Squiggles />
      <View style={{ flex: 1, justifyContent: 'center', padding: 20, paddingTop: insets.top + 20, gap: 16, maxWidth: 460, width: '100%', alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 8 }}>
          <Logo size={64} tagline="הגן שלי, כל היום" />
        </View>

        {!demo && (
          <>
            <Card>
              <Txt w={700} size={18}>{mode === 'in' ? 'התחברות' : 'יצירת חשבון'}</Txt>
              <Field label="דוא״ל" value={email} onChangeText={setEmail} autoCapitalize="none" autoComplete="email" keyboardType="email-address" />
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
            <Chip label={busy ? 'רגע…' : mode === 'in' ? 'כניסה' : 'יצירת חשבון'} onPress={busy ? undefined : submit} />
            <Btn
              tone="ghost"
              label={mode === 'in' ? 'אין לי חשבון עדיין' : 'כבר יש לי חשבון'}
              onPress={() => {
                setMode(mode === 'in' ? 'up' : 'in');
                setError(null);
              }}
            />
          </>
        )}

        {/* תצוגת דמו: תמיד כשאין שרת, ובזמן פיתוח גם כשיש */}
        {(demo || __DEV__) && (
          <Card style={{ backgroundColor: '#f4f7ff' }}>
            <Txt w={600} size={13} color={theme.muted}>
              {demo ? 'מצב הדגמה: השרת עוד לא מחובר. בחרו תפקיד:' : 'תצוגת דמו (בפיתוח בלבד), בלי חשבון:'}
            </Txt>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {demoRoles.map(({ role, label }, i) => (
                <View key={role} style={{ flex: 1 }}>
                  <Btn label={label} tone={i === 0 ? 'primary' : 'soft'} onPress={() => signInDemo(role)} />
                </View>
              ))}
            </View>
          </Card>
        )}
      </View>
    </View>
  );
}
