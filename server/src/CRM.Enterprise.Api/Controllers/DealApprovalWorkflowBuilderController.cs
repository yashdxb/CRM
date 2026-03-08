using CRM.Enterprise.Api.Contracts.Workflows;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Security;
using CRM.Enterprise.Workflows;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/workflows/deal-approval")]
public class DealApprovalWorkflowBuilderController : ControllerBase
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public DealApprovalWorkflowBuilderController(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<DealApprovalWorkflowResponse>> Get(CancellationToken cancellationToken)
    {
        var tenant = await ResolveTenantAsync(cancellationToken);
        if (tenant is null)
        {
            return NotFound();
        }

        var definition = DealApprovalWorkflowMapper.FromStoredJson(
            tenant.ApprovalWorkflowJson,
            tenant.ApprovalAmountThreshold,
            tenant.ApprovalApproverRole);

        return Ok(ToResponse(definition));
    }

    [HttpPut]
    [Authorize(Policy = Permissions.Policies.AdministrationManage)]
    public async Task<ActionResult<DealApprovalWorkflowResponse>> Put(
        [FromBody] UpdateDealApprovalWorkflowRequest request,
        CancellationToken cancellationToken)
    {
        var tenant = await ResolveTenantAsync(cancellationToken);
        if (tenant is null)
        {
            return NotFound();
        }

        var input = new DealApprovalWorkflowDefinition(
            request.Enabled,
            new DealApprovalWorkflowScopeDefinition(
                request.Scope?.Name ?? string.Empty,
                request.Scope?.Purpose ?? string.Empty,
                request.Scope?.Module ?? string.Empty,
                request.Scope?.Pipeline ?? string.Empty,
                request.Scope?.Stage ?? string.Empty,
                request.Scope?.Trigger ?? string.Empty,
                request.Scope?.Status ?? string.Empty,
                request.Scope?.Version ?? 1),
            (request.Steps ?? Array.Empty<UpdateDealApprovalWorkflowStepRequest>()).Select(step =>
                new DealApprovalWorkflowStepDefinition(
                    step.Order,
                    step.ApproverRoleId,
                    step.ApproverRole,
                    step.AmountThreshold,
                    step.Purpose,
                    step.NodeId)).ToArray(),
            (request.Nodes ?? Array.Empty<UpdateDealApprovalWorkflowNodeRequest>()).Select(node =>
                new DealApprovalWorkflowNodeDefinition(node.Id, node.Type, node.X, node.Y, node.Label)).ToArray(),
            (request.Connections ?? Array.Empty<UpdateDealApprovalWorkflowConnectionRequest>()).Select(connection =>
                new DealApprovalWorkflowConnectionDefinition(connection.Source, connection.Target)).ToArray());

        var normalized = DealApprovalWorkflowMapper.Normalize(input);
        if (request.Enabled && normalized.Steps.Count == 0)
        {
            return BadRequest("At least one approval step is required when workflow is enabled.");
        }

        tenant.ApprovalWorkflowJson = JsonSerializer.Serialize(normalized, JsonOptions);

        if (normalized.Steps.Count > 0)
        {
            tenant.ApprovalApproverRole = normalized.Steps[0].ApproverRole;
            tenant.ApprovalAmountThreshold = normalized.Steps[0].AmountThreshold;
        }

        tenant.UpdatedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return Ok(ToResponse(normalized));
    }

    private async Task<Tenant?> ResolveTenantAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        return await _dbContext.Tenants.FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
    }

    private static DealApprovalWorkflowResponse ToResponse(DealApprovalWorkflowDefinition definition)
    {
        return new DealApprovalWorkflowResponse(
            definition.Enabled,
            new DealApprovalWorkflowScopeResponse(
                definition.Scope.Name,
                definition.Scope.Purpose,
                definition.Scope.Module,
                definition.Scope.Pipeline,
                definition.Scope.Stage,
                definition.Scope.Trigger,
                definition.Scope.Status,
                definition.Scope.Version),
            definition.Steps.Select(step =>
                    new DealApprovalWorkflowStepResponse(
                        step.Order,
                        step.ApproverRole,
                        step.AmountThreshold,
                        step.Purpose,
                        step.NodeId))
                .ToArray(),
            definition.Nodes.Select(node =>
                    new DealApprovalWorkflowNodeResponse(node.Id, node.Type, node.X, node.Y, node.Label))
                .ToArray(),
            definition.Connections.Select(connection =>
                    new DealApprovalWorkflowConnectionResponse(connection.Source, connection.Target))
                .ToArray());
    }
}
