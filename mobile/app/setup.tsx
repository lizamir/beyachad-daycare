import { useState } from 'react';
import { Text } from 'react-native';
import { ErrorText, Field } from '../src/components/form';
import { Card, Chip, Screen } from '../src/components/ui';
import { useSession } from '../src/session';
import { useTheme } from '../src/theme';

// מסך ביניים: חשבון מחובר שעדיין לא משויך למסגרת. יוצרים משפחתון ונהיים המנהלת שלו.
// (הצטרפות צוות והורים תהיה דרך הזמנה מהמנהלת, בשלב הבא.)
export default function Setup() {
  const t = useTheme();
  const { createInstitution, signOut } = useSession();
  const [name, setName] = useState('');
  const [me, setMe] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!name.trim()) {
      setError('נא למלא שם למשפחתון');
      return;
    }
    setBusy(true);
    setError(null);
    setError(await createInstitution(name, me));
    setBusy(false);
  };

  return (
    <Screen title="הקמת משפחתון" subtitle="החשבון שלך עדיין לא משויך למסגרת">
      <Card>
        <Text style={{ color: t.muted, fontSize: 15, textAlign: 'right' }}>
          אם את מנהלת משפחתון, אפשר להקים אותו כאן. צוות והורים יצטרפו בהזמנה מהמנהלת.
        </Text>
        <Field label="שם המשפחתון" value={name} onChangeText={setName} />
        <Field label="השם שלך" value={me} onChangeText={setMe} />
        <ErrorText>{error}</ErrorText>
      </Card>
      <Chip label={busy ? 'רגע…' : 'הקמת משפחתון'} onPress={busy ? undefined : submit} />
      <Chip label="התנתקות" tone="warn" onPress={signOut} />
    </Screen>
  );
}
