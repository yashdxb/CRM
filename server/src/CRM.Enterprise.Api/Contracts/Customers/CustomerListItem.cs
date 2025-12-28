using System;

namespace CRM.Enterprise.Api.Contracts.Customers;

public record CustomerListItem(
    Guid Id,
    string Name,
    string Company,
    string? Email,
    string? Phone,
    string Status,
    Guid OwnerId,
    string Owner,
    DateTime CreatedAt);
