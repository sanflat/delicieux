import { HStack, Text, Icon, Box } from "native-base";
import { useThemeTextColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  userNames: string[];
}

const SharedUser = ({ userNames }: Props) => {
  const { textSecondaryColor } = useThemeTextColor();

  if (userNames.length === 0) {
    // ユーザー名が空の場合に表示する内容
    return (
      <HStack space={2} alignItems="center">
        <Icon as={MaterialIcons} name="mobile-screen-share" size="sm" color={textSecondaryColor} />
        <Text color={textSecondaryColor} fontSize="xs">
          -
        </Text>
      </HStack>
    )
  }

  return (
    <HStack space={2} alignItems="center">
      <Icon as={MaterialIcons} name="mobile-screen-share" size="sm" color={textSecondaryColor} />
      {userNames.map((name, index) => (
        <Text key={index} color={textSecondaryColor} fontSize="xs">
          {name}{index < userNames.length - 1 ? ", " : ""}
        </Text>
      ))}
    </HStack>
  );
};

export default SharedUser;
