using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Auth;

public record LoginResponse(string AccessToken, DateTime ExpiresAtUtc, string Email, string FullName, IReadOnlyList<string> Roles, IReadOnlyList<string> Permissions, string TenantKey, bool MustChangePassword);
