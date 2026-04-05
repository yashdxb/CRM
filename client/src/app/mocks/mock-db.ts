import { Activity } from '../crm/features/activities/models/activity.model';
import { ActivitySearchRequest, ActivitySearchResponse } from '../crm/features/activities/services/activity-data.service';
import { Customer, CustomerSearchRequest, CustomerSearchResponse } from '../crm/features/customers/models/customer.model';
import { DashboardSummary } from '../crm/features/dashboard/models/dashboard.model';
import { PERMISSION_KEYS } from '../core/auth/permission.constants';
import { Opportunity, OpportunitySearchRequest, OpportunitySearchResponse } from '../crm/features/opportunities/models/opportunity.model';
import { SaveOpportunityRequest } from '../crm/features/opportunities/services/opportunity-data.service';
import { Contact, ContactSearchRequest, ContactSearchResponse } from '../crm/features/contacts/models/contact.model';
import {
  PriceChange, Property, PropertyActivity, PropertyDocument, PropertySearchRequest, PropertySearchResponse,
  Showing, MlsFeedConfig, MlsImportJob, ComparableProperty, CmaReport, SignatureRequest,
  PropertyAlertRule, PropertyAlertNotification
} from '../crm/features/properties/models/property.model';
import { SavePropertyRequest } from '../crm/features/properties/services/property-data.service';
import { UpdateWorkspaceSettingsRequest, VerticalPresetConfiguration, WorkspaceSettings } from '../crm/features/settings/models/workspace-settings.model';
import {
  PermissionDefinition,
  RoleSummary,
  UpsertRoleRequest,
  UpsertUserRequest,
  UserDetailResponse,
  UserListItem,
  UserLookupItem,
  UserSearchRequest,
  UserSearchResponse
} from '../crm/features/settings/models/user-admin.model';

const today = new Date();

const addDays = (date: Date, days: number) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy.toISOString();
};

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const ownerIds: Record<string, string> = {
  'Yasser Ahmed': 'u-001',
  'Mia Khalid': 'u-002',
  'Leah Singh': 'u-003',
  'Omar Ali': 'u-004',
  'Priya Desai': 'u-005',
  'Owen Miles': 'u-006',
  'Marcus Vega': 'u-007',
  'Sasha Reed': 'u-008'
};

const ownerIdFor = (name?: string) => (name ? ownerIds[name] : undefined);

