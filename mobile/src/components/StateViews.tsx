import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Radius } from '../theme/tokens';
import Icon from './Icon';
import GradientButton from './GradientButton';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

export function EmptyState({
  icon = 'search',
  title = 'Nothing here yet',
  subtitle,
}: {
  icon?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={s.container}>
      <View style={s.emptyIconWrap}>
        <Icon name={icon} size={32} color={Colors.textMuted} />
      </View>
      <Text style={s.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={s.emptySubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function ErrorState({
  message = 'Something went wrong',
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={s.container}>
      <View style={s.errorIconBubble}>
        <Icon name="alert" size={28} color={Colors.red} />
      </View>
      <Text style={s.errorTitle}>Connection issue</Text>
      <Text style={s.errorMessage}>{message}</Text>
      {onRetry ? (
        <GradientButton label="Tap to retry" variant="primary" compact onPress={onRetry} />
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 12,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.textMuted,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: 'center',
    maxWidth: 260,
  },
  errorIconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.red,
  },
  errorMessage: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
