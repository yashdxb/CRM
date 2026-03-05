using System.Security.Claims;
using CRM.Enterprise.Api.Contracts.DirectChat;
using CRM.Enterprise.Application.DirectChat;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Enterprise.Api.Controllers;

[ApiController]
[Route("api/chat")]
[Authorize]
public sealed class DirectChatController : ControllerBase
{
    private readonly IDirectChatService _directChatService;

    public DirectChatController(IDirectChatService directChatService)
    {
        _directChatService = directChatService;
    }

    [HttpGet("threads")]
    public async Task<ActionResult<IReadOnlyList<DirectChatThreadItem>>> ListThreads(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var items = await _directChatService.ListThreadsAsync(userId.Value, cancellationToken);
        return Ok(items.Select(MapThread).ToList());
    }

    [HttpPost("threads/open")]
    public async Task<ActionResult<DirectChatThreadItem>> OpenThread(
        [FromBody] OpenDirectChatThreadRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var thread = await _directChatService.OpenThreadAsync(
            userId.Value,
            request.ParticipantUserIds ?? [],
            cancellationToken);

        return thread is null ? BadRequest() : Ok(MapThread(thread));
    }

    [HttpGet("threads/{threadId:guid}/messages")]
    public async Task<ActionResult<IReadOnlyList<DirectChatMessageItem>>> GetMessages(
        Guid threadId,
        [FromQuery] int take = 200,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var items = await _directChatService.GetMessagesAsync(userId.Value, threadId, take, cancellationToken);
        return Ok(items.Select(MapMessage).ToList());
    }

    [HttpPost("threads/{threadId:guid}/messages")]
    public async Task<ActionResult<DirectChatMessageItem>> Send(
        Guid threadId,
        [FromBody] SendDirectChatMessageRequest request,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var attachmentIds = request.AttachmentIds ?? [];
        var item = await _directChatService.SendMessageAsync(
            userId.Value,
            threadId,
            request.Message ?? string.Empty,
            attachmentIds,
            cancellationToken);
        return item is null ? BadRequest() : Ok(MapMessage(item));
    }

    [HttpPost("threads/{threadId:guid}/archive")]
    public async Task<ActionResult> Archive(
        Guid threadId,
        [FromBody] ArchiveDirectChatThreadRequest request,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var updated = await _directChatService.ArchiveThreadAsync(userId.Value, threadId, request.Archived, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpPost("threads/{threadId:guid}/clear")]
    public async Task<ActionResult> Clear(Guid threadId, CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var updated = await _directChatService.ClearThreadAsync(userId.Value, threadId, cancellationToken);
        return updated ? NoContent() : NotFound();
    }

    [HttpPost("threads/{threadId:guid}/participants")]
    public async Task<ActionResult> AddParticipant(
        Guid threadId,
        [FromBody] AddDirectChatParticipantRequest request,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var updated = await _directChatService.AddParticipantAsync(userId.Value, threadId, request.UserId, cancellationToken);
        return updated ? NoContent() : BadRequest();
    }

    [HttpPost("threads/{threadId:guid}/typing")]
    public async Task<ActionResult> Typing(
        Guid threadId,
        [FromBody] DirectChatTypingRequest request,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId is null)
        {
            return Unauthorized();
        }

        var published = await _directChatService.PublishTypingAsync(userId.Value, threadId, request.IsTyping, cancellationToken);
        return published ? NoContent() : BadRequest();
    }

    private Guid? GetCurrentUserId()
    {
        var claimValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(claimValue, out var userId) ? userId : null;
    }

    private static DirectChatThreadItem MapThread(DirectChatThreadDto dto)
        => new(
            dto.ThreadId,
            dto.Title,
            dto.LastMessageAtUtc,
            dto.IsArchived,
            dto.LastClearedAtUtc,
            dto.Participants.Select(participant => new DirectChatParticipantItem(participant.UserId, participant.DisplayName, participant.Email)).ToList());

    private static DirectChatMessageItem MapMessage(DirectChatMessageDto dto)
        => new(
            dto.MessageId,
            dto.ThreadId,
            dto.SenderUserId,
            dto.SenderDisplayName,
            dto.Content,
            dto.SentAtUtc,
            dto.Attachments.Select(a => new DirectChatAttachmentItem(
                a.AttachmentId,
                a.FileName,
                a.ContentType,
                a.Size,
                $"/api/attachments/{a.AttachmentId}/download")).ToList());
}