let mockWorkspaceSettings: WorkspaceSettings = {
  id: 'tenant-default',
  key: 'default',
  name: 'CRM Enterprise',
  timeZone: 'UTC',
  currency: 'USD',
  industryPreset: 'CoreCRM',
  verticalPresetConfiguration: {
    presetId: 'CoreCRM',
    vocabulary: {
      leadQualificationLabel: 'Qualification',
      opportunitySingularLabel: 'Deal',
      opportunityPluralLabel: 'Deals',
      pipelineLabel: 'Deal pipeline',
      qualificationGuidance: 'Validate fit, timeline, economic buyer, and urgency before progressing this lead.'
    },
    brokerageLeadProfileCatalog: {
      buyerTypes: [],
      motivationUrgencies: [],
      financingReadinessOptions: [],
      preApprovalStatuses: [],
      preferredAreas: [],
      propertyTypes: [],
      budgetBands: []
    },
    dashboardPackDefaults: ['Revenue Intelligence'],
    reportLibraryHighlights: ['Pipeline by Stage', 'Open Opportunities by Owner', 'Lead Conversion Summary'],
    workflowTemplateHighlights: ['Deal Approval', 'Discount Approval', 'Large Deal Escalation', 'Stage Gate Exception']
  } satisfies VerticalPresetConfiguration,
  assistantActionScoringPolicy: {
    weights: {
      slaBreaches: 14,
      staleOpportunities: 12,
      pendingApprovals: 17,
      lowConfidenceLeads: 9,
      overdueActivities: 11
    },
    thresholds: {
      mediumRiskFrom: 45,
      highRiskFrom: 75,
      soonUrgencyFrom: 50,
      immediateUrgencyFrom: 80
    }
  },
  leadDispositionPolicy: {
    disqualificationReasons: [],
    lossReasons: []
  },
  qualificationPolicy: {
    defaultThreshold: 75,
    managerApprovalBelow: 50,
    blockBelow: 25,
    allowOverrides: true,
    requireOverrideReason: true,
    showCqvsInLeadList: false,
    requireEvidenceBeforeQualified: true,
    minimumEvidenceCoveragePercent: 50,
    factors: [
      { key: 'budget', displayLabel: 'Budget availability', isActive: true, isRequired: true, order: 10, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'readiness', displayLabel: 'Readiness to spend', isActive: true, isRequired: false, order: 20, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'timeline', displayLabel: 'Buying timeline', isActive: true, isRequired: true, order: 30, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'problem', displayLabel: 'Problem severity', isActive: true, isRequired: true, order: 40, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'economicBuyer', displayLabel: 'Economic buyer', isActive: true, isRequired: true, order: 50, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] },
      { key: 'icpFit', displayLabel: 'ICP fit', isActive: true, isRequired: false, order: 60, factorType: 'system', valueType: 'singleSelect', includeInScore: true, options: [] }
    ],
    factorEvidenceRules: [
      { factorKey: 'budget', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Discovery meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
      { factorKey: 'readiness', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery call notes', 'Meeting notes', 'Email confirmation', 'Chat transcript', 'Internal plan mention'] },
      { factorKey: 'timeline', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call notes', 'Discovery meeting notes', 'Meeting notes', 'Email confirmation', 'Buyer email', 'Written confirmation', 'Proposal feedback'] },
      { factorKey: 'problem', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Call recap', 'Discovery call notes', 'Discovery meeting notes', 'Meeting notes', 'Ops review notes', 'Chat transcript'] },
      { factorKey: 'economicBuyer', requireEvidence: true, allowedEvidenceSources: ['No evidence yet', 'Customer call', 'Meeting notes', 'Email from buyer', 'Buyer email', 'Written confirmation', 'Org chart reference'] },
      { factorKey: 'icpFit', requireEvidence: false, allowedEvidenceSources: ['No evidence yet', 'Account research', 'Org chart reference', 'Third-party confirmation', 'Historical / prior deal', 'Customer call'] }
    ],
    thresholdRules: [],
    modifiers: [
      { key: 'competitive', delta: 10 },
      { key: 'executiveChampion', delta: -15 },
      { key: 'strategic', delta: -15 },
      { key: 'fastVelocity', delta: -10 },
      { key: 'slowVelocity', delta: 10 }
    ],
    exposureWeights: [
      { key: 'budget', weight: 25 },
      { key: 'timeline', weight: 20 },
      { key: 'economicBuyer', weight: 20 },
      { key: 'problem', weight: 15 },
      { key: 'readiness', weight: 10 },
      { key: 'icpFit', weight: 10 }
    ],
    leadDataWeights: [
      { key: 'firstNameLastName', weight: 16 },
      { key: 'email', weight: 24 },
      { key: 'phone', weight: 24 },
      { key: 'companyName', weight: 16 },
      { key: 'jobTitle', weight: 12 },
      { key: 'source', weight: 8 }
    ],
    evidenceSources: [
      'No evidence yet',
      'Customer call',
      'Call notes',
      'Call recap',
      'Follow-up call notes',
      'Discovery call notes',
      'Discovery meeting notes',
      'Meeting notes',
      'Email confirmation',
      'Email from buyer',
      'Buyer email',
      'Written confirmation',
      'Chat transcript',
      'Proposal feedback',
      'Internal plan mention',
      'Ops review notes',
      'Org chart reference',
      'Account research',
      'Third-party confirmation',
      'Historical / prior deal',
      'Inferred from context'
    ]
  },
  featureFlags: {
    'communications.emailDelivery': false,
    'communications.emailDelivery.invites': false,
    'communications.emailDelivery.security': false,
    'communications.emailDelivery.approvals': false,
    'communications.emailDelivery.proposals': false,
    'communications.emailDelivery.marketing': false,
    'communications.emailDelivery.notifications': false,
    'communications.emailDelivery.mailbox': false,
    'communications.emailDelivery.statusNotifications': false
  }
};

export const mockCustomers: Customer[] = [
  {
    id: 'c-001',
    name: 'Aaliyah Patel',
    company: 'Northwind Logistics',
    email: 'aaliyah.patel@northwind.com',
    phone: '555-0141',
    address: 'Seattle, WA',
    status: 'Lead',
    owner: 'Yasser Ahmed',
    createdAt: addDays(today, -20),
    notes: ['Requested intro deck', 'Prefers morning calls']
  },
  {
    id: 'c-002',
    name: 'Jonas Berg',
    company: 'Polar Manufacturing',
    email: 'jonas.berg@polar.io',
    phone: '555-2231',
    address: 'Denver, CO',
    status: 'Prospect',
    owner: 'Mia Khalid',
    createdAt: addDays(today, -15),
    notes: ['Negotiating pricing tier']
  },
  {
    id: 'c-003',
    name: 'Sophia Kim',
    company: 'Harbor Retail',
    email: 'sophia.kim@harborretail.com',
    phone: '555-9821',
    address: 'Austin, TX',
    status: 'Customer',
    owner: 'Yasser Ahmed',
    createdAt: addDays(today, -40),
    notes: ['Live since last quarter']
  },
  {
    id: 'c-004',
    name: 'Mateo Rossi',
    company: 'Alpine Energy',
    email: 'mateo.rossi@alpineenergy.com',
    phone: '555-0912',
    address: 'San Jose, CA',
    status: 'Prospect',
    owner: 'Leah Singh',
    createdAt: addDays(today, -12)
  },
  {
    id: 'c-005',
    name: 'Emily Carter',
    company: 'Cobalt Systems',
    email: 'emily.carter@cobalt.dev',
    phone: '555-7621',
    address: 'Chicago, IL',
    status: 'Customer',
    owner: 'Omar Ali',
    createdAt: addDays(today, -60)
  },
  {
    id: 'c-006',
    name: 'Daniel Wu',
    company: 'Evergreen Foods',
    email: 'daniel.wu@evergreenfoods.com',
    phone: '555-5521',
    address: 'Portland, OR',
    status: 'Lead',
    owner: 'Mia Khalid',
    createdAt: addDays(today, -5)
  },
  {
    id: 'c-007',
    name: 'Priya Desai',
    company: 'UrbanGrid',
    email: 'priya.desai@urbangrid.com',
    phone: '555-8812',
    address: 'New York, NY',
    status: 'Customer',
    owner: 'Yasser Ahmed',
    createdAt: addDays(today, -25)
  },
  {
    id: 'c-008',
    name: 'Carlos Mendes',
    company: 'Latitude Ventures',
    email: 'carlos.mendes@latitude.vc',
    phone: '555-1752',
    address: 'Miami, FL',
    status: 'Prospect',
    owner: 'Leah Singh',
    createdAt: addDays(today, -8)
  },
  {
    id: 'c-009',
    name: 'Hannah Fischer',
    company: 'BluePeak Health',
    email: 'hannah.fischer@bluepeakhealth.com',
    phone: '555-4419',
    address: 'Boston, MA',
    status: 'Customer',
    owner: 'Omar Ali',
    createdAt: addDays(today, -75)
  },
  {
    id: 'c-010',
    name: 'Liam Murphy',
    company: 'Cedar Analytics',
    email: 'liam.murphy@cedaranalytics.com',
    phone: '555-0042',
    address: 'Dublin, OH',
    status: 'Lead',
    owner: 'Yasser Ahmed',
    createdAt: addDays(today, -2)
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'a-001',
    subject: 'Q1 success review',
    type: 'Call',
    priority: 'Normal',
    dueDateUtc: addDays(today, 2),
    status: 'Upcoming',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-003',
    relatedEntityName: 'Sophia Kim',
    ownerName: 'Leah Singh',
    ownerId: ownerIdFor('Leah Singh')
  },
  {
    id: 'a-002',
    subject: 'Renewal prep',
    type: 'Meeting',
    priority: 'High',
    dueDateUtc: addDays(today, -1),
    status: 'Overdue',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-005',
    relatedEntityName: 'Emily Carter',
    ownerName: 'Owen Miles',
    ownerId: ownerIdFor('Owen Miles')
  },
  {
    id: 'a-003',
    subject: 'Send pricing sheet',
    type: 'Task',
    dueDateUtc: addDays(today, 1),
    status: 'Upcoming',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-002',
    relatedEntityName: 'Jonas Berg',
    ownerName: 'Priya Desai',
    ownerId: ownerIdFor('Priya Desai')
  },
  {
    id: 'a-004',
    subject: 'Adoption workshop',
    type: 'Meeting',
    priority: 'High',
    dueDateUtc: addDays(today, 5),
    status: 'Upcoming',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-007',
    relatedEntityName: 'Priya Desai',
    ownerName: 'Marcus Vega',
    ownerId: ownerIdFor('Marcus Vega')
  },
  {
    id: 'a-005',
    subject: 'Lead qualification',
    type: 'Call',
    dueDateUtc: addDays(today, 0),
    status: 'Upcoming',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-006',
    relatedEntityName: 'Daniel Wu',
    ownerName: 'Sasha Reed',
    ownerId: ownerIdFor('Sasha Reed')
  },
  {
    id: 'a-006',
    subject: 'Invoice review',
    type: 'Task',
    dueDateUtc: addDays(today, -3),
    completedDateUtc: addDays(today, -2),
    status: 'Completed',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-009',
    relatedEntityName: 'Hannah Fischer',
    ownerName: 'Yasser Ahmed',
    ownerId: ownerIdFor('Yasser Ahmed')
  },
  {
    id: 'a-007',
    subject: 'Intro discovery',
    type: 'Call',
    dueDateUtc: addDays(today, 3),
    status: 'Upcoming',
    relatedEntityType: 'Account',
    relatedEntityId: 'c-010',
    relatedEntityName: 'Liam Murphy',
    ownerName: 'Leah Singh',
    ownerId: ownerIdFor('Leah Singh')
  },
  {
    id: 'a-008',
    subject: 'Proposal walkthrough call',
    type: 'Call',
    priority: 'High',
    dueDateUtc: addDays(today, -2),
    completedDateUtc: addDays(today, -2),
    status: 'Completed',
    outcome: 'Client receptive, requested discount options',
    relatedEntityType: 'Opportunity',
    relatedEntityId: 'opp-001',
    relatedEntityName: 'Cedar Analytics Expansion',
    ownerName: 'Yasser Ahmed',
    ownerId: ownerIdFor('Yasser Ahmed')
  },
  {
    id: 'a-009',
    subject: 'Executive sponsor introduction',
    type: 'Meeting',
    priority: 'High',
    dueDateUtc: addDays(today, 4),
    status: 'Upcoming',
    relatedEntityType: 'Opportunity',
    relatedEntityId: 'opp-001',
    relatedEntityName: 'Cedar Analytics Expansion',
    ownerName: 'Yasser Ahmed',
    ownerId: ownerIdFor('Yasser Ahmed')
  },
  {
    id: 'a-010',
    subject: 'Send revised contract terms',
    type: 'Task',
    dueDateUtc: addDays(today, 1),
    status: 'Upcoming',
    relatedEntityType: 'Opportunity',
    relatedEntityId: 'opp-002',
    relatedEntityName: 'Evergreen Foods Renewal',
    ownerName: 'Mia Khalid',
    ownerId: ownerIdFor('Mia Khalid')
  },
  {
    id: 'a-011',
    subject: 'Negotiation follow-up email',
    type: 'Email',
    dueDateUtc: addDays(today, -1),
    completedDateUtc: addDays(today, -1),
    status: 'Completed',
    outcome: 'Agreement on pricing tier 2',
    relatedEntityType: 'Opportunity',
    relatedEntityId: 'opp-002',
    relatedEntityName: 'Evergreen Foods Renewal',
    ownerName: 'Mia Khalid',
    ownerId: ownerIdFor('Mia Khalid')
  }
];

const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    name: 'Cedar Analytics Expansion',
    account: 'Cedar Analytics',
    stage: 'Proposal',
    amount: 180000,
    probability: 55,
    currency: 'USD',
    closeDate: addDays(today, 30),
    owner: 'Yasser Ahmed',
    status: 'Open',
    createdAtUtc: addDays(today, -25),
    updatedAtUtc: addDays(today, -5)
  },
  {
    id: 'opp-002',
    name: 'Evergreen Foods Renewal',
    account: 'Evergreen Foods',
    stage: 'Negotiation',
    amount: 95000,
    probability: 75,
    currency: 'USD',
    closeDate: addDays(today, 18),
    owner: 'Mia Khalid',
    status: 'Open',
    createdAtUtc: addDays(today, -70),
    updatedAtUtc: addDays(today, -45)
  },
  {
    id: 'opp-003',
    name: 'UrbanGrid Net-New',
    account: 'UrbanGrid',
    stage: 'Qualification',
    amount: 64000,
    probability: 35,
    currency: 'USD',
    closeDate: addDays(today, 45),
    owner: 'Leah Singh',
    status: 'Open',
    createdAtUtc: addDays(today, -18),
    updatedAtUtc: addDays(today, -8)
  },
  {
    id: 'opp-004',
    name: 'Polar Manufacturing Rollout',
    account: 'Polar Manufacturing',
    stage: 'Closed Won',
    amount: 210000,
    probability: 100,
    currency: 'USD',
    closeDate: addDays(today, -10),
    owner: 'Omar Ali',
    status: 'Closed Won',
    createdAtUtc: addDays(today, -120),
    updatedAtUtc: addDays(today, -10)
  },
  {
    id: 'opp-005',
    name: 'BluePeak Health Pilot',
    account: 'BluePeak Health',
    stage: 'Prospecting',
    amount: 48000,
    probability: 20,
    currency: 'USD',
    closeDate: addDays(today, 60),
    owner: 'Priya Desai',
    status: 'Open',
    createdAtUtc: addDays(today, -10),
    updatedAtUtc: addDays(today, -3)
  },
  {
    id: 'opp-006',
    name: 'Latitude Ventures Renewal',
    account: 'Latitude Ventures',
    stage: 'Closed Lost',
    amount: 72000,
    probability: 0,
    currency: 'USD',
    closeDate: addDays(today, -22),
    owner: 'Yasser Ahmed',
    status: 'Closed Lost',
    winLossReason: 'Selected competitor',
    createdAtUtc: addDays(today, -90),
    updatedAtUtc: addDays(today, -22)
  }
];

const paginate = <T>(items: T[], page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

export function searchCustomers(query: CustomerSearchRequest): CustomerSearchResponse {
  const searchTerm = (query.search ?? '').toLowerCase();
  let result = [...mockCustomers];

  if (query.status) {
    result = result.filter((c) => c.status === query.status);
  }

  if (searchTerm) {
    result = result.filter((c) =>
      [c.name, c.company, c.email, c.phone].some((field) => field.toLowerCase().includes(searchTerm))
    );
  }

  const total = result.length;
  const items = paginate(result, query.page ?? 1, query.pageSize ?? 10);

  return { items, total };
}

export function searchActivities(query: ActivitySearchRequest): ActivitySearchResponse {
  const searchTerm = (query.search ?? '').toLowerCase();
  let result = [...mockActivities];

  if (query.status) {
    result = result.filter((a) => a.status === query.status);
  }

  if (query.type) {
    result = result.filter((a) => a.type === query.type);
  }

  if (query.ownerId) {
    result = result.filter((a) => a.ownerId === query.ownerId);
  }

  if (searchTerm) {
    result = result.filter((a) =>
      [
        a.subject,
        a.description,
        a.relatedEntityName,
        a.ownerName
      ]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(searchTerm))
    );
  }

  const total = result.length;
  const items = paginate(result, query.page ?? 1, query.pageSize ?? 10);
  return { items, total };
}

const stageToStatus = (stage?: string): Opportunity['status'] => {
  if (!stage) return 'Open';
  if (stage.startsWith('Closed Won')) return 'Closed Won';
  if (stage.startsWith('Closed Lost')) return 'Closed Lost';
  return 'Open';
};

const findCustomerName = (accountId?: string) => {
  if (!accountId) return undefined;
  return mockCustomers.find((c) => c.id === accountId)?.name;
};

export function searchOpportunities(query: OpportunitySearchRequest): OpportunitySearchResponse {
  const searchTerm = (query.search ?? '').toLowerCase();
  let result = [...mockOpportunities];

  if (query.stage) {
    result = result.filter((opp) => opp.stage === query.stage);
  }

  if (query.missingNextStep) {
    result = result.filter((opp) => !opp.nextStepDueAtUtc);
  }

  if (searchTerm) {
    result = result.filter((opp) =>
      [opp.name, opp.account, opp.owner].some((value) => value.toLowerCase().includes(searchTerm))
    );
  }

  const total = result.length;
  const items = paginate(result, query.page ?? 1, query.pageSize ?? 10);
  return { items, total };
}

export function createOpportunity(payload: SaveOpportunityRequest): Opportunity {
  const accountName = findCustomerName(payload.accountId) ?? 'Unassigned';
  const stage = payload.stageName || 'Prospecting';
  const status = stageToStatus(stage);
  const record: Opportunity = {
    id: `opp-${Math.random().toString(36).slice(2, 8)}`,
    name: payload.name,
    account: accountName,
    stage,
    amount: payload.amount ?? 0,
    probability: payload.probability ?? 0,
    currency: payload.currency || 'USD',
    closeDate: payload.expectedCloseDate || addDays(today, 30),
    owner: 'Yasser Ahmed',
    status,
    winLossReason: payload.winLossReason ?? undefined,
    createdAtUtc: new Date().toISOString(),
    updatedAtUtc: new Date().toISOString()
  };
  mockOpportunities.unshift(record);
  return { ...record };
}

export function updateOpportunity(id: string, payload: SaveOpportunityRequest): Opportunity | null {
  const target = mockOpportunities.find((opp) => opp.id === id);
  if (!target) return null;

  const stage = payload.stageName || target.stage;
  target.name = payload.name ?? target.name;
  target.account = findCustomerName(payload.accountId) ?? target.account;
  target.stage = stage;
  target.amount = payload.amount ?? target.amount;
  target.probability = payload.probability ?? target.probability ?? 0;
  target.currency = payload.currency || target.currency;
  target.closeDate = payload.expectedCloseDate || target.closeDate;
  target.status = stageToStatus(stage);
  target.winLossReason = payload.winLossReason ?? target.winLossReason;
  target.updatedAtUtc = new Date().toISOString();
  return { ...target };
}

export function getOpportunityById(id: string): Opportunity | null {
  const target = mockOpportunities.find((opp) => opp.id === id);
  return target ? { ...target } : null;
}

export function deleteOpportunity(id: string): boolean {
  const countBefore = mockOpportunities.length;
  const next = mockOpportunities.filter((opp) => opp.id !== id);
  mockOpportunities.length = 0;
  mockOpportunities.push(...next);
  return next.length !== countBefore;
}

export function buildDashboardSummary(): DashboardSummary {
  const leads = mockCustomers.filter((c) => c.status === 'Lead').length;
  const prospects = mockCustomers.filter((c) => c.status === 'Prospect').length;
  const activeCustomers = mockCustomers.filter((c) => c.status === 'Customer').length;

  const upcomingActivities = mockActivities.filter((a) => a.status === 'Upcoming').length;
  const overdueActivities = mockActivities.filter((a) => a.status === 'Overdue').length;
  const tasksDueToday = mockActivities.filter((a) => {
    if (a.status === 'Completed' || !a.dueDateUtc) {
      return false;
    }
    return new Date(a.dueDateUtc).toDateString() === today.toDateString();
  }).length;

  const recentCustomers = [...mockCustomers]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  const activitiesNextWeek = mockActivities
    .filter((a) => {
      if (!a.dueDateUtc) {
        return false;
      }
      const due = new Date(a.dueDateUtc).getTime();
      const diffDays = (due - today.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays <= 7 && diffDays >= -1;
    })
    .sort((a, b) => {
      const aDue = a.dueDateUtc ? new Date(a.dueDateUtc).getTime() : 0;
      const bDue = b.dueDateUtc ? new Date(b.dueDateUtc).getTime() : 0;
      return aDue - bDue;
    });

  // Calculate activity breakdown
  const activityTypes = [
    'Call',
    'Email',
    'Meeting',
    'Task',
    'Property Tour',
    'Open House',
    'Listing Presentation',
    'Appraisal',
    'Inspection',
    'Offer Submission',
    'Contract Signing',
    'Document Review',
    'Lease Signing',
    'Move-in/Move-out Walkthrough',
    'Maintenance Request',
    'Follow-up',
    'Client Onboarding',
    'Closing Coordination',
    'Marketing Campaign',
    'Virtual Tour',
    'Photography Session'
  ];
  const totalActivities = mockActivities.length;
  const activityBreakdown = activityTypes.map(type => {
    const count = mockActivities.filter(a => a.type === type).length;
    return {
      type,
      count,
      percentage: Math.round((count / totalActivities) * 100)
    };
  });

  // Generate revenue by month (last 6 months)
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const revenueByMonth = months.map((label, i) => ({
    label,
    value: 85000 + Math.floor(Math.random() * 40000) + (i * 8000)
  }));

  // Customer growth trend
  const customerGrowth = months.map((label, i) => ({
    label,
    value: 35 + (i * 8) + Math.floor(Math.random() * 5)
  }));

  // Pipeline stages with values
  const pipelineValue = [
    { stage: 'Qualification', count: leads, value: leads * 12500 },
    { stage: 'Proposal', count: prospects, value: prospects * 28000 },
    { stage: 'Negotiation', count: Math.floor(prospects * 0.6), value: Math.floor(prospects * 0.6) * 45000 },
    { stage: 'Closed Won', count: activeCustomers, value: activeCustomers * 52000 }
  ];
  const pipelineValueTotal = pipelineValue.reduce((sum, stage) => sum + stage.value, 0);
  const openOpportunities = mockOpportunities.filter((opp) => opp.status === 'Open').length;

  // Conversion trend (weekly for past 6 weeks)
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  const conversionTrend = weeks.map((label, i) => ({
    label,
    value: 18 + Math.floor(Math.random() * 12) + (i * 2)
  }));

  // Top performers
  const topPerformers = [
    { name: 'Yasser Ahmed', deals: 12, revenue: 285000 },
    { name: 'Mia Khalid', deals: 9, revenue: 198000 },
    { name: 'Leah Singh', deals: 8, revenue: 176000 },
    { name: 'Omar Ali', deals: 7, revenue: 154000 }
  ];

  const newlyAssignedLeads = mockCustomers
    .filter((c) => c.status === 'Lead')
    .slice(0, 6)
    .map((lead) => ({
      id: lead.id,
      name: lead.name,
      company: lead.company,
      status: lead.status,
      email: lead.email,
      createdAtUtc: lead.createdAt
    }));

  const atRiskDeals = mockOpportunities
    .filter((opp) => opp.status === 'Open')
    .slice(0, 6)
    .map((opp, index) => ({
      id: opp.id,
      name: opp.name,
      accountName: opp.account,
      stage: opp.stage,
      amount: opp.amount ?? 0,
      reason: index % 2 === 0 ? 'Missing next step' : 'Next step overdue',
      nextStepDueAtUtc: undefined,
      lastActivityAtUtc: undefined
    }));

  return {
    totalCustomers: mockCustomers.length,
    leads,
    prospects,
    activeCustomers,
    openOpportunities,
    pipelineValueTotal,
    tasksDueToday,
    upcomingActivities,
    overdueActivities,
    atRiskOpportunities: Math.max(0, Math.floor(openOpportunities * 0.2)),
    opportunitiesWithoutNextStep: Math.max(0, Math.floor(openOpportunities * 0.12)),
    recentCustomers,
    activitiesNextWeek,
    myTasks: [],
    
    // Chart data
    revenueByMonth,
    customerGrowth,
    activityBreakdown,
    pipelineValue,
    conversionTrend,
    topPerformers,
    newlyAssignedLeads,
    atRiskDeals,
    
    // Additional metrics
    avgDealSize: 42500,
    winRate: 34,
    avgSalesCycle: 28,
    monthlyRecurringRevenue: 125000,
    customerLifetimeValue: 185000,
    churnRate: 2.4,
    avgQualificationConfidence: 0.62,
    avgTruthCoverage: 0.48,
    avgTimeToTruthDays: 18.5,
    riskRegisterCount: 12,
    riskIntelligence: [
      {
        key: 'buying-timeline-needs-validation',
        label: 'Buying timeline needs validation',
        count: 5,
        severity: 'critical',
        impact: 'Forecast risk',
        recommendedAction: 'Confirm timeline',
        route: 'dashboard-no-next-step'
      },
      {
        key: 'economic-buyer-not-engaged',
        label: 'Economic buyer not engaged',
        count: 4,
        severity: 'high',
        impact: 'Deal stall risk',
        recommendedAction: 'Identify decision maker',
        route: 'dashboard-new-leads'
      },
      {
        key: 'budget-needs-validation',
        label: 'Budget needs validation',
        count: 3,
        severity: 'medium',
        impact: 'Qualification gap',
        recommendedAction: 'Confirm budget',
        route: 'dashboard-new-leads'
      }
    ],
    topRiskFlags: [
      { label: 'Buying timeline needs validation', count: 5 },
      { label: 'Economic buyer not engaged', count: 4 },
      { label: 'Budget availability needs validation', count: 3 }
    ],
    confidenceWeightedPipelineValue: pipelineValueTotal * 0.68,
    costOfNotKnowingValue: pipelineValueTotal * 0.22,
    costOfNotKnowingDeals: Math.max(1, Math.floor(openOpportunities * 0.4)),
    costOfNotKnowingBreakdown: [
      {
        opportunityId: mockOpportunities[0]?.id ?? '',
        opportunityName: mockOpportunities[0]?.name ?? 'Expansion - Acme',
        accountName: mockCustomers[0]?.company ?? 'Acme Corporation',
        stage: mockOpportunities[0]?.stage ?? 'Qualification',
        amount: mockOpportunities[0]?.amount ?? 85000,
        costOfNotKnowingValue: 18000,
        topFactors: [
          { key: 'economicBuyer', label: 'Economic buyer', weight: 20, contribution: 7000, state: 'Unknown' },
          { key: 'timeline', label: 'Buying timeline', weight: 20, contribution: 6000, state: 'Assumed' },
          { key: 'budget', label: 'Budget availability', weight: 25, contribution: 5000, state: 'Unknown' }
        ]
      },
      {
        opportunityId: mockOpportunities[1]?.id ?? '',
        opportunityName: mockOpportunities[1]?.name ?? 'Renewal - Northwind',
        accountName: mockCustomers[1]?.company ?? 'Northwind Labs',
        stage: mockOpportunities[1]?.stage ?? 'Discovery',
        amount: mockOpportunities[1]?.amount ?? 52000,
        costOfNotKnowingValue: 11000,
        topFactors: [
          { key: 'problem', label: 'Problem severity', weight: 15, contribution: 4200, state: 'Unknown' },
          { key: 'readiness', label: 'Readiness to spend', weight: 10, contribution: 3400, state: 'Assumed' },
          { key: 'icpFit', label: 'ICP fit', weight: 10, contribution: 3400, state: 'Unknown' }
        ]
      }
    ],
    costOfNotKnowingTrend: [
      { label: 'W1', value: pipelineValueTotal * 0.28 },
      { label: 'W2', value: pipelineValueTotal * 0.26 },
      { label: 'W3', value: pipelineValueTotal * 0.24 },
      { label: 'W4', value: pipelineValueTotal * 0.23 },
      { label: 'W5', value: pipelineValueTotal * 0.21 },
      { label: 'W6', value: pipelineValueTotal * 0.22 },
      { label: 'W7', value: pipelineValueTotal * 0.2 },
      { label: 'W8', value: pipelineValueTotal * 0.19 }
    ],
    confidenceCalibrationScore: 72,
    confidenceCalibrationSample: 48,
    myPipelineValueTotal: pipelineValueTotal * 0.38,
    myConfidenceWeightedPipelineValue: pipelineValueTotal * 0.25,
    forecastScenarios: [
      { key: 'base', label: 'Base forecast', value: pipelineValueTotal * 0.68, dealCount: openOpportunities, deltaFromBase: 0 },
      { key: 'conservative', label: 'Conservative', value: pipelineValueTotal * 0.52, dealCount: Math.floor(openOpportunities * 0.8), deltaFromBase: pipelineValueTotal * -0.16 },
      { key: 'commit', label: 'Commit only', value: pipelineValueTotal * 0.3, dealCount: Math.floor(openOpportunities * 0.35), deltaFromBase: pipelineValueTotal * -0.38 }
    ]
  };
}

const permissionCatalog: PermissionDefinition[] = [
  {
    key: PERMISSION_KEYS.dashboardView,
    label: 'Dashboard',
    description: 'Access real-time company and pipeline health dashboards.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.customersView,
    label: 'Customers (View)',
    description: 'View customer accounts and account details.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.customersManage,
    label: 'Customers (Manage)',
    description: 'Create, edit, and manage customer accounts.',
    capability: 'Create & Manage Records'
  },
  {
    key: PERMISSION_KEYS.contactsView,
    label: 'Contacts (View)',
    description: 'View contact records tied to customers and leads.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.contactsManage,
    label: 'Contacts (Manage)',
    description: 'Manage contact records tied to customers and leads.',
    capability: 'Create & Manage Records'
  },
  {
    key: PERMISSION_KEYS.leadsView,
    label: 'Leads (View)',
    description: 'View lead details and conversion history.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.leadsManage,
    label: 'Leads (Manage)',
    description: 'Work every lead stage from prospecting through conversion.',
    capability: 'Create & Manage Records'
  },
  {
    key: PERMISSION_KEYS.opportunitiesView,
    label: 'Opportunities (View)',
    description: 'View pipelines, stages, and forecasting.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.opportunitiesManage,
    label: 'Opportunities (Manage)',
    description: 'Forecast, update, and close opportunities across pipelines.',
    capability: 'Create & Manage Records'
  },
  {
    key: PERMISSION_KEYS.opportunitiesApprovalsRequest,
    label: 'Approvals (Request)',
    description: 'Request approvals for discounts, close exceptions, and overrides.',
    capability: 'Approve & Override'
  },
  {
    key: PERMISSION_KEYS.opportunitiesApprovalsApprove,
    label: 'Approvals (Approve)',
    description: 'Approve or reject pending approval requests.',
    capability: 'Approve & Override'
  },
  {
    key: PERMISSION_KEYS.opportunitiesApprovalsOverride,
    label: 'Approvals (Override)',
    description: 'Override approvals when policy gates require escalation.',
    capability: 'Approve & Override'
  },
  {
    key: PERMISSION_KEYS.activitiesView,
    label: 'Activities (View)',
    description: 'View calls, meetings, and tasks.',
    capability: 'View & Analyze'
  },
  {
    key: PERMISSION_KEYS.activitiesManage,
    label: 'Activities (Manage)',
    description: 'Schedule, assign, and complete calls, meetings, and tasks.',
    capability: 'Create & Manage Records'
  },
  {
    key: PERMISSION_KEYS.administrationView,
    label: 'Administration (View)',
    description: 'View users, roles, and workspace settings.',
    capability: 'Configure System'
  },
  {
    key: PERMISSION_KEYS.administrationManage,
    label: 'Administration (Manage)',
    description: 'Invite teammates, assign roles, and configure workspace guardrails.',
    capability: 'Configure System'
  },
  {
    key: PERMISSION_KEYS.tenantsView,
    label: 'Tenants (View)',
    description: 'View tenant workspaces and status.',
    capability: 'Configure System'
  },
  {
    key: PERMISSION_KEYS.tenantsManage,
    label: 'Tenants (Manage)',
    description: 'Provision and manage tenant workspaces.',
    capability: 'Configure System'
  }
];

let mockRoles: RoleSummary[] = [
  {
    id: 'role-admin',
    name: 'System Administrator',
    description: 'Full access to every workspace capability.',
    permissions: permissionCatalog.map((p) => p.key),
    inheritedPermissions: [],
    basePermissions: permissionCatalog.map((p) => p.key),
    isSystem: true
  },
  {
    id: 'role-sales',
    name: 'Sales Manager',
    description: 'Manages pipeline, customers, and activities.',
    permissions: [
      PERMISSION_KEYS.dashboardView,
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.customersManage,
      PERMISSION_KEYS.contactsView,
      PERMISSION_KEYS.contactsManage,
      PERMISSION_KEYS.leadsView,
      PERMISSION_KEYS.leadsManage,
      PERMISSION_KEYS.opportunitiesView,
      PERMISSION_KEYS.opportunitiesManage,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    inheritedPermissions: [],
    basePermissions: [
      PERMISSION_KEYS.dashboardView,
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.customersManage,
      PERMISSION_KEYS.contactsView,
      PERMISSION_KEYS.contactsManage,
      PERMISSION_KEYS.leadsView,
      PERMISSION_KEYS.leadsManage,
      PERMISSION_KEYS.opportunitiesView,
      PERMISSION_KEYS.opportunitiesManage,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    isSystem: true
  },
  {
    id: 'role-success',
    name: 'Customer Success',
    description: 'Keeps customers healthy and coordinates follow-ups.',
    permissions: [
      PERMISSION_KEYS.dashboardView,
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    inheritedPermissions: [],
    basePermissions: [
      PERMISSION_KEYS.dashboardView,
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    isSystem: false
  },
  {
    id: 'role-support',
    name: 'Support Agent',
    description: 'Limited read/write for customers and activities.',
    permissions: [
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    inheritedPermissions: [],
    basePermissions: [
      PERMISSION_KEYS.customersView,
      PERMISSION_KEYS.activitiesView,
      PERMISSION_KEYS.activitiesManage
    ],
    isSystem: false
  }
];

const externalAudienceRestrictedPermissions = new Set<string>([
  PERMISSION_KEYS.administrationView,
  PERMISSION_KEYS.administrationManage,
  PERMISSION_KEYS.tenantsView,
  PERMISSION_KEYS.tenantsManage
]);

interface MockUserRecord {
  id: string;
  fullName: string;
  email: string;
  userAudience: 'Internal' | 'External';
  timeZone?: string | null;
  locale?: string | null;
  isActive: boolean;
  createdAtUtc: string;
  lastLoginAtUtc?: string | null;
  roleIds: string[];
}

let mockUsers: MockUserRecord[] = [
  {
    id: 'user-001',
    fullName: 'Yasser Ahmed',
    email: 'yasser.ahmed@crm-enterprise.io',
    userAudience: 'Internal',
    timeZone: 'UTC',
    locale: 'en-US',
    isActive: true,
    createdAtUtc: addDays(today, -180),
    lastLoginAtUtc: addDays(today, -1),
    roleIds: ['role-admin']
  },
  {
    id: 'user-002',
    fullName: 'Leah Singh',
    email: 'leah.singh@crm-enterprise.io',
    userAudience: 'Internal',
    timeZone: 'America/New_York',
    locale: 'en-US',
    isActive: true,
    createdAtUtc: addDays(today, -140),
    lastLoginAtUtc: addDays(today, -4),
    roleIds: ['role-sales']
  },
  {
    id: 'user-003',
    fullName: 'Omar Ali',
    email: 'omar.ali@crm-enterprise.io',
    userAudience: 'Internal',
    timeZone: 'America/Chicago',
    locale: 'en-US',
    isActive: true,
    createdAtUtc: addDays(today, -120),
    lastLoginAtUtc: addDays(today, -2),
    roleIds: ['role-success']
  },
  {
    id: 'user-004',
    fullName: 'Mia Khalid',
    email: 'mia.khalid@crm-enterprise.io',
    userAudience: 'Internal',
    timeZone: 'America/Los_Angeles',
    locale: 'en-US',
    isActive: false,
    createdAtUtc: addDays(today, -90),
    lastLoginAtUtc: addDays(today, -50),
    roleIds: ['role-support']
  },
  {
    id: 'user-005',
    fullName: 'Jonas Berg',
    email: 'jonas.berg@crm-enterprise.io',
    userAudience: 'External',
    timeZone: 'Europe/London',
    locale: 'en-GB',
    isActive: true,
    createdAtUtc: addDays(today, -70),
    lastLoginAtUtc: addDays(today, -3),
    roleIds: ['role-success']
  }
];

const toUserDetail = (record: MockUserRecord): UserDetailResponse => ({
  ...record,
  dashboardPackKey: `role-default:${record.roleIds
    .map((roleId) => mockRoles.find((role) => role.id === roleId)?.hierarchyLevel ?? 1)
    .reduce((max, level) => Math.max(max, level ?? 1), 1)}`,
  dashboardPackName: `H${record.roleIds
    .map((roleId) => mockRoles.find((role) => role.id === roleId)?.hierarchyLevel ?? 1)
    .reduce((max, level) => Math.max(max, level ?? 1), 1)} Pack`,
  dashboardPackType: 'role-default',
  roles: record.roleIds
    .map((roleId) => mockRoles.find((role) => role.id === roleId)?.name)
    .filter((name): name is string => Boolean(name))
});

const toUserListItem = (record: MockUserRecord): UserListItem => {
  const detail = toUserDetail(record);
  const highestRoleLevel = detail.roleIds
    .map((roleId) => mockRoles.find((role) => role.id === roleId)?.hierarchyLevel ?? 1)
    .reduce((max, level) => Math.max(max, level ?? 1), 1);
  return {
    id: detail.id,
    fullName: detail.fullName,
    email: detail.email,
    userAudience: detail.userAudience,
    roles: detail.roles,
    highestRoleLevel,
    isActive: detail.isActive,
    createdAtUtc: detail.createdAtUtc,
    lastLoginAtUtc: detail.lastLoginAtUtc,
    dashboardPackKey: `role-default:${highestRoleLevel}`,
    dashboardPackName: `H${highestRoleLevel} Pack`,
    dashboardPackType: 'role-default'
  };
};

const paginateUsers = <T>(items: T[], page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

export const getPermissionDefinitions = () => clone(permissionCatalog);

export const listRoles = () => mockRoles.map((role) => ({ ...role, permissions: [...role.permissions] }));

export const findRole = (id: string) => {
  const role = mockRoles.find((r) => r.id === id);
  return role ? { ...role, permissions: [...role.permissions] } : null;
};

export const getWorkspaceSettings = () => clone(mockWorkspaceSettings);

export const updateWorkspaceSettings = (payload: UpdateWorkspaceSettingsRequest) => {
  mockWorkspaceSettings = {
    ...mockWorkspaceSettings,
    name: payload.name,
    timeZone: payload.timeZone,
    currency: payload.currency,
    leadFirstTouchSlaHours: payload.leadFirstTouchSlaHours ?? mockWorkspaceSettings.leadFirstTouchSlaHours ?? null,
    defaultContractTermMonths: payload.defaultContractTermMonths ?? mockWorkspaceSettings.defaultContractTermMonths ?? null,
    defaultDeliveryOwnerRoleId: payload.defaultDeliveryOwnerRoleId ?? mockWorkspaceSettings.defaultDeliveryOwnerRoleId ?? null,
    approvalAmountThreshold: payload.approvalAmountThreshold ?? mockWorkspaceSettings.approvalAmountThreshold ?? null,
    approvalApproverRole: payload.approvalApproverRole ?? mockWorkspaceSettings.approvalApproverRole ?? null,
    approvalWorkflowPolicy: payload.approvalWorkflowPolicy
      ? clone(payload.approvalWorkflowPolicy)
      : mockWorkspaceSettings.approvalWorkflowPolicy,
    qualificationPolicy: payload.qualificationPolicy
      ? clone(payload.qualificationPolicy)
      : mockWorkspaceSettings.qualificationPolicy,
    assistantActionScoringPolicy: payload.assistantActionScoringPolicy
      ? clone(payload.assistantActionScoringPolicy)
      : mockWorkspaceSettings.assistantActionScoringPolicy,
    decisionEscalationPolicy: payload.decisionEscalationPolicy
      ? clone(payload.decisionEscalationPolicy)
      : mockWorkspaceSettings.decisionEscalationPolicy,
    supportingDocumentPolicy: payload.supportingDocumentPolicy
      ? clone(payload.supportingDocumentPolicy)
      : mockWorkspaceSettings.supportingDocumentPolicy,
    featureFlags: payload.featureFlags
      ? { ...payload.featureFlags }
      : mockWorkspaceSettings.featureFlags
  };
  return clone(mockWorkspaceSettings);
};

export const createRole = (payload: UpsertRoleRequest): RoleSummary => {
  const role: RoleSummary = {
    id: `role-${Math.random().toString(36).slice(2, 8)}`,
    name: payload.name,
    description: payload.description ?? undefined,
    permissions: [...payload.permissions],
    inheritedPermissions: [],
    basePermissions: [...payload.permissions],
    isSystem: false
  };
  mockRoles = [...mockRoles, role];
  return { ...role };
};

export const updateRole = (id: string, payload: UpsertRoleRequest): RoleSummary | null => {
  const target = mockRoles.find((role) => role.id === id);
  if (!target) {
    return null;
  }
  target.name = payload.name;
  target.description = payload.description ?? undefined;
  target.permissions = [...payload.permissions];
  if (payload.acceptDrift) {
    target.basePermissions = [...payload.permissions];
  }
  return { ...target, permissions: [...target.permissions] };
};

export const deleteRole = (id: string): boolean => {
  const role = mockRoles.find((r) => r.id === id);
  if (!role || role.isSystem) {
    return false;
  }
  mockRoles = mockRoles.filter((r) => r.id !== id);
  mockUsers = mockUsers.map((user) => ({
    ...user,
    roleIds: user.roleIds.filter((roleId) => roleId !== id)
  }));
  return true;
};

export const searchUsers = (query: UserSearchRequest): UserSearchResponse => {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 50;
  const searchTerm = (query.search ?? '').toLowerCase();

  let result = [...mockUsers];

  if (!query.includeInactive) {
    result = result.filter((user) => user.isActive);
  }

  if (searchTerm) {
    result = result.filter((user) =>
      [user.fullName, user.email].some((value) => value.toLowerCase().includes(searchTerm))
    );
  }

  const total = result.length;
  const items = paginateUsers(result, page, pageSize).map(toUserListItem);

  return { items, total };
};

export const lookupActiveUsers = (search?: string, max = 200): UserLookupItem[] => {
  const searchTerm = (search ?? '').trim().toLowerCase();

  return mockUsers
    .filter((user) => user.isActive)
    .filter((user) => {
      if (!searchTerm) {
        return true;
      }

      return [user.fullName, user.email].some((value) => value.toLowerCase().includes(searchTerm));
    })
    .sort((first, second) => first.fullName.localeCompare(second.fullName))
    .slice(0, Math.max(1, max))
    .map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email
    }));
};

export const findUser = (id: string): UserDetailResponse | null => {
  const record = mockUsers.find((user) => user.id === id);
  return record ? toUserDetail(record) : null;
};

export const createUser = (payload: UpsertUserRequest): UserDetailResponse => {
  const record: MockUserRecord = {
    id: `user-${Math.random().toString(36).slice(2, 8)}`,
    fullName: payload.fullName,
    email: payload.email,
    userAudience: payload.userAudience ?? 'Internal',
    timeZone: payload.timeZone ?? 'UTC',
    locale: payload.locale ?? 'en-US',
    isActive: payload.isActive,
    createdAtUtc: new Date().toISOString(),
    lastLoginAtUtc: null,
    roleIds: [...payload.roleIds]
  };
  mockUsers = [record, ...mockUsers];
  return toUserDetail(record);
};

export const updateUser = (id: string, payload: UpsertUserRequest): UserDetailResponse | null => {
  const record = mockUsers.find((user) => user.id === id);
  if (!record) {
    return null;
  }
  record.fullName = payload.fullName;
  record.email = payload.email;
  record.userAudience = payload.userAudience ?? record.userAudience ?? 'Internal';
  record.timeZone = payload.timeZone ?? record.timeZone;
  record.locale = payload.locale ?? record.locale;
  record.isActive = payload.isActive;
  record.roleIds = [...payload.roleIds];
  return toUserDetail(record);
};

export const isUserAudienceRoleAssignmentAllowed = (
  audience: 'Internal' | 'External' | null | undefined,
  roleIds: string[]
): boolean => {
  if ((audience ?? 'Internal') !== 'External') {
    return true;
  }

  const selected = mockRoles.filter((role) => roleIds.includes(role.id));
  const effective = new Set<string>();
  for (const role of selected) {
    for (const permission of role.permissions ?? []) {
      effective.add(permission);
    }
    for (const permission of role.basePermissions ?? []) {
      effective.add(permission);
    }
    for (const permission of role.inheritedPermissions ?? []) {
      effective.add(permission);
    }
  }

  for (const permission of effective) {
    if (externalAudienceRestrictedPermissions.has(permission)) {
      return false;
    }
  }

  return true;
};

export const setUserActiveStatus = (id: string, nextStatus: boolean): boolean => {
  const record = mockUsers.find((user) => user.id === id);
  if (!record) {
    return false;
  }
  record.isActive = nextStatus;
  if (nextStatus) {
    record.lastLoginAtUtc = new Date().toISOString();
  }
  return true;
};

export const deleteUser = (id: string): boolean => {
  const exists = mockUsers.some((user) => user.id === id);
  mockUsers = mockUsers.filter((user) => user.id !== id);
  return exists;
};

export const resetUserPassword = (_id: string): boolean => true;

// ── Contact Mock Data ──

const mockContacts: Contact[] = [
  { id: 'cnt-001', name: 'Sarah Chen', email: 'sarah.chen@apexdynamics.ca', phone: '416-555-0101', jobTitle: 'VP Operations', buyingRole: 'Decision Maker', activityScore: 85, accountId: 'c-001', accountName: 'Apex Dynamics', ownerId: 'u-001', owner: 'Yasser Ahmed', lifecycleStage: 'Customer', createdAt: addDays(today, -90) },
  { id: 'cnt-002', name: 'James Miller', email: 'james.m@stellarsolutions.ca', phone: '905-555-0202', jobTitle: 'CEO', buyingRole: 'Decision Maker', activityScore: 92, accountId: 'c-002', accountName: 'Stellar Solutions', ownerId: 'u-003', owner: 'Leah Singh', lifecycleStage: 'Customer', createdAt: addDays(today, -80) },
  { id: 'cnt-003', name: 'Anita Patel', email: 'anita.p@quantuminnovations.ca', phone: '647-555-0303', jobTitle: 'CFO', buyingRole: 'Influencer', activityScore: 62, accountId: 'c-003', accountName: 'Quantum Innovations', ownerId: 'u-002', owner: 'Mia Khalid', lifecycleStage: 'Prospect', createdAt: addDays(today, -70) },
  { id: 'cnt-004', name: 'Michael Ross', email: 'michael.r@horizonenterprises.ca', phone: '416-555-0404', jobTitle: 'Director', buyingRole: 'Champion', activityScore: 45, accountId: 'c-004', accountName: 'Horizon Enterprises', ownerId: 'u-007', owner: 'Marcus Vega', lifecycleStage: 'Lead', createdAt: addDays(today, -60) },
  { id: 'cnt-005', name: 'Diana Wong', email: 'diana.w@pinnaclegroup.ca', phone: '416-555-0505', jobTitle: 'Managing Partner', buyingRole: 'Decision Maker', activityScore: 78, accountId: 'c-005', accountName: 'Pinnacle Group', ownerId: 'u-005', owner: 'Priya Desai', lifecycleStage: 'Customer', createdAt: addDays(today, -50) },
  { id: 'cnt-006', name: 'Robert Kim', email: 'robert.k@metrologistics.ca', phone: '905-555-0606', jobTitle: 'Procurement Manager', buyingRole: 'Gatekeeper', activityScore: 23, accountId: 'c-006', accountName: 'Metro Logistics', ownerId: 'u-006', owner: 'Owen Miles', lifecycleStage: 'Prospect', createdAt: addDays(today, -40) },
  { id: 'cnt-007', name: 'Emily Zhang', email: 'emily.z@summitcapital.ca', phone: '416-555-0707', jobTitle: 'Investment Analyst', buyingRole: 'End User', activityScore: 54, accountId: 'c-007', accountName: 'Summit Capital', ownerId: 'u-001', owner: 'Yasser Ahmed', lifecycleStage: 'Customer', createdAt: addDays(today, -30) },
  { id: 'cnt-008', name: 'David Okafor', email: 'david.o@gmail.com', phone: '647-555-0808', jobTitle: 'Private Buyer', buyingRole: undefined, activityScore: 15, accountId: undefined, accountName: undefined, ownerId: 'u-004', owner: 'Omar Ali', lifecycleStage: 'Lead', createdAt: addDays(today, -20) }
];

export function searchContacts(query: ContactSearchRequest): ContactSearchResponse {
  const searchTerm = (query.search ?? '').toLowerCase();
  let result = [...mockContacts];
  if (query.accountId) {
    result = result.filter((c) => c.accountId === query.accountId);
  }
  if (searchTerm) {
    result = result.filter((c) =>
      [c.name, c.email, c.accountName].filter(Boolean).some((f) => f!.toLowerCase().includes(searchTerm))
    );
  }
  const total = result.length;
  const items = paginate(result, query.page ?? 1, query.pageSize ?? 200);
  return { items, total };
}

// ── Property Mock Data ──

const mockProperties: Property[] = [
  {
    id: 'prop-001', mlsNumber: 'W6108234', address: '45 Maple Ridge Drive', city: 'Toronto', province: 'ON', postalCode: 'M5V 3K1',
    listPrice: 1295000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Detached',
    bedrooms: 4, bathrooms: 3, squareFeet: 2650, lotSizeSqFt: 5200, yearBuilt: 2018, garageSpaces: 2,
    description: 'Stunning detached home in a quiet cul-de-sac with open-concept living, chef\'s kitchen, and finished basement.',
    features: 'Hardwood floors, quartz countertops, smart home, heated garage, landscaped backyard',
    neighborhood: 'High Park', country: 'Canada',
    listingDateUtc: addDays(today, -42), soldDateUtc: undefined,
    ownerName: 'Yasser Ahmed', ownerId: 'u-001', accountId: 'c-001', accountName: 'Apex Dynamics', primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    photoUrls: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800,https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-tour-001',
    commissionRate: 5, buyerAgentCommission: 2.5, sellerAgentCommission: 2.5, coListingAgentId: 'u-002', coListingAgentName: 'Mia Khalid',
    createdAtUtc: addDays(today, -45), updatedAtUtc: addDays(today, -3)
  },
  {
    id: 'prop-002', mlsNumber: 'C5987612', address: '1200 Bay Street, Unit 2408', city: 'Toronto', province: 'ON', postalCode: 'M5R 2A5',
    listPrice: 725000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Condo',
    bedrooms: 2, bathrooms: 2, squareFeet: 1100, lotSizeSqFt: undefined, yearBuilt: 2021, garageSpaces: 1,
    description: 'Modern 2-bedroom condo in the heart of Yorkville with panoramic city views and premium amenities.',
    features: 'Floor-to-ceiling windows, concierge, gym, rooftop pool, in-suite laundry',
    neighborhood: 'Yorkville', country: 'Canada',
    listingDateUtc: addDays(today, -35), soldDateUtc: undefined,
    ownerName: 'Mia Khalid', ownerId: 'u-002', accountId: 'c-003', accountName: 'Quantum Innovations', primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    photoUrls: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800,https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    virtualTourUrl: undefined,
    commissionRate: 4.5, buyerAgentCommission: 2.5, sellerAgentCommission: 2,
    createdAtUtc: addDays(today, -38), updatedAtUtc: addDays(today, -7)
  },
  {
    id: 'prop-003', mlsNumber: 'E6201455', address: '88 Lakeshore Boulevard East', city: 'Mississauga', province: 'ON', postalCode: 'L5G 1E3',
    listPrice: 899000, salePrice: 875000, currency: 'CAD', status: 'Sold', propertyType: 'Townhouse',
    bedrooms: 3, bathrooms: 3, squareFeet: 1850, lotSizeSqFt: 2800, yearBuilt: 2019, garageSpaces: 1,
    description: 'End-unit freehold townhome with lake views, rooftop terrace, and walkout basement.',
    features: 'Lake views, rooftop terrace, walkout basement, attached garage, stone countertops',
    neighborhood: 'Port Credit', country: 'Canada',
    listingDateUtc: addDays(today, -55), soldDateUtc: addDays(today, -14),
    ownerName: 'Leah Singh', ownerId: 'u-003', accountId: 'c-002', accountName: 'Stellar Solutions', primaryContactId: undefined, primaryContactName: undefined, opportunityId: 'opp-001',
    commissionRate: 5, buyerAgentCommission: 2.5, sellerAgentCommission: 2.5,
    createdAtUtc: addDays(today, -60), updatedAtUtc: addDays(today, -12)
  },
  {
    id: 'prop-004', mlsNumber: 'N6034521', address: '320 King Street West, Suite 506', city: 'Hamilton', province: 'ON', postalCode: 'L8P 1B1',
    listPrice: 489000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Condo',
    bedrooms: 1, bathrooms: 1, squareFeet: 680, lotSizeSqFt: undefined, yearBuilt: 2022, garageSpaces: 1,
    description: 'Stylish 1-bedroom in the James Street North arts district with exposed brick and modern finishes.',
    features: 'Exposed brick, modern finishes, stainless steel appliances, in-suite laundry',
    neighborhood: 'James North', country: 'Canada',
    listingDateUtc: addDays(today, -28), soldDateUtc: undefined,
    ownerName: 'Omar Ali', ownerId: 'u-004', accountId: undefined, accountName: undefined, primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    commissionRate: 4, buyerAgentCommission: 2, sellerAgentCommission: 2,
    createdAtUtc: addDays(today, -30), updatedAtUtc: addDays(today, -5)
  },
  {
    id: 'prop-005', mlsNumber: undefined, address: '15 Vineyard Crescent', city: 'Niagara-on-the-Lake', province: 'ON', postalCode: 'L0S 1J0',
    listPrice: 2150000, salePrice: undefined, currency: 'CAD', status: 'Draft', propertyType: 'Bungalow',
    bedrooms: 3, bathrooms: 2, squareFeet: 2200, lotSizeSqFt: 43560, yearBuilt: 2005, garageSpaces: 2,
    description: 'Premium bungalow on 1-acre lot in wine country with wrap-around porch and detached workshop.',
    features: 'Wrap-around porch, detached workshop, wine cellar, radiant floor heating',
    neighborhood: 'Old Town', country: 'Canada',
    listingDateUtc: undefined, soldDateUtc: undefined,
    ownerName: 'Yasser Ahmed', ownerId: 'u-001', accountId: undefined, accountName: undefined, primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    createdAtUtc: addDays(today, -5), updatedAtUtc: undefined
  },
  {
    id: 'prop-006', mlsNumber: 'W5876443', address: '200 University Avenue, PH1', city: 'Toronto', province: 'ON', postalCode: 'M5H 3C6',
    listPrice: 3450000, salePrice: undefined, currency: 'CAD', status: 'Conditional', propertyType: 'Condo',
    bedrooms: 3, bathrooms: 3, squareFeet: 2800, lotSizeSqFt: undefined, yearBuilt: 2020, garageSpaces: 2,
    description: 'Penthouse suite with 270-degree city views, private elevator access, and designer finishes throughout.',
    features: 'Private elevator, 270-degree views, designer finishes, wine fridge, smart home',
    neighborhood: 'Financial District', country: 'Canada',
    listingDateUtc: addDays(today, -18), soldDateUtc: undefined,
    ownerName: 'Priya Desai', ownerId: 'u-005', accountId: 'c-005', accountName: 'Pinnacle Group', primaryContactId: undefined, primaryContactName: undefined, opportunityId: 'opp-003',
    photoUrls: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800,https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800,https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800,https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-tour-006',
    commissionRate: 4, buyerAgentCommission: 2, sellerAgentCommission: 2, coListingAgentId: 'u-001', coListingAgentName: 'Yasser Ahmed',
    createdAtUtc: addDays(today, -20), updatedAtUtc: addDays(today, -2)
  },
  {
    id: 'prop-007', mlsNumber: 'E5798321', address: '62 Main Street', city: 'Markham', province: 'ON', postalCode: 'L3P 1X5',
    listPrice: 1050000, salePrice: 1020000, currency: 'CAD', status: 'Sold', propertyType: 'SemiDetached',
    bedrooms: 4, bathrooms: 3, squareFeet: 2100, lotSizeSqFt: 3200, yearBuilt: 2016, garageSpaces: 1,
    description: 'Semi-detached family home with finished basement apartment, ideal for multi-generational living.',
    features: 'Finished basement apartment, separate entrance, updated kitchen, fenced yard',
    neighborhood: 'Unionville', country: 'Canada',
    listingDateUtc: addDays(today, -85), soldDateUtc: addDays(today, -28),
    ownerName: 'Marcus Vega', ownerId: 'u-007', accountId: 'c-004', accountName: 'Horizon Enterprises', primaryContactId: undefined, primaryContactName: undefined, opportunityId: 'opp-002',
    commissionRate: 5, buyerAgentCommission: 2.5, sellerAgentCommission: 2.5,
    createdAtUtc: addDays(today, -90), updatedAtUtc: addDays(today, -25)
  },
  {
    id: 'prop-008', mlsNumber: 'C6112087', address: '5500 Yonge Street, Unit 1811', city: 'North York', province: 'ON', postalCode: 'M2N 5S3',
    listPrice: 580000, salePrice: undefined, currency: 'CAD', status: 'Expired', propertyType: 'Condo',
    bedrooms: 2, bathrooms: 1, squareFeet: 850, lotSizeSqFt: undefined, yearBuilt: 2015, garageSpaces: 1,
    description: 'Bright 2-bedroom near North York Centre subway with updated kitchen and in-suite laundry.',
    features: 'Updated kitchen, in-suite laundry, locker, parking, near subway',
    neighborhood: 'North York Centre', country: 'Canada',
    listingDateUtc: addDays(today, -115), soldDateUtc: undefined,
    ownerName: 'Sasha Reed', ownerId: 'u-008', accountId: undefined, accountName: undefined, primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    createdAtUtc: addDays(today, -120), updatedAtUtc: addDays(today, -35)
  },
  {
    id: 'prop-009', mlsNumber: undefined, address: '1400 Industrial Parkway', city: 'Aurora', province: 'ON', postalCode: 'L4G 3V8',
    listPrice: 4200000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Commercial',
    bedrooms: 0, bathrooms: 4, squareFeet: 12500, lotSizeSqFt: 32000, yearBuilt: 2010, garageSpaces: 0,
    description: 'Class A industrial/flex space with 22-foot clear heights, 3 loading docks, and 2000 sq ft of office.',
    features: '22-foot clear heights, 3 loading docks, 2000 sqft office, sprinklered',
    neighborhood: 'Industrial Park', country: 'Canada',
    listingDateUtc: addDays(today, -12), soldDateUtc: undefined,
    ownerName: 'Owen Miles', ownerId: 'u-006', accountId: 'c-006', accountName: 'Metro Logistics', primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    createdAtUtc: addDays(today, -15), updatedAtUtc: addDays(today, -1)
  },
  {
    id: 'prop-010', mlsNumber: 'W6045890', address: '78 Forest Hill Road', city: 'Toronto', province: 'ON', postalCode: 'M4V 2L5',
    listPrice: 5900000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Detached',
    bedrooms: 6, bathrooms: 5, squareFeet: 5500, lotSizeSqFt: 9800, yearBuilt: 2023, garageSpaces: 3,
    description: 'Newly built luxury estate in Forest Hill with indoor pool, home theatre, and smart home automation.',
    features: 'Indoor pool, home theatre, smart home, chef kitchen, wine cellar, elevator',
    neighborhood: 'Forest Hill', country: 'Canada',
    listingDateUtc: addDays(today, -6), soldDateUtc: undefined,
    ownerName: 'Yasser Ahmed', ownerId: 'u-001', accountId: 'c-007', accountName: 'Summit Capital', primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    photoUrls: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800,https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800,https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    virtualTourUrl: 'https://my.matterport.com/show/?m=sample-tour-010',
    commissionRate: 3.5, buyerAgentCommission: 2, sellerAgentCommission: 1.5,
    createdAtUtc: addDays(today, -8), updatedAtUtc: addDays(today, -1)
  },
  {
    id: 'prop-011', mlsNumber: 'N5934210', address: '25 Harbourfront Drive', city: 'Oakville', province: 'ON', postalCode: 'L6J 4Z5',
    listPrice: 1680000, salePrice: undefined, currency: 'CAD', status: 'Terminated', propertyType: 'Detached',
    bedrooms: 5, bathrooms: 4, squareFeet: 3200, lotSizeSqFt: 6400, yearBuilt: 2014, garageSpaces: 2,
    description: 'Waterfront executive home with heated pool, cabana, and private dock access.',
    features: 'Heated pool, cabana, private dock, waterfront, landscaped garden',
    neighborhood: 'Bronte Creek', country: 'Canada',
    listingDateUtc: addDays(today, -70), soldDateUtc: undefined,
    ownerName: 'Mia Khalid', ownerId: 'u-002', accountId: undefined, accountName: undefined, primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    createdAtUtc: addDays(today, -75), updatedAtUtc: addDays(today, -40)
  },
  {
    id: 'prop-012', mlsNumber: undefined, address: 'Lot 14, Concession Road 3', city: 'Caledon', province: 'ON', postalCode: 'L7K 0C3',
    listPrice: 750000, salePrice: undefined, currency: 'CAD', status: 'Active', propertyType: 'Land',
    bedrooms: 0, bathrooms: 0, squareFeet: 0, lotSizeSqFt: 130680, yearBuilt: undefined, garageSpaces: 0,
    description: '3-acre building lot in Caledon with mature trees, rolling terrain, and approved building permit.',
    features: 'Mature trees, rolling terrain, approved building permit, well and septic ready',
    neighborhood: 'Caledon Village', country: 'Canada',
    listingDateUtc: addDays(today, -8), soldDateUtc: undefined,
    ownerName: 'Omar Ali', ownerId: 'u-004', accountId: undefined, accountName: undefined, primaryContactId: undefined, primaryContactName: undefined, opportunityId: undefined,
    createdAtUtc: addDays(today, -10), updatedAtUtc: undefined
  }
];

export function searchProperties(query: PropertySearchRequest): PropertySearchResponse {
  const searchTerm = (query.search ?? '').toLowerCase();
  let result = [...mockProperties];

  if (query.status) {
    result = result.filter((p) => p.status === query.status);
  }
  if (query.propertyType) {
    result = result.filter((p) => p.propertyType === query.propertyType);
  }
  if (query.city) {
    result = result.filter((p) => (p.city ?? '').toLowerCase().includes(query.city!.toLowerCase()));
  }
  if (query.accountId) {
    result = result.filter((p) => p.accountId === query.accountId);
  }
  if (query.contactId) {
    result = result.filter((p) => p.primaryContactId === query.contactId);
  }
  if (searchTerm) {
    result = result.filter((p) =>
      [p.address, p.city, p.mlsNumber, p.neighborhood, p.ownerName, p.accountName]
        .filter(Boolean)
        .some((f) => f!.toLowerCase().includes(searchTerm))
    );
  }

  const total = result.length;
  const items = paginate(result, query.page ?? 1, query.pageSize ?? 10);
  return { items, total };
}

export function getPropertyById(id: string): Property | null {
  const target = mockProperties.find((p) => p.id === id);
  return target ? { ...target } : null;
}

export function createProperty(payload: SavePropertyRequest): Property {
  const ownerUser = mockUsers.find((u) => u.id === payload.ownerId);
  const contact = mockContacts.find((c) => c.id === payload.primaryContactId);
  const record: Property = {
    id: `prop-${Math.random().toString(36).slice(2, 8)}`,
    mlsNumber: payload.mlsNumber,
    address: payload.address,
    city: payload.city,
    province: payload.province,
    postalCode: payload.postalCode,
    listPrice: payload.listPrice,
    salePrice: payload.salePrice,
    currency: payload.currency || 'CAD',
    status: (payload.status as Property['status']) || 'Draft',
    propertyType: (payload.propertyType as Property['propertyType']) || 'Detached',
    bedrooms: payload.bedrooms,
    bathrooms: payload.bathrooms,
    squareFeet: payload.squareFeet,
    lotSizeSqFt: payload.lotSizeSqFt,
    yearBuilt: payload.yearBuilt,
    garageSpaces: payload.garageSpaces,
    description: payload.description,
    features: payload.features,
    neighborhood: payload.neighborhood,
    country: payload.country || 'Canada',
    listingDateUtc: payload.listingDateUtc,
    soldDateUtc: payload.soldDateUtc,
    ownerName: ownerUser?.fullName ?? 'Yasser Ahmed',
    ownerId: payload.ownerId || 'u-001',
    accountId: payload.accountId,
    accountName: payload.accountId ? (mockCustomers.find((c) => c.id === payload.accountId)?.name ?? undefined) : undefined,
    primaryContactId: payload.primaryContactId,
    primaryContactName: contact?.name,
    opportunityId: payload.opportunityId,
    photoUrls: payload.photoUrls,
    virtualTourUrl: payload.virtualTourUrl,
    commissionRate: payload.commissionRate,
    buyerAgentCommission: payload.buyerAgentCommission,
    sellerAgentCommission: payload.sellerAgentCommission,
    coListingAgentId: payload.coListingAgentId,
    coListingAgentName: payload.coListingAgentId ? (mockUsers.find((u) => u.id === payload.coListingAgentId)?.fullName ?? undefined) : undefined,
    createdAtUtc: new Date().toISOString(),
    updatedAtUtc: undefined
  };
  mockProperties.unshift(record);
  return { ...record };
}

export function updateProperty(id: string, payload: SavePropertyRequest): Property | null {
  const target = mockProperties.find((p) => p.id === id);
  if (!target) return null;

  target.mlsNumber = payload.mlsNumber ?? target.mlsNumber;
  target.address = payload.address ?? target.address;
  target.city = payload.city ?? target.city;
  target.province = payload.province ?? target.province;
  target.postalCode = payload.postalCode ?? target.postalCode;
  target.listPrice = payload.listPrice ?? target.listPrice;
  target.salePrice = payload.salePrice ?? target.salePrice;
  target.currency = payload.currency || target.currency;
  target.status = (payload.status as Property['status']) || target.status;
  target.propertyType = (payload.propertyType as Property['propertyType']) || target.propertyType;
  target.bedrooms = payload.bedrooms ?? target.bedrooms;
  target.bathrooms = payload.bathrooms ?? target.bathrooms;
  target.squareFeet = payload.squareFeet ?? target.squareFeet;
  target.lotSizeSqFt = payload.lotSizeSqFt ?? target.lotSizeSqFt;
  target.yearBuilt = payload.yearBuilt ?? target.yearBuilt;
  target.garageSpaces = payload.garageSpaces ?? target.garageSpaces;
  target.description = payload.description ?? target.description;
  target.features = payload.features ?? target.features;
  target.neighborhood = payload.neighborhood ?? target.neighborhood;
  target.country = payload.country ?? target.country;
  target.listingDateUtc = payload.listingDateUtc ?? target.listingDateUtc;
  target.soldDateUtc = payload.soldDateUtc ?? target.soldDateUtc;
  if (payload.ownerId) {
    target.ownerId = payload.ownerId;
    target.ownerName = mockUsers.find((u) => u.id === payload.ownerId)?.fullName ?? target.ownerName;
  }
  if (payload.accountId !== undefined) {
    target.accountId = payload.accountId;
    target.accountName = payload.accountId ? (mockCustomers.find((c) => c.id === payload.accountId)?.name ?? undefined) : undefined;
  }
  if (payload.primaryContactId !== undefined) {
    target.primaryContactId = payload.primaryContactId;
    target.primaryContactName = payload.primaryContactId ? (mockContacts.find((c) => c.id === payload.primaryContactId)?.name ?? undefined) : undefined;
  }
  target.opportunityId = payload.opportunityId ?? target.opportunityId;
  target.photoUrls = payload.photoUrls ?? target.photoUrls;
  target.virtualTourUrl = payload.virtualTourUrl ?? target.virtualTourUrl;
  target.commissionRate = payload.commissionRate ?? target.commissionRate;
  target.buyerAgentCommission = payload.buyerAgentCommission ?? target.buyerAgentCommission;
  target.sellerAgentCommission = payload.sellerAgentCommission ?? target.sellerAgentCommission;
  if (payload.coListingAgentId !== undefined) {
    target.coListingAgentId = payload.coListingAgentId;
    target.coListingAgentName = payload.coListingAgentId ? (mockUsers.find((u) => u.id === payload.coListingAgentId)?.fullName ?? undefined) : undefined;
  }
  target.updatedAtUtc = new Date().toISOString();
  return { ...target };
}

export function deleteProperty(id: string): boolean {
  const countBefore = mockProperties.length;
  const next = mockProperties.filter((p) => p.id !== id);
  mockProperties.length = 0;
  mockProperties.push(...next);
  return next.length !== countBefore;
}

// ────────────────── Price Change History (X4) ──────────────────
const mockPriceChanges: PriceChange[] = [
  { id: 'pc-001', propertyId: 'prop-001', previousPrice: 1350000, newPrice: 1295000, changedAtUtc: addDays(today, -20), changedBy: 'Yasser Ahmed', reason: 'Market adjustment' },
  { id: 'pc-002', propertyId: 'prop-001', previousPrice: 1395000, newPrice: 1350000, changedAtUtc: addDays(today, -30), changedBy: 'Yasser Ahmed', reason: 'Comparable sales analysis' },
  { id: 'pc-003', propertyId: 'prop-002', previousPrice: 749000, newPrice: 725000, changedAtUtc: addDays(today, -15), changedBy: 'Mia Khalid', reason: 'Price reduction strategy' },
  { id: 'pc-004', propertyId: 'prop-003', previousPrice: 925000, newPrice: 899000, changedAtUtc: addDays(today, -40), changedBy: 'Leah Singh', reason: 'Buyer negotiation' },
  { id: 'pc-005', propertyId: 'prop-003', previousPrice: 899000, newPrice: 875000, changedAtUtc: addDays(today, -16), changedBy: 'Leah Singh', reason: 'Final sale price' },
  { id: 'pc-006', propertyId: 'prop-006', previousPrice: 3200000, newPrice: 3450000, changedAtUtc: addDays(today, -10), changedBy: 'Priya Desai', reason: 'Appraisal increase' },
  { id: 'pc-007', propertyId: 'prop-007', previousPrice: 1080000, newPrice: 1050000, changedAtUtc: addDays(today, -60), changedBy: 'Marcus Vega', reason: 'Market correction' },
  { id: 'pc-008', propertyId: 'prop-007', previousPrice: 1050000, newPrice: 1020000, changedAtUtc: addDays(today, -30), changedBy: 'Marcus Vega', reason: 'Sale negotiation' },
  { id: 'pc-009', propertyId: 'prop-010', previousPrice: 5500000, newPrice: 5900000, changedAtUtc: addDays(today, -4), changedBy: 'Yasser Ahmed', reason: 'Premium listing upgrade' },
  { id: 'pc-010', propertyId: 'prop-008', previousPrice: 615000, newPrice: 580000, changedAtUtc: addDays(today, -80), changedBy: 'Sasha Reed', reason: 'Time on market reduction' },
  { id: 'pc-011', propertyId: 'prop-011', previousPrice: 1750000, newPrice: 1680000, changedAtUtc: addDays(today, -50), changedBy: 'Mia Khalid', reason: 'Seasonal adjustment' },
];

export function getPriceHistory(propertyId: string): PriceChange[] {
  return mockPriceChanges
    .filter((pc) => pc.propertyId === propertyId)
    .sort((a, b) => new Date(b.changedAtUtc).getTime() - new Date(a.changedAtUtc).getTime());
}

export function addPriceChange(pc: Omit<PriceChange, 'id'>): PriceChange {
  const record: PriceChange = { id: `pc-${Math.random().toString(36).slice(2, 8)}`, ...pc };
  mockPriceChanges.unshift(record);
  return { ...record };
}

// ────────────────── Showings / Viewings (X3) ──────────────────
const mockShowings: Showing[] = [
  { id: 'sh-001', propertyId: 'prop-001', agentId: 'u-001', agentName: 'Yasser Ahmed', visitorName: 'David Chen', visitorEmail: 'david.chen@email.com', visitorPhone: '416-555-0101', scheduledAtUtc: addDays(today, -5), durationMinutes: 30, feedback: 'Loved the kitchen and backyard. Considering an offer.', rating: 5, status: 'Completed', createdAtUtc: addDays(today, -7) },
  { id: 'sh-002', propertyId: 'prop-001', agentId: 'u-002', agentName: 'Mia Khalid', visitorName: 'Sarah Park', visitorEmail: 'sarah.park@email.com', scheduledAtUtc: addDays(today, -2), durationMinutes: 45, feedback: 'Good layout but concerned about traffic noise.', rating: 3, status: 'Completed', createdAtUtc: addDays(today, -4) },
  { id: 'sh-003', propertyId: 'prop-001', agentId: 'u-001', agentName: 'Yasser Ahmed', visitorName: 'James Wilson', visitorEmail: 'james.w@email.com', visitorPhone: '905-555-0202', scheduledAtUtc: addDays(today, 2), durationMinutes: 30, status: 'Scheduled', createdAtUtc: addDays(today, -1) },
  { id: 'sh-004', propertyId: 'prop-002', agentId: 'u-002', agentName: 'Mia Khalid', visitorName: 'Michael Torres', visitorEmail: 'mtorres@email.com', scheduledAtUtc: addDays(today, -8), durationMinutes: 30, feedback: 'Great views, but too small for family.', rating: 3, status: 'Completed', createdAtUtc: addDays(today, -10) },
  { id: 'sh-005', propertyId: 'prop-002', agentId: 'u-002', agentName: 'Mia Khalid', visitorName: 'Lisa Huang', scheduledAtUtc: addDays(today, -3), durationMinutes: 30, status: 'NoShow', createdAtUtc: addDays(today, -5) },
  { id: 'sh-006', propertyId: 'prop-006', agentId: 'u-005', agentName: 'Priya Desai', visitorName: 'Robert Kingston', visitorEmail: 'rkingston@email.com', visitorPhone: '416-555-0505', scheduledAtUtc: addDays(today, -1), durationMinutes: 60, feedback: 'Stunning penthouse. Ready to submit offer.', rating: 5, status: 'Completed', createdAtUtc: addDays(today, -3) },
  { id: 'sh-007', propertyId: 'prop-006', agentId: 'u-005', agentName: 'Priya Desai', visitorName: 'Amanda Frost', scheduledAtUtc: addDays(today, 3), durationMinutes: 45, status: 'Scheduled', createdAtUtc: addDays(today, 0) },
  { id: 'sh-008', propertyId: 'prop-010', agentId: 'u-001', agentName: 'Yasser Ahmed', visitorName: 'Chris Bennett', visitorEmail: 'cbennett@email.com', scheduledAtUtc: addDays(today, -1), durationMinutes: 90, feedback: 'Exceptional estate. Interior exceeds listing photos.', rating: 5, status: 'Completed', createdAtUtc: addDays(today, -2) },
  { id: 'sh-009', propertyId: 'prop-004', agentId: 'u-004', agentName: 'Omar Ali', visitorName: 'Natalie Cooper', scheduledAtUtc: addDays(today, -12), durationMinutes: 30, status: 'Cancelled', createdAtUtc: addDays(today, -15) },
  { id: 'sh-010', propertyId: 'prop-009', agentId: 'u-006', agentName: 'Owen Miles', visitorName: 'Global Logistics Inc.', visitorEmail: 'realestate@globallogistics.com', scheduledAtUtc: addDays(today, 1), durationMinutes: 60, status: 'Scheduled', createdAtUtc: addDays(today, -1) },
];

export function getShowings(propertyId: string): Showing[] {
  return mockShowings
    .filter((s) => s.propertyId === propertyId)
    .sort((a, b) => new Date(b.scheduledAtUtc).getTime() - new Date(a.scheduledAtUtc).getTime());
}

export function createShowing(s: Omit<Showing, 'id' | 'createdAtUtc'>): Showing {
  const record: Showing = { id: `sh-${Math.random().toString(36).slice(2, 8)}`, ...s, createdAtUtc: new Date().toISOString() };
  mockShowings.unshift(record);
  return { ...record };
}

export function updateShowing(id: string, updates: Partial<Showing>): Showing | null {
  const target = mockShowings.find((s) => s.id === id);
  if (!target) return null;
  Object.assign(target, updates);
  return { ...target };
}

// ────────────────── Documents / Attachments (X1) ──────────────────
const mockDocuments: PropertyDocument[] = [
  { id: 'doc-001', propertyId: 'prop-001', fileName: 'listing-agreement.pdf', fileUrl: '/assets/mock/listing-agreement.pdf', fileSize: 245000, mimeType: 'application/pdf', category: 'Contract', uploadedBy: 'Yasser Ahmed', uploadedAtUtc: addDays(today, -44) },
  { id: 'doc-002', propertyId: 'prop-001', fileName: 'home-inspection-report.pdf', fileUrl: '/assets/mock/inspection.pdf', fileSize: 1200000, mimeType: 'application/pdf', category: 'Inspection', uploadedBy: 'Yasser Ahmed', uploadedAtUtc: addDays(today, -35) },
  { id: 'doc-003', propertyId: 'prop-001', fileName: 'floor-plan-main.jpg', fileUrl: '/assets/mock/floor-plan.jpg', fileSize: 850000, mimeType: 'image/jpeg', category: 'FloorPlan', uploadedBy: 'Yasser Ahmed', uploadedAtUtc: addDays(today, -42) },
  { id: 'doc-004', propertyId: 'prop-003', fileName: 'property-disclosure.pdf', fileUrl: '/assets/mock/disclosure.pdf', fileSize: 180000, mimeType: 'application/pdf', category: 'Disclosure', uploadedBy: 'Leah Singh', uploadedAtUtc: addDays(today, -50) },
  { id: 'doc-005', propertyId: 'prop-003', fileName: 'appraisal-report.pdf', fileUrl: '/assets/mock/appraisal.pdf', fileSize: 320000, mimeType: 'application/pdf', category: 'Appraisal', uploadedBy: 'Leah Singh', uploadedAtUtc: addDays(today, -18) },
  { id: 'doc-006', propertyId: 'prop-006', fileName: 'condo-status-certificate.pdf', fileUrl: '/assets/mock/status-cert.pdf', fileSize: 540000, mimeType: 'application/pdf', category: 'Disclosure', uploadedBy: 'Priya Desai', uploadedAtUtc: addDays(today, -16) },
  { id: 'doc-007', propertyId: 'prop-006', fileName: 'penthouse-floorplan.pdf', fileUrl: '/assets/mock/ph-floorplan.pdf', fileSize: 920000, mimeType: 'application/pdf', category: 'FloorPlan', uploadedBy: 'Priya Desai', uploadedAtUtc: addDays(today, -17) },
  { id: 'doc-008', propertyId: 'prop-010', fileName: 'building-permit.pdf', fileUrl: '/assets/mock/permit.pdf', fileSize: 410000, mimeType: 'application/pdf', category: 'Contract', uploadedBy: 'Yasser Ahmed', uploadedAtUtc: addDays(today, -6) },
];

export function getDocuments(propertyId: string): PropertyDocument[] {
  return mockDocuments
    .filter((d) => d.propertyId === propertyId)
    .sort((a, b) => new Date(b.uploadedAtUtc).getTime() - new Date(a.uploadedAtUtc).getTime());
}

export function addDocument(doc: Omit<PropertyDocument, 'id'>): PropertyDocument {
  const record: PropertyDocument = { id: `doc-${Math.random().toString(36).slice(2, 8)}`, ...doc };
  mockDocuments.unshift(record);
  return { ...record };
}

export function deleteDocument(id: string): boolean {
  const countBefore = mockDocuments.length;
  const next = mockDocuments.filter((d) => d.id !== id);
  mockDocuments.length = 0;
  mockDocuments.push(...next);
  return next.length !== countBefore;
}

// ────────────────── Activities / Tasks (X2) ──────────────────
const mockPropertyActivities: PropertyActivity[] = [
  { id: 'act-001', propertyId: 'prop-001', type: 'Task', subject: 'Schedule home inspection', description: 'Arrange certified inspector for pre-listing inspection.', dueDate: addDays(today, 3), status: 'Open', priority: 'High', assignedToId: 'u-001', assignedToName: 'Yasser Ahmed', createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -5) },
  { id: 'act-002', propertyId: 'prop-001', type: 'Call', subject: 'Follow up with David Chen', description: 'Called about potential offer after showing.', dueDate: addDays(today, -1), completedDate: addDays(today, -1), status: 'Completed', priority: 'High', assignedToId: 'u-001', assignedToName: 'Yasser Ahmed', createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -3) },
  { id: 'act-003', propertyId: 'prop-001', type: 'FollowUp', subject: 'Send comparable sales report', description: 'Prepare and email CMA report to seller.', dueDate: addDays(today, 5), status: 'Open', priority: 'Medium', assignedToId: 'u-001', assignedToName: 'Yasser Ahmed', createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -2) },
  { id: 'act-004', propertyId: 'prop-001', type: 'Note', subject: 'Seller prefers evening showings only', status: 'Completed', priority: 'Low', createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -10) },
  { id: 'act-005', propertyId: 'prop-002', type: 'Meeting', subject: 'Price reduction discussion with seller', description: 'Meet at the property to discuss lowering the list price by 5%.', dueDate: addDays(today, 2), status: 'Open', priority: 'High', assignedToId: 'u-002', assignedToName: 'Mia Khalid', createdByName: 'Mia Khalid', createdAtUtc: addDays(today, -1) },
  { id: 'act-006', propertyId: 'prop-002', type: 'Email', subject: 'Send updated listing photos', description: 'Email high-res photos to MLS listing service.', dueDate: addDays(today, -3), completedDate: addDays(today, -3), status: 'Completed', priority: 'Medium', assignedToId: 'u-002', assignedToName: 'Mia Khalid', createdByName: 'Mia Khalid', createdAtUtc: addDays(today, -5) },
  { id: 'act-007', propertyId: 'prop-006', type: 'Task', subject: 'Prepare offer presentation package', description: 'Compile all offers received for seller review.', dueDate: addDays(today, 1), status: 'InProgress', priority: 'Urgent', assignedToId: 'u-005', assignedToName: 'Priya Desai', createdByName: 'Priya Desai', createdAtUtc: addDays(today, -2) },
  { id: 'act-008', propertyId: 'prop-006', type: 'Call', subject: 'Confirm showing with Amanda Frost', dueDate: addDays(today, 2), status: 'Open', priority: 'Medium', assignedToId: 'u-005', assignedToName: 'Priya Desai', createdByName: 'Priya Desai', createdAtUtc: addDays(today, 0) },
  { id: 'act-009', propertyId: 'prop-010', type: 'Meeting', subject: 'Open house coordination', description: 'Plan and schedule weekend open house event.', dueDate: addDays(today, 7), status: 'Open', priority: 'Medium', assignedToId: 'u-001', assignedToName: 'Yasser Ahmed', createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -1) },
  { id: 'act-010', propertyId: 'prop-003', type: 'Task', subject: 'Finalize closing paperwork', completedDate: addDays(today, -10), status: 'Completed', priority: 'High', assignedToId: 'u-003', assignedToName: 'Leah Singh', createdByName: 'Leah Singh', createdAtUtc: addDays(today, -20) },
];

