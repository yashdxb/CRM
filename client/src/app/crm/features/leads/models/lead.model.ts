export type LeadStatus = 'New' | 'Contacted' | 'Nurture' | 'Qualified' | 'Converted' | 'Lost' | 'Disqualified';
export const LEAD_STATUSES: ReadonlyArray<LeadStatus> = [
  'New',
  'Contacted',
  'Nurture',
  'Qualified',
  'Converted',
  'Lost',
  'Disqualified'
];
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
  leadNumber: string;
  name: string;
  company: string;
  status: LeadStatus;
  email?: string;
  phone?: string;
  phoneTypeId?: string;
  ownerId?: string;
  owner: string;
  score: number;
  createdAt: string;
  source?: string;
  routingReason?: string;
  territory?: string;
  jobTitle?: string;
  accountId?: string;
  contactId?: string;
  convertedOpportunityId?: string;
  disqualifiedReason?: string;
  lossReason?: string;
  lossCompetitor?: string;
  lossNotes?: string;
  nurtureFollowUpAtUtc?: string;
  qualifiedNotes?: string;
  buyerType?: string;
  motivationUrgency?: string;
  financingReadiness?: string;
  preApprovalStatus?: string;
  preferredArea?: string;
  preferredPropertyType?: string;
  budgetBand?: string;
  firstTouchDueAtUtc?: string;
  firstTouchedAtUtc?: string;
  budgetAvailability?: string;
  budgetEvidence?: string;
  readinessToSpend?: string;
  readinessEvidence?: string;
  buyingTimeline?: string;
  timelineEvidence?: string;
  problemSeverity?: string;
  problemEvidence?: string;
  economicBuyer?: string;
  economicBuyerEvidence?: string;
  icpFit?: string;
  icpFitEvidence?: string;
  qualificationConfidence?: number;
  qualificationConfidenceLabel?: string;
  truthCoverage?: number;
  assumptionsOutstanding?: number;
  weakestSignal?: string;
  weakestState?: string;
  nextEvidenceSuggestions?: string[];
  scoreBreakdown?: LeadScoreBreakdownItem[];
  riskFlags?: string[];
  conversationScore?: number | null;
  conversationScoreLabel?: string | null;
  conversationScoreReasons?: string[];
  conversationScoreUpdatedAtUtc?: string | null;
  conversationSignalAvailable?: boolean;
  conversationAiDimensionScore?: number | null;
  conversationAiToneLabel?: string | null;
  conversationAiBuyingReadiness?: string | null;
  conversationAiSemanticIntent?: string | null;
  conversationAiToneJustification?: string | null;
  conversionReadiness?: LeadConversionReadiness;
}

export interface LeadConversionReadiness {
  score: number;
  label: string;
  summary: string;
  qualificationSignalScore: number;
  conversationSignalScore?: number | null;
  conversationSignalAvailable: boolean;
  managerReviewRecommended: boolean;
  primaryGap?: string | null;
  reasons: string[];
}

export interface LeadSearchRequest {
  search?: string;
  status?: LeadStatus;
  conversationView?: 'weak_signal' | 'no_signal' | 'coaching_queue' | 'engaged_but_unqualified' | 'manager_review' | 'at_risk' | 'ready_to_convert';
  sortBy?: 'newest' | 'lead_score_desc' | 'conversation_desc' | 'conversation_asc' | 'qualification_desc' | 'readiness_desc';
  page?: number;
  pageSize?: number;
}

export interface LeadSearchResponse {
  items: Lead[];
  total: number;
}

export interface LeadDispositionReport {
  totals: LeadDispositionTotals;
  disqualificationReasons: LeadDispositionReasonCount[];
  lossReasons: LeadDispositionReasonCount[];
  ownerRollups: LeadDispositionOwnerRollup[];
  sourceRollups: LeadDispositionSourceRollup[];
  trend: LeadDispositionTrendPoint[];
}

export interface LeadDispositionTotals {
  disqualified: number;
  lost: number;
  inNurture: number;
  recycledLast30Days: number;
}

export interface LeadDispositionReasonCount {
  reason: string;
  count: number;
}

export interface LeadDispositionOwnerRollup {
  ownerId: string;
  ownerName: string;
  disqualified: number;
  lost: number;
  recycledToNurture: number;
}

export interface LeadDispositionSourceRollup {
  source: string;
  disqualified: number;
  lost: number;
  recycledToNurture: number;
}

export interface LeadDispositionTrendPoint {
  periodStartUtc: string;
  disqualified: number;
  lost: number;
  recycledToNurture: number;
}

export interface LeadConversionRequest {
  createAccount: boolean;
  accountName?: string;
  createContact: boolean;
  createOpportunity: boolean;
  opportunityName?: string;
  amount?: number;
  expectedCloseDate?: string | Date;
  dealType?: string;
  segment?: string;
  stage?: string;
  isCompetitive?: boolean;
  hasExecutiveChampion?: boolean;
  isStrategic?: boolean;
  velocity?: string;
  managerApproved?: boolean;
  overrideReason?: string;
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

export interface LeadScoreBreakdownItem {
  factor: string;
  score: number;
  maxScore: number;
}

export interface LeadDuplicateCheckRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  excludeLeadId?: string;
}

export interface LeadDuplicateCheckCandidate {
  leadId: string;
  name: string;
  companyName: string;
  email?: string;
  phone?: string;
  leadScore: number;
  matchScore: number;
  matchLevel: 'block' | 'warning' | 'allow';
  matchedSignals: string[];
}

export interface LeadDuplicateCheckResponse {
  decision: 'allow' | 'warning' | 'block';
  isBlocked: boolean;
  hasWarnings: boolean;
  matches: LeadDuplicateCheckCandidate[];
}
