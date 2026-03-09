using System.Text.Json;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class LeadConversationScoreService : ILeadConversationScoreService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;

    public LeadConversationScoreService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
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

        var totalScore = recencyScore + frequencyScore + bidirectionalScore + stakeholderScore + signalScore + momentumScore;
        var label = totalScore >= 75
            ? "High"
            : totalScore >= 45
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

        return new LeadConversationScoreSnapshot(
            totalScore,
            label,
            reasons,
            now,
            true);
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
