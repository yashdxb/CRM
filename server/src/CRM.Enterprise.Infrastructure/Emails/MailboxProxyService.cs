using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using CRM.Enterprise.Application.Emails;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace CRM.Enterprise.Infrastructure.Emails;

public sealed class MailboxProxyService : IMailboxProxyService
{
    private sealed record MicrosoftGraphEmailAddress(
        [property: JsonPropertyName("address")] string Address,
        [property: JsonPropertyName("name")]
        [property: JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        string? Name);

    private sealed record MicrosoftGraphRecipient(
        [property: JsonPropertyName("emailAddress")] MicrosoftGraphEmailAddress EmailAddress);

    private readonly CrmDbContext _dbContext;
    private readonly IEmailConnectionService _connectionService;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IMemoryCache _cache;
    private readonly ILogger<MailboxProxyService> _logger;

    private static readonly TimeSpan CacheTtl = TimeSpan.FromMinutes(3);

    private const string GraphBase = "https://graph.microsoft.com/v1.0/me";
    private const string GmailBase = "https://gmail.googleapis.com/gmail/v1/users/me";

    public MailboxProxyService(
        CrmDbContext dbContext,
        IEmailConnectionService connectionService,
        IHttpClientFactory httpClientFactory,
        IMemoryCache cache,
        ILogger<MailboxProxyService> logger)
    {
        _dbContext = dbContext;
        _connectionService = connectionService;
        _httpClientFactory = httpClientFactory;
        _cache = cache;
        _logger = logger;
    }

    // ============ LIST ============

    public async Task<ProxyMessageListResponse> ListMessagesAsync(MailboxSearchRequest request, CancellationToken ct = default)
    {
        var connections = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == request.UserId && c.IsActive && !c.IsDeleted)
            .ToListAsync(ct);

        if (connections.Count == 0)
            return new ProxyMessageListResponse([], 0, request.Page, request.PageSize);

        var all = new List<ProxyMessageSummary>();
        var total = 0;

        foreach (var conn in connections)
        {
            var folder = request.Folder ?? MailFolder.Inbox;
            var cacheKey = $"proxy:{conn.Id}:{folder}:{request.Page}:{request.PageSize}:{request.Search}";

            if (_cache.TryGetValue<(List<ProxyMessageSummary> Items, int Count)>(cacheKey, out var cached))
            {
                all.AddRange(cached.Items);
                total += cached.Count;
                continue;
            }

            var token = await _connectionService.GetAccessTokenAsync(conn.Id, ct);
            if (token is null) continue;

            var (items, count) = conn.Provider == EmailProvider.Microsoft365
                ? await ListMicrosoftAsync(conn.Id, token, folder, request, ct)
                : await ListGmailAsync(conn.Id, token, folder, request, ct);

            _cache.Set(cacheKey, (items, count), CacheTtl);
            all.AddRange(items);
            total += count;
        }

        all = all.OrderByDescending(m => m.ReceivedAtUtc).ToList();
        return new ProxyMessageListResponse(all, total, request.Page, request.PageSize);
    }

    // ============ GET MESSAGE ============

    public async Task<ProxyMessageDetail?> GetMessageAsync(Guid connectionId, string externalMessageId, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return null;

        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return null;

        using var client = Auth(token);

        return conn.Provider == EmailProvider.Microsoft365
            ? await GetMicrosoftMessageAsync(client, connectionId, externalMessageId, ct)
            : await GetGmailMessageAsync(client, connectionId, externalMessageId, ct);
    }

    // ============ STATS ============

