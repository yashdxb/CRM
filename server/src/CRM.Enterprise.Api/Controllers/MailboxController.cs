using CRM.Enterprise.Api.Contracts.Emails;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

/// <summary>
/// Manages user mailbox synchronization and message operations for connected email accounts.
/// </summary>
[Authorize]
[ApiController]
[Route("api/mailbox")]
public class MailboxController : ControllerBase
{
    private readonly IMailboxSyncService _mailboxService;
    private readonly IMailboxProxyService _proxyService;
    private readonly ICrmEmailLinkService _linkService;
    private readonly ILogger<MailboxController> _logger;

    public MailboxController(
        IMailboxSyncService mailboxService,
        IMailboxProxyService proxyService,
        ICrmEmailLinkService linkService,
        ILogger<MailboxController> logger)
    {
        _mailboxService = mailboxService;
        _proxyService = proxyService;
        _linkService = linkService;
        _logger = logger;
    }

    // ============ SYNC ENDPOINTS ============

    /// <summary>
    /// Trigger a sync of all connected email accounts or a specific connection.
    /// </summary>
    [HttpPost("sync")]
    public async Task<ActionResult<MailboxSyncResponse>> Sync(
        [FromBody] MailboxSyncRequest? request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        SyncResult result;
        if (request?.ConnectionId != null)
        {
            result = await _mailboxService.SyncConnectionAsync(request.ConnectionId.Value, cancellationToken);
        }
        else
        {
            result = await _mailboxService.SyncAllAsync(userId.Value, cancellationToken);
        }

        // Build response
        return Ok(new MailboxSyncResponse(
            SyncedConnections: result.Success ? 1 : 0,
            TotalNewMessages: result.NewMessages,
            TotalUpdatedMessages: result.UpdatedMessages,
            ConnectionResults: new[]
            {
                new MailboxSyncConnectionResult(
                    ConnectionId: request?.ConnectionId ?? Guid.Empty,
                    Provider: "Connected",
                    Email: "",
                    Success: result.Success,
                    NewMessages: result.NewMessages,
                    UpdatedMessages: result.UpdatedMessages,
                    Error: result.ErrorMessage
                )
            }
        ));
    }

    /// <summary>
    /// Get mailbox statistics (counts by folder).
    /// </summary>
    [HttpGet("stats")]
    public async Task<ActionResult<MailboxStatsResponse>> GetStats(
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var stats = await _mailboxService.GetStatsAsync(userId.Value, cancellationToken);

        return Ok(new MailboxStatsResponse(
            TotalMessages: stats.TotalInbox + stats.TotalSent + stats.TotalDrafts + stats.TotalArchive + stats.TotalTrash + stats.TotalSpam,
            UnreadCount: stats.UnreadInbox,
            InboxCount: stats.TotalInbox,
            SentCount: stats.TotalSent,
            DraftsCount: stats.TotalDrafts,
            TrashCount: stats.TotalTrash,
            SpamCount: stats.TotalSpam,
            StarredCount: stats.TotalStarred,
            ArchiveCount: stats.TotalArchive,
            LastSyncAtUtc: null // Not tracked in current stats DTO
        ));
    }

    // ============ MESSAGE LIST/SEARCH ENDPOINTS ============

