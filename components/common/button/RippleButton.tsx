import { IconButton, Icon } from "native-base";
import Ripple from 'react-native-material-ripple';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent } from 'react-native';

type RippleButtonProps = {
  icon: string;
  onPress: (event: GestureResponderEvent) => void;
  iconColor: string;
  iconType?: 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons';
};

const iconComponent = {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
};

const RippleButton: React.FC<RippleButtonProps> = ({
  icon,
  onPress,
  iconColor,
  iconType = 'Ionicons',
}) => {
  const IconComponent = iconComponent[iconType] || Ionicons;

  return (
    <Ripple rippleColor={iconColor} rippleCentered onPress={onPress}>
      <IconButton
        icon={<Icon as={IconComponent} name={icon} size="md" color={iconColor} />}
        background="transparent"
      />
    </Ripple>
  );
};

export default RippleButton;
