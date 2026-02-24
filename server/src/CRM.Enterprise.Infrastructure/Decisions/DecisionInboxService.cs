using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Decisions;

// Adapter service that normalizes current opportunity approval inbox items into the generic Decision Inbox contract.
public sealed class DecisionInboxService : IDecisionInboxService
{
    private readonly IOpportunityApprovalService _opportunityApprovalService;
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public DecisionInboxService(
        IOpportunityApprovalService opportunityApprovalService,
        CrmDbContext dbContext,
        ITenantProvider tenantProvider)
    {
        _opportunityApprovalService = opportunityApprovalService;
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<IReadOnlyList<DecisionInboxItemDto>> GetInboxAsync(
        string? status = null,
        string? purpose = null,
        CancellationToken cancellationToken = default)
    {
        var items = await _opportunityApprovalService.GetInboxAsync(status, purpose, cancellationToken);

        return items.Select(item =>
        {
            var currentStepOrder = item.StepOrder <= 0 ? 1 : item.StepOrder;
            var totalSteps = item.TotalSteps <= 0 ? 1 : item.TotalSteps;

            return new DecisionInboxItemDto(
                item.Id,
                item.DecisionType,
                "OpportunityApproval",
                "Opportunity",
                item.OpportunityId,
                item.OpportunityName,
                item.AccountName,
                item.Status,
                item.Purpose,
                item.Priority,
                item.RiskLevel,
                item.SlaStatus,
                item.SlaDueAtUtc,
                item.IsEscalated,
                item.RequestedAgeHours,
                item.PolicyReason,
                item.BusinessImpactLabel,
                item.Amount,
                item.Currency,
                item.RequestedByUserId,
                item.RequestedByName,
                item.ApproverUserId,
                item.ApproverName,
                item.RequestedOn,
                item.DecisionOn,
                item.Notes,
                currentStepOrder,
                totalSteps,
                item.ApproverRole,
                item.ChainStatus,
                Array.Empty<DecisionStepDto>());
        }).ToList();
    }

    public async Task<DecisionInboxItemDto> CreateAsync(
        DecisionCreateRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var nowUtc = DateTime.UtcNow;
        var decision = new DecisionRequest
        {
            Type = string.IsNullOrWhiteSpace(request.DecisionType) ? "Decision" : request.DecisionType.Trim(),
            EntityType = string.IsNullOrWhiteSpace(request.EntityType) ? "Unknown" : request.EntityType.Trim(),
            EntityId = request.EntityId,
            Status = string.IsNullOrWhiteSpace(request.Status) ? "Submitted" : request.Status.Trim(),
            Priority = request.Priority,
            RiskLevel = request.RiskLevel,
            RequestedByUserId = request.RequestedByUserId,
            RequestedOnUtc = request.RequestedOn == default ? nowUtc : request.RequestedOn,
            DueAtUtc = request.SlaDueAtUtc,
            PolicyReason = request.PolicyReason,
            PayloadJson = request.PayloadJson,
            PolicySnapshotJson = request.PolicySnapshotJson,
            CreatedAtUtc = nowUtc,
            CreatedBy = request.RequestedByName
        };

        var steps = (request.Steps ?? Array.Empty<DecisionCreateStepRequestDto>())
            .OrderBy(s => s.StepOrder)
            .Select(s => new DecisionStep
            {
                DecisionRequestId = decision.Id,
                StepOrder = s.StepOrder <= 0 ? 1 : s.StepOrder,
                StepType = string.IsNullOrWhiteSpace(s.StepType) ? "Approval" : s.StepType.Trim(),
                Status = "Pending",
                ApproverRole = s.ApproverRole,
                AssigneeUserId = s.AssigneeUserId,
                AssigneeNameSnapshot = s.AssigneeName,
                DueAtUtc = s.DueAtUtc,
                CreatedAtUtc = nowUtc,
                CreatedBy = request.RequestedByName
            })
            .ToList();

        if (steps.Count == 0)
        {
            steps.Add(new DecisionStep
            {
                DecisionRequestId = decision.Id,
                StepOrder = request.CurrentStepOrder <= 0 ? 1 : request.CurrentStepOrder,
                StepType = "Approval",
                Status = "Pending",
                ApproverRole = request.StepRole,
                AssigneeUserId = request.AssigneeUserId,
                AssigneeNameSnapshot = request.AssigneeName,
                DueAtUtc = request.SlaDueAtUtc,
                CreatedAtUtc = nowUtc,
                CreatedBy = request.RequestedByName
            });
        }

        var action = new DecisionActionLog
        {
            DecisionRequestId = decision.Id,
            Action = "Submitted",
            ActorUserId = request.RequestedByUserId,
            ActorName = request.RequestedByName,
            Notes = request.PolicyReason,
            ActionAtUtc = decision.RequestedOnUtc,
            CreatedAtUtc = nowUtc,
            CreatedBy = request.RequestedByName
        };

        _dbContext.DecisionRequests.Add(decision);
        _dbContext.DecisionSteps.AddRange(steps);
        _dbContext.DecisionActionLogs.Add(action);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new DecisionInboxItemDto(
            decision.Id,
            decision.Type,
            string.IsNullOrWhiteSpace(request.WorkflowType) ? "GenericDecision" : request.WorkflowType.Trim(),
            decision.EntityType,
            decision.EntityId,
            request.EntityName,
            request.ParentEntityName,
            decision.Status,
            request.Purpose,
            request.Priority,
            request.RiskLevel,
            request.SlaStatus,
            request.SlaDueAtUtc,
            false,
            Math.Max(0, (DateTime.UtcNow - decision.RequestedOnUtc).TotalHours),
            request.PolicyReason,
            request.BusinessImpactLabel,
            request.Amount,
            string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency,
            request.RequestedByUserId,
            request.RequestedByName,
            request.AssigneeUserId,
            request.AssigneeName,
            decision.RequestedOnUtc,
            null,
            null,
            request.CurrentStepOrder <= 0 ? 1 : request.CurrentStepOrder,
            request.TotalSteps <= 0 ? steps.Count : request.TotalSteps,
            request.StepRole,
            request.ChainStatus,
            steps.Select(s => new DecisionStepDto(
                s.StepOrder,
                s.StepType,
                s.Status,
                s.ApproverRole,
                s.AssigneeUserId,
                s.AssigneeNameSnapshot,
                s.DueAtUtc,
                s.CompletedAtUtc)).ToList());
    }

    public async Task<DecisionAssistDraftDto> GenerateAssistDraftAsync(
        Guid decisionId,
        CancellationToken cancellationToken = default)
    {
        var item = await ResolveDecisionForAssistAsync(decisionId, cancellationToken)
            ?? throw new KeyNotFoundException("Decision item not found.");

        var missingEvidence = BuildMissingEvidenceHints(item);
        var recommendedAction = RecommendAction(item, missingEvidence);
        var summary = BuildSummary(item, missingEvidence);

        return new DecisionAssistDraftDto(
            item.Id,
            summary,
            recommendedAction,
            BuildApprovalDraft(item, missingEvidence),
            BuildRejectDraft(item, missingEvidence),
            BuildRequestInfoDraft(item, missingEvidence),
            missingEvidence,
            "Assist-only draft. Reviewer remains responsible for the final decision and note.");
    }

    public async Task<DecisionInboxItemDto> DecideAsync(
        Guid decisionId,
        DecisionDecisionRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var actorName = string.IsNullOrWhiteSpace(request.ActorName) ? "system" : request.ActorName!.Trim();
        var nowUtc = DateTime.UtcNow;

        var decision = await _dbContext.DecisionRequests
            .Include(r => r.Steps)
            .Include(r => r.ActionLogs)
            .FirstOrDefaultAsync(r => r.Id == decisionId && !r.IsDeleted, cancellationToken);

        if (decision is null)
        {
            // Compatibility path: treat incoming id as legacy opportunity approval id during cutover.
            return await DecideLegacyApprovalAsync(decisionId, request, cancellationToken);
        }

        if (decision.LegacyApprovalId.HasValue)
        {
            // Source-of-truth is still legacy approval chain for these decisions; generic record is synchronized.
            var legacyUpdated = await DecideLegacyApprovalAsync(decision.LegacyApprovalId.Value, request, cancellationToken);
            var refreshed = await ResolveDecisionForAssistAsync(decision.Id, cancellationToken);
            return refreshed ?? legacyUpdated;
        }

        var normalizedStatus = (decision.Status ?? string.Empty).Trim();
        if (normalizedStatus.Equals("Approved", StringComparison.OrdinalIgnoreCase) ||
            normalizedStatus.Equals("Rejected", StringComparison.OrdinalIgnoreCase) ||
            normalizedStatus.Equals("Cancelled", StringComparison.OrdinalIgnoreCase) ||
            normalizedStatus.Equals("Expired", StringComparison.OrdinalIgnoreCase))
        {
            throw new InvalidOperationException("This decision is already completed.");
        }

        var currentStep = decision.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase))
            ?? decision.Steps
                .Where(s => !s.IsDeleted)
                .OrderBy(s => s.StepOrder)
                .FirstOrDefault(s => !string.Equals(s.Status, "Approved", StringComparison.OrdinalIgnoreCase)
                                  && !string.Equals(s.Status, "Rejected", StringComparison.OrdinalIgnoreCase));

