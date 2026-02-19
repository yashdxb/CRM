namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantInsightsResponse(
    string Scope,
    IReadOnlyList<AssistantInsightsKpiItem> Kpis,
    IReadOnlyList<AssistantInsightsActionItem> Actions,
    DateTime GeneratedAtUtc);
