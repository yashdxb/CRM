namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityReviewChecklistItemDto(
    Guid Id,
    Guid OpportunityId,
    string Type,
    string Title,
    string Status,
    string? Notes,
    DateTime? CompletedAtUtc);

public sealed record OpportunityReviewChecklistCreateRequest(
    string Type,
    string Title,
    string? Status,
    string? Notes);

public sealed record OpportunityReviewChecklistUpdateRequest(
    string? Title,
    string? Status,
    string? Notes);
