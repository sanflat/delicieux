import { FormControl, Input, Box } from "native-base";

type Props = {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  color: string;
  colorPlaceholder: string;
  inputHeight?: string | number;
};

export default function RecipeName({
  value,
  onChange,
  placeholder,
  color,
  colorPlaceholder,
  inputHeight,
}: Props) {
  return (
    <Box width="100%">
      <FormControl mt="5">
        <Input
          placeholder={placeholder}
          borderColor="transparent"
          borderWidth={0}
          height={inputHeight}
          color={color}
          value={value}
          onChangeText={onChange}
          placeholderTextColor={colorPlaceholder}
          fontSize="xl"
          fontWeight="bold"
        />
      </FormControl>
    </Box>
  );
}
