using CRM.Enterprise.Application.Activities;
using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Application.Common;
using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

public sealed class OpportunityService : IOpportunityService
{
    private const string OpportunityEntityType = "Opportunity";
    private const int AtRiskDays = 30;
    private const decimal DiscountPercentApprovalThreshold = 10m;
    private const decimal DiscountAmountApprovalThreshold = 1000m;
    private static readonly HashSet<string> StagesRequiringAmount = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation"
    };
    private static readonly HashSet<string> StagesRequiringCloseDate = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation"
    };
    private static readonly HashSet<string> StagesRequiringBuyingRole = new(StringComparer.OrdinalIgnoreCase)
    {
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> BuyingRoles = new(StringComparer.OrdinalIgnoreCase)
    {
        "Decision Maker",
        "Champion",
        "Influencer",
        "Procurement",
        "Technical Evaluator"
    };
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;
    private readonly IAuditEventService _auditEvents;
    private readonly IMediator _mediator;
    private readonly IOpportunityApprovalService _approvalService;
    private readonly IActivityService _activityService;

    public OpportunityService(
        CrmDbContext dbContext,
        ITenantProvider tenantProvider,
        IAuditEventService auditEvents,
        IMediator mediator,
        IOpportunityApprovalService approvalService,
        IActivityService activityService)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
        _auditEvents = auditEvents;
        _mediator = mediator;
        _approvalService = approvalService;
        _activityService = activityService;
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
                o.DiscountPercent,
                o.DiscountAmount,
                o.PricingNotes,
                o.SecurityReviewStatus,
                o.SecurityNotes,
                o.LegalReviewStatus,
                o.LegalNotes,
                o.OwnerId,
                o.IsClosed,
                o.IsWon,
                o.WinLossReason,
                o.CreatedAtUtc,
                o.UpdatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var opportunityIds = data.Select(o => o.Id).ToList();
        var activityLookup = new Dictionary<Guid, (DateTime? lastActivityAtUtc, DateTime? nextStepDueAtUtc)>();
        if (opportunityIds.Count > 0)
        {
            var activitySnapshot = await _dbContext.Activities
                .AsNoTracking()
                .Where(a => !a.IsDeleted
                            && a.RelatedEntityType == ActivityRelationType.Opportunity
                            && opportunityIds.Contains(a.RelatedEntityId))
                .Select(a => new
                {
                    a.RelatedEntityId,
                    a.DueDateUtc,
                    a.CompletedDateUtc,
                    a.CreatedAtUtc
                })
                .ToListAsync(cancellationToken);

            activityLookup = activitySnapshot
                .GroupBy(a => a.RelatedEntityId)
                .ToDictionary(
                    g => g.Key,
                    g =>
                    {
                        var lastActivityAtUtc = g.Max(a => (DateTime?)(a.CompletedDateUtc ?? a.CreatedAtUtc));
                        var nextStepDueAtUtc = g
                            .Where(a => a.CompletedDateUtc == null && a.DueDateUtc.HasValue)
                            .OrderBy(a => a.DueDateUtc)
                            .Select(a => a.DueDateUtc)
                            .FirstOrDefault();
                        return (lastActivityAtUtc, nextStepDueAtUtc);
                    });
        }

        var ownerIds = data.Select(o => o.OwnerId).Distinct().ToList();
        var owners = await _dbContext.Users
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToListAsync(cancellationToken);

        var items = data.Select(o =>
        {
            activityLookup.TryGetValue(o.Id, out var activityInfo);
            var lastActivityAtUtc = activityInfo.lastActivityAtUtc;
            var nextStepDueAtUtc = activityInfo.nextStepDueAtUtc;

            return new OpportunityListItemDto(
                o.Id,
                o.Name,
                o.AccountId,
                o.Account,
                o.Stage,
                o.Amount,
                o.Probability,
                o.Currency,
                o.ExpectedCloseDate,
                o.DiscountPercent,
                o.DiscountAmount,
                o.PricingNotes,
                o.SecurityReviewStatus,
                o.SecurityNotes,
                o.LegalReviewStatus,
                o.LegalNotes,
                o.OwnerId,
                owners.FirstOrDefault(own => own.Id == o.OwnerId)?.FullName ?? "Unassigned",
                ComputeStatus(o.IsClosed, o.IsWon),
                o.WinLossReason,
                o.CreatedAtUtc,
                o.UpdatedAtUtc,
                lastActivityAtUtc,
                nextStepDueAtUtc,
                ComputeAtRisk(lastActivityAtUtc, nextStepDueAtUtc));
        });

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

        var lastActivityAtUtc = await GetLastActivityAtUtcAsync(opp.Id, cancellationToken);
        var nextStepDueAtUtc = await GetNextStepDueAtUtcAsync(opp.Id, cancellationToken);

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
            opp.DiscountPercent,
            opp.DiscountAmount,
            opp.PricingNotes,
            opp.SecurityReviewStatus,
            opp.SecurityNotes,
            opp.LegalReviewStatus,
            opp.LegalNotes,
            opp.OwnerId,
            ownerName,
            ComputeStatus(opp.IsClosed, opp.IsWon),
            opp.WinLossReason,
            opp.CreatedAtUtc,
            opp.UpdatedAtUtc,
            lastActivityAtUtc,
            nextStepDueAtUtc,
            ComputeAtRisk(lastActivityAtUtc, nextStepDueAtUtc));
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

        var approvalError = await ValidateApprovalAsync(request, actor, null, cancellationToken);
        if (approvalError is not null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail(approvalError);
        }
        var discountApprovalError = await ValidateDiscountApprovalAsync(request, actor, null, cancellationToken);
        if (discountApprovalError is not null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail(discountApprovalError);
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
            DiscountPercent = request.DiscountPercent,
            DiscountAmount = request.DiscountAmount,
            PricingNotes = request.PricingNotes,
            SecurityReviewStatus = string.IsNullOrWhiteSpace(request.SecurityReviewStatus) ? "Not Started" : request.SecurityReviewStatus,
            SecurityNotes = request.SecurityNotes,
            LegalReviewStatus = string.IsNullOrWhiteSpace(request.LegalReviewStatus) ? "Not Started" : request.LegalReviewStatus,
            LegalNotes = request.LegalNotes,
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
            opp.DiscountPercent,
            opp.DiscountAmount,
            opp.PricingNotes,
            opp.SecurityReviewStatus,
            opp.SecurityNotes,
            opp.LegalReviewStatus,
            opp.LegalNotes,
            ownerId,
            await _dbContext.Users.Where(u => u.Id == ownerId).Select(u => u.FullName).FirstOrDefaultAsync(cancellationToken) ?? "Unassigned",
            ComputeStatus(opp.IsClosed, opp.IsWon),
            opp.WinLossReason,
            opp.CreatedAtUtc,
            opp.UpdatedAtUtc,
            null,
            null,
            ComputeAtRisk(null, null));

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

        var approvalError = await ValidateApprovalAsync(request, actor, id, cancellationToken);
        if (approvalError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(approvalError);
        }
        var discountApprovalError = await ValidateDiscountApprovalAsync(request, actor, id, cancellationToken);
        if (discountApprovalError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(discountApprovalError);
        }

        var previousStageId = opp.StageId;
        var previousStageName = await ResolveStageNameAsync(previousStageId, cancellationToken);
        var wasClosed = opp.IsClosed;
        var wasWon = opp.IsWon;
        var previousOwnerId = opp.OwnerId;
        var previousAmount = opp.Amount;
        var previousExpectedClose = opp.ExpectedCloseDate;

        var nextStageId = await ResolveStageIdAsync(request.StageId, request.StageName, cancellationToken);
        var nextStageName = await ResolveStageNameAsync(nextStageId, cancellationToken) ?? request.StageName ?? "Prospecting";
        if (previousStageId != nextStageId)
        {
            var stageError = await ValidateStageChangeAsync(opp, nextStageName, request, cancellationToken);
            if (stageError is not null)
            {
                return OpportunityOperationResult<bool>.Fail(stageError);
            }
        }

        opp.Name = request.Name;
        opp.AccountId = await ResolveAccountIdAsync(request.AccountId, cancellationToken);
        opp.PrimaryContactId = request.PrimaryContactId;
        opp.StageId = nextStageId;
        opp.OwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        opp.Amount = request.Amount;
        opp.Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency;
        opp.Probability = request.Probability;
        opp.ExpectedCloseDate = request.ExpectedCloseDate;
        opp.Summary = request.Summary;
        if (request.DiscountPercent.HasValue)
        {
            opp.DiscountPercent = request.DiscountPercent;
        }
        if (request.DiscountAmount.HasValue)
        {
            opp.DiscountAmount = request.DiscountAmount;
        }
        if (request.PricingNotes is not null)
        {
            opp.PricingNotes = request.PricingNotes;
        }
        if (request.SecurityReviewStatus is not null)
        {
            opp.SecurityReviewStatus = request.SecurityReviewStatus;
        }
        if (request.SecurityNotes is not null)
        {
            opp.SecurityNotes = request.SecurityNotes;
        }
        if (request.LegalReviewStatus is not null)
        {
            opp.LegalReviewStatus = request.LegalReviewStatus;
        }
        if (request.LegalNotes is not null)
        {
            opp.LegalNotes = request.LegalNotes;
        }
        opp.WinLossReason = request.WinLossReason;
        opp.IsClosed = request.IsClosed;
        opp.IsWon = request.IsWon;
        opp.UpdatedAtUtc = DateTime.UtcNow;

        if (previousStageId != nextStageId)
        {
            AddStageHistory(opp, nextStageId, "Stage updated", actor);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "StageChanged", "Stage", previousStageName, nextStageName, actor),
                cancellationToken);
            await _mediator.Publish(new OpportunityStageChangedEvent(
                opp.Id,
                previousStageName,
                nextStageName,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
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

        var stageError = await ValidateStageChangeAsync(opp, stageName, null, cancellationToken);
        if (stageError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(stageError);
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
            await _mediator.Publish(new OpportunityStageChangedEvent(
                opp.Id,
                previousStageName,
                nextStageName,
                actor.UserId == Guid.Empty ? null : actor.UserId,
                DateTime.UtcNow), cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        return OpportunityOperationResult<bool>.Ok(true);
    }

    public async Task<OpportunityOperationResult<Guid>> CoachAsync(Guid id, OpportunityCoachingRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var comment = request.Comment?.Trim();
        if (string.IsNullOrWhiteSpace(comment))
        {
            return OpportunityOperationResult<Guid>.Fail("Coaching comment is required.");
        }

        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .Include(o => o.Account)
            .Include(o => o.Stage)
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);

        if (opportunity is null)
        {
            return OpportunityOperationResult<Guid>.NotFoundResult();
        }

        var dueDateUtc = request.DueDateUtc ?? DateTime.UtcNow.AddDays(2);
        var priority = string.IsNullOrWhiteSpace(request.Priority) ? "High" : request.Priority;
        var managerName = string.IsNullOrWhiteSpace(actor.UserName) ? "Manager" : actor.UserName;
        var subject = $"Coaching: {opportunity.Name}";
        var description = $"Manager coaching from {managerName}:{Environment.NewLine}{comment}";

        var activityResult = await _activityService.CreateAsync(
            new ActivityUpsertRequest(
                subject,
                description,
                null,
                ActivityType.Task,
                priority,
                dueDateUtc,
                null,
                null,
                null,
                ActivityRelationType.Opportunity,
                opportunity.Id,
                opportunity.OwnerId),
            actor,
            cancellationToken);

        if (!activityResult.Success || activityResult.Value is null)
        {
            return OpportunityOperationResult<Guid>.Fail(activityResult.Error ?? "Unable to create coaching task.");
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                opportunity.Id,
                "CoachingTaskCreated",
                "CoachingTask",
                null,
                activityResult.Value.Id.ToString(),
                actor),
            cancellationToken);

        return OpportunityOperationResult<Guid>.Ok(activityResult.Value.Id);
    }

    private static string ComputeStatus(bool isClosed, bool isWon)
    {
        if (isClosed) return isWon ? "Closed Won" : "Closed Lost";
        return "Open";
    }

    private static bool ComputeAtRisk(DateTime? lastActivityAtUtc, DateTime? nextStepDueAtUtc)
    {
        var now = DateTime.UtcNow;
        if (!nextStepDueAtUtc.HasValue)
        {
            return true;
        }

        if (nextStepDueAtUtc.Value.Date < now.Date)
        {
            return true;
        }

        if (lastActivityAtUtc.HasValue && (now - lastActivityAtUtc.Value).TotalDays > AtRiskDays)
        {
            return true;
        }

        return false;
    }

    private async Task<DateTime?> GetLastActivityAtUtcAsync(Guid opportunityId, CancellationToken cancellationToken)
    {
        return await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == opportunityId)
            .OrderByDescending(a => a.CompletedDateUtc ?? a.CreatedAtUtc)
            .Select(a => (DateTime?)(a.CompletedDateUtc ?? a.CreatedAtUtc))
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<DateTime?> GetNextStepDueAtUtcAsync(Guid opportunityId, CancellationToken cancellationToken)
    {
        return await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == opportunityId
                        && a.CompletedDateUtc == null
                        && a.DueDateUtc.HasValue)
            .OrderBy(a => a.DueDateUtc)
            .Select(a => a.DueDateUtc)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private async Task<bool> HasBuyingRoleAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        if (opportunity.PrimaryContactId.HasValue)
        {
            var primaryHasRole = await _dbContext.Contacts
                .AsNoTracking()
                .AnyAsync(
                    c => c.Id == opportunity.PrimaryContactId.Value
                         && !c.IsDeleted
                         && c.BuyingRole != null
                         && BuyingRoles.Contains(c.BuyingRole),
                    cancellationToken);
            if (primaryHasRole)
            {
                return true;
            }
        }

        if (opportunity.AccountId == Guid.Empty)
        {
            return false;
        }

        return await _dbContext.Contacts
            .AsNoTracking()
            .AnyAsync(
                c => c.AccountId == opportunity.AccountId
                     && !c.IsDeleted
                     && c.BuyingRole != null
                     && BuyingRoles.Contains(c.BuyingRole),
                cancellationToken);
    }

    private async Task<string?> ValidateStageChangeAsync(
        Opportunity opportunity,
        string nextStageName,
        OpportunityUpsertRequest? request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(nextStageName))
        {
            return "Stage is required.";
        }

        if (nextStageName.StartsWith("Closed", StringComparison.OrdinalIgnoreCase))
        {
            if (request is null)
            {
                return "Use the full edit flow to close opportunities.";
            }

            if (!request.IsClosed)
            {
                return "Opportunity status must be closed before selecting a closed stage.";
            }
        }

        var amount = request?.Amount ?? opportunity.Amount;
        var expectedCloseDate = request?.ExpectedCloseDate ?? opportunity.ExpectedCloseDate;

        if (StagesRequiringAmount.Contains(nextStageName) && amount <= 0)
        {
            return $"Amount is required before moving to {nextStageName}.";
        }

        if (StagesRequiringCloseDate.Contains(nextStageName) && !expectedCloseDate.HasValue)
        {
            return $"Expected close date is required before moving to {nextStageName}.";
        }

        if (StagesRequiringBuyingRole.Contains(nextStageName))
        {
            var hasBuyingRole = await HasBuyingRoleAsync(opportunity, cancellationToken);
            if (!hasBuyingRole)
            {
                return "Buying group role is required before moving to late-stage opportunities.";
            }
        }

        if (string.Equals(nextStageName, "Commit", StringComparison.OrdinalIgnoreCase))
        {
            var securityStatus = request?.SecurityReviewStatus ?? opportunity.SecurityReviewStatus ?? "Not Started";
            var legalStatus = request?.LegalReviewStatus ?? opportunity.LegalReviewStatus ?? "Not Started";
            if (!string.Equals(securityStatus, "Approved", StringComparison.OrdinalIgnoreCase)
                || !string.Equals(legalStatus, "Approved", StringComparison.OrdinalIgnoreCase))
            {
                return "Security and legal reviews must be approved before moving to Commit.";
            }
        }

        if (!nextStageName.StartsWith("Closed", StringComparison.OrdinalIgnoreCase))
        {
            var nextStepDueAtUtc = await GetNextStepDueAtUtcAsync(opportunity.Id, cancellationToken);
            if (!nextStepDueAtUtc.HasValue)
            {
                return "Next step is required before changing stage. Schedule an activity with a due date.";
            }
        }

        return null;
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

    private async Task<string?> ValidateApprovalAsync(
        OpportunityUpsertRequest request,
        ActorContext actor,
        Guid? opportunityId,
        CancellationToken cancellationToken)
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

        if (!opportunityId.HasValue || opportunityId.Value == Guid.Empty)
        {
            return "Approval required to close this opportunity. Save it first, then request approval.";
        }

        var approved = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .AnyAsync(
                a => a.OpportunityId == opportunityId.Value &&
                     a.Status == "Approved",
                cancellationToken);

        if (approved)
        {
            return null;
        }

        await _approvalService.RequestAsync(
            opportunityId.Value,
            request.Amount,
            request.Currency,
            "Close",
            actor,
            cancellationToken);

        return "Approval required. Request submitted for review.";
    }

    private async Task<string?> ValidateDiscountApprovalAsync(
        OpportunityUpsertRequest request,
        ActorContext actor,
        Guid? opportunityId,
        CancellationToken cancellationToken)
    {
        var discountPercent = request.DiscountPercent ?? 0m;
        var discountAmount = request.DiscountAmount ?? 0m;
        var requiresApproval = discountPercent >= DiscountPercentApprovalThreshold
                               || discountAmount >= DiscountAmountApprovalThreshold;
        if (!requiresApproval)
        {
            return null;
        }

        if (!opportunityId.HasValue || opportunityId.Value == Guid.Empty)
        {
            return "Discount approval required. Save the opportunity first to request approval.";
        }

        var approved = await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .AnyAsync(
                a => a.OpportunityId == opportunityId.Value
                     && a.Purpose == "Discount"
                     && a.Status == "Approved",
                cancellationToken);

        if (approved)
        {
            return null;
        }

        var amount = discountAmount > 0 ? discountAmount : request.Amount;
        await _approvalService.RequestAsync(
            opportunityId.Value,
            amount,
            request.Currency,
            "Discount",
            actor,
            cancellationToken);

        return "Discount approval required. Request submitted for review.";
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