    /// <summary>
    /// Search and filter messages.
    /// </summary>
    [HttpGet("messages")]
    public async Task<ActionResult<MailboxMessagesResponse>> GetMessages(
        [FromQuery] string? folder,
        [FromQuery] string? search,
        [FromQuery] bool? isRead,
        [FromQuery] bool? isStarred,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        MailFolder? folderEnum = null;
        if (!string.IsNullOrWhiteSpace(folder) && Enum.TryParse<MailFolder>(folder, true, out var parsed))
        {
            folderEnum = parsed;
        }

        var request = new MailboxSearchRequest(
            UserId: userId.Value,
            Folder: folderEnum,
            Search: search,
            IsRead: isRead,
            IsStarred: isStarred,
            FromDate: fromDate,
            ToDate: toDate,
            Page: page,
            PageSize: pageSize
        );

        var response = await _mailboxService.SearchAsync(request, cancellationToken);

        var items = response.Items.Select(m => new MailboxMessageItem(
            Id: m.Id,
            ConnectionId: m.ConnectionId,
            Folder: m.Folder.ToString(),
            Subject: m.Subject,
            BodyPreview: m.BodyPreview,
            FromEmail: m.FromEmail,
            FromName: m.FromName,
            ToRecipients: Array.Empty<string>(), // Summary doesn't include recipients
            ReceivedAtUtc: m.ReceivedAtUtc,
            IsRead: m.IsRead,
            IsStarred: m.IsStarred,
            HasAttachments: m.HasAttachments,
            Importance: m.Importance.ToString()
        ));

        return Ok(new MailboxMessagesResponse(
            Items: items,
            Total: response.Total,
            Page: response.Page,
            PageSize: response.PageSize
        ));
    }

    /// <summary>
    /// Get full message detail including body.
    /// </summary>
    [HttpGet("messages/{id:guid}")]
    public async Task<ActionResult<MailboxMessageDetail>> GetMessage(
        Guid id,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var message = await _mailboxService.GetMessageAsync(id, cancellationToken);
        if (message == null) return NotFound();

        return Ok(new MailboxMessageDetail(
            Id: message.Id,
            ConnectionId: message.ConnectionId,
            ExternalId: message.ExternalId,
            Folder: message.Folder.ToString(),
            Subject: message.Subject,
            BodyPreview: message.BodyPreview,
            BodyHtml: message.BodyHtml,
            FromEmail: message.FromEmail,
            FromName: message.FromName,
            ToRecipients: message.ToRecipients.Select(r => r.Email),
            CcRecipients: message.CcRecipients?.Select(r => r.Email),
            BccRecipients: message.BccRecipients?.Select(r => r.Email),
            ReceivedAtUtc: message.ReceivedAtUtc,
            IsRead: message.IsRead,
            IsStarred: message.IsStarred,
            HasAttachments: message.HasAttachments,
            Importance: message.Importance.ToString(),
            SyncedAtUtc: DateTime.UtcNow // Not tracked in current DTO
        ));
    }

    // ============ MESSAGE UPDATE ENDPOINTS ============

    /// <summary>
    /// Update message read/starred status or move to folder.
    /// </summary>
    [HttpPatch("messages/{id:guid}")]
    public async Task<IActionResult> UpdateMessage(
        Guid id,
        [FromBody] UpdateMessageRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        if (request.IsRead.HasValue)
        {
            var success = await _mailboxService.SetReadStatusAsync(id, request.IsRead.Value, cancellationToken);
            if (!success) return NotFound();
        }

        if (request.IsStarred.HasValue)
        {
            var success = await _mailboxService.SetStarredAsync(id, request.IsStarred.Value, cancellationToken);
            if (!success) return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(request.MoveToFolder))
        {
            if (Enum.TryParse<MailFolder>(request.MoveToFolder, true, out var targetFolder))
            {
                var success = await _mailboxService.MoveToFolderAsync(id, targetFolder, cancellationToken);
                if (!success) return NotFound();
            }
            else
            {
                return BadRequest($"Invalid folder: {request.MoveToFolder}");
            }
        }

        return NoContent();
    }

