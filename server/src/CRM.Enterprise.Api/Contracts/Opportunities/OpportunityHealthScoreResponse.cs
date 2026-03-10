namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityHealthScoreResponse(
    int Score,
    string Label,
    decimal Confidence,
    string Rationale,
    IReadOnlyList<OpportunityHealthFactorItem> Factors,
    DateTime ComputedUtc);

public sealed record OpportunityHealthFactorItem(
    string Factor,
    int Score,
    int MaxScore);
