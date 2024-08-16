declare module "react-native-material-ripple" {
  import * as React from "react";
  import {
    GestureResponderEvent,
    StyleProp,
    ViewStyle,
    ViewProps,
  } from "react-native";

  interface RippleProps extends ViewProps {
    rippleColor?: string;
    rippleOpacity?: number;
    rippleDuration?: number;
    rippleSize?: number;
    rippleContainerBorderRadius?: number;
    rippleCentered?: boolean;
    rippleSequential?: boolean;
    rippleFades?: boolean;
    disabled?: boolean;
    onPress?(event: GestureResponderEvent): void;
    onPressIn?(event: GestureResponderEvent): void;
    onPressOut?(event: GestureResponderEvent): void;
    onLongPress?(event: GestureResponderEvent): void;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  }

  export default class Ripple extends React.Component<RippleProps> {}
}
