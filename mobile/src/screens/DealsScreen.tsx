import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApi } from '../hooks/useApi';
import { fetchOpportunities } from '../services/data';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import GlassCard from '../components/GlassCard';
import EntityCard from '../components/EntityCard';
import Icon from '../components/Icon';
import { Colors, Spacing } from '../theme/tokens';
import type { OpportunityListItem } from '../models';

export default function DealsScreen() {
  const { data, isLoading, error, refresh } = useApi(() => fetchOpportunities(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={s.stack}>
      <SectionHeading
        title="Deals"
        subtitle="Stage visibility, commercial value, and health"
        icon="deals"
      />

      {isLoading ? <LoadingState label="Loading deals…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="deals"
          title="No deals yet"
          subtitle="Opportunities will appear here"
        />
      ) : null}

      {!isLoading &&
        items.map((deal) => (
          <EntityCard
            key={deal.id}
            title={deal.name}
            subtitle={deal.account}
            icon="deals"
            variant="deals"
            active={deal.id === selected?.id}
            trailing={`${deal.probability}%`}
            badge={deal.stage}
            meta={`${deal.currency} ${deal.amount.toLocaleString()}`}
            onPress={() => setSelectedId(deal.id)}
          />
        ))}

      {selected ? <DealDetailCard deal={selected} /> : null}
    </View>
  );
}

function DealDetailCard({ deal }: { deal: OpportunityListItem }) {
  return (
    <GlassCard>
      <Text style={s.detailTitle}>Deal detail</Text>
      <Text style={s.detailSubtitle}>Commercial state and execution focus</Text>
      <View style={s.detailGrid}>
        <DetailPill label="Stage" value={deal.stage} />
        <DetailPill label="Probability" value={`${deal.probability}%`} />
        <DetailPill label="Owner" value={deal.owner} />
        <DetailPill
          label="Close date"
          value={deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : '—'}
        />
      </View>
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
        <Icon name={icon} size={18} gradientBubble="deals" bubbleSize={34} />
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
});
