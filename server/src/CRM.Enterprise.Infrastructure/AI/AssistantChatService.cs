using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CRM.Enterprise.Infrastructure.AI;

public sealed class AssistantChatService : IAssistantChatService
{
    private static readonly TimeSpan MinRequestInterval = TimeSpan.FromSeconds(10);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly FoundryAgentClient _client;
    private readonly AzureSearchKnowledgeClient _knowledgeClient;
    private readonly bool _isDevelopment;

    public AssistantChatService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        FoundryAgentClient client,
        AzureSearchKnowledgeClient knowledgeClient,
        IHostEnvironment hostEnvironment)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _client = client;
        _knowledgeClient = knowledgeClient;
        _isDevelopment = hostEnvironment.IsDevelopment();
    }

    public async Task<IReadOnlyList<AssistantChatMessage>> GetHistoryAsync(
        Guid userId,
        CancellationToken cancellationToken,
        int take = 50)
    {
        var tenantId = _tenantProvider.TenantId;
        var messages = await _dbContext.AssistantMessages
            .AsNoTracking()
            .Where(m => m.TenantId == tenantId && m.UserId == userId && !m.IsDeleted)
            .OrderByDescending(m => m.CreatedAtUtc)
            .Take(Math.Clamp(take, 1, 200))
            .Select(m => new AssistantChatMessage(m.Id, m.Role, m.Content, m.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        messages.Reverse();
        return messages;
    }

    public async Task<AssistantChatResult> SendAsync(Guid userId, string message, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var normalized = message.Trim();
        if (string.IsNullOrWhiteSpace(normalized))
        {
            throw new InvalidOperationException("Message cannot be empty.");
        }

        var lastMessageAt = await _dbContext.AssistantMessages
            .AsNoTracking()
            .Where(m => m.TenantId == tenantId && m.UserId == userId && !m.IsDeleted)
            .OrderByDescending(m => m.CreatedAtUtc)
            .Select(m => (DateTime?)m.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);

        if (lastMessageAt.HasValue)
        {
            var elapsed = DateTime.UtcNow - lastMessageAt.Value;
            if (elapsed < MinRequestInterval)
            {
                var waitSeconds = (int)Math.Ceiling((MinRequestInterval - elapsed).TotalSeconds);
                throw new AssistantRateLimitException(Math.Max(waitSeconds, 1));
            }
        }

        if (!_client.IsConfigured)
        {
            if (!_isDevelopment)
            {
                throw new InvalidOperationException("Foundry agent is not configured.");
            }

            var devReply =
                "Dev mode: the Foundry agent is not configured, so this is a local response. " +
                "Set FoundryAgent settings to enable real replies.";

            var devUserMessage = new AssistantMessage
            {
                TenantId = tenantId,
                UserId = userId,
                Role = "user",
                Content = normalized,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            var devAssistantMessage = new AssistantMessage
            {
                TenantId = tenantId,
                UserId = userId,
                Role = "assistant",
                Content = devReply,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            _dbContext.AssistantMessages.AddRange(devUserMessage, devAssistantMessage);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var devHistory = await GetHistoryAsync(userId, cancellationToken, 50);
            return new AssistantChatResult(devReply, devHistory);
        }

        var thread = await _dbContext.AssistantThreads
            .FirstOrDefaultAsync(t => t.TenantId == tenantId && t.UserId == userId && !t.IsDeleted, cancellationToken);

        if (thread is null)
        {
            thread = new AssistantThread
            {
                TenantId = tenantId,
                UserId = userId,
                ThreadId = await _client.CreateThreadAsync(cancellationToken),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "system"
            };

            _dbContext.AssistantThreads.Add(thread);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var groundedMessage = await BuildGroundedPromptAsync(userId, normalized, cancellationToken);
        await _client.AddMessageAsync(thread.ThreadId, "user", groundedMessage, cancellationToken);
        string reply;
        try
        {
            reply = await _client.RunAndGetReplyAsync(thread.ThreadId, cancellationToken);
        }
        catch (InvalidOperationException ex) when (TryParseRetryAfter(ex.Message, out var retryAfterSeconds))
        {
            throw new AssistantRateLimitException(retryAfterSeconds);
        }

        var userMessage = new AssistantMessage
        {
            TenantId = tenantId,
            UserId = userId,
            Role = "user",
            Content = normalized,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "system"
        };

        var assistantMessage = new AssistantMessage
        {
            TenantId = tenantId,
            UserId = userId,
            Role = "assistant",
            Content = reply,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "system"
        };

        _dbContext.AssistantMessages.AddRange(userMessage, assistantMessage);
        thread.UpdatedAtUtc = DateTime.UtcNow;
        thread.UpdatedBy = "system";
        await _dbContext.SaveChangesAsync(cancellationToken);

        var history = await GetHistoryAsync(userId, cancellationToken, 50);
        return new AssistantChatResult(reply, history);
    }

    private async Task<string> BuildGroundedPromptAsync(Guid userId, string userQuestion, CancellationToken cancellationToken)
    {
        var executionSnapshot = await BuildExecutionSnapshotAsync(userId, cancellationToken);

        if (!_knowledgeClient.IsConfigured)
        {
            return BuildStructuredPrompt(userQuestion, executionSnapshot, Array.Empty<KnowledgeSearchDocument>());
        }

        IReadOnlyList<KnowledgeSearchDocument> documents;
        try
        {
            documents = await _knowledgeClient.SearchAsync(userQuestion, cancellationToken);
        }
        catch
        {
            return BuildStructuredPrompt(userQuestion, executionSnapshot, Array.Empty<KnowledgeSearchDocument>());
        }

        return BuildStructuredPrompt(userQuestion, executionSnapshot, documents);
    }

    private async Task<AssistantExecutionSnapshot> BuildExecutionSnapshotAsync(Guid userId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var nowUtc = DateTime.UtcNow;
        var staleCutoff = nowUtc.AddDays(-7);

        var overdueActivities = await _dbContext.Activities
            .AsNoTracking()
            .Where(activity => activity.TenantId == tenantId
                && !activity.IsDeleted
                && activity.OwnerId == userId
                && activity.CompletedDateUtc == null
                && activity.DueDateUtc != null
                && activity.DueDateUtc < nowUtc)
            .CountAsync(cancellationToken);

        var leadSlaBreaches = await _dbContext.Leads
            .AsNoTracking()
            .Where(lead => lead.TenantId == tenantId
                && !lead.IsDeleted
                && lead.OwnerId == userId
                && lead.FirstTouchedAtUtc == null
                && lead.FirstTouchDueAtUtc != null
                && lead.FirstTouchDueAtUtc < nowUtc)
            .CountAsync(cancellationToken);

        var lowConfidenceLeads = await _dbContext.Leads
            .AsNoTracking()
            .Where(lead => lead.TenantId == tenantId
                && !lead.IsDeleted
                && lead.OwnerId == userId
                && lead.ConvertedAtUtc == null
                && (lead.AiConfidence == null || lead.AiConfidence < 0.65m))
            .CountAsync(cancellationToken);

        var openOpportunities = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(opportunity => opportunity.TenantId == tenantId
                && !opportunity.IsDeleted
                && opportunity.OwnerId == userId
                && !opportunity.IsClosed)
            .Select(opportunity => new { opportunity.Id, opportunity.Name })
            .ToListAsync(cancellationToken);

        var openOpportunityIds = openOpportunities.Select(opportunity => opportunity.Id).ToList();
        var opportunitiesWithoutRecentActivity = 0;
        var topAtRiskOpportunityNames = Array.Empty<string>();

        if (openOpportunityIds.Count > 0)
        {
            var recentActivityIds = await _dbContext.Activities
                .AsNoTracking()
                .Where(activity => activity.TenantId == tenantId
                    && !activity.IsDeleted
                    && activity.RelatedEntityType == ActivityRelationType.Opportunity
                    && openOpportunityIds.Contains(activity.RelatedEntityId)
                    && (activity.CompletedDateUtc ?? activity.CreatedAtUtc) >= staleCutoff)
                .Select(activity => activity.RelatedEntityId)
                .Distinct()
                .ToListAsync(cancellationToken);

            var staleOpportunities = openOpportunities
                .Where(opportunity => !recentActivityIds.Contains(opportunity.Id))
                .Select(opportunity => opportunity.Name)
                .Where(name => !string.IsNullOrWhiteSpace(name))
                .Take(3)
                .ToArray();

            opportunitiesWithoutRecentActivity = openOpportunities.Count - recentActivityIds.Count;
            topAtRiskOpportunityNames = staleOpportunities;
        }

        var pendingApprovals = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => approval.TenantId == tenantId
                && !approval.IsDeleted
                && approval.Status == "Pending"
                && (approval.RequestedByUserId == userId || approval.ApproverUserId == userId))
            .CountAsync(cancellationToken);

        return new AssistantExecutionSnapshot(
            OverdueActivities: overdueActivities,
            LeadSlaBreaches: leadSlaBreaches,
            OpenOpportunitiesWithoutRecentActivity: Math.Max(opportunitiesWithoutRecentActivity, 0),
            LowConfidenceLeads: lowConfidenceLeads,
            PendingApprovals: pendingApprovals,
            TopAtRiskOpportunityNames: topAtRiskOpportunityNames);
    }

    private static string BuildStructuredPrompt(
        string userQuestion,
        AssistantExecutionSnapshot executionSnapshot,
        IReadOnlyList<KnowledgeSearchDocument> documents)
    {
        var builder = new StringBuilder();
        builder.AppendLine("Grounding policy: answer using CURRENT CRM knowledge only.");
        builder.AppendLine("If answer is not in the sources below, say it is not available in current CRM policy.");
        builder.AppendLine("Cite used sources like [1], [2] using the provided source list.");
        builder.AppendLine("Response style policy: provide clear sections, concise details, and actionable bullets.");
        builder.AppendLine("Output format policy (always follow):");
        builder.AppendLine("1) Situation Summary (2-4 lines).");
        builder.AppendLine("2) Priority Actions (numbered list, each action includes owner + due window).");
        builder.AppendLine("3) Risks / Blockers (bulleted list).");
        builder.AppendLine("4) Sources Used (list citations like [1], [2]).");
        builder.AppendLine();
        builder.AppendLine("Execution snapshot for this user:");
        builder.AppendLine($"- Overdue activities: {executionSnapshot.OverdueActivities}");
        builder.AppendLine($"- Lead SLA breaches: {executionSnapshot.LeadSlaBreaches}");
        builder.AppendLine($"- Open opportunities without recent activity (7d): {executionSnapshot.OpenOpportunitiesWithoutRecentActivity}");
        builder.AppendLine($"- Low-confidence active leads: {executionSnapshot.LowConfidenceLeads}");
        builder.AppendLine($"- Pending approvals in queue: {executionSnapshot.PendingApprovals}");
        if (executionSnapshot.TopAtRiskOpportunityNames.Length > 0)
        {
            builder.AppendLine($"- At-risk opportunities (sample): {string.Join(", ", executionSnapshot.TopAtRiskOpportunityNames)}");
        }
        builder.AppendLine();
        builder.AppendLine("User question:");
        builder.AppendLine(userQuestion);
        builder.AppendLine();
        builder.AppendLine("Retrieved knowledge sources:");

        if (documents.Count == 0)
        {
            builder.AppendLine("- No retrieved knowledge snippets for this query.");
        }

        for (var i = 0; i < documents.Count; i++)
        {
            var doc = documents[i];
            var ordinal = i + 1;
            builder.AppendLine($"[{ordinal}] {doc.Title} | module={doc.Module} | version={doc.Version} | path={doc.Path}");
            builder.AppendLine(doc.Content);
            builder.AppendLine();
        }

        return builder.ToString().Trim();
    }

    private sealed record AssistantExecutionSnapshot(
        int OverdueActivities,
        int LeadSlaBreaches,
        int OpenOpportunitiesWithoutRecentActivity,
        int LowConfidenceLeads,
        int PendingApprovals,
        string[] TopAtRiskOpportunityNames);

    private static bool TryParseRetryAfter(string? message, out int retryAfterSeconds)
    {
        retryAfterSeconds = 0;
        if (string.IsNullOrWhiteSpace(message))
        {
            return false;
        }

        if (!message.Contains("rate_limit", StringComparison.OrdinalIgnoreCase)
            && !message.Contains("rate limit", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        var match = System.Text.RegularExpressions.Regex.Match(
            message,
            @"retry after\s+(\d+)\s+seconds",
            System.Text.RegularExpressions.RegexOptions.IgnoreCase);

        if (match.Success && int.TryParse(match.Groups[1].Value, out var parsed))
        {
            retryAfterSeconds = Math.Max(parsed, 1);
            return true;
        }

        retryAfterSeconds = 10;
        return true;
    }
}
