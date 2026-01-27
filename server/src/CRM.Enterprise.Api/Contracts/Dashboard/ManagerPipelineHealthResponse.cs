using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record ManagerPipelineHealthResponse(
    int OpenOpportunities,
    decimal PipelineValueTotal,
    int MissingNextStepCount,
    int NextStepOverdueCount,
    int NoRecentActivityCount,
    int CloseDateOverdueCount,
    int StuckStageCount,
    IEnumerable<PipelineStageSummary> PipelineByStage,
    IEnumerable<ManagerReviewDealItem> ReviewQueue);

public record ManagerReviewDealItem(
    Guid Id,
    string Name,
    string AccountName,
    string Stage,
    decimal Amount,
    string OwnerName,
    string Reason,
    DateTime? NextStepDueAtUtc,
    DateTime? LastActivityAtUtc,
    DateTime? ExpectedCloseDate);
