namespace CRM.Enterprise.Api.Contracts.Agents;

public record AgentOpportunityItem(
    Guid Id,
    string Name,
    string? AccountName,
    string? Stage,
    decimal Amount,
    string Currency,
    DateTime? ExpectedCloseDate,
    string? ForecastCategory,
    string? OwnerName,
    bool IsClosed,
    bool IsWon);
