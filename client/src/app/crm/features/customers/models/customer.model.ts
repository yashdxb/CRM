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
