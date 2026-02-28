namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignListItem(
    Guid Id,
    string Name,
    string Type,
    string Channel,
    string Status,
    Guid OwnerUserId,
    string OwnerName,
    DateTime? StartDateUtc,
    DateTime? EndDateUtc,
    decimal BudgetPlanned,
    decimal BudgetActual,
    string? Objective,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);
