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
  contractStartDateUtc?: string | null;
  contractEndDateUtc?: string | null;
  forecastCategory?: string | null;
  opportunityType?: string;
  renewalOfOpportunityId?: string | null;
  renewalOpportunityId?: string | null;
  summary?: string | null;
  requirements?: string | null;
  buyingProcess?: string | null;
  successCriteria?: string | null;
  discountPercent?: number | null;
  discountAmount?: number | null;
  pricingNotes?: string | null;
  securityReviewStatus?: string | null;
  securityNotes?: string | null;
  legalReviewStatus?: string | null;
  legalNotes?: string | null;
  deliveryOwnerId?: string | null;
  deliveryHandoffScope?: string | null;
  deliveryHandoffRisks?: string | null;
  deliveryHandoffTimeline?: string | null;
  deliveryStatus?: string | null;
  deliveryCompletedAtUtc?: string | null;
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
  missingNextStep?: boolean;
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

export interface OpportunityOnboardingItem {
  id: string;
  opportunityId: string;
  type: 'Checklist' | 'Milestone';
  title: string;
  status: string;
  dueDateUtc?: string | Date | null;
  completedAtUtc?: string | null;
  notes?: string | null;
}

export type OpportunityApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface OpportunityApprovalItem {
  id: string;
  opportunityId: string;
  status: OpportunityApprovalStatus;
  purpose: string;
  approverRole: string;
  approvalChainId?: string | null;
  stepOrder?: number;
  totalSteps?: number;
  chainStatus?: string;
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

export interface OpportunityApprovalInboxItem {
  id: string;
  opportunityId: string;
  opportunityName: string;
  accountName: string;
  status: OpportunityApprovalStatus;
  purpose: string;
  approverRole: string;
  approvalChainId?: string | null;
  stepOrder?: number;
  totalSteps?: number;
  chainStatus?: string;
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

export type OpportunityReviewKind = 'Review' | 'Acknowledgment';

export interface OpportunityReviewThreadItem {
  activityId: string;
  kind: OpportunityReviewKind;
  outcome: string;
  subject: string;
  comment?: string | null;
  ownerId: string;
  ownerName: string;
  createdAtUtc: string;
  dueDateUtc?: string | null;
  completedDateUtc?: string | null;
  requiresAcknowledgment: boolean;
}

export interface OpportunityTeamMember {
  userId: string;
  userName: string;
  role: string;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
}

export interface UpdateOpportunityTeamRequest {
  members: Array<{
    userId: string;
    role: string;
  }>;
}
