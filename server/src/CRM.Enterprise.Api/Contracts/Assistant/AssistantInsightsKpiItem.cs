namespace CRM.Enterprise.Api.Contracts.Assistant;

public sealed record AssistantInsightsKpiItem(
    string Key,
    string Label,
    int Value,
    string Severity);
