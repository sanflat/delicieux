import { Center, Box, Text, HStack, Link, VStack } from "native-base";
import { ThemedText } from "../text/ThemedText";
import { useThemeTextColor, useThemeDisplayColor } from "@/hooks/useThemeColor";

export default function ErrorAlert() {
  const { textPrimaryColor, linkColor } = useThemeTextColor();
  const { displayBackground } = useThemeDisplayColor();

  return (
    <Center flex={1} bgColor={displayBackground}>
      <Box safeArea p="2" py="8" w="90%" alignItems="center">
        <VStack alignItems="center" space={1}>
          <ThemedText color={textPrimaryColor} text="Error" type="subtitle" />
          <Text mt="1" color={textPrimaryColor} fontWeight="medium">
            Sorry, it seems an error has occurred...
          </Text>
        </VStack>

        <HStack alignItems="center" mt={3}>
          <Text fontSize="sm" color={textPrimaryColor}>
            Contact Us.
          </Text>
          <Link
            _text={{
              color: linkColor,
              fontWeight: "medium",
              fontSize: "sm",
            }}
          >
            Contact Support
          </Link>
        </HStack>
      </Box>
    </Center>
  );
}