        if (currentStep is null)
        {
            throw new InvalidOperationException("No active decision step is available to complete.");
        }

        currentStep.Status = request.Approved ? "Approved" : "Rejected";
        currentStep.CompletedAtUtc = nowUtc;
        currentStep.Notes = string.IsNullOrWhiteSpace(request.Notes) ? currentStep.Notes : request.Notes!.Trim();
        if (request.ActorUserId.HasValue && !currentStep.AssigneeUserId.HasValue)
        {
            currentStep.AssigneeUserId = request.ActorUserId;
            currentStep.AssigneeNameSnapshot ??= actorName;
        }

        if (!request.Approved)
        {
            decision.Status = "Rejected";
            decision.CompletedAtUtc = nowUtc;
        }
        else
        {
            var pendingAfter = decision.Steps
                .Where(s => !s.IsDeleted && s.Id != currentStep.Id)
                .Any(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

            if (pendingAfter)
            {
                decision.Status = "In Review";
                decision.CompletedAtUtc = null;
            }
            else
            {
                decision.Status = "Approved";
                decision.CompletedAtUtc = nowUtc;
            }
        }

        _dbContext.DecisionActionLogs.Add(new DecisionActionLog
        {
            DecisionRequestId = decision.Id,
            Action = request.Approved ? "Approved" : "Rejected",
            ActorUserId = request.ActorUserId,
            ActorName = actorName,
            Notes = string.IsNullOrWhiteSpace(request.Notes) ? null : request.Notes!.Trim(),
            ActionAtUtc = nowUtc,
            CreatedAtUtc = nowUtc,
            CreatedBy = actorName
        });

        decision.UpdatedAtUtc = nowUtc;
        decision.UpdatedBy = actorName;
        await _dbContext.SaveChangesAsync(cancellationToken);

        return await BuildInboxItemFromDecisionAsync(decision.Id, cancellationToken)
               ?? throw new KeyNotFoundException("Decision item not found after update.");
    }

