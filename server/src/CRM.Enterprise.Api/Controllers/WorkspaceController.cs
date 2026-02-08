using CRM.Enterprise.Api.Contracts.Workspace;
using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Qualifications;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/workspace")]
public class WorkspaceController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

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
            tenant.LeadFirstTouchSlaHours,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole,
            ResolveApprovalWorkflowPolicy(tenant),
            ResolveQualificationPolicy(tenant)));
    }

    [HttpPut]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
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
        tenant.LeadFirstTouchSlaHours = request.LeadFirstTouchSlaHours;
        tenant.ApprovalAmountThreshold = request.ApprovalAmountThreshold;
        tenant.ApprovalApproverRole = string.IsNullOrWhiteSpace(request.ApprovalApproverRole)
            ? null
            : request.ApprovalApproverRole.Trim();
        if (request.ApprovalWorkflowPolicy is not null)
        {
            tenant.ApprovalWorkflowJson = JsonSerializer.Serialize(request.ApprovalWorkflowPolicy, JsonOptions);
        }
        if (request.QualificationPolicy is not null)
        {
            tenant.QualificationPolicyJson = JsonSerializer.Serialize(request.QualificationPolicy, JsonOptions);
        }
        tenant.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(new WorkspaceSettingsResponse(
            tenant.Id,
            tenant.Key,
            tenant.Name,
            tenant.TimeZone,
            tenant.Currency,
            tenant.LeadFirstTouchSlaHours,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole,
            ResolveApprovalWorkflowPolicy(tenant),
            ResolveQualificationPolicy(tenant)));
    }

    private static QualificationPolicy ResolveQualificationPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.QualificationPolicyJson))
        {
            return QualificationPolicyDefaults.CreateDefault();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<QualificationPolicy>(tenant.QualificationPolicyJson, JsonOptions);
            return parsed ?? QualificationPolicyDefaults.CreateDefault();
        }
        catch (JsonException)
        {
            return QualificationPolicyDefaults.CreateDefault();
        }
    }

    private static ApprovalWorkflowPolicy ResolveApprovalWorkflowPolicy(Tenant tenant)
    {
        if (string.IsNullOrWhiteSpace(tenant.ApprovalWorkflowJson))
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<ApprovalWorkflowPolicy>(tenant.ApprovalWorkflowJson, JsonOptions);
            return parsed ?? ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }
        catch (JsonException)
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }
    }
}
