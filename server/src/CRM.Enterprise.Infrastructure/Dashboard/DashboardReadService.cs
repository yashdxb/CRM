using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CRM.Enterprise.Infrastructure.Dashboard;

public class DashboardReadService : IDashboardReadService
{
    private readonly CrmDbContext _dbContext;

    public DashboardReadService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
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

        var totalCustomers = await _dbContext.Accounts.CountAsync(a => !a.IsDeleted, cancellationToken);
        var leads = await _dbContext.Accounts.CountAsync(a => !a.IsDeleted && a.LifecycleStage == "Lead", cancellationToken);
        var prospects = await _dbContext.Accounts.CountAsync(a => !a.IsDeleted && a.LifecycleStage == "Prospect", cancellationToken);
        var activeCustomers = await _dbContext.Accounts.CountAsync(
            a => !a.IsDeleted && (a.LifecycleStage == "Customer" || a.LifecycleStage == null),
            cancellationToken);

        var openOpportunities = await _dbContext.Opportunities.CountAsync(
            o => !o.IsDeleted && !o.IsClosed,
            cancellationToken);

        var pipelineRows = await _dbContext.Opportunities
            .Where(o => !o.IsDeleted && !o.IsClosed)
            .Select(o => new
            {
                Stage = o.Stage != null ? o.Stage.Name : "Prospecting",
                o.Amount
            })
            .ToListAsync(cancellationToken);

        var pipelineValueStages = pipelineRows
            .GroupBy(row => row.Stage)
            .Select(group => new PipelineStageDto(group.Key, group.Count(), group.Sum(row => row.Amount)))
            .OrderBy(stage => stage.Stage)
            .ToList();

        var pipelineValueTotal = pipelineValueStages.Sum(stage => stage.Value);

        var tasksDueToday = await _dbContext.Activities.CountAsync(
            a => !a.IsDeleted && !a.CompletedDateUtc.HasValue && a.DueDateUtc.HasValue &&
                 a.DueDateUtc.Value >= startOfToday && a.DueDateUtc.Value < endOfToday,
            cancellationToken);

        var upcomingActivitiesCount = await _dbContext.Activities.CountAsync(
            a => !a.IsDeleted &&
                 !a.CompletedDateUtc.HasValue &&
                 a.DueDateUtc.HasValue &&
                 a.DueDateUtc.Value >= now &&
                 a.DueDateUtc.Value <= nextWeek,
            cancellationToken);

        var overdueActivitiesCount = await _dbContext.Activities.CountAsync(
            a => !a.IsDeleted && !a.CompletedDateUtc.HasValue && a.DueDateUtc < now,
            cancellationToken);

        var openOpportunityIds = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && !o.IsClosed)
            .Select(o => o.Id)
            .ToListAsync(cancellationToken);

        var atRiskOpportunities = 0;
        var opportunitiesWithoutNextStep = 0;
        var atRiskDetails = new List<DashboardOpportunityDto>();
        if (openOpportunityIds.Count > 0)
        {
            var opportunityActivityRows = await _dbContext.Activities
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

                var hasNextStep = nextStepDueAtUtc.HasValue;
                if (!hasNextStep)
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

        var recentCustomersRaw = await _dbContext.Accounts
            .Include(a => a.Contacts)
            .Where(a => !a.IsDeleted)
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

        var activitiesNextWeekRaw = await _dbContext.Activities
            .AsNoTracking()
            .Where(a =>
                !a.IsDeleted &&
                !a.CompletedDateUtc.HasValue &&
                a.DueDateUtc.HasValue &&
                a.DueDateUtc.Value >= now &&
                a.DueDateUtc.Value <= nextWeek)
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
                    l.CreatedAtUtc))
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

        var revenueRows = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon)
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

        var customerRows = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted && a.CreatedAtUtc >= sixMonthStart && a.CreatedAtUtc < monthEnd)
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
        var activityRows = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted && a.CreatedAtUtc >= activityWindowStart)
            .Select(a => a.Type)
            .ToListAsync(cancellationToken);

        var activityTotal = activityRows.Count;
        var activityBreakdown = activityRows
            .GroupBy(type => type)
            .Select(group =>
            {
                var count = group.Count();
                var percent = activityTotal == 0 ? 0 : (int)Math.Round(count * 100d / activityTotal);
                return new ActivityBreakdownItemDto(group.Key.ToString(), count, percent);
            })
            .OrderByDescending(item => item.Count)
            .ToList();

        var conversionRows = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.CreatedAtUtc >= sixMonthStart && l.CreatedAtUtc < monthEnd)
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
        var performerRows = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon)
            .Select(o => new
            {
                o.OwnerId,
                o.Amount,
                ClosedAt = o.UpdatedAtUtc ?? o.CreatedAtUtc
            })
            .Where(o => o.ClosedAt >= topWindowStart)
            .ToListAsync(cancellationToken);

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

        var monthLeadOwners = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.CreatedAtUtc >= monthStart && l.CreatedAtUtc < monthEnd)
            .Select(l => l.OwnerId)
            .ToListAsync(cancellationToken);

        var monthQualifiedOwners = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => !l.IsDeleted && l.QualifiedAtUtc.HasValue && l.QualifiedAtUtc.Value >= monthStart && l.QualifiedAtUtc.Value < monthEnd)
            .Select(l => l.OwnerId)
            .ToListAsync(cancellationToken);

        var monthOpportunityOwners = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.CreatedAtUtc >= monthStart && o.CreatedAtUtc < monthEnd)
            .Select(o => o.OwnerId)
            .ToListAsync(cancellationToken);

        var monthWonRows = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed && o.IsWon)
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
        var closedStatsRows = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && o.IsClosed)
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
            0,
            0,
            0);
    }

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

    private sealed record DashboardActivityRaw(
        Guid Id,
        string Subject,
        ActivityType Type,
        ActivityRelationType RelatedEntityType,
        Guid RelatedEntityId,
        DateTime? DueDateUtc,
        DateTime? CompletedDateUtc);
}
