import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PaperProvider, Searchbar, Chip } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { CrmTheme } from './src/theme';
import { AuthProvider, useAuth } from './src/auth/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import { useApi } from './src/hooks/useApi';
import {
  fetchLeads,
  fetchContacts,
  fetchOpportunities,
  fetchActivities,
} from './src/services/data';
import { LoadingState, EmptyState, ErrorState } from './src/components/StateViews';
import type {
  LeadListItem,
  ContactListItem,
  OpportunityListItem,
  ActivityListItem,
} from './src/models';

type TabKey = 'home' | 'leads' | 'contacts' | 'deals' | 'activities';
type AccentTone = 'blue' | 'amber' | 'purple' | 'green' | 'navy';

const tabs: { key: TabKey; label: string; icon: string; accent: AccentTone }[] = [
  { key: 'home', label: 'Home', icon: '✨', accent: 'purple' },
  { key: 'leads', label: 'Leads', icon: '🎯', accent: 'blue' },
  { key: 'contacts', label: 'People', icon: '👥', accent: 'green' },
  { key: 'deals', label: 'Deals', icon: '💼', accent: 'amber' },
  { key: 'activities', label: 'Actions', icon: '⚡', accent: 'navy' },
];

function getAccentBubbleStyle(accent: AccentTone) {
  const accentMap = {
    blue: styles.accentBlue,
    amber: styles.accentAmber,
    purple: styles.accentPurple,
    green: styles.accentGreen,
    navy: styles.accentNavy,
  };

  return accentMap[accent];
}

function getTabToneStyle(accent: AccentTone) {
  const accentMap = {
    blue: styles.tabButtonBlue,
    amber: styles.tabButtonAmber,
    purple: styles.tabButtonPurple,
    green: styles.tabButtonGreen,
    navy: styles.tabButtonNavy,
  };

  return accentMap[accent];
}

// ─── Root ───────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CrmTheme}>
        <AuthProvider>
          <AppGate />
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function AppGate() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.backgroundGlowTop} />
        <View style={styles.backgroundGlowBottom} />
        <LoadingState label="Restoring session…" />
      </SafeAreaView>
    );
  }

  if (!session) return <LoginScreen />;
  return <AppShell />;
}

