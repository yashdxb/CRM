import React from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import GlassCard from './GlassCard';
import Icon from './Icon';
import { Colors, Typography, Spacing, Radius } from '../theme/tokens';

type EntityVariant = 'leads' | 'contacts' | 'deals' | 'activities';

interface EntityCardProps {
  title: string;
  subtitle?: string;
  icon: string;
  variant: EntityVariant;
  active?: boolean;
  trailing?: string;
  badge?: string;
  badgeMuted?: boolean;
  meta?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function EntityCard({
  title,
  subtitle,
  icon,
  variant,
  active,
  trailing,
  badge,
  badgeMuted,
  meta,
  onPress,
  style,
}: EntityCardProps) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <GlassCard
          variant={active ? 'elevated' : 'default'}
          style={[
            s.card,
            active && s.cardActive,
            pressed && s.cardPressed,
            style,
          ]}
        >
          <View style={s.header}>
            <View style={s.identity}>
              <Icon name={icon} size={18} gradientBubble={variant} bubbleSize={38} />
              <Text style={s.title} numberOfLines={1}>
                {title}
              </Text>
            </View>
            {trailing ? (
              <View style={s.trailingPill}>
                <Text style={s.trailingText}>{trailing}</Text>
              </View>
            ) : null}
          </View>

          {subtitle ? (
            <Text style={s.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}

          {badge || meta ? (
            <View style={s.footer}>
              {badge ? (
                <View style={[s.badge, badgeMuted && s.badgeMuted]}>
                  <Text style={[s.badgeText, badgeMuted && s.badgeTextMuted]}>
                    {badge}
                  </Text>
                </View>
              ) : null}
              {meta ? (
                <Text style={s.meta} numberOfLines={1}>
                  {meta}
                </Text>
              ) : null}
            </View>
          ) : null}
        </GlassCard>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: {
    gap: Spacing.xs,
  },
  cardActive: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  identity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 48, // align with title after icon
  },
  trailingPill: {
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  trailingText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  badge: {
    borderRadius: Radius.pill,
    backgroundColor: 'rgba(102, 126, 234, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeMuted: {
    backgroundColor: 'rgba(148, 163, 184, 0.14)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  badgeTextMuted: {
    color: Colors.textSecondary,
  },
  meta: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: Colors.textMuted,
  },
});
