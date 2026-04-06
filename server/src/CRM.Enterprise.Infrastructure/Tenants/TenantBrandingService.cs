using CRM.Enterprise.Application.Storage;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Tenants;

public class TenantBrandingService : ITenantBrandingService
{
    private const string ContainerName = "tenant-branding";
    private static readonly HashSet<string> AllowedContentTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "image/png",
        "image/jpeg",
        "image/webp"
    };
    private const long MaxFileSizeBytes = 2 * 1024 * 1024; // 2 MB

    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IBlobStorageService _blobStorage;

    public TenantBrandingService(CrmDbContext dbContext, ITenantProvider tenantProvider, IBlobStorageService blobStorage)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _blobStorage = blobStorage;
    }

    public async Task<TenantBrandingDto> GetBrandingAsync(CancellationToken ct = default)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, ct);

        if (tenant is null)
        {
            return new TenantBrandingDto("Unknown", null);
        }

        return new TenantBrandingDto(tenant.Name, tenant.LogoUrl);
    }

    public async Task<TenantBrandingDto> GetPublicBrandingAsync(string tenantKey, CancellationToken ct = default)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Key == tenantKey, ct);

        if (tenant is null)
        {
            return new TenantBrandingDto("Unknown", null);
        }

        return new TenantBrandingDto(tenant.Name, tenant.LogoUrl);
    }

    public async Task<TenantBrandingDto> UploadLogoAsync(Stream file, string fileName, string contentType, CancellationToken ct = default)
    {
        if (!AllowedContentTypes.Contains(contentType))
        {
            throw new InvalidOperationException($"File type '{contentType}' is not allowed. Allowed types: PNG, JPEG, WebP.");
        }

        if (file.Length > MaxFileSizeBytes)
        {
            throw new InvalidOperationException($"File size exceeds the maximum allowed size of 2 MB.");
        }

        var tenant = await _dbContext.Tenants
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, ct)
            ?? throw new InvalidOperationException("Tenant not found.");

        var extension = Path.GetExtension(fileName)?.TrimStart('.') ?? "png";
        var blobName = $"{tenant.Id}/logo.{extension}";

        var logoUrl = await _blobStorage.UploadAsync(ContainerName, blobName, file, contentType, ct);

        tenant.LogoUrl = logoUrl;
        tenant.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(ct);

        return new TenantBrandingDto(tenant.Name, tenant.LogoUrl);
    }

    public async Task<TenantBrandingDto> RemoveLogoAsync(CancellationToken ct = default)
    {
        var tenant = await _dbContext.Tenants
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, ct)
            ?? throw new InvalidOperationException("Tenant not found.");

        if (!string.IsNullOrWhiteSpace(tenant.LogoUrl))
        {
            var uri = new Uri(tenant.LogoUrl);
            // Blob name is everything after the container segment: /tenant-branding/{blobName}
            var segments = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
            if (segments.Length >= 2)
            {
                var blobName = string.Join('/', segments.Skip(1)); // skip container name
                await _blobStorage.DeleteAsync(ContainerName, blobName, ct);
            }

            tenant.LogoUrl = null;
            tenant.UpdatedAtUtc = DateTime.UtcNow;
            await _dbContext.SaveChangesAsync(ct);
        }

        return new TenantBrandingDto(tenant.Name, tenant.LogoUrl);
    }
}
