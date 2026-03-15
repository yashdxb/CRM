using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Emails;

public sealed class CrmEmailLinkService : ICrmEmailLinkService
{
    private readonly CrmDbContext _dbContext;
    private readonly ILogger<CrmEmailLinkService> _logger;

    public CrmEmailLinkService(CrmDbContext dbContext, ILogger<CrmEmailLinkService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<CrmEmailLinkDto> LinkEmailAsync(CreateCrmEmailLinkRequest request, CancellationToken ct = default)
    {
        // Check if already linked
        var existing = await _dbContext.CrmEmailLinks
            .FirstOrDefaultAsync(l =>
                l.ConnectionId == request.ConnectionId &&
                l.ExternalMessageId == request.ExternalMessageId &&
                l.RelatedEntityType == request.RelatedEntityType &&
                l.RelatedEntityId == request.RelatedEntityId &&
                !l.IsDeleted, ct);

        if (existing is not null)
            return MapToDto(existing);

        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == request.ConnectionId && !c.IsDeleted, ct)
            ?? throw new InvalidOperationException($"Email connection {request.ConnectionId} not found.");

        var link = new CrmEmailLink
        {
            ConnectionId = request.ConnectionId,
            ExternalMessageId = request.ExternalMessageId,
            ConversationId = request.ConversationId,
            Subject = request.Subject,
            FromEmail = request.FromEmail,
            FromName = request.FromName,
            ReceivedAtUtc = request.ReceivedAtUtc,
            Provider = connection.Provider,
            RelatedEntityType = request.RelatedEntityType,
            RelatedEntityId = request.RelatedEntityId,
            LinkedByUserId = request.LinkedByUserId,
            Note = request.Note
        };

        _dbContext.CrmEmailLinks.Add(link);
        await _dbContext.SaveChangesAsync(ct);

        _logger.LogInformation(
            "Email {ExternalMessageId} linked to {EntityType} {EntityId} by user {UserId}",
            request.ExternalMessageId, request.RelatedEntityType, request.RelatedEntityId, request.LinkedByUserId);

        return MapToDto(link);
    }

    public async Task<bool> UnlinkEmailAsync(Guid linkId, CancellationToken ct = default)
    {
        var link = await _dbContext.CrmEmailLinks
            .FirstOrDefaultAsync(l => l.Id == linkId && !l.IsDeleted, ct);

        if (link is null) return false;

        link.IsDeleted = true;
        link.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(ct);

        _logger.LogInformation("Email link {LinkId} removed", linkId);
        return true;
    }

    public async Task<IReadOnlyList<CrmEmailLinkDto>> GetLinksForEntityAsync(
        ActivityRelationType entityType, Guid entityId, CancellationToken ct = default)
    {
        var links = await _dbContext.CrmEmailLinks
            .Where(l => l.RelatedEntityType == entityType && l.RelatedEntityId == entityId && !l.IsDeleted)
            .OrderByDescending(l => l.ReceivedAtUtc)
            .ToListAsync(ct);

        return links.Select(MapToDto).ToList();
    }

    public async Task<IReadOnlyList<CrmEmailLinkDto>> GetLinksForUserAsync(Guid userId, CancellationToken ct = default)
    {
        var links = await _dbContext.CrmEmailLinks
            .Where(l => l.LinkedByUserId == userId && !l.IsDeleted)
            .OrderByDescending(l => l.ReceivedAtUtc)
            .ToListAsync(ct);

        return links.Select(MapToDto).ToList();
    }

    private static CrmEmailLinkDto MapToDto(CrmEmailLink link) => new(
        link.Id,
        link.ConnectionId,
        link.ExternalMessageId,
        link.ConversationId,
        link.Subject,
        link.FromEmail,
        link.FromName,
        link.ReceivedAtUtc,
        link.Provider.ToString(),
        link.RelatedEntityType.ToString(),
        link.RelatedEntityId,
        link.LinkedByUserId,
        link.Note,
        link.CreatedAtUtc
    );
}
