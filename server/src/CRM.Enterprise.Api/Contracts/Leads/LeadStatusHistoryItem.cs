using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadStatusHistoryItem(
    Guid Id,
    string Status,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Notes);
