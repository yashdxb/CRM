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
  proposalStatus?: string | null;
  proposalNotes?: string | null;
  proposalLink?: string | null;
  proposalGeneratedAtUtc?: string | null;
  proposalSentAtUtc?: string | null;
  preSalesScope?: string | null;
  preSalesApproach?: string | null;
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

export interface ExpansionSignal {
  opportunityId: string;
  accountId: string;
  accountName: string;
  opportunityName: string;
  contractEndDateUtc?: string | null;
  lastSignalAtUtc: string;
  signalCount: number;
  hasExpansionOpportunity: boolean;
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
  type: 'Security' | 'Legal' | 'Technical';
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

export interface OpportunityQuoteSummary {
  id: string;
  quoteNumber: string;
  name: string;
  status: string;
  priceListId?: string | null;
  currency: string;
  totalAmount: number;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
}

export interface OpportunityQuoteLine {
  id: string;
  itemMasterId: string;
  itemName: string;
  itemSku: string;
  description?: string | null;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  lineTotal: number;
}

export interface OpportunityQuoteDetail {
  id: string;
  opportunityId: string;
  quoteNumber: string;
  name: string;
  status: string;
  priceListId?: string | null;
  currency: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  notes?: string | null;
  createdAtUtc: string;
  updatedAtUtc?: string | null;
  lines: OpportunityQuoteLine[];
}

export interface OpportunityQuoteLineRequest {
  itemMasterId: string;
  description?: string | null;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
}

export interface OpportunityCreateQuoteRequest {
  name: string;
  priceListId?: string | null;
  currency: string;
  taxAmount: number;
  notes?: string | null;
  lines: OpportunityQuoteLineRequest[];
}

export interface OpportunityUpdateQuoteRequest extends OpportunityCreateQuoteRequest {
  status: string;
}

export interface PriceListListItem {
  id: string;
  name: string;
  currency: string;
  status: string;
}

export interface ItemMasterListItem {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  categoryName?: string | null;
  defaultUom?: string | null;
  isActive: boolean;
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
  decisionType: string;
  priority: 'normal' | 'medium' | 'high' | 'critical' | string;
  riskLevel: 'low' | 'medium' | 'high' | string;
  slaStatus: 'on-track' | 'at-risk' | 'overdue' | 'completed' | string;
  slaDueAtUtc?: string | null;
  isEscalated?: boolean;
  requestedAgeHours: number;
  policyReason: string;
  businessImpactLabel: string;
}

export interface DecisionAssistDraft {
  decisionId: string;
  summary: string;
  recommendedAction: 'approve' | 'reject' | 'request_info' | 'review' | string;
  approvalDraftNote: string;
  rejectDraftNote: string;
  requestInfoDraftNote: string;
  missingEvidence: string[];
  disclaimer: string;
}

export interface DecisionHistoryItem {
  actionLogId: string;
  decisionId: string;
  action: string;
  actionAtUtc: string;
  actorName?: string | null;
  actorUserId?: string | null;
  decisionType: string;
  workflowType: string;
  entityType: string;
  entityId: string;
  entityName: string;
  status: string;
  priority?: string | null;
  riskLevel?: string | null;
  notes?: string | null;
  policyReason?: string | null;
  isEscalated: boolean;
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
