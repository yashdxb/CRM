using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Approvals;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityApprovalService : IOpportunityApprovalService
{
    private const string OpportunityEntityType = "Opportunity";
    private const string ApprovalEntityType = "OpportunityApproval";
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

        return items.Select(a => new OpportunityApprovalDto(
            a.Id,
            a.OpportunityId,
            a.Status,
            a.Purpose,
            a.ApproverRole,
            a.ApproverUserId,
            a.ApproverUserId.HasValue && users.TryGetValue(a.ApproverUserId.Value, out var approverName) ? approverName : null,
            a.RequestedByUserId,
            a.RequestedByUserId.HasValue && users.TryGetValue(a.RequestedByUserId.Value, out var requesterName) ? requesterName : null,
            a.RequestedOn,
            a.DecisionOn,
            a.Notes,
            a.Amount,
            a.Currency)).ToList();
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

        return approvals.Select(item => new OpportunityApprovalInboxItemDto(
            item.approval.Id,
            item.approval.OpportunityId,
            item.opportunity.Name,
            item.AccountName,
            item.approval.Status,
            item.approval.Purpose,
            item.approval.ApproverRole,
            item.approval.ApproverUserId,
            item.approval.ApproverUserId.HasValue && users.TryGetValue(item.approval.ApproverUserId.Value, out var approverName) ? approverName : null,
            item.approval.RequestedByUserId,
            item.approval.RequestedByUserId.HasValue && users.TryGetValue(item.approval.RequestedByUserId.Value, out var requesterName) ? requesterName : null,
            item.approval.RequestedOn,
            item.approval.DecisionOn,
            item.approval.Notes,
            item.approval.Amount,
            item.approval.Currency)).ToList();
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
        var approverRole = await _dbContext.Tenants
            .Where(t => t.Id == tenantId)
            .Select(t => t.ApprovalApproverRole)
            .FirstOrDefaultAsync(cancellationToken);

        if (string.IsNullOrWhiteSpace(approverRole))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval role must be configured before requesting approval.");
        }

        var normalizedPurpose = string.IsNullOrWhiteSpace(purpose) ? "Close" : purpose.Trim();

        var existingPending = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .FirstOrDefaultAsync(
                a => a.OpportunityId == opportunityId
                     && a.Status == "Pending"
                     && a.Purpose == normalizedPurpose,
                cancellationToken);

        if (existingPending is not null)
        {
            var dto = await MapDtoAsync(existingPending, cancellationToken);
            return OpportunityOperationResult<OpportunityApprovalDto>.Ok(dto);
        }

        var approval = new OpportunityApproval
        {
            OpportunityId = opportunityId,
            ApproverRole = approverRole,
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

        var approvalDto = await MapDtoAsync(approval, cancellationToken);
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

        var approverRole = await ResolveApproverRoleAsync(cancellationToken);
        if (string.IsNullOrWhiteSpace(approverRole))
        {
            return OpportunityOperationResult<OpportunityApprovalDto>.Fail("Approval role must be configured before making a decision.");
        }

        if (!await IsApproverAsync(actor.UserId, approverRole, cancellationToken))
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

        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = await MapDtoAsync(approval, cancellationToken);
        return OpportunityOperationResult<OpportunityApprovalDto>.Ok(dto);
    }

    private async Task<OpportunityApprovalDto> MapDtoAsync(OpportunityApproval approval, CancellationToken cancellationToken)
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

    private async Task<string?> ResolveApproverRoleAsync(CancellationToken cancellationToken)
    {
        var tenantId = _tenantProvider.TenantId;
        return await _dbContext.Tenants
            .Where(t => t.Id == tenantId)
            .Select(t => t.ApprovalApproverRole)
            .FirstOrDefaultAsync(cancellationToken);
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
