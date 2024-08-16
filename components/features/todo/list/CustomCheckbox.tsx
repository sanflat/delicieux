import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface CustomCheckboxProps {
  checked: boolean;
  onPress: () => void;
  size?: number;
  color?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onPress, size = 24, color = 'black' }) => {
  const scale = useSharedValue(checked ? 1 : 0);

  useEffect(() => {
    scale.value = withTiming(checked ? 1 : 0, { duration: 300 });
  }, [checked, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable onPress={onPress} style={[styles.checkbox, { width: size, height: size, borderColor: color }]}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <Feather name="check" size={size * 0.8} color={color} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  iconContainer: {
    position: 'absolute',
  }
});

export default CustomCheckbox;