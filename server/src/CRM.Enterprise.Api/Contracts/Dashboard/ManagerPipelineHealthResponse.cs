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
    int CoachingOpenCount,
    int CoachingOverdueCount,
    int CoachingEscalationsLast7Days,
    int ApprovalPendingCount,
    decimal ApprovalCycleAvgHours,
    int ReviewNeedsWorkCount,
    int ReviewEscalatedCount,
    int ReviewAckOverdueCount,
    decimal ReviewAckAvgHours,
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
