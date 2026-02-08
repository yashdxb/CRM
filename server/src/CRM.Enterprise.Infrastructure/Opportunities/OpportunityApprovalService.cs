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

        return approvals.Select(item =>
        {
            chains.TryGetValue(item.approval.ApprovalChainId ?? Guid.Empty, out var chain);
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
                item.approval.Currency);
        }).ToList();
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
