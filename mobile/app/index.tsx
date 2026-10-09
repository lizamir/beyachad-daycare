import { router } from 'expo-router';
import { Text } from 'react-native';
import { Card, Chip, Screen } from '../src/components/ui';
import { roleHome, useSession, type Role } from '../src/session';
import { useTheme } from '../src/theme';

const roles: { role: Role; label: string }[] = [
  { role: 'parent', label: 'כניסה כהורה' },
  { role: 'staff', label: 'כניסה כצוות' },
  { role: 'admin', label: 'כניסה כמנהלת' },
];

export default function Welcome() {
  const t = useTheme();
  const { signIn } = useSession();
  return (
    <Screen title="ביחד" subtitle="ניהול משפחתון, הורים וצוות">
      <Card>
        <Text style={{ color: t.ink, fontSize: 16, textAlign: 'right' }}>
          מצב הדגמה: בחרו תפקיד כדי לראות את המסכים. ההתחברות האמיתית (דוא״ל וסיסמה) תתווסף עם חיבור השרת.
        </Text>
      </Card>
      {roles.map(({ role, label }) => (
        <Chip
          key={role}
          label={label}
          onPress={() => {
            signIn(role);
            router.replace(roleHome[role]);
          }}
        />
      ))}
    </Screen>
  );
}
