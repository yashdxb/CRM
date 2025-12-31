using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

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
        if (path.StartsWith("/health", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/swagger", StringComparison.OrdinalIgnoreCase))
        {
            await _next(context);
            return;
        }

        var tenantKey = context.Request.Headers[TenantHeader].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = GetTenantFromHost(context.Request.Host.Host);
        }

        if (string.IsNullOrWhiteSpace(tenantKey))
        {
            tenantKey = _configuration["Tenant:DefaultKey"] ?? "default";
        }

        var tenant = await dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Key == tenantKey);

        if (tenant is null)
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(new { message = "Invalid tenant." });
            return;
        }

        tenantProvider.SetTenant(tenant.Id, tenant.Key);
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
}
