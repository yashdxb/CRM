import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../auth/AuthContext';
import { useApi } from '../hooks/useApi';
import { fetchLeads, fetchContacts, fetchOpportunities, fetchActivities } from '../services/data';
import GlassCard from '../components/GlassCard';
import MetricCard from '../components/MetricCard';
import Icon from '../components/Icon';
import FadeIn from '../components/FadeIn';
import { Colors, Spacing, Radius, Typography } from '../theme/tokens';
import { primaryGradient } from '../theme/gradients';

export default function HomeScreen() {
  const { session } = useAuth();
  const { data: leadData } = useApi(() => fetchLeads(undefined, 1, 1), []);
  const { data: dealData } = useApi(() => fetchOpportunities(undefined, 1, 1), []);
  const { data: contactData } = useApi(() => fetchContacts(undefined, 1, 1), []);
  const { data: activityData } = useApi(() => fetchActivities(undefined, 1, 1), []);

  return (
    <View style={s.stack}>
      {/* Hero Card */}
      <FadeIn index={0}>
      <GlassCard variant="elevated">
        <View style={s.heroBadge}>
          <View style={s.badgeDot} />
          <Text style={s.badgeText}>MOBILE COMMAND VIEW</Text>
        </View>

        <Text style={s.heroTitle}>
          <Text style={s.titleGradientWrap}>Welcome back</Text>
          {'\n'}
          <Text style={s.titleLight}>
            {session?.fullName?.split(' ')[0] ?? 'there'}
          </Text>
        </Text>

        <Text style={s.heroDescription}>
          Your sales workspace with lead, deal, and activity intelligence.
        </Text>

        <GlassCard variant="subtle" style={s.focusCard}>
          <View style={s.focusRow}>
            <Icon name="activities" size={16} color={Colors.primary} />
            <View>
              <Text style={s.focusLabel}>TODAY'S FOCUS</Text>
              <Text style={s.focusValue}>Review your pipeline and open actions</Text>
            </View>
          </View>
        </GlassCard>
      </GlassCard>
      </FadeIn>

      {/* Metrics Row 1 */}
      <FadeIn index={1}>
      <View style={s.metricRow}>
        <MetricCard
          label="Open Leads"
          value={String(leadData?.total ?? '–')}
          icon="leads"
          variant="leads"
        />
        <MetricCard
          label="Deals"
          value={String(dealData?.total ?? '–')}
          icon="deals"
          variant="deals"
        />
      </View>
      </FadeIn>

      {/* Metrics Row 2 */}
      <FadeIn index={2}>
      <View style={s.metricRow}>
        <MetricCard
          label="Contacts"
          value={String(contactData?.total ?? '–')}
          icon="contacts"
          variant="contacts"
        />
        <MetricCard
          label="Activities"
          value={String(activityData?.total ?? '–')}
          icon="activities"
          variant="activities"
        />
      </View>
      </FadeIn>

      {/* Getting Started Section */}
      <FadeIn index={3}>
      <GlassCard>
        <Text style={s.sectionTitle}>Getting started</Text>
        <Text style={s.sectionSubtitle}>
          Your mobile CRM is now connected to live data
        </Text>
        <View style={s.infoList}>
          <InfoRow
            icon="link"
            title="Live data active"
            detail="All screens now fetch from your CRM backend."
            variant="contacts"
          />
          <InfoRow
            icon="search"
            title="Search enabled"
            detail="Use the search bar on the Leads tab to find records."
            variant="leads"
          />
          <InfoRow
            icon="lock"
            title="Secure session"
            detail="Your credentials are stored securely on-device."
            variant="activities"
          />
        </View>
      </GlassCard>
      </FadeIn>
    </View>
  );
}

function InfoRow({
  icon,
  title,
  detail,
  variant,
}: {
  icon: string;
  title: string;
  detail: string;
  variant: 'leads' | 'contacts' | 'deals' | 'activities';
}) {
  return (
    <GlassCard variant="subtle" style={s.infoCard}>
      <View style={s.infoHeader}>
        <Icon name={icon} size={16} gradientBubble={variant} bubbleSize={32} />
        <Text style={s.infoTitle}>{title}</Text>
      </View>
      <Text style={s.infoDetail}>{detail}</Text>
    </GlassCard>
  );
}

const s = StyleSheet.create({
  stack: {
    gap: 14,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.green,
  },
  badgeText: {
    ...Typography.label,
    color: Colors.primary,
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  titleGradientWrap: {
    color: Colors.primary,
  },
  titleLight: {
    color: Colors.gray700,
  },
  heroDescription: {
    ...Typography.body,
    color: Colors.textMuted,
    lineHeight: 22,
  },
  focusCard: {
    marginTop: Spacing.md,
  },
  focusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  focusLabel: {
    ...Typography.label,
    color: Colors.textMuted,
    marginBottom: 2,
  },
  focusValue: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 4,
  },
  infoList: {
    marginTop: Spacing.md,
    gap: 10,
  },
  infoCard: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  infoDetail: {
    marginTop: 4,
    marginLeft: 42,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
});
