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
    private const int DefaultContractTermMonthsFallback = 12;
    private const decimal DiscountPercentApprovalThreshold = 10m;
    private const decimal DiscountAmountApprovalThreshold = 1000m;
    private const string ReviewSubjectPrefix = "Review:";
    private const string ReviewAcknowledgmentSubjectPrefix = "Review acknowledgment:";
    private const string ReviewOutcomeApproved = "Approved";
    private const string ReviewOutcomeNeedsWork = "Needs Work";
    private const string ReviewOutcomeEscalated = "Escalated";
    private const string ReviewOutcomeAcknowledged = "Acknowledged";
    private static readonly HashSet<string> ForecastCategories = new(StringComparer.OrdinalIgnoreCase)
    {
        "Pipeline",
        "Best Case",
        "Commit",
        "Closed",
        "Omitted"
    };
    private static readonly HashSet<string> OpportunityTypes = new(StringComparer.OrdinalIgnoreCase)
    {
        "New",
        "Renewal",
        "Expansion"
    };
    private static readonly HashSet<string> ReviewOutcomes = new(StringComparer.OrdinalIgnoreCase)
    {
        ReviewOutcomeApproved,
        ReviewOutcomeNeedsWork,
        ReviewOutcomeEscalated
    };
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
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringBuyingRole = new(StringComparer.OrdinalIgnoreCase)
    {
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringDecisionMaker = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringPainSummary = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringQualificationFit = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringDiscovery = new(StringComparer.OrdinalIgnoreCase)
    {
        "Qualification",
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> StagesRequiringDemoOutcome = new(StringComparer.OrdinalIgnoreCase)
    {
        "Proposal",
        "Negotiation",
        "Commit"
    };
    private static readonly HashSet<string> DemoTemplateKeys = new(StringComparer.OrdinalIgnoreCase)
    {
        "demo-poc"
    };
    private static readonly HashSet<string> BuyingRoles = new(StringComparer.OrdinalIgnoreCase)
    {
        "Decision Maker",
        "Champion",
        "Influencer",
        "Procurement",
        "Technical Evaluator"
    };
    private const string DecisionMakerRole = "Decision Maker";
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

        if (request.MissingNextStep == true)
        {
            query = query.Where(o => !o.IsClosed);
            query = query.Where(o => !_dbContext.Activities.Any(a =>
                !a.IsDeleted
                && a.RelatedEntityType == ActivityRelationType.Opportunity
                && a.RelatedEntityId == o.Id
                && a.CompletedDateUtc == null
                && a.DueDateUtc.HasValue));
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
                o.ContractStartDateUtc,
                o.ContractEndDateUtc,
                o.ForecastCategory,
                o.OpportunityType,
                o.RenewalOfOpportunityId,
                o.RenewalOpportunityId,
                o.Requirements,
                o.BuyingProcess,
                o.SuccessCriteria,
                o.DiscountPercent,
                o.DiscountAmount,
                o.PricingNotes,
                o.SecurityReviewStatus,
                o.SecurityNotes,
                o.LegalReviewStatus,
                o.LegalNotes,
                o.ProposalStatus,
                o.ProposalNotes,
                o.ProposalLink,
                o.ProposalGeneratedAtUtc,
                o.ProposalSentAtUtc,
                o.PreSalesScope,
                o.PreSalesApproach,
                o.DeliveryOwnerId,
                o.DeliveryHandoffScope,
                o.DeliveryHandoffRisks,
                o.DeliveryHandoffTimeline,
                o.DeliveryStatus,
                o.DeliveryCompletedAtUtc,
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
                o.ContractStartDateUtc,
                o.ContractEndDateUtc,
                o.ForecastCategory,
                o.OpportunityType,
                o.RenewalOfOpportunityId,
                o.RenewalOpportunityId,
                o.Requirements,
                o.BuyingProcess,
                o.SuccessCriteria,
                o.DiscountPercent,
                o.DiscountAmount,
                o.PricingNotes,
                o.SecurityReviewStatus,
                o.SecurityNotes,
                o.LegalReviewStatus,
                o.LegalNotes,
                o.ProposalStatus,
                o.ProposalNotes,
                o.ProposalLink,
                o.ProposalGeneratedAtUtc,
                o.ProposalSentAtUtc,
                o.PreSalesScope,
                o.PreSalesApproach,
                o.DeliveryOwnerId,
                o.DeliveryHandoffScope,
                o.DeliveryHandoffRisks,
                o.DeliveryHandoffTimeline,
                o.DeliveryStatus,
                o.DeliveryCompletedAtUtc,
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
            opp.ContractStartDateUtc,
            opp.ContractEndDateUtc,
            opp.ForecastCategory,
            opp.OpportunityType,
            opp.RenewalOfOpportunityId,
            opp.RenewalOpportunityId,
            opp.Requirements,
            opp.BuyingProcess,
            opp.SuccessCriteria,
            opp.DiscountPercent,
            opp.DiscountAmount,
            opp.PricingNotes,
            opp.SecurityReviewStatus,
            opp.SecurityNotes,
            opp.LegalReviewStatus,
            opp.LegalNotes,
            opp.ProposalStatus,
            opp.ProposalNotes,
            opp.ProposalLink,
            opp.ProposalGeneratedAtUtc,
            opp.ProposalSentAtUtc,
            opp.PreSalesScope,
            opp.PreSalesApproach,
            opp.DeliveryOwnerId,
            opp.DeliveryHandoffScope,
            opp.DeliveryHandoffRisks,
            opp.DeliveryHandoffTimeline,
            opp.DeliveryStatus,
            opp.DeliveryCompletedAtUtc,
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
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Opportunity name is required.");
        }
        if ((!request.StageId.HasValue || request.StageId == Guid.Empty) && string.IsNullOrWhiteSpace(request.StageName))
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Stage is required when creating an opportunity.");
        }
        if (request.Amount <= 0)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Amount is required when creating an opportunity.");
        }
        if (!request.ExpectedCloseDate.HasValue)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Expected close date is required when creating an opportunity.");
        }
        if (request.IsClosed && string.IsNullOrWhiteSpace(request.WinLossReason))
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Win/Loss reason is required when closing an opportunity.");
        }
        if (request.IsClosed && string.IsNullOrWhiteSpace(request.ForecastCategory))
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Forecast category is required before closing an opportunity.");
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
        var stageName = await ResolveStageNameAsync(stageId, cancellationToken) ?? request.StageName ?? "Prospecting";
        var stageForecastCategory = await ResolveStageForecastCategoryAsync(stageId, cancellationToken);
        var resolvedForecastCategory = ResolveForecastCategory(request.ForecastCategory, stageForecastCategory);
        var forecastError = ValidateForecastCategory(stageName, resolvedForecastCategory, stageForecastCategory, request.IsClosed, request.IsWon);
        if (forecastError is not null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail(forecastError);
        }
        var opportunityType = ResolveOpportunityType(request.OpportunityType);
        if (opportunityType is null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Opportunity type is invalid.");
        }
        if (request.ContractStartDateUtc.HasValue
            && request.ContractEndDateUtc.HasValue
            && request.ContractEndDateUtc < request.ContractStartDateUtc)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Contract end date must be after the contract start date.");
        }

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
            ContractStartDateUtc = request.ContractStartDateUtc,
            ContractEndDateUtc = request.ContractEndDateUtc,
            ForecastCategory = resolvedForecastCategory,
            OpportunityType = opportunityType,
            Summary = request.Summary,
            Requirements = request.Requirements,
            BuyingProcess = request.BuyingProcess,
            SuccessCriteria = request.SuccessCriteria,
            DiscountPercent = request.DiscountPercent,
            DiscountAmount = request.DiscountAmount,
            PricingNotes = request.PricingNotes,
            SecurityReviewStatus = string.IsNullOrWhiteSpace(request.SecurityReviewStatus) ? "Not Started" : request.SecurityReviewStatus,
            SecurityNotes = request.SecurityNotes,
            LegalReviewStatus = string.IsNullOrWhiteSpace(request.LegalReviewStatus) ? "Not Started" : request.LegalReviewStatus,
            LegalNotes = request.LegalNotes,
            ProposalStatus = string.IsNullOrWhiteSpace(request.ProposalStatus) ? "Not Started" : request.ProposalStatus,
            ProposalNotes = request.ProposalNotes,
            ProposalLink = request.ProposalLink,
            ProposalGeneratedAtUtc = request.ProposalGeneratedAtUtc,
            ProposalSentAtUtc = request.ProposalSentAtUtc,
            PreSalesScope = request.PreSalesScope,
            PreSalesApproach = request.PreSalesApproach,
            DeliveryOwnerId = request.DeliveryOwnerId,
            DeliveryHandoffScope = request.DeliveryHandoffScope,
            DeliveryHandoffRisks = request.DeliveryHandoffRisks,
            DeliveryHandoffTimeline = request.DeliveryHandoffTimeline,
            DeliveryStatus = request.DeliveryStatus,
            DeliveryCompletedAtUtc = request.DeliveryCompletedAtUtc,
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

        if (opp.IsWon)
        {
            await ApplyClosedWonDefaultsAsync(opp, actor, cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = new OpportunityListItemDto(
            opp.Id,
            opp.Name,
            opp.AccountId,
            await _dbContext.Accounts.Where(a => a.Id == opp.AccountId).Select(a => a.Name).FirstOrDefaultAsync(cancellationToken) ?? string.Empty,
            stageName,
            opp.Amount,
            opp.Probability,
            opp.Currency,
            opp.ExpectedCloseDate,
            opp.ContractStartDateUtc,
            opp.ContractEndDateUtc,
            opp.ForecastCategory,
            opp.OpportunityType,
            opp.RenewalOfOpportunityId,
            opp.RenewalOpportunityId,
            opp.Requirements,
            opp.BuyingProcess,
            opp.SuccessCriteria,
            opp.DiscountPercent,
            opp.DiscountAmount,
            opp.PricingNotes,
            opp.SecurityReviewStatus,
            opp.SecurityNotes,
            opp.LegalReviewStatus,
            opp.LegalNotes,
            opp.ProposalStatus,
            opp.ProposalNotes,
            opp.ProposalLink,
            opp.ProposalGeneratedAtUtc,
            opp.ProposalSentAtUtc,
            opp.PreSalesScope,
            opp.PreSalesApproach,
            opp.DeliveryOwnerId,
            opp.DeliveryHandoffScope,
            opp.DeliveryHandoffRisks,
            opp.DeliveryHandoffTimeline,
            opp.DeliveryStatus,
            opp.DeliveryCompletedAtUtc,
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
        if (request.IsClosed && string.IsNullOrWhiteSpace(request.ForecastCategory))
        {
            return OpportunityOperationResult<bool>.Fail("Forecast category is required before closing an opportunity.");
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
        var highValueUpdateError = await ValidateHighValueUpdateApprovalAsync(opp, request, actor, cancellationToken);
        if (highValueUpdateError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(highValueUpdateError);
        }

        var previousStageId = opp.StageId;
        var previousStageName = await ResolveStageNameAsync(previousStageId, cancellationToken);
        var wasClosed = opp.IsClosed;
        var wasWon = opp.IsWon;
        var previousOwnerId = opp.OwnerId;
        var previousAmount = opp.Amount;
        var previousExpectedClose = opp.ExpectedCloseDate;
        var previousForecastCategory = opp.ForecastCategory;
        var previousContractStart = opp.ContractStartDateUtc;
        var previousContractEnd = opp.ContractEndDateUtc;
        var previousOpportunityType = opp.OpportunityType;

        var nextStageId = await ResolveStageIdAsync(request.StageId, request.StageName, cancellationToken);
        var nextStageName = await ResolveStageNameAsync(nextStageId, cancellationToken) ?? request.StageName ?? "Prospecting";
        var stageForecastCategory = await ResolveStageForecastCategoryAsync(nextStageId, cancellationToken);
        var resolvedForecastCategory = ResolveForecastCategory(request.ForecastCategory, stageForecastCategory, opp.ForecastCategory);
        var forecastError = ValidateForecastCategory(nextStageName, resolvedForecastCategory, stageForecastCategory, request.IsClosed, request.IsWon);
        if (forecastError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(forecastError);
        }
        var opportunityType = ResolveOpportunityType(request.OpportunityType, opp.OpportunityType);
        if (opportunityType is null)
        {
            return OpportunityOperationResult<bool>.Fail("Opportunity type is invalid.");
        }
        if (request.ContractStartDateUtc.HasValue
            && request.ContractEndDateUtc.HasValue
            && request.ContractEndDateUtc < request.ContractStartDateUtc)
        {
            return OpportunityOperationResult<bool>.Fail("Contract end date must be after the contract start date.");
        }
        if (previousStageId != nextStageId)
        {
            var stageError = await ValidateStageChangeAsync(opp, nextStageName, resolvedForecastCategory, request, cancellationToken);
            if (stageError is not null)
            {
                return OpportunityOperationResult<bool>.Fail(stageError);
            }
        }

        var resolvedAccountId = await ResolveAccountIdAsync(request.AccountId, cancellationToken);
        var resolvedOwnerId = await ResolveOwnerIdAsync(request.OwnerId, actor, cancellationToken);
        if (wasClosed && wasWon
            && HasLockedFieldChanges(
                opp,
                request,
                resolvedAccountId,
                resolvedOwnerId,
                nextStageId,
                resolvedForecastCategory,
                opportunityType))
        {
            return OpportunityOperationResult<bool>.Fail(
                "Closed won deals are locked. Only delivery handoff and renewal fields can be updated.");
        }

        opp.Name = request.Name;
        opp.AccountId = resolvedAccountId;
        opp.PrimaryContactId = request.PrimaryContactId;
        opp.StageId = nextStageId;
        opp.OwnerId = resolvedOwnerId;
        opp.Amount = request.Amount;
        opp.Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency;
        opp.Probability = request.Probability;
        opp.ExpectedCloseDate = request.ExpectedCloseDate;
        opp.ContractStartDateUtc = request.ContractStartDateUtc;
        opp.ContractEndDateUtc = request.ContractEndDateUtc;
        opp.ForecastCategory = resolvedForecastCategory;
        opp.OpportunityType = opportunityType;
        opp.Summary = request.Summary;
        if (request.Requirements is not null)
        {
            opp.Requirements = request.Requirements;
        }
        if (request.BuyingProcess is not null)
        {
            opp.BuyingProcess = request.BuyingProcess;
        }
        if (request.SuccessCriteria is not null)
        {
            opp.SuccessCriteria = request.SuccessCriteria;
        }
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
        if (request.ProposalStatus is not null)
        {
            opp.ProposalStatus = request.ProposalStatus;
        }
        if (request.ProposalNotes is not null)
        {
            opp.ProposalNotes = request.ProposalNotes;
        }
        if (request.ProposalLink is not null)
        {
            opp.ProposalLink = request.ProposalLink;
        }
        if (request.ProposalGeneratedAtUtc.HasValue)
        {
            opp.ProposalGeneratedAtUtc = request.ProposalGeneratedAtUtc;
        }
        if (request.ProposalSentAtUtc.HasValue)
        {
            opp.ProposalSentAtUtc = request.ProposalSentAtUtc;
        }
        if (request.PreSalesScope is not null)
        {
            opp.PreSalesScope = request.PreSalesScope;
        }
        if (request.PreSalesApproach is not null)
        {
            opp.PreSalesApproach = request.PreSalesApproach;
        }
        if (request.DeliveryOwnerId.HasValue)
        {
            opp.DeliveryOwnerId = request.DeliveryOwnerId;
        }
        if (request.DeliveryHandoffScope is not null)
        {
            opp.DeliveryHandoffScope = request.DeliveryHandoffScope;
        }
        if (request.DeliveryHandoffRisks is not null)
        {
            opp.DeliveryHandoffRisks = request.DeliveryHandoffRisks;
        }
        if (request.DeliveryHandoffTimeline is not null)
        {
            opp.DeliveryHandoffTimeline = request.DeliveryHandoffTimeline;
        }
        if (request.DeliveryStatus is not null)
        {
            opp.DeliveryStatus = request.DeliveryStatus;
        }
        if (request.DeliveryCompletedAtUtc.HasValue)
        {
            opp.DeliveryCompletedAtUtc = request.DeliveryCompletedAtUtc;
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

        if (previousContractStart != opp.ContractStartDateUtc)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    opp.Id,
                    "ContractStartChanged",
                    "ContractStartDateUtc",
                    previousContractStart?.ToString("u"),
                    opp.ContractStartDateUtc?.ToString("u"),
                    actor),
                cancellationToken);
        }

        if (previousContractEnd != opp.ContractEndDateUtc)
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    opp.Id,
                    "ContractEndChanged",
                    "ContractEndDateUtc",
                    previousContractEnd?.ToString("u"),
                    opp.ContractEndDateUtc?.ToString("u"),
                    actor),
                cancellationToken);
        }

        if (!string.Equals(previousForecastCategory, opp.ForecastCategory, StringComparison.OrdinalIgnoreCase))
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    opp.Id,
                    "ForecastCategoryChanged",
                    "ForecastCategory",
                    previousForecastCategory,
                    opp.ForecastCategory,
                    actor),
                cancellationToken);
        }

        if (!string.Equals(previousOpportunityType, opp.OpportunityType, StringComparison.OrdinalIgnoreCase))
        {
            await _auditEvents.TrackAsync(
                CreateAuditEntry(
                    opp.Id,
                    "OpportunityTypeChanged",
                    "OpportunityType",
                    previousOpportunityType,
                    opp.OpportunityType,
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

        if (!wasWon && opp.IsWon)
        {
            await ApplyClosedWonDefaultsAsync(opp, actor, cancellationToken);
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
        var previousForecastCategory = opp.ForecastCategory;

        var nextStageId = await ResolveStageIdAsync(null, stageName, cancellationToken);
        var stageForecastCategory = await ResolveStageForecastCategoryAsync(nextStageId, cancellationToken);
        var resolvedForecastCategory = ResolveForecastCategory(null, stageForecastCategory, opp.ForecastCategory);
        var forecastError = ValidateForecastCategory(stageName, resolvedForecastCategory, stageForecastCategory, opp.IsClosed, opp.IsWon);
        if (forecastError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(forecastError);
        }

        var stageError = await ValidateStageChangeAsync(opp, stageName, resolvedForecastCategory, null, cancellationToken);
        if (stageError is not null)
        {
            return OpportunityOperationResult<bool>.Fail(stageError);
        }

        if (nextStageId != opp.StageId)
        {
            var previousStageName = await ResolveStageNameAsync(opp.StageId, cancellationToken);
            opp.StageId = nextStageId;
            opp.IsClosed = false;
            opp.IsWon = false;
            opp.ForecastCategory = resolvedForecastCategory;
            opp.UpdatedAtUtc = DateTime.UtcNow;
            AddStageHistory(opp, nextStageId, "Stage updated", actor);
            var nextStageName = await ResolveStageNameAsync(nextStageId, cancellationToken);
            await _auditEvents.TrackAsync(
                CreateAuditEntry(opp.Id, "StageChanged", "Stage", previousStageName, nextStageName, actor),
                cancellationToken);
            if (!string.Equals(previousForecastCategory, opp.ForecastCategory, StringComparison.OrdinalIgnoreCase))
            {
                await _auditEvents.TrackAsync(
                    CreateAuditEntry(
                        opp.Id,
                        "ForecastCategoryChanged",
                        "ForecastCategory",
                        previousForecastCategory,
                        opp.ForecastCategory,
                        actor),
                    cancellationToken);
            }
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

    public async Task<RenewalAutomationResultDto> RunRenewalAutomationAsync(ActorContext actor, CancellationToken cancellationToken = default)
    {
        var now = DateTime.UtcNow.Date;
        var renewalWindowEnd = now.AddDays(90);
        var prospectingStageId = await ResolveStageIdAsync(null, "Prospecting", cancellationToken);
        var prospectingForecastCategory = await ResolveStageForecastCategoryAsync(prospectingStageId, cancellationToken);
        var defaultForecastCategory = ResolveForecastCategory("Pipeline", prospectingForecastCategory) ?? "Pipeline";

        var baseOpportunities = await _dbContext.Opportunities
            .Where(o => !o.IsDeleted
                        && o.IsClosed
                        && o.IsWon
                        && o.ContractEndDateUtc.HasValue
                        && o.ContractEndDateUtc.Value.Date >= now
                        && o.ContractEndDateUtc.Value.Date <= renewalWindowEnd
                        && o.OpportunityType != "Renewal")
            .ToListAsync(cancellationToken);

        var renewalsCreated = 0;
        var reminderTasksCreated = 0;

        foreach (var opportunity in baseOpportunities)
        {
            var daysToEnd = (opportunity.ContractEndDateUtc!.Value.Date - now).TotalDays;
            if (daysToEnd < 0)
            {
                continue;
            }

            Opportunity? renewalOpportunity = null;
            if (opportunity.RenewalOpportunityId.HasValue && opportunity.RenewalOpportunityId.Value != Guid.Empty)
            {
                renewalOpportunity = await _dbContext.Opportunities
                    .FirstOrDefaultAsync(
                        o => o.Id == opportunity.RenewalOpportunityId.Value && !o.IsDeleted,
                        cancellationToken);
            }

            if (renewalOpportunity is null)
            {
                renewalOpportunity = await CreateRenewalOpportunityAsync(
                    opportunity,
                    prospectingStageId,
                    defaultForecastCategory,
                    actor,
                    cancellationToken);
                renewalsCreated++;
            }

            if (daysToEnd <= 90 && !opportunity.Renewal90TaskCreatedAtUtc.HasValue)
            {
                if (await CreateRenewalReminderTaskAsync(opportunity, renewalOpportunity.Id, 90, actor, cancellationToken))
                {
                    opportunity.Renewal90TaskCreatedAtUtc = DateTime.UtcNow;
                    reminderTasksCreated++;
                }
            }

            if (daysToEnd <= 60 && !opportunity.Renewal60TaskCreatedAtUtc.HasValue)
            {
                if (await CreateRenewalReminderTaskAsync(opportunity, renewalOpportunity.Id, 60, actor, cancellationToken))
                {
                    opportunity.Renewal60TaskCreatedAtUtc = DateTime.UtcNow;
                    reminderTasksCreated++;
                }
            }

            if (daysToEnd <= 30 && !opportunity.Renewal30TaskCreatedAtUtc.HasValue)
            {
                if (await CreateRenewalReminderTaskAsync(opportunity, renewalOpportunity.Id, 30, actor, cancellationToken))
                {
                    opportunity.Renewal30TaskCreatedAtUtc = DateTime.UtcNow;
                    reminderTasksCreated++;
                }
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return new RenewalAutomationResultDto(renewalsCreated, reminderTasksCreated);
    }

    public async Task<IReadOnlyList<ExpansionSignalDto>> GetExpansionSignalsAsync(CancellationToken cancellationToken = default)
    {
        const int lookbackDays = 180;
        const int contractLookaheadDays = 180;
        const int recentContractGraceDays = 30;
        var now = DateTime.UtcNow;
        var cutoff = now.AddDays(-lookbackDays);
        var contractDueStart = now.AddDays(-recentContractGraceDays);
        var contractDueEnd = now.AddDays(contractLookaheadDays);

        var candidateActivities = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.Outcome != null
                        && a.CreatedAtUtc >= cutoff)
            .Select(a => new
            {
                a.RelatedEntityId,
                a.Outcome,
                a.CreatedAtUtc,
                a.CompletedDateUtc
            })
            .ToListAsync(cancellationToken);

        var signalActivities = candidateActivities
            .Where(a => IsExpansionSignalOutcome(a.Outcome))
            .ToList();

        var contractDueOpportunityIds = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted
                        && o.IsClosed
                        && o.IsWon
                        && o.ContractEndDateUtc.HasValue
                        && o.ContractEndDateUtc.Value >= contractDueStart
                        && o.ContractEndDateUtc.Value <= contractDueEnd)
            .Select(o => o.Id)
            .ToListAsync(cancellationToken);

        var opportunityIds = signalActivities
            .Select(a => a.RelatedEntityId)
            .Concat(contractDueOpportunityIds)
            .Distinct()
            .ToList();

        if (opportunityIds.Count == 0)
        {
            return Array.Empty<ExpansionSignalDto>();
        }

        var opportunities = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id) && !o.IsDeleted && o.IsClosed && o.IsWon)
            .Select(o => new
            {
                o.Id,
                o.AccountId,
                o.Name,
                o.ContractEndDateUtc,
                o.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        if (opportunities.Count == 0)
        {
            return Array.Empty<ExpansionSignalDto>();
        }

        var accountIds = opportunities.Select(o => o.AccountId).Distinct().ToList();
        var accounts = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => accountIds.Contains(a.Id) && !a.IsDeleted)
            .Select(a => new { a.Id, a.Name })
            .ToListAsync(cancellationToken);
        var accountNameById = accounts.ToDictionary(a => a.Id, a => a.Name);

        var expansionAccounts = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted
                        && !o.IsClosed
                        && accountIds.Contains(o.AccountId)
                        && string.Equals(o.OpportunityType, "Expansion", StringComparison.OrdinalIgnoreCase))
            .Select(o => o.AccountId)
            .Distinct()
            .ToListAsync(cancellationToken);
        var expansionAccountSet = expansionAccounts.ToHashSet();

        var signals = new List<ExpansionSignalDto>();
        var signalLookup = signalActivities
            .GroupBy(a => a.RelatedEntityId)
            .ToDictionary(g => g.Key, g => g.ToList());

        foreach (var opportunity in opportunities)
        {
            signalLookup.TryGetValue(opportunity.Id, out var entries);
            entries ??= [];

            var lastSignalAtUtc = entries.Count > 0
                ? entries.Max(e => e.CompletedDateUtc ?? e.CreatedAtUtc)
                : opportunity.ContractEndDateUtc ?? opportunity.CreatedAtUtc;
            var accountName = accountNameById.TryGetValue(opportunity.AccountId, out var name) ? name : "Account";
            signals.Add(new ExpansionSignalDto(
                opportunity.Id,
                opportunity.AccountId,
                accountName,
                opportunity.Name,
                opportunity.ContractEndDateUtc,
                lastSignalAtUtc,
                entries.Count,
                expansionAccountSet.Contains(opportunity.AccountId)));
        }

        return signals
            .OrderByDescending(s => s.SignalCount)
            .ThenByDescending(s => s.LastSignalAtUtc)
            .ToList();
    }

    private static bool IsExpansionSignalOutcome(string? outcome)
    {
        if (string.IsNullOrWhiteSpace(outcome))
        {
            return false;
        }

        var normalized = outcome.Trim();
        return normalized.Contains("expansion", StringComparison.OrdinalIgnoreCase)
               || normalized.Contains("upsell", StringComparison.OrdinalIgnoreCase)
               || normalized.Contains("cross-sell", StringComparison.OrdinalIgnoreCase)
               || normalized.Contains("cross sell", StringComparison.OrdinalIgnoreCase);
    }

    public async Task<OpportunityOperationResult<OpportunityListItemDto>> CreateExpansionAsync(Guid sourceOpportunityId, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var source = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == sourceOpportunityId && !o.IsDeleted, cancellationToken);
        if (source is null)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.NotFoundResult();
        }

        if (!source.IsClosed || !source.IsWon)
        {
            return OpportunityOperationResult<OpportunityListItemDto>.Fail("Expansion opportunities can only be created from closed won deals.");
        }

        var prospectingStageId = await ResolveStageIdAsync(null, "Prospecting", cancellationToken);
        var prospectingStageName = await ResolveStageNameAsync(prospectingStageId, cancellationToken) ?? "Prospecting";
        var prospectingForecastCategory = await ResolveStageForecastCategoryAsync(prospectingStageId, cancellationToken);
        var forecastCategory = ResolveForecastCategory("Pipeline", prospectingForecastCategory) ?? "Pipeline";

        var opportunity = new Opportunity
        {
            Name = $"{source.Name} Expansion",
            AccountId = source.AccountId,
            PrimaryContactId = source.PrimaryContactId,
            StageId = prospectingStageId,
            OwnerId = source.OwnerId,
            Amount = source.Amount,
            Currency = source.Currency,
            Probability = source.Probability,
            ExpectedCloseDate = DateTime.UtcNow.AddMonths(3),
            ForecastCategory = forecastCategory,
            OpportunityType = "Expansion",
            Summary = $"Expansion created from {source.Name} on {DateTime.UtcNow:u}.",
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Opportunities.Add(opportunity);
        AddStageHistory(opportunity, prospectingStageId, "Expansion created", actor);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(opportunity.Id, "Created", null, null, null, actor),
            cancellationToken);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(source.Id, "ExpansionCreated", "ExpansionOpportunityId", null, opportunity.Id.ToString(), actor),
            cancellationToken);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var dto = await GetAsync(opportunity.Id, cancellationToken);
        return dto is null
            ? OpportunityOperationResult<OpportunityListItemDto>.Fail("Expansion opportunity created but could not be loaded.")
            : OpportunityOperationResult<OpportunityListItemDto>.Ok(dto);
    }

    public async Task<IReadOnlyList<OpportunityReviewThreadItemDto>?> GetReviewThreadAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return null;
        }

        var activities = await _dbContext.Activities
            .AsNoTracking()
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == id
                        && (a.Subject.StartsWith(ReviewSubjectPrefix)
                            || a.Subject.StartsWith(ReviewAcknowledgmentSubjectPrefix)))
            .OrderByDescending(a => a.CreatedAtUtc)
            .Take(50)
            .ToListAsync(cancellationToken);

        if (activities.Count == 0)
        {
            return Array.Empty<OpportunityReviewThreadItemDto>();
        }

        var ownerIds = activities.Select(a => a.OwnerId).Distinct().ToList();
        var ownerNames = await _dbContext.Users
            .AsNoTracking()
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var requiresAck = activities.Any(a =>
            a.Subject.StartsWith(ReviewAcknowledgmentSubjectPrefix, StringComparison.OrdinalIgnoreCase)
            && !a.CompletedDateUtc.HasValue);

        return activities.Select(a =>
        {
            var kind = a.Subject.StartsWith(ReviewAcknowledgmentSubjectPrefix, StringComparison.OrdinalIgnoreCase)
                ? "Acknowledgment"
                : "Review";
            var outcome = string.IsNullOrWhiteSpace(a.Outcome) ? kind : a.Outcome!;
            var ownerName = ownerNames.TryGetValue(a.OwnerId, out var name) ? name : "User";
            return new OpportunityReviewThreadItemDto(
                a.Id,
                kind,
                outcome,
                a.Subject,
                a.Description,
                a.OwnerId,
                ownerName,
                a.CreatedAtUtc,
                a.DueDateUtc,
                a.CompletedDateUtc,
                requiresAck);
        }).ToList();
    }

    public async Task<OpportunityOperationResult<OpportunityReviewThreadItemDto>> AddReviewOutcomeAsync(Guid id, OpportunityReviewOutcomeRequest request, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.NotFoundResult();
        }

        var outcome = request.Outcome?.Trim();
        if (string.IsNullOrWhiteSpace(outcome) || !ReviewOutcomes.Contains(outcome))
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Fail("Review outcome is invalid.");
        }

        var subject = $"{ReviewSubjectPrefix} {outcome}";
        var description = string.IsNullOrWhiteSpace(request.Comment)
            ? $"Manager review outcome: {outcome}."
            : request.Comment.Trim();

        var reviewActivityResult = await _activityService.CreateAsync(
            new ActivityUpsertRequest(
                subject,
                description,
                outcome,
                null,
                ActivityType.Note,
                "Normal",
                DateTime.UtcNow,
                DateTime.UtcNow,
                null,
                null,
                ActivityRelationType.Opportunity,
                id,
                actor.UserId ?? opportunity.OwnerId),
            actor,
            cancellationToken);

        if (!reviewActivityResult.Success || reviewActivityResult.Value is null)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Fail(reviewActivityResult.Error ?? "Unable to add review outcome.");
        }

        var requiresAck = string.Equals(outcome, ReviewOutcomeNeedsWork, StringComparison.OrdinalIgnoreCase)
            || string.Equals(outcome, ReviewOutcomeEscalated, StringComparison.OrdinalIgnoreCase);
        if (requiresAck)
        {
            var dueDate = request.AcknowledgmentDueAtUtc ?? DateTime.UtcNow.AddDays(2);
            var ackSubject = $"{ReviewAcknowledgmentSubjectPrefix} {outcome}";
            var ackDescription = $"Acknowledge manager review outcome: {outcome}.{Environment.NewLine}{description}";
            await _activityService.CreateAsync(
                new ActivityUpsertRequest(
                    ackSubject,
                    ackDescription,
                    null,
                    null,
                    ActivityType.Task,
                    "High",
                    dueDate,
                    null,
                    null,
                    null,
                    ActivityRelationType.Opportunity,
                    id,
                    opportunity.OwnerId),
                actor,
                cancellationToken);
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                id,
                "ReviewOutcomeAdded",
                "ReviewOutcome",
                null,
                outcome,
                actor),
            cancellationToken);

        var ownerName = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == reviewActivityResult.Value.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Manager";

        var threadItem = new OpportunityReviewThreadItemDto(
            reviewActivityResult.Value.Id,
            "Review",
            outcome,
            subject,
            description,
            reviewActivityResult.Value.OwnerId ?? opportunity.OwnerId,
            ownerName,
            reviewActivityResult.Value.CreatedAtUtc,
            reviewActivityResult.Value.DueDateUtc,
            reviewActivityResult.Value.CompletedDateUtc,
            requiresAck);

        return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Ok(threadItem);
    }

    public async Task<OpportunityOperationResult<OpportunityReviewThreadItemDto>> AcknowledgeReviewAsync(Guid id, ActorContext actor, CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.NotFoundResult();
        }

        var userId = actor.UserId;
        if (!userId.HasValue || userId.Value == Guid.Empty)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Fail("User context is required to acknowledge review.");
        }

        var pendingAck = await _dbContext.Activities
            .Where(a => !a.IsDeleted
                        && a.RelatedEntityType == ActivityRelationType.Opportunity
                        && a.RelatedEntityId == id
                        && a.OwnerId == userId.Value
                        && a.CompletedDateUtc == null
                        && a.Subject.StartsWith(ReviewAcknowledgmentSubjectPrefix))
            .OrderByDescending(a => a.CreatedAtUtc)
            .FirstOrDefaultAsync(cancellationToken);

        if (pendingAck is null)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Fail("No pending review acknowledgment found.");
        }

        var ackResult = await _activityService.UpdateAsync(
            pendingAck.Id,
            new ActivityUpsertRequest(
                pendingAck.Subject,
                pendingAck.Description,
                ReviewOutcomeAcknowledged,
                pendingAck.TemplateKey,
                pendingAck.Type,
                pendingAck.Priority,
                pendingAck.DueDateUtc,
                DateTime.UtcNow,
                null,
                null,
                pendingAck.RelatedEntityType,
                pendingAck.RelatedEntityId,
                pendingAck.OwnerId),
            actor,
            cancellationToken);

        if (!ackResult.Success)
        {
            return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Fail(ackResult.Error ?? "Unable to acknowledge review.");
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                id,
                "ReviewAcknowledged",
                "ReviewAcknowledgment",
                null,
                pendingAck.Id.ToString(),
                actor),
            cancellationToken);

        var ownerName = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == pendingAck.OwnerId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Rep";

        var threadItem = new OpportunityReviewThreadItemDto(
            pendingAck.Id,
            "Acknowledgment",
            ReviewOutcomeAcknowledged,
            pendingAck.Subject,
            pendingAck.Description,
            pendingAck.OwnerId,
            ownerName,
            pendingAck.CreatedAtUtc,
            pendingAck.DueDateUtc,
            DateTime.UtcNow,
            false);

        return OpportunityOperationResult<OpportunityReviewThreadItemDto>.Ok(threadItem);
    }

    public async Task<IReadOnlyList<OpportunityTeamMemberDto>?> GetTeamAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var exists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (!exists)
        {
            return null;
        }

        var team = await _dbContext.OpportunityTeamMembers
            .AsNoTracking()
            .Where(m => m.OpportunityId == id && !m.IsDeleted)
            .Join(_dbContext.Users,
                member => member.UserId,
                user => user.Id,
                (member, user) => new OpportunityTeamMemberDto(
                    member.UserId,
                    user.FullName,
                    member.Role,
                    member.CreatedAtUtc,
                    member.UpdatedAtUtc))
            .OrderBy(m => m.UserName)
            .ToListAsync(cancellationToken);

        return team;
    }

    public async Task<OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>> UpdateTeamAsync(
        Guid id,
        IReadOnlyList<OpportunityTeamMemberRequest> members,
        ActorContext actor,
        CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .FirstOrDefaultAsync(o => o.Id == id && !o.IsDeleted, cancellationToken);
        if (opportunity is null)
        {
            return OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>.NotFoundResult();
        }

        var normalized = members
            .Where(m => m.UserId != Guid.Empty)
            .Select(m => new
            {
                m.UserId,
                Role = string.IsNullOrWhiteSpace(m.Role) ? string.Empty : m.Role.Trim()
            })
            .ToList();

        if (normalized.Any(m => string.IsNullOrWhiteSpace(m.Role)))
        {
            return OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>.Fail("Team member role is required.");
        }

        var distinctUserIds = normalized.Select(m => m.UserId).Distinct().ToList();
        if (distinctUserIds.Count != normalized.Count)
        {
            return OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>.Fail("Duplicate team members are not allowed.");
        }

        var tenantId = _tenantProvider.TenantId;
        var validUsers = await _dbContext.Users
            .Where(u => distinctUserIds.Contains(u.Id) && u.IsActive && !u.IsDeleted && (tenantId == Guid.Empty || u.TenantId == tenantId))
            .Select(u => u.Id)
            .ToListAsync(cancellationToken);
        if (validUsers.Count != distinctUserIds.Count)
        {
            return OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>.Fail("One or more team members are invalid or inactive.");
        }

        var existing = await _dbContext.OpportunityTeamMembers
            .Where(m => m.OpportunityId == id)
            .ToListAsync(cancellationToken);

        var existingByUser = existing.ToDictionary(m => m.UserId, m => m);
        var now = DateTime.UtcNow;

        foreach (var member in existing)
        {
            if (distinctUserIds.Contains(member.UserId))
            {
                continue;
            }

            if (!member.IsDeleted)
            {
                member.IsDeleted = true;
                member.DeletedAtUtc = now;
                member.DeletedBy = actor.UserName;
                member.UpdatedAtUtc = now;
                member.UpdatedBy = actor.UserName;
            }
        }

        foreach (var member in normalized)
        {
            if (existingByUser.TryGetValue(member.UserId, out var existingMember))
            {
                if (existingMember.IsDeleted)
                {
                    existingMember.IsDeleted = false;
                    existingMember.DeletedAtUtc = null;
                    existingMember.DeletedBy = null;
                }

                if (!string.Equals(existingMember.Role, member.Role, StringComparison.OrdinalIgnoreCase))
                {
                    existingMember.Role = member.Role;
                }

                existingMember.UpdatedAtUtc = now;
                existingMember.UpdatedBy = actor.UserName;
                continue;
            }

            _dbContext.OpportunityTeamMembers.Add(new OpportunityTeamMember
            {
                OpportunityId = id,
                UserId = member.UserId,
                Role = member.Role,
                TenantId = opportunity.TenantId,
                CreatedAtUtc = now,
                CreatedBy = actor.UserName
            });
        }

        await _dbContext.SaveChangesAsync(cancellationToken);

        var team = await GetTeamAsync(id, cancellationToken) ?? Array.Empty<OpportunityTeamMemberDto>();
        return OpportunityOperationResult<IReadOnlyList<OpportunityTeamMemberDto>>.Ok(team);
    }

    private async Task EnsureOnboardingDefaultsAsync(Opportunity opportunity, ActorContext actor, CancellationToken cancellationToken)
    {
        var hasItems = await _dbContext.OpportunityOnboardingItems
            .AnyAsync(i => i.OpportunityId == opportunity.Id && !i.IsDeleted, cancellationToken);
        if (hasItems)
        {
            return;
        }

        var now = DateTime.UtcNow;
        var items = new List<OpportunityOnboardingItem>
        {
            new()
            {
                OpportunityId = opportunity.Id,
                Type = "Checklist",
                Title = "Define success criteria",
                Status = "Pending",
                DueDateUtc = now.AddDays(3),
                TenantId = opportunity.TenantId,
                CreatedAtUtc = now,
                CreatedBy = actor.UserName
            },
            new()
            {
                OpportunityId = opportunity.Id,
                Type = "Checklist",
                Title = "Confirm stakeholders & kickoff attendees",
                Status = "Pending",
                DueDateUtc = now.AddDays(5),
                TenantId = opportunity.TenantId,
                CreatedAtUtc = now,
                CreatedBy = actor.UserName
            },
            new()
            {
                OpportunityId = opportunity.Id,
                Type = "Milestone",
                Title = "Kickoff meeting scheduled",
                Status = "Pending",
                DueDateUtc = now.AddDays(7),
                TenantId = opportunity.TenantId,
                CreatedAtUtc = now,
                CreatedBy = actor.UserName
            },
            new()
            {
                OpportunityId = opportunity.Id,
                Type = "Milestone",
                Title = "Implementation plan approved",
                Status = "Pending",
                DueDateUtc = now.AddDays(14),
                TenantId = opportunity.TenantId,
                CreatedAtUtc = now,
                CreatedBy = actor.UserName
            }
        };

        _dbContext.OpportunityOnboardingItems.AddRange(items);
        if (string.IsNullOrWhiteSpace(opportunity.DeliveryStatus))
        {
            opportunity.DeliveryStatus = "Not Started";
        }
        opportunity.UpdatedAtUtc = now;

        await _auditEvents.TrackAsync(
            CreateAuditEntry(opportunity.Id, "OnboardingSeeded", "Onboarding", null, $"{items.Count} items", actor),
            cancellationToken);
    }

    private async Task ApplyClosedWonDefaultsAsync(Opportunity opportunity, ActorContext actor, CancellationToken cancellationToken)
    {
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == opportunity.TenantId, cancellationToken);

        var termMonths = tenant?.DefaultContractTermMonths ?? DefaultContractTermMonthsFallback;
        if (termMonths < 1)
        {
            termMonths = DefaultContractTermMonthsFallback;
        }

        var contractStart = opportunity.ContractStartDateUtc
                            ?? opportunity.ExpectedCloseDate
                            ?? DateTime.UtcNow;

        if (!opportunity.ContractStartDateUtc.HasValue)
        {
            opportunity.ContractStartDateUtc = contractStart;
        }

        if (!opportunity.ContractEndDateUtc.HasValue)
        {
            opportunity.ContractEndDateUtc = contractStart.AddMonths(termMonths);
        }

        if (!opportunity.DeliveryOwnerId.HasValue)
        {
            opportunity.DeliveryOwnerId = await ResolveDefaultDeliveryOwnerAsync(
                tenant,
                opportunity.OwnerId,
                cancellationToken);
        }

        if (string.IsNullOrWhiteSpace(opportunity.DeliveryStatus))
        {
            opportunity.DeliveryStatus = "Not Started";
        }

        await EnsureOnboardingDefaultsAsync(opportunity, actor, cancellationToken);
    }

    private async Task<Guid> ResolveDefaultDeliveryOwnerAsync(
        Tenant? tenant,
        Guid fallbackOwnerId,
        CancellationToken cancellationToken)
    {
        var roleId = tenant?.DefaultDeliveryOwnerRoleId;
        if (roleId.HasValue && roleId.Value != Guid.Empty)
        {
            var tenantId = _tenantProvider.TenantId;
            var candidate = await _dbContext.UserRoles
                .AsNoTracking()
                .Where(ur => ur.RoleId == roleId.Value
                             && !ur.IsDeleted
                             && (tenantId == Guid.Empty || ur.TenantId == tenantId))
                .Join(_dbContext.Users,
                    ur => ur.UserId,
                    user => user.Id,
                    (ur, user) => new { ur, user })
                .Where(x => x.user.IsActive && !x.user.IsDeleted)
                .OrderBy(x => x.user.FullName)
                .Select(x => x.user.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (candidate != Guid.Empty)
            {
                return candidate;
            }
        }

        return fallbackOwnerId;
    }

    private static bool HasLockedFieldChanges(
        Opportunity opportunity,
        OpportunityUpsertRequest request,
        Guid resolvedAccountId,
        Guid resolvedOwnerId,
        Guid nextStageId,
        string? resolvedForecastCategory,
        string opportunityType)
    {
        if (!string.Equals(opportunity.Name, request.Name, StringComparison.Ordinal))
        {
            return true;
        }
        if (opportunity.AccountId != resolvedAccountId)
        {
            return true;
        }
        if (opportunity.PrimaryContactId != request.PrimaryContactId)
        {
            return true;
        }
        if (opportunity.StageId != nextStageId)
        {
            return true;
        }
        if (opportunity.OwnerId != resolvedOwnerId)
        {
            return true;
        }
        if (opportunity.Amount != request.Amount)
        {
            return true;
        }
        var currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency;
        if (!string.Equals(opportunity.Currency, currency, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (opportunity.Probability != request.Probability)
        {
            return true;
        }
        if (opportunity.ExpectedCloseDate != request.ExpectedCloseDate)
        {
            return true;
        }
        if (!string.Equals(opportunity.ForecastCategory ?? string.Empty, resolvedForecastCategory ?? string.Empty, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (!string.Equals(opportunity.OpportunityType, opportunityType, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (!string.Equals(opportunity.Summary ?? string.Empty, request.Summary ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.Requirements ?? string.Empty, request.Requirements ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.BuyingProcess ?? string.Empty, request.BuyingProcess ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.SuccessCriteria ?? string.Empty, request.SuccessCriteria ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (opportunity.DiscountPercent != request.DiscountPercent)
        {
            return true;
        }
        if (opportunity.DiscountAmount != request.DiscountAmount)
        {
            return true;
        }
        if (!string.Equals(opportunity.PricingNotes ?? string.Empty, request.PricingNotes ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.SecurityReviewStatus ?? string.Empty, request.SecurityReviewStatus ?? string.Empty, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (!string.Equals(opportunity.SecurityNotes ?? string.Empty, request.SecurityNotes ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.LegalReviewStatus ?? string.Empty, request.LegalReviewStatus ?? string.Empty, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (!string.Equals(opportunity.LegalNotes ?? string.Empty, request.LegalNotes ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.ProposalStatus ?? string.Empty, request.ProposalStatus ?? string.Empty, StringComparison.OrdinalIgnoreCase))
        {
            return true;
        }
        if (!string.Equals(opportunity.ProposalNotes ?? string.Empty, request.ProposalNotes ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.ProposalLink ?? string.Empty, request.ProposalLink ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (opportunity.ProposalGeneratedAtUtc != request.ProposalGeneratedAtUtc)
        {
            return true;
        }
        if (opportunity.ProposalSentAtUtc != request.ProposalSentAtUtc)
        {
            return true;
        }
        if (!string.Equals(opportunity.PreSalesScope ?? string.Empty, request.PreSalesScope ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (!string.Equals(opportunity.PreSalesApproach ?? string.Empty, request.PreSalesApproach ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }
        if (opportunity.IsClosed != request.IsClosed)
        {
            return true;
        }
        if (opportunity.IsWon != request.IsWon)
        {
            return true;
        }
        if (!string.Equals(opportunity.WinLossReason ?? string.Empty, request.WinLossReason ?? string.Empty, StringComparison.Ordinal))
        {
            return true;
        }

        return false;
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

    private async Task<Opportunity> CreateRenewalOpportunityAsync(
        Opportunity baseOpportunity,
        Guid stageId,
        string forecastCategory,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var contractEnd = baseOpportunity.ContractEndDateUtc!.Value;
        var durationDays = ResolveContractDurationDays(baseOpportunity);
        var renewalContractStart = contractEnd;
        var renewalContractEnd = renewalContractStart.AddDays(durationDays);
        var renewalName = $"{baseOpportunity.Name} Renewal {renewalContractStart:yyyy}";
        var renewalExpectedClose = renewalContractStart.AddDays(-30);

        var renewal = new Opportunity
        {
            Name = renewalName,
            AccountId = baseOpportunity.AccountId,
            PrimaryContactId = baseOpportunity.PrimaryContactId,
            StageId = stageId,
            OwnerId = baseOpportunity.OwnerId,
            Amount = baseOpportunity.Amount,
            Currency = baseOpportunity.Currency,
            Probability = baseOpportunity.Probability,
            ExpectedCloseDate = renewalExpectedClose,
            ContractStartDateUtc = renewalContractStart,
            ContractEndDateUtc = renewalContractEnd,
            ForecastCategory = forecastCategory,
            OpportunityType = "Renewal",
            RenewalOfOpportunityId = baseOpportunity.Id,
            Summary = $"Auto-generated renewal for {baseOpportunity.Name} ending {contractEnd:u}.",
            CreatedAtUtc = DateTime.UtcNow
        };

        _dbContext.Opportunities.Add(renewal);
        AddStageHistory(renewal, stageId, "Renewal created", actor);
        baseOpportunity.RenewalOpportunityId = renewal.Id;

        await _auditEvents.TrackAsync(
            CreateAuditEntry(renewal.Id, "Created", null, null, null, actor),
            cancellationToken);
        await _auditEvents.TrackAsync(
            CreateAuditEntry(
                baseOpportunity.Id,
                "RenewalCreated",
                "RenewalOpportunityId",
                null,
                renewal.Id.ToString(),
                actor),
            cancellationToken);

        await _dbContext.SaveChangesAsync(cancellationToken);
        return renewal;
    }

    private async Task<bool> CreateRenewalReminderTaskAsync(
        Opportunity baseOpportunity,
        Guid renewalOpportunityId,
        int daysBeforeEnd,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        var contractEnd = baseOpportunity.ContractEndDateUtc;
        if (!contractEnd.HasValue)
        {
            return false;
        }

        var subject = $"Renewal {daysBeforeEnd}-day reminder: {baseOpportunity.Name}";
        var description = $"Contract ends on {contractEnd.Value:u}. Review renewal opportunity and next steps.";
        var dueDate = DateTime.UtcNow.AddDays(1);

        var result = await _activityService.CreateAsync(
            new ActivityUpsertRequest(
                subject,
                description,
                null,
                null,
                ActivityType.Task,
                "High",
                dueDate,
                null,
                null,
                null,
                ActivityRelationType.Opportunity,
                renewalOpportunityId,
                baseOpportunity.OwnerId),
            actor,
            cancellationToken);

        return result.Success && result.Value is not null;
    }

    private static int ResolveContractDurationDays(Opportunity opportunity)
    {
        if (opportunity.ContractStartDateUtc.HasValue
            && opportunity.ContractEndDateUtc.HasValue
            && opportunity.ContractEndDateUtc.Value > opportunity.ContractStartDateUtc.Value)
        {
            var duration = (opportunity.ContractEndDateUtc.Value - opportunity.ContractStartDateUtc.Value).TotalDays;
            return (int)Math.Clamp(Math.Round(duration), 30, 3650);
        }

        return 365;
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

    private async Task<bool> HasDecisionMakerAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        if (opportunity.PrimaryContactId.HasValue)
        {
            var primaryDecisionMaker = await _dbContext.Contacts
                .AsNoTracking()
                .AnyAsync(
                    c => c.Id == opportunity.PrimaryContactId.Value
                         && !c.IsDeleted
                         && c.BuyingRole != null
                         && string.Equals(c.BuyingRole, DecisionMakerRole, StringComparison.OrdinalIgnoreCase),
                    cancellationToken);
            if (primaryDecisionMaker)
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
                     && string.Equals(c.BuyingRole, DecisionMakerRole, StringComparison.OrdinalIgnoreCase),
                cancellationToken);
    }

    private async Task<bool> HasCompletedDemoAsync(Opportunity opportunity, CancellationToken cancellationToken)
    {
        return await _dbContext.Activities
            .AsNoTracking()
            .AnyAsync(
                a => !a.IsDeleted
                     && a.RelatedEntityType == ActivityRelationType.Opportunity
                     && a.RelatedEntityId == opportunity.Id
                     && a.CompletedDateUtc.HasValue
                     && !string.IsNullOrWhiteSpace(a.Outcome)
                     && a.TemplateKey != null
                     && DemoTemplateKeys.Contains(a.TemplateKey),
                cancellationToken);
    }

    private async Task<bool> HasDiscoveryActivityAsync(Guid opportunityId, CancellationToken cancellationToken)
    {
        return await _dbContext.Activities
            .AsNoTracking()
            .AnyAsync(
                a => !a.IsDeleted
                     && a.RelatedEntityType == ActivityRelationType.Opportunity
                     && a.RelatedEntityId == opportunityId
                     && a.Type == ActivityType.Meeting
                     && (a.Subject.Contains("Discovery", StringComparison.OrdinalIgnoreCase)
                         || (a.Description ?? string.Empty).Contains("Discovery", StringComparison.OrdinalIgnoreCase))
                     && (a.DueDateUtc.HasValue || a.CompletedDateUtc.HasValue),
                cancellationToken);
    }

    private async Task<string?> ValidateStageChangeAsync(
        Opportunity opportunity,
        string nextStageName,
        string? forecastCategory,
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

        if (StagesRequiringDecisionMaker.Contains(nextStageName))
        {
            var hasDecisionMaker = await HasDecisionMakerAsync(opportunity, cancellationToken);
            if (!hasDecisionMaker)
            {
                return "Decision maker contact is required before moving beyond qualification.";
            }
        }

        if (StagesRequiringPainSummary.Contains(nextStageName))
        {
            var summary = request?.Summary ?? opportunity.Summary;
            if (string.IsNullOrWhiteSpace(summary))
            {
                return $"Pain/problem summary is required before moving to {nextStageName}.";
            }
        }

        if (StagesRequiringQualificationFit.Contains(nextStageName))
        {
            var requirements = request?.Requirements ?? opportunity.Requirements;
            if (string.IsNullOrWhiteSpace(requirements))
            {
                return "Capture requirements before moving to qualification or later stages.";
            }
            var buyingProcess = request?.BuyingProcess ?? opportunity.BuyingProcess;
            if (string.IsNullOrWhiteSpace(buyingProcess))
            {
                return "Capture buying process before moving to qualification or later stages.";
            }
            var successCriteria = request?.SuccessCriteria ?? opportunity.SuccessCriteria;
            if (string.IsNullOrWhiteSpace(successCriteria))
            {
                return "Capture success criteria before moving to qualification or later stages.";
            }
        }
        if (StagesRequiringDiscovery.Contains(nextStageName))
        {
            var hasDiscovery = await HasDiscoveryActivityAsync(opportunity.Id, cancellationToken);
            if (!hasDiscovery)
            {
                return $"Discovery meeting must be scheduled and notes captured before moving to {nextStageName}.";
            }
        }

        if (StagesRequiringDemoOutcome.Contains(nextStageName))
        {
            var hasDemo = await HasCompletedDemoAsync(opportunity, cancellationToken);
            if (!hasDemo)
            {
                return "Demo/POC outcome is required before moving to late-stage opportunities.";
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

            if (!string.Equals(forecastCategory, "Commit", StringComparison.OrdinalIgnoreCase))
            {
                return "Forecast category must be Commit before moving to the Commit stage.";
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

    private async Task<string?> ResolveStageForecastCategoryAsync(Guid stageId, CancellationToken cancellationToken)
    {
        return await _dbContext.OpportunityStages
            .Where(s => s.Id == stageId)
            .Select(s => s.ForecastCategory)
            .FirstOrDefaultAsync(cancellationToken);
    }

    private static string? ResolveForecastCategory(string? requested, string? stageDefault, string? current = null)
    {
        var candidate = !string.IsNullOrWhiteSpace(requested)
            ? requested
            : !string.IsNullOrWhiteSpace(stageDefault)
                ? stageDefault
                : current;

        return string.IsNullOrWhiteSpace(candidate) ? null : candidate.Trim();
    }

    private static string? ValidateForecastCategory(string stageName, string? forecastCategory, string? stageForecastCategory, bool isClosed, bool isWon)
    {
        var isClosedStage = stageName.StartsWith("Closed", StringComparison.OrdinalIgnoreCase);
        var requiresClosedForecast = isClosed || isClosedStage;

        if (requiresClosedForecast && string.IsNullOrWhiteSpace(forecastCategory))
        {
            return "Forecast category is required before closing an opportunity.";
        }

        if (!string.IsNullOrWhiteSpace(forecastCategory) && !ForecastCategories.Contains(forecastCategory))
        {
            return "Forecast category is invalid.";
        }

        if (string.Equals(stageName, "Commit", StringComparison.OrdinalIgnoreCase)
            && !string.Equals(forecastCategory, "Commit", StringComparison.OrdinalIgnoreCase))
        {
            return "Forecast category must be Commit before moving to the Commit stage.";
        }

        if (!string.IsNullOrWhiteSpace(stageForecastCategory)
            && !string.IsNullOrWhiteSpace(forecastCategory)
            && !string.Equals(forecastCategory, stageForecastCategory, StringComparison.OrdinalIgnoreCase))
        {
            return $"Forecast category must be {stageForecastCategory} for {stageName} stage.";
        }

        if (requiresClosedForecast)
        {
            if (isWon && !string.Equals(forecastCategory, "Closed", StringComparison.OrdinalIgnoreCase))
            {
                return "Closed won opportunities must use the Closed forecast category.";
            }

            if (!isWon && !string.Equals(forecastCategory, "Omitted", StringComparison.OrdinalIgnoreCase))
            {
                return "Closed lost opportunities must use the Omitted forecast category.";
            }
        }

        return null;
    }

    private static string? ResolveOpportunityType(string? requestedType, string? currentType = null)
    {
        var candidate = !string.IsNullOrWhiteSpace(requestedType) ? requestedType : currentType ?? "New";
        if (string.IsNullOrWhiteSpace(candidate))
        {
            return "New";
        }

        var trimmed = candidate.Trim();
        return OpportunityTypes.Contains(trimmed) ? trimmed : null;
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
            await TrackPolicyGateAsync(
                opportunityId,
                "ApprovalRoleMissing",
                $"Close>{threshold.Value:0.##} {request.Currency ?? "USD"}",
                actor,
                cancellationToken);
            return $"Approval role must be configured before closing high-value opportunities (>{threshold.Value:0.##} {request.Currency ?? "USD"}).";
        }

        if (!opportunityId.HasValue || opportunityId.Value == Guid.Empty)
        {
            return $"Approval required to close opportunities above {threshold.Value:0.##} {request.Currency ?? "USD"}. Save it first, then request approval.";
        }

        var approved = await HasApprovedChainAsync(opportunityId.Value, "Close", cancellationToken);

        if (approved)
        {
            return null;
        }

        var approvalResult = await _approvalService.RequestAsync(
            opportunityId.Value,
            request.Amount,
            request.Currency,
            "Close",
            actor,
            cancellationToken);

        if (!approvalResult.Success)
        {
            return approvalResult.Error ?? "Approval workflow could not be started.";
        }

        await TrackPolicyGateAsync(
            opportunityId,
            "ApprovalRequiredClose",
            $"Close>{threshold.Value:0.##} {request.Currency ?? "USD"}",
            actor,
            cancellationToken);
        return $"Approval required to close opportunities above {threshold.Value:0.##} {request.Currency ?? "USD"}. Request submitted for review.";
    }

    private async Task<string?> ValidateDiscountApprovalAsync(
        OpportunityUpsertRequest request,
        ActorContext actor,
        Guid? opportunityId,
        CancellationToken cancellationToken)
    {
        var discountPercent = request.DiscountPercent ?? 0m;
        var discountAmount = request.DiscountAmount ?? 0m;
        if ((discountPercent > 0 || discountAmount > 0) && string.IsNullOrWhiteSpace(request.PricingNotes))
        {
            return "Pricing notes and objections are required when applying discounts.";
        }
        var requiresApproval = discountPercent >= DiscountPercentApprovalThreshold
                               || discountAmount >= DiscountAmountApprovalThreshold;
        if (!requiresApproval)
        {
            return null;
        }

        if (!opportunityId.HasValue || opportunityId.Value == Guid.Empty)
        {
            return $"Discount approval required (>= {DiscountPercentApprovalThreshold:0.##}% or >= {DiscountAmountApprovalThreshold:0.##} {request.Currency ?? "USD"}). Save the opportunity first to request approval.";
        }

        var approved = await HasApprovedChainAsync(opportunityId.Value, "Discount", cancellationToken);

        if (approved)
        {
            return null;
        }

        var amount = discountAmount > 0 ? discountAmount : request.Amount;
        var approvalResult = await _approvalService.RequestAsync(
            opportunityId.Value,
            amount,
            request.Currency,
            "Discount",
            actor,
            cancellationToken);

        if (!approvalResult.Success)
        {
            return approvalResult.Error ?? "Approval workflow could not be started.";
        }

        await TrackPolicyGateAsync(
            opportunityId,
            "DiscountApprovalRequired",
            $">={DiscountPercentApprovalThreshold:0.##}% or >={DiscountAmountApprovalThreshold:0.##} {request.Currency ?? "USD"}",
            actor,
            cancellationToken);
        return $"Discount approval required (>= {DiscountPercentApprovalThreshold:0.##}% or >= {DiscountAmountApprovalThreshold:0.##} {request.Currency ?? "USD"}). Request submitted for review.";
    }

    private async Task<string?> ValidateHighValueUpdateApprovalAsync(
        Opportunity opportunity,
        OpportunityUpsertRequest request,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
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

        var amount = request.Amount;
        if (amount < threshold.Value)
        {
            return null;
        }

        var closeDateChanged = request.ExpectedCloseDate != opportunity.ExpectedCloseDate;
        var probabilityChanged = request.Probability != opportunity.Probability;
        if (!closeDateChanged && !probabilityChanged)
        {
            return null;
        }

        if (string.IsNullOrWhiteSpace(tenant.ApprovalApproverRole))
        {
            await TrackPolicyGateAsync(
                opportunity.Id,
                "ApprovalRoleMissing",
                $"Update>{threshold.Value:0.##} {request.Currency ?? "USD"}",
                actor,
                cancellationToken);
            return $"Approval role must be configured before updating close date or probability on high-value opportunities (>{threshold.Value:0.##} {request.Currency ?? "USD"}).";
        }

        var approved = await HasApprovedChainAsync(opportunity.Id, "Update", cancellationToken);

        if (approved)
        {
            return null;
        }

        var approvalResult = await _approvalService.RequestAsync(
            opportunity.Id,
            amount,
            request.Currency,
            "Update",
            actor,
            cancellationToken);

        if (!approvalResult.Success)
        {
            return approvalResult.Error ?? "Approval workflow could not be started.";
        }

        await TrackPolicyGateAsync(
            opportunity.Id,
            "ApprovalRequiredUpdate",
            $"Update>{threshold.Value:0.##} {request.Currency ?? "USD"}",
            actor,
            cancellationToken);
        return $"Approval required to update close date or probability for opportunities above {threshold.Value:0.##} {request.Currency ?? "USD"}. Request submitted for review.";
    }

    private async Task TrackPolicyGateAsync(
        Guid? opportunityId,
        string ruleName,
        string thresholdSummary,
        ActorContext actor,
        CancellationToken cancellationToken)
    {
        if (!opportunityId.HasValue || opportunityId.Value == Guid.Empty)
        {
            return;
        }

        await _auditEvents.TrackAsync(
            CreateAuditEntry(opportunityId.Value, "PolicyGateBlocked", ruleName, null, thresholdSummary, actor),
            cancellationToken);
    }

    private async Task<bool> HasApprovedChainAsync(Guid opportunityId, string purpose, CancellationToken cancellationToken)
    {
        var chainApproved = await _dbContext.OpportunityApprovalChains
            .AsNoTracking()
            .AnyAsync(
                chain => chain.OpportunityId == opportunityId
                         && chain.Purpose == purpose
                         && chain.Status == "Approved",
                cancellationToken);

        if (chainApproved)
        {
            return true;
        }

        return await _dbContext.OpportunityApprovals
            .AsNoTracking()
            .AnyAsync(
                approval => approval.OpportunityId == opportunityId
                            && approval.Purpose == purpose
                            && approval.Status == "Approved"
                            && approval.ApprovalChainId == null,
                cancellationToken);
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
