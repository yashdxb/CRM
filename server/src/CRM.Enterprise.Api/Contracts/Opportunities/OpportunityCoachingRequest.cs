namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityCoachingRequest(
    string Comment,
    DateTime? DueDateUtc,
    string? Priority);
