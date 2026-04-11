import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { useApi } from '../hooks/useApi';
import { fetchDashboardSummary } from '../services/data';
import MetricCard from '../components/MetricCard';
import CollapsibleSection from '../components/CollapsibleSection';
import SalesPipeline from '../components/SalesPipeline';
import TaskList from '../components/TaskList';
import ActivityFeed from '../components/ActivityFeed';
import FadeIn from '../components/FadeIn';
import { Colors, Spacing, Radius, Typography } from '../theme/tokens';
import { primaryGradient } from '../theme/gradients';
import type { PipelineStage, DashboardTask, DashboardActivity } from '../models';

// ── Helpers ──────────────────────────────────────

const STAGE_COLORS: Record<string, string> = {
  prospect: '#22d3ee',
  qualified: '#667eea',
  qualification: '#667eea',
  proposal: '#a855f7',
  negotiation: '#f59e0b',
  closed: '#22c55e',
  'closed won': '#22c55e',
  'closed lost': '#ef4444',
};

const ACTIVITY_TYPE_META: Record<string, { color: string; icon: string }> = {
  call: { color: '#22d3ee', icon: 'call' },
  email: { color: '#667eea', icon: 'mail' },
  meeting: { color: '#a855f7', icon: 'calendar' },
  task: { color: '#f59e0b', icon: 'checkmark-circle' },
  note: { color: '#22c55e', icon: 'document-text' },
};

const PRIORITY_BADGE: Record<string, { label: string; color: string }> = {
  high: { label: 'High', color: '#ef4444' },
  medium: { label: 'Medium', color: '#f59e0b' },
  low: { label: 'Low', color: '#22c55e' },
};

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

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z').getTime();
  const diffMs = now - date;
  const mins = Math.floor(diffMs / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function formatTime(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// ── Component ────────────────────────────────────

export default function HomeScreen() {
  const { session } = useAuth();
  const { data: dashboard } = useApi(fetchDashboardSummary, []);

  const firstName = session?.fullName?.split(' ')[0] ?? 'there';

  // Transform API pipeline stages → UI model
  const pipeline: PipelineStage[] = useMemo(() => {
    if (!dashboard?.pipelineValue) return [];
    return dashboard.pipelineValue.map((s) => ({
      label: s.stage,
      count: s.count,
      color: STAGE_COLORS[s.stage.toLowerCase()] ?? '#94a3b8',
    }));
  }, [dashboard?.pipelineValue]);

  // Transform API tasks → UI model
  const tasks: DashboardTask[] = useMemo(() => {
    if (!dashboard?.myTasks) return [];
    return dashboard.myTasks.map((t) => {
      const badge = PRIORITY_BADGE[(t.priority ?? '').toLowerCase()];
      return {
        id: t.id,
        title: t.subject,
        category: t.type,
        time: formatTime(t.dueDateUtc),
        badge: badge?.label,
        badgeColor: badge?.color,
        completed: t.status === 'Completed' || !!t.completedDateUtc,
      };
    });
  }, [dashboard?.myTasks]);

  // Transform API activities → UI model
  const activities: DashboardActivity[] = useMemo(() => {
    if (!dashboard?.activitiesNextWeek) return [];
    return dashboard.activitiesNextWeek.map((a) => {
      const meta = ACTIVITY_TYPE_META[(a.type ?? '').toLowerCase()] ?? { color: '#94a3b8', icon: 'ellipse' };
      return {
        id: a.id,
        description: a.subject,
        timestamp: formatRelativeTime(a.createdAtUtc),
        color: meta.color,
        icon: meta.icon,
      };
    });
  }, [dashboard?.activitiesNextWeek]);

  return (
    <View style={s.lightBg}>
    <View style={s.stack}>
      {/* Welcome Header */}
      <FadeIn index={0}>
        <View style={s.welcomeHeader}>
          <View style={s.welcomeLeft}>
            <Text style={s.greeting}>
              {getGreeting()}, {firstName} 👋
            </Text>
            <Text style={s.dateText}>{getFormattedDate()}</Text>
          </View>
          <View style={s.welcomeRight}>
            {/* Notification bell */}
            <View style={s.bellWrap}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.textSecondary} />
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
              <View style={s.avatarDot} />
            </LinearGradient>
          </View>
        </View>
      </FadeIn>

      {/* KPI Cards */}
      <FadeIn index={1}>
        <View style={s.metricRow}>
          <MetricCard
            label="Leads"
            value={String(dashboard?.leads ?? '–')}
            icon="leads"
            ionicon="pulse-outline"
            variant="cyan"
            trend={{ direction: 'up', text: '+12%' }}
            ringPercent={dashboard?.leads ? Math.min((dashboard.leads / 50) * 100, 100) : 0}
          />
          <MetricCard
            label="Deals"
            value={String(dashboard?.openOpportunities ?? '–')}
            icon="deals"
            ionicon="briefcase-outline"
            variant="orange"
            trend={{ direction: 'up', text: '+8%' }}
            ringPercent={dashboard?.openOpportunities ? Math.min((dashboard.openOpportunities / 30) * 100, 100) : 0}
          />
        </View>
      </FadeIn>

      <FadeIn index={2}>
        <View style={s.metricRow}>
          <MetricCard
            label="Contacts"
            value={String(dashboard?.totalCustomers ?? '–')}
            icon="contacts"
            ionicon="people-outline"
            variant="green"
            trend={{ direction: 'up', text: '+5%' }}
            ringPercent={dashboard?.totalCustomers ? Math.min((dashboard.totalCustomers / 100) * 100, 100) : 0}
          />
          <MetricCard
            label="Revenue"
            value={dashboard ? formatCurrency(dashboard.pipelineValueTotal) : '–'}
            icon="money"
            ionicon="cash-outline"
            variant="purple"
            trend={{ direction: 'up', text: `${dashboard?.winRate ?? 0}% win` }}
            ringPercent={dashboard?.winRate ?? 0}
          />
        </View>
      </FadeIn>

      {/* Sales Pipeline */}
      <FadeIn index={3}>
        <CollapsibleSection title="Sales Pipeline" icon="chart">
          <SalesPipeline stages={pipeline} />
        </CollapsibleSection>
      </FadeIn>

      {/* Today's Tasks */}
      <FadeIn index={4}>
        <CollapsibleSection title="Today's Tasks" icon="check">
          <TaskList tasks={tasks} />
        </CollapsibleSection>
      </FadeIn>

      {/* Recent Activities */}
      <FadeIn index={5}>
        <CollapsibleSection title="Recent Activities" icon="activities">
          <ActivityFeed activities={activities} />
        </CollapsibleSection>
      </FadeIn>
    </View>
    </View>
  );
}

const s = StyleSheet.create({
  lightBg: {
    backgroundColor: Colors.background,
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
  dateText: {
    fontSize: Typography.caption.fontSize,
    color: Colors.textMuted,
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

  // Metric rows
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
