namespace CRM.Enterprise.Application.Tenants;

public interface ITenantProvider
{
    Guid TenantId { get; }
    string TenantKey { get; }
    void SetTenant(Guid tenantId, string tenantKey);
}