    public async Task<IReadOnlyList<DecisionHistoryItemDto>> GetHistoryAsync(
        string? action = null,
        string? status = null,
        string? decisionType = null,
        string? search = null,
        int take = 200,
        CancellationToken cancellationToken = default)
    {
        take = Math.Clamp(take, 1, 500);

        var query =
            from log in _dbContext.DecisionActionLogs.AsNoTracking()
            join request in _dbContext.DecisionRequests.AsNoTracking()
                on log.DecisionRequestId equals request.Id
            where !log.IsDeleted && !request.IsDeleted
            select new { log, request };

        if (!string.IsNullOrWhiteSpace(action))
        {
            var actionFilter = action.Trim().ToLower();
            query = query.Where(x => x.log.Action.ToLower() == actionFilter);
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            var statusFilter = status.Trim().ToLower();
            query = query.Where(x => x.request.Status.ToLower() == statusFilter);
        }

        if (!string.IsNullOrWhiteSpace(decisionType))
        {
            var typeFilter = decisionType.Trim().ToLower();
            query = query.Where(x => x.request.Type.ToLower().Contains(typeFilter));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(x =>
                x.request.Type.ToLower().Contains(term) ||
                x.request.EntityType.ToLower().Contains(term) ||
                (x.request.PolicyReason != null && x.request.PolicyReason.ToLower().Contains(term)) ||
                (x.log.ActorName != null && x.log.ActorName.ToLower().Contains(term)) ||
                (x.log.Notes != null && x.log.Notes.ToLower().Contains(term)));
        }

        var rows = await query
            .OrderByDescending(x => x.log.ActionAtUtc)
            .Take(take)
            .Select(x => new DecisionHistoryItemDto(
                x.log.Id,
                x.request.Id,
                x.log.Action,
                x.log.ActionAtUtc,
                x.log.ActorName,
                x.log.ActorUserId,
                x.request.Type,
                x.request.LegacyApprovalId != null ? "OpportunityApproval" : "GenericDecision",
                x.request.EntityType,
                x.request.EntityId,
                x.request.EntityType + " " + x.request.EntityId.ToString(),
                x.request.Status,
                x.request.Priority,
                x.request.RiskLevel,
                x.log.Notes,
                x.request.PolicyReason,
                x.log.Action == "ApprovalSlaEscalated"))
            .ToListAsync(cancellationToken);

        return rows;
    }

