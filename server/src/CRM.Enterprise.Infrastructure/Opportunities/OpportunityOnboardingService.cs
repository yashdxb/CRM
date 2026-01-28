using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityOnboardingService : IOpportunityOnboardingService
{
    private const string EntityType = "OpportunityOnboarding";
    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;

    public OpportunityOnboardingService(CrmDbContext dbContext, IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
    }

    public async Task<IReadOnlyList<OpportunityOnboardingItemDto>?> GetAsync(Guid opportunityId, string? type, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var query = _dbContext.OpportunityOnboardingItems
            .AsNoTracking()
            .Where(i => !i.IsDeleted && i.OpportunityId == opportunityId);

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(i => i.Type == type);
        }

        var items = await query
            .OrderBy(i => i.CreatedAtUtc)
            .Select(i => new OpportunityOnboardingItemDto(
                i.Id,
                i.OpportunityId,
                i.Type,
                i.Title,
                i.Status,
                i.DueDateUtc,
                i.CompletedAtUtc,
                i.Notes))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<OpportunityOnboardingItemDto?> CreateAsync(
        Guid opportunityId,
        OpportunityOnboardingCreateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return null;
        }

        var type = NormalizeType(request.Type);
        var title = request.Title?.Trim() ?? string.Empty;
        if (string.IsNullOrWhiteSpace(title))
        {
            return null;
        }

        var status = string.IsNullOrWhiteSpace(request.Status) ? "Pending" : request.Status.Trim();
        var item = new OpportunityOnboardingItem
        {
            OpportunityId = opportunityId,
            Type = type,
            Title = title,
            Status = status,
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
            DueDateUtc = request.DueDateUtc,
            CompletedAtUtc = string.Equals(status, "Completed", StringComparison.OrdinalIgnoreCase) ? DateTime.UtcNow : null,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.OpportunityOnboardingItems.Add(item);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Created",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UpdateDeliveryStatusAsync(opportunityId, actor, cancellationToken);

        return new OpportunityOnboardingItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.DueDateUtc,
            item.CompletedAtUtc,
            item.Notes);
    }

    public async Task<OpportunityOnboardingItemDto?> UpdateAsync(
        Guid itemId,
        OpportunityOnboardingUpdateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityOnboardingItems
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted, cancellationToken);
        if (item is null)
        {
            return null;
        }

        if (request.Title is not null)
        {
            item.Title = request.Title.Trim();
        }

        if (request.Status is not null)
        {
            item.Status = request.Status.Trim();
            item.CompletedAtUtc = string.Equals(item.Status, "Completed", StringComparison.OrdinalIgnoreCase)
                ? DateTime.UtcNow
                : null;
        }

        if (request.DueDateUtc.HasValue)
        {
            item.DueDateUtc = request.DueDateUtc;
        }

        if (request.Notes is not null)
        {
            item.Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim();
        }

        item.UpdatedAtUtc = DateTime.UtcNow;

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Updated",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UpdateDeliveryStatusAsync(item.OpportunityId, actor, cancellationToken);

        return new OpportunityOnboardingItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.DueDateUtc,
            item.CompletedAtUtc,
            item.Notes);
    }

    public async Task<bool> DeleteAsync(Guid itemId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityOnboardingItems
            .FirstOrDefaultAsync(i => i.Id == itemId && !i.IsDeleted, cancellationToken);
        if (item is null)
        {
            return false;
        }

        item.IsDeleted = true;
        item.DeletedAtUtc = DateTime.UtcNow;

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                item.Id,
                "Deleted",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await UpdateDeliveryStatusAsync(item.OpportunityId, actor, cancellationToken);

        return true;
    }

    private async Task UpdateDeliveryStatusAsync(Guid opportunityId, ActorContext actor, CancellationToken cancellationToken)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opp is null)
        {
            return;
        }

        var total = await _dbContext.OpportunityOnboardingItems
            .CountAsync(i => i.OpportunityId == opportunityId && !i.IsDeleted, cancellationToken);
        if (total == 0)
        {
            return;
        }

        var completed = await _dbContext.OpportunityOnboardingItems
            .CountAsync(i => i.OpportunityId == opportunityId && !i.IsDeleted && i.CompletedAtUtc.HasValue, cancellationToken);

        if (completed == total)
        {
            opp.DeliveryStatus = "Completed";
            opp.DeliveryCompletedAtUtc ??= DateTime.UtcNow;
        }
        else
        {
            opp.DeliveryStatus = "In Progress";
            opp.DeliveryCompletedAtUtc = null;
        }

        opp.UpdatedAtUtc = DateTime.UtcNow;
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                EntityType,
                opportunityId,
                "DeliveryStatusUpdated",
                null,
                null,
                opp.DeliveryStatus,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private static string NormalizeType(string? type)
    {
        if (string.Equals(type, "Milestone", StringComparison.OrdinalIgnoreCase))
        {
            return "Milestone";
        }
        return "Checklist";
    }
}
