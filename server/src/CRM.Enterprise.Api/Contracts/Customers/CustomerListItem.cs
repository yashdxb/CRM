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
    Guid? ParentAccountId,
    string? ParentAccountName,
    DateTime CreatedAt,
    string? Industry = null,
    string? Territory = null,
    int ActivityScore = 0,
    string? Website = null,
    string? AccountNumber = null,
    decimal? AnnualRevenue = null,
    int? NumberOfEmployees = null,
    string? AccountType = null,
    string? Rating = null,
    string? AccountSource = null);
