using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.Assistant;
using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
        catch (InvalidOperationException ex)
        {
            return StatusCode(503, new { error = "Assistant is unavailable right now. Please try again shortly." });
        }
    }

    private static AssistantChatMessageItem MapMessage(AssistantChatMessage message)
        => new(message.Id, message.Role, message.Content, message.CreatedAtUtc);

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }
}
