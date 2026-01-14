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
    decimal AvgDealSize,
    int WinRate,
    int AvgSalesCycle,
    decimal MonthlyRecurringRevenue,
    decimal CustomerLifetimeValue,
    decimal ChurnRate);

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
