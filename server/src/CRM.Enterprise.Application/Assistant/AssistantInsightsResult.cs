using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantInsightsResult(
    RoleVisibilityScope Scope,
    IReadOnlyList<AssistantInsightsKpi> Kpis,
    IReadOnlyList<AssistantInsightsAction> Actions,
    DateTime GeneratedAtUtc);
