import { StyleSheet, Text, TextInput, type TextInputProps } from 'react-native';
import { radius, space, useTheme } from '../theme';

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const t = useTheme();
  return (
    <>
      <Text style={{ color: t.ink, fontSize: 15, fontWeight: '600', textAlign: 'right' }}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={t.muted}
        style={[s.input, { color: t.ink, backgroundColor: t.surface, borderColor: t.line }]}
        {...props}
      />
    </>
  );
}

export function ErrorText({ children }: { children: string | null }) {
  const t = useTheme();
  if (!children) return null;
  return (
    <Text accessibilityRole="alert" style={{ color: t.danger, fontSize: 15, textAlign: 'right' }}>
      {children}
    </Text>
  );
}

const s = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: radius.card,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    minHeight: 48,
    fontSize: 17,
    textAlign: 'right',
  },
});
