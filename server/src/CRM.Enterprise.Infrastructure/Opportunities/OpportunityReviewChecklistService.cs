using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityReviewChecklistService : IOpportunityReviewChecklistService
{
    private const string EntityType = "OpportunityReviewChecklist";
    private readonly CrmDbContext _dbContext;
    private readonly IAuditEventService _auditEvents;

    public OpportunityReviewChecklistService(CrmDbContext dbContext, IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _auditEvents = auditEvents;
    }

    public async Task<IReadOnlyList<OpportunityReviewChecklistItemDto>?> GetAsync(Guid opportunityId, string? type, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var query = _dbContext.OpportunityReviewChecklistItems
            .AsNoTracking()
            .Where(i => !i.IsDeleted && i.OpportunityId == opportunityId);

        if (!string.IsNullOrWhiteSpace(type))
        {
            query = query.Where(i => i.Type == type);
        }

        var items = await query
            .OrderBy(i => i.CreatedAtUtc)
            .Select(i => new OpportunityReviewChecklistItemDto(
                i.Id,
                i.OpportunityId,
                i.Type,
                i.Title,
                i.Status,
                i.Notes,
                i.CompletedAtUtc))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<OpportunityReviewChecklistItemDto?> CreateAsync(
        Guid opportunityId,
        OpportunityReviewChecklistCreateRequest request,
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
        var item = new OpportunityReviewChecklistItem
        {
            OpportunityId = opportunityId,
            Type = type,
            Title = title,
            Status = status,
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes.Trim(),
            CompletedAtUtc = string.Equals(status, "Completed", StringComparison.OrdinalIgnoreCase) ? DateTime.UtcNow : null,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.OpportunityReviewChecklistItems.Add(item);
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

        return new OpportunityReviewChecklistItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.Notes,
            item.CompletedAtUtc);
    }

    public async Task<OpportunityReviewChecklistItemDto?> UpdateAsync(
        Guid itemId,
        OpportunityReviewChecklistUpdateRequest request,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityReviewChecklistItems
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

        return new OpportunityReviewChecklistItemDto(
            item.Id,
            item.OpportunityId,
            item.Type,
            item.Title,
            item.Status,
            item.Notes,
            item.CompletedAtUtc);
    }

    public async Task<bool> DeleteAsync(Guid itemId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var item = await _dbContext.OpportunityReviewChecklistItems
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
        return true;
    }

    private static string NormalizeType(string? type)
    {
        if (string.Equals(type, "Legal", StringComparison.OrdinalIgnoreCase))
        {
            return "Legal";
        }
        return "Security";
    }
}