    /// <summary>
    /// Mark message as read.
    /// </summary>
    [HttpPost("messages/{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(
        Guid id,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _mailboxService.SetReadStatusAsync(id, true, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    /// <summary>
    /// Mark message as unread.
    /// </summary>
    [HttpDelete("messages/{id:guid}/read")]
    public async Task<IActionResult> MarkAsUnread(
        Guid id,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _mailboxService.SetReadStatusAsync(id, false, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    /// <summary>
    /// Toggle starred status.
    /// </summary>
    [HttpPost("messages/{id:guid}/star")]
    public async Task<IActionResult> ToggleStar(
        Guid id,
        [FromQuery] bool starred = true,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _mailboxService.SetStarredAsync(id, starred, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    /// <summary>
    /// Move message to specified folder.
    /// </summary>
    [HttpPost("messages/{id:guid}/move")]
    public async Task<IActionResult> MoveMessage(
        Guid id,
        [FromQuery] string folder,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        if (!Enum.TryParse<MailFolder>(folder, true, out var targetFolder))
        {
            return BadRequest($"Invalid folder: {folder}");
        }

        var success = await _mailboxService.MoveToFolderAsync(id, targetFolder, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    /// <summary>
    /// Delete a message (moves to trash or permanently deletes if already in trash).
    /// </summary>
    [HttpDelete("messages/{id:guid}")]
    public async Task<IActionResult> DeleteMessage(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var success = await _mailboxService.DeleteAsync(id, cancellationToken);
        return success ? NoContent() : NotFound();
    }

    // ============ SEND/DRAFT ENDPOINTS ============

    /// <summary>
    /// Send an email via a connected account.
    /// </summary>
    [HttpPost("send")]
    public async Task<ActionResult<SendMailboxEmailResponse>> SendEmail(
        [FromBody] SendMailboxEmailRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var toRecipients = request.To.Select(e => new MailRecipientDto(e, null)).ToList();
        var ccRecipients = request.Cc?.Select(e => new MailRecipientDto(e, null)).ToList();
        var bccRecipients = request.Bcc?.Select(e => new MailRecipientDto(e, null)).ToList();

        var sendRequest = new SendMailRequest(
            ConnectionId: request.ConnectionId,
            To: toRecipients,
            Cc: ccRecipients,
            Bcc: bccRecipients,
            Subject: request.Subject,
            BodyHtml: request.HtmlBody,
            BodyText: null,
            Importance: MailImportance.Normal,
            ReplyToMessageId: request.ReplyToMessageId
        );

        var result = await _mailboxService.SendAsync(sendRequest, cancellationToken);

        return Ok(new SendMailboxEmailResponse(
            Success: result != null,
            MessageId: result?.Id,
            Error: result == null ? "Failed to send email" : null
        ));
    }

    /// <summary>
    /// Save a draft email.
    /// </summary>
    [HttpPost("drafts")]
    public async Task<ActionResult<SaveDraftMailResponse>> SaveDraft(
        [FromBody] SaveDraftMailRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var toRecipients = request.To?.Select(e => new MailRecipientDto(e, null)).ToList();
        var ccRecipients = request.Cc?.Select(e => new MailRecipientDto(e, null)).ToList();
        var bccRecipients = request.Bcc?.Select(e => new MailRecipientDto(e, null)).ToList();

        var draftRequest = new SaveDraftRequest(
            ConnectionId: request.ConnectionId,
            ExistingDraftId: request.ExistingDraftId,
            To: toRecipients,
            Cc: ccRecipients,
            Bcc: bccRecipients,
            Subject: request.Subject,
            BodyHtml: request.HtmlBody,
            BodyText: null
        );

        var result = await _mailboxService.SaveDraftAsync(draftRequest, cancellationToken);

        return Ok(new SaveDraftMailResponse(
            Success: result != null,
            DraftId: result?.Id,
            Error: result == null ? "Failed to save draft" : null
        ));
    }

    // ============ ATTACHMENT ENDPOINTS ============

    /// <summary>
    /// Download an attachment from a message.
    /// </summary>
    [HttpGet("messages/{messageId:guid}/attachments/{attachmentId}")]
    public async Task<IActionResult> DownloadAttachment(
        Guid messageId,
        string attachmentId,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var result = await _mailboxService.GetAttachmentAsync(messageId, attachmentId, cancellationToken);
        if (result == null)
        {
            return NotFound();
        }

        return File(result.Content, result.ContentType, result.FileName);
    }

    // ============ HELPERS ============

    private Guid? GetCurrentUserId()
    {
        var idValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (Guid.TryParse(idValue, out var id))
        {
            return id;
        }
        return null;
    }

    // ============ PROXY (LIVE) ENDPOINTS ============

    /// <summary>
    /// List messages directly from the provider (no local sync required).
    /// </summary>
    [HttpGet("proxy/messages")]
    public async Task<ActionResult<ProxyMailboxMessagesResponse>> GetProxyMessages(
        [FromQuery] string? folder,
        [FromQuery] string? search,
        [FromQuery] bool? isRead,
        [FromQuery] bool? isStarred,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 25,
        CancellationToken cancellationToken = default)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        MailFolder? folderEnum = null;
        if (!string.IsNullOrWhiteSpace(folder) && Enum.TryParse<MailFolder>(folder, true, out var parsed))
            folderEnum = parsed;

        var request = new MailboxSearchRequest(
            UserId: userId.Value, Folder: folderEnum, Search: search,
            IsRead: isRead, IsStarred: isStarred, FromDate: fromDate,
            ToDate: toDate, Page: page, PageSize: pageSize);

        var response = await _proxyService.ListMessagesAsync(request, cancellationToken);

        var items = response.Items.Select(m => new ProxyMailboxMessageItem(
            ExternalId: m.ExternalId, ConnectionId: m.ConnectionId,
            ConversationId: m.ConversationId, Folder: m.Folder.ToString(),
            Subject: m.Subject, BodyPreview: m.BodyPreview,
            FromEmail: m.FromEmail, FromName: m.FromName,
            ReceivedAtUtc: m.ReceivedAtUtc, IsRead: m.IsRead,
            IsStarred: m.IsStarred, IsDraft: m.IsDraft,
            HasAttachments: m.HasAttachments, Importance: m.Importance.ToString()));

        return Ok(new ProxyMailboxMessagesResponse(items, response.Total, response.Page, response.PageSize));
    }

    /// <summary>
    /// Get full message detail directly from the provider.
    /// </summary>
    [HttpGet("proxy/messages/{connectionId:guid}/{externalId}")]
    public async Task<ActionResult<ProxyMailboxMessageDetail>> GetProxyMessage(
        Guid connectionId,
        string externalId,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var message = await _proxyService.GetMessageAsync(connectionId, externalId, cancellationToken);
        if (message == null) return NotFound();

        return Ok(new ProxyMailboxMessageDetail(
            ExternalId: message.ExternalId, ConnectionId: message.ConnectionId,
            ConversationId: message.ConversationId, Folder: message.Folder.ToString(),
            Subject: message.Subject, BodyPreview: message.BodyPreview,
            BodyHtml: message.BodyHtml, BodyText: message.BodyText,
            FromEmail: message.FromEmail, FromName: message.FromName,
            ToRecipients: message.ToRecipients.Select(r => r.Email),
            CcRecipients: message.CcRecipients?.Select(r => r.Email),
            BccRecipients: message.BccRecipients?.Select(r => r.Email),
            ReceivedAtUtc: message.ReceivedAtUtc, SentAtUtc: message.SentAtUtc,
            IsRead: message.IsRead, IsStarred: message.IsStarred, IsDraft: message.IsDraft,
            HasAttachments: message.HasAttachments, Importance: message.Importance.ToString(),
            Attachments: message.Attachments.Select(a => new ProxyAttachmentItem(a.Id, a.Name, a.Size, a.ContentType)),
            InternetMessageId: message.InternetMessageId));
    }

    /// <summary>
    /// Get mailbox stats directly from the provider.
    /// </summary>
    [HttpGet("proxy/stats")]
    public async Task<ActionResult<MailboxStatsResponse>> GetProxyStats(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var stats = await _proxyService.GetStatsAsync(userId.Value, cancellationToken);

        return Ok(new MailboxStatsResponse(
            TotalMessages: stats.TotalInbox + stats.TotalSent + stats.TotalDrafts + stats.TotalArchive + stats.TotalTrash + stats.TotalSpam,
            UnreadCount: stats.UnreadInbox, InboxCount: stats.TotalInbox,
            SentCount: stats.TotalSent, DraftsCount: stats.TotalDrafts,
            TrashCount: stats.TotalTrash, SpamCount: stats.TotalSpam,
            StarredCount: stats.TotalStarred, ArchiveCount: stats.TotalArchive,
            LastSyncAtUtc: null));
    }

    /// <summary>
    /// Update message read/starred/folder via proxy.
    /// </summary>
    [HttpPatch("proxy/messages/{connectionId:guid}/{externalId}")]
    public async Task<IActionResult> UpdateProxyMessage(
        Guid connectionId, string externalId,
        [FromBody] UpdateMessageRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        if (request.IsRead.HasValue)
            if (!await _proxyService.SetReadStatusAsync(connectionId, externalId, request.IsRead.Value, cancellationToken))
                return NotFound();

        if (request.IsStarred.HasValue)
            if (!await _proxyService.SetStarredAsync(connectionId, externalId, request.IsStarred.Value, cancellationToken))
                return NotFound();

        if (!string.IsNullOrWhiteSpace(request.MoveToFolder))
        {
            if (!Enum.TryParse<MailFolder>(request.MoveToFolder, true, out var targetFolder))
                return BadRequest($"Invalid folder: {request.MoveToFolder}");
            if (!await _proxyService.MoveToFolderAsync(connectionId, externalId, targetFolder, cancellationToken))
                return NotFound();
        }

        return NoContent();
    }

    /// <summary>
    /// Delete a message via proxy.
    /// </summary>
    [HttpDelete("proxy/messages/{connectionId:guid}/{externalId}")]
    public async Task<IActionResult> DeleteProxyMessage(
        Guid connectionId, string externalId, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();
        return await _proxyService.DeleteAsync(connectionId, externalId, cancellationToken) ? NoContent() : NotFound();
    }

    /// <summary>
    /// Send an email via proxy.
    /// </summary>
    [HttpPost("proxy/send")]
    public async Task<ActionResult<ProxySendMailResponse>> ProxySend(
        [FromBody] SendMailboxEmailRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var sendRequest = new SendMailRequest(
            ConnectionId: request.ConnectionId,
            To: request.To.Select(e => new MailRecipientDto(e, null)).ToList(),
            Cc: request.Cc?.Select(e => new MailRecipientDto(e, null)).ToList(),
            Bcc: request.Bcc?.Select(e => new MailRecipientDto(e, null)).ToList(),
            Subject: request.Subject, BodyHtml: request.HtmlBody, BodyText: null,
            Importance: MailImportance.Normal, ReplyToMessageId: request.ReplyToMessageId);

        var result = await _proxyService.SendAsync(sendRequest, cancellationToken);
        return Ok(new ProxySendMailResponse(result != null, result?.ExternalId, result == null ? "Failed to send" : null));
    }

    /// <summary>
    /// Save a draft via proxy.
    /// </summary>
    [HttpPost("proxy/drafts")]
    public async Task<ActionResult<ProxySaveDraftResponse>> ProxySaveDraft(
        [FromBody] SaveDraftMailRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var draftRequest = new SaveDraftRequest(
            ConnectionId: request.ConnectionId, ExistingDraftId: request.ExistingDraftId,
            To: request.To?.Select(e => new MailRecipientDto(e, null)).ToList(),
            Cc: request.Cc?.Select(e => new MailRecipientDto(e, null)).ToList(),
            Bcc: request.Bcc?.Select(e => new MailRecipientDto(e, null)).ToList(),
            Subject: request.Subject, BodyHtml: request.HtmlBody, BodyText: null);

        var result = await _proxyService.SaveDraftAsync(draftRequest, cancellationToken);
        return Ok(new ProxySaveDraftResponse(result != null, result?.ExternalId, result == null ? "Failed to save draft" : null));
    }

    /// <summary>
    /// Download attachment via proxy.
    /// </summary>
    [HttpGet("proxy/messages/{connectionId:guid}/{externalId}/attachments/{attachmentId}")]
    public async Task<IActionResult> DownloadProxyAttachment(
        Guid connectionId, string externalId, string attachmentId,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var result = await _proxyService.GetAttachmentAsync(connectionId, externalId, attachmentId, cancellationToken);
        if (result == null) return NotFound();
        return File(result.Content, result.ContentType, result.FileName);
    }

    // ============ CRM EMAIL LINK ENDPOINTS ============

    /// <summary>
    /// Link an external email to a CRM entity.
    /// </summary>
    [HttpPost("links")]
    public async Task<ActionResult<CrmEmailLinkResponse>> LinkEmail(
        [FromBody] CrmEmailLinkRequest request,
        CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        if (!Enum.TryParse<ActivityRelationType>(request.RelatedEntityType, true, out var entityType))
            return BadRequest($"Invalid entity type: {request.RelatedEntityType}");

        var linkRequest = new CreateCrmEmailLinkRequest(
            ConnectionId: request.ConnectionId, ExternalMessageId: request.ExternalMessageId,
            ConversationId: request.ConversationId, Subject: request.Subject,
            FromEmail: request.FromEmail, FromName: request.FromName,
            ReceivedAtUtc: request.ReceivedAtUtc, RelatedEntityType: entityType,
            RelatedEntityId: request.RelatedEntityId, LinkedByUserId: userId.Value,
            Note: request.Note);

        var result = await _linkService.LinkEmailAsync(linkRequest, cancellationToken);
        return Created($"/api/mailbox/links/{result.Id}", MapLinkResponse(result));
    }

    /// <summary>
    /// Remove an email link.
    /// </summary>
    [HttpDelete("links/{id:guid}")]
    public async Task<IActionResult> UnlinkEmail(Guid id, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();
        return await _linkService.UnlinkEmailAsync(id, cancellationToken) ? NoContent() : NotFound();
    }

    /// <summary>
    /// Get all email links for a CRM entity.
    /// </summary>
    [HttpGet("links/entity/{entityType}/{entityId:guid}")]
    public async Task<ActionResult<IEnumerable<CrmEmailLinkResponse>>> GetLinksForEntity(
        string entityType, Guid entityId, CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        if (!Enum.TryParse<ActivityRelationType>(entityType, true, out var parsed))
            return BadRequest($"Invalid entity type: {entityType}");

        var links = await _linkService.GetLinksForEntityAsync(parsed, entityId, cancellationToken);
        return Ok(links.Select(MapLinkResponse));
    }

    /// <summary>
    /// Get all email links created by the current user.
    /// </summary>
    [HttpGet("links/mine")]
    public async Task<ActionResult<IEnumerable<CrmEmailLinkResponse>>> GetMyLinks(CancellationToken cancellationToken)
    {
        var userId = GetCurrentUserId();
        if (userId == null) return Unauthorized();

        var links = await _linkService.GetLinksForUserAsync(userId.Value, cancellationToken);
        return Ok(links.Select(MapLinkResponse));
    }

    private static CrmEmailLinkResponse MapLinkResponse(CrmEmailLinkDto dto) => new(
        Id: dto.Id, ConnectionId: dto.ConnectionId, ExternalMessageId: dto.ExternalMessageId,
        ConversationId: dto.ConversationId, Subject: dto.Subject, FromEmail: dto.FromEmail,
        FromName: dto.FromName, ReceivedAtUtc: dto.ReceivedAtUtc, Provider: dto.Provider,
        RelatedEntityType: dto.RelatedEntityType, RelatedEntityId: dto.RelatedEntityId,
        LinkedByUserId: dto.LinkedByUserId, Note: dto.Note, CreatedAtUtc: dto.CreatedAtUtc);
}
