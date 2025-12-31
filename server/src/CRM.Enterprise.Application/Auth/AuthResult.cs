using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Application.Auth;

public record AuthResult(string AccessToken, DateTime ExpiresAtUtc, string Email, string FullName, IReadOnlyList<string> Roles, IReadOnlyList<string> Permissions, string TenantKey);
