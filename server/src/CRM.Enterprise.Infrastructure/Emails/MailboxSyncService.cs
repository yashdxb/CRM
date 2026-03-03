using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Emails;

public sealed class MailboxSyncService : IMailboxSyncService
{
    private readonly CrmDbContext _dbContext;
    private readonly IEmailConnectionService _connectionService;
    private readonly IDataProtector _protector;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<MailboxSyncService> _logger;

    private const string DataProtectionPurpose = "EmailOAuthTokens";
    private const int MaxMessagesPerSync = 100;

    public MailboxSyncService(
        CrmDbContext dbContext,
        IEmailConnectionService connectionService,
        IDataProtectionProvider dataProtectionProvider,
        IHttpClientFactory httpClientFactory,
        ILogger<MailboxSyncService> logger)
    {
        _dbContext = dbContext;
        _connectionService = connectionService;
        _protector = dataProtectionProvider.CreateProtector(DataProtectionPurpose);
        _httpClientFactory = httpClientFactory;
        _logger = logger;
    }

    // ============ SYNC OPERATIONS ============

    public async Task<SyncResult> SyncAllAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var connections = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == userId && !c.IsDeleted && c.IsActive)
            .ToListAsync(cancellationToken);

        var totalNew = 0;
        var totalUpdated = 0;
        var totalDeleted = 0;
        string? lastError = null;

        foreach (var conn in connections)
        {
            var result = await SyncConnectionInternalAsync(conn, cancellationToken);
            totalNew += result.NewMessages;
            totalUpdated += result.UpdatedMessages;
            totalDeleted += result.DeletedMessages;
            if (!result.Success && result.ErrorMessage != null)
            {
                lastError = result.ErrorMessage;
            }
        }

        return new SyncResult(
            Success: lastError == null,
            NewMessages: totalNew,
            UpdatedMessages: totalUpdated,
            DeletedMessages: totalDeleted,
            ErrorMessage: lastError
        );
    }

    public async Task<SyncResult> SyncConnectionAsync(Guid connectionId, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == connectionId && !c.IsDeleted, cancellationToken);

        if (connection is null)
        {
            return new SyncResult(false, 0, 0, 0, "Connection not found");
        }

        return await SyncConnectionInternalAsync(connection, cancellationToken);
    }

    private async Task<SyncResult> SyncConnectionInternalAsync(
        UserEmailConnection connection,
        CancellationToken cancellationToken)
    {
        try
        {
            var token = await _connectionService.GetAccessTokenAsync(connection.Id, cancellationToken);
            if (token is null)
            {
                return new SyncResult(false, 0, 0, 0, "Failed to get access token");
            }

            SyncResult result;
            if (connection.Provider == EmailProvider.Microsoft365)
            {
                result = await SyncMicrosoftMailboxAsync(connection.Id, token, cancellationToken);
            }
            else
            {
                result = await SyncGmailMailboxAsync(connection.Id, token, cancellationToken);
            }

            // Update last sync time
            connection.LastSyncAtUtc = DateTime.UtcNow;
            connection.LastError = result.Success ? null : result.ErrorMessage;
            await _dbContext.SaveChangesAsync(cancellationToken);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error syncing connection {ConnectionId}", connection.Id);
            return new SyncResult(false, 0, 0, 0, ex.Message);
        }
    }

    private async Task<SyncResult> SyncMicrosoftMailboxAsync(
        Guid connectionId,
        string accessToken,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var newCount = 0;
        var updatedCount = 0;

        // Sync each folder
        foreach (var (folderName, folder) in GetMicrosoftFolders())
        {
            var url = $"https://graph.microsoft.com/v1.0/me/mailFolders/{folderName}/messages?" +
                      $"$top={MaxMessagesPerSync}&$orderby=receivedDateTime desc" +
                      $"&$select=id,conversationId,internetMessageId,subject,bodyPreview,from,toRecipients,ccRecipients,bccRecipients," +
                      $"isRead,flag,importance,hasAttachments,receivedDateTime,sentDateTime,isDraft";

            try
            {
                var response = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);

                if (!response.TryGetProperty("value", out var messages))
                    continue;

                foreach (var msg in messages.EnumerateArray())
                {
                    var externalId = msg.GetProperty("id").GetString()!;
                    
                    var existing = await _dbContext.UserMailMessages
                        .FirstOrDefaultAsync(m => m.ConnectionId == connectionId && m.ExternalId == externalId, cancellationToken);

                    if (existing is null)
                    {
                        var newMessage = MapMicrosoftMessage(connectionId, msg, folder);
                        _dbContext.UserMailMessages.Add(newMessage);
                        newCount++;
                    }
                    else
                    {
                        UpdateMicrosoftMessage(existing, msg, folder);
                        updatedCount++;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error syncing Microsoft folder {Folder}", folderName);
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return new SyncResult(true, newCount, updatedCount, 0, null);
    }

    private async Task<SyncResult> SyncGmailMailboxAsync(
        Guid connectionId,
        string accessToken,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var newCount = 0;
        var updatedCount = 0;

        // Get message list
        foreach (var (labelId, folder) in GetGmailLabels())
        {
            var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds={labelId}&maxResults={MaxMessagesPerSync}";

            try
            {
                var listResponse = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);

                if (!listResponse.TryGetProperty("messages", out var messageList))
                    continue;

                foreach (var msgRef in messageList.EnumerateArray())
                {
                    var messageId = msgRef.GetProperty("id").GetString()!;
                    
                    var existing = await _dbContext.UserMailMessages
                        .FirstOrDefaultAsync(m => m.ConnectionId == connectionId && m.ExternalId == messageId, cancellationToken);

                    if (existing is null)
                    {
                        // Get full message details
                        var detailUrl = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{messageId}?format=full";
                        var detail = await client.GetFromJsonAsync<JsonElement>(detailUrl, cancellationToken);

                        var newMessage = MapGmailMessage(connectionId, detail, folder);
                        _dbContext.UserMailMessages.Add(newMessage);
                        newCount++;
                    }
                    else
                    {
                        updatedCount++;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error syncing Gmail label {Label}", labelId);
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return new SyncResult(true, newCount, updatedCount, 0, null);
    }

    // ============ QUERY OPERATIONS ============

    public async Task<MailboxSearchResponse> SearchAsync(MailboxSearchRequest request, CancellationToken cancellationToken = default)
    {
        // Get user's connection IDs
        var connectionIds = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == request.UserId && !c.IsDeleted && c.IsActive)
            .Select(c => c.Id)
            .ToListAsync(cancellationToken);

        if (!connectionIds.Any())
        {
            return new MailboxSearchResponse(Enumerable.Empty<MailMessageSummaryDto>(), 0, request.Page, request.PageSize);
        }

        var query = _dbContext.UserMailMessages
            .AsNoTracking()
            .Where(m => connectionIds.Contains(m.ConnectionId) && !m.IsDeleted);

        // Apply folder filter
        if (request.Folder.HasValue)
        {
            if (request.Folder == MailFolder.Starred)
            {
                query = query.Where(m => m.IsStarred);
            }
            else
            {
                query = query.Where(m => m.Folder == request.Folder.Value);
            }
        }

        // Apply filters
        if (request.IsRead.HasValue)
        {
            query = query.Where(m => m.IsRead == request.IsRead.Value);
        }

        if (request.IsStarred.HasValue)
        {
            query = query.Where(m => m.IsStarred == request.IsStarred.Value);
        }

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.ToLower();
            query = query.Where(m =>
                (EF.Property<string?>(m, nameof(UserMailMessage.Subject)) ?? string.Empty).ToLower().Contains(search) ||
                (EF.Property<string?>(m, nameof(UserMailMessage.FromEmail)) ?? string.Empty).ToLower().Contains(search) ||
                (EF.Property<string?>(m, nameof(UserMailMessage.FromName)) ?? string.Empty).ToLower().Contains(search) ||
                (EF.Property<string?>(m, nameof(UserMailMessage.BodyPreview)) ?? string.Empty).ToLower().Contains(search));
        }

        if (request.FromDate.HasValue)
        {
            query = query.Where(m => (EF.Property<DateTime?>(m, nameof(UserMailMessage.ReceivedAtUtc)) ?? DateTime.UnixEpoch) >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(m => (EF.Property<DateTime?>(m, nameof(UserMailMessage.ReceivedAtUtc)) ?? DateTime.UnixEpoch) <= request.ToDate.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(m => EF.Property<DateTime?>(m, nameof(UserMailMessage.ReceivedAtUtc)) ?? DateTime.UnixEpoch)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(m => new MailMessageSummaryDto(
                m.Id,
                m.ConnectionId,
                EF.Property<string?>(m, nameof(UserMailMessage.FromEmail)) ?? string.Empty,
                EF.Property<string?>(m, nameof(UserMailMessage.FromName)),
                EF.Property<string?>(m, nameof(UserMailMessage.Subject)) ?? string.Empty,
                EF.Property<string?>(m, nameof(UserMailMessage.BodyPreview)) ?? string.Empty,
                m.Folder,
                m.IsRead,
                m.IsStarred,
                m.HasAttachments,
                m.Importance,
                EF.Property<DateTime?>(m, nameof(UserMailMessage.ReceivedAtUtc)) ?? DateTime.UnixEpoch,
                EF.Property<DateTime?>(m, nameof(UserMailMessage.SentAtUtc))
            ))
            .ToListAsync(cancellationToken);

        return new MailboxSearchResponse(items, total, request.Page, request.PageSize);
    }

    public async Task<MailMessageDto?> GetMessageAsync(Guid messageId, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message is null)
            return null;

        // If we don't have full body, fetch it from provider
        if (string.IsNullOrEmpty(message.BodyHtml) && string.IsNullOrEmpty(message.BodyText))
        {
            await FetchFullBodyAsync(message, cancellationToken);
        }

        return MapToDetailDto(message);
    }

    public async Task<MailboxStatsDto> GetStatsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var connectionIds = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == userId && !c.IsDeleted && c.IsActive)
            .Select(c => c.Id)
            .ToListAsync(cancellationToken);

        if (!connectionIds.Any())
        {
            return new MailboxStatsDto(0, 0, 0, 0, 0, 0, 0, 0);
        }

        var messages = _dbContext.UserMailMessages
            .AsNoTracking()
            .Where(m => connectionIds.Contains(m.ConnectionId) && !m.IsDeleted);

        var stats = await messages
            .GroupBy(m => 1)
            .Select(g => new
            {
                TotalInbox = g.Count(m => m.Folder == MailFolder.Inbox),
                UnreadInbox = g.Count(m => m.Folder == MailFolder.Inbox && !m.IsRead),
                TotalSent = g.Count(m => m.Folder == MailFolder.Sent),
                TotalDrafts = g.Count(m => m.Folder == MailFolder.Drafts),
                TotalStarred = g.Count(m => m.IsStarred),
                TotalArchive = g.Count(m => m.Folder == MailFolder.Archive),
                TotalTrash = g.Count(m => m.Folder == MailFolder.Trash),
                TotalSpam = g.Count(m => m.Folder == MailFolder.Spam)
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (stats is null)
        {
            return new MailboxStatsDto(0, 0, 0, 0, 0, 0, 0, 0);
        }

        return new MailboxStatsDto(
            stats.TotalInbox,
            stats.UnreadInbox,
            stats.TotalSent,
            stats.TotalDrafts,
            stats.TotalStarred,
            stats.TotalArchive,
            stats.TotalTrash,
            stats.TotalSpam
        );
    }

    // ============ MESSAGE ACTIONS ============

    public async Task<bool> SetReadStatusAsync(Guid messageId, bool isRead, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .Include(m => m.Connection)
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message?.Connection is null)
            return false;

        // Update locally
        message.IsRead = isRead;
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Update on provider (fire and forget)
        _ = UpdateReadStatusOnProviderAsync(message, isRead);

        return true;
    }

    public async Task<bool> SetStarredAsync(Guid messageId, bool isStarred, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .Include(m => m.Connection)
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message?.Connection is null)
            return false;

        message.IsStarred = isStarred;
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Update on provider (fire and forget)
        _ = UpdateStarredOnProviderAsync(message, isStarred);

        return true;
    }

    public async Task<bool> MoveToFolderAsync(Guid messageId, MailFolder folder, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .Include(m => m.Connection)
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message?.Connection is null)
            return false;

        message.Folder = folder;
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Move on provider (fire and forget)
        _ = MoveMessageOnProviderAsync(message, folder);

        return true;
    }

    public async Task<bool> DeleteAsync(Guid messageId, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .Include(m => m.Connection)
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message?.Connection is null)
            return false;

        message.IsDeleted = true;
        await _dbContext.SaveChangesAsync(cancellationToken);

        // Delete on provider (fire and forget)
        _ = DeleteMessageOnProviderAsync(message);

        return true;
    }

    public async Task<MailMessageDto?> SendAsync(SendMailRequest request, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == request.ConnectionId && !c.IsDeleted && c.IsActive, cancellationToken);

        if (connection is null)
            return null;

        var token = await _connectionService.GetAccessTokenAsync(connection.Id, cancellationToken);
        if (token is null)
            return null;

        try
        {
            MailMessageDto? sent;
            if (connection.Provider == EmailProvider.Microsoft365)
            {
                sent = await SendViaMicrosoftAsync(connection.Id, token, request, cancellationToken);
            }
            else
            {
                sent = await SendViaGmailAsync(connection.Id, token, request, cancellationToken);
            }

            return sent;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email via connection {ConnectionId}", connection.Id);
            return null;
        }
    }

    public async Task<MailMessageDto?> SaveDraftAsync(SaveDraftRequest request, CancellationToken cancellationToken = default)
    {
        var connection = await _dbContext.UserEmailConnections
            .FirstOrDefaultAsync(c => c.Id == request.ConnectionId && !c.IsDeleted && c.IsActive, cancellationToken);

        if (connection is null)
            return null;

        // Create local draft
        var draft = new UserMailMessage
        {
            ConnectionId = connection.Id,
            ExternalId = "draft-" + Guid.NewGuid().ToString("N"),
            Subject = request.Subject ?? string.Empty,
            BodyPreview = TruncateBody(request.BodyText ?? request.BodyHtml ?? string.Empty),
            BodyHtml = request.BodyHtml,
            BodyText = request.BodyText,
            FromEmail = connection.EmailAddress,
            FromName = connection.DisplayName,
            ToRecipientsJson = JsonSerializer.Serialize(request.To ?? new List<MailRecipientDto>()),
            CcRecipientsJson = request.Cc != null ? JsonSerializer.Serialize(request.Cc) : null,
            BccRecipientsJson = request.Bcc != null ? JsonSerializer.Serialize(request.Bcc) : null,
            Folder = MailFolder.Drafts,
            IsDraft = true,
            IsRead = true,
            ReceivedAtUtc = DateTime.UtcNow,
            LastSyncAtUtc = DateTime.UtcNow
        };

        if (request.ExistingDraftId.HasValue)
        {
            var existing = await _dbContext.UserMailMessages
                .FirstOrDefaultAsync(m => m.Id == request.ExistingDraftId && m.IsDraft, cancellationToken);
            
            if (existing != null)
            {
                existing.Subject = draft.Subject;
                existing.BodyHtml = draft.BodyHtml;
                existing.BodyText = draft.BodyText;
                existing.BodyPreview = draft.BodyPreview;
                existing.ToRecipientsJson = draft.ToRecipientsJson;
                existing.CcRecipientsJson = draft.CcRecipientsJson;
                existing.BccRecipientsJson = draft.BccRecipientsJson;
                await _dbContext.SaveChangesAsync(cancellationToken);
                return MapToDetailDto(existing);
            }
        }

        _dbContext.UserMailMessages.Add(draft);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToDetailDto(draft);
    }

    public async Task<AttachmentDownloadResult?> GetAttachmentAsync(Guid messageId, string attachmentId, CancellationToken cancellationToken = default)
    {
        var message = await _dbContext.UserMailMessages
            .Include(m => m.Connection)
            .FirstOrDefaultAsync(m => m.Id == messageId && !m.IsDeleted, cancellationToken);

        if (message?.Connection is null)
            return null;

        var token = await _connectionService.GetAccessTokenAsync(message.Connection.Id, cancellationToken);
        if (token is null)
            return null;

        try
        {
            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (message.Connection.Provider == EmailProvider.Microsoft365)
            {
                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}/attachments/{attachmentId}";
                var response = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);
                
                var name = response.GetProperty("name").GetString()!;
                var contentType = response.GetProperty("contentType").GetString()!;
                var contentBytes = response.GetProperty("contentBytes").GetString()!;
                
                return new AttachmentDownloadResult(name, contentType, Convert.FromBase64String(contentBytes));
            }
            else
            {
                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}/attachments/{attachmentId}";
                var response = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);
                
                var data = response.GetProperty("data").GetString()!;
                // Gmail uses URL-safe base64
                var normalBase64 = data.Replace('-', '+').Replace('_', '/');
                var padding = normalBase64.Length % 4;
                if (padding > 0)
                    normalBase64 += new string('=', 4 - padding);

                // We'd need message metadata to get the name/type
                return new AttachmentDownloadResult("attachment", "application/octet-stream", Convert.FromBase64String(normalBase64));
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error downloading attachment {AttachmentId} from message {MessageId}", attachmentId, messageId);
            return null;
        }
    }

    // ============ PRIVATE HELPERS ============

    private static IEnumerable<(string FolderName, MailFolder Folder)> GetMicrosoftFolders()
    {
        yield return ("inbox", MailFolder.Inbox);
        yield return ("sentitems", MailFolder.Sent);
        yield return ("drafts", MailFolder.Drafts);
        yield return ("archive", MailFolder.Archive);
        yield return ("deleteditems", MailFolder.Trash);
        yield return ("junkemail", MailFolder.Spam);
    }

    private static IEnumerable<(string LabelId, MailFolder Folder)> GetGmailLabels()
    {
        yield return ("INBOX", MailFolder.Inbox);
        yield return ("SENT", MailFolder.Sent);
        yield return ("DRAFT", MailFolder.Drafts);
        yield return ("TRASH", MailFolder.Trash);
        yield return ("SPAM", MailFolder.Spam);
    }

    private static UserMailMessage MapMicrosoftMessage(Guid connectionId, JsonElement msg, MailFolder folder)
    {
        var from = msg.GetProperty("from").GetProperty("emailAddress");
        var isStarred = msg.TryGetProperty("flag", out var flag) &&
                       flag.TryGetProperty("flagStatus", out var status) &&
                       status.GetString() == "flagged";

        var importance = MailImportance.Normal;
        if (msg.TryGetProperty("importance", out var imp))
        {
            var impStr = imp.GetString()?.ToLower();
            importance = impStr switch
            {
                "high" => MailImportance.High,
                "low" => MailImportance.Low,
                _ => MailImportance.Normal
            };
        }

        return new UserMailMessage
        {
            ConnectionId = connectionId,
            ExternalId = msg.GetProperty("id").GetString()!,
            InternetMessageId = msg.TryGetProperty("internetMessageId", out var imid) ? imid.GetString() : null,
            ConversationId = msg.TryGetProperty("conversationId", out var cid) ? cid.GetString() : null,
            Subject = msg.TryGetProperty("subject", out var subj) ? subj.GetString() ?? string.Empty : string.Empty,
            BodyPreview = msg.TryGetProperty("bodyPreview", out var bp) ? TruncateBody(bp.GetString() ?? string.Empty) : string.Empty,
            FromEmail = from.GetProperty("address").GetString()!,
            FromName = from.TryGetProperty("name", out var fname) ? fname.GetString() : null,
            ToRecipientsJson = SerializeRecipients(msg, "toRecipients"),
            CcRecipientsJson = SerializeRecipients(msg, "ccRecipients"),
            BccRecipientsJson = SerializeRecipients(msg, "bccRecipients"),
            Folder = folder,
            IsRead = msg.TryGetProperty("isRead", out var read) && read.GetBoolean(),
            IsStarred = isStarred,
            IsDraft = msg.TryGetProperty("isDraft", out var draft) && draft.GetBoolean(),
            HasAttachments = msg.TryGetProperty("hasAttachments", out var ha) && ha.GetBoolean(),
            Importance = importance,
            ReceivedAtUtc = msg.TryGetProperty("receivedDateTime", out var rd) ? rd.GetDateTime() : DateTime.UtcNow,
            SentAtUtc = msg.TryGetProperty("sentDateTime", out var sd) ? sd.GetDateTime() : null,
            LastSyncAtUtc = DateTime.UtcNow
        };
    }

    private static void UpdateMicrosoftMessage(UserMailMessage existing, JsonElement msg, MailFolder folder)
    {
        existing.IsRead = msg.TryGetProperty("isRead", out var read) && read.GetBoolean();
        
        var isStarred = msg.TryGetProperty("flag", out var flag) &&
                       flag.TryGetProperty("flagStatus", out var status) &&
                       status.GetString() == "flagged";
        existing.IsStarred = isStarred;
        existing.Folder = folder;
        existing.LastSyncAtUtc = DateTime.UtcNow;
    }

    private static UserMailMessage MapGmailMessage(Guid connectionId, JsonElement msg, MailFolder folder)
    {
        var headers = msg.GetProperty("payload").GetProperty("headers");
        
        string subject = string.Empty;
        string fromEmail = string.Empty;
        string? fromName = null;
        string toRecipients = "[]";
        DateTime receivedAt = DateTime.UtcNow;

        foreach (var header in headers.EnumerateArray())
        {
            var name = header.GetProperty("name").GetString()?.ToLower();
            var value = header.GetProperty("value").GetString();

            switch (name)
            {
                case "subject":
                    subject = value ?? string.Empty;
                    break;
                case "from":
                    (fromEmail, fromName) = ParseEmailAddress(value ?? string.Empty);
                    break;
                case "to":
                    toRecipients = ParseRecipientsToJson(value ?? string.Empty);
                    break;
                case "date":
                    if (DateTime.TryParse(value, out var parsed))
                        receivedAt = parsed.ToUniversalTime();
                    break;
            }
        }

        var labels = msg.TryGetProperty("labelIds", out var labelsArr) 
            ? labelsArr.EnumerateArray().Select(l => l.GetString()).ToList() 
            : new List<string?>();

        var isRead = !labels.Contains("UNREAD");
        var isStarred = labels.Contains("STARRED");

        return new UserMailMessage
        {
            ConnectionId = connectionId,
            ExternalId = msg.GetProperty("id").GetString()!,
            ConversationId = msg.TryGetProperty("threadId", out var tid) ? tid.GetString() : null,
            Subject = subject,
            BodyPreview = msg.TryGetProperty("snippet", out var snip) ? TruncateBody(snip.GetString() ?? string.Empty) : string.Empty,
            FromEmail = fromEmail,
            FromName = fromName,
            ToRecipientsJson = toRecipients,
            Folder = folder,
            IsRead = isRead,
            IsStarred = isStarred,
            HasAttachments = msg.GetProperty("payload").TryGetProperty("parts", out _),
            ReceivedAtUtc = receivedAt,
            LastSyncAtUtc = DateTime.UtcNow
        };
    }

    private static string SerializeRecipients(JsonElement msg, string propertyName)
    {
        if (!msg.TryGetProperty(propertyName, out var recipients))
            return "[]";

        var list = new List<MailRecipientDto>();
        foreach (var r in recipients.EnumerateArray())
        {
            var addr = r.GetProperty("emailAddress");
            list.Add(new MailRecipientDto(
                addr.GetProperty("address").GetString()!,
                addr.TryGetProperty("name", out var n) ? n.GetString() : null
            ));
        }
        return JsonSerializer.Serialize(list);
    }

    private static (string Email, string? Name) ParseEmailAddress(string value)
    {
        // Format: "Name <email@example.com>" or just "email@example.com"
        var match = System.Text.RegularExpressions.Regex.Match(value, @"(?:""?([^""<]+)""?\s*)?<?([^<>\s]+@[^<>\s]+)>?");
        if (match.Success)
        {
            return (match.Groups[2].Value, match.Groups[1].Value.Trim());
        }
        return (value, null);
    }

    private static string ParseRecipientsToJson(string value)
    {
        var recipients = new List<MailRecipientDto>();
        var parts = value.Split(',');
        foreach (var part in parts)
        {
            var (email, name) = ParseEmailAddress(part.Trim());
            recipients.Add(new MailRecipientDto(email, name));
        }
        return JsonSerializer.Serialize(recipients);
    }

    private static string TruncateBody(string body) => body.Length > 200 ? body[..200] : body;

    private async Task FetchFullBodyAsync(UserMailMessage message, CancellationToken cancellationToken)
    {
        if (message.Connection is null)
        {
            message.Connection = await _dbContext.UserEmailConnections
                .FirstOrDefaultAsync(c => c.Id == message.ConnectionId, cancellationToken);
        }

        if (message.Connection is null)
            return;

        var token = await _connectionService.GetAccessTokenAsync(message.ConnectionId, cancellationToken);
        if (token is null)
            return;

        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        try
        {
            if (message.Connection.Provider == EmailProvider.Microsoft365)
            {
                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}?$select=body";
                var response = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);

                if (response.TryGetProperty("body", out var body))
                {
                    var contentType = body.GetProperty("contentType").GetString();
                    var content = body.GetProperty("content").GetString();

                    if (contentType == "html")
                        message.BodyHtml = content;
                    else
                        message.BodyText = content;
                }
            }
            else
            {
                // Gmail requires parsing MIME parts - simplified version
                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}?format=full";
                var response = await client.GetFromJsonAsync<JsonElement>(url, cancellationToken);

                var body = ExtractGmailBody(response);
                message.BodyText = body;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Error fetching full body for message {MessageId}", message.Id);
        }
    }

    private static string? ExtractGmailBody(JsonElement msg)
    {
        if (!msg.TryGetProperty("payload", out var payload))
            return null;

        // Try to get body from payload directly
        if (payload.TryGetProperty("body", out var body) && body.TryGetProperty("data", out var data))
        {
            return DecodeBase64Url(data.GetString()!);
        }

        // Or from parts
        if (payload.TryGetProperty("parts", out var parts))
        {
            foreach (var part in parts.EnumerateArray())
            {
                var mimeType = part.GetProperty("mimeType").GetString();
                if (mimeType == "text/plain" || mimeType == "text/html")
                {
                    if (part.TryGetProperty("body", out var partBody) && partBody.TryGetProperty("data", out var partData))
                    {
                        return DecodeBase64Url(partData.GetString()!);
                    }
                }
            }
        }

        return null;
    }

    private static string DecodeBase64Url(string input)
    {
        var normalBase64 = input.Replace('-', '+').Replace('_', '/');
        var padding = normalBase64.Length % 4;
        if (padding > 0)
            normalBase64 += new string('=', 4 - padding);
        
        var bytes = Convert.FromBase64String(normalBase64);
        return System.Text.Encoding.UTF8.GetString(bytes);
    }

    private MailMessageDto MapToDetailDto(UserMailMessage message)
    {
        return new MailMessageDto(
            message.Id,
            message.ConnectionId,
            message.ExternalId,
            message.ConversationId,
            message.FromEmail,
            message.FromName,
            JsonSerializer.Deserialize<List<MailRecipientDto>>(message.ToRecipientsJson) ?? new List<MailRecipientDto>(),
            string.IsNullOrEmpty(message.CcRecipientsJson) ? null : JsonSerializer.Deserialize<List<MailRecipientDto>>(message.CcRecipientsJson),
            string.IsNullOrEmpty(message.BccRecipientsJson) ? null : JsonSerializer.Deserialize<List<MailRecipientDto>>(message.BccRecipientsJson),
            message.Subject,
            message.BodyPreview,
            message.BodyHtml,
            message.BodyText,
            message.Folder,
            message.IsRead,
            message.IsStarred,
            message.IsDraft,
            message.HasAttachments,
            string.IsNullOrEmpty(message.AttachmentsJson) ? null : JsonSerializer.Deserialize<List<MailAttachmentDto>>(message.AttachmentsJson),
            message.Importance,
            message.ReceivedAtUtc,
            message.SentAtUtc
        );
    }

    // Fire-and-forget provider update methods
    private async Task UpdateReadStatusOnProviderAsync(UserMailMessage message, bool isRead)
    {
        try
        {
            var token = await _connectionService.GetAccessTokenAsync(message.ConnectionId, CancellationToken.None);
            if (token is null) return;

            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (message.Connection!.Provider == EmailProvider.Microsoft365)
            {
                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}";
                var content = new StringContent(JsonSerializer.Serialize(new { isRead }), System.Text.Encoding.UTF8, "application/json");
                await client.PatchAsync(url, content);
            }
            else
            {
                // Gmail uses label modifications for read status
                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}/modify";
                object body = isRead 
                    ? new { removeLabelIds = new[] { "UNREAD" } }
                    : new { addLabelIds = new[] { "UNREAD" } };
                await client.PostAsJsonAsync(url, body);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to update read status on provider for message {MessageId}", message.Id);
        }
    }

    private async Task UpdateStarredOnProviderAsync(UserMailMessage message, bool isStarred)
    {
        try
        {
            var token = await _connectionService.GetAccessTokenAsync(message.ConnectionId, CancellationToken.None);
            if (token is null) return;

            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (message.Connection!.Provider == EmailProvider.Microsoft365)
            {
                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}";
                var flagStatus = isStarred ? "flagged" : "notFlagged";
                var content = new StringContent(
                    JsonSerializer.Serialize(new { flag = new { flagStatus } }), 
                    System.Text.Encoding.UTF8, 
                    "application/json");
                await client.PatchAsync(url, content);
            }
            else
            {
                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}/modify";
                object body = isStarred
                    ? new { addLabelIds = new[] { "STARRED" } }
                    : new { removeLabelIds = new[] { "STARRED" } };
                await client.PostAsJsonAsync(url, body);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to update starred status on provider for message {MessageId}", message.Id);
        }
    }

    private async Task MoveMessageOnProviderAsync(UserMailMessage message, MailFolder folder)
    {
        try
        {
            var token = await _connectionService.GetAccessTokenAsync(message.ConnectionId, CancellationToken.None);
            if (token is null) return;

            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (message.Connection!.Provider == EmailProvider.Microsoft365)
            {
                var destinationId = folder switch
                {
                    MailFolder.Inbox => "inbox",
                    MailFolder.Archive => "archive",
                    MailFolder.Trash => "deleteditems",
                    MailFolder.Spam => "junkemail",
                    _ => "inbox"
                };

                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}/move";
                await client.PostAsJsonAsync(url, new { destinationId });
            }
            else
            {
                var addLabels = folder switch
                {
                    MailFolder.Inbox => new[] { "INBOX" },
                    MailFolder.Trash => new[] { "TRASH" },
                    MailFolder.Spam => new[] { "SPAM" },
                    _ => Array.Empty<string>()
                };

                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}/modify";
                await client.PostAsJsonAsync(url, new { addLabelIds = addLabels });
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to move message on provider for message {MessageId}", message.Id);
        }
    }

    private async Task DeleteMessageOnProviderAsync(UserMailMessage message)
    {
        try
        {
            var token = await _connectionService.GetAccessTokenAsync(message.ConnectionId, CancellationToken.None);
            if (token is null) return;

            using var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            if (message.Connection!.Provider == EmailProvider.Microsoft365)
            {
                var url = $"https://graph.microsoft.com/v1.0/me/messages/{message.ExternalId}";
                await client.DeleteAsync(url);
            }
            else
            {
                var url = $"https://gmail.googleapis.com/gmail/v1/users/me/messages/{message.ExternalId}/trash";
                await client.PostAsync(url, null);
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to delete message on provider for message {MessageId}", message.Id);
        }
    }

    private async Task<MailMessageDto?> SendViaMicrosoftAsync(
        Guid connectionId,
        string accessToken,
        SendMailRequest request,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var message = new
        {
            subject = request.Subject,
            body = new { contentType = "HTML", content = request.BodyHtml },
            toRecipients = request.To.Select(r => new { emailAddress = new { address = r.Email, name = r.Name } }),
            ccRecipients = request.Cc?.Select(r => new { emailAddress = new { address = r.Email, name = r.Name } }),
            bccRecipients = request.Bcc?.Select(r => new { emailAddress = new { address = r.Email, name = r.Name } }),
            importance = request.Importance.ToString().ToLower()
        };

        var response = await client.PostAsJsonAsync(
            "https://graph.microsoft.com/v1.0/me/sendMail",
            new { message, saveToSentItems = true },
            cancellationToken);

        response.EnsureSuccessStatusCode();

        // Create local record
        var connection = await _dbContext.UserEmailConnections.FirstAsync(c => c.Id == connectionId, cancellationToken);
        var localMessage = new UserMailMessage
        {
            ConnectionId = connectionId,
            ExternalId = "sent-" + Guid.NewGuid().ToString("N"),
            Subject = request.Subject,
            BodyHtml = request.BodyHtml,
            BodyText = request.BodyText,
            BodyPreview = TruncateBody(request.BodyText ?? request.BodyHtml),
            FromEmail = connection.EmailAddress,
            FromName = connection.DisplayName,
            ToRecipientsJson = JsonSerializer.Serialize(request.To),
            CcRecipientsJson = request.Cc != null ? JsonSerializer.Serialize(request.Cc) : null,
            BccRecipientsJson = request.Bcc != null ? JsonSerializer.Serialize(request.Bcc) : null,
            Folder = MailFolder.Sent,
            IsRead = true,
            Importance = request.Importance,
            SentAtUtc = DateTime.UtcNow,
            ReceivedAtUtc = DateTime.UtcNow,
            LastSyncAtUtc = DateTime.UtcNow
        };

        _dbContext.UserMailMessages.Add(localMessage);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToDetailDto(localMessage);
    }

    private async Task<MailMessageDto?> SendViaGmailAsync(
        Guid connectionId,
        string accessToken,
        SendMailRequest request,
        CancellationToken cancellationToken)
    {
        using var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

        var connection = await _dbContext.UserEmailConnections.FirstAsync(c => c.Id == connectionId, cancellationToken);

        // Build MIME message
        var toHeader = string.Join(", ", request.To.Select(r => string.IsNullOrEmpty(r.Name) ? r.Email : $"\"{r.Name}\" <{r.Email}>"));
        var mime = $"From: \"{connection.DisplayName}\" <{connection.EmailAddress}>\r\n" +
                   $"To: {toHeader}\r\n" +
                   $"Subject: {request.Subject}\r\n" +
                   "Content-Type: text/html; charset=utf-8\r\n\r\n" +
                   request.BodyHtml;

        var base64Url = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(mime))
            .Replace('+', '-')
            .Replace('/', '_')
            .TrimEnd('=');

        var response = await client.PostAsJsonAsync(
            "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
            new { raw = base64Url },
            cancellationToken);

        response.EnsureSuccessStatusCode();

        // Create local record
        var localMessage = new UserMailMessage
        {
            ConnectionId = connectionId,
            ExternalId = "sent-" + Guid.NewGuid().ToString("N"),
            Subject = request.Subject,
            BodyHtml = request.BodyHtml,
            BodyText = request.BodyText,
            BodyPreview = TruncateBody(request.BodyText ?? request.BodyHtml),
            FromEmail = connection.EmailAddress,
            FromName = connection.DisplayName,
            ToRecipientsJson = JsonSerializer.Serialize(request.To),
            CcRecipientsJson = request.Cc != null ? JsonSerializer.Serialize(request.Cc) : null,
            BccRecipientsJson = request.Bcc != null ? JsonSerializer.Serialize(request.Bcc) : null,
            Folder = MailFolder.Sent,
            IsRead = true,
            Importance = request.Importance,
            SentAtUtc = DateTime.UtcNow,
            ReceivedAtUtc = DateTime.UtcNow,
            LastSyncAtUtc = DateTime.UtcNow
        };

        _dbContext.UserMailMessages.Add(localMessage);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return MapToDetailDto(localMessage);
    }
}
