using CRM.Enterprise.Application.Tenants;

namespace CRM.Enterprise.Infrastructure.Tenants;

public sealed class TenantProvider : ITenantProvider
{
    public Guid TenantId { get; private set; }
    public string TenantKey { get; private set; } = string.Empty;

    public void SetTenant(Guid tenantId, string tenantKey)
    {
        TenantId = tenantId;
        TenantKey = tenantKey;
    }
}