export function getActivities(propertyId: string): PropertyActivity[] {
  return mockPropertyActivities
    .filter((a) => a.propertyId === propertyId)
    .sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime());
}

export function createActivity(a: Omit<PropertyActivity, 'id' | 'createdAtUtc'>): PropertyActivity {
  const record: PropertyActivity = { id: `act-${Math.random().toString(36).slice(2, 8)}`, ...a, createdAtUtc: new Date().toISOString() };
  mockPropertyActivities.unshift(record);
  return { ...record };
}

export function updateActivity(id: string, updates: Partial<PropertyActivity>): PropertyActivity | null {
  const target = mockPropertyActivities.find((a) => a.id === id);
  if (!target) return null;
  Object.assign(target, updates);
  return { ...target };
}

// ────────────────── MLS/IDX Feed Integration (G1) ──────────────────

const mockMlsFeeds: MlsFeedConfig[] = [
  { id: 'mls-001', feedName: 'CREA DDF National Feed', feedUrl: 'https://data.crea.ca/ddf/v2', provider: 'CREA', autoSync: true, syncIntervalMinutes: 60, lastSyncAtUtc: addDays(today, -0.1), status: 'Active', totalImported: 1842, createdAtUtc: addDays(today, -90) },
  { id: 'mls-002', feedName: 'Toronto RETS Feed', feedUrl: 'https://rets.torontomls.ca/rets', provider: 'RETS', autoSync: true, syncIntervalMinutes: 120, lastSyncAtUtc: addDays(today, -0.5), status: 'Active', totalImported: 3274, createdAtUtc: addDays(today, -60) },
  { id: 'mls-003', feedName: 'Vancouver IDX Feed', feedUrl: 'https://idx.rebgv.org/listings', provider: 'IDX', autoSync: false, syncIntervalMinutes: 360, lastSyncAtUtc: addDays(today, -5), status: 'Paused', totalImported: 726, createdAtUtc: addDays(today, -30) },
];

