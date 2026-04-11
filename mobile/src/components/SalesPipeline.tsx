import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, DarkColors, Spacing, Radius, Typography } from '../theme/tokens';
import type { PipelineStage } from '../models';

interface SalesPipelineProps {
  stages: PipelineStage[];
  dark?: boolean;
}

export default function SalesPipeline({ stages, dark }: SalesPipelineProps) {
  const total = stages.reduce((sum, s) => sum + s.count, 0) || 1;

  return (
    <View style={s.container}>
      {/* Progress bar */}
      <View style={[s.bar, dark && s.barDark]}>
        {stages.map((stage, i) => {
          const width = `${Math.max((stage.count / total) * 100, 8)}%` as const;
          return (
            <View
              key={stage.label}
              style={[
                s.segment,
                {
                  width,
                  backgroundColor: stage.color,
                  borderTopLeftRadius: i === 0 ? Radius.sm : 0,
                  borderBottomLeftRadius: i === 0 ? Radius.sm : 0,
                  borderTopRightRadius: i === stages.length - 1 ? Radius.sm : 0,
                  borderBottomRightRadius: i === stages.length - 1 ? Radius.sm : 0,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Legend */}
      <View style={s.legend}>
        {stages.map((stage) => (
          <View key={stage.label} style={s.legendItem}>
            <View style={[s.dot, { backgroundColor: stage.color }]} />
            <View>
              <Text style={[s.stageLabel, dark && s.stageLabelDark]}>{stage.label}</Text>
              <Text style={[s.stageCount, dark && s.stageCountDark]}>{stage.count}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  bar: {
    flexDirection: 'row',
    height: 10,
    borderRadius: Radius.sm,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    gap: 2,
  },
  segment: {
    height: '100%',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stageLabel: {
    fontSize: Typography.caption.fontSize,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  stageCount: {
    fontSize: Typography.body.fontSize,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  barDark: {
    backgroundColor: DarkColors.trackBg,
  },
  stageLabelDark: {
    color: DarkColors.textSecondary,
  },
  stageCountDark: {
    color: DarkColors.textPrimary,
  },
});
