import { useThemeIconColor } from '@/hooks/useThemeColor'
import HeaderArea from "@/components/layout/HeaderArea";
import RippleButton from "@/components/common/button/RippleButton";
import { useStackNavigation } from '@/hooks/useStackNavigation';
import LogoButton from '../button/LogoButton';

const TodoListHeader = () => {
  const { iconPrimaryColor } = useThemeIconColor();  
  const { navigation } = useStackNavigation();

  const handleShare = () => {
    navigation.navigate("TodoShare");
  };

  return (
    <HeaderArea>
      <RippleButton
        icon='mobile-screen-share'
        onPress={handleShare}
        iconColor={iconPrimaryColor}
        iconType="MaterialIcons"
      />
      <LogoButton/>
    </HeaderArea>
  );
};

export default TodoListHeader;