const mockMlsImportJobs: MlsImportJob[] = [
  { id: 'imp-001', feedId: 'mls-001', feedName: 'CREA DDF National Feed', startedAtUtc: addDays(today, -0.1), completedAtUtc: addDays(today, -0.08), status: 'Completed', totalRecords: 245, imported: 12, updated: 228, skipped: 3, errors: 2 },
  { id: 'imp-002', feedId: 'mls-002', feedName: 'Toronto RETS Feed', startedAtUtc: addDays(today, -0.5), completedAtUtc: addDays(today, -0.48), status: 'Completed', totalRecords: 189, imported: 8, updated: 175, skipped: 6, errors: 0 },
  { id: 'imp-003', feedId: 'mls-001', feedName: 'CREA DDF National Feed', startedAtUtc: addDays(today, -1), completedAtUtc: addDays(today, -0.98), status: 'Completed', totalRecords: 230, imported: 5, updated: 220, skipped: 5, errors: 0 },
  { id: 'imp-004', feedId: 'mls-003', feedName: 'Vancouver IDX Feed', startedAtUtc: addDays(today, -5), completedAtUtc: addDays(today, -4.97), status: 'Failed', totalRecords: 0, imported: 0, updated: 0, skipped: 0, errors: 1 },
];

export function getMlsFeeds(): MlsFeedConfig[] {
  return [...mockMlsFeeds];
}

