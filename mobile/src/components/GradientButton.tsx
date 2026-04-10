import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Radius, Shadows, Typography, Colors } from '../theme/tokens';
import {
  primaryGradient,
  successGradient,
  redGradient,
  orangeGradient,
  cyanGradient,
} from '../theme/gradients';

type Variant = 'primary' | 'success' | 'danger' | 'orange' | 'cyan' | 'glass';

const gradients: Record<Exclude<Variant, 'glass'>, { colors: readonly string[] }> = {
  primary: primaryGradient,
  success: successGradient,
  danger: redGradient,
  orange: orangeGradient,
  cyan: cyanGradient,
};

interface GradientButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  compact?: boolean;
  style?: ViewStyle;
}

export default function GradientButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading,
  disabled,
  compact,
  style,
}: GradientButtonProps) {
  const isGlass = variant === 'glass';
  const opacity = disabled || loading ? 0.5 : 1;

  if (isGlass) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled || loading}
        style={({ pressed }) => [
          s.glassBtn,
          compact ? s.compact : s.normal,
          pressed ? s.pressed : null,
          { opacity },
          style,
        ]}
      >
        {icon}
        {loading ? (
          <ActivityIndicator size={16} color={Colors.textSecondary} />
        ) : (
          <Text style={s.glassLabel}>{label}</Text>
        )}
      </Pressable>
    );
  }

  const grad = gradients[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        pressed ? s.pressed : null,
        { opacity },
        style,
      ]}
    >
      <LinearGradient
        colors={[...grad.colors] as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[s.gradientBtn, compact ? s.compact : s.normal, Shadows.button]}
      >
        {icon}
        {loading ? (
          <ActivityIndicator size={16} color="#ffffff" />
        ) : (
          <Text style={s.gradientLabel}>{label}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
}

const s = StyleSheet.create({
  gradientBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.pill,
  },
  normal: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  compact: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  gradientLabel: {
    ...Typography.button,
    color: '#ffffff',
  },
  glassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    ...Shadows.subtle,
  },
  glassLabel: {
    ...Typography.button,
    color: Colors.textSecondary,
  },
});
