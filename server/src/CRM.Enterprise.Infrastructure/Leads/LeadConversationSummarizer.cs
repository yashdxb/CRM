using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.RegularExpressions;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed partial class LeadConversationSummarizer : ILeadConversationSummarizer
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly CrmDbContext _db;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly AzureOpenAiOptions _azureOptions;
    private readonly OpenAiOptions _openAiOptions;
    private readonly ILogger<LeadConversationSummarizer> _logger;

    public LeadConversationSummarizer(
        CrmDbContext db,
        IHttpClientFactory httpClientFactory,
        IOptions<AzureOpenAiOptions> azureOptions,
        IOptions<OpenAiOptions> openAiOptions,
        ILogger<LeadConversationSummarizer> logger)
    {
        _db = db;
        _httpClientFactory = httpClientFactory;
        _azureOptions = azureOptions.Value;
        _openAiOptions = openAiOptions.Value;
        _logger = logger;
    }

    public async Task<LeadConversationAiSummary> SummarizeAsync(Guid leadId, CancellationToken ct = default)
    {
        var lead = await _db.Leads
            .AsNoTracking()
            .FirstOrDefaultAsync(l => l.Id == leadId && !l.IsDeleted, ct)
            ?? throw new InvalidOperationException($"Lead {leadId} not found.");

        var conversationText = await BuildConversationTextAsync(lead, ct);

        if (string.IsNullOrWhiteSpace(conversationText))
        {
            return new LeadConversationAiSummary(
                "No email communication found for this lead.",
                "Neutral",
                "Initiate first contact via email or phone.",
                DateTime.UtcNow);
        }

        var prompt = $"Analyze the following sales conversation with lead \"{lead.FirstName} {lead.LastName}\" " +
                     $"from \"{lead.CompanyName ?? "Unknown Company"}\".\n\n" +
                     $"Conversation:\n{conversationText}\n\n" +
                     "Return JSON with:\n" +
                     "- summary: 2-3 sentence overview of the conversation (<=300 chars)\n" +
                     "- sentiment: one of Positive, Neutral, Cautious, Negative\n" +
                     "- nextAction: specific recommended next step (<=150 chars)";

        var result = await CallAiAsync(prompt, ct);

        // Persist on the lead entity
        var tracked = await _db.Leads.FirstOrDefaultAsync(l => l.Id == leadId, ct);
        if (tracked is not null)
        {
            tracked.ConversationAiSummary = result.Summary;
            tracked.ConversationAiSentiment = result.Sentiment;
            tracked.ConversationAiNextAction = result.NextAction;
            tracked.ConversationAiSummaryAtUtc = result.GeneratedAtUtc;
            await _db.SaveChangesAsync(ct);
        }

        return result;
    }

    private async Task<string> BuildConversationTextAsync(Lead lead, CancellationToken ct)
    {
        var parts = new List<string>();

        // Outbound emails (CRM → lead)
        var outboundEmails = await _db.EmailLogs
            .AsNoTracking()
            .Where(e => !e.IsDeleted
                        && e.TenantId == lead.TenantId
                        && e.RelatedEntityType == EmailRelationType.Lead
                        && e.RelatedEntityId == lead.Id)
            .OrderBy(e => e.SentAtUtc ?? e.CreatedAtUtc)
            .Select(e => new { e.Subject, e.TextBody, e.HtmlBody, e.SentAtUtc, e.CreatedAtUtc })
            .Take(20)
            .ToListAsync(ct);

        foreach (var email in outboundEmails)
        {
            var date = email.SentAtUtc ?? email.CreatedAtUtc;
            var body = !string.IsNullOrWhiteSpace(email.TextBody)
                ? email.TextBody
                : StripHtml(email.HtmlBody);
            // Truncate long bodies
            if (body.Length > 500) body = body[..500] + "...";
            parts.Add($"[{date:yyyy-MM-dd}] CRM → Lead | Subject: {email.Subject}\n{body}");
        }

        // Inbound emails (lead → CRM user) from synced mailbox
        if (!string.IsNullOrWhiteSpace(lead.Email))
        {
            var leadEmailLower = lead.Email.ToLowerInvariant();
            var inboundEmails = await _db.UserMailMessages
                .AsNoTracking()
                .Where(m => m.TenantId == lead.TenantId && m.FromEmail.ToLower() == leadEmailLower)
                .OrderBy(m => m.ReceivedAtUtc)
                .Select(m => new { m.Subject, m.BodyPreview, m.ReceivedAtUtc })
                .Take(20)
                .ToListAsync(ct);

            foreach (var msg in inboundEmails)
            {
                parts.Add($"[{msg.ReceivedAtUtc:yyyy-MM-dd}] Lead → CRM | Subject: {msg.Subject}\n{msg.BodyPreview}");
            }
        }

        // Sort all parts chronologically by the date prefix
        parts.Sort(StringComparer.Ordinal);

        return string.Join("\n---\n", parts);
    }

    private async Task<LeadConversationAiSummary> CallAiAsync(string prompt, CancellationToken ct)
    {
        // Try Azure OpenAI first, fall back to OpenAI
        if (!string.IsNullOrWhiteSpace(_azureOptions.ApiKey) && !string.IsNullOrWhiteSpace(_azureOptions.Deployment))
        {
            return await CallAzureOpenAiAsync(prompt, ct);
        }

        if (!string.IsNullOrWhiteSpace(_openAiOptions.ApiKey))
        {
            return await CallOpenAiAsync(prompt, ct);
        }

        _logger.LogWarning("No AI service configured for conversation summary; returning fallback.");
        return new LeadConversationAiSummary(
            "AI summary unavailable — no OpenAI service configured.",
            "Neutral",
            "Configure Azure OpenAI or OpenAI to enable AI conversation summaries.",
            DateTime.UtcNow);
    }

    private async Task<LeadConversationAiSummary> CallAzureOpenAiAsync(string prompt, CancellationToken ct)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_azureOptions.Endpoint.TrimEnd('/') + "/");

        var requestBody = new
        {
            temperature = 0.3m,
            max_tokens = 400,
            response_format = new { type = "json_object" },
            messages = new[]
            {
                new { role = "system", content = "You are a CRM conversation analyst. Return JSON with fields: summary (string, <=300 chars), sentiment (Positive|Neutral|Cautious|Negative), nextAction (string, <=150 chars)." },
                new { role = "user", content = prompt }
            }
        };

        var requestUri = $"openai/deployments/{_azureOptions.Deployment}/chat/completions?api-version={_azureOptions.ApiVersion}";
        using var message = new HttpRequestMessage(HttpMethod.Post, requestUri);
        message.Headers.Add("api-key", _azureOptions.ApiKey);
        message.Content = JsonContent.Create(requestBody, options: JsonOptions);

        using var response = await client.SendAsync(message, ct);
        var responseText = await response.Content.ReadAsStringAsync(ct);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"Azure OpenAI conversation summary error: {response.StatusCode} {responseText}");
        }

        return ParseSummaryResponse(responseText);
    }

    private async Task<LeadConversationAiSummary> CallOpenAiAsync(string prompt, CancellationToken ct)
    {
        var client = _httpClientFactory.CreateClient();
        client.BaseAddress = new Uri(_openAiOptions.BaseUrl);

        var requestBody = new
        {
            model = _openAiOptions.Model,
            temperature = 0.3m,
            max_tokens = 400,
            response_format = new { type = "json_object" },
            messages = new[]
            {
                new { role = "system", content = "You are a CRM conversation analyst. Return JSON with fields: summary (string, <=300 chars), sentiment (Positive|Neutral|Cautious|Negative), nextAction (string, <=150 chars)." },
                new { role = "user", content = prompt }
            }
        };

        using var message = new HttpRequestMessage(HttpMethod.Post, "chat/completions");
        message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _openAiOptions.ApiKey);
        message.Content = JsonContent.Create(requestBody, options: JsonOptions);

        using var response = await client.SendAsync(message, ct);
        var responseText = await response.Content.ReadAsStringAsync(ct);
        if (!response.IsSuccessStatusCode)
        {
            throw new InvalidOperationException($"OpenAI conversation summary error: {response.StatusCode} {responseText}");
        }

        return ParseSummaryResponse(responseText);
    }

    private static LeadConversationAiSummary ParseSummaryResponse(string responseText)
    {
        using var doc = JsonDocument.Parse(responseText);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(content))
        {
            throw new InvalidOperationException("AI returned empty conversation summary.");
        }

        using var result = JsonDocument.Parse(content);
        var root = result.RootElement;

        var summary = root.TryGetProperty("summary", out var s) ? s.GetString() ?? "" : "";
        var sentiment = root.TryGetProperty("sentiment", out var se) ? se.GetString() ?? "Neutral" : "Neutral";
        var nextAction = root.TryGetProperty("nextAction", out var na) ? na.GetString() ?? "" : "";

        if (summary.Length > 300) summary = summary[..300];
        if (nextAction.Length > 150) nextAction = nextAction[..150];

        return new LeadConversationAiSummary(summary, sentiment, nextAction, DateTime.UtcNow);
    }

    private static string StripHtml(string? html)
    {
        if (string.IsNullOrWhiteSpace(html)) return string.Empty;
        return HtmlTagRegex().Replace(html, " ").Trim();
    }

    [GeneratedRegex("<.*?>")]
    private static partial Regex HtmlTagRegex();
}