    public async Task<MailboxStatsDto> GetStatsAsync(Guid userId, CancellationToken ct = default)
    {
        var cacheKey = $"proxy-stats:{userId}";
        if (_cache.TryGetValue<MailboxStatsDto>(cacheKey, out var cached))
            return cached;

        var connections = await _dbContext.UserEmailConnections
            .Where(c => c.UserId == userId && c.IsActive && !c.IsDeleted)
            .ToListAsync(ct);

        int unread = 0, inbox = 0, sent = 0, drafts = 0, starred = 0, archive = 0, trash = 0, spam = 0;

        foreach (var conn in connections)
        {
            var token = await _connectionService.GetAccessTokenAsync(conn.Id, ct);
            if (token is null) continue;

            using var client = Auth(token);

            try
            {
                if (conn.Provider == EmailProvider.Microsoft365)
                {
                    var (ic, uc) = await FetchMsFolder(client, "inbox", ct); inbox += ic; unread += uc;
                    var (sc, _1) = await FetchMsFolder(client, "sentitems", ct); sent += sc;
                    var (dc, _2) = await FetchMsFolder(client, "drafts", ct); drafts += dc;
                    var (ac, _3) = await FetchMsFolder(client, "archive", ct); archive += ac;
                    var (tc, _4) = await FetchMsFolder(client, "deleteditems", ct); trash += tc;
                    var (jc, _5) = await FetchMsFolder(client, "junkemail", ct); spam += jc;
                }
                else
                {
                    var (ic, uc) = await FetchGmailLabel(client, "INBOX", ct); inbox += ic; unread += uc;
                    var (sc, _1) = await FetchGmailLabel(client, "SENT", ct); sent += sc;
                    var (dc, _2) = await FetchGmailLabel(client, "DRAFT", ct); drafts += dc;
                    var (tc, _3) = await FetchGmailLabel(client, "TRASH", ct); trash += tc;
                    var (pc, _4) = await FetchGmailLabel(client, "SPAM", ct); spam += pc;
                    var (stc, _5) = await FetchGmailLabel(client, "STARRED", ct); starred += stc;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to get stats for connection {Id}", conn.Id);
            }
        }

        var stats = new MailboxStatsDto(inbox, unread, sent, drafts, starred, archive, trash, spam);
        _cache.Set(cacheKey, stats, CacheTtl);
        return stats;
    }

    // ============ ACTIONS ============

    public async Task<bool> SetReadStatusAsync(Guid connectionId, string externalMessageId, bool isRead, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return false;
        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return false;
        using var client = Auth(token);

        try
        {
            if (conn.Provider == EmailProvider.Microsoft365)
            {
                var content = new StringContent(JsonSerializer.Serialize(new { isRead }), System.Text.Encoding.UTF8, "application/json");
                return (await client.PatchAsync($"{GraphBase}/messages/{externalMessageId}", content, ct)).IsSuccessStatusCode;
            }
            else
            {
                object body = isRead ? new { removeLabelIds = new[] { "UNREAD" } } : new { addLabelIds = new[] { "UNREAD" } };
                return (await client.PostAsJsonAsync($"{GmailBase}/messages/{externalMessageId}/modify", body, ct)).IsSuccessStatusCode;
            }
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SetReadStatus failed for {Id}", externalMessageId); return false; }
    }

    public async Task<bool> SetStarredAsync(Guid connectionId, string externalMessageId, bool isStarred, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return false;
        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return false;
        using var client = Auth(token);

        try
        {
            if (conn.Provider == EmailProvider.Microsoft365)
            {
                var flagStatus = isStarred ? "flagged" : "notFlagged";
                var content = new StringContent(JsonSerializer.Serialize(new { flag = new { flagStatus } }), System.Text.Encoding.UTF8, "application/json");
                return (await client.PatchAsync($"{GraphBase}/messages/{externalMessageId}", content, ct)).IsSuccessStatusCode;
            }
            else
            {
                object body = isStarred ? new { addLabelIds = new[] { "STARRED" } } : new { removeLabelIds = new[] { "STARRED" } };
                return (await client.PostAsJsonAsync($"{GmailBase}/messages/{externalMessageId}/modify", body, ct)).IsSuccessStatusCode;
            }
        }
        catch (Exception ex) { _logger.LogWarning(ex, "SetStarred failed for {Id}", externalMessageId); return false; }
    }

    public async Task<bool> MoveToFolderAsync(Guid connectionId, string externalMessageId, MailFolder folder, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return false;
        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return false;
        using var client = Auth(token);

        try
        {
            if (conn.Provider == EmailProvider.Microsoft365)
            {
                var dest = folder switch { MailFolder.Inbox => "inbox", MailFolder.Archive => "archive", MailFolder.Trash => "deleteditems", MailFolder.Spam => "junkemail", _ => "inbox" };
                return (await client.PostAsJsonAsync($"{GraphBase}/messages/{externalMessageId}/move", new { destinationId = dest }, ct)).IsSuccessStatusCode;
            }
            else
            {
                var labels = folder switch { MailFolder.Inbox => new[] { "INBOX" }, MailFolder.Trash => new[] { "TRASH" }, MailFolder.Spam => new[] { "SPAM" }, _ => Array.Empty<string>() };
                return (await client.PostAsJsonAsync($"{GmailBase}/messages/{externalMessageId}/modify", new { addLabelIds = labels }, ct)).IsSuccessStatusCode;
            }
        }
        catch (Exception ex) { _logger.LogWarning(ex, "MoveToFolder failed for {Id}", externalMessageId); return false; }
    }

    public async Task<bool> DeleteAsync(Guid connectionId, string externalMessageId, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return false;
        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return false;
        using var client = Auth(token);

        try
        {
            if (conn.Provider == EmailProvider.Microsoft365)
                return (await client.DeleteAsync($"{GraphBase}/messages/{externalMessageId}", ct)).IsSuccessStatusCode;
            else
                return (await client.PostAsync($"{GmailBase}/messages/{externalMessageId}/trash", null, ct)).IsSuccessStatusCode;
        }
        catch (Exception ex) { _logger.LogWarning(ex, "Delete failed for {Id}", externalMessageId); return false; }
    }

    // ============ SEND / DRAFT ============

    public async Task<ProxyMessageDetail?> SendAsync(SendMailRequest request, CancellationToken ct = default)
    {
        var conn = await _dbContext.UserEmailConnections.FirstOrDefaultAsync(c => c.Id == request.ConnectionId && c.IsActive && !c.IsDeleted, ct);
        if (conn is null) return null;
        var token = await _connectionService.GetAccessTokenAsync(request.ConnectionId, ct);
        if (token is null) return null;
        using var client = Auth(token);

        return conn.Provider == EmailProvider.Microsoft365
            ? await SendMicrosoftAsync(client, conn, request, ct)
            : await SendGmailAsync(client, conn, request, ct);
    }

    public async Task<ProxyMessageDetail?> SaveDraftAsync(SaveDraftRequest request, CancellationToken ct = default)
    {
        var conn = await _dbContext.UserEmailConnections.FirstOrDefaultAsync(c => c.Id == request.ConnectionId && c.IsActive && !c.IsDeleted, ct);
        if (conn is null) return null;
        var token = await _connectionService.GetAccessTokenAsync(request.ConnectionId, ct);
        if (token is null) return null;
        using var client = Auth(token);

        if (conn.Provider == EmailProvider.Microsoft365)
        {
            var msg = new
            {
                subject = request.Subject,
                body = new { contentType = "HTML", content = request.BodyHtml },
                toRecipients = request.To?.Select(r => new { emailAddress = new { address = r.Email, name = r.Name } }),
                ccRecipients = request.Cc?.Select(r => new { emailAddress = new { address = r.Email, name = r.Name } }),
            };
            var resp = await client.PostAsJsonAsync($"{GraphBase}/messages", msg, ct);
            if (!resp.IsSuccessStatusCode) return null;
            var created = await resp.Content.ReadFromJsonAsync<JsonElement>(ct);
            return MapMicrosoftDetail(created, conn.Id);
        }
        else
        {
            var toHeader = string.Join(", ", (request.To ?? []).Select(r => string.IsNullOrEmpty(r.Name) ? r.Email : $"\"{r.Name}\" <{r.Email}>"));
            var mime = $"From: \"{conn.DisplayName}\" <{conn.EmailAddress}>\r\nTo: {toHeader}\r\nSubject: {request.Subject}\r\nContent-Type: text/html; charset=utf-8\r\n\r\n{request.BodyHtml}";
            var raw = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(mime)).Replace('+', '-').Replace('/', '_').TrimEnd('=');
            var resp = await client.PostAsJsonAsync($"{GmailBase}/drafts", new { message = new { raw } }, ct);
            if (!resp.IsSuccessStatusCode) return null;
            var draft = await resp.Content.ReadFromJsonAsync<JsonElement>(ct);
            var msgId = draft.TryGetProperty("message", out var m) ? m.GetProperty("id").GetString()! : Guid.NewGuid().ToString("N");
            return SyntheticDetail(msgId, conn, request.Subject, request.BodyHtml, request.To, request.Cc, null, MailFolder.Drafts);
        }
    }

    // ============ ATTACHMENT ============

    public async Task<AttachmentDownloadResult?> GetAttachmentAsync(Guid connectionId, string externalMessageId, string attachmentId, CancellationToken ct = default)
    {
        var conn = await GetConnectionAsync(connectionId, ct);
        if (conn is null) return null;
        var token = await _connectionService.GetAccessTokenAsync(connectionId, ct);
        if (token is null) return null;
        using var client = Auth(token);

        try
        {
            if (conn.Provider == EmailProvider.Microsoft365)
            {
                var resp = await client.GetFromJsonAsync<JsonElement>($"{GraphBase}/messages/{externalMessageId}/attachments/{attachmentId}", ct);
                return new AttachmentDownloadResult(
                    resp.GetProperty("name").GetString()!,
                    resp.GetProperty("contentType").GetString()!,
                    Convert.FromBase64String(resp.GetProperty("contentBytes").GetString()!));
            }
            else
            {
                var resp = await client.GetFromJsonAsync<JsonElement>($"{GmailBase}/messages/{externalMessageId}/attachments/{attachmentId}", ct);
                var data = resp.GetProperty("data").GetString()!;
                return new AttachmentDownloadResult("attachment", "application/octet-stream", DecodeBase64Url(data));
            }
        }
        catch (Exception ex) { _logger.LogError(ex, "Attachment download failed for {Att} on {Msg}", attachmentId, externalMessageId); return null; }
    }

    // ============ PRIVATE — MICROSOFT ============

    private async Task<(List<ProxyMessageSummary>, int)> ListMicrosoftAsync(
        Guid connId, string token, MailFolder folder, MailboxSearchRequest req, CancellationToken ct)
    {
        using var client = Auth(token);
        var folderName = MsFolderName(folder);
        var skip = (req.Page - 1) * req.PageSize;
        var url = $"{GraphBase}/mailFolders/{folderName}/messages?$top={req.PageSize}&$skip={skip}" +
                  "&$select=id,conversationId,subject,bodyPreview,from,toRecipients,isRead,flag,importance,hasAttachments,receivedDateTime,sentDateTime,isDraft" +
                  "&$orderby=receivedDateTime desc";

        if (!string.IsNullOrWhiteSpace(req.Search))
            url += $"&$search=\"{Uri.EscapeDataString(req.Search)}\"";

        try
        {
            var resp = await client.GetFromJsonAsync<JsonElement>(url, ct);
            var items = new List<ProxyMessageSummary>();
            if (resp.TryGetProperty("value", out var msgs))
                foreach (var m in msgs.EnumerateArray())
                    items.Add(MapMicrosoftSummary(m, connId, folder));

            var countResp = await client.GetFromJsonAsync<JsonElement>($"{GraphBase}/mailFolders/{folderName}?$select=totalItemCount", ct);
            var total = countResp.TryGetProperty("totalItemCount", out var tc) ? tc.GetInt32() : items.Count;
            return (items, total);
        }
        catch (Exception ex) { _logger.LogWarning(ex, "ListMicrosoft failed for {Id}", connId); return ([], 0); }
    }

    private async Task<ProxyMessageDetail?> GetMicrosoftMessageAsync(HttpClient client, Guid connId, string msgId, CancellationToken ct)
    {
        try
        {
            var url = $"{GraphBase}/messages/{msgId}?$select=id,conversationId,internetMessageId,subject,body,bodyPreview,from,toRecipients,ccRecipients,bccRecipients,isRead,flag,importance,hasAttachments,receivedDateTime,sentDateTime,isDraft";
            var msg = await client.GetFromJsonAsync<JsonElement>(url, ct);
            var detail = MapMicrosoftDetail(msg, connId);

            // Fetch attachments
            try
            {
                var attUrl = $"{GraphBase}/messages/{msgId}/attachments?$select=id,name,contentType,size";
                var attResp = await client.GetFromJsonAsync<JsonElement>(attUrl, ct);
                if (attResp.TryGetProperty("value", out var atts))
                {
                    var list = new List<MailAttachmentDto>();
                    foreach (var a in atts.EnumerateArray())
                        list.Add(new MailAttachmentDto(
                            a.GetProperty("id").GetString()!,
                            a.TryGetProperty("name", out var n) ? n.GetString() ?? "attachment" : "attachment",
                            a.TryGetProperty("size", out var s) ? s.GetInt64() : 0,
                            a.TryGetProperty("contentType", out var c) ? c.GetString() ?? "application/octet-stream" : "application/octet-stream"));
                    return detail with { Attachments = list };
                }
            }
            catch { /* attachments are optional */ }

            return detail;
        }
        catch (Exception ex) { _logger.LogWarning(ex, "GetMicrosoftMessage failed for {Id}", msgId); return null; }
    }

    private async Task<ProxyMessageDetail?> SendMicrosoftAsync(HttpClient client, UserEmailConnection conn, SendMailRequest req, CancellationToken ct)
    {
        var msg = new Dictionary<string, object?>
        {
            ["subject"] = req.Subject,
            ["body"] = new { contentType = "HTML", content = req.BodyHtml },
            ["toRecipients"] = req.To.Select(MapMicrosoftRecipient).ToList(),
            ["importance"] = req.Importance.ToString().ToLowerInvariant()
        };

        if (req.Cc is { Count: > 0 })
        {
            msg["ccRecipients"] = req.Cc.Select(MapMicrosoftRecipient).ToList();
        }

        if (req.Bcc is { Count: > 0 })
        {
            msg["bccRecipients"] = req.Bcc.Select(MapMicrosoftRecipient).ToList();
        }

        var resp = await client.PostAsJsonAsync($"{GraphBase}/sendMail", new { message = msg, saveToSentItems = true }, ct);
        if (!resp.IsSuccessStatusCode)
        {
            var errorBody = await resp.Content.ReadAsStringAsync(ct);
            _logger.LogError(
                "Microsoft Graph proxy sendMail failed for connection {ConnectionId} with status {StatusCode}. Response: {Response}",
                conn.Id,
                (int)resp.StatusCode,
                errorBody);
        }
        resp.EnsureSuccessStatusCode();
        return SyntheticDetail("sent-" + Guid.NewGuid().ToString("N"), conn, req.Subject, req.BodyHtml, req.To, req.Cc, req.Bcc, MailFolder.Sent);
    }

    private static MicrosoftGraphRecipient MapMicrosoftRecipient(MailRecipientDto recipient)
        => new(new MicrosoftGraphEmailAddress(recipient.Email, string.IsNullOrWhiteSpace(recipient.Name) ? null : recipient.Name));

    // ============ PRIVATE — GMAIL ============

    private async Task<(List<ProxyMessageSummary>, int)> ListGmailAsync(
        Guid connId, string token, MailFolder folder, MailboxSearchRequest req, CancellationToken ct)
    {
        using var client = Auth(token);
        var labelId = GmailLabel(folder);

        try
        {
            var query = $"label:{labelId}";
            if (!string.IsNullOrWhiteSpace(req.Search)) query += $" {req.Search}";
            var listUrl = $"{GmailBase}/messages?q={Uri.EscapeDataString(query)}&maxResults={req.PageSize}";
            var listResp = await client.GetFromJsonAsync<JsonElement>(listUrl, ct);

            var ids = new List<string>();
            if (listResp.TryGetProperty("messages", out var msgs))
                foreach (var m in msgs.EnumerateArray())
                    ids.Add(m.GetProperty("id").GetString()!);

            var total = listResp.TryGetProperty("resultSizeEstimate", out var rse) ? rse.GetInt32() : ids.Count;

            var items = new List<ProxyMessageSummary>();
            foreach (var id in ids)
            {
                try
                {
                    var msgData = await client.GetFromJsonAsync<JsonElement>(
                        $"{GmailBase}/messages/{id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date", ct);
                    items.Add(MapGmailSummary(msgData, connId, folder));
                }
                catch (Exception ex) { _logger.LogWarning(ex, "Fetch Gmail msg {Id} failed", id); }
            }

            return (items, total);
        }
        catch (Exception ex) { _logger.LogWarning(ex, "ListGmail failed for {Id}", connId); return ([], 0); }
    }

    private async Task<ProxyMessageDetail?> GetGmailMessageAsync(HttpClient client, Guid connId, string msgId, CancellationToken ct)
    {
        try
        {
            var msg = await client.GetFromJsonAsync<JsonElement>($"{GmailBase}/messages/{msgId}?format=full", ct);
            return MapGmailDetail(msg, connId);
        }
        catch (Exception ex) { _logger.LogWarning(ex, "GetGmailMessage failed for {Id}", msgId); return null; }
    }

    private async Task<ProxyMessageDetail?> SendGmailAsync(HttpClient client, UserEmailConnection conn, SendMailRequest req, CancellationToken ct)
    {
        var toHeader = string.Join(", ", req.To.Select(r => string.IsNullOrEmpty(r.Name) ? r.Email : $"\"{r.Name}\" <{r.Email}>"));
        var mime = $"From: \"{conn.DisplayName}\" <{conn.EmailAddress}>\r\nTo: {toHeader}\r\nSubject: {req.Subject}\r\nContent-Type: text/html; charset=utf-8\r\n\r\n{req.BodyHtml}";
        var raw = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(mime)).Replace('+', '-').Replace('/', '_').TrimEnd('=');
        var resp = await client.PostAsJsonAsync($"{GmailBase}/messages/send", new { raw }, ct);
        resp.EnsureSuccessStatusCode();
        return SyntheticDetail("sent-" + Guid.NewGuid().ToString("N"), conn, req.Subject, req.BodyHtml, req.To, req.Cc, req.Bcc, MailFolder.Sent);
    }

