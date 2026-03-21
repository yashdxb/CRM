using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Approvals;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Notifications;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Approvals;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Workflows;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.Extensions.Logging;

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
    private readonly ICrmRealtimePublisher _realtimePublisher;
    private readonly IEmailSender _emailSender;
    private readonly IWorkspaceEmailDeliveryPolicy _emailDeliveryPolicy;
    private readonly ILogger<OpportunityApprovalService> _logger;

    public OpportunityApprovalService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IAuditEventService auditEvents,
        ServiceBusApprovalQueue approvalQueue,
        ICrmRealtimePublisher realtimePublisher,
        IEmailSender emailSender,
        IWorkspaceEmailDeliveryPolicy emailDeliveryPolicy,
        ILogger<OpportunityApprovalService> logger)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _auditEvents = auditEvents;
        _approvalQueue = approvalQueue;
        _realtimePublisher = realtimePublisher;
        _emailSender = emailSender;
        _emailDeliveryPolicy = emailDeliveryPolicy;
        _logger = logger;
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
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.NotFoundResult();
        }

        var tenantId = _tenantProvider.TenantId;
        var workflowDefinition = await ResolveApprovalWorkflowDefinitionAsync(tenantId, cancellationToken);
        if (!workflowDefinition.Enabled)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow must be configured before requesting approval.");
        }

        var normalizedPurpose = string.IsNullOrWhiteSpace(purpose) ? "Close" : purpose.Trim();
        var executionPlan = await BuildExecutionPlanAsync(workflowDefinition, opportunity, normalizedPurpose, amount, cancellationToken);
        var steps = GetApprovalSteps(executionPlan);
        if (steps.Count == 0)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow has no matching steps for this request.");
        }

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

        if (steps.Any(step => string.IsNullOrWhiteSpace(step.ApproverRole)))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow steps must include an approver role.");
        }

        var firstExecution = await ExecutePlanUntilNextApprovalAsync(
            executionPlan,
            approvalStepOrder: null,
            opportunity,
            actor,
            cancellationToken);
        if (firstExecution.Error is not null)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail(firstExecution.Error);
        }

        if (firstExecution.IsDelayed)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Workflow is paused at a delay node. It will resume automatically.");
        }

        var firstStep = firstExecution.NextApprovalStep;
        if (firstStep is null)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval workflow did not resolve a pending approval step.");
        }

        var chain = new OpportunityApprovalChain
        {
            OpportunityId = opportunityId,
            RequestedByUserId = actor.UserId,
            Purpose = normalizedPurpose,
            Status = "Pending",
            CurrentStep = firstStep.Order,
            TotalSteps = steps.Count,
            WorkflowKey = "deal-approval",
            WorkflowName = string.IsNullOrWhiteSpace(workflowDefinition.Scope.Name) ? "Deal Approval" : workflowDefinition.Scope.Name.Trim(),
            WorkflowVersion = Math.Max(1, workflowDefinition.Scope.Version),
            StepsJson = JsonSerializer.Serialize(executionPlan, JsonOptions),
            RequestedOn = DateTime.UtcNow
        };
        _dbContext.OpportunityApprovalChains.Add(chain);

        var firstRouting = await ResolveApprovalRoutingAsync(firstStep, cancellationToken);
        if (!firstRouting.Success)
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail(firstRouting.Error!);
        }
        var approval = new OpportunityApproval
        {
            OpportunityId = opportunityId,
            ApprovalChainId = chain.Id,
            StepOrder = firstStep.Order,
            ApproverRoleId = firstRouting.RoleId,
            ApproverRole = firstRouting.RoleName,
            ApproverUserId = firstRouting.ApproverUserId,
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
        await SyncWorkflowExecutionMetadataAsync(chain.Id, actor.UserName, cancellationToken);
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

        await NotifyApprovalRequestedAsync(approval, opportunity.Name, firstRouting.ApproverName, actor.UserName ?? SystemActor, cancellationToken);

        var approvalDto = await MapDtoAsync(approval, chain, cancellationToken);
        return OpportunityOperationResult<OpportunityApprovalDto>.Ok(approvalDto);
    }

    public async Task<OpportunityOperationResult<OpportunityApprovalDto>> DecideAsync(
        Guid approvalId,
        bool approved,
        string? notes,
        ActorContext actor,
        bool syncDecisionRequest = true,
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

        OpportunityApprovalChain? chain = null;
        ApprovalWorkflowStep? currentWorkflowStep = null;
        WorkflowExecutionPlan? executionPlan = null;
        Opportunity? opportunity = null;
        if (approval.ApprovalChainId.HasValue)
        {
            chain = await _dbContext.OpportunityApprovalChains
                .FirstOrDefaultAsync(c => c.Id == approval.ApprovalChainId, cancellationToken);
            executionPlan = DeserializeExecutionPlan(chain?.StepsJson);
            currentWorkflowStep = chain is null
                ? null
                : GetApprovalSteps(executionPlan)
                    .FirstOrDefault(step => step.Order == approval.StepOrder);
            opportunity = await _dbContext.Opportunities
                .FirstOrDefaultAsync(item => item.Id == approval.OpportunityId && !item.IsDeleted, cancellationToken);
        }

        if (!await IsApproverAsync(actor.UserId, approval.ApproverRoleId, approverRole, currentWorkflowStep?.MinimumSecurityLevelId, cancellationToken))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("You do not have permission to approve this request.");
        }

        approval.Status = approved ? "Approved" : "Rejected";
        approval.DecisionOn = DateTime.UtcNow;
        approval.Notes = string.IsNullOrWhiteSpace(notes) ? null : notes.Trim();
        approval.ApproverUserId = actor.UserId;

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

        if (syncDecisionRequest)
        {
            await CreateOrUpdateDecisionRequestFromApprovalAsync(
                approval,
                chain,
                opportunityName: null,
                actor,
                createdAction: approved ? "Approved" : "Rejected",
                cancellationToken);
        }

        if (chain is not null)
        {
            if (!approved)
            {
                chain.Status = "Rejected";
                chain.CompletedOn = DateTime.UtcNow;
            }
            else
            {
                var continuation = opportunity is null
                    ? WorkflowContinuationResult.Fail("Opportunity no longer exists for workflow execution.")
                    : await ExecutePlanUntilNextApprovalAsync(
                        executionPlan ?? CreateLegacyExecutionPlan(chain),
                        approval.StepOrder,
                        opportunity,
                        actor,
                        cancellationToken);
                if (continuation.Error is not null)
                {
                    return OpportunityOperationResult<OpportunityApprovalDto>.Fail(continuation.Error);
                }

                if (continuation.IsDelayed)
                {
                    chain.Status = "Delayed";
                }

                var nextStep = continuation.NextApprovalStep;
                if (nextStep is null)
                {
                    if (!continuation.IsDelayed)
                    {
                        chain.Status = "Approved";
                        chain.CompletedOn = DateTime.UtcNow;
                    }
                }
                else
                {
                    chain.CurrentStep = nextStep.Order;
                    var nextRouting = await ResolveApprovalRoutingAsync(nextStep, cancellationToken);
                    if (!nextRouting.Success)
                    {
                        return OpportunityOperationResult<OpportunityApprovalDto>.Fail(nextRouting.Error!);
                    }
                    var nextApproval = new OpportunityApproval
                    {
                        OpportunityId = approval.OpportunityId,
                        ApprovalChainId = chain.Id,
                        StepOrder = nextStep.Order,
                        ApproverRoleId = nextRouting.RoleId,
                        ApproverRole = nextRouting.RoleName,
                        ApproverUserId = nextRouting.ApproverUserId,
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

                    var opportunityName = await ResolveOpportunityNameAsync(approval.OpportunityId, cancellationToken);
                    await NotifyApprovalRequestedAsync(nextApproval, opportunityName, nextRouting.ApproverName, actor.UserName ?? SystemActor, cancellationToken);
                }
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        if (chain is not null)
        {
            await SyncWorkflowExecutionMetadataAsync(chain.Id, actor.UserName, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        var dto = await MapDtoAsync(approval, chain, cancellationToken);
        await NotifyApprovalDecisionAsync(approval, dto, approved, actor.UserName ?? SystemActor, cancellationToken);
        return OpportunityOperationResult<OpportunityApprovalDto>.Ok(dto);
    }

    public async Task ProjectLinkedDecisionProgressionAsync(
        Guid decisionRequestId,
        int actedStepOrder,
        bool approved,
        string? notes,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var nowUtc = DateTime.UtcNow;
        var decision = await _dbContext.DecisionRequests
            .Include(d => d.Steps)
            .FirstOrDefaultAsync(d => d.Id == decisionRequestId && !d.IsDeleted, cancellationToken);
        if (decision is null || !decision.LegacyApprovalChainId.HasValue)
        {
            return;
        }

        var chain = await _dbContext.OpportunityApprovalChains
            .FirstOrDefaultAsync(c => c.Id == decision.LegacyApprovalChainId.Value && !c.IsDeleted, cancellationToken);
        if (chain is null)
        {
            return;
        }

        var approvals = await _dbContext.OpportunityApprovals
            .Where(a => !a.IsDeleted && a.ApprovalChainId == chain.Id)
            .OrderBy(a => a.StepOrder)
            .ThenBy(a => a.RequestedOn)
            .ToListAsync(cancellationToken);

        var actedLegacy = approvals
            .Where(a => a.StepOrder == actedStepOrder)
            .OrderByDescending(a => a.RequestedOn)
            .FirstOrDefault();

        if (actedLegacy is not null)
        {
            var oldStatus = actedLegacy.Status;
            actedLegacy.Status = approved ? "Approved" : "Rejected";
            actedLegacy.DecisionOn = nowUtc;
            actedLegacy.Notes = string.IsNullOrWhiteSpace(notes) ? actedLegacy.Notes : notes.Trim();
            actedLegacy.ApproverUserId = actor.UserId;
            actedLegacy.UpdatedAtUtc = nowUtc;
            actedLegacy.UpdatedBy = actor.UserName;

            if (!string.Equals(oldStatus, actedLegacy.Status, StringComparison.OrdinalIgnoreCase))
            {
                await _auditEvents.TrackAsync(
                    new AuditEventEntry(
                        ApprovalEntityType,
                        actedLegacy.Id,
                        "Decision",
                        "Status",
                        oldStatus,
                        actedLegacy.Status,
                        actor.UserId,
                        actor.UserName),
                    cancellationToken);

                await _auditEvents.TrackAsync(
                    new AuditEventEntry(
                        OpportunityEntityType,
                        actedLegacy.OpportunityId,
                        approved ? "ApprovalGranted" : "ApprovalRejected",
                        "Status",
                        oldStatus,
                        actedLegacy.Status,
                        actor.UserId,
                        actor.UserName),
                    cancellationToken);
            }
        }

        var genericSteps = decision.Steps
            .Where(s => !s.IsDeleted)
            .OrderBy(s => s.StepOrder)
            .ToList();

        var pendingGenericStep = genericSteps.FirstOrDefault(s => string.Equals(s.Status, "Pending", StringComparison.OrdinalIgnoreCase));
        var pendingStepOrder = pendingGenericStep?.StepOrder;

        var chainWorkflowSteps = GetApprovalSteps(DeserializeExecutionPlan(chain.StepsJson));

        if (pendingGenericStep is not null)
        {
            var existingPendingLegacy = approvals
                .Where(a => string.Equals(a.Status, "Pending", StringComparison.OrdinalIgnoreCase))
                .OrderBy(a => a.StepOrder)
                .ThenByDescending(a => a.RequestedOn)
                .FirstOrDefault(a => a.StepOrder == pendingGenericStep.StepOrder);

            if (existingPendingLegacy is null)
            {
                var templateApproval = approvals
                    .OrderByDescending(a => a.RequestedOn)
                    .FirstOrDefault();

                if (templateApproval is not null)
                {
                    var workflowStep = chainWorkflowSteps
                        .OrderBy(s => s.Order)
                        .FirstOrDefault(s => s.Order == pendingGenericStep.StepOrder);

                    var projectedRouting = workflowStep is not null
                        ? await ResolveApprovalRoutingAsync(workflowStep, cancellationToken)
                        : ApprovalRoutingResolution.Fail("Approval workflow step could not be resolved.");
                    if (!projectedRouting.Success && !pendingGenericStep.AssigneeUserId.HasValue)
                    {
                        return;
                    }

                    var nextApproval = new OpportunityApproval
                    {
                        OpportunityId = chain.OpportunityId,
                        ApprovalChainId = chain.Id,
                        StepOrder = pendingGenericStep.StepOrder,
                        ApproverRoleId = workflowStep?.ApproverRoleId ?? projectedRouting.RoleId,
                        ApproverRole = workflowStep?.ApproverRole ?? pendingGenericStep.ApproverRole ?? templateApproval.ApproverRole,
                        RequestedByUserId = decision.RequestedByUserId ?? templateApproval.RequestedByUserId,
                        ApproverUserId = pendingGenericStep.AssigneeUserId ?? projectedRouting.ApproverUserId,
                        Status = "Pending",
                        Purpose = templateApproval.Purpose,
                        RequestedOn = nowUtc,
                        Amount = templateApproval.Amount,
                        Currency = string.IsNullOrWhiteSpace(templateApproval.Currency) ? "USD" : templateApproval.Currency
                    };

                    _dbContext.OpportunityApprovals.Add(nextApproval);
                    approvals.Add(nextApproval);

                    await _auditEvents.TrackAsync(
                        new AuditEventEntry(
                            OpportunityEntityType,
                            nextApproval.OpportunityId,
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
            else
            {
                existingPendingLegacy.ApproverUserId = pendingGenericStep.AssigneeUserId ?? existingPendingLegacy.ApproverUserId;
                existingPendingLegacy.ApproverRoleId = chainWorkflowSteps
                    .OrderBy(s => s.Order)
                    .FirstOrDefault(s => s.Order == pendingGenericStep.StepOrder)
                    ?.ApproverRoleId ?? existingPendingLegacy.ApproverRoleId;
                existingPendingLegacy.ApproverRole = pendingGenericStep.ApproverRole ?? existingPendingLegacy.ApproverRole;
                existingPendingLegacy.UpdatedAtUtc = nowUtc;
                existingPendingLegacy.UpdatedBy = actor.UserName;
            }
        }

        foreach (var approval in approvals.Where(a => !string.Equals(a.Status, "Rejected", StringComparison.OrdinalIgnoreCase)))
        {
            var step = genericSteps.FirstOrDefault(s => s.StepOrder == approval.StepOrder);
            if (step is null)
            {
                continue;
            }

            if (string.Equals(step.Status, "Approved", StringComparison.OrdinalIgnoreCase))
            {
                approval.Status = "Approved";
                approval.DecisionOn ??= step.CompletedAtUtc ?? nowUtc;
            }
            else if (string.Equals(step.Status, "Rejected", StringComparison.OrdinalIgnoreCase))
            {
                approval.Status = "Rejected";
                approval.DecisionOn ??= step.CompletedAtUtc ?? nowUtc;
            }
        }

        chain.TotalSteps = Math.Max(chain.TotalSteps, genericSteps.Count);
        chain.CurrentStep = pendingStepOrder ?? chain.TotalSteps;
        chain.Status = MapLegacyChainStatus(decision.Status);
        chain.CompletedOn = IsClosedDecisionStatus(decision.Status) ? (decision.CompletedAtUtc ?? nowUtc) : null;
        chain.UpdatedAtUtc = nowUtc;
        chain.UpdatedBy = actor.UserName;

        var currentLegacyPending = approvals
            .Where(a => string.Equals(a.Status, "Pending", StringComparison.OrdinalIgnoreCase))
            .OrderBy(a => a.StepOrder)
            .ThenByDescending(a => a.RequestedOn)
            .FirstOrDefault();

        decision.LegacyApprovalId = currentLegacyPending?.Id ?? actedLegacy?.Id ?? decision.LegacyApprovalId;
        decision.UpdatedAtUtc = nowUtc;
        decision.UpdatedBy = actor.UserName;

        await _dbContext.SaveChangesAsync(cancellationToken);
        await SyncWorkflowExecutionMetadataAsync(chain.Id, actor.UserName, cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
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

    private static string MapLegacyChainStatus(string? decisionStatus)
    {
        if (string.Equals(decisionStatus, "Approved", StringComparison.OrdinalIgnoreCase)) return "Approved";
        if (string.Equals(decisionStatus, "Rejected", StringComparison.OrdinalIgnoreCase)) return "Rejected";
        if (string.Equals(decisionStatus, "Cancelled", StringComparison.OrdinalIgnoreCase)) return "Cancelled";
        if (string.Equals(decisionStatus, "Expired", StringComparison.OrdinalIgnoreCase)) return "Expired";
        return "Pending";
    }

    private static bool IsClosedDecisionStatus(string? status)
    {
        return string.Equals(status, "Approved", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Rejected", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Cancelled", StringComparison.OrdinalIgnoreCase)
               || string.Equals(status, "Expired", StringComparison.OrdinalIgnoreCase);
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
                WorkflowExecutionId = approval.ApprovalChainId,
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
            decision.WorkflowExecutionId = approval.ApprovalChainId;
            decision.Status = approval.Status;
            decision.Priority = metadata.Priority;
            decision.RiskLevel = metadata.RiskLevel;
            decision.DueAtUtc = metadata.SlaDueAtUtc;
            decision.CompletedAtUtc = approval.DecisionOn;
            decision.PolicyReason = metadata.PolicyReason;
            decision.UpdatedAtUtc = nowUtc;
            decision.UpdatedBy = actor.UserName;
        }

        if (chain is not null)
        {
            chain.DecisionRequestId = decision.Id;
            chain.UpdatedAtUtc = nowUtc;
            chain.UpdatedBy = actor.UserName;
        }

        var chainSteps = chain is not null
            ? GetApprovalSteps(DeserializeExecutionPlan(chain.StepsJson))
            : new List<ApprovalWorkflowStep>();

        if (chainSteps.Count == 0)
        {
            chainSteps.Add(new ApprovalWorkflowStep(
                approval.StepOrder <= 0 ? 1 : approval.StepOrder,
                approval.ApproverRoleId,
                approval.ApproverRole,
                null,
                null,
                null,
                null));
        }

        decision.WorkflowStepNodeId = chainSteps
            .OrderBy(step => step.Order)
            .FirstOrDefault(step => step.Order == approval.StepOrder)
            ?.NodeId;
        decision.WorkflowStepOrder = approval.StepOrder;
        decision.WorkflowName = chain?.WorkflowName ?? decision.WorkflowName;
        decision.WorkflowVersion = chain?.WorkflowVersion ?? decision.WorkflowVersion;
        decision.WorkflowDealId = approval.OpportunityId;
        decision.WorkflowDealName = opportunityName ?? decision.WorkflowDealName;

        var existingDecisionSteps = await _dbContext.DecisionSteps
            .Where(s => !s.IsDeleted && s.DecisionRequestId == decision.Id)
            .ToListAsync(cancellationToken);

        foreach (var workflowStep in chainSteps.OrderBy(s => s.Order))
        {
            var isCurrent = workflowStep.Order == approval.StepOrder;
            var isEarlier = workflowStep.Order < approval.StepOrder;
            var isLater = workflowStep.Order > approval.StepOrder;

            string stepStatus;
            if (isCurrent)
            {
                stepStatus = approval.Status == "Pending" ? "Pending" : approval.Status;
            }
            else if (isEarlier)
            {
                stepStatus = "Approved";
            }
            else if (chain is not null && string.Equals(chain.Status, "Rejected", StringComparison.OrdinalIgnoreCase))
            {
                stepStatus = "Skipped";
            }
            else if (chain is not null && chain.CurrentStep == workflowStep.Order && string.Equals(chain.Status, "Pending", StringComparison.OrdinalIgnoreCase))
            {
                stepStatus = "Pending";
            }
            else
            {
                stepStatus = "Queued";
            }

            var dueAt = isCurrent ? metadata.SlaDueAtUtc : (DateTime?)null;
            var completedAt = stepStatus is "Approved" or "Rejected" or "Skipped"
                ? (isCurrent ? approval.DecisionOn : nowUtc)
                : null;

            var existingStep = existingDecisionSteps.FirstOrDefault(s => s.StepOrder == workflowStep.Order);
            if (existingStep is null)
            {
                _dbContext.DecisionSteps.Add(new DecisionStep
                {
                    DecisionRequestId = decision.Id,
                    StepOrder = workflowStep.Order,
                    StepType = "Approval",
                    Status = stepStatus,
                    ApproverRoleId = workflowStep.ApproverRoleId,
                    ApproverRole = workflowStep.ApproverRole,
                    AssigneeUserId = isCurrent ? approval.ApproverUserId : null,
                    AssigneeNameSnapshot = isCurrent ? await ResolveUserNameAsync(approval.ApproverUserId, cancellationToken) : null,
                    DueAtUtc = dueAt,
                    CompletedAtUtc = completedAt,
                    Notes = isCurrent ? approval.Notes : null
                });
            }
            else
            {
                existingStep.Status = stepStatus;
                existingStep.ApproverRoleId = workflowStep.ApproverRoleId;
                existingStep.ApproverRole = workflowStep.ApproverRole;
                existingStep.AssigneeUserId = isCurrent ? approval.ApproverUserId : existingStep.AssigneeUserId;
                existingStep.DueAtUtc = dueAt;
                existingStep.CompletedAtUtc = completedAt;
                if (isCurrent)
                {
                    existingStep.Notes = approval.Notes;
                    existingStep.AssigneeNameSnapshot = await ResolveUserNameAsync(approval.ApproverUserId, cancellationToken);
                }
                existingStep.UpdatedAtUtc = nowUtc;
                existingStep.UpdatedBy = actor.UserName;
            }
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

    private async Task NotifyApprovalRequestedAsync(
        OpportunityApproval approval,
        string? opportunityName,
        string? approverName,
        string requesterName,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return;
        }

        var title = $"Approval requested: {opportunityName ?? "Opportunity"}";
        var detail = $"{approval.Purpose} approval is waiting for {approverName ?? approval.ApproverRole}.";

        if (approval.ApproverUserId.HasValue && approval.ApproverUserId.Value != Guid.Empty)
        {
            await PublishApprovalNotificationAsync(
                tenantId,
                [approval.ApproverUserId.Value],
                title,
                detail,
                cancellationToken);

            var approverContact = await ResolveUserContactAsync(approval.ApproverUserId, cancellationToken);
            if (approverContact is not null)
            {
                await TrySendEmailAsync(
                    approverContact.Email,
                    $"Approval required: {opportunityName ?? "Opportunity"}",
                    $"""
                    <p>Hello {approverContact.FullName},</p>
                    <p>A {approval.Purpose} approval is waiting for your review on <strong>{opportunityName ?? "Opportunity"}</strong>.</p>
                    <p>Amount: {approval.Amount:0.##} {approval.Currency}<br/>Role: {approval.ApproverRole}</p>
                    """,
                    cancellationToken);
            }
        }

        if (approval.RequestedByUserId.HasValue && approval.RequestedByUserId.Value != Guid.Empty)
        {
            await PublishApprovalNotificationAsync(
                tenantId,
                [approval.RequestedByUserId.Value],
                "Approval submitted",
                $"{approval.Purpose} approval for {opportunityName ?? "Opportunity"} was submitted to {approverName ?? approval.ApproverRole}.",
                cancellationToken);
        }
    }

    private async Task NotifyApprovalDecisionAsync(
        OpportunityApproval approval,
        OpportunityApprovalDto approvalDto,
        bool approved,
        string actorName,
        CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return;
        }

        var opportunityName = await ResolveOpportunityNameAsync(approval.OpportunityId, cancellationToken) ?? "Opportunity";
        var outcome = approved ? "approved" : "rejected";
        var detail = $"{opportunityName} was {outcome} by {actorName}.";

        if (approval.RequestedByUserId.HasValue && approval.RequestedByUserId.Value != Guid.Empty)
        {
            await PublishApprovalNotificationAsync(
                tenantId,
                [approval.RequestedByUserId.Value],
                $"Approval {approval.Status.ToLowerInvariant()}",
                detail,
                cancellationToken);

            var requesterContact = await ResolveUserContactAsync(approval.RequestedByUserId, cancellationToken);
            if (requesterContact is not null)
            {
                await TrySendEmailAsync(
                    requesterContact.Email,
                    $"Approval {approval.Status}: {opportunityName}",
                    $"""
                    <p>Hello {requesterContact.FullName},</p>
                    <p>Your {approval.Purpose} approval request for <strong>{opportunityName}</strong> was <strong>{approval.Status.ToLowerInvariant()}</strong> by {actorName}.</p>
                    <p>Current status: {approvalDto.ChainStatus}</p>
                    """,
                    cancellationToken);
            }
        }
    }

    private async Task PublishApprovalNotificationAsync(
        Guid tenantId,
        IReadOnlyCollection<Guid> userIds,
        string title,
        string detail,
        CancellationToken cancellationToken)
    {
        if (userIds.Count == 0)
        {
            return;
        }

        await _realtimePublisher.PublishUsersEventAsync(
            tenantId,
            userIds,
            "notification.alert",
            new
            {
                title,
                detail,
                createdAtUtc = DateTime.UtcNow
            },
            cancellationToken);
    }

    private async Task TrySendEmailAsync(
        string? toEmail,
        string subject,
        string htmlBody,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            return;
        }

        try
        {
            if (!await _emailDeliveryPolicy.IsEnabledAsync(WorkspaceEmailDeliveryCategory.Approvals, cancellationToken))
            {
                _logger.LogInformation("Approval notification email to {ToEmail} suppressed by workspace email policy.", toEmail);
                return;
            }

            await _emailSender.SendAsync(
                toEmail.Trim(),
                subject,
                htmlBody,
                category: WorkspaceEmailDeliveryCategory.Approvals,
                cancellationToken: cancellationToken);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Approval notification email failed for {ToEmail}.", toEmail);
        }
    }

    private async Task<ApprovalWorkflowPolicy> ResolveApprovalWorkflowAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        var definition = await ResolveApprovalWorkflowDefinitionAsync(tenantId, cancellationToken);
        return DealApprovalWorkflowMapper.ToPolicy(definition);
    }

    private async Task<DealApprovalWorkflowDefinition> ResolveApprovalWorkflowDefinitionAsync(Guid tenantId, CancellationToken cancellationToken)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(string.Empty, null);
        }

        var publishedWorkflowJson = tenant.ApprovalWorkflowPublishedJson ?? tenant.ApprovalWorkflowJson;
        if (string.IsNullOrWhiteSpace(publishedWorkflowJson))
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(
                tenant.ApprovalApproverRole ?? string.Empty,
                tenant.ApprovalAmountThreshold);
        }

        try
        {
            return DealApprovalWorkflowMapper.FromStoredJson(
                publishedWorkflowJson,
                tenant.ApprovalAmountThreshold,
                tenant.ApprovalApproverRole);
        }
        catch (JsonException)
        {
            return DealApprovalWorkflowDefinition.CreateTemplate(
                tenant.ApprovalApproverRole ?? string.Empty,
                tenant.ApprovalAmountThreshold);
        }
    }

    private async Task<WorkflowExecutionPlan> BuildExecutionPlanAsync(
        DealApprovalWorkflowDefinition definition,
        Opportunity opportunity,
        string purpose,
        decimal amount,
        CancellationToken cancellationToken)
    {
        var normalized = DealApprovalWorkflowMapper.Normalize(definition);
        var nodesById = normalized.Nodes
            .Where(node => !string.IsNullOrWhiteSpace(node.Id))
            .ToDictionary(node => node.Id.Trim(), node => node, StringComparer.OrdinalIgnoreCase);
        var outgoing = normalized.Connections
            .Where(connection => !string.IsNullOrWhiteSpace(connection.Source) && !string.IsNullOrWhiteSpace(connection.Target))
            .GroupBy(connection => connection.Source.Trim(), StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.ToList(), StringComparer.OrdinalIgnoreCase);
        var approvalSteps = normalized.Steps
            .Where(step =>
                (string.IsNullOrWhiteSpace(step.Purpose) || string.Equals(step.Purpose, purpose, StringComparison.OrdinalIgnoreCase)) &&
                (!step.AmountThreshold.HasValue || amount >= step.AmountThreshold.Value))
            .OrderBy(step => step.Order)
            .ToDictionary(step => step.NodeId ?? $"approval-step-{step.Order}", step => step, StringComparer.OrdinalIgnoreCase);

        var start = normalized.Nodes.FirstOrDefault(node => string.Equals(node.Type, "start", StringComparison.OrdinalIgnoreCase));
        if (start is null)
        {
            return new WorkflowExecutionPlan(Array.Empty<WorkflowExecutionPlanItem>());
        }

        var stageName = await ResolveStageNameAsync(opportunity.StageId, cancellationToken);
        var state = new WorkflowRuntimeState(
            Amount: amount,
            Purpose: purpose,
            Stage: stageName,
            ForecastCategory: opportunity.ForecastCategory,
            IsClosed: opportunity.IsClosed,
            IsWon: opportunity.IsWon);

        var items = new List<WorkflowExecutionPlanItem>();
        var current = start;
        var visited = new HashSet<string>(StringComparer.OrdinalIgnoreCase) { start.Id };
        var sequence = 1;

        while (sequence <= 100)
        {
            if (!outgoing.TryGetValue(current.Id, out var candidates) || candidates.Count == 0)
            {
                break;
            }

            var selectedConnection = SelectNextConnection(current, candidates, state);
            if (selectedConnection is null || !nodesById.TryGetValue(selectedConnection.Target, out var nextNode))
            {
                break;
            }

            if (!visited.Add(nextNode.Id) && !string.Equals(nextNode.Type, "end", StringComparison.OrdinalIgnoreCase))
            {
                break;
            }

            var normalizedType = nextNode.Type.Trim();
            switch (normalizedType)
            {
                case "approval":
                    if (approvalSteps.TryGetValue(nextNode.Id, out var approvalStep))
                    {
                        items.Add(new WorkflowExecutionPlanItem(
                            sequence++,
                            nextNode.Id,
                            normalizedType,
                            new ApprovalWorkflowStep(
                                approvalStep.Order,
                                approvalStep.ApproverRoleId,
                                approvalStep.ApproverRole,
                                approvalStep.MinimumSecurityLevelId,
                                approvalStep.AmountThreshold,
                                approvalStep.Purpose,
                                approvalStep.NodeId),
                            nextNode.Config));
                    }
                    break;

                case "crm-update":
                    items.Add(new WorkflowExecutionPlanItem(sequence++, nextNode.Id, normalizedType, null, nextNode.Config));
                    state = ApplyCrmUpdateToState(state, nextNode.Config?.CrmUpdate);
                    break;

                case "activity":
                    items.Add(new WorkflowExecutionPlanItem(sequence++, nextNode.Id, normalizedType, null, nextNode.Config));
                    break;

                case "condition":
                    break;

                case "notification":
                case "delay":
                case "email":
                    items.Add(new WorkflowExecutionPlanItem(sequence++, nextNode.Id, normalizedType, null, nextNode.Config));
                    break;

                case "end":
                    return new WorkflowExecutionPlan(items);
            }

            current = nextNode;
        }

        return new WorkflowExecutionPlan(items);
    }

    private async Task<WorkflowContinuationResult> ExecutePlanUntilNextApprovalAsync(
        WorkflowExecutionPlan plan,
        int? approvalStepOrder,
        Opportunity opportunity,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var items = plan.Items.OrderBy(item => item.Sequence).ToList();
        var startIndex = 0;
        if (approvalStepOrder.HasValue)
        {
            startIndex = items.FindIndex(item => item.ApprovalStep?.Order == approvalStepOrder.Value);
            startIndex = startIndex < 0 ? items.Count : startIndex + 1;
        }

        for (var index = startIndex; index < items.Count; index++)
        {
            var item = items[index];
            if (item.ApprovalStep is not null)
            {
                return WorkflowContinuationResult.Next(item.ApprovalStep);
            }

            switch (item.NodeType)
            {
                case "crm-update":
                {
                    var error = await ExecuteCrmUpdateNodeAsync(opportunity, item.Config?.CrmUpdate, actor, cancellationToken);
                    if (error is not null)
                    {
                        return WorkflowContinuationResult.Fail(error);
                    }

                    break;
                }

                case "activity":
                {
                    var nextApproval = items.Skip(index + 1).Select(candidate => candidate.ApprovalStep).FirstOrDefault(step => step is not null);
                    var error = await ExecuteActivityNodeAsync(opportunity, item.Config?.Activity, nextApproval, actor, cancellationToken);
                    if (error is not null)
                    {
                        return WorkflowContinuationResult.Fail(error);
                    }

                    break;
                }

                case "notification":
                {
                    var nextApproval = items.Skip(index + 1).Select(candidate => candidate.ApprovalStep).FirstOrDefault(step => step is not null);
                    var error = await ExecuteNotificationNodeAsync(opportunity, item.Config?.Notification, nextApproval, actor, cancellationToken);
                    if (error is not null)
                    {
                        return WorkflowContinuationResult.Fail(error);
                    }

                    break;
                }

                case "email":
                {
                    var nextApproval = items.Skip(index + 1).Select(candidate => candidate.ApprovalStep).FirstOrDefault(step => step is not null);
                    var error = await ExecuteEmailNodeAsync(opportunity, item.Config?.Email, nextApproval, actor, cancellationToken);
                    if (error is not null)
                    {
                        return WorkflowContinuationResult.Fail(error);
                    }

                    break;
                }

                case "delay":
                {
                    var resumeAt = ComputeDelayResumeTime(item.Config?.Delay);
                    if (resumeAt > DateTime.UtcNow)
                    {
                        var chain = await _dbContext.OpportunityApprovalChains
                            .FirstOrDefaultAsync(c => c.OpportunityId == opportunity.Id && c.Status == "Pending", cancellationToken);

                        if (chain is not null)
                        {
                            var planJson = System.Text.Json.JsonSerializer.Serialize(
                                plan.Items,
                                new System.Text.Json.JsonSerializerOptions { PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase });

                            _dbContext.Set<Domain.Entities.PendingWorkflowDelay>().Add(new Domain.Entities.PendingWorkflowDelay
                            {
                                OpportunityId = opportunity.Id,
                                ApprovalChainId = chain.Id,
                                ResumeFromSequence = item.Sequence + 1,
                                ApprovalStepOrder = items.Take(index).LastOrDefault(i => i.ApprovalStep is not null)?.ApprovalStep?.Order,
                                NodeId = item.NodeId,
                                ResumeAfterUtc = resumeAt,
                                ExecutionPlanJson = planJson,
                                RequestedByUserId = actor.UserId
                            });
                            await _dbContext.SaveChangesAsync(cancellationToken);

                            _logger.LogInformation(
                                "Workflow delay node {NodeId} for opportunity {OpportunityId}: pausing until {ResumeAt}",
                                item.NodeId, opportunity.Id, resumeAt);
                        }

                        return WorkflowContinuationResult.Delayed(item.Sequence + 1);
                    }

                    break;
                }
            }
        }

        return WorkflowContinuationResult.Complete();
    }

    private async Task<string?> ExecuteCrmUpdateNodeAsync(
        Opportunity opportunity,
        DealApprovalWorkflowCrmUpdateConfigDefinition? config,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var field = config?.Field?.Trim();
        var value = config?.Value?.Trim();
        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        if (string.Equals(field, "stage", StringComparison.OrdinalIgnoreCase))
        {
            var stage = await _dbContext.OpportunityStages
                .FirstOrDefaultAsync(item => !item.IsDeleted && item.Name == value, cancellationToken);
            if (stage is null)
            {
                return $"Workflow CRM update could not find opportunity stage '{value}'.";
            }

            if (opportunity.StageId != stage.Id)
            {
                var previousStageId = opportunity.StageId;
                opportunity.StageId = stage.Id;
                opportunity.UpdatedAtUtc = DateTime.UtcNow;
                opportunity.UpdatedBy = actor.UserName;

                _dbContext.OpportunityStageHistories.Add(new OpportunityStageHistory
                {
                    OpportunityId = opportunity.Id,
                    OpportunityStageId = stage.Id,
                    ChangedAtUtc = DateTime.UtcNow,
                    ChangedBy = actor.UserName ?? SystemActor,
                    Notes = "Workflow CRM update"
                });

                await _auditEvents.TrackAsync(
                    new AuditEventEntry(
                        OpportunityEntityType,
                        opportunity.Id,
                        "WorkflowCrmUpdate",
                        "StageId",
                        previousStageId.ToString(),
                        stage.Id.ToString(),
                        actor.UserId,
                        actor.UserName),
                    cancellationToken);
            }

            return null;
        }

        if (string.Equals(field, "forecastCategory", StringComparison.OrdinalIgnoreCase))
        {
            var previous = opportunity.ForecastCategory;
            opportunity.ForecastCategory = value;
            opportunity.UpdatedAtUtc = DateTime.UtcNow;
            opportunity.UpdatedBy = actor.UserName;

            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    OpportunityEntityType,
                    opportunity.Id,
                    "WorkflowCrmUpdate",
                    "ForecastCategory",
                    previous,
                    value,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);

            return null;
        }

        if (string.Equals(field, "status", StringComparison.OrdinalIgnoreCase))
        {
            var previous = opportunity.IsClosed
                ? (opportunity.IsWon ? "Closed Won" : "Closed Lost")
                : "Open";
            var normalized = value.Trim();
            if (normalized.Equals("Open", StringComparison.OrdinalIgnoreCase))
            {
                opportunity.IsClosed = false;
                opportunity.IsWon = false;
            }
            else if (normalized.Equals("Closed Won", StringComparison.OrdinalIgnoreCase))
            {
                opportunity.IsClosed = true;
                opportunity.IsWon = true;
            }
            else if (normalized.Equals("Closed Lost", StringComparison.OrdinalIgnoreCase))
            {
                opportunity.IsClosed = true;
                opportunity.IsWon = false;
            }
            else
            {
                return $"Workflow CRM update does not support opportunity status '{value}'.";
            }

            opportunity.UpdatedAtUtc = DateTime.UtcNow;
            opportunity.UpdatedBy = actor.UserName;

            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    OpportunityEntityType,
                    opportunity.Id,
                    "WorkflowCrmUpdate",
                    "Status",
                    previous,
                    normalized,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
        }

        return null;
    }

    private async Task<string?> ExecuteActivityNodeAsync(
        Opportunity opportunity,
        DealApprovalWorkflowActivityConfigDefinition? config,
        ApprovalWorkflowStep? upcomingApproval,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        if (config is null || string.IsNullOrWhiteSpace(config.Subject))
        {
            return null;
        }

        var ownerId = await ResolveWorkflowActivityOwnerIdAsync(opportunity, config.OwnerStrategy, upcomingApproval, actor, cancellationToken);
        var activityType = Enum.TryParse<ActivityType>(config.ActivityType, true, out var parsedType)
            ? parsedType
            : ActivityType.Task;

        var activity = new Activity
        {
            Subject = config.Subject.Trim(),
            Description = "Generated from workflow builder execution.",
            Type = activityType,
            RelatedEntityType = ActivityRelationType.Opportunity,
            RelatedEntityId = opportunity.Id,
            OwnerId = ownerId,
            DueDateUtc = config.DueInHours.HasValue && config.DueInHours.Value > 0
                ? DateTime.UtcNow.AddHours(config.DueInHours.Value)
                : null,
            Priority = "Medium",
            TemplateKey = "workflow-builder",
            CreatedAtUtc = DateTime.UtcNow,
            UpdatedAtUtc = DateTime.UtcNow,
            UpdatedBy = actor.UserName
        };

        _dbContext.Activities.Add(activity);
        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                OpportunityEntityType,
                opportunity.Id,
                "WorkflowActivityCreated",
                "Activity",
                null,
                activity.Subject,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        return null;
    }

    private async Task<string?> ExecuteNotificationNodeAsync(
        Opportunity opportunity,
        DealApprovalWorkflowNotificationConfigDefinition? config,
        ApprovalWorkflowStep? upcomingApproval,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var channel = config?.Channel?.Trim();
        var audience = config?.Audience?.Trim();
        if (string.IsNullOrWhiteSpace(channel) || string.IsNullOrWhiteSpace(audience))
        {
            return null;
        }

        var targetUserIds = await ResolveNotificationAudienceAsync(opportunity, audience, upcomingApproval, cancellationToken);
        if (targetUserIds.Count == 0)
        {
            return null;
        }

        var title = BuildWorkflowNotificationTitle(channel, opportunity.Name);
        var detail = string.IsNullOrWhiteSpace(config?.Message)
            ? $"Workflow action triggered for {opportunity.Name}."
            : config!.Message!.Trim();

        if (channel.Equals("in-app", StringComparison.OrdinalIgnoreCase)
            || channel.Equals("signalr", StringComparison.OrdinalIgnoreCase)
            || channel.Equals("email-digest", StringComparison.OrdinalIgnoreCase))
        {
            await _realtimePublisher.PublishUsersEventAsync(
                _tenantProvider.TenantId,
                targetUserIds,
                "notification.alert",
                new
                {
                    title,
                    detail,
                    entityType = OpportunityEntityType,
                    entityId = opportunity.Id,
                    createdAtUtc = DateTime.UtcNow,
                    source = "workflow-builder"
                },
                cancellationToken);

            await _auditEvents.TrackAsync(
                new AuditEventEntry(
                    OpportunityEntityType,
                    opportunity.Id,
                    "WorkflowNotificationSent",
                    "NotificationAudience",
                    null,
                    audience,
                    actor.UserId,
                    actor.UserName),
                cancellationToken);
        }

        return null;
    }

    private async Task<string?> ExecuteEmailNodeAsync(
        Opportunity opportunity,
        DealApprovalWorkflowEmailConfigDefinition? config,
        ApprovalWorkflowStep? upcomingApproval,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var recipientType = config?.RecipientType?.Trim();
        if (string.IsNullOrWhiteSpace(recipientType))
        {
            return null;
        }

        var subject = string.IsNullOrWhiteSpace(config?.Subject)
            ? $"Workflow notification: {opportunity.Name}"
            : config!.Subject!.Trim();

        var targetUserIds = await ResolveNotificationAudienceAsync(opportunity, recipientType, upcomingApproval, cancellationToken);
        if (targetUserIds.Count == 0)
        {
            _logger.LogWarning("Email node skipped: no recipients resolved for audience '{Audience}' on opportunity {OpportunityId}.", recipientType, opportunity.Id);
            return null;
        }

        var htmlBody = BuildWorkflowEmailBody(config?.Template, subject, opportunity.Name);

        foreach (var userId in targetUserIds)
        {
            var contact = await ResolveUserContactAsync(userId, cancellationToken);
            if (contact is not null)
            {
                await TrySendEmailAsync(contact.Email, subject, htmlBody, cancellationToken);
            }
        }

        await _auditEvents.TrackAsync(
            new AuditEventEntry(
                OpportunityEntityType,
                opportunity.Id,
                "WorkflowEmailSent",
                "EmailRecipientType",
                null,
                recipientType,
                actor.UserId,
                actor.UserName),
            cancellationToken);

        return null;
    }

    private static string BuildWorkflowEmailBody(string? template, string subject, string? opportunityName)
    {
        if (!string.IsNullOrWhiteSpace(template))
        {
            return template
                .Replace("{{subject}}", subject)
                .Replace("{{opportunityName}}", opportunityName ?? "Opportunity");
        }

        return $"""
            <p><strong>{subject}</strong></p>
            <p>A workflow action has been triggered for <strong>{opportunityName ?? "Opportunity"}</strong>.</p>
            """;
    }

    private static DateTime ComputeDelayResumeTime(DealApprovalWorkflowDelayConfigDefinition? config)
    {
        if (config is null || !config.Duration.HasValue || config.Duration.Value <= 0)
        {
            return DateTime.UtcNow;
        }

        var duration = config.Unit?.ToLowerInvariant() switch
        {
            "minutes" => TimeSpan.FromMinutes(config.Duration.Value),
            "hours" => TimeSpan.FromHours(config.Duration.Value),
            "days" => TimeSpan.FromDays(config.Duration.Value),
            _ => TimeSpan.FromHours(config.Duration.Value)
        };

        return DateTime.UtcNow.Add(duration);
    }

    private async Task<Guid> ResolveWorkflowActivityOwnerIdAsync(
        Opportunity opportunity,
        string? ownerStrategy,
        ApprovalWorkflowStep? upcomingApproval,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        if (string.Equals(ownerStrategy, "approver", StringComparison.OrdinalIgnoreCase) && upcomingApproval is not null)
        {
            var routing = await ResolveApprovalRoutingAsync(upcomingApproval, cancellationToken);
            if (routing.Success && routing.ApproverUserId.HasValue && routing.ApproverUserId.Value != Guid.Empty)
            {
                return routing.ApproverUserId.Value;
            }
        }

        if (string.Equals(ownerStrategy, "manager", StringComparison.OrdinalIgnoreCase))
        {
            var managerRole = await _dbContext.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(role => !role.IsDeleted && role.Name == "Sales Manager", cancellationToken);
            if (managerRole is not null)
            {
                var managerUserId = await _dbContext.UserRoles
                    .AsNoTracking()
                    .Where(mapping => mapping.RoleId == managerRole.Id)
                    .Select(mapping => mapping.UserId)
                    .FirstOrDefaultAsync(cancellationToken);
                if (managerUserId != Guid.Empty)
                {
                    return managerUserId;
                }
            }
        }

        return opportunity.OwnerId != Guid.Empty
            ? opportunity.OwnerId
            : actor.UserId.GetValueOrDefault();
    }

    private async Task<IReadOnlyCollection<Guid>> ResolveNotificationAudienceAsync(
        Opportunity opportunity,
        string audience,
        ApprovalWorkflowStep? upcomingApproval,
        CancellationToken cancellationToken)
    {
        if (audience.Equals("owner", StringComparison.OrdinalIgnoreCase) && opportunity.OwnerId != Guid.Empty)
        {
            return new[] { opportunity.OwnerId };
        }

        if (audience.Equals("approver-role", StringComparison.OrdinalIgnoreCase) && upcomingApproval is not null)
        {
            var routing = await ResolveApprovalRoutingAsync(upcomingApproval, cancellationToken);
            if (routing.Success && routing.ApproverUserId.HasValue && routing.ApproverUserId.Value != Guid.Empty)
            {
                return new[] { routing.ApproverUserId.Value };
            }

            return Array.Empty<Guid>();
        }

        if (audience.Equals("revenue-ops", StringComparison.OrdinalIgnoreCase))
        {
            var roleIds = await _dbContext.Roles
                .AsNoTracking()
                .Where(role => !role.IsDeleted
                               && (role.Name == "Revenue Ops" || role.Name == "Sales Manager"))
                .Select(role => role.Id)
                .ToListAsync(cancellationToken);

            if (roleIds.Count == 0)
            {
                return Array.Empty<Guid>();
            }

            return await _dbContext.UserRoles
                .AsNoTracking()
                .Where(mapping => roleIds.Contains(mapping.RoleId) && !mapping.IsDeleted)
                .Select(mapping => mapping.UserId)
                .Distinct()
                .Where(userId => userId != Guid.Empty)
                .ToListAsync(cancellationToken);
        }

        return Array.Empty<Guid>();
    }

    private static string BuildWorkflowNotificationTitle(string channel, string opportunityName)
    {
        return channel.Equals("email-digest", StringComparison.OrdinalIgnoreCase)
            ? $"Workflow digest update for {opportunityName}"
            : $"Workflow notification for {opportunityName}";
    }

    private static WorkflowRuntimeState ApplyCrmUpdateToState(
        WorkflowRuntimeState state,
        DealApprovalWorkflowCrmUpdateConfigDefinition? config)
    {
        var field = config?.Field?.Trim();
        var value = config?.Value?.Trim();
        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(value))
        {
            return state;
        }

        if (string.Equals(field, "stage", StringComparison.OrdinalIgnoreCase))
        {
            return state with { Stage = value };
        }

        if (string.Equals(field, "forecastCategory", StringComparison.OrdinalIgnoreCase))
        {
            return state with { ForecastCategory = value };
        }

        if (string.Equals(field, "status", StringComparison.OrdinalIgnoreCase))
        {
            return value.Equals("Closed Won", StringComparison.OrdinalIgnoreCase)
                ? state with { IsClosed = true, IsWon = true }
                : value.Equals("Closed Lost", StringComparison.OrdinalIgnoreCase)
                    ? state with { IsClosed = true, IsWon = false }
                    : value.Equals("Open", StringComparison.OrdinalIgnoreCase)
                        ? state with { IsClosed = false, IsWon = false }
                        : state;
        }

        return state;
    }

    private static DealApprovalWorkflowConnectionDefinition? SelectNextConnection(
        DealApprovalWorkflowNodeDefinition currentNode,
        IReadOnlyList<DealApprovalWorkflowConnectionDefinition> candidates,
        WorkflowRuntimeState state)
    {
        if (!string.Equals(currentNode.Type, "condition", StringComparison.OrdinalIgnoreCase))
        {
            return candidates.FirstOrDefault();
        }

        var condition = currentNode.Config?.Condition;
        var result = EvaluateCondition(condition, state);
        if (result is null)
        {
            return candidates.FirstOrDefault();
        }

        var preferred = result.Value
            ? candidates.FirstOrDefault(connection => MatchesBranch(connection, "yes", "true", "approved", "match"))
            : candidates.FirstOrDefault(connection => MatchesBranch(connection, "no", "false", "rejected", "else", "default"));

        if (preferred is not null)
        {
            return preferred;
        }

        return result.Value
            ? candidates.FirstOrDefault()
            : candidates.Skip(1).FirstOrDefault() ?? candidates.FirstOrDefault();
    }

    private static bool? EvaluateCondition(DealApprovalWorkflowConditionConfigDefinition? condition, WorkflowRuntimeState state)
    {
        var field = condition?.Field?.Trim();
        var op = condition?.Operator?.Trim();
        var value = condition?.Value?.Trim();
        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(op))
        {
            return null;
        }

        if (string.Equals(field, "amount", StringComparison.OrdinalIgnoreCase) && decimal.TryParse(value, out var decimalValue))
        {
            return op switch
            {
                "gt" => state.Amount > decimalValue,
                "lt" => state.Amount < decimalValue,
                "equals" => state.Amount == decimalValue,
                _ => null
            };
        }

        var actual = string.Equals(field, "purpose", StringComparison.OrdinalIgnoreCase) ? state.Purpose
            : string.Equals(field, "stage", StringComparison.OrdinalIgnoreCase) ? state.Stage
            : string.Equals(field, "status", StringComparison.OrdinalIgnoreCase)
                ? (state.IsClosed ? (state.IsWon ? "Closed Won" : "Closed Lost") : "Open")
            : string.Equals(field, "forecastCategory", StringComparison.OrdinalIgnoreCase) ? state.ForecastCategory
            : null;

        if (actual is null)
        {
            return null;
        }

        return op switch
        {
            "equals" => string.Equals(actual, value, StringComparison.OrdinalIgnoreCase),
            "contains" => !string.IsNullOrWhiteSpace(value) && actual.Contains(value, StringComparison.OrdinalIgnoreCase),
            _ => null
        };
    }

    private static bool MatchesBranch(DealApprovalWorkflowConnectionDefinition connection, params string[] values)
    {
        var label = connection.Label?.Trim();
        var key = connection.BranchKey?.Trim();
        return values.Any(value =>
            string.Equals(label, value, StringComparison.OrdinalIgnoreCase)
            || string.Equals(key, value, StringComparison.OrdinalIgnoreCase));
    }

    private List<ApprovalWorkflowStep> GetApprovalSteps(WorkflowExecutionPlan? plan)
    {
        return plan?.Items
            .Where(item => item.ApprovalStep is not null)
            .Select(item => item.ApprovalStep!)
            .OrderBy(step => step.Order)
            .ToList() ?? new List<ApprovalWorkflowStep>();
    }

    private WorkflowExecutionPlan? DeserializeExecutionPlan(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return null;
        }

        try
        {
            var plan = JsonSerializer.Deserialize<WorkflowExecutionPlan>(json, JsonOptions);
            if (plan?.Items is not null)
            {
                return plan;
            }
        }
        catch (JsonException)
        {
        }

        try
        {
            var steps = JsonSerializer.Deserialize<List<ApprovalWorkflowStep>>(json, JsonOptions) ?? new List<ApprovalWorkflowStep>();
            return new WorkflowExecutionPlan(
                steps.OrderBy(step => step.Order)
                    .Select((step, index) => new WorkflowExecutionPlanItem(index + 1, step.NodeId ?? $"approval-step-{step.Order}", "approval", step, null))
                    .ToArray());
        }
        catch (JsonException)
        {
            return null;
        }
    }

    private WorkflowExecutionPlan CreateLegacyExecutionPlan(OpportunityApprovalChain chain)
    {
        return DeserializeExecutionPlan(chain.StepsJson)
            ?? new WorkflowExecutionPlan(Array.Empty<WorkflowExecutionPlanItem>());
    }

    private async Task<string?> ResolveStageNameAsync(Guid stageId, CancellationToken cancellationToken)
    {
        if (stageId == Guid.Empty)
        {
            return null;
        }

        return await _dbContext.OpportunityStages
            .AsNoTracking()
            .Where(stage => stage.Id == stageId && !stage.IsDeleted)
            .Select(stage => stage.Name)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task SyncWorkflowExecutionMetadataAsync(Guid chainId, string? actorName, CancellationToken cancellationToken)
    {
        var chain = await _dbContext.OpportunityApprovalChains
            .FirstOrDefaultAsync(item => item.Id == chainId && !item.IsDeleted, cancellationToken);
        if (chain is null)
        {
            return;
        }

        var pendingApproval = await _dbContext.OpportunityApprovals
            .Where(approval => !approval.IsDeleted
                               && approval.ApprovalChainId == chain.Id
                               && approval.Status == "Pending")
            .OrderBy(approval => approval.StepOrder)
            .ThenByDescending(approval => approval.RequestedOn)
            .FirstOrDefaultAsync(cancellationToken);

        chain.CurrentStep = pendingApproval?.StepOrder ?? Math.Max(chain.CurrentStep, chain.TotalSteps);
        chain.CompletedOn = string.Equals(chain.Status, "Pending", StringComparison.OrdinalIgnoreCase)
            ? null
            : chain.CompletedOn ?? DateTime.UtcNow;
        chain.UpdatedAtUtc = DateTime.UtcNow;
        chain.UpdatedBy = actorName;
    }

    private async Task<ApprovalRoutingResolution> ResolveApprovalRoutingAsync(
        ApprovalWorkflowStep step,
        CancellationToken cancellationToken)
    {
        var roleQuery = _dbContext.Roles
            .AsNoTracking()
            .Include(role => role.SecurityLevel)
            .Where(role => !role.IsDeleted);

        Domain.Entities.Role? role = null;
        if (step.ApproverRoleId.HasValue && step.ApproverRoleId.Value != Guid.Empty)
        {
            role = await roleQuery.FirstOrDefaultAsync(candidate => candidate.Id == step.ApproverRoleId.Value, cancellationToken);
        }

        if (role is null && !string.IsNullOrWhiteSpace(step.ApproverRole))
        {
            var roleName = step.ApproverRole.Trim();
            role = await roleQuery.FirstOrDefaultAsync(candidate => candidate.Name == roleName, cancellationToken);
        }

        if (role is null)
        {
            return ApprovalRoutingResolution.Fail($"Approver role '{step.ApproverRole}' is not configured in this workspace.");
        }

        SecurityLevelDefinition? minimumSecurityLevel = null;
        if (step.MinimumSecurityLevelId.HasValue && step.MinimumSecurityLevelId.Value != Guid.Empty)
        {
            minimumSecurityLevel = await _dbContext.SecurityLevelDefinitions
                .AsNoTracking()
                .FirstOrDefaultAsync(level => level.Id == step.MinimumSecurityLevelId.Value && !level.IsDeleted, cancellationToken);

            if (minimumSecurityLevel is null)
            {
                return ApprovalRoutingResolution.Fail("Minimum security level on the approval step is not configured in this workspace.");
            }
        }

        if (minimumSecurityLevel is not null && (role.SecurityLevel is null || role.SecurityLevel.Rank < minimumSecurityLevel.Rank))
        {
            return ApprovalRoutingResolution.Fail(
                $"Approver role '{role.Name}' does not meet minimum security level '{minimumSecurityLevel.Name}'.");
        }

        var assignee = await (
                from userRole in _dbContext.UserRoles.AsNoTracking()
                join user in _dbContext.Users.AsNoTracking() on userRole.UserId equals user.Id
                join assignedRole in _dbContext.Roles.AsNoTracking().Include(item => item.SecurityLevel) on userRole.RoleId equals assignedRole.Id
                where !userRole.IsDeleted
                      && !user.IsDeleted
                      && user.IsActive
                      && userRole.RoleId == role.Id
                      && (minimumSecurityLevel == null
                          || (assignedRole.SecurityLevel != null && assignedRole.SecurityLevel.Rank >= minimumSecurityLevel.Rank))
                orderby user.FullName, user.Email
                select new { user.Id, user.FullName })
            .FirstOrDefaultAsync(cancellationToken);

        if (assignee is null)
        {
            return ApprovalRoutingResolution.Fail(
                minimumSecurityLevel is null
                    ? $"No active users are assigned to approver role '{role.Name}'."
                    : $"No active users assigned to role '{role.Name}' meet minimum security level '{minimumSecurityLevel.Name}'.");
        }

        return ApprovalRoutingResolution.Ok(role.Id, role.Name, assignee.Id, assignee.FullName);
    }

    private async Task<string?> ResolveUserNameAsync(Guid? userId, CancellationToken cancellationToken)
    {
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return null;
        }

        return await _dbContext.Users
            .AsNoTracking()
            .Where(user => user.Id == userId.Value && !user.IsDeleted)
            .Select(user => user.FullName)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<UserContact?> ResolveUserContactAsync(Guid? userId, CancellationToken cancellationToken)
    {
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return null;
        }

        return await _dbContext.Users
            .AsNoTracking()
            .Where(user => user.Id == userId.Value && !user.IsDeleted && user.IsActive)
            .Select(user => new UserContact(user.Id, user.FullName, user.Email))
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<string?> ResolveOpportunityNameAsync(Guid opportunityId, CancellationToken cancellationToken)
    {
        return await _dbContext.Opportunities
            .AsNoTracking()
            .Where(opportunity => opportunity.Id == opportunityId && !opportunity.IsDeleted)
            .Select(opportunity => opportunity.Name)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<bool> IsApproverAsync(Guid? userId, Guid? approverRoleId, string approverRole, Guid? minimumSecurityLevelId, CancellationToken cancellationToken)
    {
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return false;
        }

        var minimumRank = minimumSecurityLevelId.HasValue && minimumSecurityLevelId.Value != Guid.Empty
            ? await _dbContext.SecurityLevelDefinitions
                .AsNoTracking()
                .Where(level => level.Id == minimumSecurityLevelId.Value && !level.IsDeleted)
                .Select(level => (int?)level.Rank)
                .FirstOrDefaultAsync(cancellationToken)
            : null;

        return await _dbContext.UserRoles
            .Include(ur => ur.Role)
            .ThenInclude(role => role!.SecurityLevel)
            .AnyAsync(
                ur => ur.UserId == userId.Value &&
                      !ur.IsDeleted &&
                      ur.Role != null &&
                      (
                          (approverRoleId.HasValue && approverRoleId.Value != Guid.Empty && ur.RoleId == approverRoleId.Value) ||
                          ur.Role.Name == approverRole
                      ) &&
                      (!minimumRank.HasValue || (ur.Role.SecurityLevel != null && ur.Role.SecurityLevel.Rank >= minimumRank.Value)),
                cancellationToken);
    }

    private sealed record ApprovalRoutingResolution(
        bool Success,
        Guid? RoleId,
        string RoleName,
        Guid? ApproverUserId,
        string? ApproverName,
        string? Error)
    {
        public static ApprovalRoutingResolution Ok(Guid roleId, string roleName, Guid approverUserId, string? approverName) =>
            new(true, roleId, roleName, approverUserId, approverName, null);

        public static ApprovalRoutingResolution Fail(string error) =>
            new(false, null, string.Empty, null, null, error);
    }

    private sealed record WorkflowExecutionPlan(IReadOnlyList<WorkflowExecutionPlanItem> Items);

    private sealed record WorkflowExecutionPlanItem(
        int Sequence,
        string NodeId,
        string NodeType,
        ApprovalWorkflowStep? ApprovalStep,
        DealApprovalWorkflowNodeConfigDefinition? Config);

    private sealed record WorkflowRuntimeState(
        decimal Amount,
        string Purpose,
        string? Stage,
        string? ForecastCategory,
        bool IsClosed,
        bool IsWon);

    private sealed record WorkflowContinuationResult(ApprovalWorkflowStep? NextApprovalStep, string? Error, bool IsDelayed = false, int DelayResumeSequence = 0)
    {
        public static WorkflowContinuationResult Next(ApprovalWorkflowStep step) => new(step, null);
        public static WorkflowContinuationResult Complete() => new(null, null);
        public static WorkflowContinuationResult Fail(string error) => new(null, error);
        public static WorkflowContinuationResult Delayed(int resumeSequence) => new(null, null, IsDelayed: true, DelayResumeSequence: resumeSequence);
    }

    private sealed record UserContact(Guid Id, string FullName, string Email);

    public async Task ResumeAfterDelayAsync(
        Guid opportunityId,
        Guid approvalChainId,
        string executionPlanJson,
        int resumeFromSequence,
        Guid? requestedByUserId,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            _logger.LogWarning("ResumeAfterDelay: Opportunity {Id} not found.", opportunityId);
            return;
        }

        var chain = await _dbContext.OpportunityApprovalChains
            .FirstOrDefaultAsync(c => c.Id == approvalChainId, cancellationToken);
        if (chain is null || chain.Status is "Approved" or "Rejected")
        {
            return;
        }

        WorkflowExecutionPlan? plan = null;
        try
        {
            plan = JsonSerializer.Deserialize<WorkflowExecutionPlan>(executionPlanJson, JsonOptions);
        }
        catch
        {
            _logger.LogWarning("ResumeAfterDelay: Failed to deserialize execution plan for chain {ChainId}.", approvalChainId);
            return;
        }

        if (plan is null)
        {
            return;
        }

        var user = requestedByUserId.HasValue
            ? await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == requestedByUserId.Value, cancellationToken)
            : null;

        var actor = new ActorContext(
            requestedByUserId ?? Guid.Empty,
            user?.FullName ?? "System");

        var filteredItems = plan.Items
            .Where(i => i.Sequence >= resumeFromSequence)
            .OrderBy(i => i.Sequence)
            .ToList();

        var resumePlan = new WorkflowExecutionPlan(filteredItems);

        var continuation = await ExecutePlanUntilNextApprovalAsync(
            resumePlan,
            approvalStepOrder: null,
            opportunity,
            actor,
            cancellationToken);

        if (continuation.Error is not null)
        {
            _logger.LogWarning("ResumeAfterDelay: Error continuing workflow for {OpportunityId}: {Error}",
                opportunityId, continuation.Error);
            return;
        }

        if (continuation.IsDelayed)
        {
            chain.Status = "Delayed";
            await _dbContext.SaveChangesAsync(cancellationToken);
            return;
        }

        var nextStep = continuation.NextApprovalStep;
        if (nextStep is null)
        {
            chain.Status = "Approved";
            chain.CompletedOn = DateTime.UtcNow;
        }
        else
        {
            chain.Status = "Pending";
            chain.CurrentStep = nextStep.Order;

            var routing = await ResolveApprovalRoutingAsync(nextStep, cancellationToken);
            if (routing.Success)
            {
                var nextApproval = new OpportunityApproval
                {
                    OpportunityId = opportunityId,
                    ApprovalChainId = chain.Id,
                    StepOrder = nextStep.Order,
                    ApproverRoleId = routing.RoleId,
                    ApproverRole = routing.RoleName,
                    ApproverUserId = routing.ApproverUserId,
                    RequestedByUserId = requestedByUserId,
                    Status = "Pending",
                    RequestedOn = DateTime.UtcNow
                };

                _dbContext.OpportunityApprovals.Add(nextApproval);
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
