import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GlassCard from './GlassCard';
import Icon from './Icon';
import { Colors, Typography, Spacing, Radius } from '../theme/tokens';
import { entityGradients, primaryGradient } from '../theme/gradients';

type GradientVariant = 'home' | 'leads' | 'contacts' | 'deals' | 'activities';

/** Accent color per variant for the title bar stripe */
const accentColors: Record<GradientVariant, string> = {
  home: '#667eea',
  leads: '#22d3ee',
  contacts: '#4ade80',
  deals: '#fb923c',
  activities: '#a855f7',
};

interface MetricCardProps {
  label: string;
  value: string;
  icon: string;
  variant?: GradientVariant;
  trend?: { direction: 'up' | 'down'; text: string };
  style?: ViewStyle;
}

export default function MetricCard({
  label,
  value,
  icon,
  variant = 'home',
  trend,
  style,
}: MetricCardProps) {
  const gradient =
    entityGradients[variant as keyof typeof entityGradients] ?? primaryGradient;

  return (
    <GlassCard style={[s.card, style]} noPadding>
      {/* Gradient accent stripe at top */}
      <LinearGradient
        colors={[...gradient.colors] as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={s.accentStripe}
      />

      <View style={s.body}>
        {/* Title row — icon + label */}
        <View style={s.titleRow}>
          <Icon name={icon} size={16} gradientBubble={variant} bubbleSize={30} />
          <Text style={s.label} numberOfLines={1}>
            {label}
          </Text>
        </View>

        {/* Large metric value */}
        <Text style={s.value}>{value}</Text>

        {/* Optional trend */}
        {trend ? (
          <View style={s.trendRow}>
            <Icon
              name={trend.direction === 'up' ? 'forward' : 'forward'}
              size={11}
              color={trend.direction === 'up' ? Colors.green : Colors.red}
            />
            <Text
              style={[
                s.trendText,
                { color: trend.direction === 'up' ? Colors.green : Colors.red },
              ]}
            >
              {trend.text}
            </Text>
          </View>
        ) : null}
      </View>
    </GlassCard>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
  },
  accentStripe: {
    height: 3,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
