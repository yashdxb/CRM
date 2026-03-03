namespace CRM.Enterprise.Infrastructure.Auth;

public sealed record EntraIdentity(
    string ObjectId,
    string TenantId,
    string? Email,
    string? DisplayName);
