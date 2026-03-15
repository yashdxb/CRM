using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Application.Emails;

/// <summary>
/// Service for managing CRM email links — lightweight references
/// that pin external emails to CRM entities (leads, contacts, etc.).
/// </summary>
public interface ICrmEmailLinkService
{
    Task<CrmEmailLinkDto> LinkEmailAsync(CreateCrmEmailLinkRequest request, CancellationToken ct = default);
    Task<bool> UnlinkEmailAsync(Guid linkId, CancellationToken ct = default);
    Task<IReadOnlyList<CrmEmailLinkDto>> GetLinksForEntityAsync(ActivityRelationType entityType, Guid entityId, CancellationToken ct = default);
    Task<IReadOnlyList<CrmEmailLinkDto>> GetLinksForUserAsync(Guid userId, CancellationToken ct = default);
}

// ============ DTOs ============

public record CreateCrmEmailLinkRequest(
    Guid ConnectionId,
    string ExternalMessageId,
    string? ConversationId,
    string Subject,
    string FromEmail,
    string? FromName,
    DateTime ReceivedAtUtc,
    ActivityRelationType RelatedEntityType,
    Guid RelatedEntityId,
    Guid LinkedByUserId,
    string? Note
);

public record CrmEmailLinkDto(
    Guid Id,
    Guid ConnectionId,
    string ExternalMessageId,
    string? ConversationId,
    string Subject,
    string FromEmail,
    string? FromName,
    DateTime ReceivedAtUtc,
    string Provider,
    string RelatedEntityType,
    Guid RelatedEntityId,
    Guid LinkedByUserId,
    string? Note,
    DateTime CreatedAtUtc
);
