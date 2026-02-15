using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UserListItem(
    Guid Id,
    string FullName,
    string Email,
    IReadOnlyList<string> Roles,
    bool IsActive,
    DateTime CreatedAtUtc,
    DateTime? LastLoginAtUtc,
    DateTime? LastInviteSentAtUtc,
    string? TimeZone,
    string? LastLoginLocation,
    string? LastLoginIp,
    bool IsOnline);
