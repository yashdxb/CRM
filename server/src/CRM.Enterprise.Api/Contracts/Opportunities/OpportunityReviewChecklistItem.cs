namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityReviewChecklistItem(
    Guid Id,
    Guid OpportunityId,
    string Type,
    string Title,
    string Status,
    string? Notes,
    DateTime? CompletedAtUtc);
