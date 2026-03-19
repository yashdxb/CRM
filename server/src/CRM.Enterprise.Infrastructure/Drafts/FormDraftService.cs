using CRM.Enterprise.Application.Drafts;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Drafts;

public sealed class FormDraftService : IFormDraftService
{
    private static readonly HashSet<string> AllowedEntityTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "lead",
        "customer",
        "contact",
        "opportunity"
    };

    private readonly CrmDbContext _dbContext;

    public FormDraftService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<FormDraftListResultDto> GetListAsync(
        Guid ownerUserId,
        string entityType,
        int limit,
        int page,
        int pageSize,
        CancellationToken cancellationToken = default)
    {
        var normalizedEntityType = NormalizeEntityType(entityType);
        var normalizedPage = Math.Max(1, page);
        var normalizedPageSize = Math.Max(1, pageSize);
        var query = BuildActiveDraftQuery(ownerUserId, normalizedEntityType);

        var total = await query.CountAsync(cancellationToken);
        var effectiveTake = limit > 0 ? Math.Min(limit, normalizedPageSize) : normalizedPageSize;

        var items = await query
            .OrderByDescending(draft => draft.UpdatedAtUtc ?? draft.CreatedAtUtc)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(effectiveTake)
            .Select(draft => new FormDraftSummaryDto(
                draft.Id,
                draft.EntityType,
                draft.Title,
                draft.Subtitle,
                draft.CreatedAtUtc,
                draft.UpdatedAtUtc ?? draft.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return new FormDraftListResultDto(items, total);
    }

    public async Task<FormDraftDetailDto?> GetAsync(Guid id, Guid ownerUserId, CancellationToken cancellationToken = default)
    {
        var draft = await BuildActiveDraftQuery(ownerUserId)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        return draft is null ? null : MapDetail(draft);
    }

    public async Task<FormDraftDetailDto> SaveAsync(
        FormDraftSaveRequest request,
        Guid ownerUserId,
        string? ownerUserName,
        CancellationToken cancellationToken = default)
    {
        var normalizedEntityType = NormalizeEntityType(request.EntityType);
        var trimmedTitle = string.IsNullOrWhiteSpace(request.Title)
            ? GetUntitledLabel(normalizedEntityType)
            : request.Title.Trim();
        var trimmedSubtitle = string.IsNullOrWhiteSpace(request.Subtitle) ? null : request.Subtitle.Trim();
        var payloadJson = string.IsNullOrWhiteSpace(request.PayloadJson) ? "{}" : request.PayloadJson;

        FormDraft entity;
        if (request.Id.HasValue)
        {
            entity = await BuildActiveDraftQuery(ownerUserId, normalizedEntityType)
                .FirstOrDefaultAsync(item => item.Id == request.Id.Value, cancellationToken)
                ?? throw new InvalidOperationException("Draft was not found.");

            entity.Title = trimmedTitle;
            entity.Subtitle = trimmedSubtitle;
            entity.PayloadJson = payloadJson;
            entity.UpdatedBy = ownerUserName;
        }
        else
        {
            entity = new FormDraft
            {
                OwnerUserId = ownerUserId,
                EntityType = normalizedEntityType,
                Title = trimmedTitle,
                Subtitle = trimmedSubtitle,
                PayloadJson = payloadJson,
                Status = "Active",
                CreatedBy = ownerUserName
            };
            _dbContext.Set<FormDraft>().Add(entity);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MapDetail(entity);
    }

    public async Task<bool> CompleteAsync(Guid id, Guid ownerUserId, string? ownerUserName, CancellationToken cancellationToken = default)
    {
        var draft = await BuildActiveDraftQuery(ownerUserId)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (draft is null)
        {
            return false;
        }

        draft.Status = "Completed";
        draft.CompletedAtUtc = DateTime.UtcNow;
        draft.UpdatedBy = ownerUserName;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DiscardAsync(Guid id, Guid ownerUserId, string? ownerUserName, CancellationToken cancellationToken = default)
    {
        var draft = await BuildActiveDraftQuery(ownerUserId)
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);
        if (draft is null)
        {
            return false;
        }

        draft.Status = "Discarded";
        draft.IsDeleted = true;
        draft.DeletedAtUtc = DateTime.UtcNow;
        draft.DeletedBy = ownerUserName;
        draft.UpdatedBy = ownerUserName;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }

    private IQueryable<FormDraft> BuildActiveDraftQuery(Guid ownerUserId, string? entityType = null)
    {
        var query = _dbContext.Set<FormDraft>()
            .Where(draft => draft.OwnerUserId == ownerUserId && !draft.IsDeleted && draft.Status == "Active");

        if (!string.IsNullOrWhiteSpace(entityType))
        {
            query = query.Where(draft => draft.EntityType == entityType);
        }

        return query;
    }

    private static FormDraftDetailDto MapDetail(FormDraft draft)
    {
        return new FormDraftDetailDto(
            draft.Id,
            draft.EntityType,
            draft.Title,
            draft.Subtitle,
            draft.PayloadJson,
            draft.Status,
            draft.CreatedAtUtc,
            draft.UpdatedAtUtc ?? draft.CreatedAtUtc);
    }

    private static string NormalizeEntityType(string entityType)
    {
        var normalized = entityType.Trim().ToLowerInvariant();
        if (!AllowedEntityTypes.Contains(normalized))
        {
            throw new ArgumentOutOfRangeException(nameof(entityType), "Unsupported draft entity type.");
        }

        return normalized;
    }

    private static string GetUntitledLabel(string entityType)
    {
        return entityType switch
        {
            "lead" => "Untitled lead draft",
            "customer" => "Untitled customer draft",
            "contact" => "Untitled contact draft",
            "opportunity" => "Untitled opportunity draft",
            _ => "Untitled draft"
        };
    }
}
