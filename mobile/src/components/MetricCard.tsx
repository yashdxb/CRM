import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import GlassCard from './GlassCard';
import Icon from './Icon';
import { Colors, Typography, Spacing } from '../theme/tokens';

type GradientVariant = 'home' | 'leads' | 'contacts' | 'deals' | 'activities';

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
  return (
    <GlassCard style={[s.card, style]}>
      <View style={s.row}>
        <Icon name={icon} size={20} gradientBubble={variant} bubbleSize={40} />
        <View style={s.textBlock}>
          <Text style={s.label}>{label}</Text>
          <Text style={s.value}>{value}</Text>
        </View>
      </View>
      {trend ? (
        <View style={s.trendRow}>
          <Icon
            name={trend.direction === 'up' ? 'forward' : 'forward'}
            size={12}
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
    </GlassCard>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...Typography.label,
    color: Colors.textMuted,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.sm,
  },
  trendText: {
    ...Typography.caption,
  },
});
