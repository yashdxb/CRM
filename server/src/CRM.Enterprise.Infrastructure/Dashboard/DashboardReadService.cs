using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Dashboard;

public class DashboardReadService : IDashboardReadService
{
    private readonly CrmDbContext _dbContext;

    public DashboardReadService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<DashboardSummaryDto> GetSummaryAsync(CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var nextWeek = now.AddDays(7);
        var startOfToday = now.Date;
        var endOfToday = startOfToday.AddDays(1);

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
            .Select(a => new
            {
                a.Id,
                a.Subject,
                a.Type,
                a.RelatedEntityType,
                a.RelatedEntityId,
                a.DueDateUtc,
                a.CompletedDateUtc
            })
            .ToListAsync(cancellationToken);

        var accountIds = activitiesNextWeekRaw
            .Where(a => a.RelatedEntityType == ActivityRelationType.Account)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var contactIds = activitiesNextWeekRaw
            .Where(a => a.RelatedEntityType == ActivityRelationType.Contact)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var opportunityIds = activitiesNextWeekRaw
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
            recentCustomers,
            activitiesNextWeek,
            pipelineValueStages,
            Array.Empty<ChartDataPointDto>(),
            Array.Empty<ChartDataPointDto>(),
            Array.Empty<ActivityBreakdownItemDto>(),
            Array.Empty<ChartDataPointDto>(),
            Array.Empty<PerformerSummaryDto>(),
            0,
            0,
            0,
            0,
            0,
            0);
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
}
