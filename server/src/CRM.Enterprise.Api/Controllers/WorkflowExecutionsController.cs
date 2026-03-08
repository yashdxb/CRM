using CRM.Enterprise.Api.Contracts.Workflows;
using CRM.Enterprise.Application.Workflows;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.AdministrationView)]
[ApiController]
[Route("api/workflows/executions")]
public sealed class WorkflowExecutionsController : ControllerBase
{
    private readonly IWorkflowExecutionService _service;

    public WorkflowExecutionsController(IWorkflowExecutionService service)
    {
        _service = service;
    }

    [HttpGet("deal-approval/status")]
    public async Task<ActionResult<WorkflowExecutionStatusResponse>> GetDealApprovalStatus(CancellationToken cancellationToken)
    {
        var status = await _service.GetDealApprovalStatusAsync(cancellationToken);
        return Ok(new WorkflowExecutionStatusResponse(
            status.CurrentExecutionId,
            status.PendingApprovals,
            status.RunningExecutions,
            status.CompletedToday,
            status.LastUpdatedAtUtc,
            status.CurrentOpportunityId,
            status.CurrentOpportunityName,
            status.CurrentPurpose,
            status.CurrentStepOrder,
            status.CurrentTotalSteps,
            status.CurrentPendingApproverRole,
            status.CurrentPendingApproverName,
            status.CurrentDecisionRequestId,
            status.CurrentDecisionStatus));
    }

    [HttpGet("deal-approval/history")]
    public async Task<ActionResult<IReadOnlyList<WorkflowExecutionHistoryItemResponse>>> GetDealApprovalHistory(
        [FromQuery] int take = 50,
        CancellationToken cancellationToken = default)
    {
        var items = await _service.GetDealApprovalHistoryAsync(take, cancellationToken);
        return Ok(items.Select(item => new WorkflowExecutionHistoryItemResponse(
            item.ExecutionId,
            item.OpportunityId,
            item.OpportunityName,
            item.WorkflowName,
            item.WorkflowVersion,
            item.Purpose,
            item.Status,
            item.TriggeredBy,
            item.CurrentStepOrder,
            item.TotalSteps,
            item.PendingApproverRole,
            item.PendingApproverName,
            item.DecisionRequestId,
            item.DecisionStatus,
            item.StartedAtUtc,
            item.CompletedAtUtc,
            item.Summary)).ToList());
    }
}
