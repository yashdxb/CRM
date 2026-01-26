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
