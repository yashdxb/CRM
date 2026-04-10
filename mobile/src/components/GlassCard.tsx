import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Glass, Shadows, Radius } from '../theme/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'subtle';
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

export default function GlassCard({
  children,
  variant = 'default',
  style,
  noPadding,
}: GlassCardProps) {
  const variantStyles = {
    default: s.cardDefault,
    elevated: s.cardElevated,
    subtle: s.cardSubtle,
  };

  return (
    <View style={[s.cardOuter, variantStyles[variant], style]}>
      <BlurView
        intensity={Glass.blurIntensity}
        tint={Glass.blurTint}
        style={[s.blur, noPadding ? null : s.padding]}
      >
        {children}
      </BlurView>
    </View>
  );
}

const s = StyleSheet.create({
  cardOuter: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Glass.cardBorder,
    ...Shadows.card,
  },
  cardDefault: {
    backgroundColor: Glass.cardBg,
  },
  cardElevated: {
    backgroundColor: Glass.elevatedBg,
    ...Shadows.cardHover,
  },
  cardSubtle: {
    backgroundColor: Glass.subtleBg,
    borderColor: Glass.cardBorderSubtle,
    ...Shadows.subtle,
  },
  blur: {
    overflow: 'hidden',
  },
  padding: {
    padding: 20,
  },
});