export function createMlsFeed(feed: Partial<MlsFeedConfig>): MlsFeedConfig {
  const record: MlsFeedConfig = {
    id: `mls-${Math.random().toString(36).slice(2, 8)}`,
    feedName: feed.feedName || 'New Feed',
    feedUrl: feed.feedUrl || '',
    provider: feed.provider || 'Custom',
    autoSync: feed.autoSync ?? false,
    syncIntervalMinutes: feed.syncIntervalMinutes ?? 120,
    status: 'Active',
    totalImported: 0,
    createdAtUtc: new Date().toISOString()
  };
  mockMlsFeeds.unshift(record);
  return { ...record };
}

export function triggerMlsImport(feedId: string): MlsImportJob {
  const feed = mockMlsFeeds.find(f => f.id === feedId);
  const job: MlsImportJob = {
    id: `imp-${Math.random().toString(36).slice(2, 8)}`,
    feedId,
    feedName: feed?.feedName || 'Unknown Feed',
    startedAtUtc: new Date().toISOString(),
    completedAtUtc: new Date().toISOString(),
    status: 'Completed',
    totalRecords: Math.floor(Math.random() * 200) + 50,
    imported: Math.floor(Math.random() * 15) + 1,
    updated: Math.floor(Math.random() * 150) + 30,
    skipped: Math.floor(Math.random() * 10),
    errors: Math.floor(Math.random() * 3)
  };
  mockMlsImportJobs.unshift(job);
  if (feed) {
    feed.lastSyncAtUtc = job.completedAtUtc;
    feed.totalImported += job.imported;
  }
  return { ...job };
}

