namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record RecommendationPilotMetricsItem(
    int ActiveRecommendations,
    int AcceptedCount,
    int DismissedCount,
    int SnoozedCount,
    int ActionTasksCreated,
    decimal AcceptanceRatePct,
    decimal AvgDecisionHours,
    DateTime WindowStartUtc,
    DateTime WindowEndUtc);
