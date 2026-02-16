using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.Dashboard;

public class DashboardReadService : IDashboardReadService
{
    private static readonly IReadOnlyDictionary<string, decimal> DefaultStageConfidence = new Dictionary<string, decimal>(StringComparer.OrdinalIgnoreCase)
    {
        ["Qualification"] = 0.35m,
        ["Discovery"] = 0.45m,
        ["Proposal"] = 0.6m,
        ["Negotiation"] = 0.75m,
        ["Commit"] = 0.85m,
        ["Prospecting"] = 0.25m
    };

    private sealed record CalibrationRow(string Stage, bool IsWon);
    private sealed record PipelineExposureRow(
        Guid Id,
        string Name,
        string AccountName,
        string Stage,
        string? ForecastCategory,
        decimal Amount,
        Guid OwnerId,
        string? Summary,
        string? Requirements,
        string? BuyingProcess,
        string? SuccessCriteria,
        DateTime CreatedAtUtc);
    private sealed record LeadQualificationRow(
        Guid OpportunityId,
        DateTime CreatedAtUtc,
        string? BudgetAvailability,
        string? BudgetEvidence,
        DateTime? BudgetValidatedAtUtc,
        string? ReadinessToSpend,
        string? ReadinessEvidence,
        DateTime? ReadinessValidatedAtUtc,
        string? BuyingTimeline,
        string? TimelineEvidence,
        DateTime? BuyingTimelineValidatedAtUtc,
        string? ProblemSeverity,
        string? ProblemEvidence,
        DateTime? ProblemSeverityValidatedAtUtc,
        string? EconomicBuyer,
        string? EconomicBuyerEvidence,
        DateTime? EconomicBuyerValidatedAtUtc,
        string? IcpFit,
        string? IcpFitEvidence,
        DateTime? IcpFitValidatedAtUtc);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private const int InactivityThresholdDays = 30;
    private const int StuckStageThresholdDays = 21;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public DashboardReadService(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync(Guid? userId, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var nextWeek = now.AddDays(7);
        var newlyAssignedCutoff = now.AddDays(-1);
        var startOfToday = now.Date;
        var endOfToday = startOfToday.AddDays(1);
        var userEmail = userId.HasValue
            ? await _dbContext.Users
                .AsNoTracking()
                .Where(u => u.Id == userId.Value)
                .Select(u => u.Email)
                .FirstOrDefaultAsync(cancellationToken)
            : null;

        var visibility = await ResolveVisibilityAsync(userId, cancellationToken);

        var accountQuery = _dbContext.Accounts.AsNoTracking().Where(a => !a.IsDeleted);
        if (visibility.UserIds is not null)
        {
            accountQuery = accountQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }

        var totalCustomers = await accountQuery.CountAsync(cancellationToken);
        var leads = await accountQuery.CountAsync(a => a.LifecycleStage == "Lead", cancellationToken);
        var prospects = await accountQuery.CountAsync(a => a.LifecycleStage == "Prospect", cancellationToken);
        var activeCustomers = await accountQuery.CountAsync(
            a => a.LifecycleStage == "Customer" || a.LifecycleStage == null,
            cancellationToken);

        var opportunitiesQuery = _dbContext.Opportunities.AsNoTracking().Where(o => !o.IsDeleted && !o.IsClosed);
        if (visibility.UserIds is not null)
        {
            opportunitiesQuery = opportunitiesQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }

        var openOpportunities = await opportunitiesQuery.CountAsync(cancellationToken);

        var exposureWeights = await ResolveExposureWeightsAsync(cancellationToken);
        var pipelineRows = await opportunitiesQuery
            .Select(o => new PipelineExposureRow(
                o.Id,
                o.Name,
                o.Account != null ? o.Account.Name : string.Empty,
                o.Stage != null ? o.Stage.Name : "Prospecting",
                o.ForecastCategory ?? (o.Stage != null ? o.Stage.ForecastCategory : null),
                o.Amount,
                o.OwnerId,
                o.Summary,
                o.Requirements,
                o.BuyingProcess,
                o.SuccessCriteria,
                o.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        var leadQualificationRows = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted
                        && l.ConvertedOpportunityId.HasValue
                        && pipelineRows.Select(p => p.Id).Contains(l.ConvertedOpportunityId.Value))
            .Select(l => new LeadQualificationRow(
                l.ConvertedOpportunityId!.Value,
                l.CreatedAtUtc,
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc))
            .ToListAsync(cancellationToken);

        var leadByOpportunity = leadQualificationRows
            .GroupBy(row => row.OpportunityId)
            .ToDictionary(
                group => group.Key,
                group => group.OrderByDescending(row => row.CreatedAtUtc).First());

        var opportunityStages = await _dbContext.OpportunityStages
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .Select(s => new { s.Name, s.Order })
            .ToListAsync(cancellationToken);
        var stageOrderLookup = opportunityStages
            .Where(s => !string.IsNullOrWhiteSpace(s.Name))
            .GroupBy(s => s.Name, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.Min(x => x.Order), StringComparer.OrdinalIgnoreCase);

        var pipelineValueStages = pipelineRows
            .GroupBy(row => row.Stage)
            .Select(group => new PipelineStageDto(group.Key, group.Count(), group.Sum(row => row.Amount)))
            .OrderBy(stage => stageOrderLookup.TryGetValue(stage.Stage ?? string.Empty, out var order) ? order : int.MaxValue)
            .ThenBy(stage => stage.Stage)
            .ToList();

        var pipelineValueTotal = pipelineValueStages.Sum(stage => stage.Value);

        var calibrationWindowStart = now.AddDays(-180);
        var calibrationRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed);
        if (visibility.UserIds is not null)
        {
            calibrationRowsQuery = calibrationRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }

        var calibrationRows = await calibrationRowsQuery
            .Select(o => new
            {
                Stage = o.Stage != null ? o.Stage.Name : "Prospecting",
                o.IsWon,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= calibrationWindowStart)
            .Select(o => new CalibrationRow(o.Stage, o.IsWon))
            .ToListAsync(cancellationToken);

        var stageConfidenceMap = BuildStageConfidenceMap(calibrationRows);
        var confidenceCalibrationScore = ComputeCalibrationScore(calibrationRows, stageConfidenceMap);
        var confidenceCalibrationSample = calibrationRows.Count;

        var costOfNotKnowingValue = 0m;
        var costOfNotKnowingDeals = 0;
        var costOfNotKnowingBreakdown = new List<CostOfNotKnowingDealDto>();
        foreach (var row in pipelineRows)
        {
            var qualificationScore = ComputeQualificationScore(row.Summary, row.Requirements, row.BuyingProcess, row.SuccessCriteria);
            var stageConfidence = GetStageConfidence(stageConfidenceMap, row.Stage);
            var confidenceScore = Math.Clamp((stageConfidence + qualificationScore) / 2m, 0m, 1m);
            var uncertaintyCost = row.Amount * (1m - confidenceScore);
            costOfNotKnowingValue += uncertaintyCost;
            if (confidenceScore < 0.6m)
            {
                costOfNotKnowingDeals += 1;
            }

            leadByOpportunity.TryGetValue(row.Id, out var leadRow);
            var factorBreakdown = BuildExposureBreakdown(leadRow, exposureWeights, uncertaintyCost);
            if (factorBreakdown.Count > 0)
            {
                costOfNotKnowingBreakdown.Add(new CostOfNotKnowingDealDto(
                    row.Id,
                    row.Name,
                    row.AccountName,
                    row.Stage,
                    row.Amount,
                    Math.Round(uncertaintyCost, 2),
                    factorBreakdown));
            }
        }

        var sortedCostBreakdown = costOfNotKnowingBreakdown
            .OrderByDescending(item => item.CostOfNotKnowingValue)
            .ToList();

        var costOfNotKnowingTrend = BuildCostOfNotKnowingTrend(pipelineRows, stageConfidenceMap, now);

        var activitiesQuery = _dbContext.Activities.AsNoTracking().Where(a => !a.IsDeleted);
        if (visibility.UserIds is not null)
        {
            activitiesQuery = activitiesQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }

        var tasksDueToday = await activitiesQuery.CountAsync(
            a => !a.CompletedDateUtc.HasValue && a.DueDateUtc.HasValue &&
                 a.DueDateUtc.Value >= startOfToday && a.DueDateUtc.Value < endOfToday,
            cancellationToken);

        var upcomingActivitiesCount = await activitiesQuery.CountAsync(
            a => !a.CompletedDateUtc.HasValue &&
                 a.DueDateUtc.HasValue &&
                 a.DueDateUtc.Value >= now &&
                 a.DueDateUtc.Value <= nextWeek,
            cancellationToken);

        var overdueActivitiesCount = await activitiesQuery.CountAsync(
            a => !a.CompletedDateUtc.HasValue && a.DueDateUtc < now,
            cancellationToken);

        var openOpportunityIds = await opportunitiesQuery
            .Select(o => o.Id)
            .ToListAsync(cancellationToken);

        var atRiskOpportunities = 0;
        var opportunitiesWithoutNextStep = 0;
        var atRiskDetails = new List<DashboardOpportunityDto>();
        if (openOpportunityIds.Count > 0)
        {
            var opportunityActivityRows = await activitiesQuery
                .AsNoTracking()
                .Where(a => !a.IsDeleted
                            && a.RelatedEntityType == ActivityRelationType.Opportunity
                            && openOpportunityIds.Contains(a.RelatedEntityId))
                .Select(a => new
                {
                    a.RelatedEntityId,
                    a.DueDateUtc,
                    a.CompletedDateUtc,
                    a.CreatedAtUtc
                })
                .ToListAsync(cancellationToken);

            var activityLookup = opportunityActivityRows
                .GroupBy(a => a.RelatedEntityId)
                .ToDictionary(
                    g => g.Key,
                    g =>
                    {
                        var lastActivityAtUtc = g.Max(a => (DateTime?)(a.CompletedDateUtc ?? a.CreatedAtUtc));
                        var nextStepDueAtUtc = g
                            .Where(a => a.CompletedDateUtc == null && a.DueDateUtc.HasValue)
                            .OrderBy(a => a.DueDateUtc)
                            .Select(a => a.DueDateUtc)
                            .FirstOrDefault();
                        return (lastActivityAtUtc, nextStepDueAtUtc);
                    });

            foreach (var opportunityId in openOpportunityIds)
            {
                activityLookup.TryGetValue(opportunityId, out var info);
                var nextStepDueAtUtc = info.nextStepDueAtUtc;
                var lastActivityAtUtc = info.lastActivityAtUtc;

                if (nextStepDueAtUtc is null)
                {
                    opportunitiesWithoutNextStep++;
                    atRiskOpportunities++;
                    if (atRiskDetails.Count < 6)
                    {
                        atRiskDetails.Add(await BuildAtRiskDetailAsync(
                            opportunityId,
                            "Missing next step",
                            nextStepDueAtUtc,
                            lastActivityAtUtc,
                            cancellationToken));
                    }
                    continue;
                }

                if (nextStepDueAtUtc.Value < now)
                {
                    atRiskOpportunities++;
                    if (atRiskDetails.Count < 6)
                    {
                        atRiskDetails.Add(await BuildAtRiskDetailAsync(
                            opportunityId,
                            "Next step overdue",
                            nextStepDueAtUtc,
                            lastActivityAtUtc,
                            cancellationToken));
                    }
                    continue;
                }

                if (lastActivityAtUtc.HasValue && (now - lastActivityAtUtc.Value).TotalDays > 30)
                {
                    atRiskOpportunities++;
                    if (atRiskDetails.Count < 6)
                    {
                        atRiskDetails.Add(await BuildAtRiskDetailAsync(
                            opportunityId,
                            "No recent activity",
                            nextStepDueAtUtc,
                            lastActivityAtUtc,
                            cancellationToken));
                    }
                }
            }
        }

        var recentCustomersQuery = _dbContext.Accounts
            .Include(a => a.Contacts)
            .Where(a => !a.IsDeleted);
        if (visibility.UserIds is not null)
        {
            recentCustomersQuery = recentCustomersQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }

        var recentCustomersRaw = await recentCustomersQuery
            .OrderByDescending(a => a.LastViewedAtUtc ?? a.CreatedAtUtc)
            .Take(6)
            .Select(a => new
            {
                a.Id,
                a.Name,
                a.Phone,
                a.LifecycleStage,
                a.OwnerId,
                a.CreatedAtUtc,
                Email = a.Contacts.Select(c => c.Email).FirstOrDefault(email => !string.IsNullOrEmpty(email))
            })
            .ToListAsync(cancellationToken);

        var ownerIds = recentCustomersRaw.Select(rc => rc.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var recentCustomers = recentCustomersRaw
            .Select(rc => new RecentAccountDto(
                rc.Id,
                rc.Name,
                rc.Email,
                rc.Phone,
                rc.LifecycleStage ?? "Customer",
                rc.OwnerId,
                owners.FirstOrDefault(o => o.Id == rc.OwnerId)?.FullName ?? "Unassigned",
                rc.CreatedAtUtc))
            .ToList();

        var activitiesNextWeekQuery = _dbContext.Activities
            .AsNoTracking()
            .Where(a =>
                !a.IsDeleted &&
                !a.CompletedDateUtc.HasValue &&
                a.DueDateUtc.HasValue &&
                a.DueDateUtc.Value >= now &&
                a.DueDateUtc.Value <= nextWeek);
        if (visibility.UserIds is not null)
        {
            activitiesNextWeekQuery = activitiesNextWeekQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }

        var activitiesNextWeekRaw = await activitiesNextWeekQuery
            .OrderBy(a => a.DueDateUtc)
            .Take(10)
            .Select(a => new DashboardActivityRaw(
                a.Id,
                a.Subject,
                a.Type,
                a.RelatedEntityType,
                a.RelatedEntityId,
                a.DueDateUtc,
                a.CompletedDateUtc))
            .ToListAsync(cancellationToken);

        var myTasksRaw = userId.HasValue
            ? await _dbContext.Activities
                .AsNoTracking()
                .Where(a =>
                    !a.IsDeleted &&
                    !a.CompletedDateUtc.HasValue &&
                    a.Type == ActivityType.Task &&
                    (a.OwnerId == userId.Value ||
                     (!string.IsNullOrWhiteSpace(userEmail) && a.CreatedBy == userEmail)))
                .OrderBy(a => a.DueDateUtc ?? DateTime.MaxValue)
                .Take(6)
                .Select(a => new DashboardActivityRaw(
                    a.Id,
                    a.Subject,
                    a.Type,
                    a.RelatedEntityType,
                    a.RelatedEntityId,
                    a.DueDateUtc,
                    a.CompletedDateUtc))
                .ToListAsync(cancellationToken)
            : new List<DashboardActivityRaw>();

        var newlyAssignedLeads = userId.HasValue
            ? await _dbContext.Leads
                .AsNoTracking()
                .Include(l => l.Status)
                .Where(l => !l.IsDeleted
                            && l.OwnerId == userId.Value
                            && ((l.UpdatedAtUtc ?? l.CreatedAtUtc) >= newlyAssignedCutoff))
                .OrderByDescending(l => l.UpdatedAtUtc ?? l.CreatedAtUtc)
                .Take(6)
                .Select(l => new DashboardLeadDto(
                    l.Id,
                    (l.FirstName + " " + l.LastName).Trim(),
                    l.CompanyName ?? string.Empty,
                    l.Status != null ? l.Status.Name : "New",
                    l.Email,
                    l.CreatedAtUtc,
                    l.FirstTouchDueAtUtc))
                .ToListAsync(cancellationToken)
            : new List<DashboardLeadDto>();

        var activityLookups = activitiesNextWeekRaw.Concat(myTasksRaw).ToList();

        var accountIds = activityLookups
            .Where(a => a.RelatedEntityType == ActivityRelationType.Account)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var contactIds = activityLookups
            .Where(a => a.RelatedEntityType == ActivityRelationType.Contact)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var opportunityIds = activityLookups
            .Where(a => a.RelatedEntityType == ActivityRelationType.Opportunity)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var accountLookup = await _dbContext.Accounts
            .Where(a => accountIds.Contains(a.Id))
            .AsNoTracking()
            .Select(a => new { a.Id, a.Name })
            .ToDictionaryAsync(a => a.Id, a => a.Name, cancellationToken);

        var contactLookup = await _dbContext.Contacts
            .Where(c => contactIds.Contains(c.Id))
            .AsNoTracking()
            .Select(c => new { c.Id, Name = $"{c.FirstName} {c.LastName}".Trim(), c.Email })
            .ToDictionaryAsync(
                c => c.Id,
                c => string.IsNullOrWhiteSpace(c.Name) ? c.Email ?? string.Empty : c.Name,
                cancellationToken);

        var opportunityLookup = await _dbContext.Opportunities
            .Where(o => opportunityIds.Contains(o.Id))
            .AsNoTracking()
            .Select(o => new { o.Id, o.Name })
            .ToDictionaryAsync(o => o.Id, o => o.Name, cancellationToken);

        var activitiesNextWeek = activitiesNextWeekRaw
            .Select(a =>
            {
                var relatedId = a.RelatedEntityId == Guid.Empty ? (Guid?)null : a.RelatedEntityId;
                return new UpcomingActivityDto(
                    a.Id,
                    a.Subject,
                    a.Type.ToString(),
                    relatedId,
                    ResolveCustomerName(a.RelatedEntityType, relatedId, accountLookup, contactLookup, opportunityLookup),
                    a.RelatedEntityType.ToString(),
                    a.DueDateUtc,
                    a.CompletedDateUtc,
                    ComputeStatus(a.DueDateUtc, a.CompletedDateUtc));
            })
            .ToList();

        var myTasks = myTasksRaw
            .Select(a =>
            {
                var relatedId = a.RelatedEntityId == Guid.Empty ? (Guid?)null : a.RelatedEntityId;
                return new UpcomingActivityDto(
                    a.Id,
                    a.Subject,
                    a.Type.ToString(),
                    relatedId,
                    ResolveCustomerName(a.RelatedEntityType, relatedId, accountLookup, contactLookup, opportunityLookup),
                    a.RelatedEntityType.ToString(),
                    a.DueDateUtc,
                    a.CompletedDateUtc,
                    ComputeStatus(a.DueDateUtc, a.CompletedDateUtc));
            })
            .ToList();

        var monthStart = new DateTime(now.Year, now.Month, 1);
        var sixMonthStart = monthStart.AddMonths(-5);
        var monthEnd = monthStart.AddMonths(1);
        var monthBuckets = Enumerable.Range(0, 6)
            .Select(offset => monthStart.AddMonths(offset - 5))
            .ToList();
        var monthKeyedLabels = monthBuckets.ToDictionary(
            bucket => (bucket.Year, bucket.Month),
            bucket => bucket.ToString("MMM yyyy", CultureInfo.InvariantCulture));

        var revenueRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon);
        if (visibility.UserIds is not null)
        {
            revenueRowsQuery = revenueRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var revenueRows = await revenueRowsQuery
            .Select(o => new
            {
                ClosedAt = o.ExpectedCloseDate ?? o.UpdatedAtUtc ?? o.CreatedAtUtc,
                o.Amount
            })
            .Where(o => o.ClosedAt >= sixMonthStart && o.ClosedAt < monthEnd)
            .ToListAsync(cancellationToken);

        var revenueLookup = revenueRows
            .GroupBy(row => (row.ClosedAt.Year, row.ClosedAt.Month))
            .ToDictionary(group => group.Key, group => group.Sum(row => row.Amount));

        var revenueByMonth = monthBuckets
            .Select(bucket =>
            {
                var key = (bucket.Year, bucket.Month);
                return new ChartDataPointDto(
                    monthKeyedLabels[key],
                    revenueLookup.TryGetValue(key, out var value) ? value : 0);
            })
            .ToList();

        var customerRowsQuery = _dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted && a.CreatedAtUtc >= sixMonthStart && a.CreatedAtUtc < monthEnd);
        if (visibility.UserIds is not null)
        {
            customerRowsQuery = customerRowsQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }
        var customerRows = await customerRowsQuery
            .Select(a => new { a.CreatedAtUtc })
            .ToListAsync(cancellationToken);

        var customerLookup = customerRows
            .GroupBy(row => (row.CreatedAtUtc.Year, row.CreatedAtUtc.Month))
            .ToDictionary(group => group.Key, group => group.Count());

        var customerGrowth = monthBuckets
            .Select(bucket =>
            {
                var key = (bucket.Year, bucket.Month);
                return new ChartDataPointDto(
                    monthKeyedLabels[key],
                    customerLookup.TryGetValue(key, out var value) ? value : 0);
            })
            .ToList();

        var activityWindowStart = now.AddDays(-30);
        var activityRowsQuery = _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && (a.CompletedDateUtc ?? a.DueDateUtc ?? a.CreatedAtUtc) >= activityWindowStart);
        if (visibility.UserIds is not null)
        {
            activityRowsQuery = activityRowsQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }
        var activityRows = await activityRowsQuery
            .Select(a => new
            {
                a.Type,
                ActivityAt = a.CompletedDateUtc ?? a.DueDateUtc ?? a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var activityTotal = activityRows.Count;
        var activityBreakdown = activityRows
            .GroupBy(row => row.Type)
            .Select(group =>
            {
                var count = group.Count();
                var percent = activityTotal == 0 ? 0 : (int)Math.Round(count * 100d / activityTotal);
                return new ActivityBreakdownItemDto(group.Key.ToString(), count, percent);
            })
            .OrderByDescending(item => item.Count)
            .ToList();

        var conversionRowsQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.CreatedAtUtc >= sixMonthStart && l.CreatedAtUtc < monthEnd);
        if (visibility.UserIds is not null)
        {
            conversionRowsQuery = conversionRowsQuery.Where(l => visibility.UserIds.Contains(l.OwnerId));
        }
        var conversionRows = await conversionRowsQuery
            .Select(l => new { l.CreatedAtUtc, l.QualifiedAtUtc, l.ConvertedAtUtc })
            .ToListAsync(cancellationToken);

        var conversionTrend = monthBuckets
            .Select(bucket =>
            {
                var created = conversionRows
                    .Where(row => row.CreatedAtUtc.Year == bucket.Year && row.CreatedAtUtc.Month == bucket.Month)
                    .ToList();
                if (created.Count == 0)
                {
                    return new ChartDataPointDto(monthKeyedLabels[(bucket.Year, bucket.Month)], 0);
                }

                var qualified = created.Count(row => row.QualifiedAtUtc.HasValue || row.ConvertedAtUtc.HasValue);
                var percent = (decimal)Math.Round(qualified * 100d / created.Count);
                return new ChartDataPointDto(monthKeyedLabels[(bucket.Year, bucket.Month)], percent);
            })
            .ToList();

        var topWindowStart = now.AddDays(-90);
        var performerRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon);
        if (visibility.UserIds is not null)
        {
            performerRowsQuery = performerRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var performerRows = await performerRowsQuery
            .Select(o => new
            {
                o.OwnerId,
                o.Amount,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= topWindowStart)
            .ToListAsync(cancellationToken);

        // Keep Top Performers relevant even when there are no recent wins by falling back to
        // live open-pipeline ownership/value in the same recency window.
        if (performerRows.Count == 0)
        {
            var performerFallbackQuery = _dbContext.Opportunities
                .AsNoTracking()
                .Where(o => !o.IsDeleted && !o.IsClosed);
            if (visibility.UserIds is not null)
            {
                performerFallbackQuery = performerFallbackQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
            }

            performerRows = await performerFallbackQuery
                .Select(o => new
                {
                    o.OwnerId,
                    o.Amount,
                    ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
                })
                .Where(o => o.ClosedAt >= topWindowStart)
                .ToListAsync(cancellationToken);
        }

        var performerGroups = performerRows
            .GroupBy(row => row.OwnerId)
            .Select(group => new
            {
                OwnerId = group.Key,
                Deals = group.Count(),
                Revenue = group.Sum(row => row.Amount)
            })
            .OrderByDescending(group => group.Revenue)
            .Take(5)
            .ToList();

        var performerOwnerIds = performerGroups.Select(group => group.OwnerId).ToList();
        var performerOwners = await _dbContext.Users
            .AsNoTracking()
            .Where(u => performerOwnerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var topPerformers = performerGroups
            .Select(group => new PerformerSummaryDto(
                performerOwners.FirstOrDefault(owner => owner.Id == group.OwnerId)?.FullName ?? "Unknown",
                group.Deals,
                group.Revenue,
                null))
            .ToList();

        var monthLeadOwnersQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.CreatedAtUtc >= monthStart && l.CreatedAtUtc < monthEnd);
        if (visibility.UserIds is not null)
        {
            monthLeadOwnersQuery = monthLeadOwnersQuery.Where(l => visibility.UserIds.Contains(l.OwnerId));
        }
        var monthLeadOwners = await monthLeadOwnersQuery
            .Select(l => l.OwnerId)
            .ToListAsync(cancellationToken);

        var monthQualifiedOwnersQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.QualifiedAtUtc.HasValue && l.QualifiedAtUtc.Value >= monthStart && l.QualifiedAtUtc.Value < monthEnd);
        if (visibility.UserIds is not null)
        {
            monthQualifiedOwnersQuery = monthQualifiedOwnersQuery.Where(l => visibility.UserIds.Contains(l.OwnerId));
        }
        var monthQualifiedOwners = await monthQualifiedOwnersQuery
            .Select(l => l.OwnerId)
            .ToListAsync(cancellationToken);

        var monthOpportunityOwnersQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.CreatedAtUtc >= monthStart && o.CreatedAtUtc < monthEnd);
        if (visibility.UserIds is not null)
        {
            monthOpportunityOwnersQuery = monthOpportunityOwnersQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var monthOpportunityOwners = await monthOpportunityOwnersQuery
            .Select(o => o.OwnerId)
            .ToListAsync(cancellationToken);

        var monthWonRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon);
        if (visibility.UserIds is not null)
        {
            monthWonRowsQuery = monthWonRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var monthWonRows = await monthWonRowsQuery
            .Select(o => new
            {
                o.OwnerId,
                o.Amount,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= monthStart && o.ClosedAt < monthEnd)
            .ToListAsync(cancellationToken);

        var teamOwnerIds = monthLeadOwners
            .Concat(monthQualifiedOwners)
            .Concat(monthOpportunityOwners)
            .Concat(monthWonRows.Select(row => row.OwnerId))
            .Distinct()
            .ToList();

        var teamOwners = await _dbContext.Users
            .AsNoTracking()
            .Where(u => teamOwnerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var teamMonthlyKpis = teamOwnerIds
            .Select(ownerId => new TeamMonthlyKpiDto(
                ownerId,
                teamOwners.FirstOrDefault(owner => owner.Id == ownerId)?.FullName ?? "Unknown",
                monthLeadOwners.Count(id => id == ownerId),
                monthQualifiedOwners.Count(id => id == ownerId),
                monthOpportunityOwners.Count(id => id == ownerId),
                monthWonRows.Count(row => row.OwnerId == ownerId),
                monthWonRows.Where(row => row.OwnerId == ownerId).Sum(row => row.Amount)))
            .OrderByDescending(kpi => kpi.RevenueWon)
            .ToList();

        var closedStatsWindowStart = now.AddDays(-90);
        var closedStatsRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed);
        if (visibility.UserIds is not null)
        {
            closedStatsRowsQuery = closedStatsRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var closedStatsRows = await closedStatsRowsQuery
            .Select(o => new
            {
                o.Amount,
                o.IsWon,
                o.CreatedAtUtc,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= closedStatsWindowStart)
            .ToListAsync(cancellationToken);

        var closedTotal = closedStatsRows.Count;
        var wonRows = closedStatsRows.Where(row => row.IsWon).ToList();
        var wonCount = wonRows.Count;
        var avgDealSize = wonCount == 0 ? 0 : wonRows.Sum(row => row.Amount) / wonCount;
        var winRate = closedTotal == 0 ? 0 : (int)Math.Round(wonCount * 100d / closedTotal);
        var avgSalesCycle = closedTotal == 0
            ? 0
            : (int)Math.Round(closedStatsRows.Average(row => (row.ClosedAt - row.CreatedAtUtc).TotalDays));

        var tenantDefaultContractTermMonths = await _dbContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == _tenantProvider.TenantId)
            .Select(t => t.DefaultContractTermMonths)
            .FirstOrDefaultAsync(cancellationToken);
        var defaultContractTermMonths = Math.Max(tenantDefaultContractTermMonths ?? 12, 1);

        var activeContractsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted
                        && o.IsClosed
                        && o.IsWon
                        && (o.ContractStartDateUtc ?? o.CreatedAtUtc) <= now
                        && (!o.ContractEndDateUtc.HasValue || o.ContractEndDateUtc.Value >= now));
        if (visibility.UserIds is not null)
        {
            activeContractsQuery = activeContractsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var activeContracts = await activeContractsQuery
            .Select(o => new
            {
                o.Amount,
                StartAt = o.ContractStartDateUtc ?? o.CreatedAtUtc,
                o.ContractEndDateUtc
            })
            .ToListAsync(cancellationToken);

        decimal ResolveContractMonths(DateTime startAt, DateTime? endAt)
        {
            if (!endAt.HasValue || endAt.Value <= startAt)
            {
                return defaultContractTermMonths;
            }

            var months = (decimal)((endAt.Value - startAt).TotalDays / 30.4375d);
            return Math.Max(1m, Math.Round(months, 2));
        }

        var monthlyRecurringRevenue = activeContracts.Sum(contract =>
        {
            var termMonths = ResolveContractMonths(contract.StartAt, contract.ContractEndDateUtc);
            return termMonths <= 0 ? 0 : contract.Amount / termMonths;
        });

        var wonTwelveMonthStart = now.AddMonths(-12);
        var wonTwelveMonthRowsQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon);
        if (visibility.UserIds is not null)
        {
            wonTwelveMonthRowsQuery = wonTwelveMonthRowsQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }
        var wonTwelveMonthRows = await wonTwelveMonthRowsQuery
            .Select(o => new
            {
                o.AccountId,
                o.Amount,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= wonTwelveMonthStart)
            .ToListAsync(cancellationToken);

        var wonTwelveMonthRevenue = wonTwelveMonthRows.Sum(row => row.Amount);
        var wonTwelveMonthAccounts = wonTwelveMonthRows
            .Select(row => row.AccountId)
            .Distinct()
            .Count();
        var customerLifetimeValue = wonTwelveMonthAccounts == 0
            ? 0
            : wonTwelveMonthRevenue / wonTwelveMonthAccounts;

        var accountLifecycleRowsQuery = _dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted);
        if (visibility.UserIds is not null)
        {
            accountLifecycleRowsQuery = accountLifecycleRowsQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }
        var accountLifecycleRows = await accountLifecycleRowsQuery
            .Select(a => a.LifecycleStage)
            .ToListAsync(cancellationToken);

        var totalCustomerPopulation = accountLifecycleRows.Count(stage =>
            string.IsNullOrWhiteSpace(stage)
            || string.Equals(stage, "Customer", StringComparison.OrdinalIgnoreCase)
            || stage.Contains("churn", StringComparison.OrdinalIgnoreCase));
        var churnedCustomers = accountLifecycleRows.Count(stage =>
            !string.IsNullOrWhiteSpace(stage)
            && stage.Contains("churn", StringComparison.OrdinalIgnoreCase));
        var churnRate = totalCustomerPopulation == 0
            ? 0m
            : Math.Round((decimal)churnedCustomers * 100m / totalCustomerPopulation, 2);

        var leadTruthMetricsQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted);
        if (visibility.UserIds is not null)
        {
            leadTruthMetricsQuery = leadTruthMetricsQuery.Where(l => visibility.UserIds.Contains(l.OwnerId));
        }
        var leadTruthMetrics = await leadTruthMetricsQuery
            .Select(l => new
            {
                l.CreatedAtUtc,
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var leadInsights = leadTruthMetrics.Select(l => BuildDashboardQualificationInsights(
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc))
            .ToList();

        var avgQualificationConfidence = leadInsights.Count == 0 ? 0m : leadInsights.Average(i => i.Confidence);
        var avgTruthCoverage = leadInsights.Count == 0 ? 0m : leadInsights.Average(i => i.TruthCoverage);

        var checklistRiskActivitiesQuery = _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.ExternalReference != null
                        && a.ExternalReference.StartsWith("opportunity-checklist-risk:")
                        && !a.CompletedDateUtc.HasValue);
        if (visibility.UserIds is not null)
        {
            checklistRiskActivitiesQuery = checklistRiskActivitiesQuery.Where(a => visibility.UserIds.Contains(a.OwnerId));
        }
        var checklistRiskSubjects = await checklistRiskActivitiesQuery
            .Select(a => a.Subject)
            .ToListAsync(cancellationToken);
        var checklistRiskFlags = checklistRiskSubjects
            .Select(subject =>
            {
                if (string.IsNullOrWhiteSpace(subject))
                {
                    return "Checklist risk";
                }

                var normalized = subject.Trim();
                if (normalized.StartsWith("Risk: ", StringComparison.OrdinalIgnoreCase))
                {
                    normalized = normalized["Risk: ".Length..];
                }

                var checklistMarker = " checklist";
                var markerIndex = normalized.IndexOf(checklistMarker, StringComparison.OrdinalIgnoreCase);
                if (markerIndex > 0)
                {
                    normalized = normalized[..markerIndex];
                }

                return $"{normalized} checklist blocked";
            })
            .ToList();

        var allRiskFlags = leadInsights
            .SelectMany(i => i.RiskFlags)
            .Concat(checklistRiskFlags)
            .Where(flag => !string.IsNullOrWhiteSpace(flag))
            .ToList();

        var riskRegisterCount = allRiskFlags.Count;
        var topRiskFlags = allRiskFlags
            .GroupBy(flag => flag, StringComparer.OrdinalIgnoreCase)
            .Select(group => new RiskFlagSummaryDto(group.Key, group.Count()))
            .OrderByDescending(item => item.Count)
            .Take(5)
            .ToList();

        var timeToTruthDays = leadTruthMetrics.Select(l =>
        {
            var validations = new[]
            {
                l.BudgetValidatedAtUtc,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFitValidatedAtUtc
            };

            var lastValidation = validations.Where(v => v.HasValue).Select(v => v!.Value).DefaultIfEmpty().Max();
            if (lastValidation == default)
            {
                return (double?)null;
            }

            return (lastValidation - l.CreatedAtUtc).TotalDays;
        }).Where(v => v.HasValue).Select(v => v!.Value).ToList();

        var avgTimeToTruthDays = timeToTruthDays.Count == 0 ? 0m : (decimal)Math.Round(timeToTruthDays.Average(), 1);

        var confidenceWeightedPipelineValue = pipelineRows
            .Sum(row => row.Amount * GetStageConfidence(stageConfidenceMap, row.Stage));

        var myPipelineValueTotal = 0m;
        var myConfidenceWeightedPipelineValue = 0m;
        decimal? myQuotaTarget = null;
        if (userId.HasValue)
        {
            var myRows = pipelineRows.Where(row => row.OwnerId == userId.Value).ToList();
            myPipelineValueTotal = myRows.Sum(row => row.Amount);
            myConfidenceWeightedPipelineValue = myRows.Sum(row => row.Amount * GetStageConfidence(stageConfidenceMap, row.Stage));
            myQuotaTarget = await _dbContext.Users
                .AsNoTracking()
                .Where(u => u.Id == userId.Value && !u.IsDeleted)
                .Select(u => u.MonthlyQuota)
                .SingleOrDefaultAsync(cancellationToken);
        }

        var forecastScenarios = BuildForecastScenarios(pipelineRows, confidenceWeightedPipelineValue);

        return new DashboardSummaryDto(
            totalCustomers,
            leads,
            prospects,
            activeCustomers,
            openOpportunities,
            pipelineValueTotal,
            tasksDueToday,
            upcomingActivitiesCount,
            overdueActivitiesCount,
            atRiskOpportunities,
            opportunitiesWithoutNextStep,
            recentCustomers,
            activitiesNextWeek,
            myTasks,
            teamMonthlyKpis,
            pipelineValueStages,
            revenueByMonth,
            customerGrowth,
            activityBreakdown,
            conversionTrend,
            topPerformers,
            newlyAssignedLeads,
            atRiskDetails,
            avgDealSize,
            winRate,
            avgSalesCycle,
            Math.Round(monthlyRecurringRevenue, 2),
            Math.Round(customerLifetimeValue, 2),
            churnRate,
            Math.Round(avgQualificationConfidence, 2),
            Math.Round(avgTruthCoverage, 2),
            avgTimeToTruthDays,
            riskRegisterCount,
            topRiskFlags,
            Math.Round(confidenceWeightedPipelineValue, 2),
            Math.Round(costOfNotKnowingValue, 2),
            costOfNotKnowingDeals,
            sortedCostBreakdown,
            costOfNotKnowingTrend,
            Math.Round(confidenceCalibrationScore, 1),
            confidenceCalibrationSample,
            Math.Round(myPipelineValueTotal, 2),
            Math.Round(myConfidenceWeightedPipelineValue, 2),
            myQuotaTarget,
            forecastScenarios);
    }

    public async Task<ManagerPipelineHealthDto> GetManagerPipelineHealthAsync(Guid? userId, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var visibility = await ResolveVisibilityAsync(userId, cancellationToken);

        var opportunitiesQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Include(o => o.Stage)
            .Include(o => o.Account)
            .Where(o => !o.IsDeleted && !o.IsClosed);

        if (visibility.UserIds is not null)
        {
            opportunitiesQuery = opportunitiesQuery.Where(o => visibility.UserIds.Contains(o.OwnerId));
        }

        var openOpportunities = await opportunitiesQuery
            .Select(o => new
            {
                o.Id,
                o.Name,
                AccountName = o.Account != null ? o.Account.Name : "Unassigned",
                Stage = o.Stage != null ? o.Stage.Name : "Prospecting",
                o.Amount,
                o.OwnerId,
                o.ExpectedCloseDate,
                o.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        if (openOpportunities.Count == 0)
        {
            return new ManagerPipelineHealthDto(
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                new List<PipelineStageDto>(),
                new List<RiskFlagSummaryDto>(),
                new List<ManagerReviewDealDto>());
        }

        var opportunityIds = openOpportunities.Select(o => o.Id).ToList();

        var activityRows = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && opportunityIds.Contains(a.RelatedEntityId))
            .Select(a => new
            {
                a.RelatedEntityId,
                a.DueDateUtc,
                a.CompletedDateUtc,
                a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var activityLookup = activityRows
            .GroupBy(a => a.RelatedEntityId)
            .ToDictionary(
                g => g.Key,
                g =>
                {
                    var lastActivityAtUtc = g.Max(a => (DateTime?)(a.CompletedDateUtc ?? a.CreatedAtUtc));
                    var nextStepDueAtUtc = g
                        .Where(a => a.CompletedDateUtc == null && a.DueDateUtc.HasValue)
                        .OrderBy(a => a.DueDateUtc)
                        .Select(a => a.DueDateUtc)
                        .FirstOrDefault();
                    return (lastActivityAtUtc, nextStepDueAtUtc);
                });

        var stageHistoryRows = await _dbContext.OpportunityStageHistories
            .AsNoTracking()
            .Where(h => opportunityIds.Contains(h.OpportunityId))
            .GroupBy(h => h.OpportunityId)
            .Select(g => new { OpportunityId = g.Key, LastStageChange = g.Max(x => x.ChangedAtUtc) })
            .ToListAsync(cancellationToken);

        var stageHistoryLookup = stageHistoryRows.ToDictionary(x => x.OpportunityId, x => x.LastStageChange);

        var ownerIds = openOpportunities.Select(o => o.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .AsNoTracking()
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var leadQualificationRows = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted
                        && l.ConvertedOpportunityId.HasValue
                        && opportunityIds.Contains(l.ConvertedOpportunityId.Value))
            .Select(l => new LeadQualificationRow(
                l.ConvertedOpportunityId!.Value,
                l.CreatedAtUtc,
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc))
            .ToListAsync(cancellationToken);

        var leadByOpportunity = leadQualificationRows
            .GroupBy(l => l.OpportunityId)
            .ToDictionary(
                group => group.Key,
                group => group.OrderByDescending(l => l.CreatedAtUtc).First());

        var pipelineTruthGaps = leadQualificationRows
            .Select(l => BuildDashboardQualificationInsights(
                l.BudgetAvailability,
                l.BudgetEvidence,
                l.BudgetValidatedAtUtc,
                l.ReadinessToSpend,
                l.ReadinessEvidence,
                l.ReadinessValidatedAtUtc,
                l.BuyingTimeline,
                l.TimelineEvidence,
                l.BuyingTimelineValidatedAtUtc,
                l.ProblemSeverity,
                l.ProblemEvidence,
                l.ProblemSeverityValidatedAtUtc,
                l.EconomicBuyer,
                l.EconomicBuyerEvidence,
                l.EconomicBuyerValidatedAtUtc,
                l.IcpFit,
                l.IcpFitEvidence,
                l.IcpFitValidatedAtUtc))
            .SelectMany(i => i.RiskFlags)
            .Where(flag => !string.IsNullOrWhiteSpace(flag))
            .GroupBy(flag => flag, StringComparer.OrdinalIgnoreCase)
            .Select(group => new RiskFlagSummaryDto(group.Key, group.Count()))
            .OrderByDescending(item => item.Count)
            .Take(5)
            .ToList();

        var opportunityStages = await _dbContext.OpportunityStages
            .AsNoTracking()
            .Where(s => !s.IsDeleted)
            .Select(s => new { s.Name, s.Order })
            .ToListAsync(cancellationToken);
        var stageOrderLookup = opportunityStages
            .Where(s => !string.IsNullOrWhiteSpace(s.Name))
            .GroupBy(s => s.Name, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(g => g.Key, g => g.Min(x => x.Order), StringComparer.OrdinalIgnoreCase);

        var pipelineByStage = openOpportunities
            .GroupBy(o => o.Stage)
            .Select(group => new PipelineStageDto(group.Key, group.Count(), group.Sum(o => o.Amount)))
            .OrderBy(stage => stageOrderLookup.TryGetValue(stage.Stage ?? string.Empty, out var order) ? order : int.MaxValue)
            .ThenBy(stage => stage.Stage)
            .ToList();

        var pipelineValueTotal = pipelineByStage.Sum(stage => stage.Value);

        var reviewQueue = new List<ManagerReviewDealDto>();
        var coachingOpenCount = 0;
        var coachingOverdueCount = 0;
        var coachingEscalationsLast7Days = 0;
        var approvalPendingCount = 0;
        var approvalCycleAvgHours = 0m;
        var reviewNeedsWorkCount = 0;
        var reviewEscalatedCount = 0;
        var reviewAckOverdueCount = 0;
        var reviewAckAvgHours = 0m;
        var missingNextStepCount = 0;
        var nextStepOverdueCount = 0;
        var noRecentActivityCount = 0;
        var closeDateOverdueCount = 0;
        var stuckStageCount = 0;

        foreach (var opportunity in openOpportunities)
        {
            activityLookup.TryGetValue(opportunity.Id, out var activityInfo);
            var nextStepDueAtUtc = activityInfo.nextStepDueAtUtc;
            var lastActivityAtUtc = activityInfo.lastActivityAtUtc;

            var lastStageChange = stageHistoryLookup.TryGetValue(opportunity.Id, out var changedAt)
                ? changedAt
                : opportunity.CreatedAtUtc;

            var stageAgeDays = (now - lastStageChange).TotalDays;

            var reasons = new List<string>();

            if (!nextStepDueAtUtc.HasValue)
            {
                missingNextStepCount++;
                reasons.Add("Missing next step");
            }
            else if (nextStepDueAtUtc.Value < now)
            {
                nextStepOverdueCount++;
                reasons.Add("Next step overdue");
            }

            if (lastActivityAtUtc.HasValue && (now - lastActivityAtUtc.Value).TotalDays > InactivityThresholdDays)
            {
                noRecentActivityCount++;
                reasons.Add("No recent activity");
            }

            if (opportunity.ExpectedCloseDate.HasValue && opportunity.ExpectedCloseDate.Value.Date < now.Date)
            {
                closeDateOverdueCount++;
                reasons.Add("Close date passed");
            }

            if (stageAgeDays > StuckStageThresholdDays)
            {
                stuckStageCount++;
                reasons.Add("Stuck in stage");
            }

            if (reasons.Count == 0)
            {
                continue;
            }

            decimal? truthCoverage = null;
            decimal? timeToTruthDays = null;
            if (leadByOpportunity.TryGetValue(opportunity.Id, out var leadRow))
            {
                var insights = BuildDashboardQualificationInsights(
                    leadRow.BudgetAvailability,
                    leadRow.BudgetEvidence,
                    leadRow.BudgetValidatedAtUtc,
                    leadRow.ReadinessToSpend,
                    leadRow.ReadinessEvidence,
                    leadRow.ReadinessValidatedAtUtc,
                    leadRow.BuyingTimeline,
                    leadRow.TimelineEvidence,
                    leadRow.BuyingTimelineValidatedAtUtc,
                    leadRow.ProblemSeverity,
                    leadRow.ProblemEvidence,
                    leadRow.ProblemSeverityValidatedAtUtc,
                    leadRow.EconomicBuyer,
                    leadRow.EconomicBuyerEvidence,
                    leadRow.EconomicBuyerValidatedAtUtc,
                    leadRow.IcpFit,
                    leadRow.IcpFitEvidence,
                    leadRow.IcpFitValidatedAtUtc);

                truthCoverage = Math.Round(insights.TruthCoverage, 2);

                var validations = new[]
                {
                    leadRow.BudgetValidatedAtUtc,
                    leadRow.ReadinessValidatedAtUtc,
                    leadRow.BuyingTimelineValidatedAtUtc,
                    leadRow.ProblemSeverityValidatedAtUtc,
                    leadRow.EconomicBuyerValidatedAtUtc,
                    leadRow.IcpFitValidatedAtUtc
                };

                var lastValidation = validations.Where(v => v.HasValue).Select(v => v!.Value).DefaultIfEmpty().Max();
                if (lastValidation != default)
                {
                    timeToTruthDays = (decimal)Math.Round((lastValidation - leadRow.CreatedAtUtc).TotalDays, 1);
                }
            }

            var ownerName = owners.FirstOrDefault(o => o.Id == opportunity.OwnerId)?.FullName ?? "Unassigned";
            reviewQueue.Add(new ManagerReviewDealDto(
                opportunity.Id,
                opportunity.Name,
                opportunity.AccountName,
                opportunity.Stage,
                opportunity.Amount,
                ownerName,
                string.Join(" • ", reasons),
                truthCoverage,
                timeToTruthDays,
                nextStepDueAtUtc,
                lastActivityAtUtc,
                opportunity.ExpectedCloseDate));
        }

        var orderedReviewQueue = reviewQueue
            .OrderByDescending(item => item.Reason.Contains("Missing next step"))
            .ThenByDescending(item => item.Reason.Contains("Next step overdue"))
            .ThenByDescending(item => item.Reason.Contains("Close date passed"))
            .ThenByDescending(item => item.Reason.Contains("No recent activity"))
            .ThenByDescending(item => item.Reason.Contains("Stuck in stage"))
            .ThenBy(item => item.NextStepDueAtUtc ?? DateTime.MaxValue)
            .Take(10)
            .ToList();

        var coachingTasks = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.Type == ActivityType.Task
                        && a.Subject.StartsWith("Coaching:"))
            .Select(a => new { a.CompletedDateUtc, a.DueDateUtc })
            .ToListAsync(cancellationToken);

        coachingOpenCount = coachingTasks.Count(a => !a.CompletedDateUtc.HasValue);
        coachingOverdueCount = coachingTasks.Count(a => !a.CompletedDateUtc.HasValue
                                                       && a.DueDateUtc.HasValue
                                                       && a.DueDateUtc.Value < now);

        coachingEscalationsLast7Days = await _dbContext.AuditEvents
            .AsNoTracking()
            .CountAsync(a => a.EntityType == "Activity"
                             && a.Action == "CoachingEscalation"
                             && a.CreatedAtUtc >= now.AddDays(-7), cancellationToken);

        approvalPendingCount = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .CountAsync(a => !a.IsDeleted && a.Status == "Pending", cancellationToken);

        var approvalCycles = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.DecisionOn.HasValue
                        && a.DecisionOn.Value >= now.AddDays(-30))
            .Select(a => new { a.RequestedOn, a.DecisionOn })
            .ToListAsync(cancellationToken);

        if (approvalCycles.Count > 0)
        {
            approvalCycleAvgHours = (decimal)approvalCycles
                .Average(a => (a.DecisionOn!.Value - a.RequestedOn).TotalHours);
        }

        var reviewOutcomes = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.Subject.StartsWith("Review:")
                        && a.CreatedAtUtc >= now.AddDays(-30))
            .Select(a => a.Outcome)
            .ToListAsync(cancellationToken);

        reviewNeedsWorkCount = reviewOutcomes.Count(o => o == "Needs Work");
        reviewEscalatedCount = reviewOutcomes.Count(o => o == "Escalated");

        var reviewAckTasks = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.Subject.StartsWith("Review acknowledgment:"))
            .Select(a => new { a.CreatedAtUtc, a.CompletedDateUtc, a.DueDateUtc })
            .ToListAsync(cancellationToken);

        reviewAckOverdueCount = reviewAckTasks.Count(a => !a.CompletedDateUtc.HasValue
                                                          && a.DueDateUtc.HasValue
                                                          && a.DueDateUtc.Value < now);

        var completedAckTasks = reviewAckTasks.Where(a => a.CompletedDateUtc.HasValue).ToList();
        if (completedAckTasks.Count > 0)
        {
            reviewAckAvgHours = (decimal)completedAckTasks
                .Average(a => (a.CompletedDateUtc!.Value - a.CreatedAtUtc).TotalHours);
        }

        return new ManagerPipelineHealthDto(
            openOpportunities.Count,
            pipelineValueTotal,
            missingNextStepCount,
            nextStepOverdueCount,
            noRecentActivityCount,
            closeDateOverdueCount,
            stuckStageCount,
            coachingOpenCount,
            coachingOverdueCount,
            coachingEscalationsLast7Days,
            approvalPendingCount,
            Math.Round(approvalCycleAvgHours, 1),
            reviewNeedsWorkCount,
            reviewEscalatedCount,
            reviewAckOverdueCount,
            Math.Round(reviewAckAvgHours, 1),
            pipelineByStage,
            pipelineTruthGaps,
            orderedReviewQueue);
    }

    private sealed record DashboardQualificationInsights(
        decimal Confidence,
        decimal TruthCoverage,
        IReadOnlyList<string> RiskFlags);

    private sealed record DashboardEpistemicFactor(
        string Label,
        EpistemicState State,
        decimal Confidence,
        DecayLevel DecayLevel,
        bool IsHighImpact);

    private static DashboardQualificationInsights BuildDashboardQualificationInsights(
        string? budgetAvailability,
        string? budgetEvidence,
        DateTime? budgetValidatedAtUtc,
        string? readinessToSpend,
        string? readinessEvidence,
        DateTime? readinessValidatedAtUtc,
        string? buyingTimeline,
        string? timelineEvidence,
        DateTime? buyingTimelineValidatedAtUtc,
        string? problemSeverity,
        string? problemEvidence,
        DateTime? problemSeverityValidatedAtUtc,
        string? economicBuyer,
        string? economicBuyerEvidence,
        DateTime? economicBuyerValidatedAtUtc,
        string? icpFit,
        string? icpFitEvidence,
        DateTime? icpFitValidatedAtUtc)
    {
        var factors = new List<DashboardEpistemicFactor>
        {
            BuildDashboardFactor("Budget availability", ResolveBudgetState(budgetAvailability), budgetEvidence, budgetValidatedAtUtc, true),
            BuildDashboardFactor("Readiness to spend", ResolveReadinessState(readinessToSpend), readinessEvidence, readinessValidatedAtUtc, false),
            BuildDashboardFactor("Buying timeline", ResolveTimelineState(buyingTimeline), timelineEvidence, buyingTimelineValidatedAtUtc, true),
            BuildDashboardFactor("Problem severity", ResolveProblemState(problemSeverity), problemEvidence, problemSeverityValidatedAtUtc, false),
            BuildDashboardFactor("Economic buyer", ResolveEconomicBuyerState(economicBuyer), economicBuyerEvidence, economicBuyerValidatedAtUtc, true),
            BuildDashboardFactor("ICP fit", ResolveIcpFitState(icpFit), icpFitEvidence, icpFitValidatedAtUtc, false)
        };

        var confidence = factors.Count == 0 ? 0m : factors.Average(f => f.Confidence);
        var truthCoverage = factors.Count == 0
            ? 0m
            : factors.Count(f => f.State == EpistemicState.Verified && f.Confidence >= 0.75m) / (decimal)factors.Count;

        var riskFlags = new List<string>();
        if (!IsMeaningfulFactor(buyingTimeline))
        {
            riskFlags.Add("No buying timeline");
        }
        if (!IsMeaningfulFactor(economicBuyer)
            || string.Equals(economicBuyer, "Buyer identified, not engaged", StringComparison.OrdinalIgnoreCase)
            || string.Equals(economicBuyer, "Influencer identified", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Economic buyer not engaged");
        }
        if (string.Equals(budgetAvailability, "Budget allocated and approved", StringComparison.OrdinalIgnoreCase)
            && string.Equals(readinessToSpend, "Not planning to spend", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Budget confirmed but no initiative");
        }
        if (string.Equals(icpFit, "Clearly out of ICP", StringComparison.OrdinalIgnoreCase))
        {
            riskFlags.Add("Weak ICP fit");
        }
        if (!IsMeaningfulFactor(problemSeverity))
        {
            riskFlags.Add("Problem severity unclear");
        }

        foreach (var factor in factors)
        {
            if (factor.State is EpistemicState.Unknown or EpistemicState.Assumed)
            {
                riskFlags.Add($"{factor.Label} needs validation");
            }
            if (factor.DecayLevel is DecayLevel.Moderate or DecayLevel.Strong)
            {
                riskFlags.Add($"{factor.Label} is stale");
            }
        }

        var deduped = riskFlags
            .Where(flag => !string.IsNullOrWhiteSpace(flag))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        return new DashboardQualificationInsights(confidence, truthCoverage, deduped);
    }

    private static DashboardEpistemicFactor BuildDashboardFactor(
        string label,
        EpistemicState state,
        string? evidence,
        DateTime? validatedAtUtc,
        bool isHighImpact)
    {
        var decayLevel = GetDecayLevel(validatedAtUtc);
        var confidence = ComputeFactorConfidence(state, evidence, decayLevel);
        return new DashboardEpistemicFactor(label, state, confidence, decayLevel, isHighImpact);
    }

    private sealed record ExposureFactor(
        string Key,
        string Label,
        EpistemicState State,
        decimal Weight,
        decimal Contribution);

    private static IReadOnlyList<CostOfNotKnowingFactorDto> BuildExposureBreakdown(
        LeadQualificationRow? leadRow,
        IReadOnlyDictionary<string, decimal> exposureWeights,
        decimal uncertaintyCost)
    {
        var factors = BuildExposureFactors(leadRow, exposureWeights);
        var missing = factors.Where(f => f.State != EpistemicState.Verified && f.Weight > 0).ToList();
        if (missing.Count == 0)
        {
            return Array.Empty<CostOfNotKnowingFactorDto>();
        }

        var totalWeight = missing.Sum(f => f.Weight);
        if (totalWeight <= 0)
        {
            return Array.Empty<CostOfNotKnowingFactorDto>();
        }

        var distributed = missing
            .Select(f => f with
            {
                Contribution = Math.Round(uncertaintyCost * (f.Weight / totalWeight), 2)
            })
            .OrderByDescending(f => f.Contribution)
            .Take(3)
            .Select(f => new CostOfNotKnowingFactorDto(
                f.Key,
                f.Label,
                f.Weight,
                f.Contribution,
                f.State.ToString()))
            .ToList();

        return distributed;
    }

    private static IReadOnlyList<ChartDataPointDto> BuildCostOfNotKnowingTrend(
        IReadOnlyList<PipelineExposureRow> pipelineRows,
        IReadOnlyDictionary<string, decimal> stageConfidenceMap,
        DateTime now)
    {
        if (pipelineRows.Count == 0)
        {
            return Array.Empty<ChartDataPointDto>();
        }

        var startOfWindow = now.Date.AddDays(-7 * 7);
        var points = new List<ChartDataPointDto>();

        for (var i = 0; i < 8; i += 1)
        {
            var windowStart = startOfWindow.AddDays(i * 7);
            var windowEnd = windowStart.AddDays(7);
            var label = windowStart.ToString("MMM d", CultureInfo.InvariantCulture);

            var windowRows = pipelineRows
                .Where(row => row.CreatedAtUtc < windowEnd)
                .ToList();

            if (windowRows.Count == 0)
            {
                points.Add(new ChartDataPointDto(label, 0));
                continue;
            }

            var totalExposure = windowRows.Sum(row =>
            {
                var qualificationScore = ComputeQualificationScore(row.Summary, row.Requirements, row.BuyingProcess, row.SuccessCriteria);
                var stageConfidence = GetStageConfidence(stageConfidenceMap, row.Stage);
                var confidenceScore = Math.Clamp((stageConfidence + qualificationScore) / 2m, 0m, 1m);
                return row.Amount * (1m - confidenceScore);
            });

            points.Add(new ChartDataPointDto(label, Math.Round(totalExposure, 2)));
        }

        return points;
    }

    private static IReadOnlyList<ExposureFactor> BuildExposureFactors(
        LeadQualificationRow? leadRow,
        IReadOnlyDictionary<string, decimal> exposureWeights)
    {
        var budget = BuildDashboardFactor(
            "Budget availability",
            ResolveBudgetState(leadRow?.BudgetAvailability),
            leadRow?.BudgetEvidence,
            leadRow?.BudgetValidatedAtUtc,
            true);
        var readiness = BuildDashboardFactor(
            "Readiness to spend",
            ResolveReadinessState(leadRow?.ReadinessToSpend),
            leadRow?.ReadinessEvidence,
            leadRow?.ReadinessValidatedAtUtc,
            false);
        var timeline = BuildDashboardFactor(
            "Buying timeline",
            ResolveTimelineState(leadRow?.BuyingTimeline),
            leadRow?.TimelineEvidence,
            leadRow?.BuyingTimelineValidatedAtUtc,
            true);
        var problem = BuildDashboardFactor(
            "Problem severity",
            ResolveProblemState(leadRow?.ProblemSeverity),
            leadRow?.ProblemEvidence,
            leadRow?.ProblemSeverityValidatedAtUtc,
            false);
        var economic = BuildDashboardFactor(
            "Economic buyer",
            ResolveEconomicBuyerState(leadRow?.EconomicBuyer),
            leadRow?.EconomicBuyerEvidence,
            leadRow?.EconomicBuyerValidatedAtUtc,
            true);
        var icp = BuildDashboardFactor(
            "ICP fit",
            ResolveIcpFitState(leadRow?.IcpFit),
            leadRow?.IcpFitEvidence,
            leadRow?.IcpFitValidatedAtUtc,
            false);

        return new List<ExposureFactor>
        {
            new("budget", budget.Label, budget.State, ResolveExposureWeight(exposureWeights, "budget", 25), 0m),
            new("timeline", timeline.Label, timeline.State, ResolveExposureWeight(exposureWeights, "timeline", 20), 0m),
            new("economicBuyer", economic.Label, economic.State, ResolveExposureWeight(exposureWeights, "economicBuyer", 20), 0m),
            new("problem", problem.Label, problem.State, ResolveExposureWeight(exposureWeights, "problem", 15), 0m),
            new("readiness", readiness.Label, readiness.State, ResolveExposureWeight(exposureWeights, "readiness", 10), 0m),
            new("icpFit", icp.Label, icp.State, ResolveExposureWeight(exposureWeights, "icpFit", 10), 0m)
        };
    }

    private static decimal ResolveExposureWeight(
        IReadOnlyDictionary<string, decimal> exposureWeights,
        string key,
        decimal fallback)
    {
        if (exposureWeights.TryGetValue(key, out var weight))
        {
            return weight;
        }

        return fallback;
    }

    private enum EpistemicState
    {
        Unknown,
        Assumed,
        Verified,
        Invalid
    }

    private enum DecayLevel
    {
        None,
        Light,
        Moderate,
        Strong
    }

    private static EpistemicState ResolveBudgetState(string? value) => ResolveState(value, BudgetStateMap);
    private static EpistemicState ResolveReadinessState(string? value) => ResolveState(value, ReadinessStateMap);
    private static EpistemicState ResolveTimelineState(string? value) => ResolveState(value, TimelineStateMap);
    private static EpistemicState ResolveProblemState(string? value) => ResolveState(value, ProblemStateMap);
    private static EpistemicState ResolveEconomicBuyerState(string? value) => ResolveState(value, EconomicBuyerStateMap);
    private static EpistemicState ResolveIcpFitState(string? value) => ResolveState(value, IcpFitStateMap);

    private static EpistemicState ResolveState(string? value, IReadOnlyDictionary<string, EpistemicState> map)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return EpistemicState.Unknown;
        }

        var normalized = value.Trim().ToLowerInvariant();
        if (map.TryGetValue(normalized, out var state))
        {
            return state;
        }

        return normalized.Contains("unknown", StringComparison.OrdinalIgnoreCase)
            ? EpistemicState.Unknown
            : EpistemicState.Assumed;
    }

    private static decimal ComputeFactorConfidence(EpistemicState state, string? evidence, DecayLevel decayLevel)
    {
        if (state == EpistemicState.Invalid)
        {
            return 0m;
        }

        var baseConfidence = state switch
        {
            EpistemicState.Verified => 0.8m,
            EpistemicState.Assumed => 0.55m,
            EpistemicState.Unknown => 0.4m,
            _ => 0.4m
        };

        var confidence = baseConfidence + EvidenceDelta(evidence) + DecayPenalty(decayLevel);

        if (state == EpistemicState.Verified && IsInferredEvidence(evidence))
        {
            confidence = Math.Min(confidence, 0.6m);
        }

        if (state == EpistemicState.Verified && IsNoEvidence(evidence))
        {
            confidence -= 0.05m;
        }

        return Math.Clamp(confidence, 0m, 1m);
    }

    private static decimal EvidenceDelta(string? evidence)
    {
        if (IsNoEvidence(evidence)) return -0.1m;

        var normalized = evidence!.Trim().ToLowerInvariant();
        return normalized switch
        {
            "written confirmation" => 0.2m,
            "direct buyer statement" => 0.2m,
            "observed behaviour" => 0.1m,
            "third-party confirmation" => 0.1m,
            "historical / prior deal" => -0.05m,
            "inferred from context" => -0.1m,
            _ => 0m
        };
    }

    private static bool IsNoEvidence(string? evidence)
    {
        return string.IsNullOrWhiteSpace(evidence)
               || string.Equals(evidence.Trim(), "No evidence yet", StringComparison.OrdinalIgnoreCase);
    }

    private static bool IsInferredEvidence(string? evidence)
    {
        if (string.IsNullOrWhiteSpace(evidence)) return false;
        return string.Equals(evidence.Trim(), "Inferred from context", StringComparison.OrdinalIgnoreCase);
    }

    private static DecayLevel GetDecayLevel(DateTime? validatedAtUtc)
    {
        if (!validatedAtUtc.HasValue) return DecayLevel.None;
        var days = (DateTime.UtcNow - validatedAtUtc.Value).TotalDays;
        if (days < 14) return DecayLevel.None;
        if (days < 30) return DecayLevel.Light;
        if (days < 60) return DecayLevel.Moderate;
        return DecayLevel.Strong;
    }

    private static decimal DecayPenalty(DecayLevel level)
    {
        return level switch
        {
            DecayLevel.Light => -0.05m,
            DecayLevel.Moderate => -0.1m,
            DecayLevel.Strong => -0.2m,
            _ => 0m
        };
    }

    private static IReadOnlyDictionary<string, decimal> BuildStageConfidenceMap(
        IEnumerable<CalibrationRow> calibrationRows)
    {
        var stageConfidence = new Dictionary<string, decimal>(DefaultStageConfidence, StringComparer.OrdinalIgnoreCase);
        var grouped = calibrationRows
            .GroupBy(row => row.Stage, StringComparer.OrdinalIgnoreCase)
            .Select(group => new
            {
                Stage = group.Key,
                Count = group.Count(),
                WinRate = group.Count(r => r.IsWon) / (decimal)group.Count()
            })
            .ToList();

        foreach (var item in grouped)
        {
            if (item.Count < 5)
            {
                continue;
            }

            stageConfidence[item.Stage] = Math.Clamp(item.WinRate, 0.1m, 0.9m);
        }

        return stageConfidence;
    }

    private static decimal ComputeCalibrationScore(
        IEnumerable<CalibrationRow> calibrationRows,
        IReadOnlyDictionary<string, decimal> stageConfidenceMap)
    {
        var rows = calibrationRows.ToList();
        if (rows.Count == 0)
        {
            return 0m;
        }

        var meanError = rows.Average(row =>
        {
            var predicted = GetStageConfidence(stageConfidenceMap, row.Stage);
            var actual = row.IsWon ? 1m : 0m;
            return Math.Abs(predicted - actual);
        });

        var score = 1m - meanError;
        return Math.Clamp(score * 100m, 0m, 100m);
    }

    private static IReadOnlyList<ForecastScenarioDto> BuildForecastScenarios(
        IReadOnlyList<PipelineExposureRow> pipelineRows,
        decimal baseWeightedValue)
    {
        if (pipelineRows.Count == 0)
        {
            return Array.Empty<ForecastScenarioDto>();
        }

        var baseValue = Math.Round(baseWeightedValue, 2);
        var baseCount = pipelineRows.Count;

        decimal conservativeValue = 0m;
        var conservativeCount = 0;
        foreach (var row in pipelineRows)
        {
            var category = row.ForecastCategory ?? string.Empty;
            var factor = category switch
            {
                var value when value.Equals("Best Case", StringComparison.OrdinalIgnoreCase) => 0m,
                var value when value.Equals("Pipeline", StringComparison.OrdinalIgnoreCase) => 0.5m,
                var value when value.Equals("Commit", StringComparison.OrdinalIgnoreCase) => 1m,
                var value when value.Equals("Closed", StringComparison.OrdinalIgnoreCase) => 1m,
                var value when value.Equals("Omitted", StringComparison.OrdinalIgnoreCase) => 0m,
                _ => 1m
            };

            if (factor <= 0m)
            {
                continue;
            }

            conservativeCount += 1;
            conservativeValue += row.Amount * factor;
        }

        var commitRows = pipelineRows
            .Where(row => string.Equals(row.ForecastCategory, "Commit", StringComparison.OrdinalIgnoreCase))
            .ToList();
        var commitValue = commitRows.Sum(row => row.Amount);

        var conservativeRounded = Math.Round(conservativeValue, 2);
        var commitRounded = Math.Round(commitValue, 2);

        return new[]
        {
            new ForecastScenarioDto("base", "Base forecast", baseValue, baseCount, 0m),
            new ForecastScenarioDto("conservative", "Conservative", conservativeRounded, conservativeCount, Math.Round(conservativeRounded - baseValue, 2)),
            new ForecastScenarioDto("commit", "Commit only", commitRounded, commitRows.Count, Math.Round(commitRounded - baseValue, 2))
        };
    }

    private static decimal GetStageConfidence(IReadOnlyDictionary<string, decimal> stageConfidenceMap, string stage)
    {
        if (stageConfidenceMap.TryGetValue(stage, out var confidence))
        {
            return confidence;
        }

        if (DefaultStageConfidence.TryGetValue(stage, out var fallback))
        {
            return fallback;
        }

        return 0.4m;
    }

    private static decimal ComputeQualificationScore(
        string? summary,
        string? requirements,
        string? buyingProcess,
        string? successCriteria)
    {
        var total = 0m;
        if (!string.IsNullOrWhiteSpace(summary)) total += 1m;
        if (!string.IsNullOrWhiteSpace(requirements)) total += 1m;
        if (!string.IsNullOrWhiteSpace(buyingProcess)) total += 1m;
        if (!string.IsNullOrWhiteSpace(successCriteria)) total += 1m;
        return total / 4m;
    }

    private static bool IsMeaningfulFactor(string? value)
    {
        return !string.IsNullOrWhiteSpace(value) && !IsUnknown(value);
    }

    private static bool IsUnknown(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return true;
        return value.Contains("unknown", StringComparison.OrdinalIgnoreCase);
    }

    private async Task<IReadOnlyDictionary<string, decimal>> ResolveExposureWeightsAsync(
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        var policy = ResolveQualificationPolicy(tenant);
        var weights = policy.ExposureWeights ?? Array.Empty<QualificationExposureWeight>();
        if (weights.Count == 0)
        {
            weights = QualificationPolicyDefaults.CreateDefault().ExposureWeights;
        }

        return weights
            .GroupBy(w => w.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Last().Weight);
    }

    private static QualificationPolicy ResolveQualificationPolicy(Tenant? tenant)
    {
        if (tenant is null || string.IsNullOrWhiteSpace(tenant.QualificationPolicyJson))
        {
            return QualificationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<QualificationPolicy>(tenant.QualificationPolicyJson, JsonOptions);
            return QualificationPolicyDefaults.Normalize(parsed);
        }
        catch (JsonException)
        {
            return QualificationPolicyDefaults.CreateDefault();
        }
    }

    private static readonly IReadOnlyDictionary<string, EpistemicState> BudgetStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not yet discussed"] = EpistemicState.Unknown,
        ["indicative range mentioned"] = EpistemicState.Assumed,
        ["budget allocated and approved"] = EpistemicState.Verified,
        ["budget identified but unapproved"] = EpistemicState.Assumed,
        ["no defined budget"] = EpistemicState.Invalid,
        ["budget explicitly unavailable"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> ReadinessStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / unclear"] = EpistemicState.Unknown,
        ["interest expressed, no urgency"] = EpistemicState.Assumed,
        ["actively evaluating solutions"] = EpistemicState.Assumed,
        ["internal decision in progress"] = EpistemicState.Verified,
        ["ready to proceed pending final step"] = EpistemicState.Verified,
        ["not planning to spend"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> TimelineStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not discussed"] = EpistemicState.Unknown,
        ["rough timeline mentioned"] = EpistemicState.Assumed,
        ["target date verbally confirmed"] = EpistemicState.Assumed,
        ["decision date confirmed internally"] = EpistemicState.Verified,
        ["date missed / repeatedly pushed"] = EpistemicState.Invalid,
        ["no defined timeline"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> ProblemStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not validated"] = EpistemicState.Unknown,
        ["mild inconvenience"] = EpistemicState.Assumed,
        ["recognized operational problem"] = EpistemicState.Assumed,
        ["critical business impact"] = EpistemicState.Verified,
        ["executive-level priority"] = EpistemicState.Verified,
        ["problem acknowledged but deprioritized"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> EconomicBuyerStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not identified"] = EpistemicState.Unknown,
        ["influencer identified"] = EpistemicState.Assumed,
        ["buyer identified, not engaged"] = EpistemicState.Assumed,
        ["buyer engaged in discussion"] = EpistemicState.Verified,
        ["buyer verbally supportive"] = EpistemicState.Verified,
        ["buyer explicitly not involved"] = EpistemicState.Invalid
    };

    private static readonly IReadOnlyDictionary<string, EpistemicState> IcpFitStateMap = new Dictionary<string, EpistemicState>(StringComparer.OrdinalIgnoreCase)
    {
        ["unknown / not assessed"] = EpistemicState.Unknown,
        ["partial icp fit"] = EpistemicState.Assumed,
        ["strong icp fit"] = EpistemicState.Verified,
        ["out-of-profile but exploratory"] = EpistemicState.Assumed,
        ["clearly out of icp"] = EpistemicState.Invalid
    };

    private async Task<DashboardOpportunityDto> BuildAtRiskDetailAsync(
        Guid opportunityId,
        string reason,
        DateTime? nextStepDueAtUtc,
        DateTime? lastActivityAtUtc,
        CancellationToken cancellationToken)
    {
        var record = await _dbContext.Opportunities
            .AsNoTracking()
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .Where(o => o.Id == opportunityId)
            .Select(o => new
            {
                o.Id,
                o.Name,
                AccountName = o.Account != null ? o.Account.Name : string.Empty,
                Stage = o.Stage != null ? o.Stage.Name : "Prospecting",
                o.Amount
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (record is null)
        {
            return new DashboardOpportunityDto(
                opportunityId,
                "Unknown opportunity",
                string.Empty,
                string.Empty,
                0,
                reason,
                nextStepDueAtUtc,
                lastActivityAtUtc);
        }

        return new DashboardOpportunityDto(
            record.Id,
            record.Name,
            record.AccountName,
            record.Stage,
            record.Amount,
            reason,
            nextStepDueAtUtc,
            lastActivityAtUtc);
    }

    private static string ComputeStatus(DateTime? dueDateUtc, DateTime? completedDateUtc)
    {
        if (completedDateUtc.HasValue) return "Completed";
        if (dueDateUtc.HasValue && dueDateUtc.Value < DateTime.UtcNow) return "Overdue";
        return "Upcoming";
    }

    private static string ResolveCustomerName(
        ActivityRelationType relationType,
        Guid? relatedEntityId,
        IReadOnlyDictionary<Guid, string> accountLookup,
        IReadOnlyDictionary<Guid, string> contactLookup,
        IReadOnlyDictionary<Guid, string> opportunityLookup)
    {
        if (!relatedEntityId.HasValue || relatedEntityId.Value == Guid.Empty)
        {
            return string.Empty;
        }

        var value = relatedEntityId.Value;
        return relationType switch
        {
            ActivityRelationType.Account when accountLookup.TryGetValue(value, out var accountName) => accountName,
            ActivityRelationType.Contact when contactLookup.TryGetValue(value, out var contactName) => contactName,
            ActivityRelationType.Opportunity when opportunityLookup.TryGetValue(value, out var opportunityName) => opportunityName,
            _ => string.Empty
        };
    }

    private sealed record VisibilityContext(RoleVisibilityScope Scope, IReadOnlyCollection<Guid>? UserIds);

    private async Task<VisibilityContext> ResolveVisibilityAsync(Guid? userId, CancellationToken cancellationToken)
    {
        if (!userId.HasValue)
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        var userInfo = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == userId.Value)
            .Select(u => new { u.Id, u.TenantId })
            .FirstOrDefaultAsync(cancellationToken);

        if (userInfo is null)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var roleRows = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && ur.UserId == userId.Value)
            .Join(_dbContext.Roles.AsNoTracking().Where(r => !r.IsDeleted && r.TenantId == userInfo.TenantId),
                ur => ur.RoleId,
                r => r.Id,
                (ur, r) => new { r.Id, r.HierarchyPath, r.VisibilityScope })
            .ToListAsync(cancellationToken);

        if (roleRows.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var effectiveScope = ResolveVisibilityScope(roleRows.Select(r => r.VisibilityScope));
        if (effectiveScope == RoleVisibilityScope.All)
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        if (effectiveScope == RoleVisibilityScope.Self)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var rolePaths = roleRows
            .Select(r => r.HierarchyPath)
            .Where(path => !string.IsNullOrWhiteSpace(path))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var descendantRoleIds = new HashSet<Guid>();
        if (rolePaths.Count > 0)
        {
            var tenantRoles = await _dbContext.Roles
                .AsNoTracking()
                .Where(r => !r.IsDeleted && r.TenantId == userInfo.TenantId && r.HierarchyPath != null)
                .Select(r => new { r.Id, r.HierarchyPath })
                .ToListAsync(cancellationToken);

            foreach (var role in tenantRoles)
            {
                if (role.HierarchyPath is null)
                {
                    continue;
                }

                if (rolePaths.Any(path => !string.IsNullOrWhiteSpace(path)
                                          && role.HierarchyPath.StartsWith(path, StringComparison.OrdinalIgnoreCase)))
                {
                    descendantRoleIds.Add(role.Id);
                }
            }
        }
        else
        {
            foreach (var role in roleRows)
            {
                descendantRoleIds.Add(role.Id);
            }
        }

        if (descendantRoleIds.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId.Value });
        }

        var teamUserIds = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && descendantRoleIds.Contains(ur.RoleId))
            .Select(ur => ur.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (!teamUserIds.Contains(userId.Value))
        {
            teamUserIds.Add(userId.Value);
        }

        return new VisibilityContext(RoleVisibilityScope.Team, teamUserIds);
    }

    private static RoleVisibilityScope ResolveVisibilityScope(IEnumerable<RoleVisibilityScope> scopes)
    {
        var scopeList = scopes.ToList();
        if (scopeList.Any(scope => scope == RoleVisibilityScope.All))
        {
            return RoleVisibilityScope.All;
        }

        if (scopeList.Any(scope => scope == RoleVisibilityScope.Team))
        {
            return RoleVisibilityScope.Team;
        }

        return RoleVisibilityScope.Self;
    }

    private sealed record DashboardActivityRaw(
        Guid Id,
        string Subject,
        ActivityType Type,
        ActivityRelationType RelatedEntityType,
        Guid RelatedEntityId,
        DateTime? DueDateUtc,
        DateTime? CompletedDateUtc);
}
