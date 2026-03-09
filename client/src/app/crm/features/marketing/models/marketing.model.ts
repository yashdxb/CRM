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

export type AttributionModel = 'first_touch' | 'last_touch' | 'linear';

export interface ImpactWorklistTelemetryRequest {
  campaignId: string;
  campaignName: string;
  model: AttributionModel;
  direction: 'positive' | 'negative';
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
  impactWorklistClicks: number;
  acceptanceRatePct: number;
  avgDecisionHours: number;
  windowStartUtc: string;
  windowEndUtc: string;
}

// ── Campaign Email Models ──────────────────────────────────────

export type CampaignEmailStatus = 'Draft' | 'Scheduled' | 'Sending' | 'Sent' | 'Failed' | 'Cancelled';

export interface CampaignEmailListItem {
  id: string;
  campaignId: string;
  campaignName: string;
  subject: string;
  status: CampaignEmailStatus;
  fromName: string;
  scheduledAtUtc?: string;
  sentAtUtc?: string;
  recipientCount: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CampaignEmailSearchResponse {
  items: CampaignEmailListItem[];
  total: number;
}

export interface CampaignEmailDetail {
  id: string;
  campaignId: string;
  campaignName: string;
  templateId?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  fromName: string;
  replyTo?: string;
  status: CampaignEmailStatus;
  scheduledAtUtc?: string;
  sentAtUtc?: string;
  recipientCount: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribeCount: number;
  createdAtUtc: string;
  updatedAtUtc?: string;
}

export interface CampaignEmailRecipient {
  id: string;
  email: string;
  name?: string;
  status: string;
  skipReason?: string;
  sentAtUtc?: string;
  deliveredAtUtc?: string;
  openedAtUtc?: string;
  clickedAtUtc?: string;
}

export interface CampaignEmailRecipientSearchResponse {
  items: CampaignEmailRecipient[];
  total: number;
}

export interface SaveCampaignEmailRequest {
  campaignId: string;
  templateId?: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
  fromName: string;
  replyTo?: string;
}

export interface ScheduleCampaignEmailRequest {
  scheduledAtUtc: string;
}

export interface EmailPreference {
  id: string;
  email: string;
  entityType: string;
  entityId: string;
  isSubscribed: boolean;
  unsubscribedAtUtc?: string;
  unsubscribeReason?: string;
  unsubscribeSource: string;
  hardBounceCount: number;
  lastBounceAtUtc?: string;
}

export interface UpdateEmailPreferenceRequest {
  isSubscribed: boolean;
}

export interface PublicUnsubscribeRequest {
  email: string;
  tenantId: string;
  reason?: string;
}
