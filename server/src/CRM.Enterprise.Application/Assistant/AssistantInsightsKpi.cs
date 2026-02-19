namespace CRM.Enterprise.Application.Assistant;

public sealed record AssistantInsightsKpi(
    string Key,
    string Label,
    int Value,
    string Severity);