    // ============ MAPPING ============

    private static ProxyMessageSummary MapMicrosoftSummary(JsonElement msg, Guid connId, MailFolder folder)
    {
        var from = msg.GetProperty("from").GetProperty("emailAddress");
        var starred = msg.TryGetProperty("flag", out var f) && f.TryGetProperty("flagStatus", out var fs) && fs.GetString() == "flagged";
        return new ProxyMessageSummary(
            msg.GetProperty("id").GetString()!,
            connId,
            msg.TryGetProperty("conversationId", out var cid) ? cid.GetString() : null,
            msg.TryGetProperty("subject", out var subj) ? subj.GetString() ?? "" : "",
            msg.TryGetProperty("bodyPreview", out var bp) ? Trunc(bp.GetString() ?? "") : "",
            from.GetProperty("address").GetString()!,
            from.TryGetProperty("name", out var fn) ? fn.GetString() : null,
            folder,
            msg.TryGetProperty("isRead", out var rd) && rd.GetBoolean(),
            starred,
            msg.TryGetProperty("isDraft", out var dr) && dr.GetBoolean(),
            msg.TryGetProperty("hasAttachments", out var ha) && ha.GetBoolean(),
            ParseImportance(msg),
            msg.TryGetProperty("receivedDateTime", out var r) ? r.GetDateTime() : DateTime.UtcNow,
            msg.TryGetProperty("sentDateTime", out var s) ? s.GetDateTime() : null);
    }

