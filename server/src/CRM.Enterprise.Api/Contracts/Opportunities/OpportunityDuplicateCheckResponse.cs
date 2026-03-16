namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityDuplicateCheckCandidate(
    Guid OpportunityId,
    string Name,
    string? AccountName,
    string? StageName,
    decimal Amount,
    DateTime? ExpectedCloseDate,
    int MatchScore,
    string MatchLevel,
    IEnumerable<string> MatchedSignals);

public sealed record OpportunityDuplicateCheckResponse(
    string Decision,
    bool IsBlocked,
    bool HasWarnings,
    IEnumerable<OpportunityDuplicateCheckCandidate> Matches);
