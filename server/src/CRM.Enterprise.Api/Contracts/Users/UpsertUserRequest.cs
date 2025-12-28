using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UpsertUserRequest(
    string FullName,
    string Email,
    string? TimeZone,
    string? Locale,
    bool IsActive,
    IReadOnlyCollection<Guid>? RoleIds,
    string? TemporaryPassword);
