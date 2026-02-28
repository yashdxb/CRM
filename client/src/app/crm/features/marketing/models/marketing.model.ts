export type CampaignEntityType = 'Lead' | 'Contact';
export type CampaignResponseStatus = 'Sent' | 'Responded' | 'Qualified' | 'Unsubscribed';

export interface Campaign {
  id: string;
  name: string;
  type: string;
  channel: string;
  status: string;
  ownerUserId: string;
  ownerName: string;
  startDateUtc?: string;
  endDateUtc?: string;
  budgetPlanned: number;
  budgetActual: number;
  objective?: string;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CampaignSearchResponse {
  items: Campaign[];
  total: number;
}

export interface CampaignMember {
  id: string;
  campaignId: string;
  entityType: CampaignEntityType;
  entityId: string;
  entityName: string;
  responseStatus: CampaignResponseStatus;
  addedUtc: string;
  updatedAtUtc?: string;
}

export interface CampaignAttributedOpportunity {
  opportunityId: string;
  opportunityName: string;
  accountName: string;
  stage: string;
  amount: number;
  currency: string;
  isClosed: boolean;
  isWon: boolean;
  expectedCloseDate?: string;
  attributedUtc: string;
}

export interface CampaignPerformance {
  campaignId: string;
  memberCount: number;
  influencedOpportunities: number;
  influencedPipelineAmount: number;
  wonRevenue: number;
  conversionRate: number;
  opportunities: CampaignAttributedOpportunity[];
}

export interface CampaignDetailResponse {
  campaign: Campaign;
  members: CampaignMember[];
  performance: CampaignPerformance;
}

export interface SaveCampaignRequest {
  name: string;
  type: string;
  channel: string;
  status: string;
  ownerUserId: string;
  startDateUtc?: string | null;
  endDateUtc?: string | null;
  budgetPlanned: number;
  budgetActual: number;
  objective?: string | null;
}

export interface SaveCampaignMemberRequest {
  entityType: CampaignEntityType;
  entityId: string;
  responseStatus: CampaignResponseStatus;
}

export interface AttributionSummaryItem {
  campaignId: string;
  campaignName: string;
  status: string;
  influencedOpportunities: number;
  influencedPipelineAmount: number;
  wonRevenue: number;
  conversionRate: number;
  sampleOpportunityId?: string;
}

export interface CampaignHealthMetrics {
  influencedOpportunities: number;
  influencedPipelineAmount: number;
  wonRevenue: number;
  openAgingOver21Count: number;
  winRate: number;
  budgetVariancePct: number;
}

export interface CampaignHealthScore {
  campaignId: string;
  score: number;
  trend: 'up' | 'down' | 'flat' | string;
  calculationWindowDays: number;
  computedUtc: string;
  reasonChips: string[];
  metrics: CampaignHealthMetrics;
}

export interface CampaignRecommendation {
  id: string;
  campaignId: string;
  type: string;
  severity: string;
  title: string;
  description: string;
  impactEstimate: number;
  confidence: number;
  status: string;
  generatedUtc: string;
  expiresUtc?: string;
  decidedUtc?: string;
  decisionReason?: string;
  evidence: string[];
}

export interface RecommendationDecisionRequest {
  decision: 'accept' | 'dismiss' | 'snooze';
  reason?: string | null;
  applyActions?: boolean;
}

export interface AttributionExplainabilityCandidate {
  entityType: string;
  entityId: string;
  entityName: string;
  campaignId: string;
  campaignName: string;
  memberAddedUtc: string;
}

export interface AttributionExplainability {
  opportunityId: string;
  campaignId?: string;
  model: string;
  attributedUtc?: string;
  ruleVersion?: string;
  sourceEntityType?: string;
  sourceEntityId?: string;
  memberAddedUtc?: string;
  evidence: string[];
  candidates: AttributionExplainabilityCandidate[];
}

export interface RecommendationPilotMetrics {
  activeRecommendations: number;
  acceptedCount: number;
  dismissedCount: number;
  snoozedCount: number;
  actionTasksCreated: number;
  acceptanceRatePct: number;
  avgDecisionHours: number;
  windowStartUtc: string;
  windowEndUtc: string;
}
