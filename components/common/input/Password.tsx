import { Input } from "native-base";

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
}

export default function PasswordInput({
  password,
  setPassword,
  textColor,
  placeholderColor,
}: PasswordInputProps) {
  return (
    <Input
      placeholder="Password"
      value={password}
      secureTextEntry
      onChangeText={setPassword}
      color={textColor}
      borderWidth={1}
      placeholderTextColor={placeholderColor}
    />
  );
}
