export type CustomerStatus = 'Lead' | 'Prospect' | 'Customer';

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  status: CustomerStatus;
  ownerId?: string;
  owner: string;
  parentAccountId?: string;
  parentAccountName?: string;
  createdAt: string;
  notes?: string[];
  industry?: string;
  territory?: string;
  activityScore?: number;
  website?: string;
  accountNumber?: string;
  annualRevenue?: number;
  numberOfEmployees?: number;
  accountType?: string;
  rating?: string;
  accountSource?: string;
}

export interface CustomerDetail {
  id: string;
  name: string;
  accountNumber?: string;
  industry?: string;
  website?: string;
  phone?: string;
  status: string;
  ownerId: string;
  owner: string;
  parentAccountId?: string;
  parentAccountName?: string;
  territory?: string;
  description?: string;
  activityScore: number;
  healthScore: number;
  lastActivityAt?: string;
  lastViewedAt?: string;
  createdAt: string;
  updatedAt?: string;
  annualRevenue?: number;
  numberOfEmployees?: number;
  accountType?: string;
  rating?: string;
  accountSource?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;
  shippingStreet?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  contactCount: number;
  opportunityCount: number;
  leadCount: number;
  supportCaseCount: number;
  teamMembers: AccountTeamMember[];
  renewalDate?: string;
  contractEndDate?: string;
  nearestOpportunityRenewal?: string;
  openPipelineValue?: number;
  closedWonRevenue?: number;
  weightedForecast?: number;
}

export interface AccountTeamMember {
  id: string;
  userId: string;
  userName: string;
  role: string;
  createdAt: string;
}

export interface CustomerSearchRequest {
  search?: string;
  status?: CustomerStatus;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  industry?: string;
  territory?: string;
  ownerId?: string;
  createdFrom?: string;
  createdTo?: string;
  minRevenue?: number;
  maxRevenue?: number;
}

export interface CustomerSearchResponse {
  items: Customer[];
  total: number;
}

export interface DuplicateMatch {
  id: string;
  name: string;
  accountNumber?: string;
  website?: string;
  phone?: string;
  matchScore: number;
}

export interface MergeAccountRequest {
  duplicateId: string;
}

export interface MergeAccountResponse {
  success: boolean;
  survivorId: string;
  contactsMoved: number;
  opportunitiesMoved: number;
  leadsMoved: number;
  casesMoved: number;
  error?: string;
}

export interface AccountHierarchyNode {
  id: string;
  name: string;
  industry?: string;
  lifecycleStage?: string;
  ownerId: string;
  ownerName: string;
  depth: number;
  children: AccountHierarchyNode[];
}

export interface AccountTimelineEntry {
  id: string;
  type: string;
  subject?: string;
  description?: string;
  outcome?: string;
  occurredAt: string;
  ownerName?: string;
  fromEmail?: string;
  direction?: string;
}
