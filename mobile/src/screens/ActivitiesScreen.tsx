import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApi } from '../hooks/useApi';
import { fetchActivities } from '../services/data';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import GlassCard from '../components/GlassCard';
import EntityCard from '../components/EntityCard';
import Icon from '../components/Icon';
import FadeIn from '../components/FadeIn';
import { Colors, Spacing } from '../theme/tokens';
import type { ActivityListItem } from '../models';

export default function ActivitiesScreen() {
  const { data, isLoading, error, refresh } = useApi(() => fetchActivities(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={s.stack}>
      <FadeIn index={0}>
      <SectionHeading
        title="Actions"
        subtitle="Execution layer for calls, tasks, and meetings"
        icon="activities"
      />
      </FadeIn>

      {isLoading ? <LoadingState label="Loading activities…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="activities"
          title="No activities yet"
          subtitle="Activities will appear once created"
        />
      ) : null}

      {!isLoading &&
        items.map((activity, i) => (
          <FadeIn key={activity.id} index={i} baseDelay={100}>
          <EntityCard
            title={activity.subject}
            subtitle={activity.relatedEntityName ?? ''}
            icon="activities"
            variant="activities"
            active={activity.id === selected?.id}
            badge={activity.type}
            badgeMuted
            meta={
              activity.dueDateUtc
                ? new Date(activity.dueDateUtc).toLocaleDateString()
                : ''
            }
            onPress={() => setSelectedId(activity.id)}
          />
          </FadeIn>
        ))}

      {selected ? (
        <FadeIn index={0} baseDelay={100}>
          <ActivityDetailCard activity={selected} />
        </FadeIn>
      ) : null}
    </View>
  );
}

function ActivityDetailCard({ activity }: { activity: ActivityListItem }) {
  return (
    <GlassCard>
      <Text style={s.detailTitle}>Activity detail</Text>
      <Text style={s.detailSubtitle}>Execution context and current expectation</Text>
      <View style={s.detailGrid}>
        <DetailPill label="Type" value={activity.type} />
        <DetailPill label="Status" value={activity.status} />
        <DetailPill label="Owner" value={activity.ownerName ?? '—'} />
        <DetailPill
          label="Due"
          value={
            activity.dueDateUtc ? new Date(activity.dueDateUtc).toLocaleDateString() : '—'
          }
        />
      </View>
      {activity.description ? (
        <GlassCard variant="subtle" style={s.summaryCard}>
          <Text style={s.summaryLabel}>ACTIVITY BRIEF</Text>
          <Text style={s.summaryText}>{activity.description}</Text>
        </GlassCard>
      ) : null}
    </GlassCard>
  );
}

function SectionHeading({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <View style={s.headingBlock}>
      <View style={s.headingRow}>
        <Icon name={icon} size={18} gradientBubble="activities" bubbleSize={34} />
        <Text style={s.sectionTitle}>{title}</Text>
      </View>
      <Text style={s.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <GlassCard variant="subtle" style={s.pill}>
      <Text style={s.pillLabel}>{label}</Text>
      <Text style={s.pillValue}>{value}</Text>
    </GlassCard>
  );
}

const s = StyleSheet.create({
  stack: {
    gap: 14,
  },
  headingBlock: {
    paddingTop: 8,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: Colors.textMuted,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  detailSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: Spacing.md,
  },
  pill: {
    minWidth: '47%',
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pillLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  pillValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  summaryCard: {
    marginTop: 14,
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: Colors.textMuted,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
