import { Icon, Fab } from "native-base";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { GestureResponderEvent } from "react-native";
import { useThemeIconColor, useThemeBtnColor } from "@/hooks/useThemeColor";

type CustomFabProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  iconType?: "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons";
};

const iconComponent = {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
};

const CustomFab: React.FC<CustomFabProps> = ({
  icon,
  onPress,
  iconType = "Ionicons",
}) => {
  const IconComponent = iconComponent[iconType] || Ionicons;
  const { iconPrimaryColor } = useThemeIconColor();
  const { btnBackground, btnBorder } = useThemeBtnColor();

  return (
    <Fab
      position="absolute"
      renderInPortal={false}
      icon={<Icon as={IconComponent} name={icon} size="lg" color={iconPrimaryColor} />}
      bg={btnBackground}
      borderColor={btnBorder}
      borderWidth={1}
      onPress={onPress}
    />
  );
};

export default CustomFab;
