using System.Security.Claims;
using ApiAssistantActionExecuteRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionExecuteRequest;
using ApiAssistantActionReviewRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionReviewRequest;
using ApiAssistantActionUndoRequest = CRM.Enterprise.Api.Contracts.Assistant.AssistantActionUndoRequest;
using CRM.Enterprise.Api.Contracts.Assistant;
using CRM.Enterprise.Api.Authorization;
using AppAssistantActionExecutionRequest = CRM.Enterprise.Application.Assistant.AssistantActionExecutionRequest;
using AppAssistantActionReviewRequest = CRM.Enterprise.Application.Assistant.AssistantActionReviewRequest;
using AppAssistantActionUndoRequest = CRM.Enterprise.Application.Assistant.AssistantActionUndoRequest;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Tenants;
using SecurityPermissions = CRM.Enterprise.Security.Permissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = SecurityPermissions.Policies.DashboardView)]
[ApiController]
[Route("api/assistant")]
public class AssistantController : ControllerBase
{
    private readonly IAssistantChatService _chatService;
    private readonly ILogger<AssistantController> _logger;
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly ITenantProvider _tenantProvider;

    public AssistantController(
        IAssistantChatService chatService,
        ILogger<AssistantController> logger,
        ICrmRealtimePublisher realtimePublisher,
        ITenantProvider tenantProvider)
    {
        _chatService = chatService;
        _logger = logger;
        _realtimePublisher = realtimePublisher;
        _tenantProvider = tenantProvider;
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
            var conversationId = string.IsNullOrWhiteSpace(request.ConversationId)
                ? Guid.NewGuid().ToString("N")
                : request.ConversationId!.Trim();

            if (request.Stream)
            {
                await PublishAssistantStreamAsync(userId.Value, conversationId, result.Reply, cancellationToken);
                return Ok(new AssistantChatResponse(
                    string.Empty,
                    result.Messages.Select(MapMessage).ToList(),
                    conversationId,
                    Streamed: true));
            }

            return Ok(new AssistantChatResponse(
                result.Reply,
                result.Messages.Select(MapMessage).ToList(),
                conversationId,
                Streamed: false));
        }
        catch (AssistantRateLimitException ex)
        {
            if (request.Stream)
            {
                await PublishAssistantFailureAsync(userId.Value, request.ConversationId, ex.Message, cancellationToken);
            }
            Response.Headers["Retry-After"] = ex.RetryAfterSeconds.ToString();
            return StatusCode(429, new { error = ex.Message, retryAfterSeconds = ex.RetryAfterSeconds });
        }
        catch (InvalidOperationException ex)
        {
            if (request.Stream)
            {
                await PublishAssistantFailureAsync(userId.Value, request.ConversationId, "Assistant is unavailable right now. Please try again shortly.", cancellationToken);
            }
            _logger.LogWarning(ex, "Assistant service unavailable for user {UserId}", userId);
            return StatusCode(503, new { error = "Assistant is unavailable right now. Please try again shortly." });
        }
        catch (Exception ex)
        {
            if (request.Stream)
            {
                await PublishAssistantFailureAsync(userId.Value, request.ConversationId, "An unexpected error occurred while processing your message", cancellationToken);
            }
            _logger.LogError(ex, "Unexpected error sending chat message for user {UserId}", userId);
            return StatusCode(500, new { error = "An unexpected error occurred while processing your message" });
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
                action.Score,
                action.RiskTier,
                action.Urgency,
                action.OwnerScope,
                action.DueWindow,
                action.ActionType,
                action.EntityType,
                action.EntityId,
                action.Priority,
                action.Reasons,
                action.Entities,
                action.ImpactEstimate,
                action.ReviewGuidance)).ToList(),
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

        // Validate required fields
        if (string.IsNullOrWhiteSpace(request.ActionId))
        {
            return BadRequest(new { error = "ActionId is required" });
        }

        if (string.IsNullOrWhiteSpace(request.ActionType))
        {
            return BadRequest(new { error = "ActionType is required" });
        }

        if (!CanExecuteAction(request.ActionType))
        {
            _logger.LogWarning("User {UserId} attempted to execute action type {ActionType} without permission", userId, request.ActionType);
            return Forbid();
        }

        try
        {
            var result = await _chatService.ExecuteActionAsync(
                userId.Value,
                MapExecuteRequest(request),
                cancellationToken);

            return Ok(new AssistantActionExecutionResponse(
                result.Status,
                result.Message,
                result.RequiresReview,
                result.CreatedActivityId,
                result.CreatedApprovalId));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error executing action {ActionId} for user {UserId}", request.ActionId, userId);
            return StatusCode(500, new { error = "An unexpected error occurred while executing the action" });
        }
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

        // Validate required fields
        if (string.IsNullOrWhiteSpace(request.ActionId))
        {
            return BadRequest(new { error = "ActionId is required" });
        }

        if (string.IsNullOrWhiteSpace(request.ActionType))
        {
            return BadRequest(new { error = "ActionType is required" });
        }

        if (request.Approved && !CanExecuteAction(request.ActionType))
        {
            _logger.LogWarning("User {UserId} attempted to approve action type {ActionType} without permission", userId, request.ActionType);
            return Forbid();
        }

        try
        {
            var result = await _chatService.ReviewActionAsync(
                userId.Value,
                MapReviewRequest(request),
                cancellationToken);

            return Ok(new AssistantActionExecutionResponse(
                result.Status,
                result.Message,
                result.RequiresReview,
                result.CreatedActivityId,
                result.CreatedApprovalId));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reviewing action {ActionId} for user {UserId}", request.ActionId, userId);
            return StatusCode(500, new { error = "An unexpected error occurred while reviewing the action" });
        }
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

        // Validate required field
        if (request.CreatedActivityId == Guid.Empty)
        {
            return BadRequest(new { error = "CreatedActivityId is required" });
        }

        try
        {
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
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error undoing action {ActivityId} for user {UserId}", request.CreatedActivityId, userId);
            return StatusCode(500, new { error = "An unexpected error occurred while undoing the action" });
        }
    }

    private static AssistantChatMessageItem MapMessage(AssistantChatMessage message)
        => new(message.Id, message.Role, message.Content, message.CreatedAtUtc);

    private static AppAssistantActionExecutionRequest MapExecuteRequest(ApiAssistantActionExecuteRequest request)
        => new(
            request.ActionId ?? string.Empty,
            request.ActionType ?? string.Empty,
            request.RiskTier ?? string.Empty,
            request.EntityType,
            request.EntityId,
            request.Note);

    private static AppAssistantActionReviewRequest MapReviewRequest(ApiAssistantActionReviewRequest request)
        => new(
            request.ActionId ?? string.Empty,
            request.ActionType ?? string.Empty,
            request.RiskTier ?? string.Empty,
            request.EntityType,
            request.EntityId,
            request.Approved,
            request.ReviewNote);

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }

    private bool CanExecuteAction(string? actionType)
    {
        if (string.IsNullOrWhiteSpace(actionType))
        {
            return false;
        }

        var requiredPermission = AssistantActionTypes.GetRequiredPermission(actionType);
        return HasPermission(requiredPermission);
    }

    private bool HasPermission(string permission)
    {
        return User.Claims.Any(claim =>
            string.Equals(claim.Type, SecurityPermissions.ClaimType, StringComparison.OrdinalIgnoreCase)
            && string.Equals(claim.Value, permission, StringComparison.OrdinalIgnoreCase));
    }

    private async Task PublishAssistantStreamAsync(
        Guid userId,
        string conversationId,
        string reply,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty || userId == Guid.Empty)
        {
            return;
        }

        const int chunkSize = 48;
        var safeReply = reply ?? string.Empty;
        var sequence = 0;

        for (var i = 0; i < safeReply.Length; i += chunkSize)
        {
            var token = safeReply.Substring(i, Math.Min(chunkSize, safeReply.Length - i));
            await _realtimePublisher.PublishUserEventAsync(
                tenantId,
                userId,
                "assistant.chat.token",
                new
                {
                    conversationId,
                    sequence,
                    token
                },
                cancellationToken);
            sequence++;
        }

        await _realtimePublisher.PublishUserEventAsync(
            tenantId,
            userId,
            "assistant.chat.completed",
            new
            {
                conversationId,
                content = safeReply,
                tokenCount = sequence
            },
            cancellationToken);
    }

    private Task PublishAssistantFailureAsync(Guid userId, string? conversationId, string error, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty || userId == Guid.Empty)
        {
            return Task.CompletedTask;
        }

        return _realtimePublisher.PublishUserEventAsync(
            tenantId,
            userId,
            "assistant.chat.failed",
            new
            {
                conversationId = string.IsNullOrWhiteSpace(conversationId) ? null : conversationId,
                error
            },
            cancellationToken);
    }
}