    private async Task<DecisionInboxItemDto?> ResolveDecisionForAssistAsync(Guid decisionId, CancellationToken cancellationToken)
    {
        var genericItem = await BuildInboxItemFromDecisionAsync(decisionId, cancellationToken);
        if (genericItem is not null)
        {
            return genericItem;
        }

        var adapterItems = await GetInboxAsync(null, null, cancellationToken);
        return adapterItems.FirstOrDefault(i => i.Id == decisionId);
    }

    private static string DeriveSlaStatus(DateTime? dueAtUtc)
    {
        if (!dueAtUtc.HasValue)
        {
            return "on-track";
        }

        var hours = (dueAtUtc.Value - DateTime.UtcNow).TotalHours;
        if (hours < 0) return "overdue";
        if (hours <= 4) return "at-risk";
        return "on-track";
    }

    private static int ResolveCurrentStepOrder(IReadOnlyList<DecisionStep> steps)
    {
        var pending = steps.FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));
        if (pending is not null)
        {
            return pending.StepOrder <= 0 ? 1 : pending.StepOrder;
        }

        var latest = steps.OrderByDescending(s => s.StepOrder).FirstOrDefault();
        return latest?.StepOrder > 0 ? latest.StepOrder : 1;
    }

    private static IReadOnlyList<string> BuildMissingEvidenceHints(DecisionInboxItemDto item)
    {
        var hints = new List<string>();
        var reason = (item.PolicyReason ?? string.Empty).ToLowerInvariant();
        var purpose = (item.Purpose ?? string.Empty).ToLowerInvariant();

        if (reason.Contains("discount") || purpose.Contains("discount"))
        {
            hints.Add("Business justification tied to value/risk outcome");
            hints.Add("Margin / pricing guardrail impact");
        }

        if (reason.Contains("exception"))
        {
            hints.Add("Exception rationale and compensating controls");
        }

        if (item.SlaStatus.Equals("overdue", StringComparison.OrdinalIgnoreCase))
        {
            hints.Add("Reason for SLA miss and mitigation plan");
        }

        if (item.RiskLevel.Equals("high", StringComparison.OrdinalIgnoreCase))
        {
            hints.Add("Evidence for risk controls and approval conditions");
        }

        if (hints.Count == 0)
        {
            hints.Add("Decision rationale linked to policy and business impact");
        }

        return hints.Distinct(StringComparer.OrdinalIgnoreCase).ToList();
    }

    private static string RecommendAction(DecisionInboxItemDto item, IReadOnlyList<string> missingEvidence)
    {
        if (item.Status != "Pending")
        {
            return "review";
        }

        if (item.SlaStatus.Equals("overdue", StringComparison.OrdinalIgnoreCase))
        {
            return "request_info";
        }

        if (item.RiskLevel.Equals("high", StringComparison.OrdinalIgnoreCase) && missingEvidence.Count > 1)
        {
            return "request_info";
        }

        return "approve";
    }

    private static string BuildSummary(DecisionInboxItemDto item, IReadOnlyList<string> missingEvidence)
    {
        var value = item.Amount > 0 ? $"{item.Currency} {Math.Round(item.Amount, 0):N0}" : item.BusinessImpactLabel;
        return
            $"{item.DecisionType} for {item.EntityName} is {item.Status.ToLowerInvariant()} with {item.RiskLevel.ToLowerInvariant()} risk and {item.SlaStatus.ToLowerInvariant()} SLA status. " +
            $"Policy trigger: {item.PolicyReason}. Impact: {value}. " +
            (missingEvidence.Count > 0 ? $"Key evidence gaps: {string.Join("; ", missingEvidence)}." : "No major evidence gaps detected from current decision metadata.");
    }

    private static string BuildApprovalDraft(DecisionInboxItemDto item, IReadOnlyList<string> missingEvidence)
    {
        var conditions = item.RiskLevel.Equals("high", StringComparison.OrdinalIgnoreCase)
            ? " Approval is conditional on confirming risk controls and documenting exception rationale."
            : string.Empty;

        return
            $"Approved based on {item.PolicyReason?.TrimEnd('.')}. " +
            $"Business impact reviewed ({item.BusinessImpactLabel}); SLA status is {item.SlaStatus}. " +
            $"Current step {item.CurrentStepOrder}/{item.TotalSteps} completed." +
            conditions +
            (missingEvidence.Count > 0 ? $" Follow-up evidence to capture: {missingEvidence[0]}." : string.Empty);
    }

    private static string BuildRejectDraft(DecisionInboxItemDto item, IReadOnlyList<string> missingEvidence)
    {
        var evidenceText = missingEvidence.Count > 0
            ? $"Missing required support: {string.Join("; ", missingEvidence)}. "
            : string.Empty;

        return
            $"Rejected at step {item.CurrentStepOrder}/{item.TotalSteps}. " +
            $"{evidenceText}Policy trigger remains unresolved: {item.PolicyReason}. " +
            "Please resubmit after addressing policy requirements and attaching supporting justification.";
    }

    private static string BuildRequestInfoDraft(DecisionInboxItemDto item, IReadOnlyList<string> missingEvidence)
    {
        return
            $"Requesting additional information before decision. " +
            $"Please provide: {string.Join("; ", missingEvidence)}. " +
            $"This request is currently {item.SlaStatus} and tied to {item.BusinessImpactLabel}.";
    }

    private async Task<DecisionInboxItemDto> DecideLegacyApprovalAsync(
        Guid approvalId,
        DecisionDecisionRequestDto request,
        CancellationToken cancellationToken)
    {
        var result = await _opportunityApprovalService.DecideAsync(
            approvalId,
            request.Approved,
            request.Notes,
            new CRM.Enterprise.Application.Common.ActorContext(request.ActorUserId, request.ActorName),
            cancellationToken);

        if (result.NotFound)
        {
            throw new KeyNotFoundException("Decision item not found.");
        }

        if (!result.Success)
        {
            throw new InvalidOperationException(result.Error ?? "Unable to update decision.");
        }

        var items = await GetInboxAsync(null, null, cancellationToken);
        return items.FirstOrDefault(i => i.Id == approvalId)
               ?? throw new KeyNotFoundException("Decision item not found after update.");
    }

    private async Task<DecisionInboxItemDto?> BuildInboxItemFromDecisionAsync(Guid decisionId, CancellationToken cancellationToken)
    {
        var request = await _dbContext.DecisionRequests
            .AsNoTracking()
            .Include(r => r.Steps)
            .Include(r => r.ActionLogs)
            .FirstOrDefaultAsync(r => r.Id == decisionId && !r.IsDeleted, cancellationToken);

        if (request is null)
        {
            return null;
        }

        var steps = request.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .ToList();

        var ageHours = Math.Max(0, (DateTime.UtcNow - request.RequestedOnUtc).TotalHours);
        var currentStepOrder = ResolveCurrentStepOrder(steps);
        var currentStep = steps.FirstOrDefault(s => s.StepOrder == currentStepOrder);
        var lastDecisionNote = request.ActionLogs
            .Where(a => a.Action is "Approved" or "Rejected")
            .OrderByDescending(a => a.ActionAtUtc)
            .FirstOrDefault()
            ?.Notes;

        var completed = request.Status.Equals("Approved", StringComparison.OrdinalIgnoreCase) ||
                        request.Status.Equals("Rejected", StringComparison.OrdinalIgnoreCase);

        return new DecisionInboxItemDto(
            request.Id,
            request.Type,
            request.LegacyApprovalId.HasValue ? "OpportunityApproval" : "GenericDecision",
            request.EntityType,
            request.EntityId,
            $"{request.EntityType} decision",
            null,
            request.Status,
            "Decision",
            request.Priority ?? "normal",
            request.RiskLevel ?? "low",
            completed ? "completed" : DeriveSlaStatus(request.DueAtUtc),
            request.DueAtUtc,
            request.ActionLogs.Any(a => a.Action == "ApprovalSlaEscalated"),
            ageHours,
            request.PolicyReason ?? "Decision review required.",
            "impact review",
            0m,
            "USD",
            request.RequestedByUserId,
            null,
            currentStep?.AssigneeUserId,
            currentStep?.AssigneeNameSnapshot,
            request.RequestedOnUtc,
            request.CompletedAtUtc,
            lastDecisionNote,
            currentStepOrder,
            Math.Max(1, steps.Count),
            currentStep?.ApproverRole,
            request.Status,
            steps.Select(s => new DecisionStepDto(
                s.StepOrder,
                s.StepType,
                s.Status,
                s.ApproverRole,
                s.AssigneeUserId,
                s.AssigneeNameSnapshot,
                s.DueAtUtc,
                s.CompletedAtUtc)).ToList());
    }
}
