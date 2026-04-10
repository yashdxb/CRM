import React, { useEffect } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FadeInProps {
  /** Zero-based index for stagger calculation */
  index?: number;
  /** Delay between each staggered item (ms) */
  staggerMs?: number;
  /** Base delay before first item animates (ms) */
  baseDelay?: number;
  /** How far the element slides up from (px) */
  translateY?: number;
  /** Animation duration (ms) */
  duration?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

/**
 * Wrapper that fades children in with an upward slide.
 * Use `index` for staggered list reveals.
 */
export default function FadeIn({
  index = 0,
  staggerMs = 50,
  baseDelay = 0,
  translateY = 18,
  duration = 420,
  style,
  children,
}: FadeInProps) {
  const opacity = useSharedValue(0);
  const offsetY = useSharedValue(translateY);

  useEffect(() => {
    const delay = baseDelay + index * staggerMs;
    const config = { duration, easing: Easing.out(Easing.cubic) };
    opacity.value = withDelay(delay, withTiming(1, config));
    offsetY.value = withDelay(delay, withTiming(0, config));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offsetY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}
