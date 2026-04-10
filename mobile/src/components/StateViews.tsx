import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <View style={s.container}>
      <ActivityIndicator size="large" color="#7fa1ff" />
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

export function EmptyState({
  icon = '📭',
  title = 'Nothing here yet',
  subtitle,
}: {
  icon?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={s.container}>
      <Text style={s.emptyIcon}>{icon}</Text>
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
        <Text style={s.errorIcon}>⚠️</Text>
      </View>
      <Text style={s.errorTitle}>Connection issue</Text>
      <Text style={s.errorMessage}>{message}</Text>
      {onRetry ? (
        <Text style={s.retryBtn} onPress={onRetry}>
          Tap to retry
        </Text>
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
    color: '#b7c8e6',
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f4f8ff',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#b7c8e6',
    textAlign: 'center',
    maxWidth: 260,
  },
  errorIconBubble: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    fontSize: 28,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fca5a5',
  },
  errorMessage: {
    fontSize: 13,
    color: '#d3def2',
    textAlign: 'center',
    maxWidth: 280,
  },
  retryBtn: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '700',
    color: '#7fa1ff',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(127, 161, 255, 0.12)',
  },
});
