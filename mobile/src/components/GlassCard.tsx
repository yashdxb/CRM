import React from 'react';
import { StyleSheet, View, type ViewStyle, type StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { Glass, Shadows, Radius, DarkColors } from '../theme/tokens';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'subtle' | 'dark';
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
    dark: s.cardDark,
  };

  const isDark = variant === 'dark';

  return (
    <View style={[s.cardOuter, variantStyles[variant], style]}>
      <BlurView
        intensity={isDark ? 50 : Glass.blurIntensity}
        tint={isDark ? 'dark' : Glass.blurTint}
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
  cardDark: {
    backgroundColor: DarkColors.cardBg,
    borderColor: DarkColors.cardBorder,
    shadowColor: DarkColors.cardShadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  blur: {
    overflow: 'hidden',
  },
  padding: {
    padding: 20,
  },
});
