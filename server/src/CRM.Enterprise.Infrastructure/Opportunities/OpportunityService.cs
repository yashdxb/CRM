using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityService : IOpportunityService
{
    private const string OpportunityEntityType = "Opportunity";
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IAuditEventService _auditEvents;

    public OpportunityService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IAuditEventService auditEvents)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _auditEvents = auditEvents;
    }

    public async Task<OpportunitySearchResultDto> SearchAsync(OpportunitySearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Opportunities
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .AsNoTracking()
            .Where(o => !o.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.ToLower();
            query = query.Where(o =>
                o.Name.ToLower().Contains(term) ||
                (o.Account != null && o.Account.Name.ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(request.Stage))
        {
            query = query.Where(o => o.Stage != null && o.Stage.Name == request.Stage);
        }

        if (request.AccountId.HasValue && request.AccountId.Value != Guid.Empty)
        {
            query = query.Where(o => o.AccountId == request.AccountId.Value);
        }

        var total = await query.CountAsync(cancellationToken);

        var data = await query
            .OrderByDescending(o => o.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(o => new
            {
                o.Id,
                o.Name,
                o.AccountId,
                Account = o.Account != null ? o.Account.Name : string.Empty,
                Stage = o.Stage != null ? o.Stage.Name : "Prospecting",
                o.Amount,
                o.Probability,
                o.Currency,
                o.ExpectedCloseDate,
                o.OwnerId,
                o.IsClosed,
                o.IsWon,
                o.WinLossReason,
                o.CreatedAtUtc,
                o.UpdatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = data.Select(o => o.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var items = data.Select(o => new OpportunityListItemDto(
            o.Id,
            o.Name,
            o.AccountId,
            o.Account,
            o.Stage,
            o.Amount,
            o.Probability,
            o.Currency,
            o.ExpectedCloseDate,
            o.OwnerId,
            owners.FirstOrDefault(own => own.Id == o.OwnerId)?.FullName ?? "Unassigned",
            ComputeStatus(o.IsClosed, o.IsWon),
            o.WinLossReason,
            o.CreatedAtUtc,
            o.UpdatedAtUtc));

        return new OpportunitySearchResultDto(items.ToList(), total);
    }

    public async Task<OpportunityListItemDto?> GetAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var opp = await _dbContext.Opportunities
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);

        if (opp is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == opp.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        return new OpportunityListItemDto(
            opp.Id,
            opp.Name,
            opp.AccountId,
            opp.Account?.Name ?? string.Empty,
            opp.Stage?.Name ?? "Prospecting",
            opp.Amount,
            opp.Probability,
            opp.Currency,
            opp.ExpectedCloseDate,
            opp.OwnerId,
            ownerName,
            ComputeStatus(opp.IsClosed, opp.IsWon),
            opp.WinLossReason,
            opp.CreatedAtUtc,
            opp.UpdatedAtUtc);
    }

    public async Task<IReadOnlyList<OpportunityStageHistoryDto>?> GetHistoryAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities.AnyAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var items = await _dbContext.OpportunityStageHistories
            .AsNoTracking()
            .Include(h => h.OpportunityStage)
            .Where(h => h.OpportunityId == id)
            .OrderByDescending(h => h.ChangedAtUtc)
            .Select(h => new OpportunityStageHistoryDto(
                h.Id,
                h.OpportunityStage != null ? h.OpportunityStage.Name : "Prospecting",
                h.ChangedAtUtc,
                h.ChangedBy,
                h.Notes))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<IReadOnlyList<OpportunityAuditEventDto>?> GetAuditAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);

        if (!exists)
        {
            return null;
        }

        var items = await _dbContext.AuditEvents
            .AsNoTracking()
            .Where(a => a.EntityType == OpportunityEntityType && a.EntityId == id)
            .OrderByDescending(a => a.CreatedAtUtc)
            .Select(a => new OpportunityAuditEventDto(
                a.Id,
                a.EntityType,
                a.EntityId,
                a.Action,
                a.Field,
                a.OldValue,
                a.NewValue,
                a.ChangedByUserId,
                a.ChangedByName,
                a.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return items;
    }

    public async Task<OpportunityOperationResult<OpportunityListItemDto>> CreateAsync(OpportunityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (request.IsClosed && string.IsNullOrWhiteSpace(request.WinLossReason))
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Win/Loss reason is required when closing an opportunity.");
        }

        var approvalError = await ValidateApprovalAsync(request, actor, cancellationToken);
        if (approvalError is not null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail(approvalError);
        }

        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        var stageId = await ResolveStageIdAsync(request.StageId, request.StageName, cancellationToken);
        var accountId = await ResolveAccountIdAsync(request.AccountId, cancellationToken);

        var opp = new Opportunity
        {
            Name = request.Name,
            AccountId = accountId,
            PrimaryContactId = request.PrimaryContactId,
            StageId = stageId,
            OwnerId = ownerId,
            Amount = request.Amount,
            Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency,
            Probability = request.Probability,
            ExpectedCloseDate = request.ExpectedCloseDate,
            ForecastCategory = null,
            Summary = request.Summary,
            WinLossReason = request.WinLossReason,
            IsClosed = request.IsClosed,
            IsWon = request.IsWon,
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Opportunities.Add(opp);
        AddStageHistory(opp, stageId, "Stage set", actor);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(opp.Id, "Created", null, null, null, actor),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = new OpportunityListItemDto(
            opp.Id,
            opp.Name,
            opp.AccountId,
            await _dbContext.Accounts.Where(a => a.Id == opp.AccountId).Select(a => a.Name).FirstOrDefaultAsync(cancellationToken) ?? string.Empty,
            await _dbContext.OpportunityStages.Where(s => s.Id == opp.StageId).Select(s => s.Name).FirstOrDefaultAsync(cancellationToken) ?? "Prospecting",
            opp.Amount,
            opp.Probability,
            opp.Currency,
            opp.ExpectedCloseDate,
            ownerId,
            await _dbContext.Users.Where(u => u.Id == ownerId).Select(u => u.FullName).FirstOrDefaultAsync(cancellationToken) ?? "Unassigned",
            ComputeStatus(opp.IsClosed, opp.IsWon),
            opp.WinLossReason,
            opp.CreatedAtUtc,
            opp.UpdatedAtUtc);

        return OpportunityOperationResult<OpportunityListItemDto>.Ok(dto);
    }

    public async Task<OpportunityOperationResult<bool>> UpdateAsync(Guid id, OpportunityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null)
        {
            return OpportunityOperationResult<bool>.NotFoundResult();
        }

        if (request.IsClosed && string.IsNullOrWhiteSpace(request.WinLossReason))
        {
            return OpportunityOperationResult<bool>.Fail("Win/Loss reason is required when closing an opportunity.");
        }

        var approvalError = await ValidateApprovalAsync(request, actor, cancellationToken);
        if (approvalError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(approvalError);
        }

        var previousStageId = opp.StageId;
        var previousStageName = await ResolveStageNameAsync(previousStageId, cancellationToken);
        var wasClosed = opp.IsClosed;
        var wasWon = opp.IsWon;
        var previousOwnerId = opp.OwnerId;
        var previousAmount = opp.Amount;
        var previousExpectedClose = opp.ExpectedCloseDate;

        opp.Name = request.Name;
        opp.AccountId = await ResolveAccountIdAsync(request.AccountId, cancellationToken);
        opp.PrimaryContactId = request.PrimaryContactId;
        var nextStageId = await ResolveStageIdAsync(request.StageId, request.StageName, cancellationToken);
        opp.StageId = nextStageId;
        opp.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        opp.Amount = request.Amount;
        opp.Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency;
        opp.Probability = request.Probability;
        opp.ExpectedCloseDate = request.ExpectedCloseDate;
        opp.Summary = request.Summary;
        opp.WinLossReason = request.WinLossReason;
        opp.IsClosed = request.IsClosed;
        opp.IsWon = request.IsWon;
        opp.UpdatedAtUtc = DateTime.UtcNow;

        if (previousStageId != nextStageId)
        {
            AddStageHistory(opp, nextStageId, "Stage updated", actor);
            var nextStageName = await ResolveStageNameAsync(nextStageId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "StageChanged", "Stage", previousStageName, nextStageName, actor),
                cancellationToken);
        }

        if (previousOwnerId != opp.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), opp.OwnerId.ToString(), actor),
                cancellationToken);
        }

        if (previousAmount != opp.Amount)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "AmountChanged", "Amount", previousAmount.ToString("0.##"), opp.Amount.ToString("0.##"), actor),
                cancellationToken);
        }

        if (previousExpectedClose != opp.ExpectedCloseDate)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    opp.Id,
                    "CloseDateChanged",
                    "ExpectedCloseDate",
                    previousExpectedClose?.ToString("u"),
                    opp.ExpectedCloseDate?.ToString("u"),
                    actor),
                cancellationToken);
        }

        var previousStatus = ComputeStatus(wasClosed, wasWon);
        var nextStatus = ComputeStatus(opp.IsClosed, opp.IsWon);
        if (!string.Equals(previousStatus, nextStatus, StringComparison.OrdinalIgnoreCase))
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "StatusChanged", "Status", previousStatus, nextStatus, actor),
                cancellationToken);
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(opp.Id, "Updated", null, null, null, actor),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
        return OpportunityOperationResult<bool>.Ok(true);
    }

    public async Task<OpportunityOperationResult<bool>> DeleteAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null)
        {
            return OpportunityOperationResult<bool>.NotFoundResult();
        }

        opp.IsDeleted = true;
        opp.DeletedAtUtc = DateTime.UtcNow;
        await _auditEvents.TrackAsync(
            CreateAuditEntry(opp.Id, "Deleted", null, null, null, actor),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return OpportunityOperationResult<bool>.Ok(true);
    }

    public async Task<OpportunityOperationResult<bool>> UpdateOwnerAsync(Guid id, Guid ownerId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null)
        {
            return OpportunityOperationResult<bool>.NotFoundResult();
        }

        var previousOwnerId = opp.OwnerId;
        opp.OwnerId = await ResolveOwnerIdAsync(ownerId, actor, cancellationToken);
        opp.UpdatedAtUtc = DateTime.UtcNow;

        if (previousOwnerId != opp.OwnerId)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "OwnerChanged", "OwnerId", previousOwnerId.ToString(), opp.OwnerId.ToString(), actor),
                cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return OpportunityOperationResult<bool>.Ok(true);
    }

    public async Task<OpportunityOperationResult<bool>> UpdateStageAsync(Guid id, string stageName, ActorContext actor, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(stageName))
        {
            return OpportunityOperationResult<bool>.Fail("Stage is required.");
        }

        if (stageName.StartsWith("Closed", StringComparison.OrdinalIgnoreCase))
        {
            return OpportunityOperationResult<bool>.Fail("Use the full edit flow to close opportunities.");
        }

        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null)
        {
            return OpportunityOperationResult<bool>.NotFoundResult();
        }

        var nextStageId = await ResolveStageIdAsync(null, stageName, cancellationToken);
        if (nextStageId != opp.StageId)
        {
            var previousStageName = await ResolveStageNameAsync(opp.StageId, cancellationToken);
            opp.StageId = nextStageId;
            opp.IsClosed = false;
            opp.IsWon = false;
            opp.UpdatedAtUtc = DateTime.UtcNow;
            AddStageHistory(opp, nextStageId, "Stage updated", actor);
            var nextStageName = await ResolveStageNameAsync(nextStageId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "StageChanged", "Stage", previousStageName, nextStageName, actor),
                cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return OpportunityOperationResult<bool>.Ok(true);
    }

    private static string ComputeStatus(bool isClosed, bool isWon)
    {
        if (isClosed) return isWon ? "Closed Won" : "Closed Lost";
        return "Open";
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, ActorContext actor, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var tenantId = _tenantProvider.TenantId;
            var exists = await _dbContext.Users.AnyAsync(
                u => u.Id == requestedOwnerId.Value
                     && u.IsActive
                     && !u.IsDeleted
                     && (tenantId == Guid.Empty || u.TenantId == tenantId),
                cancellationToken);
            if (exists) return requestedOwnerId.Value;
        }

        if (actor.UserId.HasValue && actor.UserId.Value != Guid.Empty)
        {
            var tenantId = _tenantProvider.TenantId;
            var currentExists = await _dbContext.Users.AnyAsync(
                u => u.Id == actor.UserId.Value
                     && u.IsActive
                     && !u.IsDeleted
                     && (tenantId == Guid.Empty || u.TenantId == tenantId),
                cancellationToken);
            if (currentExists)
            {
                return actor.UserId.Value;
            }
        }

        var currentTenantId = _tenantProvider.TenantId;
        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted && (currentTenantId == Guid.Empty || u.TenantId == currentTenantId))
            .OrderBy(u => u.CreatedAtUtc)
            .Select(u => u.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return fallbackUserId == Guid.Empty ? Guid.NewGuid() : fallbackUserId;
    }

    private async Task<Guid> ResolveStageIdAsync(Guid? requestedStageId, string? stageName, CancellationToken cancellationToken)
    {
        if (requestedStageId.HasValue && requestedStageId.Value != Guid.Empty)
        {
            var exists = await _dbContext.OpportunityStages.AnyAsync(s => s.Id == requestedStageId.Value, cancellationToken);
            if (exists) return requestedStageId.Value;
        }

        if (!string.IsNullOrWhiteSpace(stageName))
        {
            var byName = await _dbContext.OpportunityStages.FirstOrDefaultAsync(s => s.Name == stageName, cancellationToken);
            if (byName is not null) return byName.Id;
        }

        var fallback = await _dbContext.OpportunityStages.OrderBy(s => s.Order).FirstOrDefaultAsync(cancellationToken);
        return fallback?.Id ?? Guid.NewGuid();
    }

    private async Task<string?> ResolveStageNameAsync(Guid stageId, CancellationToken cancellationToken)
    {
        return await _dbContext.OpportunityStages
            .Where(s => s.Id == stageId)
            .Select(s => s.Name)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<Guid> ResolveAccountIdAsync(Guid? requestedAccountId, CancellationToken cancellationToken)
    {
        if (requestedAccountId.HasValue && requestedAccountId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Accounts.AnyAsync(a => a.Id == requestedAccountId.Value && !a.IsDeleted, cancellationToken);
            if (exists) return requestedAccountId.Value;
        }

        var fallback = await _dbContext.Accounts.Where(a => !a.IsDeleted).OrderBy(a => a.CreatedAtUtc).Select(a => a.Id).FirstOrDefaultAsync(cancellationToken);
        return fallback == Guid.Empty ? Guid.NewGuid() : fallback;
    }

    private void AddStageHistory(Opportunity opportunity, Guid stageId, string? notes, ActorContext actor)
    {
        _dbContext.OpportunityStageHistories.Add(new OpportunityStageHistory
        {
            OpportunityId = opportunity.Id,
            OpportunityStageId = stageId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = string.IsNullOrWhiteSpace(actor.UserName) ? "system" : actor.UserName,
            Notes = notes
        });
    }

    private async Task<string?> ValidateApprovalAsync(OpportunityUpsertRequest request, ActorContext actor, CancellationToken cancellationToken)
    {
        if (!request.IsClosed)
        {
            return null;
        }

        var tenantId = _tenantProvider.TenantId;
        if (tenantId == Guid.Empty)
        {
            return null;
        }

        var tenant = await _dbContext.Tenants.AsNoTracking().FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken);
        if (tenant is null)
        {
            return null;
        }

        var threshold = tenant.ApprovalAmountThreshold;
        if (!threshold.HasValue || threshold.Value <= 0)
        {
            return null;
        }

        if (request.Amount < threshold.Value)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(tenant.ApprovalApproverRole))
        {
            return "Approval role must be configured before closing high-value opportunities.";
        }

        if (!actor.UserId.HasValue)
        {
            return "Approval required to close this opportunity.";
        }

        var isApprover = await _dbContext.UserRoles
            .Include(ur => ur.Role)
            .AnyAsync(
                ur => ur.UserId == actor.UserId.Value &&
                      ur.Role != null &&
                      ur.Role.Name == tenant.ApprovalApproverRole,
                cancellationToken);

        return isApprover ? null : "Approval required to close this opportunity.";
    }

    private AuditEventEntry CreateAuditEntry(
        Guid entityId,
        string action,
        string? field,
        string? oldValue,
        string? newValue,
        ActorContext actor)
    {
        return new AuditEventEntry(
            OpportunityEntityType,
            entityId,
            action,
            field,
            oldValue,
            newValue,
            actor.UserId,
            actor.UserName);
    }
}
