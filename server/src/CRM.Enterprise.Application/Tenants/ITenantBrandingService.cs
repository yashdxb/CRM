namespace CRM.Enterprise.Application.Tenants;

public interface ITenantBrandingService
{
    Task<TenantBrandingDto> GetBrandingAsync(CancellationToken ct = default);
    Task<TenantBrandingDto> GetPublicBrandingAsync(string tenantKey, CancellationToken ct = default);
    Task<TenantBrandingDto> UploadLogoAsync(Stream file, string fileName, string contentType, CancellationToken ct = default);
    Task<TenantBrandingDto> RemoveLogoAsync(CancellationToken ct = default);
}
