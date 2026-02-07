using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Activities;

public sealed class ActivityService : IActivityService
{
    private const string ActivityEntityType = "Activity";
    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;
    private readonly IMediator _mediator;

    public ActivityService(CrmDbContext dbContext, IAuditEventService auditEvents, IMediator mediator)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
        _mediator = mediator;
    }

    public async Task<ActivitySearchResultDto> SearchAsync(ActivitySearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Activities.AsNoTracking().Where(a => !a.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = request.Status switch
            {
                "Completed" => query.Where(a => a.CompletedDateUtc.HasValue),
                "Overdue" => query.Where(a => !a.CompletedDateUtc.HasValue && a.DueDateUtc < DateTime.UtcNow),
                "Upcoming" => query.Where(a => !a.CompletedDateUtc.HasValue && (!a.DueDateUtc.HasValue || a.DueDateUtc >= DateTime.UtcNow)),
                _ => query
            };
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(a =>
                a.Subject.ToLower().Contains(term) ||
                (a.Description ?? string.Empty).ToLower().Contains(term));
        }

        if (request.OwnerId.HasValue)
        {
            query = query.Where(a => a.OwnerId == request.OwnerId.Value);
        }

        if (request.Type.HasValue)
        {
            query = query.Where(a => a.Type == request.Type.Value);
        }

        if (request.RelatedEntityType.HasValue)
        {
            query = query.Where(a => a.RelatedEntityType == request.RelatedEntityType.Value);
        }

        if (request.RelatedEntityId.HasValue)
        {
            query = query.Where(a => a.RelatedEntityId == request.RelatedEntityId.Value);
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
                a.NextStepSubject,
                a.NextStepDueDateUtc,
                a.TemplateKey,
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

                return new ActivityListItemDto(
                    a.Id,
                    a.Subject,
                    a.Type.ToString(),
                    a.Description,
                    a.Outcome,
                    a.NextStepSubject,
                    a.NextStepDueDateUtc,
                    a.TemplateKey,
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

        return new ActivitySearchResultDto(items, total);
    }

    public async Task<ActivityListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var activity = await _dbContext.Activities
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (activity is null)
        {
            return null;
        }

        return await MapToListItemAsync(id, cancellationToken);
    }

    public async Task<IReadOnlyList<ActivityAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Activities
            .AsNoTracking()
            .AnyAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);

        if (!exists)
        {
            return null;
        }

        var items = await _dbContext.AuditEvents
            .AsNoTracking()
            .Where(a => a.EntityType == ActivityEntityType && a.EntityId == id)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new ActivityAuditEventDto(
                a.Id,
                a.EntityType,
                a.EntityId,
                a.Action,
                a.Field,
                a.OldValue,
                a.NewValue,
                a.ChangedByUserId,
                a.ChangedByName,
                a.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<ActivityOperationResult<ActivityListItemDto>> CreateAsync(ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var validationError = ValidateOutcomeAndNextStep(request);
        if (validationError is not null)
        {
            return ActivityOperationResult<ActivityListItemDto>.Fail(validationError);
        }

        validationError = ValidateCompletionRequirements(request);
        if (validationError is not null)
        {
            return ActivityOperationResult<ActivityListItemDto>.Fail(validationError);
        }

        var activity = new Activity
        {
            Subject = request.Subject,
            Description = request.Description,
            Outcome = request.Outcome,
            NextStepSubject = request.NextStepSubject,
            NextStepDueDateUtc = request.NextStepDueDateUtc,
            TemplateKey = request.TemplateKey,
            Type = request.Type,
            Priority = request.Priority,
            DueDateUtc = request.DueDateUtc,
            CompletedDateUtc = request.CompletedDateUtc,
            RelatedEntityType = request.RelatedEntityType ?? ActivityRelationType.Account,
            RelatedEntityId = request.RelatedEntityId ?? Guid.Empty,
            OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken),
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Activities.Add(activity);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(activity.Id, "Created", null, null, null, actor),
            cancellationToken);

        if (activity.CompletedDateUtc.HasValue)
        {
            await CreateNextStepActivityAsync(activity, request, actor, cancellationToken);
            await _mediator.Publish(new ActivityCompletedEvent(
                activity.Id,
                activity.RelatedEntityType,
                activity.RelatedEntityId,
                activity.OwnerId,
                activity.CompletedDateUtc.Value,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = await MapToListItemAsync(activity.Id, cancellationToken);
        return ActivityOperationResult<ActivityListItemDto>.Ok(dto);
    }

    public async Task<ActivityOperationResult<bool>> UpdateAsync(Guid id, ActivityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (activity is null)
        {
            return ActivityOperationResult<bool>.NotFoundResult();
        }

        var previousOwnerId = activity.OwnerId;
        var previousCompletedAt = activity.CompletedDateUtc;
        var previousOutcome = activity.Outcome;
        activity.Subject = request.Subject;
        activity.Description = request.Description;
        activity.Outcome = request.Outcome;
        activity.NextStepSubject = request.NextStepSubject;
        activity.NextStepDueDateUtc = request.NextStepDueDateUtc;
        activity.TemplateKey = request.TemplateKey;
        activity.Type = request.Type;
        activity.Priority = request.Priority;
        activity.DueDateUtc = request.DueDateUtc;
        activity.CompletedDateUtc = request.CompletedDateUtc;
        activity.RelatedEntityType = request.RelatedEntityType ?? ActivityRelationType.Account;
        activity.RelatedEntityId = request.RelatedEntityId ?? Guid.Empty;
        activity.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        activity.UpdatedAtUtc = DateTime.UtcNow;

        if (previousOwnerId != activity.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(activity.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), activity.OwnerId.ToString(), actor),
                cancellationToken);
        }

        var completedNow = previousCompletedAt != activity.CompletedDateUtc && activity.CompletedDateUtc.HasValue;
        var validationError = ValidateOutcomeAndNextStep(request);
        if (validationError is not null)
        {
            return ActivityOperationResult<bool>.Fail(validationError);
        }

        validationError = ValidateCompletionRequirements(request);
        if (validationError is not null)
        {
            return ActivityOperationResult<bool>.Fail(validationError);
        }

        if (completedNow)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    activity.Id,
                    "Completed",
                    "CompletedDateUtc",
                    previousCompletedAt?.ToString("u"),
                    activity.CompletedDateUtc?.ToString("u"),
                    actor),
                cancellationToken);
        }

        if (!string.Equals(previousOutcome, activity.Outcome, StringComparison.Ordinal))
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(activity.Id, "OutcomeUpdated", "Outcome", previousOutcome, activity.Outcome, actor),
                cancellationToken);
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(activity.Id, "Updated", null, null, null, actor),
            cancellationToken);

        if (completedNow)
        {
            await CreateNextStepActivityAsync(activity, request, actor, cancellationToken);
            await _mediator.Publish(new ActivityCompletedEvent(
                activity.Id,
                activity.RelatedEntityType,
                activity.RelatedEntityId,
                activity.OwnerId,
                activity.CompletedDateUtc!.Value,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ActivityOperationResult<bool>.Ok(true);
    }

    public async Task<ActivityOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(a => a.Id == id && !a.IsDeleted, cancellationToken);
        if (activity is null)
        {
            return ActivityOperationResult<bool>.NotFoundResult();
        }

        activity.IsDeleted = true;
        activity.DeletedAtUtc = DateTime.UtcNow;
        await _auditEvents.TrackAsync(
            CreateAuditEntry(activity.Id, "Deleted", null, null, null, actor),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return ActivityOperationResult<bool>.Ok(true);
    }

    private static string ComputeStatus(DateTime? dueDateUtc, DateTime? completedDateUtc)
    {
        if (completedDateUtc.HasValue) return "Completed";
        if (dueDateUtc.HasValue && dueDateUtc.Value < DateTime.UtcNow) return "Overdue";
        return "Upcoming";
    }

    private static string? ValidateOutcomeAndNextStep(ActivityUpsertRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Outcome))
        {
            return "Outcome is required for an activity.";
        }

        if (string.IsNullOrWhiteSpace(request.NextStepSubject))
        {
            return "Next step subject is required for an activity.";
        }

        if (!request.NextStepDueDateUtc.HasValue)
        {
            return "Next step due date is required for an activity.";
        }

        if (request.NextStepDueDateUtc.Value.Date < DateTime.UtcNow.Date)
        {
            return "Next step due date must be today or later.";
        }

        return null;
    }

    private static string? ValidateCompletionRequirements(ActivityUpsertRequest request)
    {
        if (!request.CompletedDateUtc.HasValue)
        {
            return null;
        }

        if (!request.DueDateUtc.HasValue)
        {
            return "Due date is required to complete an activity.";
        }

        return null;
    }

    private async Task CreateNextStepActivityAsync(
        Activity completedActivity,
        ActivityUpsertRequest request,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        if (!request.CompletedDateUtc.HasValue)
        {
            return;
        }

        if (string.IsNullOrWhiteSpace(request.NextStepSubject) || !request.NextStepDueDateUtc.HasValue)
        {
            return;
        }

        var followUp = new Activity
        {
            Subject = request.NextStepSubject.Trim(),
            Description = "Auto-created next step.",
            Type = ActivityType.Task,
            Priority = "Normal",
            DueDateUtc = request.NextStepDueDateUtc,
            RelatedEntityType = completedActivity.RelatedEntityType,
            RelatedEntityId = completedActivity.RelatedEntityId,
            OwnerId = completedActivity.OwnerId,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Activities.Add(followUp);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(followUp.Id, "Created", "Source", "NextStep", request.NextStepSubject, actor),
            cancellationToken);
    }

    private static string ResolveCustomerName(
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

    private async Task<ActivityListItemDto> MapToListItemAsync(Guid id, CancellationToken cancellationToken)
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

        return new ActivityListItemDto(
            activity.Id,
            activity.Subject,
            activity.Type.ToString(),
            activity.Description,
            activity.Outcome,
            activity.NextStepSubject,
            activity.NextStepDueDateUtc,
            activity.TemplateKey,
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

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
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

        if (actor.UserId.HasValue && actor.UserId.Value != Guid.Empty)
        {
            return actor.UserId.Value;
        }

        var fallback = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallback == Guid.Empty ? Guid.NewGuid() : fallback;
    }

    private AuditEventEntry CreateAuditEntry(
        Guid entityId,
        string action,
        string? field,
        string? oldValue,
        string? newValue,
        ActorContext actor)
    {
        return new AuditEventEntry(
            ActivityEntityType,
            entityId,
            action,
            field,
            oldValue,
            newValue,
            actor.UserId,
            actor.UserName);
    }
}
