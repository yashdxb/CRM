using System.Security.Claims;
using System.Linq;
using CRM.Enterprise.Api.Contracts.Opportunities;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
public class OpportunityApprovalsController : ControllerBase
{
    private readonly IOpportunityApprovalService _approvalService;

    public OpportunityApprovalsController(IOpportunityApprovalService approvalService)
    {
        _approvalService = approvalService;
    }

    [HttpGet("api/opportunities/{id:guid}/approvals")]
    public async Task<ActionResult<IEnumerable<OpportunityApprovalItem>>> GetApprovals(Guid id, CancellationToken cancellationToken)
    {
        var items = await _approvalService.GetForOpportunityAsync(id, cancellationToken);
        if (items is null)
        {
            return NotFound();
        }

        return Ok(items.Select(ToApiItem));
    }

    [HttpGet("api/opportunity-approvals")]
    public async Task<ActionResult<IEnumerable<OpportunityApprovalInboxItem>>> GetInbox(
        [FromQuery] string? status,
        [FromQuery] string? purpose,
        CancellationToken cancellationToken)
    {
        var items = await _approvalService.GetInboxAsync(status, purpose, cancellationToken);
        return Ok(items.Select(ToInboxItem));
    }

    [HttpPost("api/opportunities/{id:guid}/approvals")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesApprovalsRequest)]
    public async Task<ActionResult<OpportunityApprovalItem>> RequestApproval(
        Guid id,
        [FromBody] OpportunityApprovalRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _approvalService.RequestAsync(
            id,
            request.Amount,
            request.Currency ?? "USD",
            string.IsNullOrWhiteSpace(request.Purpose) ? "Close" : request.Purpose,
            GetActor(),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        return Ok(ToApiItem(result.Value!));
    }

    [HttpPatch("api/opportunity-approvals/{approvalId:guid}")]
    public async Task<ActionResult<OpportunityApprovalItem>> Decide(
        Guid approvalId,
        [FromBody] OpportunityApprovalDecisionRequest request,
        CancellationToken cancellationToken)
    {
        if (!CanApprove())
        {
            return Forbid();
        }

        var result = await _approvalService.DecideAsync(
            approvalId,
            request.Approved,
            request.Notes,
            GetActor(),
            cancellationToken);

        if (result.NotFound)
        {
            return NotFound();
        }

        if (!result.Success)
        {
            return BadRequest(result.Error);
        }

        return Ok(ToApiItem(result.Value!));
    }

    private static OpportunityApprovalItem ToApiItem(OpportunityApprovalDto dto)
    {
        return new OpportunityApprovalItem(
            dto.Id,
            dto.OpportunityId,
            dto.Status,
            dto.Purpose,
            dto.ApproverRole,
            dto.ApprovalChainId,
            dto.StepOrder,
            dto.TotalSteps,
            dto.ChainStatus,
            dto.ApproverUserId,
            dto.ApproverName,
            dto.RequestedByUserId,
            dto.RequestedByName,
            dto.RequestedOn,
            dto.DecisionOn,
            dto.Notes,
            dto.Amount,
            dto.Currency);
    }

    private static OpportunityApprovalInboxItem ToInboxItem(OpportunityApprovalInboxItemDto dto)
    {
        return new OpportunityApprovalInboxItem(
            dto.Id,
            dto.OpportunityId,
            dto.OpportunityName,
            dto.AccountName,
            dto.Status,
            dto.Purpose,
            dto.ApproverRole,
            dto.ApprovalChainId,
            dto.StepOrder,
            dto.TotalSteps,
            dto.ChainStatus,
            dto.ApproverUserId,
            dto.ApproverName,
            dto.RequestedByUserId,
            dto.RequestedByName,
            dto.RequestedOn,
            dto.DecisionOn,
            dto.Notes,
            dto.Amount,
            dto.Currency,
            dto.DecisionType,
            dto.Priority,
            dto.RiskLevel,
            dto.SlaStatus,
            dto.SlaDueAtUtc,
            dto.IsEscalated,
            dto.RequestedAgeHours,
            dto.PolicyReason,
            dto.BusinessImpactLabel);
    }

    private ActorContext GetActor()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userId = Guid.TryParse(subject, out var parsed) ? parsed : (Guid?)null;
        var name = User.FindFirstValue(ClaimTypes.Name) ?? User.Identity?.Name;
        return new ActorContext(userId, name);
    }

    private bool CanApprove()
    {
        return HasPermission(Permissions.Policies.OpportunitiesApprovalsApprove)
               || HasPermission(Permissions.Policies.OpportunitiesApprovalsOverride);
    }

    private bool HasPermission(string permission)
    {
        return User.Claims.Any(claim =>
            string.Equals(claim.Type, Permissions.ClaimType, StringComparison.OrdinalIgnoreCase)
            && string.Equals(claim.Value, permission, StringComparison.OrdinalIgnoreCase));
    }
}
