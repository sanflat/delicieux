import { Box, Button, Text } from 'native-base';

interface RecipeSaveButtonProps {
  onPress: () => void;
  bgColor: string;
  color: string;
  borderColor: string;
  isCreate?: boolean;
}

const RecipeSaveButton: React.FC<RecipeSaveButtonProps> = ({
  onPress,
  bgColor,
  color,
  borderColor,
  isCreate,
}) => (
  <Box width="85%" mt={3}>
    <Button bgColor={bgColor} onPress={onPress} borderRadius="10px" h="50px" borderWidth={1} borderColor={borderColor}>
      <Text color={color} fontWeight="bold">
        { isCreate ? 'レシピ登録' : 'レシピ編集'}
      </Text>
    </Button>
  </Box>
);

export default RecipeSaveButton;
