// ── Auth ────────────────────────────────────────
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresAtUtc: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
  tenantKey: string;
  mustChangePassword: boolean;
}

export interface AuthSession {
  accessToken: string;
  expiresAtUtc: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions: string[];
  tenantKey: string;
}

// ── Paginated wrapper ───────────────────────────
export interface PagedResult<T> {
  items: T[];
  total: number;
}

// ── Leads ───────────────────────────────────────
export interface LeadListItem {
  id: string;
  leadNumber: string;
  name: string;
  company: string;
  leadSummary: string | null;
  status: string;
  email: string | null;
  phone: string | null;
  ownerId: string;
  owner: string;
  score: number;
  source: string | null;
  jobTitle: string | null;
  territory: string | null;
  createdAt: string;
  lastActivityAtUtc: string | null;
  isConverted: boolean;
}

// ── Contacts ────────────────────────────────────
export interface ContactListItem {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  mobile: string | null;
  jobTitle: string | null;
  buyingRole: string | null;
  accountId: string | null;
  accountName: string | null;
  ownerId: string;
  owner: string | null;
  lifecycleStage: string | null;
  activityScore: number;
  createdAtUtc: string;
  city: string | null;
  country: string | null;
  tags: string[] | null;
}

// ── Opportunities (Deals) ───────────────────────
export interface OpportunityListItem {
  id: string;
  name: string;
  accountId: string;
  account: string;
  stage: string;
  amount: number;
  probability: number;
  currency: string;
  closeDate: string | null;
  ownerId: string;
  owner: string;
  status: string;
  createdAtUtc: string;
  updatedAtUtc: string | null;
  lastActivityAtUtc: string | null;
  isAtRisk: boolean;
}

// ── Activities ──────────────────────────────────
export interface ActivityListItem {
  id: string;
  subject: string;
  type: string;
  description: string | null;
  outcome: string | null;
  priority: string | null;
  relatedEntityId: string | null;
  relatedEntityName: string | null;
  relatedEntityType: string | null;
  dueDateUtc: string | null;
  completedDateUtc: string | null;
  status: string;
  ownerId: string | null;
  ownerName: string | null;
  createdAtUtc: string;
}
