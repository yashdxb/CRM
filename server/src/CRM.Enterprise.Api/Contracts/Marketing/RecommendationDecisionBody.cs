namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record RecommendationDecisionBody(
    string Decision,
    string? Reason,
    bool ApplyActions = true);
