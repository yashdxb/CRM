using System.Collections.Generic;

namespace CRM.Enterprise.Infrastructure.Auth;

public sealed record EntraIdentity(
    string ObjectId,
    string TenantId,
    string? Email,
    string? DisplayName,
    string? UserPrincipalName,
    IReadOnlyList<string> GroupIds);
