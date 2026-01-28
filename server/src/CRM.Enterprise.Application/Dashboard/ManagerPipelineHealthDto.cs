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
    int CoachingOpenCount,
    int CoachingOverdueCount,
    int CoachingEscalationsLast7Days,
    int ApprovalPendingCount,
    decimal ApprovalCycleAvgHours,
    int ReviewNeedsWorkCount,
    int ReviewEscalatedCount,
    int ReviewAckOverdueCount,
    decimal ReviewAckAvgHours,
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
