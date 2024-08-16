import { useThemeIconColor } from "@/hooks/useThemeColor";
import { useStackNavigation } from "@/hooks/useStackNavigation";
import HeaderArea from "@/components/layout/HeaderArea";
import RippleButton from "@/components/common/button/RippleButton";
import LogoButton from "../button/LogoButton";

const DetailHeader = () => {
  const { iconPrimaryColor } = useThemeIconColor();
  const { navigation } = useStackNavigation();
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
    </HeaderArea>
  );
};

export default DetailHeader;
