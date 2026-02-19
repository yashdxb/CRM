using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
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
    private static readonly TimeSpan UndoWindow = TimeSpan.FromSeconds(60);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly FoundryAgentClient _client;
    private readonly AzureSearchKnowledgeClient _knowledgeClient;
    private readonly IAuditEventService _auditEvents;
    private readonly IOpportunityApprovalService _opportunityApprovalService;
    private readonly bool _isDevelopment;

    public AssistantChatService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        FoundryAgentClient client,
        AzureSearchKnowledgeClient knowledgeClient,
        IAuditEventService auditEvents,
        IOpportunityApprovalService opportunityApprovalService,
        IHostEnvironment hostEnvironment)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _client = client;
        _knowledgeClient = knowledgeClient;
        _auditEvents = auditEvents;
        _opportunityApprovalService = opportunityApprovalService;
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

    public async Task<AssistantInsightsResult> GetInsightsAsync(Guid userId, CancellationToken cancellationToken)
    {
        var snapshot = await BuildExecutionSnapshotAsync(userId, cancellationToken);
        var kpis = new List<AssistantInsightsKpi>
        {
            new("at-risk-deals", "At-Risk Deals", snapshot.OpenOpportunitiesWithoutRecentActivity, snapshot.OpenOpportunitiesWithoutRecentActivity > 0 ? "danger" : "ok"),
            new("sla-breaches", "Lead SLA Breaches", snapshot.LeadSlaBreaches, snapshot.LeadSlaBreaches > 0 ? "danger" : "ok"),
            new("pending-approvals", "Pending Approvals", snapshot.PendingApprovals, snapshot.PendingApprovals > 0 ? "warn" : "ok")
        };

        var actions = BuildPriorityActions(snapshot);
        return new AssistantInsightsResult(snapshot.Scope, kpis, actions, DateTime.UtcNow);
    }

    public async Task<AssistantActionExecutionResult> ExecuteActionAsync(
        Guid userId,
        AssistantActionExecutionRequest request,
        CancellationToken cancellationToken)
    {
        var riskTier = NormalizeRiskTier(request.RiskTier, request.ActionType);
        var confidenceGate = await RequiresConfidenceReviewAsync(request.EntityType, request.EntityId, cancellationToken);
        if (confidenceGate)
        {
            await TrackAssistantActionAuditAsync(
                userId,
                request.ActionType,
                "review_required_confidence",
                request.EntityId,
                cancellationToken,
                request.Note);
            return new AssistantActionExecutionResult(
                "ReviewRequired",
                "This action requires review because confidence is below threshold.",
                true,
                null,
                null);
        }

        if (!string.Equals(riskTier, "low", StringComparison.OrdinalIgnoreCase))
        {
            await TrackAssistantActionAuditAsync(userId, request.ActionType, "review_required", request.EntityId, cancellationToken, request.Note);
            return new AssistantActionExecutionResult(
                "ReviewRequired",
                "This action requires review before execution.",
                true,
                null,
                null);
        }

        return await ExecuteApprovedActionAsync(
            userId,
            request.ActionId,
            request.ActionType,
            riskTier,
            request.EntityType,
            request.EntityId,
            request.Note,
            cancellationToken);
    }

    public async Task<AssistantActionExecutionResult> UndoActionAsync(
        Guid userId,
        AssistantActionUndoRequest request,
        CancellationToken cancellationToken)
    {
        var activity = await _dbContext.Activities
            .FirstOrDefaultAsync(activity =>
                activity.TenantId == _tenantProvider.TenantId
                && !activity.IsDeleted
                && activity.Id == request.CreatedActivityId,
                cancellationToken);

        if (activity is null)
        {
            await TrackAssistantActionAuditAsync(userId, request.ActionType ?? "undo", "undo_not_found", request.CreatedActivityId, cancellationToken, null);
            return new AssistantActionExecutionResult("UndoFailed", "The action can no longer be undone.", false, null, null);
        }

        if (activity.OwnerId != userId || !string.Equals(activity.CreatedBy, "assistant", StringComparison.OrdinalIgnoreCase))
        {
            await TrackAssistantActionAuditAsync(userId, request.ActionType ?? "undo", "undo_forbidden", request.CreatedActivityId, cancellationToken, null);
            return new AssistantActionExecutionResult("UndoFailed", "You are not allowed to undo this action.", false, null, null);
        }

        if (DateTime.UtcNow - activity.CreatedAtUtc > UndoWindow)
        {
            await TrackAssistantActionAuditAsync(userId, request.ActionType ?? "undo", "undo_expired", request.CreatedActivityId, cancellationToken, null);
            return new AssistantActionExecutionResult("UndoFailed", "Undo window has expired.", false, null, null);
        }

        activity.IsDeleted = true;
        activity.UpdatedAtUtc = DateTime.UtcNow;
        activity.UpdatedBy = "assistant";
        await _dbContext.SaveChangesAsync(cancellationToken);

        await TrackAssistantActionAuditAsync(userId, request.ActionType ?? "undo", "undone", request.CreatedActivityId, cancellationToken, null);
        return new AssistantActionExecutionResult("Undone", "Assistant action has been undone.", false, request.CreatedActivityId, null);
    }

    public async Task<AssistantActionExecutionResult> ReviewActionAsync(
        Guid userId,
        AssistantActionReviewRequest request,
        CancellationToken cancellationToken)
    {
        if (!request.Approved)
        {
            await TrackAssistantActionAuditAsync(userId, request.ActionType, "rejected", request.EntityId, cancellationToken, request.ReviewNote);
            return new AssistantActionExecutionResult(
                "Rejected",
                "Action rejected after review.",
                false,
                null,
                null);
        }

        var riskTier = NormalizeRiskTier(request.RiskTier, request.ActionType);
        return await ExecuteApprovedActionAsync(
            userId,
            request.ActionId,
            request.ActionType,
            riskTier,
            request.EntityType,
            request.EntityId,
            request.ReviewNote,
            cancellationToken);
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
        var visibility = await ResolveVisibilityAsync(userId, cancellationToken);
        var scopedUserIds = visibility.UserIds;

        var activitiesQuery = _dbContext.Activities
            .AsNoTracking()
            .Where(activity => activity.TenantId == tenantId
                && !activity.IsDeleted
                && activity.CompletedDateUtc == null
                && activity.DueDateUtc != null
                && activity.DueDateUtc < nowUtc);
        if (scopedUserIds is not null)
        {
            activitiesQuery = activitiesQuery.Where(activity => scopedUserIds.Contains(activity.OwnerId));
        }
        var overdueActivities = await activitiesQuery.CountAsync(cancellationToken);

        var leadsQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(lead => lead.TenantId == tenantId
                && !lead.IsDeleted
                && lead.FirstTouchedAtUtc == null
                && lead.FirstTouchDueAtUtc != null
                && lead.FirstTouchDueAtUtc < nowUtc);
        if (scopedUserIds is not null)
        {
            leadsQuery = leadsQuery.Where(lead => scopedUserIds.Contains(lead.OwnerId));
        }
        var leadSlaBreaches = await leadsQuery.CountAsync(cancellationToken);
        var leadForFollowUpId = await leadsQuery
            .OrderBy(lead => lead.FirstTouchDueAtUtc)
            .Select(lead => (Guid?)lead.Id)
            .FirstOrDefaultAsync(cancellationToken);

        var lowConfidenceLeadsQuery = _dbContext.Leads
            .AsNoTracking()
            .Where(lead => lead.TenantId == tenantId
                && !lead.IsDeleted
                && lead.ConvertedAtUtc == null
                && (lead.AiConfidence == null || lead.AiConfidence < 0.65m));
        if (scopedUserIds is not null)
        {
            lowConfidenceLeadsQuery = lowConfidenceLeadsQuery.Where(lead => scopedUserIds.Contains(lead.OwnerId));
        }
        var lowConfidenceLeads = await lowConfidenceLeadsQuery.CountAsync(cancellationToken);

        var openOpportunitiesQuery = _dbContext.Opportunities
            .AsNoTracking()
            .Where(opportunity => opportunity.TenantId == tenantId
                && !opportunity.IsDeleted
                && !opportunity.IsClosed);
        if (scopedUserIds is not null)
        {
            openOpportunitiesQuery = openOpportunitiesQuery.Where(opportunity => scopedUserIds.Contains(opportunity.OwnerId));
        }
        var openOpportunities = await openOpportunitiesQuery
            .Select(opportunity => new { opportunity.Id, opportunity.Name })
            .ToListAsync(cancellationToken);

        var openOpportunityIds = openOpportunities.Select(opportunity => opportunity.Id).ToList();
        var opportunitiesWithoutRecentActivity = 0;
        var topAtRiskOpportunityNames = Array.Empty<string>();
        var topAtRiskOpportunityId = (Guid?)null;

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
            topAtRiskOpportunityId = openOpportunities
                .Where(opportunity => !recentActivityIds.Contains(opportunity.Id))
                .Select(opportunity => (Guid?)opportunity.Id)
                .FirstOrDefault();
        }

        var pendingApprovalsQuery = _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(approval => approval.TenantId == tenantId
                && !approval.IsDeleted
                && approval.Status == "Pending");
        if (scopedUserIds is not null)
        {
            pendingApprovalsQuery = pendingApprovalsQuery.Where(approval =>
                (approval.RequestedByUserId.HasValue && scopedUserIds.Contains(approval.RequestedByUserId.Value))
                || (approval.ApproverUserId.HasValue && scopedUserIds.Contains(approval.ApproverUserId.Value)));
        }
        var pendingApprovals = await pendingApprovalsQuery.CountAsync(cancellationToken);

        return new AssistantExecutionSnapshot(
            Scope: visibility.Scope,
            OverdueActivities: overdueActivities,
            LeadSlaBreaches: leadSlaBreaches,
            OpenOpportunitiesWithoutRecentActivity: Math.Max(opportunitiesWithoutRecentActivity, 0),
            LowConfidenceLeads: lowConfidenceLeads,
            PendingApprovals: pendingApprovals,
            TopAtRiskOpportunityNames: topAtRiskOpportunityNames,
            LeadForFollowUpId: leadForFollowUpId,
            TopAtRiskOpportunityId: topAtRiskOpportunityId);
    }

    private static IReadOnlyList<AssistantInsightsAction> BuildPriorityActions(AssistantExecutionSnapshot snapshot)
    {
        var actions = new List<AssistantInsightsAction>();

        if (snapshot.LeadSlaBreaches > 0)
        {
            actions.Add(new AssistantInsightsAction(
                "sla-first-touch",
                "Recover breached first-touch SLAs",
                $"{snapshot.LeadSlaBreaches} lead(s) missed first-touch SLA. Prioritize outreach today.",
                "low",
                "Rep/Owner",
                "Today",
                "lead_follow_up",
                "lead",
                snapshot.LeadForFollowUpId,
                100));
        }

        if (snapshot.OpenOpportunitiesWithoutRecentActivity > 0)
        {
            var topDeals = snapshot.TopAtRiskOpportunityNames.Length > 0
                ? $" Top stale deals: {string.Join(", ", snapshot.TopAtRiskOpportunityNames)}."
                : string.Empty;

            actions.Add(new AssistantInsightsAction(
                "stale-pipeline",
                "Reactivate stale opportunities",
                $"{snapshot.OpenOpportunitiesWithoutRecentActivity} open opportunity(ies) have no recent activity in 7 days.{topDeals}",
                "medium",
                "Rep/Manager",
                "24 hours",
                "opportunity_recovery",
                "opportunity",
                snapshot.TopAtRiskOpportunityId,
                95));
        }

        if (snapshot.PendingApprovals > 0)
        {
            actions.Add(new AssistantInsightsAction(
                "approval-queue",
                "Clear pending approvals",
                $"{snapshot.PendingApprovals} approval request(s) are waiting and may block close progression.",
                "high",
                "Approver",
                "48 hours",
                "approval_follow_up",
                "opportunity",
                null,
                90));
        }

        if (snapshot.LowConfidenceLeads > 0)
        {
            actions.Add(new AssistantInsightsAction(
                "confidence-gaps",
                "Resolve low-confidence lead gaps",
                $"{snapshot.LowConfidenceLeads} active lead(s) have low confidence. Capture missing evidence before advancing.",
                "medium",
                "Rep",
                "This week",
                "lead_qualification",
                "lead",
                snapshot.LeadForFollowUpId,
                80));
        }

        if (snapshot.OverdueActivities > 0)
        {
            actions.Add(new AssistantInsightsAction(
                "overdue-activities",
                "Clear overdue activity backlog",
                $"{snapshot.OverdueActivities} activity item(s) are overdue and require completion or reschedule.",
                "low",
                "Rep/Owner",
                "Today",
                "activity_cleanup",
                "activity",
                null,
                85));
        }

        return actions
            .OrderByDescending(action => action.Priority)
            .ToList();
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
        RoleVisibilityScope Scope,
        int OverdueActivities,
        int LeadSlaBreaches,
        int OpenOpportunitiesWithoutRecentActivity,
        int LowConfidenceLeads,
        int PendingApprovals,
        string[] TopAtRiskOpportunityNames,
        Guid? LeadForFollowUpId,
        Guid? TopAtRiskOpportunityId);

    private async Task<AssistantActionExecutionResult> ExecuteApprovedActionAsync(
        Guid userId,
        string actionId,
        string? actionType,
        string riskTier,
        string? entityType,
        Guid? entityId,
        string? note,
        CancellationToken cancellationToken)
    {
        Guid? createdActivityId = null;
        Guid? createdApprovalId = null;
        var safeActionType = actionType ?? string.Empty;
        var normalizedType = safeActionType.Trim().ToLowerInvariant();

        if (normalizedType == "approval_follow_up" && string.Equals(entityType, "opportunity", StringComparison.OrdinalIgnoreCase) && entityId.HasValue)
        {
            var opportunity = await _dbContext.Opportunities
                .AsNoTracking()
                .Where(opportunity => opportunity.TenantId == _tenantProvider.TenantId && !opportunity.IsDeleted && opportunity.Id == entityId.Value)
                .Select(opportunity => new { opportunity.Id, opportunity.Amount, opportunity.Currency })
                .FirstOrDefaultAsync(cancellationToken);

            if (opportunity is null)
            {
                await TrackAssistantActionAuditAsync(userId, safeActionType, "failed_not_found", entityId, cancellationToken, note);
                return new AssistantActionExecutionResult("Failed", "Opportunity not found for approval draft.", false, null, null);
            }

            var actor = await ResolveActorAsync(userId, cancellationToken);
            var approvalResult = await _opportunityApprovalService.RequestAsync(
                opportunity.Id,
                opportunity.Amount,
                string.IsNullOrWhiteSpace(opportunity.Currency) ? "USD" : opportunity.Currency,
                "AssistantFollowUp",
                actor,
                cancellationToken);

            if (!approvalResult.Success || approvalResult.Value is null)
            {
                await TrackAssistantActionAuditAsync(userId, safeActionType, "failed", entityId, cancellationToken, approvalResult.Error ?? note);
                return new AssistantActionExecutionResult("Failed", approvalResult.Error ?? "Unable to create approval draft.", false, null, null);
            }

            createdApprovalId = approvalResult.Value.Id;
        }
        else if (entityId.HasValue)
        {
            createdActivityId = await TryCreateTaskActivityAsync(userId, safeActionType, entityType, entityId.Value, note, cancellationToken);
        }

        await TrackAssistantActionAuditAsync(
            userId,
            safeActionType,
            "executed",
            entityId,
            cancellationToken,
            $"actionId={actionId}; riskTier={riskTier}; note={note}");

        return new AssistantActionExecutionResult(
            "Executed",
            "Action executed successfully.",
            false,
            createdActivityId,
            createdApprovalId);
    }

    private async Task<Guid?> TryCreateTaskActivityAsync(
        Guid userId,
        string actionType,
        string? entityType,
        Guid entityId,
        string? note,
        CancellationToken cancellationToken)
    {
        var relationType = ResolveRelationType(entityType);
        if (relationType is null)
        {
            return null;
        }

        var activity = new Activity
        {
            TenantId = _tenantProvider.TenantId,
            OwnerId = userId,
            Subject = BuildTaskSubject(actionType),
            Description = string.IsNullOrWhiteSpace(note) ? "Assistant-generated action task." : note,
            Type = ActivityType.Task,
            RelatedEntityType = relationType.Value,
            RelatedEntityId = entityId,
            Priority = "High",
            DueDateUtc = DateTime.UtcNow.AddDays(1),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "assistant"
        };

        _dbContext.Activities.Add(activity);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return activity.Id;
    }

    private async Task TrackAssistantActionAuditAsync(
        Guid userId,
        string actionType,
        string status,
        Guid? entityId,
        CancellationToken cancellationToken,
        string? detail)
    {
        var actor = await ResolveActorAsync(userId, cancellationToken);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                "AssistantAction",
                entityId ?? Guid.NewGuid(),
                status,
                actionType,
                null,
                detail,
                actor.UserId,
                actor.UserName),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    private async Task<ActorContext> ResolveActorAsync(Guid userId, CancellationToken cancellationToken)
    {
        var displayName = await _dbContext.Users
            .AsNoTracking()
            .Where(user => user.TenantId == _tenantProvider.TenantId && !user.IsDeleted && user.Id == userId)
            .Select(user => user.FullName)
            .FirstOrDefaultAsync(cancellationToken);
        return new ActorContext(userId, displayName);
    }

    private static string BuildTaskSubject(string actionType)
    {
        return actionType switch
        {
            "lead_follow_up" => "Assistant follow-up: recover lead SLA",
            "lead_qualification" => "Assistant follow-up: resolve lead qualification gap",
            "opportunity_recovery" => "Assistant follow-up: reactivate opportunity",
            "activity_cleanup" => "Assistant follow-up: clear overdue activities",
            _ => "Assistant follow-up action"
        };
    }

    private static ActivityRelationType? ResolveRelationType(string? entityType)
    {
        var normalized = (entityType ?? string.Empty).Trim().ToLowerInvariant();
        return normalized switch
        {
            "lead" => ActivityRelationType.Lead,
            "opportunity" => ActivityRelationType.Opportunity,
            "account" => ActivityRelationType.Account,
            "contact" => ActivityRelationType.Contact,
            _ => null
        };
    }

    private static string NormalizeRiskTier(string? riskTier, string? actionType)
    {
        var normalized = (riskTier ?? string.Empty).Trim().ToLowerInvariant();
        if (normalized is "low" or "medium" or "high")
        {
            return normalized;
        }

        var action = (actionType ?? string.Empty).Trim().ToLowerInvariant();
        return action switch
        {
            "lead_follow_up" => "low",
            "activity_cleanup" => "low",
            "opportunity_recovery" => "medium",
            "lead_qualification" => "medium",
            "approval_follow_up" => "high",
            _ => "medium"
        };
    }

    private async Task<bool> RequiresConfidenceReviewAsync(string? entityType, Guid? entityId, CancellationToken cancellationToken)
    {
        if (!string.Equals(entityType, "lead", StringComparison.OrdinalIgnoreCase) || !entityId.HasValue)
        {
            return false;
        }

        var confidence = await _dbContext.Leads
            .AsNoTracking()
            .Where(lead => lead.TenantId == _tenantProvider.TenantId && !lead.IsDeleted && lead.Id == entityId.Value)
            .Select(lead => lead.AiConfidence)
            .FirstOrDefaultAsync(cancellationToken);

        return !confidence.HasValue || confidence.Value < 0.55m;
    }

    private sealed record VisibilityContext(RoleVisibilityScope Scope, IReadOnlyCollection<Guid>? UserIds);

    private async Task<VisibilityContext> ResolveVisibilityAsync(Guid userId, CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        var roleRows = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && ur.UserId == userId)
            .Join(_dbContext.Roles.AsNoTracking().Where(r => !r.IsDeleted && r.TenantId == tenantId),
                ur => ur.RoleId,
                r => r.Id,
                (ur, r) => new { r.Id, r.HierarchyPath, r.VisibilityScope })
            .ToListAsync(cancellationToken);

        if (roleRows.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId });
        }

        var effectiveScope = ResolveVisibilityScope(roleRows.Select(r => r.VisibilityScope));
        if (effectiveScope == RoleVisibilityScope.All)
        {
            return new VisibilityContext(RoleVisibilityScope.All, null);
        }

        if (effectiveScope == RoleVisibilityScope.Self)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId });
        }

        var rolePaths = roleRows
            .Select(r => r.HierarchyPath)
            .Where(path => !string.IsNullOrWhiteSpace(path))
            .Select(path => path!)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var descendantRoleIds = new HashSet<Guid>();
        if (rolePaths.Count > 0)
        {
            var tenantRoles = await _dbContext.Roles
                .AsNoTracking()
                .Where(r => !r.IsDeleted && r.TenantId == tenantId && r.HierarchyPath != null)
                .Select(r => new { r.Id, r.HierarchyPath })
                .ToListAsync(cancellationToken);

            foreach (var role in tenantRoles)
            {
                if (role.HierarchyPath is null)
                {
                    continue;
                }

                if (rolePaths.Any(path => role.HierarchyPath.StartsWith(path, StringComparison.OrdinalIgnoreCase)))
                {
                    descendantRoleIds.Add(role.Id);
                }
            }
        }
        else
        {
            foreach (var role in roleRows)
            {
                descendantRoleIds.Add(role.Id);
            }
        }

        if (descendantRoleIds.Count == 0)
        {
            return new VisibilityContext(RoleVisibilityScope.Self, new[] { userId });
        }

        var teamUserIds = await _dbContext.UserRoles
            .AsNoTracking()
            .Where(ur => !ur.IsDeleted && descendantRoleIds.Contains(ur.RoleId))
            .Select(ur => ur.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (!teamUserIds.Contains(userId))
        {
            teamUserIds.Add(userId);
        }

        return new VisibilityContext(RoleVisibilityScope.Team, teamUserIds);
    }

    private static RoleVisibilityScope ResolveVisibilityScope(IEnumerable<RoleVisibilityScope> scopes)
    {
        var scopeList = scopes.ToList();
        if (scopeList.Any(scope => scope == RoleVisibilityScope.All))
        {
            return RoleVisibilityScope.All;
        }

        if (scopeList.Any(scope => scope == RoleVisibilityScope.Team))
        {
            return RoleVisibilityScope.Team;
        }

        return RoleVisibilityScope.Self;
    }

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
