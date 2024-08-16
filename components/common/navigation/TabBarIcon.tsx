import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { type ComponentProps } from 'react';
import { TextStyle } from 'react-native';

type IoniconsProps = ComponentProps<typeof Ionicons>;
type MaterialCommunityIconsProps = ComponentProps<typeof MaterialCommunityIcons>;

type IconType = 'Ionicons' | 'MaterialCommunityIcons';

interface TabBarIconProps {
  type: IconType;
  style?: TextStyle;
  name: IoniconsProps['name'] | MaterialCommunityIconsProps['name'];
  size?: number;
  color?: string;
}

export function TabBarIcon({ type, style, name, size = 28, color, ...rest }: TabBarIconProps) {
  if (type === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name as MaterialCommunityIconsProps['name']}
        size={size}
        color={color}
        style={[{ marginTop: 8 }, style]}
        {...rest}
      />
    );
  }
  return (
    <Ionicons
      name={name as IoniconsProps['name']}
      size={size}
      color={color}
      style={[{ marginTop: 8 }, style]}
      {...rest}
    />
  );
}
