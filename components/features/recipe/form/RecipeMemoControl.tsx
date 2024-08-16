import { Box, FormControl, TextArea } from 'native-base';

interface RecipeMemoControlProps {
  memo: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  colorPlaceholder: string;
  borderColor: string;
}

const RecipeMemoControl: React.FC<RecipeMemoControlProps> = ({
  memo,
  onChange,
  color,
  colorPlaceholder,
  borderColor
}) => (
  <Box width="100%" borderBottomColor={borderColor} borderBottomWidth={1}>
    <FormControl mt="2">
      <TextArea
        placeholder="メモ"
        borderColor="transparent"
        borderWidth={0}
        w="100%"
        color={color}
        placeholderTextColor={colorPlaceholder}
        value={memo}
        onChangeText={onChange}
        autoCompleteType="off"
        fontSize="md"
        fontWeight="bold"
      />
    </FormControl>
  </Box>
);

export default RecipeMemoControl;
