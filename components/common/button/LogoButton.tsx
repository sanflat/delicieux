import { useToast, Image } from "native-base";
import Ripple from "react-native-material-ripple";
import { Ionicons } from "@expo/vector-icons";
import { useThemeIconColor } from "@/hooks/useThemeColor";

export default function LogoButton() {
  const { iconPrimaryColor } = useThemeIconColor();
  const toast = useToast();

  return (
    <Ripple rippleColor={iconPrimaryColor} rippleCentered onPress={() => toast.show({
      description: "Welcome Delicieux"
    })}>
      {/* <Image
        size="40px"
        borderRadius="full"
        source={require("@/assets/delisux.png")}
        alt="App Logo"
      /> */}
    </Ripple>
  );
}
