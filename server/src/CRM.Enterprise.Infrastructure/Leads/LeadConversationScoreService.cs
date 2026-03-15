using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadConversationScoreService : ILeadConversationScoreService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly AzureOpenAiOptions _azureOptions;
    private readonly OpenAiOptions _openAiOptions;
    private readonly ILogger<LeadConversationScoreService> _logger;

    public LeadConversationScoreService(
        CrmDbContext dbContext,
        IHttpClientFactory httpClientFactory,
        IOptions<AzureOpenAiOptions> azureOptions,
        IOptions<OpenAiOptions> openAiOptions,
        ILogger<LeadConversationScoreService> logger)
    {
        _dbContext = dbContext;
        _httpClientFactory = httpClientFactory;
        _azureOptions = azureOptions.Value;
        _openAiOptions = openAiOptions.Value;
        _logger = logger;
    }

    public async Task<LeadConversationScoreSnapshot> CalculateAsync(Lead lead, CancellationToken cancellationToken = default)
    {
        var interactions = new List<NormalizedInteraction>();

        interactions.AddRange(await LoadLeadActivitiesAsync(lead, cancellationToken));
        interactions.AddRange(await LoadLeadEmailLogsAsync(lead, cancellationToken));
        interactions.AddRange(await LoadMailboxMessagesAsync(lead, cancellationToken));

        if (interactions.Count == 0)
        {
            return new LeadConversationScoreSnapshot(
                null,
                "Unavailable",
                ["No email, call, meeting, or activity evidence is linked to this lead yet."],
                null,
                false);
        }

        var now = DateTime.UtcNow;
        var latestInteractionAt = interactions.Max(i => i.OccurredAtUtc);
        var last7Days = interactions.Count(i => i.OccurredAtUtc >= now.AddDays(-7));
        var last30Days = interactions.Count(i => i.OccurredAtUtc >= now.AddDays(-30));
        var inboundCount = interactions.Count(i => i.Direction is InteractionDirection.Inbound or InteractionDirection.Bidirectional);
        var outboundCount = interactions.Count(i => i.Direction is InteractionDirection.Outbound or InteractionDirection.Bidirectional);
        var stakeholders = interactions
            .Select(i => i.Counterparty)
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Count();

        var signalCategories = interactions
            .SelectMany(i => DetectSignalCategories(i.Text))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var recencyScore = latestInteractionAt >= now.AddDays(-7)
            ? 20
            : latestInteractionAt >= now.AddDays(-14)
                ? 15
                : latestInteractionAt >= now.AddDays(-30)
                    ? 8
                    : 0;

        var frequencyScore = last30Days >= 6
            ? 15
            : last30Days >= 3
                ? 10
                : last30Days >= 1
                    ? 5
                    : 0;

        var bidirectionalScore = inboundCount > 0 && outboundCount > 0
            ? inboundCount >= 2
                ? 20
                : 14
            : outboundCount > 0
                ? 4
                : 0;

        var stakeholderScore = stakeholders >= 3
            ? 10
            : stakeholders == 2
                ? 7
                : stakeholders == 1
                    ? 4
                    : 0;

        var signalScore = signalCategories.Count >= 4
            ? 20
            : signalCategories.Count == 3
                ? 15
                : signalCategories.Count == 2
                    ? 10
                    : signalCategories.Count == 1
                        ? 5
                        : 0;

        var momentumScore = latestInteractionAt >= now.AddDays(-14) && last30Days >= 3 && inboundCount > 0
            ? 15
            : latestInteractionAt >= now.AddDays(-14)
                ? 10
                : latestInteractionAt >= now.AddDays(-30)
                    ? 5
                    : 0;

        var rulesScore = recencyScore + frequencyScore + bidirectionalScore + stakeholderScore + signalScore + momentumScore;

        // 7th dimension: AI Tone & Intent analysis (0-20 points)
        var toneAnalysis = await AnalyzeToneAsync(lead, interactions, cancellationToken);
        var aiDimensionScore = toneAnalysis?.AiDimensionScore ?? 0;

        var totalScore = rulesScore + aiDimensionScore;
        var label = totalScore >= 90
            ? "High"
            : totalScore >= 55
                ? "Medium"
                : "Low";

        var reasons = BuildReasons(
            latestInteractionAt,
            now,
            last30Days,
            inboundCount,
            outboundCount,
            stakeholders,
            signalCategories);

        if (toneAnalysis is not null)
        {
            reasons = [..reasons, $"AI tone: {toneAnalysis.ToneLabel}, buying readiness: {toneAnalysis.BuyingReadiness}."];
        }

        return new LeadConversationScoreSnapshot(
            totalScore,
            label,
            reasons,
            now,
            true,
            toneAnalysis);
    }

    public async Task<LeadConversationScoreSnapshot?> RefreshAsync(Guid leadId, CancellationToken cancellationToken = default)
    {
        var lead = await _dbContext.Leads
            .FirstOrDefaultAsync(l => l.Id == leadId && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return null;
        }

        var snapshot = await CalculateAsync(lead, cancellationToken);
        ApplySnapshot(lead, snapshot);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return snapshot;
    }

    public static IReadOnlyList<string> ParseReasons(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return [];
        }

        try
        {
            return JsonSerializer.Deserialize<List<string>>(json, JsonOptions) ?? [];
        }
        catch (JsonException)
        {
            return [];
        }
    }

    public static void ApplySnapshot(Lead lead, LeadConversationScoreSnapshot snapshot)
    {
        lead.ConversationScore = snapshot.Score;
        lead.ConversationScoreLabel = snapshot.Label;
        lead.ConversationScoreReasonsJson = snapshot.Reasons.Count == 0
            ? null
            : JsonSerializer.Serialize(snapshot.Reasons, JsonOptions);
        lead.ConversationScoreUpdatedAtUtc = snapshot.UpdatedAtUtc;
        lead.ConversationSignalAvailable = snapshot.SignalAvailable;

        // AI Tone dimension
        lead.ConversationAiDimensionScore = snapshot.ToneAnalysis?.AiDimensionScore;
        lead.ConversationAiToneLabel = snapshot.ToneAnalysis?.ToneLabel;
        lead.ConversationAiBuyingReadiness = snapshot.ToneAnalysis?.BuyingReadiness;
        lead.ConversationAiSemanticIntent = snapshot.ToneAnalysis?.SemanticIntent;
        lead.ConversationAiToneJustification = snapshot.ToneAnalysis?.Justification;
    }

    private async Task<ConversationToneAnalysis?> AnalyzeToneAsync(
        Lead lead,
        List<NormalizedInteraction> interactions,
        CancellationToken ct)
    {
        // Only analyze if there is meaningful text content
        var textParts = interactions
            .Where(i => !string.IsNullOrWhiteSpace(i.Text))
            .OrderByDescending(i => i.OccurredAtUtc)
            .Take(15)
            .Select(i =>
            {
                var body = i.Text.Length > 400 ? i.Text[..400] + "..." : i.Text;
                return $"[{i.OccurredAtUtc:yyyy-MM-dd} {i.Direction} via {i.Source}]\n{body}";
            })
            .ToList();

        if (textParts.Count == 0)
        {
            return null;
        }

        var conversationText = string.Join("\n---\n", textParts);
        if (conversationText.Length > 6000)
        {
            conversationText = conversationText[..6000];
        }

        var prompt = $"Analyze the tone and buying intent of this sales conversation with lead " +
                     $"\"{lead.FirstName} {lead.LastName}\" from \"{lead.CompanyName ?? "Unknown"}\".\n\n" +
                     $"Conversation:\n{conversationText}\n\n" +
                     "Return JSON with:\n" +
                     "- toneLabel: overall conversational tone, one of: Engaged, Formal, Enthusiastic, Guarded, Dismissive, Urgent\n" +
                     "- buyingReadiness: one of: Ready to Buy, Actively Evaluating, Early Exploration, Stalling, Objecting, Disengaged\n" +
                     "- semanticIntent: one of: Seeking Solution, Comparing Options, Negotiating Terms, Requesting Information, Going Silent, Raising Objections\n" +
                     "- aiScore: integer 0-20 representing buying strength (20=strong buying signals + engaged tone, 0=disengaged/hostile)\n" +
                     "- justification: one sentence explaining the aiScore (<=120 chars)";

        try
        {
            return await CallToneAiAsync(prompt, ct);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "AI tone analysis failed for lead {LeadId}; scoring without AI dimension.", lead.Id);
            return null;
        }
    }

    private async Task<ConversationToneAnalysis> CallToneAiAsync(string prompt, CancellationToken ct)
    {
        const string systemMessage = "You are a CRM sales conversation analyst specializing in tone and intent detection. " +
            "Return JSON with fields: toneLabel (Engaged|Formal|Enthusiastic|Guarded|Dismissive|Urgent), " +
            "buyingReadiness (Ready to Buy|Actively Evaluating|Early Exploration|Stalling|Objecting|Disengaged), " +
            "semanticIntent (Seeking Solution|Comparing Options|Negotiating Terms|Requesting Information|Going Silent|Raising Objections), " +
            "aiScore (integer 0-20), justification (string <=120 chars).";

        string responseText;

        if (!string.IsNullOrWhiteSpace(_azureOptions.ApiKey) && !string.IsNullOrWhiteSpace(_azureOptions.Deployment))
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_azureOptions.Endpoint.TrimEnd('/') + "/");

            var requestBody = new
            {
                temperature = 0.2m,
                max_tokens = 300,
                response_format = new { type = "json_object" },
                messages = new[]
                {
                    new { role = "system", content = systemMessage },
                    new { role = "user", content = prompt }
                }
            };

            var requestUri = $"openai/deployments/{_azureOptions.Deployment}/chat/completions?api-version={_azureOptions.ApiVersion}";
            using var message = new HttpRequestMessage(HttpMethod.Post, requestUri);
            message.Headers.Add("api-key", _azureOptions.ApiKey);
            message.Content = JsonContent.Create(requestBody, options: JsonOptions);

            using var response = await client.SendAsync(message, ct);
            responseText = await response.Content.ReadAsStringAsync(ct);
            if (!response.IsSuccessStatusCode)
            {
                throw new InvalidOperationException($"Azure OpenAI tone analysis error: {response.StatusCode} {responseText}");
            }
        }
        else if (!string.IsNullOrWhiteSpace(_openAiOptions.ApiKey))
        {
            var client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(_openAiOptions.BaseUrl);

            var requestBody = new
            {
                model = _openAiOptions.Model,
                temperature = 0.2m,
                max_tokens = 300,
                response_format = new { type = "json_object" },
                messages = new[]
                {
                    new { role = "system", content = systemMessage },
                    new { role = "user", content = prompt }
                }
            };

            using var message = new HttpRequestMessage(HttpMethod.Post, "chat/completions");
            message.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _openAiOptions.ApiKey);
            message.Content = JsonContent.Create(requestBody, options: JsonOptions);

            using var response = await client.SendAsync(message, ct);
            responseText = await response.Content.ReadAsStringAsync(ct);
            if (!response.IsSuccessStatusCode)
            {
                throw new InvalidOperationException($"OpenAI tone analysis error: {response.StatusCode} {responseText}");
            }
        }
        else
        {
            throw new InvalidOperationException("No AI service configured for tone analysis.");
        }

        return ParseToneResponse(responseText);
    }

    private static ConversationToneAnalysis ParseToneResponse(string responseText)
    {
        using var doc = JsonDocument.Parse(responseText);
        var content = doc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(content))
        {
            throw new InvalidOperationException("AI returned empty tone analysis.");
        }

        using var result = JsonDocument.Parse(content);
        var root = result.RootElement;

        var toneLabel = root.TryGetProperty("toneLabel", out var t) ? t.GetString() ?? "Formal" : "Formal";
        var buyingReadiness = root.TryGetProperty("buyingReadiness", out var b) ? b.GetString() ?? "Early Exploration" : "Early Exploration";
        var semanticIntent = root.TryGetProperty("semanticIntent", out var si) ? si.GetString() ?? "Requesting Information" : "Requesting Information";
        var aiScore = root.TryGetProperty("aiScore", out var a) && a.TryGetInt32(out var scoreVal) ? Math.Clamp(scoreVal, 0, 20) : 0;
        var justification = root.TryGetProperty("justification", out var j) ? j.GetString() ?? "" : "";
        if (justification.Length > 120) justification = justification[..120];

        return new ConversationToneAnalysis(aiScore, toneLabel, buyingReadiness, semanticIntent, justification);
    }

    private async Task<List<NormalizedInteraction>> LoadLeadActivitiesAsync(Lead lead, CancellationToken cancellationToken)
    {
        var activities = await _dbContext.Activities
            .AsNoTracking()
            .Where(a =>
                !a.IsDeleted &&
                a.TenantId == lead.TenantId &&
                a.RelatedEntityType == ActivityRelationType.Lead &&
                a.RelatedEntityId == lead.Id)
            .Select(a => new
            {
                a.Type,
                a.Subject,
                a.Description,
                a.Outcome,
                a.CompletedDateUtc,
                a.DueDateUtc,
                a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        return activities
            .Select(activity =>
            {
                var occurredAtUtc = activity.CompletedDateUtc ?? activity.DueDateUtc ?? activity.CreatedAtUtc;
                var text = string.Join(
                    "\n",
                    new[]
                    {
                        activity.Subject,
                        activity.Description,
                        activity.Outcome
                    }.Where(value => !string.IsNullOrWhiteSpace(value)));

                var direction = activity.Type == ActivityType.Email
                    ? InteractionDirection.Outbound
                    : activity.Type is ActivityType.Call or ActivityType.Meeting
                        ? InteractionDirection.Bidirectional
                        : InteractionDirection.Outbound;

                return new NormalizedInteraction(
                    occurredAtUtc,
                    direction,
                    activity.Type.ToString(),
                    null,
                    text);
            })
            .ToList();
    }

    private async Task<List<NormalizedInteraction>> LoadLeadEmailLogsAsync(Lead lead, CancellationToken cancellationToken)
    {
        var emailLogs = await _dbContext.EmailLogs
            .AsNoTracking()
            .Where(e =>
                !e.IsDeleted &&
                e.TenantId == lead.TenantId &&
                e.RelatedEntityType == EmailRelationType.Lead &&
                e.RelatedEntityId == lead.Id)
            .Select(e => new
            {
                e.ToEmail,
                e.Subject,
                e.HtmlBody,
                e.TextBody,
                e.CreatedAtUtc,
                e.SentAtUtc,
                e.OpenedAtUtc,
                e.ClickedAtUtc
            })
            .ToListAsync(cancellationToken);

        return emailLogs
            .Select(email => new NormalizedInteraction(
                email.ClickedAtUtc ?? email.OpenedAtUtc ?? email.SentAtUtc ?? email.CreatedAtUtc,
                InteractionDirection.Outbound,
                "EmailLog",
                email.ToEmail,
                string.Join(
                    "\n",
                    new[]
                    {
                        email.Subject,
                        email.TextBody,
                        StripHtml(email.HtmlBody)
                    }.Where(value => !string.IsNullOrWhiteSpace(value)))))
            .ToList();
    }

    private async Task<List<NormalizedInteraction>> LoadMailboxMessagesAsync(Lead lead, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(lead.Email))
        {
            return [];
        }

        var email = lead.Email.Trim().ToLowerInvariant();
        var messages = await _dbContext.UserMailMessages
            .AsNoTracking()
            .Where(m =>
                !m.IsDeleted &&
                m.TenantId == lead.TenantId &&
                (
                    (m.FromEmail != null && m.FromEmail.ToLower() == email) ||
                    m.ToRecipientsJson.ToLower().Contains(email) ||
                    (m.CcRecipientsJson != null && m.CcRecipientsJson.ToLower().Contains(email)) ||
                    (m.BccRecipientsJson != null && m.BccRecipientsJson.ToLower().Contains(email))
                ))
            .Select(m => new
            {
                m.FromEmail,
                m.ToRecipientsJson,
                m.CcRecipientsJson,
                m.BccRecipientsJson,
                m.Subject,
                m.BodyPreview,
                m.BodyText,
                m.BodyHtml,
                m.ReceivedAtUtc,
                m.SentAtUtc
            })
            .ToListAsync(cancellationToken);

        var interactions = new List<NormalizedInteraction>();
        foreach (var message in messages)
        {
            var recipients = ParseRecipients(message.ToRecipientsJson)
                .Concat(ParseRecipients(message.CcRecipientsJson))
                .Concat(ParseRecipients(message.BccRecipientsJson))
                .Distinct(StringComparer.OrdinalIgnoreCase)
                .ToList();

            var from = (message.FromEmail ?? string.Empty).Trim().ToLowerInvariant();
            var toLead = recipients.Contains(email, StringComparer.OrdinalIgnoreCase);

            InteractionDirection direction;
            string? counterparty;
            if (from == email)
            {
                direction = InteractionDirection.Inbound;
                counterparty = recipients.FirstOrDefault(value => !string.Equals(value, email, StringComparison.OrdinalIgnoreCase));
            }
            else if (toLead)
            {
                direction = InteractionDirection.Outbound;
                counterparty = from;
            }
            else
            {
                continue;
            }

            interactions.Add(new NormalizedInteraction(
                message.ReceivedAtUtc != default ? message.ReceivedAtUtc : (message.SentAtUtc ?? DateTime.UtcNow),
                direction,
                "Mailbox",
                counterparty,
                string.Join(
                    "\n",
                    new[]
                    {
                        message.Subject,
                        message.BodyPreview,
                        message.BodyText,
                        StripHtml(message.BodyHtml)
                    }.Where(value => !string.IsNullOrWhiteSpace(value)))));
        }

        return interactions;
    }

    private static IReadOnlyList<string> BuildReasons(
        DateTime latestInteractionAt,
        DateTime now,
        int last30Days,
        int inboundCount,
        int outboundCount,
        int stakeholders,
        IReadOnlyList<string> signalCategories)
    {
        var reasons = new List<string>();

        if (latestInteractionAt >= now.AddDays(-7))
        {
            reasons.Add("Recent engagement was recorded in the last 7 days.");
        }
        else if (latestInteractionAt < now.AddDays(-21))
        {
            reasons.Add("Conversation has stalled for more than 21 days.");
        }
        else
        {
            reasons.Add("Engagement exists, but it is aging and should be refreshed.");
        }

        if (last30Days >= 6)
        {
            reasons.Add("Conversation volume is strong over the last 30 days.");
        }
        else if (last30Days <= 1)
        {
            reasons.Add("Very few touches exist in the last 30 days.");
        }

        if (inboundCount > 0 && outboundCount > 0)
        {
            reasons.Add("Bidirectional engagement is visible across email or activity history.");
        }
        else if (outboundCount > 0)
        {
            reasons.Add("Only outbound activity is visible so far; no reply signal is captured.");
        }

        if (stakeholders >= 2)
        {
            reasons.Add("Multiple stakeholders are visible in the conversation record.");
        }
        else if (stakeholders == 1)
        {
            reasons.Add("Only one stakeholder is visible in the conversation record.");
        }

        if (signalCategories.Count > 0)
        {
            reasons.Add($"Buyer signals detected: {string.Join(", ", signalCategories.Take(3))}.");
        }
        else
        {
            reasons.Add("No budget, timeline, pain, or buyer signals were found in the conversation evidence.");
        }

        return reasons
            .Where(reason => !string.IsNullOrWhiteSpace(reason))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .Take(5)
            .ToList();
    }

    private static IReadOnlyList<string> DetectSignalCategories(string? text)
    {
        if (string.IsNullOrWhiteSpace(text))
        {
            return [];
        }

        var normalized = text.ToLowerInvariant();
        var categories = new List<string>();

        if (ContainsAny(normalized, "budget", "funding", "approved spend", "pricing", "cost"))
        {
            categories.Add("budget");
        }

        if (ContainsAny(normalized, "timeline", "deadline", "go-live", "quarter", "month", "launch", "q1", "q2", "q3", "q4"))
        {
            categories.Add("timeline");
        }

        if (ContainsAny(normalized, "pain", "problem", "issue", "blocked", "challenge", "friction", "urgent"))
        {
            categories.Add("pain");
        }

        if (ContainsAny(normalized, "buyer", "decision maker", "decision-maker", "director", "vp", "cfo", "ceo", "procurement", "approver"))
        {
            categories.Add("buyer");
        }

        return categories;
    }

    private static bool ContainsAny(string text, params string[] patterns)
    {
        return patterns.Any(text.Contains);
    }

    private static IEnumerable<string> ParseRecipients(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return [];
        }

        try
        {
            return (JsonSerializer.Deserialize<List<MailRecipient>>(json, JsonOptions) ?? [])
                .Select(recipient => recipient.Email?.Trim().ToLowerInvariant())
                .Where(value => !string.IsNullOrWhiteSpace(value))!
                .Cast<string>()
                .ToList();
        }
        catch (JsonException)
        {
            return [];
        }
    }

    private static string? StripHtml(string? html)
    {
        if (string.IsNullOrWhiteSpace(html))
        {
            return null;
        }

        return System.Text.RegularExpressions.Regex.Replace(html, "<.*?>", " ").Trim();
    }

    private sealed record MailRecipient(string? Email, string? Name);

    private sealed record NormalizedInteraction(
        DateTime OccurredAtUtc,
        InteractionDirection Direction,
        string Source,
        string? Counterparty,
        string Text);

    private enum InteractionDirection
    {
        Outbound,
        Inbound,
        Bidirectional
    }
}
