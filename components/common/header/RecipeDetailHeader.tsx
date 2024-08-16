import React, { memo } from "react";
import { useThemeIconColor } from "@/hooks/useThemeColor";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import { MaterialIcons } from "@expo/vector-icons";
import {
  useColorMode,
  IconButton,
  Icon,
  HStack,
  Menu,
  Text,
} from "native-base";
import HeaderArea from "@/components/layout/HeaderArea";
import LogoButton from "../button/LogoButton";
import RippleButton from "@/components/common/button/RippleButton";

interface RecipeDetailHeaderProps {
  recipeId: string;
  setDeleteModal: (show: boolean) => void;
}


const RecipeDetailHeader: React.FC<RecipeDetailHeaderProps> = ({
  recipeId,
  setDeleteModal,
}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { iconPrimaryColor } = useThemeIconColor();
  const { navigation } = useStackNavigation();

  // Edit operation navigation
  const handleEdit = () => {
    navigation.navigate("RecipeEdit", { id: recipeId });
  };

  const handleDelete = () => {
    setDeleteModal(true);
  };

  // Toggle color mode
  const handleColorIconPress = () => {
    toggleColorMode();
  };

  // Navigate back
  const navigateBack = () => navigation.goBack();

  return (
    <HeaderArea>
      <RippleButton
        icon="chevron-back"
        onPress={navigateBack}
        iconColor={iconPrimaryColor}
      />
      <LogoButton/>
      <Menu
        trigger={(triggerProps) => (
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size="md"
                color={iconPrimaryColor}
              />
            }
            {...triggerProps}
          />
        )}
      >
        <Menu.Item onPress={handleEdit}>
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="edit" size="sm" />
            <Text>編集</Text>
          </HStack>
        </Menu.Item>
        <Menu.Item onPress={handleDelete}>
          <HStack space={2} alignItems="center">
            <Icon as={MaterialIcons} name="delete" size="sm" />
            <Text>削除</Text>
          </HStack>
        </Menu.Item>
      </Menu>
    </HeaderArea>
  );
};

export default memo(RecipeDetailHeader);
