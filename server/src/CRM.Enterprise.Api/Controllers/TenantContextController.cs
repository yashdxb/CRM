using CRM.Enterprise.Api.Contracts.Tenants;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/tenant-context")]
public class TenantContextController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public TenantContextController(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
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

        return Ok(new TenantContextResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.IndustryPreset,
            modules));
    }
}
