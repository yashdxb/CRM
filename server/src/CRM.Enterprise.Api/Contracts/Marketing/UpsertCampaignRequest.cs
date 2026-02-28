namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record UpsertCampaignRequest(
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
