using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record SalesTeamPerformanceResponse(
    decimal TeamRevenue,
    int DealsClosed,
    decimal WinRate,
    double AvgCycleDays,
    decimal TeamRevenuePrevious,
    int DealsClosedPrevious,
    decimal WinRatePrevious,
    double AvgCycleDaysPrevious,
    IEnumerable<RepPerformanceItem> Reps);

public record RepPerformanceItem(
    Guid UserId,
    string Name,
    int DealsClosed,
    decimal Revenue,
    decimal WinRate,
    double AvgCycleDays,
    int ActivitiesCount);