function AppShell() {
  const { session, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('home');

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>North Edge CRM</Text>
            <Text style={styles.headerMeta}>{session?.fullName ?? 'Sales workspace'}</Text>
          </View>
          <Pressable onPress={logout} style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Sign out</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'home' ? <HomeScreen /> : null}
          {activeTab === 'leads' ? <LeadsTab /> : null}
          {activeTab === 'contacts' ? <ContactsTab /> : null}
          {activeTab === 'deals' ? <DealsTab /> : null}
          {activeTab === 'activities' ? <ActivitiesTab /> : null}
        </ScrollView>

        <View style={styles.tabBarShell}>
          <View style={styles.tabBar}>
            {tabs.map((tab) => {
              const isActive = tab.key === activeTab;
              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={[
                    styles.tabButton,
                    getTabToneStyle(tab.accent),
                    isActive ? styles.tabButtonActive : null,
                  ]}
                >
                  <View
                    style={[
                      styles.tabIconBubble,
                      getAccentBubbleStyle(tab.accent),
                      isActive ? styles.tabIconBubbleActive : null,
                    ]}
                  >
                    <Text style={[styles.tabIcon, isActive ? styles.tabIconActive : null]}>
                      {tab.icon}
                    </Text>
                  </View>
                  <Text style={[styles.tabLabel, isActive ? styles.tabLabelActive : null]}>
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Home ───────────────────────────────────────

function HomeScreen() {
  const { session } = useAuth();
  const { data: leadData } = useApi(() => fetchLeads(undefined, 1, 1), []);
  const { data: dealData } = useApi(() => fetchOpportunities(undefined, 1, 1), []);
  const { data: activityData } = useApi(() => fetchActivities(undefined, 1, 1), []);

  return (
    <View style={styles.sectionStack}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Mobile Command View</Text>
        <Text style={styles.heroTitle}>
          Welcome back, {session?.fullName?.split(' ')[0] ?? 'there'}
        </Text>
        <Text style={styles.heroSubtitle}>
          Your sales workspace with lead, deal, and activity intelligence.
        </Text>

        <View style={styles.heroRibbon}>
          <Text style={styles.heroRibbonLabel}>Today's focus</Text>
          <Text style={styles.heroRibbonValue}>Review your pipeline and open actions</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <MetricCard
          label="Open leads"
          value={String(leadData?.total ?? '–')}
          tone="blue"
          icon="🎯"
        />
        <MetricCard
          label="Deals"
          value={String(dealData?.total ?? '–')}
          tone="amber"
          icon="💼"
        />
      </View>

      <View style={styles.metricRow}>
        <MetricCard
          label="Activities"
          value={String(activityData?.total ?? '–')}
          tone="navy"
          icon="⚡"
        />
        <MetricCard label="Connected" value="✓" tone="green" icon="✅" />
      </View>

      <SectionCard
        title="Getting started"
        subtitle="Your mobile CRM is now connected to live data"
      >
        <GlassListRow
          title="Live data active"
          detail="All screens now fetch from your CRM backend."
          accent="green"
          icon="🔗"
        />
        <GlassListRow
          title="Search enabled"
          detail="Use the search bar on the Leads tab to find records."
          accent="blue"
          icon="🔎"
        />
        <GlassListRow
          title="Secure session"
          detail="Your credentials are stored securely on-device."
          accent="purple"
          icon="🔒"
        />
      </SectionCard>
    </View>
  );
}

// ─── Leads ──────────────────────────────────────

function LeadsTab() {
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
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Leads"
        subtitle="Rep-owned lead list with quick selection"
        icon="🎯"
      />
      <Searchbar
        placeholder="Search leads, companies, or status"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchBarInput}
        placeholderTextColor="#adc0df"
        iconColor="#adc0df"
      />
      {isLoading ? <LoadingState label="Loading leads…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="🎯"
          title="No leads found"
          subtitle={searchQuery ? 'Try a different search' : 'Leads will appear here once created'}
        />
      ) : null}
      {!isLoading &&
        items.map((lead) => {
          const active = lead.id === selected?.id;
          return (
            <Pressable
              key={lead.id}
              onPress={() => setSelectedId(lead.id)}
              style={[styles.recordCard, active ? styles.recordCardActive : null]}
            >
              <View style={styles.recordHeader}>
                <View style={styles.recordIdentity}>
                  <View style={[styles.recordIconBubble, styles.accentBlue]}>
                    <Text style={styles.recordIcon}>🎯</Text>
                  </View>
                  <Text style={styles.recordTitle}>{lead.name}</Text>
                </View>
                <Text style={styles.scorePill}>{lead.score}/100</Text>
              </View>
              <Text style={styles.recordSubtitle}>{lead.company}</Text>
              <View style={styles.recordFooter}>
                <Chip mode="flat" compact textStyle={styles.chipText} style={styles.chipStatus}>
                  {lead.status}
                </Chip>
                <Text style={styles.recordMeta}>{lead.source ?? ''}</Text>
              </View>
            </Pressable>
          );
        })}
      {selected ? <LeadDetailCard lead={selected} /> : null}
    </View>
  );
}

// ─── Contacts ───────────────────────────────────

function ContactsTab() {
  const { data, isLoading, error, refresh } = useApi(() => fetchContacts(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="People"
        subtitle="Relationship lookup and conversation prep"
        icon="👥"
      />
      {isLoading ? <LoadingState label="Loading contacts…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState icon="👥" title="No contacts yet" subtitle="Contacts will appear once created" />
      ) : null}
      {!isLoading &&
        items.map((contact) => {
          const active = contact.id === selected?.id;
          return (
            <Pressable
              key={contact.id}
              onPress={() => setSelectedId(contact.id)}
              style={[styles.recordCard, active ? styles.recordCardActive : null]}
            >
              <View style={styles.recordIdentity}>
                <View style={[styles.recordIconBubble, styles.accentGreen]}>
                  <Text style={styles.recordIcon}>👤</Text>
                </View>
                <Text style={styles.recordTitle}>{contact.name}</Text>
              </View>
              <Text style={styles.recordSubtitle}>{contact.accountName ?? ''}</Text>
              <View style={styles.recordFooter}>
                <Text style={styles.statusPillMuted}>
                  {contact.buyingRole ?? contact.jobTitle ?? ''}
                </Text>
                <Text style={styles.recordMeta}>{contact.email ?? ''}</Text>
              </View>
            </Pressable>
          );
        })}
      {selected ? <ContactDetailCard contact={selected} /> : null}
    </View>
  );
}

// ─── Deals ──────────────────────────────────────

function DealsTab() {
  const { data, isLoading, error, refresh } = useApi(() => fetchOpportunities(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Deals"
        subtitle="Stage visibility, commercial value, and health"
        icon="💼"
      />
      {isLoading ? <LoadingState label="Loading deals…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState icon="💼" title="No deals yet" subtitle="Opportunities will appear here" />
      ) : null}
      {!isLoading &&
        items.map((deal) => {
          const active = deal.id === selected?.id;
          return (
            <Pressable
              key={deal.id}
              onPress={() => setSelectedId(deal.id)}
              style={[styles.recordCard, active ? styles.recordCardActive : null]}
            >
              <View style={styles.recordHeader}>
                <View style={styles.recordIdentity}>
                  <View style={[styles.recordIconBubble, styles.accentAmber]}>
                    <Text style={styles.recordIcon}>💼</Text>
                  </View>
                  <Text style={styles.recordTitle}>{deal.name}</Text>
                </View>
                <Text style={styles.scorePill}>{deal.probability}%</Text>
              </View>
              <Text style={styles.recordSubtitle}>{deal.account}</Text>
              <View style={styles.recordFooter}>
                <Text style={styles.statusPill}>{deal.stage}</Text>
                <Text style={styles.recordMeta}>
                  {deal.currency} {deal.amount.toLocaleString()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      {selected ? <DealDetailCard deal={selected} /> : null}
    </View>
  );
}

// ─── Activities ─────────────────────────────────

function ActivitiesTab() {
  const { data, isLoading, error, refresh } = useApi(() => fetchActivities(), []);
  const items = data?.items ?? [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = items.find((i) => i.id === selectedId) ?? items[0] ?? null;

  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Actions"
        subtitle="Execution layer for calls, tasks, and meetings"
        icon="⚡"
      />
      {isLoading ? <LoadingState label="Loading activities…" /> : null}
      {!isLoading && error ? <ErrorState message={error} onRetry={refresh} /> : null}
      {!isLoading && !error && items.length === 0 ? (
        <EmptyState
          icon="⚡"
          title="No activities yet"
          subtitle="Activities will appear once created"
        />
      ) : null}
      {!isLoading &&
        items.map((activity) => {
          const active = activity.id === selected?.id;
          return (
            <Pressable
              key={activity.id}
              onPress={() => setSelectedId(activity.id)}
              style={[styles.recordCard, active ? styles.recordCardActive : null]}
            >
              <View style={styles.recordIdentity}>
                <View style={[styles.recordIconBubble, styles.accentPurple]}>
                  <Text style={styles.recordIcon}>⚡</Text>
                </View>
                <Text style={styles.recordTitle}>{activity.subject}</Text>
              </View>
              <Text style={styles.recordSubtitle}>{activity.relatedEntityName ?? ''}</Text>
              <View style={styles.recordFooter}>
                <Text style={styles.statusPillMuted}>{activity.type}</Text>
                <Text style={styles.recordMeta}>
                  {activity.dueDateUtc
                    ? new Date(activity.dueDateUtc).toLocaleDateString()
                    : ''}
                </Text>
              </View>
            </Pressable>
          );
        })}
      {selected ? <ActivityDetailCard activity={selected} /> : null}
    </View>
  );
}

// ─── Detail Cards ───────────────────────────────

function LeadDetailCard({ lead }: { lead: LeadListItem }) {
  return (
    <SectionCard title="Lead detail" subtitle="Signals, readiness, and the next recommended move">
      <View style={styles.detailGrid}>
        <DetailPill label="Status" value={lead.status} />
        <DetailPill label="Overall score" value={`${lead.score}/100`} />
        <DetailPill label="Owner" value={lead.owner} />
        <DetailPill label="Source" value={lead.source ?? '—'} />
      </View>
      {lead.leadSummary ? (
        <View style={styles.nextActionCard}>
          <Text style={styles.nextActionLabel}>Lead summary</Text>
          <Text style={styles.nextActionText}>{lead.leadSummary}</Text>
        </View>
      ) : null}
    </SectionCard>
  );
}

function ContactDetailCard({ contact }: { contact: ContactListItem }) {
  return (
    <SectionCard
      title="Contact detail"
      subtitle="Relationship context for the next conversation"
    >
      <View style={styles.detailGrid}>
        <DetailPill label="Role" value={contact.buyingRole ?? contact.jobTitle ?? '—'} />
        <DetailPill label="Account" value={contact.accountName ?? '—'} />
        <DetailPill label="Email" value={contact.email ?? '—'} />
        <DetailPill label="Phone" value={contact.phone ?? '—'} />
      </View>
    </SectionCard>
  );
}

function DealDetailCard({ deal }: { deal: OpportunityListItem }) {
  return (
    <SectionCard title="Deal detail" subtitle="Commercial state and execution focus">
      <View style={styles.detailGrid}>
        <DetailPill label="Stage" value={deal.stage} />
        <DetailPill label="Probability" value={`${deal.probability}%`} />
        <DetailPill label="Owner" value={deal.owner} />
        <DetailPill
          label="Close date"
          value={deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : '—'}
        />
      </View>
    </SectionCard>
  );
}

function ActivityDetailCard({ activity }: { activity: ActivityListItem }) {
  return (
    <SectionCard title="Activity detail" subtitle="Execution context and current expectation">
      <View style={styles.detailGrid}>
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
        <View style={styles.nextActionCard}>
          <Text style={styles.nextActionLabel}>Activity brief</Text>
          <Text style={styles.nextActionText}>{activity.description}</Text>
        </View>
      ) : null}
    </SectionCard>
  );
}

// ─── Shared Components ──────────────────────────

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
    <View style={styles.headingBlock}>
      <View style={styles.headingRow}>
        <View style={styles.headingIconBubble}>
          <Text style={styles.headingIcon}>{icon}</Text>
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
    </View>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionCardTitle}>{title}</Text>
      <Text style={styles.sectionCardSubtitle}>{subtitle}</Text>
      <View style={styles.sectionCardBody}>{children}</View>
    </View>
  );
}

function MetricCard({
  label,
  value,
  tone,
  icon,
}: {
  label: string;
  value: string;
  tone: 'blue' | 'amber' | 'navy' | 'green';
  icon: string;
}) {
  const toneStyle = {
    blue: styles.metricCardBlue,
    amber: styles.metricCardAmber,
    navy: styles.metricCardNavy,
    green: styles.metricCardGreen,
  }[tone];

  return (
    <View style={[styles.metricCard, toneStyle]}>
      <View style={styles.metricIconBubble}>
        <Text style={styles.metricIcon}>{icon}</Text>
      </View>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function GlassListRow({
  title,
  detail,
  accent,
  icon,
}: {
  title: string;
  detail: string;
  accent: AccentTone;
  icon: string;
}) {
  const accentStyle = {
    blue: styles.glassListBlue,
    amber: styles.glassListAmber,
    purple: styles.glassListPurple,
    green: styles.glassListGreen,
    navy: styles.glassListNavy,
  }[accent];

  return (
    <View style={[styles.listRow, accentStyle]}>
      <View style={styles.listRowHeader}>
        <View style={[styles.listRowIconBubble, getAccentBubbleStyle(accent)]}>
          <Text style={styles.listRowIcon}>{icon}</Text>
        </View>
        <Text style={styles.listRowTitle}>{title}</Text>
      </View>
      <Text style={styles.listRowDetail}>{detail}</Text>
    </View>
  );
}

function DetailPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailPill}>
      <Text style={styles.detailPillLabel}>{label}</Text>
      <Text style={styles.detailPillValue}>{value}</Text>
    </View>
  );
}

