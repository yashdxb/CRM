import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useApi } from '../hooks/useApi';
import { fetchLeads } from '../services/data';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import GlassCard from '../components/GlassCard';
import EntityCard from '../components/EntityCard';
import Icon from '../components/Icon';
import { Colors, Spacing, Radius } from '../theme/tokens';
import type { LeadListItem } from '../models';

export default function LeadsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 400);
    return () => clearTimeout(timerRef.current);
  }, [searchQuery]);

  const { data, isLoading, error, refresh } = useApi(
    () => fetchLeads(debouncedSearch || undefined),
    [debouncedSearch],
  );

  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={s.stack}>
      <SectionHeading
        title="Leads"
        subtitle="Rep-owned lead list with quick selection"
        icon="leads"
      />

      <Searchbar
        placeholder="Search leads, companies, or status"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={s.searchBar}
        inputStyle={s.searchBarInput}
        placeholderTextColor={Colors.textMuted}
        iconColor={Colors.textMuted}
      />

      {isLoading ? <LoadingState label="Loading leads…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="leads"
          title="No leads found"
          subtitle={searchQuery ? 'Try a different search' : 'Leads will appear here once created'}
        />
      ) : null}

      {!isLoading &&
        items.map((lead) => (
          <EntityCard
            key={lead.id}
            title={lead.name}
            subtitle={lead.company}
            icon="leads"
            variant="leads"
            active={lead.id === selected?.id}
            trailing={`${lead.score}/100`}
            badge={lead.status}
            meta={lead.source ?? ''}
            onPress={() => setSelectedId(lead.id)}
          />
        ))}

      {selected ? <LeadDetailCard lead={selected} /> : null}
    </View>
  );
}

function LeadDetailCard({ lead }: { lead: LeadListItem }) {
  return (
    <GlassCard>
      <Text style={s.detailTitle}>Lead detail</Text>
      <Text style={s.detailSubtitle}>
        Signals, readiness, and the next recommended move
      </Text>
      <View style={s.detailGrid}>
        <DetailPill label="Status" value={lead.status} />
        <DetailPill label="Overall score" value={`${lead.score}/100`} />
        <DetailPill label="Owner" value={lead.owner} />
        <DetailPill label="Source" value={lead.source ?? '—'} />
      </View>
      {lead.leadSummary ? (
        <GlassCard variant="subtle" style={s.summaryCard}>
          <Text style={s.summaryLabel}>LEAD SUMMARY</Text>
          <Text style={s.summaryText}>{lead.leadSummary}</Text>
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
        <Icon name={icon} size={18} gradientBubble="leads" bubbleSize={34} />
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
  searchBar: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    elevation: 0,
  },
  searchBarInput: {
    color: Colors.textPrimary,
    fontSize: 14,
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
