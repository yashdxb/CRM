namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record UpsertOpportunityOnboardingItemRequest(
    string Type,
    string Title,
    string? Status,
    DateTime? DueDateUtc,
    string? Notes);
