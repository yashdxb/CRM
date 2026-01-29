namespace CRM.Enterprise.Api.Contracts.Agents;

public record AgentLeadItem(
    Guid Id,
    string Name,
    string? Email,
    string? Company,
    string? Status,
    string? OwnerName,
    DateTime? FirstTouchDueAtUtc);
