using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Approvals;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityApprovalService : IOpportunityApprovalService
{
    private const string OpportunityEntityType = "Opportunity";
    private const string ApprovalEntityType = "OpportunityApproval";
    private const string DecisionRequestType = "OpportunityApproval";
    private const string ApprovalSlaEscalatedAction = "ApprovalSlaEscalated";
    private const string SystemActor = "System";
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IAuditEventService _auditEvents;
    private readonly ServiceBusApprovalQueue _approvalQueue;

    public OpportunityApprovalService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IAuditEventService auditEvents,
        ServiceBusApprovalQueue approvalQueue)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _auditEvents = auditEvents;
        _approvalQueue = approvalQueue;
    }

    public async Task<IReadOnlyList<OpportunityApprovalDto>?> GetForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var items = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(a => a.OpportunityId == opportunityId && !a.IsDeleted)
            .OrderByDescending(a => a.RequestedOn)
            .ToListAsync(cancellationToken);

        var chainIds = items
            .Where(a => a.ApprovalChainId.HasValue)
            .Select(a => a.ApprovalChainId!.Value)
            .Distinct()
            .ToList();

        var chains = chainIds.Count == 0
            ? new Dictionary<Guid, OpportunityApprovalChain>()
            : await _dbContext.OpportunityApprovalChains
                .AsNoTracking()
                .Where(c => chainIds.Contains(c.Id))
                .ToDictionaryAsync(c => c.Id, c => c, cancellationToken);

        var userIds = items
            .SelectMany(a => new[] { a.RequestedByUserId, a.ApproverUserId })
            .Where(id => id.HasValue && id.Value != Guid.Empty)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        var users = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        return items.Select(a =>
        {
            chains.TryGetValue(a.ApprovalChainId ?? Guid.Empty, out var chain);
            return new OpportunityApprovalDto(
                a.Id,
                a.OpportunityId,
                a.Status,
                a.Purpose,
                a.ApproverRole,
                a.ApprovalChainId,
                a.StepOrder,
                chain?.TotalSteps ?? 1,
                chain?.Status ?? a.Status,
                a.ApproverUserId,
                a.ApproverUserId.HasValue && users.TryGetValue(a.ApproverUserId.Value, out var approverName) ? approverName : null,
                a.RequestedByUserId,
                a.RequestedByUserId.HasValue && users.TryGetValue(a.RequestedByUserId.Value, out var requesterName) ? requesterName : null,
                a.RequestedOn,
                a.DecisionOn,
                a.Notes,
                a.Amount,
                a.Currency);
        }).ToList();
    }

    public async Task<IReadOnlyList<OpportunityApprovalInboxItemDto>> GetInboxAsync(
        string? status = null,
        string? purpose = null,
        CancellationToken cancellationToken = default)
    {
        var nowUtc = DateTime.UtcNow;
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == _tenantProvider.TenantId, cancellationToken);
        var amountThreshold = tenant?.ApprovalAmountThreshold;

        var approvalsQuery = _dbContext.OpportunityApprovals
            .AsNoTracking()
            .Where(a => !a.IsDeleted);

        if (!string.IsNullOrWhiteSpace(status))
        {
            approvalsQuery = approvalsQuery.Where(a => a.Status == status);
        }

        if (!string.IsNullOrWhiteSpace(purpose))
        {
            approvalsQuery = approvalsQuery.Where(a => a.Purpose == purpose);
        }

        var approvals = await approvalsQuery
            .Join(
                _dbContext.Opportunities.AsNoTracking().Where(o => !o.IsDeleted),
                approval => approval.OpportunityId,
                opportunity => opportunity.Id,
                (approval, opportunity) => new { approval, opportunity })
            .Join(
                _dbContext.Accounts.AsNoTracking(),
                item => item.opportunity.AccountId,
                account => account.Id,
                (item, account) => new
                {
                    item.approval,
                    item.opportunity,
                    AccountName = account.Name
                })
            .OrderByDescending(item => item.approval.RequestedOn)
            .ToListAsync(cancellationToken);

        var chainIds = approvals
            .Select(a => a.approval.ApprovalChainId)
            .Where(id => id.HasValue)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        var chains = chainIds.Count == 0
            ? new Dictionary<Guid, OpportunityApprovalChain>()
            : await _dbContext.OpportunityApprovalChains
                .AsNoTracking()
                .Where(c => chainIds.Contains(c.Id))
                .ToDictionaryAsync(c => c.Id, c => c, cancellationToken);

        var userIds = approvals
            .SelectMany(a => new[] { a.approval.RequestedByUserId, a.approval.ApproverUserId })
            .Where(id => id.HasValue && id.Value != Guid.Empty)
            .Select(id => id!.Value)
            .Distinct()
            .ToList();

        var users = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var metadataByApprovalId = approvals.ToDictionary(
            item => item.approval.Id,
            item =>
            {
                chains.TryGetValue(item.approval.ApprovalChainId ?? Guid.Empty, out var chainForMetadata);
                return BuildInboxMetadata(
                    item.approval.Purpose,
                    item.approval.Status,
                    item.approval.Amount,
                    item.approval.RequestedOn,
                    nowUtc,
                    amountThreshold,
                    item.approval.StepOrder,
                    chainForMetadata?.TotalSteps ?? 1);
            });

        var overduePendingIds = metadataByApprovalId
            .Where(kvp => kvp.Value.SlaStatus == "overdue")
            .Select(kvp => kvp.Key)
            .ToList();

        var escalatedIds = new HashSet<Guid>();
        if (overduePendingIds.Count > 0)
        {
            var existingEscalatedIds = await _dbContext.AuditEvents
                .AsNoTracking()
                .Where(a =>
                    a.EntityType == ApprovalEntityType &&
                    a.Action == ApprovalSlaEscalatedAction &&
                    overduePendingIds.Contains(a.EntityId))
                .Select(a => a.EntityId)
                .Distinct()
                .ToListAsync(cancellationToken);

            escalatedIds = existingEscalatedIds.ToHashSet();

            var missingEscalations = approvals
                .Where(item => overduePendingIds.Contains(item.approval.Id) && !escalatedIds.Contains(item.approval.Id))
                .Select(item =>
                {
                    var metadata = metadataByApprovalId[item.approval.Id];
                    return new AuditEventEntry(
                        ApprovalEntityType,
                        item.approval.Id,
                        ApprovalSlaEscalatedAction,
                        "SlaStatus",
                        metadata.SlaStatus,
                        "escalated",
                        null,
                        SystemActor);
                })
                .ToList();

            if (missingEscalations.Count > 0)
            {
                await _auditEvents.TrackManyAsync(missingEscalations, cancellationToken);
                await _dbContext.SaveChangesAsync(cancellationToken);
                foreach (var item in missingEscalations)
                {
                    escalatedIds.Add(item.EntityId);
                }
            }
        }

        return approvals.Select(item =>
        {
            chains.TryGetValue(item.approval.ApprovalChainId ?? Guid.Empty, out var chain);
            var metadata = metadataByApprovalId[item.approval.Id];
            var isEscalated = escalatedIds.Contains(item.approval.Id);
            return new OpportunityApprovalInboxItemDto(
                item.approval.Id,
                item.approval.OpportunityId,
                item.opportunity.Name,
                item.AccountName,
                item.approval.Status,
                item.approval.Purpose,
                item.approval.ApproverRole,
                item.approval.ApprovalChainId,
                item.approval.StepOrder,
                chain?.TotalSteps ?? 1,
                chain?.Status ?? item.approval.Status,
                item.approval.ApproverUserId,
                item.approval.ApproverUserId.HasValue && users.TryGetValue(item.approval.ApproverUserId.Value, out var approverName) ? approverName : null,
                item.approval.RequestedByUserId,
                item.approval.RequestedByUserId.HasValue && users.TryGetValue(item.approval.RequestedByUserId.Value, out var requesterName) ? requesterName : null,
                item.approval.RequestedOn,
                item.approval.DecisionOn,
                item.approval.Notes,
                item.approval.Amount,
                item.approval.Currency,
                "Opportunity Approval",
                metadata.Priority,
                metadata.RiskLevel,
                metadata.SlaStatus,
                metadata.SlaDueAtUtc,
                isEscalated,
                metadata.RequestedAgeHours,
                metadata.PolicyReason,
                metadata.BusinessImpactLabel);
        }).ToList();
    }

    private static (string Priority, string RiskLevel, string SlaStatus, DateTime? SlaDueAtUtc, double RequestedAgeHours, string PolicyReason, string BusinessImpactLabel)
        BuildInboxMetadata(
            string purpose,
            string status,
            decimal amount,
            DateTime requestedOn,
            DateTime nowUtc,
            decimal? amountThreshold,
            int stepOrder,
            int totalSteps)
    {
        var normalizedPurpose = string.IsNullOrWhiteSpace(purpose) ? "Close" : purpose.Trim();
        var baseSlaHours = normalizedPurpose.Equals("Discount", StringComparison.OrdinalIgnoreCase) ? 4
            : normalizedPurpose.Equals("Close", StringComparison.OrdinalIgnoreCase) ? 8
            : 24;
        var stepAdjustmentHours = Math.Max(0, stepOrder - 1);
        var slaDueAtUtc = status.Equals("Pending", StringComparison.OrdinalIgnoreCase)
            ? requestedOn.AddHours(baseSlaHours + stepAdjustmentHours)
            : (DateTime?)null;

        var requestedAgeHours = Math.Max(0, (nowUtc - requestedOn).TotalHours);
        var isPending = status.Equals("Pending", StringComparison.OrdinalIgnoreCase);
        var isOverdue = isPending && slaDueAtUtc.HasValue && nowUtc > slaDueAtUtc.Value;
        var isAtRisk = isPending && slaDueAtUtc.HasValue && !isOverdue && (slaDueAtUtc.Value - nowUtc).TotalMinutes <= 60;

        var slaStatus = !isPending ? "completed"
            : isOverdue ? "overdue"
            : isAtRisk ? "at-risk"
            : "on-track";

        var thresholdTriggered = amountThreshold.HasValue && amountThreshold.Value > 0 && amount >= amountThreshold.Value;
        var largeDeal = amountThreshold.HasValue && amountThreshold.Value > 0 && amount >= amountThreshold.Value * 2m;
        var riskLevel = isOverdue || largeDeal ? "high"
            : isAtRisk || thresholdTriggered || normalizedPurpose.Equals("Discount", StringComparison.OrdinalIgnoreCase) ? "medium"
            : "low";

        var priority = isOverdue ? "critical"
            : riskLevel == "high" ? "high"
            : riskLevel == "medium" ? "medium"
            : "normal";

        var policyReason = thresholdTriggered && amountThreshold.HasValue
            ? $"Amount {amount:0.##} exceeds tenant threshold {amountThreshold.Value:0.##}."
            : normalizedPurpose.Equals("Discount", StringComparison.OrdinalIgnoreCase)
                ? "Discount exception requires approver sign-off."
                : totalSteps > 1
                    ? $"Approval chain step {stepOrder} of {totalSteps} is pending."
                    : $"Approval routing requires role {normalizedPurpose} sign-off.";

        var businessImpactLabel = amount >= 100000m ? "high impact"
            : amount >= 25000m ? "medium impact"
            : "low impact";

        return (priority, riskLevel, slaStatus, slaDueAtUtc, Math.Round(requestedAgeHours, 1), policyReason, businessImpactLabel);
    }

    public async Task<OpportunityOperationResult<OpportunityApprovalDto>> RequestAsync(
        Guid opportunityId,
        decimal amount,
        string currency,
        string purpose,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.NotFoundResult();
        }

        var tenantId = _tenantProvider.TenantId;
        var workflow = await ResolveApprovalWorkflowAsync(tenantId, cancellationToken);
        if (!workflow.Enabled || workflow.Steps.Count == 0)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow must be configured before requesting approval.");
        }

        var normalizedPurpose = string.IsNullOrWhiteSpace(purpose) ? "Close" : purpose.Trim();

        var existingPending = await _dbContext.OpportunityApprovalChains
            .AsNoTracking()
            .Where(c => c.OpportunityId == opportunityId && c.Status == "Pending" && c.Purpose == normalizedPurpose)
            .OrderByDescending(c => c.RequestedOn)
            .FirstOrDefaultAsync(cancellationToken);

        if (existingPending is not null)
        {
            var pendingApproval = await _dbContext.OpportunityApprovals
                .AsNoTracking()
                .Where(a => a.ApprovalChainId == existingPending.Id && a.Status == "Pending")
                .OrderBy(a => a.StepOrder)
                .FirstOrDefaultAsync(cancellationToken);
            if (pendingApproval is not null)
            {
                var dto = await MapDtoAsync(pendingApproval, existingPending, cancellationToken);
                return OpportunityOperationResult<OpportunityApprovalDto>.Ok(dto);
            }
        }

        var steps = workflow.Steps
            .Where(step =>
                (string.IsNullOrWhiteSpace(step.Purpose) || string.Equals(step.Purpose, normalizedPurpose, StringComparison.OrdinalIgnoreCase)) &&
                (!step.AmountThreshold.HasValue || amount >= step.AmountThreshold.Value))
            .OrderBy(step => step.Order)
            .ToList();

        if (steps.Count == 0)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow has no matching steps for this request.");
        }

        if (steps.Any(step => string.IsNullOrWhiteSpace(step.ApproverRole)))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow steps must include an approver role.");
        }

        var chain = new OpportunityApprovalChain
        {
            OpportunityId = opportunityId,
            RequestedByUserId = actor.UserId,
            Purpose = normalizedPurpose,
            Status = "Pending",
            CurrentStep = steps[0].Order,
            TotalSteps = steps.Count,
            StepsJson = JsonSerializer.Serialize(steps, JsonOptions),
            RequestedOn = DateTime.UtcNow
        };
        _dbContext.OpportunityApprovalChains.Add(chain);

        var firstStep = steps.First();
        var approval = new OpportunityApproval
        {
            OpportunityId = opportunityId,
            ApprovalChainId = chain.Id,
            StepOrder = firstStep.Order,
            ApproverRole = firstStep.ApproverRole,
            RequestedByUserId = actor.UserId,
            Status = "Pending",
            Purpose = normalizedPurpose,
            RequestedOn = DateTime.UtcNow,
            Amount = amount,
            Currency = string.IsNullOrWhiteSpace(currency) ? "USD" : currency
        };

        _dbContext.OpportunityApprovals.Add(approval);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                OpportunityEntityType,
                opportunityId,
                "ApprovalRequested",
                "Status",
                null,
                approval.Status,
                actor.UserId,
                actor.UserName),
            cancellationToken);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                ApprovalEntityType,
                approval.Id,
                "Created",
                null,
                null,
                null,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await CreateOrUpdateDecisionRequestFromApprovalAsync(
            approval,
            chain,
            opportunity.Name,
            actor,
            createdAction: "Submitted",
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);

        await _approvalQueue.EnqueueAsync(
            new ApprovalQueueMessage(
                approval.OpportunityId,
                approval.RequestedByUserId,
                approval.Amount,
                approval.Currency,
                approval.RequestedOn,
                approval.ApproverRole,
                approval.Purpose),
            cancellationToken);

        var approvalDto = await MapDtoAsync(approval, chain, cancellationToken);
        return OpportunityOperationResult<OpportunityApprovalDto>.Ok(approvalDto);
    }

    public async Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(
        Guid approvalId,
        bool approved,
        string? notes,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var approval = await _dbContext.OpportunityApprovals
            .FirstOrDefaultAsync(a => a.Id == approvalId && !a.IsDeleted, cancellationToken);
        if (approval is null)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.NotFoundResult();
        }

        var approverRole = approval.ApproverRole;
        if (string.IsNullOrWhiteSpace(approverRole))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval role must be configured for this approval step.");
        }

        if (!await IsApproverAsync(actor.UserId, approverRole, cancellationToken))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("You do not have permission to approve this request.");
        }

        approval.Status = approved ? "Approved" : "Rejected";
        approval.DecisionOn = DateTime.UtcNow;
        approval.Notes = string.IsNullOrWhiteSpace(notes) ? null : notes.Trim();
        approval.ApproverUserId = actor.UserId;

        OpportunityApprovalChain? chain = null;
        if (approval.ApprovalChainId.HasValue)
        {
            chain = await _dbContext.OpportunityApprovalChains
                .FirstOrDefaultAsync(c => c.Id == approval.ApprovalChainId, cancellationToken);
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                OpportunityEntityType,
                approval.OpportunityId,
                approved ? "ApprovalGranted" : "ApprovalRejected",
                "Status",
                "Pending",
                approval.Status,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                ApprovalEntityType,
                approval.Id,
                "Decision",
                "Status",
                "Pending",
                approval.Status,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        await CreateOrUpdateDecisionRequestFromApprovalAsync(
            approval,
            chain,
            opportunityName: null,
            actor,
            createdAction: approved ? "Approved" : "Rejected",
            cancellationToken);

        if (chain is not null)
        {
            if (!approved)
            {
                chain.Status = "Rejected";
                chain.CompletedOn = DateTime.UtcNow;
            }
            else
            {
                var steps = JsonSerializer.Deserialize<List<ApprovalWorkflowStep>>(chain.StepsJson, JsonOptions) ?? new List<ApprovalWorkflowStep>();
                var nextStep = steps.FirstOrDefault(s => s.Order > approval.StepOrder);
                if (nextStep is null)
                {
                    chain.Status = "Approved";
                    chain.CompletedOn = DateTime.UtcNow;
                }
                else
                {
                    chain.CurrentStep = nextStep.Order;
                    var nextApproval = new OpportunityApproval
                    {
                        OpportunityId = approval.OpportunityId,
                        ApprovalChainId = chain.Id,
                        StepOrder = nextStep.Order,
                        ApproverRole = nextStep.ApproverRole,
                        RequestedByUserId = approval.RequestedByUserId,
                        Status = "Pending",
                        Purpose = approval.Purpose,
                        RequestedOn = DateTime.UtcNow,
                        Amount = approval.Amount,
                        Currency = approval.Currency
                    };
                    _dbContext.OpportunityApprovals.Add(nextApproval);

                    await _auditEvents.TrackAsync(
                        new AuditEventEntry(
                            OpportunityEntityType,
                            approval.OpportunityId,
                            "ApprovalStepQueued",
                            "Status",
                            null,
                            nextApproval.Status,
                            actor.UserId,
                            actor.UserName),
                        cancellationToken);

                    await _approvalQueue.EnqueueAsync(
                        new ApprovalQueueMessage(
                            nextApproval.OpportunityId,
                            nextApproval.RequestedByUserId,
                            nextApproval.Amount,
                            nextApproval.Currency,
                            nextApproval.RequestedOn,
                            nextApproval.ApproverRole,
                            nextApproval.Purpose),
                        cancellationToken);
                }
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = await MapDtoAsync(approval, chain, cancellationToken);
        return OpportunityOperationResult<OpportunityApprovalDto>.Ok(dto);
    }

    private async Task<OpportunityApprovalDto> MapDtoAsync(
        OpportunityApproval approval,
        OpportunityApprovalChain? chain,
        CancellationToken cancellationToken)
    {
        var userIds = new List<Guid>();
        if (approval.RequestedByUserId.HasValue) userIds.Add(approval.RequestedByUserId.Value);
        if (approval.ApproverUserId.HasValue) userIds.Add(approval.ApproverUserId.Value);

        var users = await _dbContext.Users
            .Where(u => userIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        return new OpportunityApprovalDto(
            approval.Id,
            approval.OpportunityId,
            approval.Status,
            approval.Purpose,
            approval.ApproverRole,
            approval.ApprovalChainId,
            approval.StepOrder,
            chain?.TotalSteps ?? 1,
            chain?.Status ?? approval.Status,
            approval.ApproverUserId,
            approval.ApproverUserId.HasValue && users.TryGetValue(approval.ApproverUserId.Value, out var approverName) ? approverName : null,
            approval.RequestedByUserId,
            approval.RequestedByUserId.HasValue && users.TryGetValue(approval.RequestedByUserId.Value, out var requesterName) ? requesterName : null,
            approval.RequestedOn,
            approval.DecisionOn,
            approval.Notes,
            approval.Amount,
            approval.Currency);
    }

    private async Task CreateOrUpdateDecisionRequestFromApprovalAsync(
        OpportunityApproval approval,
        OpportunityApprovalChain? chain,
        string? opportunityName,
        ActorContext actor,
        string createdAction,
        CancellationToken cancellationToken)
    {
        if (approval.ApprovalChainId is null)
        {
            return;
        }

        var decision = await _dbContext.DecisionRequests
            .FirstOrDefaultAsync(d =>
                !d.IsDeleted &&
                d.LegacyApprovalChainId == approval.ApprovalChainId &&
                d.Type == DecisionRequestType,
                cancellationToken);

        var nowUtc = DateTime.UtcNow;
        var totalSteps = chain?.TotalSteps ?? 1;
        var metadata = BuildInboxMetadata(
            approval.Purpose,
            approval.Status,
            approval.Amount,
            approval.RequestedOn,
            nowUtc,
            amountThreshold: null,
            approval.StepOrder,
            totalSteps);

        if (decision is null)
        {
            decision = new DecisionRequest
            {
                LegacyApprovalId = approval.Id,
                LegacyApprovalChainId = approval.ApprovalChainId,
                Type = DecisionRequestType,
                EntityType = OpportunityEntityType,
                EntityId = approval.OpportunityId,
                Status = approval.Status,
                Priority = metadata.Priority,
                RiskLevel = metadata.RiskLevel,
                RequestedByUserId = approval.RequestedByUserId,
                RequestedOnUtc = approval.RequestedOn,
                DueAtUtc = metadata.SlaDueAtUtc,
                CompletedAtUtc = approval.DecisionOn,
                PolicyReason = metadata.PolicyReason,
                PayloadJson = JsonSerializer.Serialize(new
                {
                    approval.Purpose,
                    approval.Amount,
                    approval.Currency,
                    approval.ApproverRole,
                    OpportunityName = opportunityName
                }, JsonOptions)
            };
            _dbContext.DecisionRequests.Add(decision);
        }
        else
        {
            decision.LegacyApprovalId = approval.Id;
            decision.Status = approval.Status;
            decision.Priority = metadata.Priority;
            decision.RiskLevel = metadata.RiskLevel;
            decision.DueAtUtc = metadata.SlaDueAtUtc;
            decision.CompletedAtUtc = approval.DecisionOn;
            decision.PolicyReason = metadata.PolicyReason;
            decision.UpdatedAtUtc = nowUtc;
            decision.UpdatedBy = actor.UserName;
        }

        var existingStep = await _dbContext.DecisionSteps
            .FirstOrDefaultAsync(s =>
                !s.IsDeleted &&
                s.DecisionRequestId == decision.Id &&
                s.StepOrder == approval.StepOrder,
                cancellationToken);

        if (existingStep is null)
        {
            _dbContext.DecisionSteps.Add(new DecisionStep
            {
                DecisionRequestId = decision.Id,
                StepOrder = approval.StepOrder,
                StepType = "Approval",
                Status = approval.Status == "Pending" ? "Pending" : approval.Status,
                ApproverRole = approval.ApproverRole,
                AssigneeUserId = approval.ApproverUserId,
                AssigneeNameSnapshot = actor.UserName,
                DueAtUtc = metadata.SlaDueAtUtc,
                CompletedAtUtc = approval.DecisionOn
            });
        }
        else
        {
            existingStep.Status = approval.Status == "Pending" ? "Pending" : approval.Status;
            existingStep.AssigneeUserId = approval.ApproverUserId;
            existingStep.DueAtUtc = metadata.SlaDueAtUtc;
            existingStep.CompletedAtUtc = approval.DecisionOn;
            existingStep.Notes = approval.Notes;
            existingStep.UpdatedAtUtc = nowUtc;
            existingStep.UpdatedBy = actor.UserName;
        }

        _dbContext.DecisionActionLogs.Add(new DecisionActionLog
        {
            DecisionRequestId = decision.Id,
            Action = createdAction,
            ActorUserId = actor.UserId,
            ActorName = actor.UserName,
            Notes = approval.Notes,
            Field = "Status",
            OldValue = createdAction == "Submitted" ? null : "Pending",
            NewValue = approval.Status,
            ActionAtUtc = nowUtc
        });
    }

    private async Task<OpportunityApprovalDto> MapDtoAsync(
        OpportunityApproval approval,
        CancellationToken cancellationToken)
    {
        OpportunityApprovalChain? chain = null;
        if (approval.ApprovalChainId.HasValue)
        {
            chain = await _dbContext.OpportunityApprovalChains
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == approval.ApprovalChainId, cancellationToken);
        }
        return await MapDtoAsync(approval, chain, cancellationToken);
    }

    private async Task<ApprovalWorkflowPolicy> ResolveApprovalWorkflowAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(null, null);
        }

        if (string.IsNullOrWhiteSpace(tenant.ApprovalWorkflowJson))
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(tenant.ApprovalAmountThreshold, tenant.ApprovalApproverRole);
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<ApprovalWorkflowPolicy>(tenant.ApprovalWorkflowJson, JsonOptions);
            return parsed ?? ApprovalWorkflowPolicyDefaults.FromTenantDefaults(tenant.ApprovalAmountThreshold, tenant.ApprovalApproverRole);
        }
        catch (JsonException)
        {
            return ApprovalWorkflowPolicyDefaults.FromTenantDefaults(tenant.ApprovalAmountThreshold, tenant.ApprovalApproverRole);
        }
    }

    private async Task<bool> IsApproverAsync(Guid? userId, string approverRole, CancellationToken cancellationToken)
    {
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return false;
        }

        return await _dbContext.UserRoles
            .Include(ur => ur.Role)
            .AnyAsync(
                ur => ur.UserId == userId.Value &&
                      ur.Role != null &&
                      ur.Role.Name == approverRole,
                cancellationToken);
    }
}
