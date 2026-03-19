import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type TabKey = 'home' | 'leads' | 'contacts' | 'deals' | 'activities';
type AccentTone = 'blue' | 'amber' | 'purple' | 'green' | 'navy';

type Lead = {
  id: string;
  name: string;
  company: string;
  status: string;
  score: number;
  nextAction: string;
  owner: string;
  source: string;
  summary: string;
  qualification: string[];
};

type Contact = {
  id: string;
  name: string;
  account: string;
  role: string;
  lastTouch: string;
  email: string;
  phone: string;
  summary: string;
};

type Deal = {
  id: string;
  name: string;
  account: string;
  stage: string;
  value: string;
  health: number;
  closeDate: string;
  owner: string;
  summary: string;
};

type Activity = {
  id: string;
  title: string;
  owner: string;
  due: string;
  relatedTo: string;
  type: string;
  status: string;
  summary: string;
};

const leads: Lead[] = [
  {
    id: 'L-1004',
    name: 'Tarek Faris',
    company: 'Westport Industrial Realty',
    status: 'Qualified',
    score: 72,
    nextAction: 'Log discovery follow-up',
    owner: 'Anastasiia Zaher',
    source: 'Inbound Call',
    summary:
      'Buyer profile is viable, but budget confirmation and evidence depth still need follow-up before conversion.',
    qualification: [
      'Budget availability remains the weakest signal',
      'Economic buyer not yet fully engaged',
      'Qualification note is present and current',
    ],
  },
  {
    id: 'L-1007',
    name: 'Sofia Bennett',
    company: 'Harborline Capital',
    status: 'Contacted',
    score: 58,
    nextAction: 'Confirm budget range',
    owner: 'Leo Martin',
    source: 'Website form',
    summary:
      'Strong early interest, but qualification is still assumption-heavy and needs better evidence capture.',
    qualification: [
      'Urgency looks positive from outreach response',
      'Financing readiness still unknown',
      'No manager review needed yet',
    ],
  },
  {
    id: 'L-1011',
    name: 'Amelia Foster',
    company: 'Meridian Lane Advisory',
    status: 'New',
    score: 34,
    nextAction: 'Place first call',
    owner: 'Anastasiia Zaher',
    source: 'Referral',
    summary:
      'Fresh lead with limited data. Focus should stay on first-touch execution and profile completion.',
    qualification: [
      'No qualification note captured yet',
      'Buying timeline unknown',
      'Contact profile still incomplete',
    ],
  },
];

const contacts: Contact[] = [
  {
    id: 'C-202',
    name: 'Helena Cross',
    account: 'Sterling Harbor Group',
    role: 'Economic buyer',
    lastTouch: 'Mar 18, 4:20 PM',
    email: 'helena.cross@sterlingharbor.com',
    phone: '+1 (416) 555-0148',
    summary:
      'Key decision-maker with budget authority. Best used for pricing alignment and final commercial confirmation.',
  },
  {
    id: 'C-214',
    name: 'Victor Almeida',
    account: 'North Shore Holdings',
    role: 'Operations lead',
    lastTouch: 'Mar 19, 9:15 AM',
    email: 'victor.almeida@northshoreholdings.com',
    phone: '+1 (647) 555-0107',
    summary:
      'Strong operational champion. Useful for rollout planning, daily coordination, and delivery risk visibility.',
  },
  {
    id: 'C-233',
    name: 'Nadia Petrenko',
    account: 'Crescent Ridge Partners',
    role: 'Champion',
    lastTouch: 'Mar 17, 1:05 PM',
    email: 'nadia.petrenko@crescentridge.com',
    phone: '+1 (437) 555-0185',
    summary:
      'High-engagement contact driving internal momentum. Ideal for maintaining sequence and surfacing blockers early.',
  },
];

const deals: Deal[] = [
  {
    id: 'D-305',
    name: 'Westport Portfolio Expansion',
    account: 'Westport Industrial Realty',
    stage: 'Proposal',
    value: '$148,000',
    health: 81,
    closeDate: 'Apr 11, 2026',
    owner: 'Anastasiia Zaher',
    summary:
      'Commercial scope is well understood. Remaining work is proposal acceptance and buyer-side final confirmation.',
  },
  {
    id: 'D-311',
    name: 'Meridian Reporting Rollout',
    account: 'Meridian Lane Advisory',
    stage: 'Qualification',
    value: '$62,000',
    health: 63,
    closeDate: 'Apr 28, 2026',
    owner: 'Leo Martin',
    summary:
      'Opportunity is progressing, but discovery depth still needs improvement before the deal should move forward.',
  },
  {
    id: 'D-318',
    name: 'Sterling Renewal Uplift',
    account: 'Sterling Harbor Group',
    stage: 'Negotiation',
    value: '$214,000',
    health: 88,
    closeDate: 'Mar 31, 2026',
    owner: 'Anastasiia Zaher',
    summary:
      'Healthy late-stage deal with active commercial alignment. Primary focus is speed and legal turnaround.',
  },
];

