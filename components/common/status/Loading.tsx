import { Center, Spinner, Heading } from "native-base";
import { useThemeDisplayColor, useThemeStatusColor } from "@/hooks/useThemeColor";
export default function Loading() {
    const { spinnerColor } = useThemeStatusColor();
    const { displayBackground } = useThemeDisplayColor();
  return (
    <Center flex={1} bgColor={displayBackground} >
        <Spinner color={spinnerColor} />
        <Heading color={spinnerColor} fontSize="md">
            Loading
        </Heading>
    </Center>
  );
}
