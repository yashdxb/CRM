import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useApi } from '../hooks/useApi';
import { fetchContacts } from '../services/data';
import { LoadingState, EmptyState, ErrorState } from '../components/StateViews';
import GlassCard from '../components/GlassCard';
import EntityCard from '../components/EntityCard';
import Icon from '../components/Icon';
import { Colors, Spacing } from '../theme/tokens';
import type { ContactListItem } from '../models';

export default function ContactsScreen() {
  const { data, isLoading, error, refresh } = useApi(() => fetchContacts(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={s.stack}>
      <SectionHeading
        title="People"
        subtitle="Relationship lookup and conversation prep"
        icon="contacts"
      />

      {isLoading ? <LoadingState label="Loading contacts…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="contacts"
          title="No contacts yet"
          subtitle="Contacts will appear once created"
        />
      ) : null}

      {!isLoading &&
        items.map((contact) => (
          <EntityCard
            key={contact.id}
            title={contact.name}
            subtitle={contact.accountName ?? ''}
            icon="contacts"
            variant="contacts"
            active={contact.id === selected?.id}
            badge={contact.buyingRole ?? contact.jobTitle ?? undefined}
            badgeMuted
            meta={contact.email ?? ''}
            onPress={() => setSelectedId(contact.id)}
          />
        ))}

      {selected ? <ContactDetailCard contact={selected} /> : null}
    </View>
  );
}

function ContactDetailCard({ contact }: { contact: ContactListItem }) {
  return (
    <GlassCard>
      <Text style={s.detailTitle}>Contact detail</Text>
      <Text style={s.detailSubtitle}>
        Relationship context for the next conversation
      </Text>
      <View style={s.detailGrid}>
        <DetailPill label="Role" value={contact.buyingRole ?? contact.jobTitle ?? '—'} />
        <DetailPill label="Account" value={contact.accountName ?? '—'} />
        <DetailPill label="Email" value={contact.email ?? '—'} />
        <DetailPill label="Phone" value={contact.phone ?? '—'} />
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
        <Icon name={icon} size={18} gradientBubble="contacts" bubbleSize={34} />
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