// ─── Styles ─────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0c1730',
  },
  backgroundGlowTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 999,
    backgroundColor: 'rgba(77, 123, 255, 0.35)',
  },
  backgroundGlowBottom: {
    position: 'absolute',
    bottom: -140,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(253, 141, 90, 0.22)',
  },
  appShell: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f4f8ff',
  },
  headerMeta: {
    marginTop: 4,
    fontSize: 14,
    color: '#b7c8e6',
  },
  headerBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  headerBadgeText: {
    color: '#eef4ff',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 18,
    paddingBottom: 118,
    gap: 18,
  },
  sectionStack: {
    gap: 14,
  },
  heroCard: {
    borderRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 24,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    shadowColor: '#040b18',
    shadowOpacity: 0.32,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 10,
  },
  heroEyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#99b7ff',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#f8fbff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#d7e4fb',
  },
  heroRibbon: {
    marginTop: 18,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(8,18,43,0.32)',
  },
  heroRibbonLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#a7c3ff',
    marginBottom: 6,
  },
  heroRibbonValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  metricCardBlue: {
    backgroundColor: 'rgba(115, 166, 255, 0.18)',
    borderColor: 'rgba(147, 188, 255, 0.28)',
  },
  metricCardAmber: {
    backgroundColor: 'rgba(255, 179, 107, 0.18)',
    borderColor: 'rgba(255, 201, 143, 0.3)',
  },
  metricCardNavy: {
    backgroundColor: 'rgba(20, 39, 77, 0.86)',
    borderColor: 'rgba(145, 175, 229, 0.12)',
  },
  metricCardGreen: {
    backgroundColor: 'rgba(91, 205, 151, 0.16)',
    borderColor: 'rgba(135, 223, 179, 0.26)',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f6faff',
    marginBottom: 6,
  },
  metricLabel: {
    fontSize: 13,
    color: '#d3def2',
  },
  metricIconBubble: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 16,
  },
  metricIcon: {
    fontSize: 18,
  },
  sectionCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#020814',
    shadowOpacity: 0.26,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  sectionCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f5f9ff',
  },
  sectionCardSubtitle: {
    fontSize: 13,
    color: '#bfd0ec',
    marginTop: 4,
  },
  sectionCardBody: {
    marginTop: 16,
    gap: 12,
  },
  listRow: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
  },
  listRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  listRowIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  glassListBlue: {
    backgroundColor: 'rgba(97, 144, 255, 0.16)',
    borderColor: 'rgba(144, 180, 255, 0.28)',
  },
  glassListAmber: {
    backgroundColor: 'rgba(255, 185, 123, 0.16)',
    borderColor: 'rgba(255, 210, 163, 0.28)',
  },
  glassListPurple: {
    backgroundColor: 'rgba(154, 110, 255, 0.16)',
    borderColor: 'rgba(190, 160, 255, 0.28)',
  },
  glassListGreen: {
    backgroundColor: 'rgba(82, 199, 143, 0.16)',
    borderColor: 'rgba(128, 224, 175, 0.28)',
  },
  glassListNavy: {
    backgroundColor: 'rgba(35, 70, 118, 0.42)',
    borderColor: 'rgba(132, 163, 214, 0.24)',
  },
  listRowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f3f7ff',
  },
  listRowDetail: {
    marginTop: 4,
    fontSize: 13,
    color: '#d3def2',
  },
  listRowIcon: {
    fontSize: 16,
  },
  headingBlock: {
    paddingTop: 8,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headingIconBubble: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  headingIcon: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#f7fbff',
  },
  sectionSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#c1d3ef',
  },
  searchShell: {
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  searchText: {
    color: '#adc0df',
    fontSize: 14,
  },
  recordCard: {
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#050b18',
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  recordCardActive: {
    borderColor: '#7fa1ff',
    backgroundColor: 'rgba(110, 144, 255, 0.16)',
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  recordIdentity: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  recordIconBubble: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  recordIcon: {
    fontSize: 17,
  },
  recordTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#f4f8ff',
  },
  recordSubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#c5d5ef',
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  statusPill: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: 'rgba(107, 142, 255, 0.22)',
    color: '#dbe6ff',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusPillMuted: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: '#d3def2',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  scorePill: {
    overflow: 'hidden',
    borderRadius: 999,
    backgroundColor: 'rgba(9, 19, 46, 0.74)',
    color: '#f5f9ff',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  recordMeta: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#c1d0e8',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  detailPill: {
    minWidth: '47%',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  detailPillLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#b7c9e7',
    marginBottom: 5,
  },
  detailPillValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#f4f8ff',
  },
  nextActionCard: {
    marginTop: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(9, 19, 45, 0.52)',
    borderWidth: 1,
    borderColor: 'rgba(152, 178, 228, 0.16)',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  nextActionLabel: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#a7c3ff',
    marginBottom: 6,
  },
  nextActionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    color: '#f4f8ff',
  },
  bulletCard: {
    marginTop: 2,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 8,
  },
  bulletCardTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#d6e3fb',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bulletItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#d0dcf2',
  },
  accentBlue: {
    backgroundColor: 'rgba(105, 154, 255, 0.18)',
  },
  accentAmber: {
    backgroundColor: 'rgba(255, 191, 123, 0.18)',
  },
  accentPurple: {
    backgroundColor: 'rgba(168, 125, 255, 0.18)',
  },
  accentGreen: {
    backgroundColor: 'rgba(95, 210, 153, 0.18)',
  },
  accentNavy: {
    backgroundColor: 'rgba(74, 108, 173, 0.22)',
  },
  tabBarShell: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: 14,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: '#030815',
    shadowOpacity: 0.26,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingVertical: 10,
    gap: 4,
  },
  tabButtonBlue: {
    backgroundColor: 'rgba(105, 154, 255, 0.08)',
  },
  tabButtonAmber: {
    backgroundColor: 'rgba(255, 191, 123, 0.08)',
  },
  tabButtonPurple: {
    backgroundColor: 'rgba(168, 125, 255, 0.08)',
  },
  tabButtonGreen: {
    backgroundColor: 'rgba(95, 210, 153, 0.08)',
  },
  tabButtonNavy: {
    backgroundColor: 'rgba(74, 108, 173, 0.12)',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  tabIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  tabIconBubbleActive: {
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  tabIcon: {
    fontSize: 16,
    color: '#dbe6fb',
  },
  tabIconActive: {
    color: '#f5f9ff',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#adc0df',
  },
  tabLabelActive: {
    color: '#f5f9ff',
  },
  searchBar: {
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    elevation: 0,
  },
  searchBarInput: {
    color: '#f4f8ff',
    fontSize: 14,
  },
  chipStatus: {
    backgroundColor: 'rgba(107, 142, 255, 0.22)',
    borderRadius: 999,
    height: 28,
  },
  chipText: {
    color: '#dbe6ff',
    fontSize: 12,
    fontWeight: '700',
    marginVertical: 0,
  },
});
