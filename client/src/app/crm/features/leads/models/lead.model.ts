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
