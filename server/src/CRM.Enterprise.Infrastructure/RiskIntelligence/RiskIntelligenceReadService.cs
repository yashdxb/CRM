using CRM.Enterprise.Application.Assistant;
using CRM.Enterprise.Application.Dashboard;
using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.RiskIntelligence;

namespace CRM.Enterprise.Infrastructure.RiskIntelligence;

public sealed class RiskIntelligenceReadService : IRiskIntelligenceReadService
{
    private readonly IDashboardReadService _dashboardReadService;
    private readonly IAssistantChatService _assistantChatService;
    private readonly IDecisionInboxService _decisionInboxService;

    public RiskIntelligenceReadService(
        IDashboardReadService dashboardReadService,
        IAssistantChatService assistantChatService,
        IDecisionInboxService decisionInboxService)
    {
        _dashboardReadService = dashboardReadService;
        _assistantChatService = assistantChatService;
        _decisionInboxService = decisionInboxService;
    }

    public async Task<RiskIntelligenceWorkspaceDto> GetWorkspaceAsync(Guid userId, CancellationToken cancellationToken)
    {
        // These read services share the same scoped DbContext. Running them in parallel
        // triggers EF Core concurrency errors on a single context instance.
        var summary = await _dashboardReadService.GetSummaryAsync(userId, cancellationToken);
        var manager = await _dashboardReadService.GetManagerPipelineHealthAsync(userId, cancellationToken);
        var insights = await _assistantChatService.GetInsightsAsync(userId, cancellationToken);
        var decisions = await _decisionInboxService.GetInboxAsync("Pending", null, currentUserId: null, canApprove: false, canOverride: true, cancellationToken: cancellationToken);
        var nowUtc = DateTime.UtcNow;

        var priorityItems = new List<RiskGuidanceItemDto>();
        priorityItems.AddRange(insights.Actions.Select(MapAssistantAction));
        priorityItems.AddRange(
            manager.ReviewQueue
                .Where(item => !priorityItems.Any(existing =>
                    string.Equals(existing.EntityType, "Opportunity", StringComparison.OrdinalIgnoreCase) &&
                    existing.EntityId == item.Id))
                .Select(item => MapManagerReviewItem(item, nowUtc)));
        priorityItems.AddRange(
            decisions
                .Where(item => ShouldSurfaceDecision(item, nowUtc))
                .Select(item => MapDecisionItem(item, nowUtc)));

        var orderedPriorityItems = priorityItems
            .OrderByDescending(item => UrgencyRank(item.Urgency))
            .ThenByDescending(item => item.Score)
            .ThenBy(item => item.EntityLabel, StringComparer.OrdinalIgnoreCase)
            .ToList();

        var watchlist = BuildWatchlist(summary, manager)
            .OrderByDescending(item => item.Count)
            .ThenBy(item => item.Label, StringComparer.OrdinalIgnoreCase)
            .ToList();

        var responseSummary = new RiskIntelligenceSummaryDto(
            orderedPriorityItems.Count,
            orderedPriorityItems.Count(item => IsUrgency(item.Urgency, "immediate")),
            orderedPriorityItems.Count(item => IsUrgency(item.Urgency, "soon")),
            manager.StuckStageCount + manager.MissingNextStepCount,
            decisions.Count(item => IsDecisionOverdue(item, nowUtc)));

        return new RiskIntelligenceWorkspaceDto(responseSummary, orderedPriorityItems, watchlist, nowUtc);
    }

    private static IEnumerable<RiskWatchlistItemDto> BuildWatchlist(
        DashboardSummaryDto summary,
        ManagerPipelineHealthDto manager)
    {
        foreach (var item in summary.RiskIntelligence)
        {
            yield return new RiskWatchlistItemDto(
                item.Label,
                item.Count,
                item.Severity,
                item.Impact,
                ResolveDashboardRoute(item.Route));
        }

        foreach (var gap in manager.TopTruthGaps)
        {
            yield return new RiskWatchlistItemDto(
                gap.Label,
                gap.Count,
                gap.Count >= 5 ? "high" : "medium",
                "Pipeline health truth gap",
                "/app/deals/pipeline");
        }

        if (manager.StuckStageCount > 0)
        {
            yield return new RiskWatchlistItemDto(
                "Stuck stage deals",
                manager.StuckStageCount,
                "high",
                "Deals have been sitting in the same stage longer than policy allows.",
                "/app/deals/pipeline");
        }

        if (manager.MissingNextStepCount > 0)
        {
            yield return new RiskWatchlistItemDto(
                "Missing next steps",
                manager.MissingNextStepCount,
                "medium",
                "Pipeline hygiene issue likely to delay follow-up and forecast quality.",
                "/app/deals/pipeline");
        }

        if (manager.ApprovalPendingCount > 0)
        {
            yield return new RiskWatchlistItemDto(
                "Pending approvals",
                manager.ApprovalPendingCount,
                "high",
                "Decision Inbox contains pending approval items that can block progression.",
                "/app/decisions/pending-action");
        }
    }

