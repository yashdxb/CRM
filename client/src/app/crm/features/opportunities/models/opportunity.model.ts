export type OpportunityStatus = 'Open' | 'Closed Won' | 'Closed Lost';

export interface Opportunity {
  id: string;
  name: string;
  accountId?: string;
  account: string;
  stage: string;
  amount: number;
  probability: number;
  currency: string;
  closeDate?: string;
  discountPercent?: number | null;
  discountAmount?: number | null;
  pricingNotes?: string | null;
  securityReviewStatus?: string | null;
  securityNotes?: string | null;
  legalReviewStatus?: string | null;
  legalNotes?: string | null;
  ownerId?: string;
  owner: string;
  status: OpportunityStatus;
  winLossReason?: string | null;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
  lastActivityAtUtc?: string | null;
  nextStepDueAtUtc?: string | null;
  isAtRisk?: boolean;
}

export interface OpportunitySearchRequest {
  search?: string;
  stage?: string;
  accountId?: string;
  page?: number;
  pageSize?: number;
}

export interface OpportunitySearchResponse {
  items: Opportunity[];
  total: number;
}

export interface OpportunityStageHistoryItem {
  id: string;
  stage: string;
  changedAtUtc: string;
  changedBy?: string | null;
  notes?: string | null;
}

export interface OpportunityReviewChecklistItem {
  id: string;
  opportunityId: string;
  type: 'Security' | 'Legal';
  title: string;
  status: string;
  notes?: string | null;
  completedAtUtc?: string | null;
}

export type OpportunityApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface OpportunityApprovalItem {
  id: string;
  opportunityId: string;
  status: OpportunityApprovalStatus;
  purpose: string;
  approverRole: string;
  approverUserId?: string | null;
  approverName?: string | null;
  requestedByUserId?: string | null;
  requestedByName?: string | null;
  requestedOn: string;
  decisionOn?: string | null;
  notes?: string | null;
  amount: number;
  currency: string;
}

export interface OpportunityApprovalRequest {
  amount: number;
  currency?: string | null;
  purpose?: string | null;
}

export interface OpportunityApprovalDecisionRequest {
  approved: boolean;
  notes?: string | null;
}
