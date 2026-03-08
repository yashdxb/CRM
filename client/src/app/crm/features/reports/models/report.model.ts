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

export interface ReportServerConfig {
  enabled: boolean;
  reportServerUrl?: string | null;
  reportServiceUrl?: string | null;
  designerUrl?: string | null;
}

export interface ReportServerToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export interface ReportCatalogItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  extension: string;
  createdOn: string;
  modifiedOn: string;
}

export interface ReportCategory {
  id: string;
  name: string;
}

export interface UserLookupItem {
  id: string;
  fullName: string;
  email: string;
}

export interface ReportParameterOption {
  value: string;
  label: string;
}
