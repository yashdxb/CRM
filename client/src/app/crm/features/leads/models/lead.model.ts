export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';
export type LeadAssignmentStrategy = 'Manual' | 'RoundRobin' | 'Territory';

export interface Lead {
  id: string;
  name: string;
  company: string;
  status: LeadStatus;
  email?: string;
  phone?: string;
  ownerId?: string;
  owner: string;
  score: number;
  createdAt: string;
  source?: string;
  territory?: string;
  jobTitle?: string;
  accountId?: string;
  contactId?: string;
  convertedOpportunityId?: string;
}

export interface LeadSearchRequest {
  search?: string;
  status?: LeadStatus;
  page?: number;
  pageSize?: number;
}

export interface LeadSearchResponse {
  items: Lead[];
  total: number;
}

export interface LeadConversionRequest {
  createAccount: boolean;
  accountName?: string;
  createContact: boolean;
  createOpportunity: boolean;
  opportunityName?: string;
  amount?: number;
  expectedCloseDate?: string | Date;
}

export interface LeadConversionResponse {
  leadId: string;
  accountId?: string;
  contactId?: string;
  opportunityId?: string;
}

export interface LeadStatusHistoryItem {
  id: string;
  status: LeadStatus | string;
  changedAtUtc: string;
  changedBy?: string;
  notes?: string;
}
