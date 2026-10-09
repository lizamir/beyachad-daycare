import { StyleSheet, TextInput, type TextInputProps } from 'react-native';
import { radius, space, useTheme } from '../theme';
import { Txt } from './Txt';

export function Field({ label, ...props }: TextInputProps & { label: string }) {
  const t = useTheme();
  return (
    <>
      <Txt w={600}>{label}</Txt>
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
    <Txt accessibilityRole="alert" color={t.danger}>{children}</Txt>
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
    fontFamily: 'Rubik_400Regular',
    textAlign: 'right',
  },
});
