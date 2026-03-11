using System.Text.RegularExpressions;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed partial class LeadInteractionSummaryService : ILeadInteractionSummaryService
{
    private readonly CrmDbContext _db;

    public LeadInteractionSummaryService(CrmDbContext db) => _db = db;

    public async Task<LeadInteractionSummary> GetSummaryAsync(Guid leadId, Guid tenantId, CancellationToken ct = default)
    {
        // 1. Outbound emails (CRM → lead) via EmailLog
        var emailLogs = await _db.EmailLogs
            .AsNoTracking()
            .Where(e => !e.IsDeleted
                        && e.TenantId == tenantId
                        && e.RelatedEntityType == EmailRelationType.Lead
                        && e.RelatedEntityId == leadId)
            .Select(e => new
            {
                e.Subject,
                e.HtmlBody,
                e.SentAtUtc,
                e.OpenedAtUtc,
                e.ClickedAtUtc
            })
            .ToListAsync(ct);

        int outbound = emailLogs.Count;
        int opened = emailLogs.Count(e => e.OpenedAtUtc.HasValue);
        int clicked = emailLogs.Count(e => e.ClickedAtUtc.HasValue);
        DateTime? lastOutbound = emailLogs
            .Where(e => e.SentAtUtc.HasValue)
            .Select(e => e.SentAtUtc)
            .DefaultIfEmpty()
            .Max();

        // 2. Inbound emails (lead → CRM user) via UserMailMessages
        var leadEmail = await _db.Leads
            .AsNoTracking()
            .Where(l => l.Id == leadId && l.TenantId == tenantId)
            .Select(l => l.Email)
            .FirstOrDefaultAsync(ct);

        int inbound = 0;
        DateTime? lastInbound = null;

        if (!string.IsNullOrWhiteSpace(leadEmail))
        {
            var email = leadEmail.ToLowerInvariant();

            var inboundData = await _db.UserMailMessages
                .AsNoTracking()
                .Where(m => m.TenantId == tenantId && m.FromEmail.ToLower() == email)
                .GroupBy(_ => 1)
                .Select(g => new
                {
                    Count = g.Count(),
                    LastDate = g.Max(m => (DateTime?)m.ReceivedAtUtc)
                })
                .FirstOrDefaultAsync(ct);

            if (inboundData is not null)
            {
                inbound = inboundData.Count;
                lastInbound = inboundData.LastDate;
            }
        }

        int total = outbound + inbound;
        decimal openRate = outbound > 0 ? Math.Round((decimal)opened / outbound * 100, 1) : 0;
        decimal clickRate = outbound > 0 ? Math.Round((decimal)clicked / outbound * 100, 1) : 0;
        DateTime? lastEmailAtUtc = lastOutbound > lastInbound ? lastOutbound : (lastInbound ?? lastOutbound);

        // 3. Detect buyer signals from email text
        var outboundText = string.Join(" ",
            emailLogs.Select(e => e.Subject + " " + StripHtml(e.HtmlBody)));

        var allText = outboundText;

        if (!string.IsNullOrWhiteSpace(leadEmail))
        {
            var inboundTexts = await _db.UserMailMessages
                .AsNoTracking()
                .Where(m => m.TenantId == tenantId && m.FromEmail.ToLower() == leadEmail.ToLowerInvariant())
                .Select(m => m.Subject + " " + m.BodyPreview)
                .ToListAsync(ct);

            allText += " " + string.Join(" ", inboundTexts);
        }

        var signals = DetectSignals(allText);

        return new LeadInteractionSummary(total, inbound, outbound, lastEmailAtUtc, openRate, clickRate, signals);
    }

    private static IReadOnlyList<string> DetectSignals(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return Array.Empty<string>();

        var lower = text.ToLowerInvariant();
        var detected = new List<string>();

        var signalGroups = new Dictionary<string, string[]>
        {
            ["Budget"] = ["budget", "invest", "funding", "cost", "price", "pricing", "afford", "allocat"],
            ["Timeline"] = ["timeline", "deadline", "urgent", "asap", "quarter", "by end of", "target date"],
            ["Pain Point"] = ["challenge", "problem", "pain", "frustrat", "struggle", "issue", "bottleneck"],
            ["Buying Intent"] = ["interested", "demo", "trial", "proposal", "quote", "decision", "evaluate", "shortlist", "next step"]
        };

        foreach (var (signal, keywords) in signalGroups)
        {
            if (keywords.Any(k => lower.Contains(k)))
                detected.Add(signal);
        }

        return detected;
    }

    private static string StripHtml(string? html)
    {
        if (string.IsNullOrWhiteSpace(html)) return string.Empty;
        return HtmlTagRegex().Replace(html, " ").Trim();
    }

    [GeneratedRegex("<.*?>")]
    private static partial Regex HtmlTagRegex();
}
