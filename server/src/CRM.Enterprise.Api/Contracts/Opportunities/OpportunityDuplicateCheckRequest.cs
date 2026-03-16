namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityDuplicateCheckRequest(
    string Name,
    Guid? AccountId,
    decimal Amount,
    DateTime? ExpectedCloseDate,
    string? StageName,
    Guid? ExcludeOpportunityId);
