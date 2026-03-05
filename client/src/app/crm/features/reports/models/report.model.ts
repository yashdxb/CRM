export interface PipelineByStageReportRow {
  stage: string;
  opportunityCount: number;
  pipelineValue: number;
  sharePercent: number;
}

export interface PipelineByStageReport {
  generatedAtUtc: string;
  totalOpenOpportunities: number;
  totalPipelineValue: number;
  stages: PipelineByStageReportRow[];
}

export interface ReportsEmbedConfig {
  enabled: boolean;
  provider: string;
  serviceUrl?: string | null;
  pipelineByStageReportSource?: string | null;
}
