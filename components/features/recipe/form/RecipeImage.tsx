import {
  Box,
  Center,
  Image,
  Pressable,
  Spinner,
  Text,
  Icon,
  FormControl,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  image: string | null;
  isLoading: boolean;
  onOpen: () => void;
  color: string;
  colorPlaceholder: string;
  onPickImage?: (source: string) => void;
};

export default function RecipeImage({
  image,
  isLoading,
  onOpen,
  color,
  colorPlaceholder,
}: Props) {
  return (
    <Box width="100%">
      <FormControl mt="2">
        {isLoading ? (
          <Center h="300" w="full" bg="gray.200">
            <Spinner size="lg" />
          </Center>
        ) : image ? (
          <Pressable onPress={onOpen}>
            <Center>
              <Image
                source={{ uri: image }}
                alt="Main Image"
                h="250"
                w="full"
                borderColor="transparent"
                borderWidth={0}
                resizeMode="contain" // 画像が親コンテナの全域にフィットするように設定
              />
            </Center>
          </Pressable>
        ) : (
          <Pressable onPress={onOpen}>
            <Center
              h="250"
              w="full"
              color={color}
              borderColor="transparent"
              borderWidth={0}
              borderRadius="lg"
            >
              <Text fontSize="md" color={colorPlaceholder} bold>
                完成イメージ
              </Text>
              <Icon
                color={colorPlaceholder}
                as={AntDesign}
                name="camera"
                size="xl"
              />
            </Center>
          </Pressable>
        )}
      </FormControl>
    </Box>
  );
}
