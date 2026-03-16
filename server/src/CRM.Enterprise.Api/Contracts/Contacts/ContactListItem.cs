using System;

namespace CRM.Enterprise.Api.Contracts.Contacts;

public record ContactListItem(
    Guid Id,
    string Name,
    string? Email,
    string? Phone,
    string? Mobile,
    string? JobTitle,
    string? BuyingRole,
    Guid? AccountId,
    string? AccountName,
    Guid OwnerId,
    string? Owner,
    string? LifecycleStage,
    int ActivityScore,
    DateTime CreatedAtUtc,
    string? City = null,
    string? Country = null,
    IEnumerable<string>? Tags = null);
