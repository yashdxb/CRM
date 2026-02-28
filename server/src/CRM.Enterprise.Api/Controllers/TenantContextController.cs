using CRM.Enterprise.Api.Contracts.Tenants;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/tenant-context")]
public class TenantContextController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IConfiguration _configuration;

    public TenantContextController(CrmDbContext dbContext, ITenantProvider tenantProvider, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<ActionResult<TenantContextResponse>> GetTenantContext(CancellationToken cancellationToken)
    {
        if (_tenantProvider.TenantId == Guid.Empty)
        {
            return Unauthorized(new { message = "Tenant context is not available." });
        }

        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken);

        if (tenant is null)
        {
            return NotFound(new { message = "Tenant not found." });
        }

        var modules = tenant.IndustryModules == null
            ? Array.Empty<string>()
            : tenant.IndustryModules.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        var marketingDefaultEnabled = _configuration.GetValue<bool?>("Features:Marketing:Campaigns:EnabledByDefault") ?? false;
        var marketingEnabledTenants = _configuration
            .GetSection("Features:Marketing:Campaigns:EnabledTenants")
            .Get<string[]>() ?? Array.Empty<string>();
        var marketingEnabled = marketingDefaultEnabled
            || marketingEnabledTenants.Contains(tenant.Key, StringComparer.OrdinalIgnoreCase);

        var featureFlags = new Dictionary<string, bool>(StringComparer.OrdinalIgnoreCase)
        {
            ["marketing.campaigns"] = marketingEnabled
        };

        return Ok(new TenantContextResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.IndustryPreset,
            modules,
            featureFlags));
    }
}
