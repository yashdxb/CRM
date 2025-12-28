using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityStageHistoryItem(
    Guid Id,
    string Stage,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Notes);