    private static ProxyMessageDetail MapMicrosoftDetail(JsonElement msg, Guid connId)
    {
        var from = msg.GetProperty("from").GetProperty("emailAddress");
        var starred = msg.TryGetProperty("flag", out var f) && f.TryGetProperty("flagStatus", out var fs) && fs.GetString() == "flagged";
        string? bodyHtml = null, bodyText = null;
        if (msg.TryGetProperty("body", out var b))
        {
            var content = b.TryGetProperty("content", out var c) ? c.GetString() : null;
            var ct2 = b.TryGetProperty("contentType", out var t) ? t.GetString() : "text";
            if (ct2?.Equals("html", StringComparison.OrdinalIgnoreCase) == true) bodyHtml = content; else bodyText = content;
        }

        return new ProxyMessageDetail(
            msg.GetProperty("id").GetString()!,
            connId,
            msg.TryGetProperty("conversationId", out var cid) ? cid.GetString() : null,
            msg.TryGetProperty("subject", out var subj) ? subj.GetString() ?? "" : "",
            bodyHtml, bodyText,
            msg.TryGetProperty("bodyPreview", out var bp) ? Trunc(bp.GetString() ?? "") : "",
            from.GetProperty("address").GetString()!,
            from.TryGetProperty("name", out var fn) ? fn.GetString() : null,
            ParseRecipientList(msg, "toRecipients"),
            ParseRecipientList(msg, "ccRecipients"),
            ParseRecipientList(msg, "bccRecipients"),
            MailFolder.Inbox,
            msg.TryGetProperty("isRead", out var rd) && rd.GetBoolean(),
            starred,
            msg.TryGetProperty("isDraft", out var dr) && dr.GetBoolean(),
            msg.TryGetProperty("hasAttachments", out var ha) && ha.GetBoolean(),
            ParseImportance(msg),
            msg.TryGetProperty("receivedDateTime", out var r) ? r.GetDateTime() : DateTime.UtcNow,
            msg.TryGetProperty("sentDateTime", out var s) ? s.GetDateTime() : null,
            [],
            msg.TryGetProperty("internetMessageId", out var imid) ? imid.GetString() : null);
    }

