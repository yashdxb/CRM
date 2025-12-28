using CRM.Enterprise.Api.Contracts.Tenants;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.TenantsManage)]
[ApiController]
[Route("api/tenants")]
public class TenantsController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvisioningService _provisioningService;

    public TenantsController(CrmDbContext dbContext, ITenantProvisioningService provisioningService)
    {
        _dbContext = dbContext;
        _provisioningService = provisioningService;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<TenantSummaryResponse>>> GetTenants(CancellationToken cancellationToken)
    {
        var tenants = await _dbContext.Tenants
            .AsNoTracking()
            .OrderBy(t => t.Name)
            .Select(t => new TenantSummaryResponse(t.Id, t.Key, t.Name, t.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return Ok(tenants);
    }

    [HttpPost]
    public async Task<ActionResult<TenantSummaryResponse>> CreateTenant(
        [FromBody] CreateTenantRequest request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Key) ||
            string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.AdminName) ||
            string.IsNullOrWhiteSpace(request.AdminEmail) ||
            string.IsNullOrWhiteSpace(request.AdminPassword))
        {
            return BadRequest(new { message = "Tenant key, name, and admin credentials are required." });
        }

        var normalizedKey = request.Key.Trim();
        if (await _dbContext.Tenants.AnyAsync(t => t.Key == normalizedKey, cancellationToken))
        {
            return Conflict(new { message = "Tenant key already exists." });
        }

        var tenantId = await _provisioningService.ProvisionTenantAsync(
            normalizedKey,
            request.Name,
            request.AdminName,
            request.AdminEmail,
            request.AdminPassword,
            request.TimeZone,
            request.Currency,
            cancellationToken);

        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant is null)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Tenant created but could not be loaded." });
        }

        return Ok(new TenantSummaryResponse(tenant.Id, tenant.Key, tenant.Name, tenant.CreatedAtUtc));
    }
}
