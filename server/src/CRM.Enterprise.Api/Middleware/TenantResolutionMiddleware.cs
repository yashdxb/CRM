using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Middleware;

public class TenantResolutionMiddleware
{
    private const string TenantHeader = "X-Tenant-Key";
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public TenantResolutionMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context, CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        var path = context.Request.Path.Value ?? string.Empty;
        if (HttpMethods.IsOptions(context.Request.Method) ||
            path.StartsWith("/health", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
        {
            await _next(context);
            return;
        }

        if (path.StartsWith("/api/auth/login", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/api/auth/config", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/api/tenant-branding/public", StringComparison.OrdinalIgnoreCase))
        {
            // Allow public auth bootstrapping even if the tenant header is stale, but set it if we can resolve it.
            var loginHost = context.Request.Host.Host;
            var loginTenantKey = context.Request.Headers[TenantHeader].FirstOrDefault();
            if (string.IsNullOrWhiteSpace(loginTenantKey))
            {
                loginTenantKey = GetTenantFromHost(loginHost);
            }
            if (string.IsNullOrWhiteSpace(loginTenantKey))
            {
                loginTenantKey = _configuration["Tenant:DefaultKey"] ?? "default";
            }

            if (!string.IsNullOrWhiteSpace(loginTenantKey))
            {
                try
                {
                    var loginTenant = await dbContext.Tenants
                        .AsNoTracking()
                        .FirstOrDefaultAsync(t => t.Key == loginTenantKey);
                    if (loginTenant is not null)
                    {
                        tenantProvider.SetTenant(loginTenant.Id, loginTenant.Key);
                    }
                }
                catch
                {
                    // Keep public auth bootstrap alive even if tenant lookup is temporarily unavailable.
                }
            }

            await _next(context);
            return;
        }

        var host = context.Request.Host.Host;
        var tenantKey = context.Request.Headers[TenantHeader].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = context.Request.Query["tenantKey"].FirstOrDefault();
        }
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            var authenticatedTenant = await ResolveTenantForAuthenticatedUserAsync(context, dbContext);
            if (authenticatedTenant is not null)
            {
                tenantProvider.SetTenant(authenticatedTenant.Id, authenticatedTenant.Key);
                context.Items["TenantId"] = authenticatedTenant.Id;
                context.Items["TenantKey"] = authenticatedTenant.Key;
                await _next(context);
                return;
            }
        }
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = GetTenantFromHost(host);
        }

        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = _configuration["Tenant:DefaultKey"] ?? "default";
        }

        // Log the resolved tenantKey and host for debugging
        Console.WriteLine($"[TenantResolution] Host: {host}, Resolved TenantKey: {tenantKey}");

        var tenant = await dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Key == tenantKey);

        if (tenant is null)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new { message = $"Invalid tenant: {tenantKey}" });
            return;
        }

        tenantProvider.SetTenant(tenant.Id, tenant.Key);
        context.Items["TenantId"] = tenant.Id;
        context.Items["TenantKey"] = tenant.Key;
        await _next(context);
    }

    private string? GetTenantFromHost(string? host)
    {
        if (string.IsNullOrWhiteSpace(host))
        {
            return null;
        }

        if (host.Equals("localhost", StringComparison.OrdinalIgnoreCase) ||
            host.Equals("127.0.0.1", StringComparison.OrdinalIgnoreCase) ||
            host.Equals("::1", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var suffix = _configuration["Tenant:HostSuffix"];
        if (!string.IsNullOrWhiteSpace(suffix) &&
            host.EndsWith(suffix, StringComparison.OrdinalIgnoreCase))
        {
            var trimmed = host[..(host.Length - suffix.Length)].TrimEnd('.');
            if (!string.IsNullOrWhiteSpace(trimmed) && !trimmed.Contains('.'))
            {
                return trimmed;
            }
        }

        if (host.Equals("northedgesystem.com", StringComparison.OrdinalIgnoreCase) ||
            host.EndsWith(".northedgesystem.com", StringComparison.OrdinalIgnoreCase))
        {
            var domainParts = host.Split('.', StringSplitOptions.RemoveEmptyEntries);
            if (domainParts.Length > 0 && domainParts[0].Equals("www", StringComparison.OrdinalIgnoreCase))
            {
                return null;
            }
        }

        if (host.EndsWith(".azurewebsites.net", StringComparison.OrdinalIgnoreCase) ||
            host.EndsWith(".azurestaticapps.net", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        var parts = host.Split('.', StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length >= 3)
        {
            return parts[0];
        }

        if (parts.Length == 2 && parts[1].Equals("localhost", StringComparison.OrdinalIgnoreCase))
        {
            return parts[0];
        }

        return null;
    }

    private static async Task<CRM.Enterprise.Domain.Entities.Tenant?> ResolveTenantForAuthenticatedUserAsync(HttpContext context, CrmDbContext dbContext)
    {
        if (context.User?.Identity?.IsAuthenticated != true)
        {
            return null;
        }

        var userIdClaim =
            context.User.FindFirstValue(ClaimTypes.NameIdentifier) ??
            context.User.FindFirstValue("sub");
        var emailClaim =
            context.User.FindFirstValue(ClaimTypes.Email) ??
            context.User.FindFirstValue("email");

        Guid? tenantId = null;

        if (Guid.TryParse(userIdClaim, out var userId))
        {
            tenantId = await dbContext.Users
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Where(u => u.Id == userId && !u.IsDeleted)
                .Select(u => (Guid?)u.TenantId)
                .FirstOrDefaultAsync();
        }

        if (!tenantId.HasValue && !string.IsNullOrWhiteSpace(emailClaim))
        {
            var normalizedEmail = emailClaim.Trim().ToLowerInvariant();
            tenantId = await dbContext.Users
                .IgnoreQueryFilters()
                .AsNoTracking()
                .Where(u => !u.IsDeleted && ((u.EmailNormalized ?? u.Email.ToLower()) == normalizedEmail))
                .Select(u => (Guid?)u.TenantId)
                .FirstOrDefaultAsync();
        }

        if (!tenantId.HasValue || tenantId == Guid.Empty)
        {
            return null;
        }

        return await dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId.Value);
    }
}
