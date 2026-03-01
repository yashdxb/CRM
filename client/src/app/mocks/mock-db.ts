import { Activity } from '../crm/features/activities/models/activity.model';
import { ActivitySearchRequest, ActivitySearchResponse } from '../crm/features/activities/services/activity-data.service';
import { Customer, CustomerSearchRequest, CustomerSearchResponse } from '../crm/features/customers/models/customer.model';
import { DashboardSummary } from '../crm/features/dashboard/models/dashboard.model';
import { PERMISSION_KEYS } from '../core/auth/permission.constants';
import { Opportunity, OpportunitySearchRequest, OpportunitySearchResponse } from '../crm/features/opportunities/models/opportunity.model';
import { SaveOpportunityRequest } from '../crm/features/opportunities/services/opportunity-data.service';
import { UpdateWorkspaceSettingsRequest, WorkspaceSettings } from '../crm/features/settings/models/workspace-settings.model';
import {
  PermissionDefinition,
  RoleSummary,
  UpsertRoleRequest,
  UpsertUserRequest,
  UserDetailResponse,
  UserListItem,
  UserSearchRequest,
  UserSearchResponse
} from '../crm/features/settings/models/user-admin.model';

// Sample suppliers for mock API
export let mockSuppliers = [
  {
    id: 's-001',
    name: 'Acme Manufacturing',
    category: 'Industrial',
    status: 'Active',
    country: 'USA',
    website: 'https://acme.com',
    contactName: 'John Doe',
    contactEmail: 'john.doe@acme.com',
    contactPhone: '555-1001',
    notes: 'Preferred supplier for widgets.'
  },
  {
    id: 's-002',
    name: 'Global Supplies Ltd.',
    category: 'Wholesale',
    status: 'Pending Approval',
    country: 'UK',
    website: 'https://globalsupplies.co.uk',
    contactName: 'Jane Smith',
    contactEmail: 'jane.smith@globalsupplies.co.uk',
    contactPhone: '555-2002',
    notes: 'Awaiting compliance review.'
  },
  {
    id: 's-003',
    name: 'Pacific Traders',
    category: 'Retail',
    status: 'Approved',
    country: 'Canada',
    website: 'https://pacifictraders.ca',
    contactName: 'Carlos Ruiz',
    contactEmail: 'carlos.ruiz@pacifictraders.ca',
    contactPhone: '555-3003',
    notes: 'Ready to start transacting.'
  },
  {
    id: 's-004',
    name: 'Dragon Electronics',
    category: 'Electronics',
    status: 'On Hold',
    country: 'China',
    website: 'https://dragonelec.cn',
    contactName: 'Wei Zhang',
    contactEmail: 'wei.zhang@dragonelec.cn',
    contactPhone: '555-4004',
    notes: 'Quality issue under investigation.'
  },
  {
    id: 's-005',
    name: 'EuroTech GmbH',
    category: 'Technology',
    status: 'Blocked',
    country: 'Germany',
    website: 'https://eurotech.de',
    contactName: 'Hans Mueller',
    contactEmail: 'hans.mueller@eurotech.de',
    contactPhone: '555-5005',
    notes: 'Compliance violation - export restrictions.'
  },
  {
    id: 's-006',
    name: 'Old Parts Inc.',
    category: 'Industrial',
    status: 'Inactive',
    country: 'USA',
    website: 'https://oldparts.com',
    contactName: 'Bob Wilson',
    contactEmail: 'bob.wilson@oldparts.com',
    contactPhone: '555-6006',
    notes: 'Archived - no longer in business.'
  },
  {
    id: 's-007',
    name: 'New Ventures Co.',
    category: 'Services',
    status: 'Draft',
    country: 'India',
    website: 'https://newventures.in',
    contactName: 'Priya Sharma',
    contactEmail: 'priya.sharma@newventures.in',
    contactPhone: '555-7007',
    notes: 'Profile incomplete - awaiting documents.'
  }
];

// Supplier CRUD functions for mock API
export function searchSuppliers(params: { search?: string; status?: string; page?: number; pageSize?: number }) {
  let filtered = [...mockSuppliers];
  if (params.search) {
    const term = params.search.toLowerCase();
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.country.toLowerCase().includes(term)
    );
  }
  if (params.status) {
    filtered = filtered.filter(s => s.status === params.status);
  }
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return { items, total: filtered.length };
}

export function getSupplierById(id: string) {
  return mockSuppliers.find(s => s.id === id) ?? null;
}

export function createSupplier(data: Omit<typeof mockSuppliers[0], 'id'>) {
  const newSupplier = { ...data, id: `s-${Date.now()}` };
  mockSuppliers.push(newSupplier);
  return newSupplier;
}

export function updateSupplier(id: string, data: Partial<typeof mockSuppliers[0]>) {
  const idx = mockSuppliers.findIndex(s => s.id === id);
  if (idx === -1) return null;
  mockSuppliers[idx] = { ...mockSuppliers[idx], ...data };
  return mockSuppliers[idx];
}

export function deleteSupplier(id: string) {
  const idx = mockSuppliers.findIndex(s => s.id === id);
  if (idx === -1) return false;
  mockSuppliers.splice(idx, 1);
  return true;
}

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
  qualificationPolicy: {
    defaultThreshold: 75,
    managerApprovalBelow: 50,
    blockBelow: 25,
    allowOverrides: true,
    requireOverrideReason: true,
    showCqvsInLeadList: false,
    requireEvidenceBeforeQualified: true,
    minimumEvidenceCoveragePercent: 50,
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
  const activityTypes = ['Call', 'Email', 'Meeting', 'Task'];
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

interface MockUserRecord {
  id: string;
  fullName: string;
  email: string;
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

export const findUser = (id: string): UserDetailResponse | null => {
  const record = mockUsers.find((user) => user.id === id);
  return record ? toUserDetail(record) : null;
};

export const createUser = (payload: UpsertUserRequest): UserDetailResponse => {
  const record: MockUserRecord = {
    id: `user-${Math.random().toString(36).slice(2, 8)}`,
    fullName: payload.fullName,
    email: payload.email,
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
  record.timeZone = payload.timeZone ?? record.timeZone;
  record.locale = payload.locale ?? record.locale;
  record.isActive = payload.isActive;
  record.roleIds = [...payload.roleIds];
  return toUserDetail(record);
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
