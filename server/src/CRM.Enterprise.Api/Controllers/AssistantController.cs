using System.Security.Claims;
using ApiAssistantActionExecuteRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionExecuteRequest;
using ApiAssistantActionReviewRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionReviewRequest;
using ApiAssistantActionUndoRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionUndoRequest;
using CRM.Enterprise.Api.Contracts.Assistant;
using AppAssistantActionExecutionRequest = CRM.Enterprise.Application.Assistant.AssistantActionExecutionRequest;
using AppAssistantActionReviewRequest = CRM.Enterprise.Application.Assistant.AssistantActionReviewRequest;
using AppAssistantActionUndoRequest = CRM.Enterprise.Application.Assistant.AssistantActionUndoRequest;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.DashboardView)]
[ApiController]
[Route("api/assistant")]
public class AssistantController : ControllerBase
{
    private readonly IAssistantChatService _chatService;

    public AssistantController(IAssistantChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpGet("history")]
    public async Task<ActionResult<IReadOnlyList<AssistantChatMessageItem>>> GetHistory(
        [FromQuery] int take = 50,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var messages = await _chatService.GetHistoryAsync(userId.Value, cancellationToken, take);
        return Ok(messages.Select(MapMessage).ToList());
    }

    [HttpPost("chat")]
    public async Task<ActionResult<AssistantChatResponse>> Send(
        [FromBody] AssistantChatRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        try
        {
            var result = await _chatService.SendAsync(userId.Value, request.Message ?? string.Empty, cancellationToken);
            return Ok(new AssistantChatResponse(
                result.Reply,
                result.Messages.Select(MapMessage).ToList()));
        }
        catch (AssistantRateLimitException ex)
        {
            Response.Headers["Retry-After"] = ex.RetryAfterSeconds.ToString();
            return StatusCode(429, new { error = ex.Message, retryAfterSeconds = ex.RetryAfterSeconds });
        }
        catch (InvalidOperationException)
        {
            return StatusCode(503, new { error = "Assistant is unavailable right now. Please try again shortly." });
        }
    }

    [HttpGet("insights")]
    public async Task<ActionResult<AssistantInsightsResponse>> GetInsights(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var insights = await _chatService.GetInsightsAsync(userId.Value, cancellationToken);
        return Ok(new AssistantInsightsResponse(
            insights.Scope.ToString(),
            insights.Kpis.Select(kpi => new AssistantInsightsKpiItem(kpi.Key, kpi.Label, kpi.Value, kpi.Severity)).ToList(),
            insights.Actions.Select(action => new AssistantInsightsActionItem(
                action.Id,
                action.Title,
                action.Description,
                action.RiskTier,
                action.OwnerScope,
                action.DueWindow,
                action.ActionType,
                action.EntityType,
                action.EntityId,
                action.Priority)).ToList(),
            insights.GeneratedAtUtc));
    }

    [HttpPost("actions/execute")]
    public async Task<ActionResult<AssistantActionExecutionResponse>> ExecuteAction(
        [FromBody] ApiAssistantActionExecuteRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        if (!CanExecuteAction(request.ActionType))
        {
            return Forbid();
        }

        var result = await _chatService.ExecuteActionAsync(
            userId.Value,
            new AppAssistantActionExecutionRequest(
                request.ActionId ?? string.Empty,
                request.ActionType ?? string.Empty,
                request.RiskTier ?? string.Empty,
                request.EntityType,
                request.EntityId,
                request.Note),
            cancellationToken);

        return Ok(new AssistantActionExecutionResponse(
            result.Status,
            result.Message,
            result.RequiresReview,
            result.CreatedActivityId,
            result.CreatedApprovalId));
    }

    [HttpPost("actions/review")]
    public async Task<ActionResult<AssistantActionExecutionResponse>> ReviewAction(
        [FromBody] ApiAssistantActionReviewRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        if (request.Approved && !CanExecuteAction(request.ActionType))
        {
            return Forbid();
        }

        var result = await _chatService.ReviewActionAsync(
            userId.Value,
            new AppAssistantActionReviewRequest(
                request.ActionId ?? string.Empty,
                request.ActionType ?? string.Empty,
                request.RiskTier ?? string.Empty,
                request.EntityType,
                request.EntityId,
                request.Approved,
                request.ReviewNote),
            cancellationToken);

        return Ok(new AssistantActionExecutionResponse(
            result.Status,
            result.Message,
            result.RequiresReview,
            result.CreatedActivityId,
            result.CreatedApprovalId));
    }

    [HttpPost("actions/undo")]
    public async Task<ActionResult<AssistantActionExecutionResponse>> UndoAction(
        [FromBody] ApiAssistantActionUndoRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var result = await _chatService.UndoActionAsync(
            userId.Value,
            new AppAssistantActionUndoRequest(request.CreatedActivityId, request.ActionType),
            cancellationToken);

        return Ok(new AssistantActionExecutionResponse(
            result.Status,
            result.Message,
            result.RequiresReview,
            result.CreatedActivityId,
            result.CreatedApprovalId));
    }

    private static AssistantChatMessageItem MapMessage(AssistantChatMessage message)
        => new(message.Id, message.Role, message.Content, message.CreatedAtUtc);

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }

    private bool CanExecuteAction(string? actionType)
    {
        var normalized = (actionType ?? string.Empty).Trim().ToLowerInvariant();
        return normalized switch
        {
            "approval_follow_up" => HasPermission(Permissions.Policies.OpportunitiesApprovalsRequest),
            _ => HasPermission(Permissions.Policies.ActivitiesManage)
        };
    }

    private bool HasPermission(string permission)
    {
        return User.Claims.Any(claim =>
            string.Equals(claim.Type, Permissions.ClaimType, StringComparison.OrdinalIgnoreCase)
            && string.Equals(claim.Value, permission, StringComparison.OrdinalIgnoreCase));
    }
}
