using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UserDetailResponse(
    Guid Id,
    string FullName,
    string Email,
    string? TimeZone,
    string? Locale,
    decimal? MonthlyQuota,
    bool IsActive,
    DateTime CreatedAtUtc,
    DateTime? LastLoginAtUtc,
    DateTime? LastInviteSentAtUtc,
    string DashboardPackKey,
    string DashboardPackName,
    string DashboardPackType,
    IReadOnlyList<Guid> RoleIds,
    IReadOnlyList<string> Roles);
