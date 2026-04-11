import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import Icon from './Icon';
import { Colors, DarkColors, Spacing, Typography } from '../theme/tokens';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleSectionProps {
  title: string;
  icon?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

export default function CollapsibleSection({
  title,
  icon,
  defaultExpanded = true,
  children,
  variant = 'light',
}: CollapsibleSectionProps) {
  const isDark = variant === 'dark';
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotation = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggle = useCallback(() => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(280, 'easeInEaseOut', 'opacity'),
    );
    const next = !expanded;
    setExpanded(next);
    Animated.timing(rotation, {
      toValue: next ? 1 : 0,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [expanded, rotation]);

  const chevronRotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const chevronColor = isDark
    ? expanded
      ? DarkColors.chevronExpanded
      : DarkColors.chevronCollapsed
    : Colors.textMuted;

  return (
    <GlassCard noPadding variant={isDark ? 'dark' : 'default'}>
      <View style={s.cardInner}>
        {isDark && (
          <LinearGradient
            colors={[...DarkColors.gradientBorder]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={s.gradientStrip}
          />
        )}
        <View style={s.mainContent}>
          <Pressable onPress={toggle} style={s.header}>
            <View style={s.headerLeft}>
              {icon ? (
                <Icon
                  name={icon}
                  size={16}
                  color={isDark ? DarkColors.textSecondary : Colors.primary}
                />
              ) : null}
              <Text style={[s.title, isDark && s.titleDark]}>{title}</Text>
            </View>
            <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
              <Icon name="forward" size={14} color={chevronColor} />
            </Animated.View>
          </Pressable>
          {expanded ? <View style={s.body}>{children}</View> : null}
        </View>
      </View>
    </GlassCard>
  );
}

const s = StyleSheet.create({
  cardInner: {
    flexDirection: 'row',
  },
  gradientStrip: {
    width: 5,
  },
  mainContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.subtitle.fontSize,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  titleDark: {
    color: DarkColors.textPrimary,
  },
  body: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
});
