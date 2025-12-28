using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityListItem(
    Guid Id,
    string Name,
    string Account,
    string Stage,
    decimal Amount,
    decimal Probability,
    string Currency,
    DateTime? CloseDate,
    Guid OwnerId,
    string Owner,
    string Status,
    string? WinLossReason,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);
