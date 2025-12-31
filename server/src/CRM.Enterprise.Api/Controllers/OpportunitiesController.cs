using CRM.Enterprise.Security;
using CRM.Enterprise.Api.Contracts.Opportunities;
using CRM.Enterprise.Api.Contracts.Shared;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace CRM.Enterprise.Api.Controllers;

[Authorize(Policy = Permissions.Policies.OpportunitiesView)]
[ApiController]
[Route("api/opportunities")]
public class OpportunitiesController : ControllerBase
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public OpportunitiesController(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    [HttpGet]
    public async Task<ActionResult<OpportunitySearchResponse>> GetOpportunities(
        [FromQuery] string? search,
        [FromQuery] string? stage,
        [FromQuery] Guid? accountId,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken = default)
    {
        page = Math.Max(page, 1);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _dbContext.Opportunities
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .AsNoTracking()
            .Where(o => !o.IsDeleted);

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.ToLower();
            query = query.Where(o =>
                o.Name.ToLower().Contains(term) ||
                (o.Account != null && o.Account.Name.ToLower().Contains(term)));
        }

        if (!string.IsNullOrWhiteSpace(stage))
        {
            query = query.Where(o => o.Stage != null && o.Stage.Name == stage);
        }

        if (accountId.HasValue && accountId.Value != Guid.Empty)
        {
            query = query.Where(o => o.AccountId == accountId.Value);
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

        var items = data.Select(o => new OpportunityListItem(
            o.Id,
            o.Name,
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

        return Ok(new OpportunitySearchResponse(items, total));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<OpportunityListItem>> GetOpportunity(Guid id, CancellationToken cancellationToken)
    {
        var opp = await _dbContext.Opportunities
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);

        if (opp is null) return NotFound();

        var ownerName = await _dbContext.Users
            .Where(u => u.Id == opp.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unassigned";

        var item = new OpportunityListItem(
            opp.Id,
            opp.Name,
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

        return Ok(item);
    }

    [HttpGet("{id:guid}/history")]
    public async Task<ActionResult<IEnumerable<OpportunityStageHistoryItem>>> GetHistory(Guid id, CancellationToken cancellationToken)
    {
        var exists = await _dbContext.Opportunities.AnyAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (!exists) return NotFound();

        var items = await _dbContext.OpportunityStageHistories
            .AsNoTracking()
            .Include(h => h.OpportunityStage)
            .Where(h => h.OpportunityId == id)
            .OrderByDescending(h => h.ChangedAtUtc)
            .Select(h => new OpportunityStageHistoryItem(
                h.Id,
                h.OpportunityStage != null ? h.OpportunityStage.Name : "Prospecting",
                h.ChangedAtUtc,
                h.ChangedBy,
                h.Notes))
            .ToListAsync(cancellationToken);

        return Ok(items);
    }

    [HttpPost]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<ActionResult<OpportunityListItem>> Create([FromBody] UpsertOpportunityRequest request, CancellationToken cancellationToken)
    {
        if (request.IsClosed && string.IsNullOrWhiteSpace(request.WinLossReason))
        {
            return BadRequest("Win/Loss reason is required when closing an opportunity.");
        }

        var approvalError = await ValidateApprovalAsync(request, cancellationToken);
        if (approvalError is not null)
        {
            return BadRequest(approvalError);
        }

        var ownerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
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
            Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency!,
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
        AddStageHistory(opp, stageId, "Stage set");
        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = new OpportunityListItem(
            opp.Id,
            opp.Name,
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

        return CreatedAtAction(nameof(GetOpportunity), new { id = opp.Id }, dto);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpsertOpportunityRequest request, CancellationToken cancellationToken)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null) return NotFound();

        if (request.IsClosed && string.IsNullOrWhiteSpace(request.WinLossReason))
        {
            return BadRequest("Win/Loss reason is required when closing an opportunity.");
        }

        var approvalError = await ValidateApprovalAsync(request, cancellationToken);
        if (approvalError is not null)
        {
            return BadRequest(approvalError);
        }

        var previousStageId = opp.StageId;

        opp.Name = request.Name;
        opp.AccountId = await ResolveAccountIdAsync(request.AccountId, cancellationToken);
        opp.PrimaryContactId = request.PrimaryContactId;
        var nextStageId = await ResolveStageIdAsync(request.StageId, request.StageName, cancellationToken);
        opp.StageId = nextStageId;
        opp.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        opp.Amount = request.Amount;
        opp.Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency!;
        opp.Probability = request.Probability;
        opp.ExpectedCloseDate = request.ExpectedCloseDate;
        opp.Summary = request.Summary;
        opp.WinLossReason = request.WinLossReason;
        opp.IsClosed = request.IsClosed;
        opp.IsWon = request.IsWon;
        opp.UpdatedAtUtc = DateTime.UtcNow;

        if (previousStageId != nextStageId)
        {
            AddStageHistory(opp, nextStageId, "Stage updated");
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    [Authorize(Policy = Permissions.Policies.OpportunitiesManage)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null) return NotFound();

        opp.IsDeleted = true;
        opp.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/owner")]
    public async Task<IActionResult> UpdateOwner(Guid id, [FromBody] UpdateOwnerRequest request, CancellationToken cancellationToken)
    {
        if (request.OwnerId == Guid.Empty)
        {
            return BadRequest("Owner id is required.");
        }

        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null) return NotFound();

        opp.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, cancellationToken);
        opp.UpdatedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    [HttpPatch("{id:guid}/stage")]
    public async Task<IActionResult> UpdateStage(Guid id, [FromBody] UpdateStageRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Stage))
        {
            return BadRequest("Stage is required.");
        }

        if (request.Stage.StartsWith("Closed", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest("Use the full edit flow to close opportunities.");
        }

        var opp = await _dbContext.Opportunities.FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opp is null) return NotFound();

        var nextStageId = await ResolveStageIdAsync(null, request.Stage, cancellationToken);
        if (nextStageId != opp.StageId)
        {
            opp.StageId = nextStageId;
            opp.IsClosed = false;
            opp.IsWon = false;
            opp.UpdatedAtUtc = DateTime.UtcNow;
            AddStageHistory(opp, nextStageId, "Stage updated");
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return NoContent();
    }

    private static string ComputeStatus(bool isClosed, bool isWon)
    {
        if (isClosed) return isWon ? "Closed Won" : "Closed Lost";
        return "Open";
    }

    private async Task<Guid> ResolveOwnerIdAsync(Guid? requestedOwnerId, CancellationToken cancellationToken)
    {
        if (requestedOwnerId.HasValue && requestedOwnerId.Value != Guid.Empty)
        {
            var exists = await _dbContext.Users.AnyAsync(u => u.Id == requestedOwnerId.Value && u.IsActive && !u.IsDeleted, cancellationToken);
            if (exists) return requestedOwnerId.Value;
        }

        var fallbackUserId = await _dbContext.Users
            .Where(u => u.IsActive && !u.IsDeleted)
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

    private void AddStageHistory(Opportunity opportunity, Guid stageId, string? notes)
    {
        _dbContext.OpportunityStageHistories.Add(new OpportunityStageHistory
        {
            OpportunityId = opportunity.Id,
            OpportunityStageId = stageId,
            ChangedAtUtc = DateTime.UtcNow,
            ChangedBy = User?.Identity?.Name ?? "system",
            Notes = notes
        });
    }

    private async Task<string?> ValidateApprovalAsync(UpsertOpportunityRequest request, CancellationToken cancellationToken)
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

        var userId = GetCurrentUserId();
        if (!userId.HasValue)
        {
            return "Approval required to close this opportunity.";
        }

        var isApprover = await _dbContext.UserRoles
            .Include(ur => ur.Role)
            .AnyAsync(
                ur => ur.UserId == userId.Value &&
                      ur.Role != null &&
                      ur.Role.Name == tenant.ApprovalApproverRole,
                cancellationToken);

        return isApprover ? null : "Approval required to close this opportunity.";
    }

    private Guid? GetCurrentUserId()
    {
        var subject = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.TryParse(subject, out var userId) ? userId : null;
    }
}
