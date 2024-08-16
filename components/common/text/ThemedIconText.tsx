import { StyleSheet, Text, TextStyle } from "react-native";
import React from "react";
import { HStack } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type TextType = "default";

type Props = {
  color: string;
  text: string;
  type?: TextType;
};

export function ThemedIconText({ color, text, type = "default" }: Props) {
  const textStyle = getStyle(type, color);

  return (
    <HStack alignItems="center" space={1}>
      <MaterialCommunityIcons name="chef-hat" style={textStyle} />
      <Text style={textStyle}>{text}</Text>
    </HStack>
  );
}

const getStyle = (type: TextType, color: string): TextStyle => ({
  ...styles[type],
  color,
});

const styles: Record<TextType, TextStyle> = StyleSheet.create({
  default: {
    fontSize: 15,
  }
});
