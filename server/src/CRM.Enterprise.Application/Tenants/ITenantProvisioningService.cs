namespace CRM.Enterprise.Application.Tenants;

public interface ITenantProvisioningService
{
    Task<Guid> ProvisionTenantAsync(
        string key,
        string name,
        string adminName,
        string adminEmail,
        string adminPassword,
        string? timeZone,
        string? currency,
        CancellationToken cancellationToken = default);
}