export function getMlsImportHistory(): MlsImportJob[] {
  return [...mockMlsImportJobs].sort((a, b) => new Date(b.startedAtUtc).getTime() - new Date(a.startedAtUtc).getTime());
}

// ────────────────── Comparable Market Analysis (G3) ──────────────────

const mockComparables: Record<string, ComparableProperty[]> = {
  'prop-001': [
    { id: 'comp-001', address: '42 Maple Grove Dr', city: 'Toronto', neighborhood: 'Willowdale', propertyType: 'Detached', listPrice: 1350000, salePrice: 1310000, squareFeet: 2100, bedrooms: 4, bathrooms: 3, yearBuilt: 2005, status: 'Sold', soldDateUtc: addDays(today, -20), daysOnMarket: 18, pricePerSqFt: 624, distanceMiles: 0.4, source: 'MLS' },
    { id: 'comp-002', address: '88 Birchwood Lane', city: 'Toronto', neighborhood: 'North York', propertyType: 'Detached', listPrice: 1420000, squareFeet: 2300, bedrooms: 4, bathrooms: 3, yearBuilt: 2008, status: 'Active', daysOnMarket: 12, pricePerSqFt: 617, distanceMiles: 0.8, source: 'MLS' },
    { id: 'comp-003', address: '15 Sunset Blvd', city: 'Toronto', neighborhood: 'Willowdale', propertyType: 'Detached', listPrice: 1280000, salePrice: 1295000, squareFeet: 1950, bedrooms: 3, bathrooms: 2, yearBuilt: 1998, status: 'Sold', soldDateUtc: addDays(today, -35), daysOnMarket: 25, pricePerSqFt: 664, distanceMiles: 0.3, source: 'MLS' },
    { id: 'comp-004', address: '201 Pinecrest Ave', city: 'Toronto', neighborhood: 'North York', propertyType: 'SemiDetached', listPrice: 1100000, salePrice: 1075000, squareFeet: 1800, bedrooms: 3, bathrooms: 2, yearBuilt: 2001, status: 'Sold', soldDateUtc: addDays(today, -42), daysOnMarket: 30, pricePerSqFt: 597, distanceMiles: 1.2, source: 'MLS' },
    { id: 'comp-005', address: '567 Oakridge Terr', city: 'Toronto', neighborhood: 'Willowdale', propertyType: 'Detached', listPrice: 1550000, squareFeet: 2600, bedrooms: 5, bathrooms: 4, yearBuilt: 2012, status: 'Pending', daysOnMarket: 8, pricePerSqFt: 596, distanceMiles: 0.6, source: 'Internal' },
  ],
};

