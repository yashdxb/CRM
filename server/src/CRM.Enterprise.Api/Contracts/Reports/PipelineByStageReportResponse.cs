namespace CRM.Enterprise.Api.Contracts.Reports;

public sealed record PipelineByStageReportResponse(
    DateTime GeneratedAtUtc,
    int TotalOpenOpportunities,
    decimal TotalPipelineValue,
    IReadOnlyList<PipelineByStageRowResponse> Stages);

public sealed record PipelineByStageRowResponse(
    string Stage,
    int OpportunityCount,
    decimal PipelineValue,
    decimal SharePercent);