    private static ProxyMessageSummary MapGmailSummary(JsonElement msg, Guid connId, MailFolder folder)
    {
        var (subj, email, name, date) = GmailHeaders(msg);
        var labels = GmailLabels(msg);
        return new ProxyMessageSummary(
            msg.GetProperty("id").GetString()!, connId,
            msg.TryGetProperty("threadId", out var tid) ? tid.GetString() : null,
            subj, msg.TryGetProperty("snippet", out var sn) ? Trunc(sn.GetString() ?? "") : "",
            email, name, folder,
            !labels.Contains("UNREAD"), labels.Contains("STARRED"), labels.Contains("DRAFT"),
            msg.TryGetProperty("payload", out var p) && p.TryGetProperty("parts", out _),
            MailImportance.Normal, date, null);
    }

    private static ProxyMessageDetail MapGmailDetail(JsonElement msg, Guid connId)
    {
        var (subj, email, name, date) = GmailHeaders(msg);
        var labels = GmailLabels(msg);
        var toList = GmailRecipients(msg, "To");
        var folder = labels.Contains("INBOX") ? MailFolder.Inbox
            : labels.Contains("SENT") ? MailFolder.Sent
            : labels.Contains("DRAFT") ? MailFolder.Drafts
            : labels.Contains("TRASH") ? MailFolder.Trash
            : labels.Contains("SPAM") ? MailFolder.Spam : MailFolder.Inbox;

        string? bodyHtml = null;
        if (msg.TryGetProperty("payload", out var payload))
            bodyHtml = ExtractGmailBody(payload);

        return new ProxyMessageDetail(
            msg.GetProperty("id").GetString()!, connId,
            msg.TryGetProperty("threadId", out var tid) ? tid.GetString() : null,
            subj, bodyHtml, null,
            msg.TryGetProperty("snippet", out var sn) ? Trunc(sn.GetString() ?? "") : "",
            email, name, toList, null, null, folder,
            !labels.Contains("UNREAD"), labels.Contains("STARRED"), labels.Contains("DRAFT"),
            payload.TryGetProperty("parts", out _),
            MailImportance.Normal, date, null, [], null);
    }