const activities: Activity[] = [
  {
    id: 'A-401',
    title: 'Discovery follow-up with Tarek Faris',
    owner: 'Anastasiia Zaher',
    due: 'Today · 4:30 PM',
    relatedTo: 'Lead · Westport Industrial Realty',
    type: 'Call',
    status: 'Upcoming',
    summary:
      'Confirm budget range, urgency, and whether the economic buyer can join the next conversation.',
  },
  {
    id: 'A-409',
    title: 'Proposal review for Sterling Renewal Uplift',
    owner: 'Leo Martin',
    due: 'Tomorrow · 10:00 AM',
    relatedTo: 'Deal · Sterling Harbor Group',
    type: 'Meeting',
    status: 'Upcoming',
    summary:
      'Walk through proposal shape, commercials, and final approval checkpoints before signature routing.',
  },
  {
    id: 'A-418',
    title: 'Call Helena Cross about budget confirmation',
    owner: 'Anastasiia Zaher',
    due: 'Tomorrow · 1:15 PM',
    relatedTo: 'Contact · Sterling Harbor Group',
    type: 'Task',
    status: 'Planned',
    summary:
      'Use this conversation to validate approval path, buying authority, and open commercial concerns.',
  },
];

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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0].id);
  const [selectedContactId, setSelectedContactId] = useState(contacts[0].id);
  const [selectedDealId, setSelectedDealId] = useState(deals[0].id);
  const [selectedActivityId, setSelectedActivityId] = useState(activities[0].id);

  const selectedLead = useMemo(
    () => leads.find((item) => item.id === selectedLeadId) ?? leads[0],
    [selectedLeadId]
  );
  const selectedContact = useMemo(
    () => contacts.find((item) => item.id === selectedContactId) ?? contacts[0],
    [selectedContactId]
  );
  const selectedDeal = useMemo(
    () => deals.find((item) => item.id === selectedDealId) ?? deals[0],
    [selectedDealId]
  );
  const selectedActivity = useMemo(
    () => activities.find((item) => item.id === selectedActivityId) ?? activities[0],
    [selectedActivityId]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.backgroundGlowTop} />
      <View style={styles.backgroundGlowBottom} />

      <View style={styles.appShell}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>North Edge CRM</Text>
            <Text style={styles.headerMeta}>Field workspace for sales execution</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>Preview</Text>
          </View>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'home' ? <HomeScreen /> : null}
          {activeTab === 'leads' ? (
            <>
              <LeadsScreen
                selectedLeadId={selectedLeadId}
                onSelectLead={setSelectedLeadId}
              />
              <LeadDetailCard lead={selectedLead} />
            </>
          ) : null}
          {activeTab === 'contacts' ? (
            <>
              <ContactsScreen
                selectedContactId={selectedContactId}
                onSelectContact={setSelectedContactId}
              />
              <ContactDetailCard contact={selectedContact} />
            </>
          ) : null}
          {activeTab === 'deals' ? (
            <>
              <DealsScreen
                selectedDealId={selectedDealId}
                onSelectDeal={setSelectedDealId}
              />
              <DealDetailCard deal={selectedDeal} />
            </>
          ) : null}
          {activeTab === 'activities' ? (
            <>
              <ActivitiesScreen
                selectedActivityId={selectedActivityId}
                onSelectActivity={setSelectedActivityId}
              />
              <ActivityDetailCard activity={selectedActivity} />
            </>
          ) : null}
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

