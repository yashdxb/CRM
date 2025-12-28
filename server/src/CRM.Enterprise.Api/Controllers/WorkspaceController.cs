using CRM.Enterprise.Api.Contracts.Workspace;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationManage)]
[ApiController]
[Route("api/workspace")]
public class WorkspaceController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public WorkspaceController(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<WorkspaceSettingsResponse>> GetSettings(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);

        if (tenant is null)
        {
            return NotFound();
        }

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole));
    }

    [HttpPut]
    public async Task<ActionResult<WorkspaceSettingsResponse>> UpdateSettings(
        [FromBody] UpdateWorkspaceSettingsRequest request,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return NotFound();
        }

        tenant.Name = request.Name.Trim();
        tenant.TimeZone = request.TimeZone.Trim();
        tenant.Currency = request.Currency.Trim();
        tenant.ApprovalAmountThreshold = request.ApprovalAmountThreshold;
        tenant.ApprovalApproverRole = string.IsNullOrWhiteSpace(request.ApprovalApproverRole)
            ? null
            : request.ApprovalApproverRole.Trim();
        tenant.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole));
    }
}
