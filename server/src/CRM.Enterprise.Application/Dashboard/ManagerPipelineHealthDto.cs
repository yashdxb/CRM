using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Application.Dashboard;

public record ManagerPipelineHealthDto(
    int OpenOpportunities,
    decimal PipelineValueTotal,
    int MissingNextStepCount,
    int NextStepOverdueCount,
    int NoRecentActivityCount,
    int CloseDateOverdueCount,
    int StuckStageCount,
    IReadOnlyList<PipelineStageDto> PipelineByStage,
    IReadOnlyList<ManagerReviewDealDto> ReviewQueue);

public record ManagerReviewDealDto(
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