function HomeScreen() {
  return (
    <View style={styles.sectionStack}>
      <View style={styles.heroCard}>
        <Text style={styles.heroEyebrow}>Mobile Command View</Text>
        <Text style={styles.heroTitle}>Lead, deal, and activity intelligence in motion</Text>
        <Text style={styles.heroSubtitle}>
          Designed as a glass-first mobile CRM surface for fast rep decisions,
          not a compressed copy of the desktop app.
        </Text>

        <View style={styles.heroRibbon}>
          <Text style={styles.heroRibbonLabel}>Today’s focus</Text>
          <Text style={styles.heroRibbonValue}>3 high-priority follow-ups</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <MetricCard label="Open leads" value="24" tone="blue" icon="🎯" />
        <MetricCard label="Deals at risk" value="3" tone="amber" icon="💼" />
      </View>

      <View style={styles.metricRow}>
        <MetricCard label="Activities today" value="11" tone="navy" icon="⚡" />
        <MetricCard label="Approvals pending" value="2" tone="green" icon="✅" />
      </View>

      <SectionCard
        title="Priority inbox"
        subtitle="Immediate items that should drive the rep’s next move"
      >
        <GlassListRow
          title="Discovery follow-up"
          detail="Tarek Faris needs budget confirmation before conversion review."
          accent="blue"
          icon="📞"
        />
        <GlassListRow
          title="Proposal checkpoint"
          detail="Sterling Renewal Uplift is waiting on commercial alignment."
          accent="amber"
          icon="📝"
        />
        <GlassListRow
          title="Contact re-engagement"
          detail="Nadia Petrenko has gone two days without a rep response."
          accent="purple"
          icon="💬"
        />
      </SectionCard>

      <SectionCard
        title="Phase 1 build track"
        subtitle="The mobile product direction now established in this workspace"
      >
        <GlassListRow
          title="Lead detail screen"
          detail="Signals, readiness, owner context, and action planning."
          accent="blue"
          icon="🧭"
        />
        <GlassListRow
          title="Activity create flow"
          detail="Fast task, call, and meeting capture for field execution."
          accent="green"
          icon="⚙️"
        />
        <GlassListRow
          title="Live data integration"
          detail="Replace preview data with typed backend payloads and real empty states."
          accent="navy"
          icon="🔗"
        />
      </SectionCard>
    </View>
  );
}

