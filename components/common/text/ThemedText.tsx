import { StyleSheet, Text, TextStyle } from 'react-native';
import React from 'react';

type TextType = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

type Props = {
  color: string;
  text: string;
  type?: TextType;
};

export function ThemedText({ color, text, type = 'default' }: Props) {
  const textStyle = getStyle(type, color);

  return <Text style={textStyle}>{text}</Text>;
}

const getStyle = (type: TextType, color: string): TextStyle => ({
  ...styles[type],
  color
});

const styles: Record<TextType, TextStyle> = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 35,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4', // リンクのデフォルト色はスタイル定義時に指定
  },
});
