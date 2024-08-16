import { Image, Text, Box, VStack, Divider } from "native-base";
import { View } from "react-native";

interface RecipeImageCardProps {
  imageUri?: string;
  titleColor: string;
  dividerColor: string;
  borderColor: string;
}

const RecipeImageCard: React.FC<RecipeImageCardProps> = ({
  imageUri,
}) => {
  return (

      <Image
        source={{ uri: imageUri }}
        w="100%"
        h="300px"
        borderRadius="xl"
        shadow={5}        
        resizeMode="contain"
        alt="image"
      />

  );
};

export default RecipeImageCard;
