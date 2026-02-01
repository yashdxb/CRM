export type LeadStatus = 'New' | 'Contacted' | 'Nurture' | 'Qualified' | 'Converted' | 'Lost' | 'Disqualified';
export type LeadAssignmentStrategy = 'Manual' | 'RoundRobin' | 'Territory';
export type LeadCadenceChannel = string;

export interface LeadCadenceChannelOption {
  id: string;
  name: string;
  order: number;
  isDefault: boolean;
  isActive: boolean;
}

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
  disqualifiedReason?: string;
  nurtureFollowUpAtUtc?: string;
  qualifiedNotes?: string;
  firstTouchDueAtUtc?: string;
  firstTouchedAtUtc?: string;
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

export interface LeadCadenceTouch {
  activityId: string;
  channel: string;
  outcome: string;
  completedAtUtc: string;
  nextStepDueAtUtc?: string;
  ownerName: string;
}
