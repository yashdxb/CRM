import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { useApi } from '../hooks/useApi';
import { fetchLeads, fetchContacts, fetchOpportunities, fetchActivities } from '../services/data';
import MetricCard from '../components/MetricCard';
import CollapsibleSection from '../components/CollapsibleSection';
import SalesPipeline from '../components/SalesPipeline';
import TaskList from '../components/TaskList';
import ActivityFeed from '../components/ActivityFeed';
import FadeIn from '../components/FadeIn';
import { Colors, DarkColors, Spacing, Radius, Typography } from '../theme/tokens';
import { primaryGradient } from '../theme/gradients';
import type { PipelineStage, DashboardTask, DashboardActivity } from '../models';

// ── Mock Data ────────────────────────────────────

const MOCK_PIPELINE: PipelineStage[] = [
  { label: 'Prospect', count: 14, color: '#22d3ee' },
  { label: 'Qualified', count: 8, color: '#667eea' },
  { label: 'Proposal', count: 5, color: '#a855f7' },
  { label: 'Closed', count: 3, color: '#22c55e' },
];

const MOCK_TASKS: DashboardTask[] = [
  { id: '1', title: 'Follow up with Acme Corp', category: 'Sales', time: '10:00 AM', badge: 'High', badgeColor: '#ef4444', completed: false },
  { id: '2', title: 'Review proposal for TechStart', category: 'Deals', time: '11:30 AM', badge: 'Medium', badgeColor: '#f59e0b', completed: false },
  { id: '3', title: 'Send contract to Global Inc', category: 'Legal', time: '2:00 PM', completed: false },
  { id: '4', title: 'Update CRM pipeline stages', category: 'Admin', time: '4:00 PM', completed: true },
];

const MOCK_ACTIVITIES: DashboardActivity[] = [
  { id: '1', description: 'Deal closed with Summit Partners — $45K', timestamp: '2h ago', color: '#22c55e', icon: 'checkmark' },
  { id: '2', description: 'New lead assigned: Maria Chen', timestamp: '3h ago', color: '#22d3ee', icon: 'person-add' },
  { id: '3', description: 'Proposal sent to BrightWave Inc', timestamp: '5h ago', color: '#a855f7', icon: 'document-text' },
  { id: '4', description: 'Meeting scheduled with TechStart CEO', timestamp: '6h ago', color: '#667eea', icon: 'calendar' },
];

// ── Helpers ──────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getFormattedDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

// ── Component ────────────────────────────────────

export default function HomeScreen() {
  const { session } = useAuth();
  const { data: leadData } = useApi(() => fetchLeads(undefined, 1, 1), []);
  const { data: dealData } = useApi(() => fetchOpportunities(undefined, 1, 1), []);
  const { data: contactData } = useApi(() => fetchContacts(undefined, 1, 1), []);
  const { data: activityData } = useApi(() => fetchActivities(undefined, 1, 1), []);

  const firstName = session?.fullName?.split(' ')[0] ?? 'there';

  return (
    <View style={s.darkBg}>
    <View style={s.stack}>
      {/* Welcome Header */}
      <FadeIn index={0}>
        <View style={s.welcomeHeader}>
          <View style={s.welcomeLeft}>
            <Text style={s.greetingDark}>
              {getGreeting()}, {firstName} 👋
            </Text>
            <Text style={s.dateTextDark}>{getFormattedDate()}</Text>
          </View>
          <View style={s.welcomeRight}>
            {/* Notification bell */}
            <View style={s.bellWrap}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={DarkColors.textSecondary} />
              <View style={s.notifDot} />
            </View>
            {/* Avatar */}
            <LinearGradient
              colors={[...primaryGradient.colors]}
              start={primaryGradient.start}
              end={primaryGradient.end}
              style={s.avatar}
            >
              <Text style={s.avatarText}>
                {getInitials(session?.fullName ?? 'U')}
              </Text>
              <View style={s.avatarDotDark} />
            </LinearGradient>
          </View>
        </View>
      </FadeIn>

      {/* KPI Cards */}
      <FadeIn index={1}>
        <View style={s.metricRow}>
          <MetricCard
            label="Leads"
            value={String(leadData?.total ?? '–')}
            icon="leads"
            ionicon="pulse-outline"
            variant="cyan"
            trend={{ direction: 'up', text: '+12%' }}
            ringPercent={leadData?.total ? Math.min((leadData.total / 50) * 100, 100) : 0}
          />
          <MetricCard
            label="Deals"
            value={String(dealData?.total ?? '–')}
            icon="deals"
            ionicon="briefcase-outline"
            variant="orange"
            trend={{ direction: 'up', text: '+8%' }}
            ringPercent={dealData?.total ? Math.min((dealData.total / 30) * 100, 100) : 0}
          />
        </View>
      </FadeIn>

      <FadeIn index={2}>
        <View style={s.metricRow}>
          <MetricCard
            label="Contacts"
            value={String(contactData?.total ?? '–')}
            icon="contacts"
            ionicon="people-outline"
            variant="green"
            trend={{ direction: 'up', text: '+5%' }}
            ringPercent={contactData?.total ? Math.min((contactData.total / 100) * 100, 100) : 0}
          />
          <MetricCard
            label="Revenue"
            value="$128K"
            icon="money"
            ionicon="cash-outline"
            variant="purple"
            trend={{ direction: 'up', text: '+18%' }}
            ringPercent={72}
          />
        </View>
      </FadeIn>

      {/* Sales Pipeline */}
      <FadeIn index={3}>
        <CollapsibleSection title="Sales Pipeline" icon="chart" variant="dark">
          <SalesPipeline stages={MOCK_PIPELINE} dark />
        </CollapsibleSection>
      </FadeIn>

      {/* Today's Tasks */}
      <FadeIn index={4}>
        <CollapsibleSection title="Today's Tasks" icon="check" variant="dark">
          <TaskList tasks={MOCK_TASKS} dark />
        </CollapsibleSection>
      </FadeIn>

      {/* Recent Activities */}
      <FadeIn index={5}>
        <CollapsibleSection title="Recent Activities" icon="activities" variant="dark">
          <ActivityFeed activities={MOCK_ACTIVITIES} dark />
        </CollapsibleSection>
      </FadeIn>
    </View>
    </View>
  );
}

const s = StyleSheet.create({
  darkBg: {
    backgroundColor: DarkColors.background,
    borderRadius: Radius.xl,
    padding: Spacing.xs,
  },
  stack: {
    gap: 14,
  },
  // Welcome Header
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  welcomeLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  greetingDark: {
    fontSize: 24,
    fontWeight: '800',
    color: DarkColors.textPrimary,
    letterSpacing: -0.3,
  },
  dateText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textMuted,
    marginTop: 2,
  },
  dateTextDark: {
    fontSize: Typography.caption.fontSize,
    color: DarkColors.textMuted,
    marginTop: 2,
  },
  welcomeRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  bellWrap: {
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  avatarDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  avatarDotDark: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderColor: DarkColors.background,
  },
  // Metric rows
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
