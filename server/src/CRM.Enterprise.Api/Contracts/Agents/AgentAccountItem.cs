namespace CRM.Enterprise.Api.Contracts.Agents;

public record AgentAccountItem(
    Guid Id,
    string Name,
    string? Industry,
    string? LifecycleStage,
    string? OwnerName,
    string? Website);
