import React, { useEffect, memo } from 'react';
import { Pressable, Text, HStack, Box } from 'native-base';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  strikethrough: boolean;
  textColor: string;
  inactiveTextColor: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);

const AnimatedTaskLabel = memo((props: Props) => {
  const { strikethrough, textColor, inactiveTextColor, onPress, children } = props;

  const hstackOffset = useSharedValue(0);
  const textColorProgress = useSharedValue(0);
  const strikethroughWidth = useSharedValue(0);

  useEffect(() => {
    textColorProgress.value = withTiming(strikethrough ? 1 : 0, { duration: 200, easing: Easing.out(Easing.quad) });
    strikethroughWidth.value = withTiming(strikethrough ? 1 : 0, { duration: 200, easing: Easing.out(Easing.quad) }); // strikethroughWidth の更新
  }, [strikethrough]);

  const hstackAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: hstackOffset.value }],
  }));

  const textColorAnimatedStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      textColorProgress.value,
      [0, 1],
      [textColor, inactiveTextColor]
    ),
  }));

  const strikethroughAnimatedStyles = useAnimatedStyle(() => ({
    width: `${strikethroughWidth.value * 100}%`,
    borderBottomColor: interpolateColor(
      textColorProgress.value,
      [0, 1],
      [textColor, inactiveTextColor]
    ),
  }));

  return (
    <Pressable onPress={onPress} minWidth={100}>
      <AnimatedHStack alignItems="center" style={hstackAnimatedStyles}>
        <AnimatedText fontSize="md" noOfLines={1} isTruncated px={1} style={textColorAnimatedStyles} bold>
          {children}
        </AnimatedText>
        <AnimatedBox
          position="absolute"
          h={1}
          borderBottomWidth={1}
          style={strikethroughAnimatedStyles}
        />
      </AnimatedHStack>
    </Pressable>
  );
});

export default AnimatedTaskLabel;
