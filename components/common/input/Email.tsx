import { Input } from "native-base";

interface EmailInputProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
}

export default function EmailInput({
  email,
  setEmail,
  textColor,
  placeholderColor,
}: EmailInputProps) {
  return (
    <Input
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      color={textColor}
      borderWidth={1}
      placeholderTextColor={placeholderColor}
    />
  );
}
