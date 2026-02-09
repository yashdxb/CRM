using System.Collections.Generic;
using CRM.Enterprise.Api.Contracts.Activities;
using CRM.Enterprise.Api.Contracts.Customers;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record DashboardSummaryResponse(
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
    IEnumerable<CustomerListItem> RecentCustomers,
    IEnumerable<ActivityListItem> ActivitiesNextWeek,
    IEnumerable<ActivityListItem> MyTasks,
    IEnumerable<TeamMonthlyKpiSummary> TeamMonthlyKpis,
    IEnumerable<PipelineStageSummary> PipelineValue,
    IEnumerable<ChartDataPoint> RevenueByMonth,
    IEnumerable<ChartDataPoint> CustomerGrowth,
    IEnumerable<ActivityBreakdownItem> ActivityBreakdown,
    IEnumerable<ChartDataPoint> ConversionTrend,
    IEnumerable<PerformerSummary> TopPerformers,
    IEnumerable<DashboardLeadItem> NewlyAssignedLeads,
    IEnumerable<DashboardOpportunityItem> AtRiskDeals,
    decimal AvgDealSize,
    int WinRate,
    int AvgSalesCycle,
    decimal MonthlyRecurringRevenue,
    decimal CustomerLifetimeValue,
    decimal ChurnRate,
    decimal AvgQualificationConfidence,
    decimal AvgTruthCoverage,
    decimal AvgTimeToTruthDays,
    int RiskRegisterCount,
    IEnumerable<RiskFlagSummaryItem> TopRiskFlags,
    decimal ConfidenceWeightedPipelineValue,
    decimal CostOfNotKnowingValue,
    int CostOfNotKnowingDeals,
    IEnumerable<CostOfNotKnowingDealItem> CostOfNotKnowingBreakdown,
    IEnumerable<ChartDataPoint> CostOfNotKnowingTrend,
    decimal ConfidenceCalibrationScore,
    int ConfidenceCalibrationSample,
    decimal MyPipelineValueTotal,
    decimal MyConfidenceWeightedPipelineValue,
    decimal? MyQuotaTarget);

public record ChartDataPoint(string Label, decimal Value);

public record ActivityBreakdownItem(string Type, int Count, int Percentage);

public record PipelineStageSummary(string Stage, int Count, decimal Value);

public record PerformerSummary(string Name, int Deals, decimal Revenue, string? Avatar);

public record TeamMonthlyKpiSummary(
    Guid OwnerId,
    string OwnerName,
    int LeadsCreated,
    int LeadsQualified,
    int OpportunitiesCreated,
    int DealsWon,
    decimal RevenueWon);

public record DashboardLeadItem(
    Guid Id,
    string Name,
    string Company,
    string Status,
    string? Email,
    DateTime CreatedAtUtc);

public record DashboardOpportunityItem(
    Guid Id,
    string Name,
    string AccountName,
    string Stage,
    decimal Amount,
    string Reason,
    DateTime? NextStepDueAtUtc,
    DateTime? LastActivityAtUtc);

public record RiskFlagSummaryItem(string Label, int Count);

public record CostOfNotKnowingDealItem(
    Guid OpportunityId,
    string OpportunityName,
    string AccountName,
    string Stage,
    decimal Amount,
    decimal CostOfNotKnowingValue,
    IEnumerable<CostOfNotKnowingFactorItem> TopFactors);

public record CostOfNotKnowingFactorItem(
    string Key,
    string Label,
    decimal Weight,
    decimal Contribution,
    string State);
