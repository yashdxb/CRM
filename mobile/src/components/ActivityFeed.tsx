import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, DarkColors, Spacing, Radius, Typography } from '../theme/tokens';
import type { DashboardActivity } from '../models';

interface ActivityFeedProps {
  activities: DashboardActivity[];
  dark?: boolean;
}

export default function ActivityFeed({ activities, dark }: ActivityFeedProps) {
  return (
    <View style={s.list}>
      {activities.map((a, idx) => (
        <View
          key={a.id}
          style={[
            s.row,
            idx < activities.length - 1 && (dark ? s.rowBorderDark : s.rowBorder),
          ]}
        >
          <LinearGradient
            colors={[a.color, a.color]}
            style={s.iconCircle}
          >
            <Ionicons
              name={(a.icon ?? 'checkmark') as any}
              size={14}
              color="#ffffff"
            />
          </LinearGradient>
          <Text style={[s.description, dark && s.descriptionDark]} numberOfLines={2}>
            {a.description}
          </Text>
          <Text style={[s.timestamp, dark && s.timestampDark]}>{a.timestamp}</Text>
        </View>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  list: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.10)',
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  description: {
    flex: 1,
    fontSize: Typography.body.fontSize,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textMuted,
    flexShrink: 0,
  },
  rowBorderDark: {
    borderBottomWidth: 1,
    borderBottomColor: DarkColors.separator,
  },
  descriptionDark: {
    color: DarkColors.textPrimary,
  },
  timestampDark: {
    color: DarkColors.textMuted,
  },
});
