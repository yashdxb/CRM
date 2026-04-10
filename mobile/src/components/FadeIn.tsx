import React, { useEffect, useRef } from 'react';
import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';

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
  const opacity = useRef(new Animated.Value(0)).current;
  const offsetY = useRef(new Animated.Value(translateY)).current;

  useEffect(() => {
    const delay = baseDelay + index * staggerMs;
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(offsetY, {
        toValue: 0,
        duration,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[{ opacity, transform: [{ translateY: offsetY }] }, style]}
    >
      {children}
    </Animated.View>
  );
}
