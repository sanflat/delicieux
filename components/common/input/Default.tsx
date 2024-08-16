import { Input } from "native-base";

interface DefaultInputProps {
  placeholder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  textColor: string;
  placeholderColor: string;
}

export default function DefaultInput({
  placeholder,
  state,
  setState,
  textColor,
  placeholderColor,
}: DefaultInputProps) {
  return (
    <Input
      placeholder={placeholder}
      value={state}
      secureTextEntry
      onChangeText={setState}
      color={textColor}
      borderWidth={1}
      placeholderTextColor={placeholderColor}
    />
  );
}