    private static RiskGuidanceItemDto MapAssistantAction(AssistantInsightsAction action)
    {
        var entityLabel = action.Entities
            .Select(entity => entity?.Trim())
            .FirstOrDefault(entity =>
                !string.IsNullOrWhiteSpace(entity) &&
                !entity.Contains(" ID:", StringComparison.OrdinalIgnoreCase));

        entityLabel ??= action.Entities.FirstOrDefault()?.Trim();
        if (string.IsNullOrWhiteSpace(entityLabel))
        {
            entityLabel = action.Title;
        }

        return new RiskGuidanceItemDto(
            $"assistant:{action.Id}",
            InferAssistantRiskType(action),
            ResolveModuleLabel(action.EntityType, action.ActionType),
            action.EntityType,
            action.EntityId,
            entityLabel!,
            string.IsNullOrWhiteSpace(action.OwnerScope) ? "Assigned owner" : action.OwnerScope,
            action.Score,
            NormalizeUrgency(action.Urgency),
            string.IsNullOrWhiteSpace(action.Description) ? action.Title : action.Description,
            string.IsNullOrWhiteSpace(action.ReviewGuidance) ? action.Title : action.ReviewGuidance,
            "assistant-insights",
            ResolveEntityRoute(action.EntityType, action.EntityId, null, action.ActionType),
            action.Reasons.Where(reason => !string.IsNullOrWhiteSpace(reason)).Take(3).ToList());
    }

    private static RiskGuidanceItemDto MapManagerReviewItem(ManagerReviewDealDto item, DateTime nowUtc)
    {
        var evidence = new List<string>();
        if (!string.IsNullOrWhiteSpace(item.Reason))
        {
            evidence.Add(item.Reason);
        }

        if (item.TruthCoverage.HasValue)
        {
            evidence.Add($"Truth coverage {item.TruthCoverage.Value:0}%");
        }

        if (item.TimeToTruthDays.HasValue)
        {
            evidence.Add($"Time to truth {item.TimeToTruthDays.Value:0.#}d");
        }

        if (item.NextStepDueAtUtc.HasValue)
        {
            evidence.Add(item.NextStepDueAtUtc.Value < nowUtc
                ? $"Next step overdue since {item.NextStepDueAtUtc.Value:MMM d}"
                : $"Next step due {item.NextStepDueAtUtc.Value:MMM d}");
        }

        var recommendedAction = item.NextStepDueAtUtc.HasValue && item.NextStepDueAtUtc.Value < nowUtc
            ? "Update the next step and coach the owner before the deal slips further."
            : "Coach the deal owner and close the identified truth gap before the next review.";

        return new RiskGuidanceItemDto(
            $"pipeline-health:{item.Id}",
            "stalled deal",
            "Deals",
            "Opportunity",
            item.Id,
            item.Name,
            string.IsNullOrWhiteSpace(item.OwnerName) ? "Deal owner" : item.OwnerName,
            CalculateManagerReviewScore(item, nowUtc),
            CalculateManagerReviewUrgency(item, nowUtc),
            string.IsNullOrWhiteSpace(item.Reason) ? "Pipeline health flagged this deal for manager review." : item.Reason,
            recommendedAction,
            "pipeline-health",
            $"/app/deals/{item.Id}",
            evidence);
    }

