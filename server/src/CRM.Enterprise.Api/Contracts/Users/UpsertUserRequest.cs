using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UpsertUserRequest(
    string FullName,
    string Email,
    string? UserAudience,
    string? TimeZone,
    string? Locale,
    decimal? MonthlyQuota,
    bool IsActive,
    IReadOnlyCollection<Guid>? RoleIds,
    string? TemporaryPassword);
