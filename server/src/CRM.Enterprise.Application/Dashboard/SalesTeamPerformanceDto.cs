using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Application.Dashboard;

public record SalesTeamPerformanceDto(
    decimal TeamRevenue,
    int DealsClosed,
    decimal WinRate,
    double AvgCycleDays,
    decimal TeamRevenuePrevious,
    int DealsClosedPrevious,
    decimal WinRatePrevious,
    double AvgCycleDaysPrevious,
    IReadOnlyList<RepPerformanceDto> Reps);

public record RepPerformanceDto(
    Guid UserId,
    string Name,
    int DealsClosed,
    decimal Revenue,
    decimal WinRate,
    double AvgCycleDays,
    int ActivitiesCount,
    string? ProfilePictureUrl = null);
