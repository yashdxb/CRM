export interface RiskIntelligenceWorkspace {
  summary: RiskIntelligenceSummary;
  priorityRisks: RiskGuidanceItem[];
  watchlist: RiskWatchlistItem[];
  generatedAtUtc: string;
}

export interface RiskIntelligenceSummary {
  totalOpenRisks: number;
  immediateRisks: number;
  soonRisks: number;
  stalePipelineCount: number;
  overdueApprovals: number;
}

export interface RiskGuidanceItem {
  id: string;
  riskType: string;
  affectedModule: string;
  entityType?: string | null;
  entityId?: string | null;
  entityLabel: string;
  owner: string;
  score: number;
  urgency: 'planned' | 'soon' | 'immediate' | string;
  reasonSummary: string;
  recommendedAction: string;
  sourceSurface: string;
  drillRoute: string;
  evidence: string[];
}

export interface RiskWatchlistItem {
  label: string;
  count: number;
  severity: string;
  context: string;
  route: string;
}
