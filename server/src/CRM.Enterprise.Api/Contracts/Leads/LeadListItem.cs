using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadListItem(
    Guid Id,
    string Name,
    string Company,
    string Status,
    string? Email,
    string? Phone,
    Guid OwnerId,
    string Owner,
    int Score,
    DateTime CreatedAt,
    string? Source,
    string? Territory,
    string? JobTitle);