function generateCmaComparables(propertyId: string): ComparableProperty[] {
  return mockComparables[propertyId] || mockComparables['prop-001']!;
}

function buildCmaSummary(comps: ComparableProperty[]): CmaReport['summary'] {
  const prices = comps.map(c => c.salePrice || c.listPrice);
  const sorted = [...prices].sort((a, b) => a - b);
  const avg = (arr: number[]) => arr.reduce((s, v) => s + v, 0) / arr.length;
  const soldComps = comps.filter(c => c.salePrice);
  return {
    avgListPrice: Math.round(avg(comps.map(c => c.listPrice))),
    avgSalePrice: Math.round(avg(soldComps.length ? soldComps.map(c => c.salePrice!) : prices)),
    avgPricePerSqFt: Math.round(avg(comps.filter(c => c.pricePerSqFt).map(c => c.pricePerSqFt!))),
    avgDaysOnMarket: Math.round(avg(comps.map(c => c.daysOnMarket))),
    medianPrice: sorted[Math.floor(sorted.length / 2)],
    priceRangeLow: sorted[0],
    priceRangeHigh: sorted[sorted.length - 1],
    suggestedPrice: Math.round(avg(prices) * 1.02),
    marketTrend: 'Rising'
  };
}

export function getCmaReport(propertyId: string): CmaReport {
  const comps = generateCmaComparables(propertyId);
  return {
    propertyId,
    generatedAtUtc: new Date().toISOString(),
    comparables: comps,
    summary: buildCmaSummary(comps)
  };
}

