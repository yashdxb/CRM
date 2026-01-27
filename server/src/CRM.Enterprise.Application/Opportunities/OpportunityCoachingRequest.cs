namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityCoachingRequest(
    string Comment,
    DateTime? DueDateUtc,
    string? Priority);
