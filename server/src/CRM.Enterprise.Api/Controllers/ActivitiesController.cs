using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Activities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Api.Jobs;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.ActivitiesView)]
[ApiController]
[Route("api/activities")]
public class ActivitiesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly IBackgroundJobClient _backgroundJobs;

    public ActivitiesController(CrmDbContext dbContext, IBackgroundJobClient backgroundJobs)
    {
        _dbContext = dbContext;
        _backgroundJobs = backgroundJobs;
    }

    [HttpGet]
    public async Task<ActionResult<ActivitySearchResponse>> GetActivities(
        [FromQuery] string? status,
        [FromQuery] string? search,
        [FromQuery] Guid? ownerId,
        [FromQuery] ActivityType? type,
        [FromQuery] ActivityRelationType? relatedEntityType,
        [FromQuery] Guid? relatedEntityId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Activities.AsNoTracking().Where(a => !a.IsDeleted);

        if (!string.IsNullOrWhiteSpace(status))
        {
            query = status switch
            {
                "Completed" => query.Where(a => a.CompletedDateUtc.HasValue),
                "Overdue" => query.Where(a => !a.CompletedDateUtc.HasValue && a.DueDateUtc < DateTime.UtcNow),
                "Upcoming" => query.Where(a => !a.CompletedDateUtc.HasValue && (!a.DueDateUtc.HasValue || a.DueDateUtc >= DateTime.UtcNow)),
                _ => query
            };
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(a =>
                a.Subject.ToLower().Contains(term) ||
                (a.Description ?? string.Empty).ToLower().Contains(term));
        }

        if (ownerId.HasValue)
        {
            query = query.Where(a => a.OwnerId == ownerId.Value);
        }

        if (type.HasValue)
        {
            query = query.Where(a => a.Type == type.Value);
        }

        if (relatedEntityType.HasValue)
        {
            query = query.Where(a => a.RelatedEntityType == relatedEntityType.Value);
        }

        if (relatedEntityId.HasValue)
        {
            query = query.Where(a => a.RelatedEntityId == relatedEntityId.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var activities = await query
            .OrderBy(a => a.DueDateUtc ?? DateTime.MaxValue)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new
            {
                a.Id,
                a.Subject,
                a.Type,
                a.RelatedEntityType,
                a.RelatedEntityId,
                a.DueDateUtc,
                a.CompletedDateUtc,
                a.Description,
                a.Outcome,
                a.Priority,
                a.OwnerId,
                a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var accountIds = activities
            .Where(a => a.RelatedEntityType == ActivityRelationType.Account)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var contactIds = activities
            .Where(a => a.RelatedEntityType == ActivityRelationType.Contact)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var opportunityIds = activities
            .Where(a => a.RelatedEntityType == ActivityRelationType.Opportunity)
            .Select(a => a.RelatedEntityId)
            .Where(id => id != Guid.Empty)
            .Distinct()
            .ToList();

        var leadIds = activities
            .Where(a => a.RelatedEntityType == ActivityRelationType.Lead)
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
            .ToDictionaryAsync(c => c.Id, c => string.IsNullOrWhiteSpace(c.Name) ? c.Email ?? string.Empty : c.Name, cancellationToken);

        var opportunityLookup = await _dbContext.Opportunities
            .Where(o => opportunityIds.Contains(o.Id))
            .AsNoTracking()
            .Select(o => new { o.Id, o.Name })
            .ToDictionaryAsync(o => o.Id, o => o.Name, cancellationToken);

        var leadLookup = await _dbContext.Leads
            .Where(l => leadIds.Contains(l.Id))
            .AsNoTracking()
            .Select(l => new
            {
                l.Id,
                Name = (l.FirstName + " " + l.LastName).Trim(),
                l.Email,
                l.CompanyName
            })
            .ToDictionaryAsync(
                l => l.Id,
                l =>
                {
                    if (!string.IsNullOrWhiteSpace(l.Name))
                    {
                        return l.Name;
                    }
                    if (!string.IsNullOrWhiteSpace(l.Email))
                    {
                        return l.Email;
                    }
                    return l.CompanyName ?? string.Empty;
                },
                cancellationToken);

        var ownerIds = activities.Select(a => a.OwnerId).Where(id => id != Guid.Empty).Distinct().ToList();
        var ownerLookup = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .AsNoTracking()
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var items = activities
            .Select(a =>
            {
                var relatedId = a.RelatedEntityId == Guid.Empty ? (Guid?)null : a.RelatedEntityId;
                var ownerIdValue = a.OwnerId == Guid.Empty ? (Guid?)null : a.OwnerId;
                var ownerName = ownerIdValue.HasValue && ownerLookup.TryGetValue(ownerIdValue.Value, out var foundName)
                    ? foundName
                    : null;

                return new ActivityListItem(
                    a.Id,
                    a.Subject,
                    a.Type.ToString(),
                    a.Description,
                    a.Outcome,
                    a.Priority,
                    relatedId,
                    ResolveCustomerName(a.RelatedEntityType, relatedId, accountLookup, contactLookup, opportunityLookup, leadLookup),
                    a.RelatedEntityType.ToString(),
                    a.DueDateUtc,
                    a.CompletedDateUtc,
                    ComputeStatus(a.DueDateUtc, a.CompletedDateUtc),
                    ownerIdValue,
                    ownerName,
                    a.CreatedAtUtc);
            })
            .ToList();

        return Ok(new ActivitySearchResponse(items, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ActivityListItem>> GetById(Guid id, CancellationToken cancellationToken = default)
    {
        var activity = await _dbContext.Activities
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (activity is null)
        {
            return NotFound();
        }

        var item = await MapToListItemAsync(id, cancellationToken);
        return Ok(item);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<ActionResult<ActivityListItem>> Create([FromBody] UpsertActivityRequest request, CancellationToken cancellationToken)
    {
        var activity = new Activity
        {
            Subject = request.Subject,
            Description = request.Description,
            Outcome = request.Outcome,
            Type = request.Type,
            Priority = request.Priority,
            DueDateUtc = request.DueDateUtc,
            CompletedDateUtc = request.CompletedDateUtc,
            RelatedEntityType = request.RelatedEntityType ?? ActivityRelationType.Account,
            RelatedEntityId = request.RelatedEntityId ?? Guid.Empty,
            OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken),
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Activities.Add(activity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        _backgroundJobs.Enqueue<NotificationEmailJobs>(job => job.SendTaskAssignedAsync(activity.Id, CancellationToken.None));

        var dto = await MapToListItemAsync(activity.Id, cancellationToken);
        return CreatedAtAction(nameof(GetActivities), new { id = activity.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertActivityRequest request, CancellationToken cancellationToken)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (activity is null) return NotFound();

        var previousOwnerId = activity.OwnerId;
        activity.Subject = request.Subject;
        activity.Description = request.Description;
        activity.Outcome = request.Outcome;
        activity.Type = request.Type;
        activity.Priority = request.Priority;
        activity.DueDateUtc = request.DueDateUtc;
        activity.CompletedDateUtc = request.CompletedDateUtc;
        activity.RelatedEntityType = request.RelatedEntityType ?? ActivityRelationType.Account;
        activity.RelatedEntityId = request.RelatedEntityId ?? Guid.Empty;
        activity.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        activity.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        if (previousOwnerId != activity.OwnerId && activity.OwnerId != Guid.Empty)
        {
            _backgroundJobs.Enqueue<NotificationEmailJobs>(job => job.SendTaskAssignedAsync(activity.Id, CancellationToken.None));
        }
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.ActivitiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (activity is null) return NotFound();

        activity.IsDeleted = true;
        activity.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private static string ComputeStatus(DateTime? dueDateUtc, DateTime? completedDateUtc)
    {
        if (completedDateUtc.HasValue) return "Completed";
        if (dueDateUtc.HasValue && dueDateUtc.Value < DateTime.UtcNow) return "Overdue";
        return "Upcoming";
    }

    private string ResolveCustomerName(
        ActivityRelationType relationType,
        Guid? relatedEntityId,
        IReadOnlyDictionary<Guid, string> accountLookup,
        IReadOnlyDictionary<Guid, string> contactLookup,
        IReadOnlyDictionary<Guid, string> opportunityLookup,
        IReadOnlyDictionary<Guid, string> leadLookup)
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
            ActivityRelationType.Lead when leadLookup.TryGetValue(value, out var leadName) => leadName,
            _ => string.Empty
        };
    }

    private async Task<ActivityListItem> MapToListItemAsync(Guid id, CancellationToken cancellationToken)
    {
        var activity = await _dbContext.Activities
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id, cancellationToken) ?? throw new InvalidOperationException("Activity not found after upsert.");

        var relatedName = string.Empty;
        if (activity.RelatedEntityType == ActivityRelationType.Account && activity.RelatedEntityId != Guid.Empty)
        {
            relatedName = await _dbContext.Accounts
                .Where(a => a.Id == activity.RelatedEntityId)
                .Select(a => a.Name)
                .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;
        }
        else if (activity.RelatedEntityType == ActivityRelationType.Contact && activity.RelatedEntityId != Guid.Empty)
        {
            relatedName = await _dbContext.Contacts
                .Where(c => c.Id == activity.RelatedEntityId)
                .Select(c => (c.FirstName + " " + c.LastName).Trim())
                .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;
        }
        else if (activity.RelatedEntityType == ActivityRelationType.Opportunity && activity.RelatedEntityId != Guid.Empty)
        {
            relatedName = await _dbContext.Opportunities
                .Where(o => o.Id == activity.RelatedEntityId)
                .Select(o => o.Name)
                .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;
        }
        else if (activity.RelatedEntityType == ActivityRelationType.Lead && activity.RelatedEntityId != Guid.Empty)
        {
            relatedName = await _dbContext.Leads
                .Where(l => l.Id == activity.RelatedEntityId)
                .Select(l => (l.FirstName + " " + l.LastName).Trim())
                .FirstOrDefaultAsync(cancellationToken) ?? string.Empty;
        }

        var ownerId = activity.OwnerId == Guid.Empty ? (Guid?)null : activity.OwnerId;
        var ownerName = ownerId.HasValue
            ? await _dbContext.Users.Where(u => u.Id == ownerId.Value).Select(u => u.FullName).FirstOrDefaultAsync(cancellationToken)
            : null;

        return new ActivityListItem(
            activity.Id,
            activity.Subject,
            activity.Type.ToString(),
            activity.Description,
            activity.Outcome,
            activity.Priority,
            activity.RelatedEntityId == Guid.Empty ? null : activity.RelatedEntityId,
            relatedName,
            activity.RelatedEntityType.ToString(),
            activity.DueDateUtc,
            activity.CompletedDateUtc,
            ComputeStatus(activity.DueDateUtc, activity.CompletedDateUtc),
            ownerId,
            ownerName,
            activity.CreatedAtUtc);
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(
                u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted,
                cancellationToken);
            if (exists)
            {
                return requestedOwnerId.Value;
            }
        }

        var currentUserId = GetUserId();
        if (currentUserId != Guid.Empty)
        {
            return currentUserId;
        }

        var fallback = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallback == Guid.Empty ? Guid.NewGuid() : fallback;
    }

    private Guid GetUserId()
    {
        var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(id, out var parsed) ? parsed : Guid.Empty;
    }
}