    private static ProxyMessageDetail SyntheticDetail(
        string externalId, UserEmailConnection conn, string? subject, string? bodyHtml,
        IEnumerable<MailRecipientDto>? to, IEnumerable<MailRecipientDto>? cc, IEnumerable<MailRecipientDto>? bcc, MailFolder folder)
    {
        return new ProxyMessageDetail(externalId, conn.Id, null,
            subject ?? "", bodyHtml, null, Trunc(bodyHtml ?? ""),
            conn.EmailAddress, conn.DisplayName,
            to?.ToList() ?? [], cc?.ToList(), bcc?.ToList(),
            folder, true, false, folder == MailFolder.Drafts, false,
            MailImportance.Normal, DateTime.UtcNow, DateTime.UtcNow, [], null);
    }

    // ============ UTILITIES ============

    private HttpClient Auth(string token)
    {
        var c = _httpClientFactory.CreateClient();
        c.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        return c;
    }

    private async Task<UserEmailConnection?> GetConnectionAsync(Guid id, CancellationToken ct)
        => await _dbContext.UserEmailConnections.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, ct);

    private async Task<(int Total, int Unread)> FetchMsFolder(HttpClient client, string folder, CancellationToken ct)
    {
        try
        {
            var resp = await client.GetFromJsonAsync<JsonElement>($"{GraphBase}/mailFolders/{folder}?$select=totalItemCount,unreadItemCount", ct);
            var total = resp.TryGetProperty("totalItemCount", out var tc) ? tc.GetInt32() : 0;
            var unread = resp.TryGetProperty("unreadItemCount", out var uc) ? uc.GetInt32() : 0;
            return (total, unread);
        }
        catch { return (0, 0); }
    }

    private async Task<(int Total, int Unread)> FetchGmailLabel(HttpClient client, string label, CancellationToken ct)
    {
        try
        {
            var resp = await client.GetFromJsonAsync<JsonElement>($"{GmailBase}/labels/{label}", ct);
            var total = resp.TryGetProperty("messagesTotal", out var mt) ? mt.GetInt32() : 0;
            var unread = resp.TryGetProperty("messagesUnread", out var mu) ? mu.GetInt32() : 0;
            return (total, unread);
        }
        catch { return (0, 0); }
    }

    private static MailImportance ParseImportance(JsonElement msg)
    {
        if (!msg.TryGetProperty("importance", out var imp)) return MailImportance.Normal;
        return imp.GetString()?.ToLower() switch { "high" => MailImportance.High, "low" => MailImportance.Low, _ => MailImportance.Normal };
    }

    private static List<MailRecipientDto> ParseRecipientList(JsonElement msg, string prop)
    {
        if (!msg.TryGetProperty(prop, out var arr)) return [];
        var list = new List<MailRecipientDto>();
        foreach (var r in arr.EnumerateArray())
        {
            var a = r.GetProperty("emailAddress");
            list.Add(new MailRecipientDto(a.GetProperty("address").GetString()!, a.TryGetProperty("name", out var n) ? n.GetString() : null));
        }
        return list;
    }

    private static (string Subj, string Email, string? Name, DateTime Date) GmailHeaders(JsonElement msg)
    {
        string subj = "", email = ""; string? name = null; var date = DateTime.UtcNow;
        if (msg.TryGetProperty("payload", out var p) && p.TryGetProperty("headers", out var hdrs))
            foreach (var h in hdrs.EnumerateArray())
            {
                var k = h.GetProperty("name").GetString()?.ToLower();
                var v = h.GetProperty("value").GetString();
                switch (k)
                {
                    case "subject": subj = v ?? ""; break;
                    case "from": (email, name) = ParseAddr(v ?? ""); break;
                    case "date": if (DateTime.TryParse(v, out var d)) date = d.ToUniversalTime(); break;
                }
            }
        return (subj, email, name, date);
    }

    private static List<string?> GmailLabels(JsonElement msg)
        => msg.TryGetProperty("labelIds", out var a) ? a.EnumerateArray().Select(l => l.GetString()).ToList() : new();

    private static List<MailRecipientDto> GmailRecipients(JsonElement msg, string header)
    {
        if (!msg.TryGetProperty("payload", out var p) || !p.TryGetProperty("headers", out var hdrs)) return [];
        foreach (var h in hdrs.EnumerateArray())
            if (h.GetProperty("name").GetString()?.Equals(header, StringComparison.OrdinalIgnoreCase) == true)
                return (h.GetProperty("value").GetString() ?? "").Split(',')
                    .Select(part => { var (e, n) = ParseAddr(part.Trim()); return new MailRecipientDto(e, n); }).ToList();
        return [];
    }

    private static (string Email, string? Name) ParseAddr(string v)
    {
        var m = System.Text.RegularExpressions.Regex.Match(v, @"(?:""?([^""<]+)""?\s*)?<?([^<>\s]+@[^<>\s]+)>?");
        return m.Success ? (m.Groups[2].Value, m.Groups[1].Value.Trim()) : (v, null);
    }

    private static string? ExtractGmailBody(JsonElement payload)
    {
        if (payload.TryGetProperty("body", out var body) && body.TryGetProperty("data", out var data))
        { var enc = data.GetString(); if (!string.IsNullOrEmpty(enc)) return System.Text.Encoding.UTF8.GetString(DecodeBase64Url(enc)); }
        if (!payload.TryGetProperty("parts", out var parts)) return null;
        foreach (var p in parts.EnumerateArray())
            if (p.TryGetProperty("mimeType", out var mt) && mt.GetString() == "text/html" && p.TryGetProperty("body", out var b) && b.TryGetProperty("data", out var d))
                return System.Text.Encoding.UTF8.GetString(DecodeBase64Url(d.GetString()!));
        foreach (var p in parts.EnumerateArray())
            if (p.TryGetProperty("mimeType", out var mt) && mt.GetString() == "text/plain" && p.TryGetProperty("body", out var b) && b.TryGetProperty("data", out var d))
                return System.Text.Encoding.UTF8.GetString(DecodeBase64Url(d.GetString()!));
        return null;
    }

    private static byte[] DecodeBase64Url(string b64url)
    {
        var b = b64url.Replace('-', '+').Replace('_', '/');
        var pad = b.Length % 4;
        if (pad > 0) b += new string('=', 4 - pad);
        return Convert.FromBase64String(b);
    }

    private static string MsFolderName(MailFolder f) => f switch
    {
        MailFolder.Inbox => "inbox", MailFolder.Sent => "sentitems", MailFolder.Drafts => "drafts",
        MailFolder.Archive => "archive", MailFolder.Trash => "deleteditems", MailFolder.Spam => "junkemail", _ => "inbox"
    };

    private static string GmailLabel(MailFolder f) => f switch
    {
        MailFolder.Inbox => "INBOX", MailFolder.Sent => "SENT", MailFolder.Drafts => "DRAFT",
        MailFolder.Trash => "TRASH", MailFolder.Spam => "SPAM", MailFolder.Starred => "STARRED", _ => "INBOX"
    };

    private static string Trunc(string s) => s.Length > 200 ? s[..200] : s;
}