    private static RiskGuidanceItemDto MapDecisionItem(DecisionInboxItemDto item, DateTime nowUtc)
    {
        var evidence = new List<string>();
        if (!string.IsNullOrWhiteSpace(item.PolicyReason))
        {
            evidence.Add(item.PolicyReason);
        }

        if (!string.IsNullOrWhiteSpace(item.BusinessImpactLabel))
        {
            evidence.Add(item.BusinessImpactLabel);
        }

        evidence.Add($"SLA: {item.SlaStatus}");
        evidence.Add($"Age: {Math.Round(item.RequestedAgeHours, 1)}h");

        var decisionLabel = !string.IsNullOrWhiteSpace(item.WorkflowDealName)
            ? item.WorkflowDealName!
            : item.EntityName;

        return new RiskGuidanceItemDto(
            $"decision:{item.Id}",
            IsDecisionOverdue(item, nowUtc) ? "overdue approval" : "approval SLA risk",
            "Decision Inbox",
            "DecisionRequest",
            item.Id,
            decisionLabel,
            item.AssigneeName ?? item.RequestedByName ?? "Decision owner",
            CalculateDecisionScore(item, nowUtc),
            CalculateDecisionUrgency(item, nowUtc),
            string.IsNullOrWhiteSpace(item.PolicyReason)
                ? "Pending decision request requires review."
                : item.PolicyReason,
            IsDecisionOverdue(item, nowUtc)
                ? "Open the Decision Inbox and resolve or escalate this request immediately."
                : "Review the decision request before the SLA slips.",
            "decision-inbox",
            $"/app/decisions/pending-action?selected={item.Id}",
            evidence);
    }