// ────────────────── E-Signature Integration (G4) ──────────────────

const mockSignatureRequests: SignatureRequest[] = [
  {
    id: 'sig-001', propertyId: 'prop-001', documentName: 'Listing Agreement - 123 Main St',
    documentType: 'ListingAgreement', provider: 'DocuSign', status: 'Signed',
    signers: [
      { name: 'Yasser Ahmed', email: 'yasser@northedge.ca', role: 'Agent', status: 'Signed', signedAtUtc: addDays(today, -30) },
      { name: 'John Morrison', email: 'john.m@email.com', role: 'Seller', status: 'Signed', signedAtUtc: addDays(today, -29) }
    ],
    sentAtUtc: addDays(today, -31), completedAtUtc: addDays(today, -29),
    createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -32)
  },
  {
    id: 'sig-002', propertyId: 'prop-001', documentName: 'Purchase Agreement - Offer #1',
    documentType: 'PurchaseAgreement', provider: 'DocuSign', status: 'Sent',
    signers: [
      { name: 'David Chen', email: 'david.chen@email.com', role: 'Buyer', status: 'Viewed' },
      { name: 'John Morrison', email: 'john.m@email.com', role: 'Seller', status: 'Pending' },
      { name: 'Yasser Ahmed', email: 'yasser@northedge.ca', role: 'Agent', status: 'Signed', signedAtUtc: addDays(today, -2) }
    ],
    sentAtUtc: addDays(today, -3), expiresAtUtc: addDays(today, 11),
    createdByName: 'Yasser Ahmed', createdAtUtc: addDays(today, -3)
  },
  {
    id: 'sig-003', propertyId: 'prop-002', documentName: 'Seller Disclosure - 456 Oak Ave',
    documentType: 'Disclosure', provider: 'HelloSign', status: 'Draft',
    signers: [
      { name: 'Mia Khalid', email: 'mia@northedge.ca', role: 'Agent', status: 'Pending' },
      { name: 'Sarah Lin', email: 'sarah.lin@email.com', role: 'Seller', status: 'Pending' }
    ],
    createdByName: 'Mia Khalid', createdAtUtc: addDays(today, -1)
  },
  {
    id: 'sig-004', propertyId: 'prop-006', documentName: 'Amendment - Price Adjustment',
    documentType: 'Amendment', provider: 'AdobeSign', status: 'Expired',
    signers: [
      { name: 'Robert Kingston', email: 'rkingston@email.com', role: 'Buyer', status: 'Declined' },
      { name: 'Priya Desai', email: 'priya@northedge.ca', role: 'Agent', status: 'Signed', signedAtUtc: addDays(today, -20) }
    ],
    sentAtUtc: addDays(today, -25), expiresAtUtc: addDays(today, -5),
    createdByName: 'Priya Desai', createdAtUtc: addDays(today, -26)
  },
];

export function getSignatureRequests(propertyId: string): SignatureRequest[] {
  return mockSignatureRequests
    .filter(s => s.propertyId === propertyId)
    .sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime());
}

export function createSignatureRequest(req: Partial<SignatureRequest> & { propertyId: string }): SignatureRequest {
  const record: SignatureRequest = {
    id: `sig-${Math.random().toString(36).slice(2, 8)}`,
    propertyId: req.propertyId,
    documentName: req.documentName || 'Untitled Document',
    documentType: req.documentType || 'Other',
    provider: req.provider || 'DocuSign',
    status: 'Draft',
    signers: req.signers || [],
    createdByName: req.createdByName || 'Current User',
    createdAtUtc: new Date().toISOString()
  };
  mockSignatureRequests.unshift(record);
  return { ...record };
}

// ────────────────── Automated Property Alerts (G5) ──────────────────

const mockAlertRules: PropertyAlertRule[] = [
  {
    id: 'alert-001', propertyId: 'prop-001', clientName: 'David Chen', clientEmail: 'david.chen@email.com',
    criteria: { minPrice: 1100000, maxPrice: 1500000, propertyTypes: ['Detached', 'SemiDetached'], minBedrooms: 3, cities: ['Toronto'] },
    frequency: 'Daily', isActive: true, matchCount: 14, lastNotifiedAtUtc: addDays(today, -1), createdAtUtc: addDays(today, -20)
  },
  {
    id: 'alert-002', propertyId: 'prop-001', clientName: 'Sarah Park', clientEmail: 'sarah.park@email.com',
    criteria: { minPrice: 900000, maxPrice: 1300000, propertyTypes: ['Detached', 'Townhouse'], minBedrooms: 3, neighborhoods: ['Willowdale', 'North York'] },
    frequency: 'Weekly', isActive: true, matchCount: 8, lastNotifiedAtUtc: addDays(today, -6), createdAtUtc: addDays(today, -15)
  },
  {
    id: 'alert-003', propertyId: 'prop-002', clientName: 'Michael Torres', clientEmail: 'mtorres@email.com',
    criteria: { minPrice: 500000, maxPrice: 800000, propertyTypes: ['Condo'], cities: ['Toronto', 'Mississauga'] },
    frequency: 'Instant', isActive: false, matchCount: 22, lastNotifiedAtUtc: addDays(today, -10), createdAtUtc: addDays(today, -30)
  },
  {
    id: 'alert-004', propertyId: 'prop-006', clientName: 'Robert Kingston', clientEmail: 'rkingston@email.com',
    criteria: { minPrice: 2000000, maxPrice: 5000000, propertyTypes: ['Condo'], minBedrooms: 2, neighborhoods: ['Yorkville', 'King West'] },
    frequency: 'Instant', isActive: true, matchCount: 3, lastNotifiedAtUtc: addDays(today, -2), createdAtUtc: addDays(today, -12)
  },
];

const mockAlertNotifications: PropertyAlertNotification[] = [
  { id: 'notif-001', ruleId: 'alert-001', clientName: 'David Chen', clientEmail: 'david.chen@email.com', matchedProperties: 3, sentAtUtc: addDays(today, -1), status: 'Opened' },
  { id: 'notif-002', ruleId: 'alert-001', clientName: 'David Chen', clientEmail: 'david.chen@email.com', matchedProperties: 5, sentAtUtc: addDays(today, -2), status: 'Clicked' },
  { id: 'notif-003', ruleId: 'alert-002', clientName: 'Sarah Park', clientEmail: 'sarah.park@email.com', matchedProperties: 4, sentAtUtc: addDays(today, -6), status: 'Sent' },
  { id: 'notif-004', ruleId: 'alert-003', clientName: 'Michael Torres', clientEmail: 'mtorres@email.com', matchedProperties: 7, sentAtUtc: addDays(today, -10), status: 'Opened' },
  { id: 'notif-005', ruleId: 'alert-004', clientName: 'Robert Kingston', clientEmail: 'rkingston@email.com', matchedProperties: 1, sentAtUtc: addDays(today, -2), status: 'Clicked' },
  { id: 'notif-006', ruleId: 'alert-001', clientName: 'David Chen', clientEmail: 'david.chen@email.com', matchedProperties: 6, sentAtUtc: addDays(today, -3), status: 'Bounced' },
];

export function getAlertRules(propertyId: string): PropertyAlertRule[] {
  return mockAlertRules
    .filter(r => r.propertyId === propertyId)
    .sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime());
}

export function createAlertRule(rule: Partial<PropertyAlertRule> & { propertyId: string }): PropertyAlertRule {
  const record: PropertyAlertRule = {
    id: `alert-${Math.random().toString(36).slice(2, 8)}`,
    propertyId: rule.propertyId,
    clientName: rule.clientName || '',
    clientEmail: rule.clientEmail || '',
    criteria: rule.criteria || {},
    frequency: rule.frequency || 'Daily',
    isActive: true,
    matchCount: 0,
    createdAtUtc: new Date().toISOString()
  };
  mockAlertRules.unshift(record);
  return { ...record };
}

export function toggleAlertRule(id: string, isActive: boolean): PropertyAlertRule | null {
  const target = mockAlertRules.find(r => r.id === id);
  if (!target) return null;
  target.isActive = isActive;
  return { ...target };
}

export function getAlertNotifications(propertyId: string): PropertyAlertNotification[] {
  const ruleIds = new Set(mockAlertRules.filter(r => r.propertyId === propertyId).map(r => r.id));
  return mockAlertNotifications
    .filter(n => ruleIds.has(n.ruleId))
    .sort((a, b) => new Date(b.sentAtUtc).getTime() - new Date(a.sentAtUtc).getTime());
}
