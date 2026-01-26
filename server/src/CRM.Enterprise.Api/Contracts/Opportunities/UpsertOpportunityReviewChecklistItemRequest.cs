namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record UpsertOpportunityReviewChecklistItemRequest(
    string Title,
    string? Status,
    string? Notes,
    string? Type);
