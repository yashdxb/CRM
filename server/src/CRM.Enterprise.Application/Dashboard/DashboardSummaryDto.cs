using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Application.Dashboard;

public record DashboardSummaryDto(
    int TotalCustomers,
    int Leads,
    int Prospects,
    int ActiveCustomers,
    int OpenOpportunities,
    decimal PipelineValueTotal,
    int TasksDueToday,
    int UpcomingActivities,
    int OverdueActivities,
    int AtRiskOpportunities,
    int OpportunitiesWithoutNextStep,
    IReadOnlyList<RecentAccountDto> RecentAccounts,
    IReadOnlyList<UpcomingActivityDto> ActivitiesNextWeek,
    IReadOnlyList<UpcomingActivityDto> MyTasks,
    IReadOnlyList<TeamMonthlyKpiDto> TeamMonthlyKpis,
    IReadOnlyList<PipelineStageDto> PipelineValue,
    IReadOnlyList<ChartDataPointDto> RevenueByMonth,
    IReadOnlyList<ChartDataPointDto> CustomerGrowth,
    IReadOnlyList<ActivityBreakdownItemDto> ActivityBreakdown,
    IReadOnlyList<ChartDataPointDto> ConversionTrend,
    IReadOnlyList<PerformerSummaryDto> TopPerformers,
    IReadOnlyList<DashboardLeadDto> NewlyAssignedLeads,
    IReadOnlyList<DashboardOpportunityDto> AtRiskDeals,
    decimal AvgDealSize,
    int WinRate,
    int AvgSalesCycle,
    decimal MonthlyRecurringRevenue,
    decimal CustomerLifetimeValue,
    decimal ChurnRate);

public record RecentAccountDto(
    Guid Id,
    string Name,
    string? Email,
    string? Phone,
    string Status,
    Guid OwnerId,
    string OwnerName,
    DateTime CreatedAtUtc);

public record UpcomingActivityDto(
    Guid Id,
    string Subject,
    string Type,
    Guid? RelatedEntityId,
    string? RelatedEntityName,
    string? RelatedEntityType,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    string Status);

public record TeamMonthlyKpiDto(
    Guid OwnerId,
    string OwnerName,
    int LeadsCreated,
    int LeadsQualified,
    int OpportunitiesCreated,
    int DealsWon,
    decimal RevenueWon);

public record PipelineStageDto(string Stage, int Count, decimal Value);

public record ChartDataPointDto(string Label, decimal Value);

public record ActivityBreakdownItemDto(string Type, int Count, int Percentage);

public record PerformerSummaryDto(string Name, int Deals, decimal Revenue, string? Avatar);

public record DashboardLeadDto(
    Guid Id,
    string Name,
    string Company,
    string Status,
    string? Email,
    DateTime CreatedAtUtc);

public record DashboardOpportunityDto(
    Guid Id,
    string Name,
    string AccountName,
    string Stage,
    decimal Amount,
    string Reason,
    DateTime? NextStepDueAtUtc,
    DateTime? LastActivityAtUtc);