function LeadsScreen({
  selectedLeadId,
  onSelectLead,
}: {
  selectedLeadId: string;
  onSelectLead: (id: string) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Leads"
        subtitle="Rep-owned lead list with quick selection"
        icon="🎯"
      />
      <View style={styles.searchShell}>
        <Text style={styles.searchText}>Search leads, companies, or status</Text>
      </View>
      {leads.map((lead) => {
        const active = lead.id === selectedLeadId;
        return (
          <Pressable
            key={lead.id}
            onPress={() => onSelectLead(lead.id)}
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
              <Text style={styles.statusPill}>{lead.status}</Text>
              <Text style={styles.recordMeta}>{lead.nextAction}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function ContactsScreen({
  selectedContactId,
  onSelectContact,
}: {
  selectedContactId: string;
  onSelectContact: (id: string) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="People"
        subtitle="Relationship lookup and conversation prep"
        icon="👥"
      />
      {contacts.map((contact) => {
        const active = contact.id === selectedContactId;
        return (
          <Pressable
            key={contact.id}
            onPress={() => onSelectContact(contact.id)}
            style={[styles.recordCard, active ? styles.recordCardActive : null]}
          >
            <View style={styles.recordIdentity}>
              <View style={[styles.recordIconBubble, styles.accentGreen]}>
                <Text style={styles.recordIcon}>👤</Text>
              </View>
              <Text style={styles.recordTitle}>{contact.name}</Text>
            </View>
            <Text style={styles.recordSubtitle}>{contact.account}</Text>
            <View style={styles.recordFooter}>
              <Text style={styles.statusPillMuted}>{contact.role}</Text>
              <Text style={styles.recordMeta}>{contact.lastTouch}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function DealsScreen({
  selectedDealId,
  onSelectDeal,
}: {
  selectedDealId: string;
  onSelectDeal: (id: string) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Deals"
        subtitle="Stage visibility, commercial value, and health"
        icon="💼"
      />
      {deals.map((deal) => {
        const active = deal.id === selectedDealId;
        return (
          <Pressable
            key={deal.id}
            onPress={() => onSelectDeal(deal.id)}
            style={[styles.recordCard, active ? styles.recordCardActive : null]}
          >
            <View style={styles.recordHeader}>
              <View style={styles.recordIdentity}>
                <View style={[styles.recordIconBubble, styles.accentAmber]}>
                  <Text style={styles.recordIcon}>💼</Text>
                </View>
                <Text style={styles.recordTitle}>{deal.name}</Text>
              </View>
              <Text style={styles.scorePill}>{deal.health}/100</Text>
            </View>
            <Text style={styles.recordSubtitle}>{deal.account}</Text>
            <View style={styles.recordFooter}>
              <Text style={styles.statusPill}>{deal.stage}</Text>
              <Text style={styles.recordMeta}>{deal.value}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function ActivitiesScreen({
  selectedActivityId,
  onSelectActivity,
}: {
  selectedActivityId: string;
  onSelectActivity: (id: string) => void;
}) {
  return (
    <View style={styles.sectionStack}>
      <SectionHeading
        title="Actions"
        subtitle="Execution layer for calls, tasks, and meetings"
        icon="⚡"
      />
      {activities.map((activity) => {
        const active = activity.id === selectedActivityId;
        return (
          <Pressable
            key={activity.id}
            onPress={() => onSelectActivity(activity.id)}
            style={[styles.recordCard, active ? styles.recordCardActive : null]}
          >
            <View style={styles.recordIdentity}>
              <View style={[styles.recordIconBubble, styles.accentPurple]}>
                <Text style={styles.recordIcon}>⚡</Text>
              </View>
              <Text style={styles.recordTitle}>{activity.title}</Text>
            </View>
            <Text style={styles.recordSubtitle}>{activity.relatedTo}</Text>
            <View style={styles.recordFooter}>
              <Text style={styles.statusPillMuted}>{activity.type}</Text>
              <Text style={styles.recordMeta}>{activity.due}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function LeadDetailCard({ lead }: { lead: Lead }) {
  return (
    <SectionCard
      title="Lead detail"
      subtitle="Signals, readiness, and the next recommended move"
    >
      <View style={styles.detailGrid}>
        <DetailPill label="Status" value={lead.status} />
        <DetailPill label="Overall score" value={`${lead.score}/100`} />
        <DetailPill label="Owner" value={lead.owner} />
        <DetailPill label="Source" value={lead.source} />
      </View>
      <View style={styles.nextActionCard}>
        <Text style={styles.nextActionLabel}>Lead summary</Text>
        <Text style={styles.nextActionText}>{lead.summary}</Text>
      </View>
      <View style={styles.bulletCard}>
        <Text style={styles.bulletCardTitle}>Qualification notes</Text>
        {lead.qualification.map((item) => (
          <Text key={item} style={styles.bulletItem}>
            • {item}
          </Text>
        ))}
      </View>
    </SectionCard>
  );
}

function ContactDetailCard({ contact }: { contact: Contact }) {
  return (
    <SectionCard
      title="Contact detail"
      subtitle="Relationship context for the next conversation"
    >
      <View style={styles.detailGrid}>
        <DetailPill label="Role" value={contact.role} />
        <DetailPill label="Last touch" value={contact.lastTouch} />
        <DetailPill label="Email" value={contact.email} />
        <DetailPill label="Phone" value={contact.phone} />
      </View>
      <View style={styles.nextActionCard}>
        <Text style={styles.nextActionLabel}>Contact summary</Text>
        <Text style={styles.nextActionText}>{contact.summary}</Text>
      </View>
    </SectionCard>
  );
}

function DealDetailCard({ deal }: { deal: Deal }) {
  return (
    <SectionCard
      title="Deal detail"
      subtitle="Commercial state and execution focus"
    >
      <View style={styles.detailGrid}>
        <DetailPill label="Stage" value={deal.stage} />
        <DetailPill label="Health" value={`${deal.health}/100`} />
        <DetailPill label="Owner" value={deal.owner} />
        <DetailPill label="Close date" value={deal.closeDate} />
      </View>
      <View style={styles.nextActionCard}>
        <Text style={styles.nextActionLabel}>Deal summary</Text>
        <Text style={styles.nextActionText}>{deal.summary}</Text>
      </View>
    </SectionCard>
  );
}

function ActivityDetailCard({ activity }: { activity: Activity }) {
  return (
    <SectionCard
      title="Activity detail"
      subtitle="Execution context and current expectation"
    >
      <View style={styles.detailGrid}>
        <DetailPill label="Type" value={activity.type} />
        <DetailPill label="Status" value={activity.status} />
        <DetailPill label="Owner" value={activity.owner} />
        <DetailPill label="Due" value={activity.due} />
      </View>
      <View style={styles.nextActionCard}>
        <Text style={styles.nextActionLabel}>Activity brief</Text>
        <Text style={styles.nextActionText}>{activity.summary}</Text>
      </View>
    </SectionCard>
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
});
