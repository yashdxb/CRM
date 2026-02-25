using CRM.Enterprise.Application.Decisions;
using CRM.Enterprise.Application.Common;
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
        var genericRequests = await _dbContext.DecisionRequests
            .AsNoTracking()
            .Where(r => !r.IsDeleted)
            .OrderByDescending(r => r.RequestedOnUtc)
            .Select(r => new { r.Id, r.LegacyApprovalId })
            .ToListAsync(cancellationToken);

        var genericItems = new List<DecisionInboxItemDto>(genericRequests.Count);
        foreach (var requestRef in genericRequests)
        {
            var item = await BuildInboxItemFromDecisionAsync(requestRef.Id, cancellationToken);
            if (item is not null)
            {
                genericItems.Add(item);
            }
        }

        if (!string.IsNullOrWhiteSpace(status))
        {
            genericItems = genericItems
                .Where(i => string.Equals(i.Status, status, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        if (!string.IsNullOrWhiteSpace(purpose))
        {
            genericItems = genericItems
                .Where(i => string.Equals(i.Purpose, purpose, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        var representedLegacyApprovalIds = genericRequests
            .Where(r => r.LegacyApprovalId.HasValue)
            .Select(r => r.LegacyApprovalId!.Value)
            .ToHashSet();

        var legacyItems = await _opportunityApprovalService.GetInboxAsync(status, purpose, cancellationToken);
        var legacyFallback = legacyItems
            .Where(item => !representedLegacyApprovalIds.Contains(item.Id))
            .Select(MapLegacyInboxItem)
            .ToList();

        return genericItems
            .Concat(legacyFallback)
            .OrderByDescending(i => i.RequestedOn)
            .ToList();
    }

    public async Task<DecisionInboxItemDto> CreateAsync(
        DecisionCreateRequestDto request,
        CancellationToken cancellationToken = default)
    {
        if (string.Equals(request.WorkflowType, "OpportunityApproval", StringComparison.OrdinalIgnoreCase) &&
            string.Equals(request.EntityType, "Opportunity", StringComparison.OrdinalIgnoreCase))
        {
            return await CreateOpportunityApprovalDecisionAsync(request, cancellationToken);
        }

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
            .Select((s, index) => new DecisionStep
            {
                DecisionRequestId = decision.Id,
                StepOrder = s.StepOrder <= 0 ? 1 : s.StepOrder,
                StepType = string.IsNullOrWhiteSpace(s.StepType) ? "Approval" : s.StepType.Trim(),
                Status = index == 0 ? "Pending" : "Queued",
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
            var actedStepOrder = decision.Steps
                .Where(s => !s.IsDeleted)
                .OrderBy(s => s.StepOrder)
                .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase))?.StepOrder
                ?? 1;

            // Cutover bridge: resolve the target legacy approval from the generic decision's current pending step
            // so the generic DecisionStep chain drives which legacy record is executed during compatibility mode.
            var targetLegacyApprovalId = await ResolveLegacyApprovalTargetFromDecisionAsync(decision, cancellationToken)
                ?? decision.LegacyApprovalId.Value;

            if (targetLegacyApprovalId != decision.LegacyApprovalId.Value)
            {
                decision.LegacyApprovalId = targetLegacyApprovalId;
                decision.UpdatedAtUtc = nowUtc;
                decision.UpdatedBy = actorName;
                await _dbContext.SaveChangesAsync(cancellationToken);
            }

            await EnsureActorCanDecideLinkedStepAsync(decision, request.ActorUserId, cancellationToken);

            ApplyDecisionOutcomeToGenericDecision(decision, request, actorName, nowUtc);
            decision.UpdatedAtUtc = nowUtc;
            decision.UpdatedBy = actorName;
            await _dbContext.SaveChangesAsync(cancellationToken);

            // Compatibility projection path: generic decision state is canonical.
            await _opportunityApprovalService.ProjectLinkedDecisionProgressionAsync(
                decision.Id,
                actedStepOrder,
                request.Approved,
                request.Notes,
                new ActorContext(request.ActorUserId, actorName),
                cancellationToken);

            var nextLegacyApprovalId = await ResolveLegacyApprovalTargetFromDecisionAsync(decision, cancellationToken);
            if (nextLegacyApprovalId.HasValue)
            {
                decision.LegacyApprovalId = nextLegacyApprovalId.Value;
            }

            await _dbContext.SaveChangesAsync(cancellationToken);

            return await BuildInboxItemFromDecisionAsync(decision.Id, cancellationToken)
                   ?? throw new KeyNotFoundException("Decision item not found after update.");
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

        ApplyDecisionOutcomeToGenericDecision(decision, request, actorName, nowUtc);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return await BuildInboxItemFromDecisionAsync(decision.Id, cancellationToken)
               ?? throw new KeyNotFoundException("Decision item not found after update.");
    }

    public async Task<DecisionInboxItemDto> RequestInfoAsync(
        Guid decisionId,
        DecisionRequestInfoDto request,
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
            throw new KeyNotFoundException("Decision item not found.");
        }

        if (IsClosedDecisionStatus(decision.Status))
        {
            throw new InvalidOperationException("Cannot request info for a completed decision.");
        }

        decision.Status = "Waiting for Info";
        decision.UpdatedAtUtc = nowUtc;
        decision.UpdatedBy = actorName;

        var currentStep = decision.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

        if (currentStep is not null && !string.IsNullOrWhiteSpace(request.Notes))
        {
            currentStep.Notes = request.Notes!.Trim();
            currentStep.UpdatedAtUtc = nowUtc;
            currentStep.UpdatedBy = actorName;
        }

        _dbContext.DecisionActionLogs.Add(new DecisionActionLog
        {
            DecisionRequestId = decision.Id,
            Action = "RequestedInfo",
            ActorUserId = request.ActorUserId,
            ActorName = actorName,
            Notes = request.Notes,
            Field = "Status",
            OldValue = "Pending",
            NewValue = "Waiting for Info",
            ActionAtUtc = nowUtc,
            CreatedAtUtc = nowUtc,
            CreatedBy = actorName
        });

        await _dbContext.SaveChangesAsync(cancellationToken);
        return await BuildInboxItemFromDecisionAsync(decision.Id, cancellationToken)
               ?? throw new KeyNotFoundException("Decision item not found after update.");
    }

    public async Task<DecisionInboxItemDto> DelegateAsync(
        Guid decisionId,
        DecisionDelegateRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var actorName = string.IsNullOrWhiteSpace(request.ActorName) ? "system" : request.ActorName!.Trim();
        var nowUtc = DateTime.UtcNow;

        var decision = await _dbContext.DecisionRequests
            .Include(r => r.Steps)
            .FirstOrDefaultAsync(r => r.Id == decisionId && !r.IsDeleted, cancellationToken);

        if (decision is null)
        {
            throw new KeyNotFoundException("Decision item not found.");
        }

        if (IsClosedDecisionStatus(decision.Status))
        {
            throw new InvalidOperationException("Cannot delegate a completed decision.");
        }

        var currentStep = decision.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

        if (currentStep is null)
        {
            throw new InvalidOperationException("No active pending step is available to delegate.");
        }

        var oldAssignee = currentStep.AssigneeNameSnapshot;
        var oldAssigneeUserId = currentStep.AssigneeUserId;
        currentStep.AssigneeUserId = request.DelegateUserId;
        currentStep.AssigneeNameSnapshot = string.IsNullOrWhiteSpace(request.DelegateUserName)
            ? oldAssignee
            : request.DelegateUserName!.Trim();
        currentStep.UpdatedAtUtc = nowUtc;
        currentStep.UpdatedBy = actorName;
        if (!string.IsNullOrWhiteSpace(request.Notes))
        {
            currentStep.Notes = request.Notes!.Trim();
        }

        decision.Status = "Pending";
        decision.UpdatedAtUtc = nowUtc;
        decision.UpdatedBy = actorName;

        if (decision.LegacyApprovalId.HasValue)
        {
            var legacyApproval = await _dbContext.OpportunityApprovals
                .FirstOrDefaultAsync(a => a.Id == decision.LegacyApprovalId.Value && !a.IsDeleted, cancellationToken);
            if (legacyApproval is not null)
            {
                legacyApproval.ApproverUserId = request.DelegateUserId;
                legacyApproval.UpdatedAtUtc = nowUtc;
                legacyApproval.UpdatedBy = actorName;
            }
        }

        _dbContext.DecisionActionLogs.Add(new DecisionActionLog
        {
            DecisionRequestId = decision.Id,
            Action = "Delegated",
            ActorUserId = request.ActorUserId,
            ActorName = actorName,
            Notes = request.Notes,
            Field = "AssigneeUserId",
            OldValue = oldAssigneeUserId?.ToString(),
            NewValue = request.DelegateUserId.ToString(),
            ActionAtUtc = nowUtc,
            CreatedAtUtc = nowUtc,
            CreatedBy = actorName
        });

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

    private void ApplyDecisionOutcomeToGenericDecision(
        DecisionRequest decision,
        DecisionDecisionRequestDto request,
        string actorName,
        DateTime nowUtc)
    {
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
        currentStep.UpdatedAtUtc = nowUtc;
        currentStep.UpdatedBy = actorName;
        if (request.ActorUserId.HasValue && !currentStep.AssigneeUserId.HasValue)
        {
            currentStep.AssigneeUserId = request.ActorUserId;
            currentStep.AssigneeNameSnapshot ??= actorName;
        }

        if (!request.Approved)
        {
            decision.Status = "Rejected";
            decision.CompletedAtUtc = nowUtc;
            foreach (var step in decision.Steps.Where(s => !s.IsDeleted && s.Id != currentStep.Id &&
                                                          string.Equals(s.Status, "Queued", StringComparison.OrdinalIgnoreCase)))
            {
                step.Status = "Skipped";
                step.UpdatedAtUtc = nowUtc;
                step.UpdatedBy = actorName;
            }
        }
        else
        {
            var nextQueuedStep = decision.Steps
                .Where(s => !s.IsDeleted && s.Id != currentStep.Id)
                .OrderBy(s => s.StepOrder)
                .FirstOrDefault(s => string.Equals(s.Status, "Queued", StringComparison.OrdinalIgnoreCase));

            if (nextQueuedStep is not null)
            {
                nextQueuedStep.Status = "Pending";
                nextQueuedStep.UpdatedAtUtc = nowUtc;
                nextQueuedStep.UpdatedBy = actorName;
                decision.Status = "In Review";
                decision.CompletedAtUtc = null;
            }
            else
            {
                var hasPendingAfter = decision.Steps
                    .Where(s => !s.IsDeleted && s.Id != currentStep.Id)
                    .Any(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

                if (hasPendingAfter)
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
    }

    private async Task<Guid?> ResolveLegacyApprovalTargetFromDecisionAsync(
        DecisionRequest decision,
        CancellationToken cancellationToken)
    {
        if (!decision.LegacyApprovalChainId.HasValue)
        {
            return decision.LegacyApprovalId;
        }

        var pendingGenericStepOrder = await _dbContext.DecisionSteps
            .AsNoTracking()
            .Where(s => !s.IsDeleted && s.DecisionRequestId == decision.Id)
            .OrderBy(s => s.StepOrder)
            .Select(s => new { s.Id, s.StepOrder, s.Status })
            .FirstOrDefaultAsync(s => s.Status == "Pending", cancellationToken);

        if (pendingGenericStepOrder is not null)
        {
            var exactPendingLegacy = await _dbContext.OpportunityApprovals
                .AsNoTracking()
                .Where(a => !a.IsDeleted &&
                            a.ApprovalChainId == decision.LegacyApprovalChainId &&
                            a.Status == "Pending" &&
                            a.StepOrder == pendingGenericStepOrder.StepOrder)
                .OrderByDescending(a => a.RequestedOn)
                .Select(a => a.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (exactPendingLegacy != Guid.Empty)
            {
                return exactPendingLegacy;
            }
        }

        var anyPendingLegacy = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(a => !a.IsDeleted &&
                        a.ApprovalChainId == decision.LegacyApprovalChainId &&
                        a.Status == "Pending")
            .OrderBy(a => a.StepOrder)
            .ThenByDescending(a => a.RequestedOn)
            .Select(a => a.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (anyPendingLegacy != Guid.Empty)
        {
            return anyPendingLegacy;
        }

        return decision.LegacyApprovalId;
    }

    private async Task EnsureActorCanDecideLinkedStepAsync(
        DecisionRequest decision,
        Guid? actorUserId,
        CancellationToken cancellationToken)
    {
        var pendingStep = decision.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));

        var approverRole = pendingStep?.ApproverRole;
        if (string.IsNullOrWhiteSpace(approverRole))
        {
            return;
        }

        if (!actorUserId.HasValue || actorUserId.Value == Guid.Empty)
        {
            throw new InvalidOperationException("You do not have permission to approve this request.");
        }

        var isApprover = await _dbContext.UserRoles
            .Include(ur => ur.Role)
            .AnyAsync(
                ur => !ur.IsDeleted &&
                      ur.UserId == actorUserId.Value &&
                      ur.Role != null &&
                      !ur.Role.IsDeleted &&
                      ur.Role.Name == approverRole,
                cancellationToken);

        if (!isApprover)
        {
            throw new InvalidOperationException("You do not have permission to approve this request.");
        }
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

    private static bool IsClosedDecisionStatus(string? status)
    {
        return string.Equals(status, "Approved", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Rejected", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Cancelled", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Expired", StringComparison.OrdinalIgnoreCase);
    }

    private static DecisionInboxItemDto MapLegacyInboxItem(OpportunityApprovalInboxItemDto item)
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
    }

    private async Task<DecisionInboxItemDto> CreateOpportunityApprovalDecisionAsync(
        DecisionCreateRequestDto request,
        CancellationToken cancellationToken)
    {
        var actor = new ActorContext(request.RequestedByUserId, request.RequestedByName);
        var result = await _opportunityApprovalService.RequestAsync(
            request.EntityId,
            request.Amount,
            string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency,
            string.IsNullOrWhiteSpace(request.Purpose) ? "Close" : request.Purpose,
            actor,
            cancellationToken);

        if (result.NotFound)
        {
            throw new KeyNotFoundException("Opportunity not found.");
        }

        if (!result.Success || result.Value is null)
        {
            throw new InvalidOperationException(result.Error ?? "Unable to create approval decision.");
        }

        var inboxItems = await GetInboxAsync(null, null, cancellationToken);
        var mapped = inboxItems.FirstOrDefault(i => i.Id == result.Value.Id);
        if (mapped is not null)
        {
            return mapped;
        }

        // Fallback projection (should be rare if dual-write sync succeeded).
        return new DecisionInboxItemDto(
            result.Value.Id,
            "OpportunityApproval",
            "OpportunityApproval",
            "Opportunity",
            result.Value.OpportunityId,
            request.EntityName,
            request.ParentEntityName,
            result.Value.Status,
            result.Value.Purpose,
            "normal",
            "medium",
            result.Value.Status == "Pending" ? "on-track" : "completed",
            null,
            false,
            0,
            request.PolicyReason ?? "Approval requested.",
            request.BusinessImpactLabel ?? "commercial approval",
            result.Value.Amount,
            result.Value.Currency,
            result.Value.RequestedByUserId,
            result.Value.RequestedByName,
            result.Value.ApproverUserId,
            result.Value.ApproverName,
            result.Value.RequestedOn,
            result.Value.DecisionOn,
            result.Value.Notes,
            result.Value.StepOrder <= 0 ? 1 : result.Value.StepOrder,
            result.Value.TotalSteps <= 0 ? 1 : result.Value.TotalSteps,
            result.Value.ApproverRole,
            result.Value.ChainStatus,
            Array.Empty<DecisionStepDto>());
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
            cancellationToken: cancellationToken);

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

        var payload = ParseDecisionPayload(request.PayloadJson);
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
            payload.OpportunityName
                ?? payload.EntityName
                ?? $"{request.EntityType} decision",
            null,
            request.Status,
            payload.Purpose ?? "Decision",
            request.Priority ?? "normal",
            request.RiskLevel ?? "low",
            completed ? "completed" : DeriveSlaStatus(request.DueAtUtc),
            request.DueAtUtc,
            request.ActionLogs.Any(a => a.Action == "ApprovalSlaEscalated"),
            ageHours,
            request.PolicyReason ?? "Decision review required.",
            payload.BusinessImpactLabel ?? "impact review",
            payload.Amount ?? 0m,
            payload.Currency ?? "USD",
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

    private static (string? Purpose, decimal? Amount, string? Currency, string? OpportunityName, string? EntityName, string? BusinessImpactLabel) ParseDecisionPayload(string? payloadJson)
    {
        if (string.IsNullOrWhiteSpace(payloadJson))
        {
            return default;
        }

        try
        {
            using var doc = System.Text.Json.JsonDocument.Parse(payloadJson);
            var root = doc.RootElement;

            string? ReadString(params string[] names)
            {
                foreach (var name in names)
                {
                    if (root.TryGetProperty(name, out var p) && p.ValueKind == System.Text.Json.JsonValueKind.String)
                    {
                        return p.GetString();
                    }
                }
                return null;
            }

            decimal? ReadDecimal(params string[] names)
            {
                foreach (var name in names)
                {
                    if (!root.TryGetProperty(name, out var p))
                    {
                        continue;
                    }
                    if (p.ValueKind == System.Text.Json.JsonValueKind.Number && p.TryGetDecimal(out var d))
                    {
                        return d;
                    }
                    if (p.ValueKind == System.Text.Json.JsonValueKind.String &&
                        decimal.TryParse(p.GetString(), out var parsed))
                    {
                        return parsed;
                    }
                }
                return null;
            }

            return (
                ReadString("Purpose", "purpose"),
                ReadDecimal("Amount", "amount"),
                ReadString("Currency", "currency"),
                ReadString("OpportunityName", "opportunityName"),
                ReadString("EntityName", "entityName"),
                ReadString("BusinessImpactLabel", "businessImpactLabel"));
        }
        catch
        {
            return default;
        }
    }
}