    private static bool ShouldSurfaceDecision(DecisionInboxItemDto item, DateTime nowUtc)
    {
        if (!string.Equals(item.Status, "Pending", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(item.Status, "Submitted", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        return item.IsEscalated ||
               IsDecisionOverdue(item, nowUtc) ||
               string.Equals(item.RiskLevel, "High", StringComparison.OrdinalIgnoreCase) ||
               string.Equals(item.SlaStatus, "Overdue", StringComparison.OrdinalIgnoreCase) ||
               item.RequestedAgeHours >= 24;
    }

    private static bool IsDecisionOverdue(DecisionInboxItemDto item, DateTime nowUtc)
        => item.SlaDueAtUtc.HasValue && item.SlaDueAtUtc.Value < nowUtc;

    private static int CalculateDecisionScore(DecisionInboxItemDto item, DateTime nowUtc)
    {
        var score = 55;
        if (item.IsEscalated)
        {
            score += 20;
        }

        if (IsDecisionOverdue(item, nowUtc))
        {
            score += 20;
        }

        if (string.Equals(item.RiskLevel, "High", StringComparison.OrdinalIgnoreCase))
        {
            score += 10;
        }

        if (item.RequestedAgeHours >= 48)
        {
            score += 10;
        }

        return Math.Min(100, score);
    }

    private static string CalculateDecisionUrgency(DecisionInboxItemDto item, DateTime nowUtc)
    {
        if (item.IsEscalated || IsDecisionOverdue(item, nowUtc))
        {
            return "immediate";
        }

        if (item.SlaDueAtUtc.HasValue && item.SlaDueAtUtc.Value <= nowUtc.AddHours(24))
        {
            return "soon";
        }

        if (item.RequestedAgeHours >= 24)
        {
            return "soon";
        }

        return "planned";
    }

    private static int CalculateManagerReviewScore(ManagerReviewDealDto item, DateTime nowUtc)
    {
        var score = 58;

        if (item.NextStepDueAtUtc.HasValue && item.NextStepDueAtUtc.Value < nowUtc)
        {
            score += 15;
        }

        if (item.LastActivityAtUtc.HasValue && (nowUtc - item.LastActivityAtUtc.Value).TotalDays >= 14)
        {
            score += 12;
        }

        if (item.TruthCoverage.HasValue && item.TruthCoverage.Value < 50)
        {
            score += 10;
        }

        if (item.TimeToTruthDays.HasValue && item.TimeToTruthDays.Value > 7)
        {
            score += 5;
        }

        return Math.Min(100, score);
    }

    private static string CalculateManagerReviewUrgency(ManagerReviewDealDto item, DateTime nowUtc)
    {
        if (item.NextStepDueAtUtc.HasValue && item.NextStepDueAtUtc.Value < nowUtc)
        {
            return "immediate";
        }

        if (item.LastActivityAtUtc.HasValue && (nowUtc - item.LastActivityAtUtc.Value).TotalDays >= 14)
        {
            return "soon";
        }

        return "planned";
    }

    private static string InferAssistantRiskType(AssistantInsightsAction action)
    {
        var actionType = (action.ActionType ?? string.Empty).Trim().ToLowerInvariant();
        if (actionType.Contains("approval"))
        {
            return "approval SLA risk";
        }

        if (actionType.Contains("lead"))
        {
            return "low-confidence lead";
        }

        if (actionType.Contains("activity"))
        {
            return "overdue activity";
        }

        if (actionType.Contains("opportunity") || string.Equals(action.EntityType, "Opportunity", StringComparison.OrdinalIgnoreCase))
        {
            return "stalled deal";
        }

        return "operational risk";
    }

    private static string ResolveEntityRoute(string? entityType, Guid? entityId, string? fallbackRoute = null, string? actionType = null)
    {
        if (!string.IsNullOrWhiteSpace(entityType))
        {
            var normalized = entityType.Trim().ToLowerInvariant();
            if (normalized is "lead" or "leads")
            {
                return entityId.HasValue ? $"/app/leads/{entityId.Value}/edit" : "/app/leads";
            }

            if (normalized is "opportunity" or "opportunities" or "deal" or "deals")
            {
                return entityId.HasValue ? $"/app/deals/{entityId.Value}" : "/app/deals";
            }

            if (normalized is "customer" or "customers" or "account" or "accounts")
            {
                return entityId.HasValue ? $"/app/customers/{entityId.Value}" : "/app/customers";
            }

            if (normalized is "decisionrequest" or "decision" or "approval")
            {
                return entityId.HasValue ? $"/app/decisions/pending-action?selected={entityId.Value}" : "/app/decisions/pending-action";
            }

            if (normalized is "activity" or "activities")
            {
                return entityId.HasValue ? $"/app/activities/{entityId.Value}/edit" : "/app/activities";
            }
        }

        if (!string.IsNullOrWhiteSpace(actionType) &&
            actionType.Trim().Contains("approval", StringComparison.OrdinalIgnoreCase))
        {
            return "/app/decisions/pending-action";
        }

        if (!string.IsNullOrWhiteSpace(fallbackRoute))
        {
            return ResolveDashboardRoute(fallbackRoute);
        }

        return "/app/dashboard";
    }

    private static string ResolveDashboardRoute(string route)
    {
        return (route ?? string.Empty).Trim().ToLowerInvariant() switch
        {
            "leads" => "/app/leads",
            "opportunities" => "/app/deals",
            "dashboard-new-leads" => "/app/leads",
            "dashboard-at-risk" => "/app/deals",
            "dashboard-no-next-step" => "/app/deals/pipeline",
            _ => "/app/dashboard"
        };
    }

    private static string ResolveModuleLabel(string? entityType, string? actionType)
    {
        var normalized = (entityType ?? string.Empty).Trim().ToLowerInvariant();
        if (normalized is "lead" or "leads")
        {
            return "Leads";
        }

        if (normalized is "opportunity" or "opportunities" or "deal" or "deals")
        {
            return "Deals";
        }

        if (normalized is "decisionrequest" or "decision" or "approval")
        {
            return "Decision Inbox";
        }

        if (normalized is "customer" or "customers" or "account" or "accounts")
        {
            return "Customers";
        }

        if (normalized is "activity" or "activities")
        {
            return "Activities";
        }

        if (!string.IsNullOrWhiteSpace(actionType) &&
            actionType.Contains("approval", StringComparison.OrdinalIgnoreCase))
        {
            return "Decision Inbox";
        }

        return "Workspace";
    }

    private static string NormalizeUrgency(string urgency)
        => (urgency ?? string.Empty).Trim().ToLowerInvariant() switch
        {
            "immediate" => "immediate",
            "soon" => "soon",
            _ => "planned"
        };

    private static int UrgencyRank(string urgency)
        => NormalizeUrgency(urgency) switch
        {
            "immediate" => 3,
            "soon" => 2,
            _ => 1
        };

    private static bool IsUrgency(string left, string right)
        => string.Equals(NormalizeUrgency(left), NormalizeUrgency(right), StringComparison.OrdinalIgnoreCase);
}
