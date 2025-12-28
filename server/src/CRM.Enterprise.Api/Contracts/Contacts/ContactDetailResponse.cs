using System;

namespace CRM.Enterprise.Api.Contracts.Contacts;

public record ContactDetailResponse(
    Guid Id,
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? Mobile,
    string? JobTitle,
    Guid? AccountId,
    string? AccountName,
    Guid OwnerId,
    string? Owner,
    string? LinkedInProfile,
    string? LifecycleStage,
    int ActivityScore,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);
