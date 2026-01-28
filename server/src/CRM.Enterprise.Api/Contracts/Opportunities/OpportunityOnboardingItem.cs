namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityOnboardingItem(
    Guid Id,
    Guid OpportunityId,
    string Type,
    string Title,
    string Status,
    DateTime? DueDateUtc,
    DateTime? CompletedAtUtc,
    string? Notes);
