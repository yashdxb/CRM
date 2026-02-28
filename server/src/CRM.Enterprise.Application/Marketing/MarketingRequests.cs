namespace CRM.Enterprise.Application.Marketing;

public sealed record CampaignSearchRequest(
    string? Search,
    string? Status,
    string? Channel,
    Guid? OwnerUserId,
    int Page,
    int PageSize);

public sealed record CampaignUpsertRequest(
    string Name,
    string Type,
    string Channel,
    string Status,
    Guid OwnerUserId,
    DateTime? StartDateUtc,
    DateTime? EndDateUtc,
    decimal BudgetPlanned,
    decimal BudgetActual,
    string? Objective);

public sealed record CampaignMemberUpsertRequest(
    string EntityType,
    Guid EntityId,
    string ResponseStatus);

public sealed record RecommendationDecisionRequest(
    string Decision,
    string? Reason,
    bool ApplyActions = true);
