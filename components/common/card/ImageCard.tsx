import { Image, Center, VStack, Icon } from "native-base";
import { ThemedText } from "../text/ThemedText";
import { useThemeDisplayColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";

interface ImageCardProps {
  imageUri?: string;
  imageAlt?: string;
}

const ImageCard = ({ imageUri, imageAlt }: ImageCardProps) => {
  const { displayTextSecondaryColor, displayBgColor } = useThemeDisplayColor();
  if (!imageUri) {
    // Noimageを返す
    return (
      <Center
        flex={1}
        bgColor={displayBgColor}
        borderColor="black"
        borderWidth={1}
        borderRadius="xl"
        shadow={5}
        h="350px"
      >
        <VStack alignItems="center">
          <Icon color="black" as={AntDesign} name="camera" size="xl" />
          <ThemedText
            color={displayTextSecondaryColor}
            type="defaultSemiBold"
            text="No Image"
          />
        </VStack>
      </Center>
    );
  }
  return (
    <Center bgColor={displayBgColor} borderRadius="xl" shadow={5}>
      <Image
        source={{ uri: imageUri }}
        w="100%"
        h="350px"
        borderRadius="xl"
        shadow={9}
        resizeMode="cover" // 画像がコンテナに完全に収まるように調整し、必要であれば切り取る
        alt="image"
      />
    </Center>
  );
};

export default ImageCard;
