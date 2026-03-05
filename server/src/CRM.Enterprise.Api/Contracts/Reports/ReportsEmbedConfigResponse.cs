namespace CRM.Enterprise.Api.Contracts.Reports;

public sealed record ReportsEmbedConfigResponse(
    bool Enabled,
    string Provider,
    string? ServiceUrl,
    string? PipelineByStageReportSource);
