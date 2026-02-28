using CRM.Enterprise.Application.Marketing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Domain.Enums;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CRM.Enterprise.Infrastructure.Marketing;

public sealed class MarketingService : IMarketingService, ICampaignAttributionService
{
    private const string FirstTouchModel = "first_touch";
    private const string FirstTouchRuleVersion = "first_touch:v1";
    private const int HealthWindowDays = 30;
    private const int StalledAgeDays = 21;
    private const int RecommendationCap = 5;
    private readonly CrmDbContext _dbContext;

    public MarketingService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CampaignSearchResultDto> SearchCampaignsAsync(CampaignSearchRequest request, CancellationToken cancellationToken = default)
    {
        var page = Math.Max(request.Page, 1);
        var pageSize = Math.Clamp(request.PageSize, 1, 100);

        var query = _dbContext.Campaigns
            .AsNoTracking()
            .Where(c => !c.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var term = request.Search.Trim().ToLower();
            query = query.Where(c => c.Name.ToLower().Contains(term) || (c.Objective ?? string.Empty).ToLower().Contains(term));
        }

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            query = query.Where(c => c.Status == request.Status);
        }

        if (!string.IsNullOrWhiteSpace(request.Channel))
        {
            query = query.Where(c => c.Channel == request.Channel);
        }

        if (request.OwnerUserId is Guid ownerId && ownerId != Guid.Empty)
        {
            query = query.Where(c => c.OwnerUserId == ownerId);
        }

        var total = await query.CountAsync(cancellationToken);

        var rows = await query
            .OrderByDescending(c => c.CreatedAtUtc)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(c => new
            {
                c.Id,
                c.Name,
                c.Type,
                c.Channel,
                c.Status,
                c.OwnerUserId,
                c.StartDateUtc,
                c.EndDateUtc,
                c.BudgetPlanned,
                c.BudgetActual,
                c.Objective,
                c.CreatedAtUtc,
                c.UpdatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var ownerIds = rows.Select(r => r.OwnerUserId).Distinct().ToList();
        var ownerLookup = await _dbContext.Users
            .AsNoTracking()
            .Where(u => ownerIds.Contains(u.Id))
            .Select(u => new { u.Id, u.FullName })
            .ToDictionaryAsync(u => u.Id, u => u.FullName, cancellationToken);

        var items = rows.Select(r => new CampaignListItemDto(
            r.Id,
            r.Name,
            r.Type,
            r.Channel,
            r.Status,
            r.OwnerUserId,
            ownerLookup.TryGetValue(r.OwnerUserId, out var ownerName) ? ownerName : "Unknown",
            r.StartDateUtc,
            r.EndDateUtc,
            r.BudgetPlanned,
            r.BudgetActual,
            r.Objective,
            r.CreatedAtUtc,
            r.UpdatedAtUtc)).ToList();

        return new CampaignSearchResultDto(items, total);
    }

    public async Task<CampaignDetailDto?> GetCampaignAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);

        if (campaign is null)
        {
            return null;
        }

        var ownerName = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == campaign.OwnerUserId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unknown";

        var campaignDto = new CampaignListItemDto(
            campaign.Id,
            campaign.Name,
            campaign.Type,
            campaign.Channel,
            campaign.Status,
            campaign.OwnerUserId,
            ownerName,
            campaign.StartDateUtc,
            campaign.EndDateUtc,
            campaign.BudgetPlanned,
            campaign.BudgetActual,
            campaign.Objective,
            campaign.CreatedAtUtc,
            campaign.UpdatedAtUtc);

        var members = await BuildMemberDtosAsync(id, cancellationToken);
        var performance = await BuildPerformanceAsync(id, cancellationToken);

        return new CampaignDetailDto(campaignDto, members, performance);
    }

    public async Task<MarketingOperationResult<CampaignListItemDto>> CreateCampaignAsync(CampaignUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var validation = await ValidateCampaignRequestAsync(request, cancellationToken);
        if (!validation.Success)
        {
            return MarketingOperationResult<CampaignListItemDto>.Fail(validation.Error!);
        }

        var campaign = new Campaign
        {
            Name = request.Name.Trim(),
            Type = request.Type.Trim(),
            Channel = request.Channel.Trim(),
            Status = request.Status.Trim(),
            OwnerUserId = request.OwnerUserId,
            StartDateUtc = request.StartDateUtc,
            EndDateUtc = request.EndDateUtc,
            BudgetPlanned = request.BudgetPlanned,
            BudgetActual = request.BudgetActual,
            Objective = string.IsNullOrWhiteSpace(request.Objective) ? null : request.Objective.Trim()
        };

        _dbContext.Campaigns.Add(campaign);
        await _dbContext.SaveChangesAsync(cancellationToken);

        var ownerName = await _dbContext.Users
            .AsNoTracking()
            .Where(u => u.Id == campaign.OwnerUserId)
            .Select(u => u.FullName)
            .FirstOrDefaultAsync(cancellationToken) ?? "Unknown";

        return MarketingOperationResult<CampaignListItemDto>.Ok(new CampaignListItemDto(
            campaign.Id,
            campaign.Name,
            campaign.Type,
            campaign.Channel,
            campaign.Status,
            campaign.OwnerUserId,
            ownerName,
            campaign.StartDateUtc,
            campaign.EndDateUtc,
            campaign.BudgetPlanned,
            campaign.BudgetActual,
            campaign.Objective,
            campaign.CreatedAtUtc,
            campaign.UpdatedAtUtc));
    }

    public async Task<MarketingOperationResult<bool>> UpdateCampaignAsync(Guid id, CampaignUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (campaign is null)
        {
            return MarketingOperationResult<bool>.NotFoundResult();
        }

        var validation = await ValidateCampaignRequestAsync(request, cancellationToken);
        if (!validation.Success)
        {
            return MarketingOperationResult<bool>.Fail(validation.Error!);
        }

        campaign.Name = request.Name.Trim();
        campaign.Type = request.Type.Trim();
        campaign.Channel = request.Channel.Trim();
        campaign.Status = request.Status.Trim();
        campaign.OwnerUserId = request.OwnerUserId;
        campaign.StartDateUtc = request.StartDateUtc;
        campaign.EndDateUtc = request.EndDateUtc;
        campaign.BudgetPlanned = request.BudgetPlanned;
        campaign.BudgetActual = request.BudgetActual;
        campaign.Objective = string.IsNullOrWhiteSpace(request.Objective) ? null : request.Objective.Trim();

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<bool>.Ok(true);
    }

    public async Task<MarketingOperationResult<bool>> ArchiveCampaignAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns.FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted, cancellationToken);
        if (campaign is null)
        {
            return MarketingOperationResult<bool>.NotFoundResult();
        }

        campaign.Status = "Archived";
        campaign.IsDeleted = true;
        campaign.DeletedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<bool>.Ok(true);
    }

    public async Task<MarketingOperationResult<CampaignMemberItemDto>> AddMemberAsync(Guid campaignId, CampaignMemberUpsertRequest request, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns
            .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted, cancellationToken);
        if (campaign is null)
        {
            return MarketingOperationResult<CampaignMemberItemDto>.NotFoundResult();
        }

        if (!IsSupportedEntityType(request.EntityType))
        {
            return MarketingOperationResult<CampaignMemberItemDto>.Fail("EntityType must be Lead or Contact.");
        }

        if (!IsSupportedResponseStatus(request.ResponseStatus))
        {
            return MarketingOperationResult<CampaignMemberItemDto>.Fail("Invalid response status.");
        }

        var entityExists = await EntityExistsAsync(request.EntityType, request.EntityId, cancellationToken);
        if (!entityExists)
        {
            return MarketingOperationResult<CampaignMemberItemDto>.Fail($"{request.EntityType} record not found.");
        }

        var existing = await _dbContext.CampaignMembers
            .FirstOrDefaultAsync(m =>
                m.CampaignId == campaignId &&
                m.EntityType == request.EntityType &&
                m.EntityId == request.EntityId &&
                !m.IsDeleted,
                cancellationToken);

        if (existing is not null)
        {
            existing.ResponseStatus = request.ResponseStatus;
            await _dbContext.SaveChangesAsync(cancellationToken);

            await RecomputeForEntityAsync(existing.EntityType, existing.EntityId, cancellationToken);
            var existingName = await ResolveEntityNameAsync(existing.EntityType, existing.EntityId, cancellationToken);
            return MarketingOperationResult<CampaignMemberItemDto>.Ok(new CampaignMemberItemDto(
                existing.Id,
                existing.CampaignId,
                existing.EntityType,
                existing.EntityId,
                existingName,
                existing.ResponseStatus,
                existing.AddedUtc,
                existing.UpdatedAtUtc));
        }

        var member = new CampaignMember
        {
            CampaignId = campaignId,
            EntityType = request.EntityType,
            EntityId = request.EntityId,
            ResponseStatus = request.ResponseStatus,
            AddedUtc = DateTime.UtcNow
        };

        _dbContext.CampaignMembers.Add(member);
        await _dbContext.SaveChangesAsync(cancellationToken);

        await RecomputeForEntityAsync(member.EntityType, member.EntityId, cancellationToken);

        var entityName = await ResolveEntityNameAsync(member.EntityType, member.EntityId, cancellationToken);
        return MarketingOperationResult<CampaignMemberItemDto>.Ok(new CampaignMemberItemDto(
            member.Id,
            member.CampaignId,
            member.EntityType,
            member.EntityId,
            entityName,
            member.ResponseStatus,
            member.AddedUtc,
            member.UpdatedAtUtc));
    }

    public async Task<MarketingOperationResult<bool>> RemoveMemberAsync(Guid campaignId, Guid memberId, CancellationToken cancellationToken = default)
    {
        var member = await _dbContext.CampaignMembers
            .FirstOrDefaultAsync(m => m.CampaignId == campaignId && m.Id == memberId && !m.IsDeleted, cancellationToken);

        if (member is null)
        {
            return MarketingOperationResult<bool>.NotFoundResult();
        }

        member.IsDeleted = true;
        member.DeletedAtUtc = DateTime.UtcNow;

        await _dbContext.SaveChangesAsync(cancellationToken);

        await RecomputeForEntityAsync(member.EntityType, member.EntityId, cancellationToken);
        return MarketingOperationResult<bool>.Ok(true);
    }

    public async Task<CampaignPerformanceDto?> GetPerformanceAsync(Guid campaignId, CancellationToken cancellationToken = default)
    {
        var campaignExists = await _dbContext.Campaigns
            .AsNoTracking()
            .AnyAsync(c => c.Id == campaignId && !c.IsDeleted, cancellationToken);

        if (!campaignExists)
        {
            return null;
        }

        return await BuildPerformanceAsync(campaignId, cancellationToken);
    }

    public async Task<IReadOnlyList<AttributionSummaryItemDto>> GetAttributionSummaryAsync(CancellationToken cancellationToken = default)
    {
        var campaigns = await _dbContext.Campaigns
            .AsNoTracking()
            .Where(c => !c.IsDeleted)
            .OrderByDescending(c => c.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var campaignIds = campaigns.Select(c => c.Id).ToList();
        var attributionRows = await _dbContext.CampaignAttributions
            .AsNoTracking()
            .Where(a => campaignIds.Contains(a.CampaignId) && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var opportunityIds = attributionRows.Select(a => a.OpportunityId).Distinct().ToList();
        var opportunityLookup = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id) && !o.IsDeleted)
            .Select(o => new { o.Id, o.IsWon, o.IsClosed })
            .ToDictionaryAsync(o => o.Id, o => o, cancellationToken);

        var result = campaigns.Select(campaign =>
        {
            var rows = attributionRows.Where(a => a.CampaignId == campaign.Id).ToList();
            var influenced = rows.Select(r => r.OpportunityId).Distinct().Count();
            var pipelineAmount = rows.Sum(r => r.AttributedAmount);
            var wonRevenue = rows
                .Where(r => opportunityLookup.TryGetValue(r.OpportunityId, out var opp) && opp.IsClosed && opp.IsWon)
                .Sum(r => r.AttributedAmount);
            var conversionRate = influenced == 0 ? 0 : Math.Round((decimal)rows.Count(r => opportunityLookup.TryGetValue(r.OpportunityId, out var opp) && opp.IsClosed && opp.IsWon) / influenced * 100m, 2);
            var sampleOpportunityId = rows.OrderByDescending(r => r.AttributedUtc).Select(r => (Guid?)r.OpportunityId).FirstOrDefault();

            return new AttributionSummaryItemDto(
                campaign.Id,
                campaign.Name,
                campaign.Status,
                influenced,
                pipelineAmount,
                wonRevenue,
                conversionRate,
                sampleOpportunityId);
        }).ToList();

        return result;
    }

    public async Task<CampaignHealthScoreDto?> GetCampaignHealthScoreAsync(Guid campaignId, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted, cancellationToken);
        if (campaign is null)
        {
            return null;
        }

        var attributedRows = await _dbContext.CampaignAttributions
            .AsNoTracking()
            .Where(a => a.CampaignId == campaignId && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var opportunityIds = attributedRows.Select(x => x.OpportunityId).Distinct().ToList();
        var opportunities = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id) && !o.IsDeleted)
            .Select(o => new
            {
                o.Id,
                o.IsClosed,
                o.IsWon,
                o.CreatedAtUtc,
                o.UpdatedAtUtc
            })
            .ToListAsync(cancellationToken);

        var influenced = opportunities.Count;
        var openOpps = opportunities.Where(o => !o.IsClosed).ToList();
        var openAgingOver21 = openOpps.Count(o => (DateTime.UtcNow - (o.UpdatedAtUtc ?? o.CreatedAtUtc)).TotalDays >= StalledAgeDays);
        var wonCount = opportunities.Count(o => o.IsClosed && o.IsWon);
        var winRate = influenced == 0 ? 0m : Math.Round((decimal)wonCount / influenced * 100m, 2);
        var influencedPipeline = attributedRows.Sum(x => x.AttributedAmount);
        var wonRevenue = attributedRows
            .Where(row => opportunities.Any(o => o.Id == row.OpportunityId && o.IsClosed && o.IsWon))
            .Sum(row => row.AttributedAmount);

        var budgetVariancePct = campaign.BudgetPlanned <= 0
            ? (campaign.BudgetActual > 0 ? 100m : 0m)
            : Math.Round((campaign.BudgetActual - campaign.BudgetPlanned) / campaign.BudgetPlanned * 100m, 2);

        var score = 100m;
        score -= Math.Min(Math.Abs(budgetVariancePct), 40m) * 0.35m;
        score -= Math.Min(openAgingOver21 * 5m, 25m);
        score += Math.Min(winRate * 0.25m, 15m);
        score -= influenced == 0 && campaign.BudgetActual > 0 ? 10m : 0m;
        var finalScore = (int)Math.Clamp(Math.Round(score), 0, 100);

        var reasonChips = new List<string>();
        if (budgetVariancePct > 15m)
        {
            reasonChips.Add("Budget overrun");
        }
        else if (budgetVariancePct < -15m)
        {
            reasonChips.Add("Budget underutilized");
        }
        else
        {
            reasonChips.Add("Budget on track");
        }

        if (openAgingOver21 > 0)
        {
            reasonChips.Add($"{openAgingOver21} stalled open deal(s)");
        }

        if (winRate >= 35m)
        {
            reasonChips.Add("Strong win-rate momentum");
        }
        else if (influenced > 0)
        {
            reasonChips.Add("Win-rate below target");
        }

        var previous = await _dbContext.CampaignInsightSnapshots
            .AsNoTracking()
            .Where(x => x.CampaignId == campaignId && !x.IsDeleted)
            .OrderByDescending(x => x.ComputedUtc)
            .FirstOrDefaultAsync(cancellationToken);

        var trend = "flat";
        if (previous is not null)
        {
            if (finalScore > previous.Score + 2) trend = "up";
            else if (finalScore < previous.Score - 2) trend = "down";
        }

        var computedUtc = DateTime.UtcNow;
        var metrics = new CampaignHealthMetricsDto(
            influenced,
            influencedPipeline,
            wonRevenue,
            openAgingOver21,
            winRate,
            budgetVariancePct);

        _dbContext.CampaignInsightSnapshots.Add(new CampaignInsightSnapshot
        {
            CampaignId = campaignId,
            Score = finalScore,
            Trend = trend,
            CalculationWindowDays = HealthWindowDays,
            ReasonChipsJson = JsonSerializer.Serialize(reasonChips),
            MetricsJson = JsonSerializer.Serialize(metrics),
            ComputedUtc = computedUtc
        });
        await _dbContext.SaveChangesAsync(cancellationToken);

        return new CampaignHealthScoreDto(
            campaignId,
            finalScore,
            trend,
            HealthWindowDays,
            computedUtc,
            reasonChips,
            metrics);
    }

    public async Task<IReadOnlyList<CampaignRecommendationDto>> GetCampaignRecommendationsAsync(Guid campaignId, CancellationToken cancellationToken = default)
    {
        var campaign = await _dbContext.Campaigns
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted, cancellationToken);
        if (campaign is null)
        {
            return [];
        }

        var existing = await _dbContext.CampaignRecommendations
            .AsNoTracking()
            .Where(r => r.CampaignId == campaignId && !r.IsDeleted && r.Status == "active")
            .OrderByDescending(r => r.GeneratedUtc)
            .Take(RecommendationCap)
            .ToListAsync(cancellationToken);

        var fresh = existing.Where(r => r.GeneratedUtc >= DateTime.UtcNow.AddHours(-12)).ToList();
        if (fresh.Count > 0)
        {
            return fresh.Select(ToRecommendationDto).ToList();
        }

        var performance = await BuildPerformanceAsync(campaignId, cancellationToken);
        var openOpps = performance.Opportunities.Where(o => !o.IsClosed).ToList();
        var staleOpps = openOpps
            .Where(o => (DateTime.UtcNow - o.AttributedUtc).TotalDays >= StalledAgeDays)
            .ToList();

        var generated = new List<CampaignRecommendation>();

        if (campaign.BudgetPlanned > 0 && campaign.BudgetActual > campaign.BudgetPlanned * 1.15m && performance.WonRevenue < campaign.BudgetActual)
        {
            generated.Add(CreateRecommendation(
                campaignId,
                "pause_low_efficiency",
                "warn",
                "Pause spend until efficiency improves",
                "Spend is running ahead of plan while won revenue has not caught up.",
                Math.Max(campaign.BudgetActual - campaign.BudgetPlanned, 0m),
                0.78m,
                [
                    $"Budget actual {campaign.BudgetActual:0} exceeds plan {campaign.BudgetPlanned:0}.",
                    $"Won revenue currently {performance.WonRevenue:0}."
                ]));
        }

        if (staleOpps.Count >= 2)
        {
            generated.Add(CreateRecommendation(
                campaignId,
                "reengage_stalled_opportunities",
                "info",
                "Re-engage stalled influenced opportunities",
                "Create follow-up tasks for owners on stale, open influenced opportunities.",
                staleOpps.Sum(o => o.Amount),
                0.86m,
                [
                    $"{staleOpps.Count} open influenced deal(s) are older than {StalledAgeDays} days since attribution.",
                    $"Potential pipeline at risk: {staleOpps.Sum(o => o.Amount):0}."
                ]));
        }

        if (performance.InfluencedOpportunities > 0 && performance.ConversionRate >= 30m && campaign.BudgetActual < campaign.BudgetPlanned * 0.7m)
        {
            generated.Add(CreateRecommendation(
                campaignId,
                "increase_budget_high_velocity",
                "success",
                "Increase budget on winning campaign",
                "This campaign converts well and still has underutilized budget capacity.",
                Math.Max(campaign.BudgetPlanned - campaign.BudgetActual, 0m),
                0.72m,
                [
                    $"Conversion rate is {performance.ConversionRate:0.##}%.",
                    $"Budget actual {campaign.BudgetActual:0} is below 70% of plan."
                ]));
        }

        if (campaign.BudgetActual > 0 && performance.InfluencedOpportunities == 0)
        {
            generated.Add(CreateRecommendation(
                campaignId,
                "reallocate_budget_no_influence",
                "danger",
                "Reallocate spend to performing campaigns",
                "No influenced opportunities found despite campaign spend.",
                campaign.BudgetActual,
                0.67m,
                [
                    "No influenced opportunities are currently attributed.",
                    $"Campaign actual spend: {campaign.BudgetActual:0}."
                ]));
        }

        if (generated.Count == 0)
        {
            generated.Add(CreateRecommendation(
                campaignId,
                "monitor_steady_state",
                "secondary",
                "Maintain current mix and monitor weekly",
                "No critical anomalies detected. Keep monitoring momentum and conversion quality.",
                0m,
                0.61m,
                ["No urgent risk signal exceeded threshold."]));
        }

        foreach (var stale in existing.Where(x => x.Status == "active"))
        {
            var row = await _dbContext.CampaignRecommendations.FirstOrDefaultAsync(r => r.Id == stale.Id, cancellationToken);
            if (row is null) continue;
            row.Status = "expired";
            row.ExpiresUtc = DateTime.UtcNow;
        }

        generated = generated
            .OrderByDescending(x => x.Confidence)
            .ThenByDescending(x => x.ImpactEstimate)
            .Take(RecommendationCap)
            .ToList();

        _dbContext.CampaignRecommendations.AddRange(generated);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return generated.Select(ToRecommendationDto).ToList();
    }

    public async Task<MarketingOperationResult<CampaignRecommendationDto>> ApplyRecommendationDecisionAsync(
        Guid recommendationId,
        RecommendationDecisionRequest request,
        Guid? decidedByUserId,
        CancellationToken cancellationToken = default)
    {
        var recommendation = await _dbContext.CampaignRecommendations
            .Include(r => r.Campaign)
            .FirstOrDefaultAsync(r => r.Id == recommendationId && !r.IsDeleted, cancellationToken);
        if (recommendation is null)
        {
            return MarketingOperationResult<CampaignRecommendationDto>.NotFoundResult();
        }

        var decision = request.Decision.Trim().ToLowerInvariant();
        if (decision is not ("accept" or "dismiss" or "snooze"))
        {
            return MarketingOperationResult<CampaignRecommendationDto>.Fail("Decision must be accept, dismiss, or snooze.");
        }

        recommendation.Status = decision switch
        {
            "accept" => "accepted",
            "dismiss" => "dismissed",
            _ => "snoozed"
        };
        recommendation.DecidedUtc = DateTime.UtcNow;
        recommendation.DecidedByUserId = decidedByUserId;
        recommendation.DecisionReason = string.IsNullOrWhiteSpace(request.Reason) ? null : request.Reason.Trim();

        _dbContext.CampaignRecommendationDecisions.Add(new CampaignRecommendationDecision
        {
            RecommendationId = recommendation.Id,
            Decision = decision,
            Reason = recommendation.DecisionReason,
            DecidedUtc = recommendation.DecidedUtc.Value,
            DecidedByUserId = decidedByUserId
        });

        if (decision == "accept" && request.ApplyActions)
        {
            await ApplyRecommendationActionsAsync(recommendation, cancellationToken);
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return MarketingOperationResult<CampaignRecommendationDto>.Ok(ToRecommendationDto(recommendation));
    }

    public async Task<AttributionExplainabilityDto?> GetAttributionExplainabilityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
    {
        var opportunityExists = await _dbContext.Opportunities
            .AsNoTracking()
            .AnyAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);
        if (!opportunityExists)
        {
            return null;
        }

        var attribution = await _dbContext.CampaignAttributions
            .AsNoTracking()
            .FirstOrDefaultAsync(a => a.OpportunityId == opportunityId && a.Model == FirstTouchModel && !a.IsDeleted, cancellationToken);

        var leadLinks = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => l.ConvertedOpportunityId == opportunityId && !l.IsDeleted)
            .Select(l => new { l.Id, l.ContactId, Name = (l.FirstName + " " + l.LastName).Trim() })
            .ToListAsync(cancellationToken);

        var leadIds = leadLinks.Select(l => l.Id).ToList();
        var contactIds = leadLinks.Where(l => l.ContactId.HasValue).Select(l => l.ContactId!.Value).Distinct().ToList();
        var contactNames = await _dbContext.Contacts
            .AsNoTracking()
            .Where(c => contactIds.Contains(c.Id) && !c.IsDeleted)
            .Select(c => new { c.Id, Name = (c.FirstName + " " + c.LastName).Trim() })
            .ToDictionaryAsync(c => c.Id, c => c.Name, cancellationToken);

        var memberships = await _dbContext.CampaignMembers
            .AsNoTracking()
            .Where(m => !m.IsDeleted &&
                        ((m.EntityType == "Lead" && leadIds.Contains(m.EntityId)) ||
                         (m.EntityType == "Contact" && contactIds.Contains(m.EntityId))))
            .OrderBy(m => m.AddedUtc)
            .ThenBy(m => m.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var campaignIds = memberships.Select(m => m.CampaignId).Distinct().ToList();
        var campaignNames = await _dbContext.Campaigns
            .AsNoTracking()
            .Where(c => campaignIds.Contains(c.Id) && !c.IsDeleted)
            .Select(c => new { c.Id, c.Name })
            .ToDictionaryAsync(c => c.Id, c => c.Name, cancellationToken);

        var candidates = memberships.Select(m => new AttributionExplainabilityCandidateDto(
            m.EntityType,
            m.EntityId,
            m.EntityType == "Lead"
                ? (leadLinks.FirstOrDefault(x => x.Id == m.EntityId)?.Name ?? "Unknown Lead")
                : (contactNames.TryGetValue(m.EntityId, out var contactName) ? contactName : "Unknown Contact"),
            m.CampaignId,
            campaignNames.TryGetValue(m.CampaignId, out var campaignName) ? campaignName : "Unknown Campaign",
            m.AddedUtc)).ToList();

        var latestEvent = await _dbContext.AttributionExplainabilityEvents
            .AsNoTracking()
            .Where(e => e.OpportunityId == opportunityId && !e.IsDeleted)
            .OrderByDescending(e => e.AttributedUtc)
            .FirstOrDefaultAsync(cancellationToken);

        var evidence = latestEvent is not null
            ? ParseJsonArray(latestEvent.EvidenceJson)
            : (attribution is null
                ? ["No first-touch attribution currently assigned for this opportunity."]
                : BuildExplainabilityEvidence(candidates, attribution.CampaignId, FirstTouchRuleVersion));

        return new AttributionExplainabilityDto(
            opportunityId,
            attribution?.CampaignId,
            attribution?.Model ?? FirstTouchModel,
            attribution?.AttributedUtc,
            latestEvent?.RuleVersion ?? (attribution is null ? null : FirstTouchRuleVersion),
            latestEvent?.SourceEntityType,
            latestEvent?.SourceEntityId,
            latestEvent?.MemberAddedUtc,
            evidence,
            candidates);
    }

    public async Task RecomputeForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken = default)
    {
        var opportunity = await _dbContext.Opportunities
            .AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == opportunityId && !o.IsDeleted, cancellationToken);

        if (opportunity is null)
        {
            await RemoveAttributionForOpportunityAsync(opportunityId, cancellationToken);
            return;
        }

        var leadLinks = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => l.ConvertedOpportunityId == opportunityId && !l.IsDeleted)
            .Select(l => new { l.Id, l.ContactId })
            .ToListAsync(cancellationToken);

        var leadIds = leadLinks.Select(l => l.Id).ToList();
        var contactIds = leadLinks.Where(l => l.ContactId.HasValue).Select(l => l.ContactId!.Value).ToList();
        if (opportunity.PrimaryContactId.HasValue)
        {
            contactIds.Add(opportunity.PrimaryContactId.Value);
        }

        contactIds = contactIds.Distinct().ToList();

        var memberships = await _dbContext.CampaignMembers
            .AsNoTracking()
            .Where(m => !m.IsDeleted &&
                        ((m.EntityType == "Lead" && leadIds.Contains(m.EntityId)) ||
                         (m.EntityType == "Contact" && contactIds.Contains(m.EntityId))))
            .OrderBy(m => m.AddedUtc)
            .ThenBy(m => m.CreatedAtUtc)
            .ToListAsync(cancellationToken);

        var selectedMembership = memberships.FirstOrDefault();
        if (selectedMembership is null)
        {
            await RemoveAttributionForOpportunityAsync(opportunityId, cancellationToken);
            return;
        }

        var existing = await _dbContext.CampaignAttributions
            .FirstOrDefaultAsync(a => a.OpportunityId == opportunityId && a.Model == FirstTouchModel && !a.IsDeleted, cancellationToken);

        if (existing is null)
        {
            var row = new CampaignAttribution
            {
                CampaignId = selectedMembership.CampaignId,
                OpportunityId = opportunityId,
                Model = FirstTouchModel,
                AttributedAmount = opportunity.Amount,
                AttributedUtc = DateTime.UtcNow
            };
            _dbContext.CampaignAttributions.Add(row);
        }
        else
        {
            existing.CampaignId = selectedMembership.CampaignId;
            existing.AttributedAmount = opportunity.Amount;
            existing.AttributedUtc = DateTime.UtcNow;
        }

        var candidateCampaigns = memberships
            .GroupBy(x => x.CampaignId)
            .Select(x => new { CampaignId = x.Key, FirstMemberAtUtc = x.Min(m => m.AddedUtc) })
            .OrderBy(x => x.FirstMemberAtUtc)
            .ToList();

        _dbContext.AttributionExplainabilityEvents.Add(new AttributionExplainabilityEvent
        {
            CampaignId = selectedMembership.CampaignId,
            OpportunityId = opportunityId,
            Model = FirstTouchModel,
            SourceEntityType = selectedMembership.EntityType,
            SourceEntityId = selectedMembership.EntityId,
            MemberAddedUtc = selectedMembership.AddedUtc,
            AttributedUtc = DateTime.UtcNow,
            RuleVersion = FirstTouchRuleVersion,
            EvidenceJson = JsonSerializer.Serialize(BuildExplainabilityEvidence(
                candidateCampaigns.Select(c => new AttributionExplainabilityCandidateDto(
                    string.Empty,
                    Guid.Empty,
                    string.Empty,
                    c.CampaignId,
                    string.Empty,
                    c.FirstMemberAtUtc)).ToList(),
                selectedMembership.CampaignId,
                FirstTouchRuleVersion))
        });

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task RecomputeForEntityAsync(string entityType, Guid entityId, CancellationToken cancellationToken = default)
    {
        if (!IsSupportedEntityType(entityType))
        {
            return;
        }

        var opportunityIds = new HashSet<Guid>();

        if (entityType == "Lead")
        {
            var convertedOppIds = await _dbContext.Leads
                .AsNoTracking()
                .Where(l => l.Id == entityId && l.ConvertedOpportunityId.HasValue && !l.IsDeleted)
                .Select(l => l.ConvertedOpportunityId!.Value)
                .ToListAsync(cancellationToken);

            foreach (var id in convertedOppIds)
            {
                opportunityIds.Add(id);
            }
        }
        else
        {
            var directOppIds = await _dbContext.Opportunities
                .AsNoTracking()
                .Where(o => o.PrimaryContactId == entityId && !o.IsDeleted)
                .Select(o => o.Id)
                .ToListAsync(cancellationToken);

            var convertedOppIds = await _dbContext.Leads
                .AsNoTracking()
                .Where(l => l.ContactId == entityId && l.ConvertedOpportunityId.HasValue && !l.IsDeleted)
                .Select(l => l.ConvertedOpportunityId!.Value)
                .ToListAsync(cancellationToken);

            foreach (var id in directOppIds.Concat(convertedOppIds))
            {
                opportunityIds.Add(id);
            }
        }

        foreach (var opportunityId in opportunityIds)
        {
            await RecomputeForOpportunityAsync(opportunityId, cancellationToken);
        }
    }

    private async Task<IReadOnlyList<CampaignMemberItemDto>> BuildMemberDtosAsync(Guid campaignId, CancellationToken cancellationToken)
    {
        var members = await _dbContext.CampaignMembers
            .AsNoTracking()
            .Where(m => m.CampaignId == campaignId && !m.IsDeleted)
            .OrderByDescending(m => m.AddedUtc)
            .ToListAsync(cancellationToken);

        var leadIds = members.Where(m => m.EntityType == "Lead").Select(m => m.EntityId).Distinct().ToList();
        var contactIds = members.Where(m => m.EntityType == "Contact").Select(m => m.EntityId).Distinct().ToList();

        var leadNames = await _dbContext.Leads
            .AsNoTracking()
            .Where(l => leadIds.Contains(l.Id) && !l.IsDeleted)
            .Select(l => new { l.Id, Name = (l.FirstName + " " + l.LastName).Trim() })
            .ToDictionaryAsync(x => x.Id, x => x.Name, cancellationToken);

        var contactNames = await _dbContext.Contacts
            .AsNoTracking()
            .Where(c => contactIds.Contains(c.Id) && !c.IsDeleted)
            .Select(c => new { c.Id, Name = (c.FirstName + " " + c.LastName).Trim() })
            .ToDictionaryAsync(x => x.Id, x => x.Name, cancellationToken);

        return members.Select(member => new CampaignMemberItemDto(
            member.Id,
            member.CampaignId,
            member.EntityType,
            member.EntityId,
            member.EntityType == "Lead"
                ? (leadNames.TryGetValue(member.EntityId, out var leadName) ? leadName : "Unknown Lead")
                : (contactNames.TryGetValue(member.EntityId, out var contactName) ? contactName : "Unknown Contact"),
            member.ResponseStatus,
            member.AddedUtc,
            member.UpdatedAtUtc)).ToList();
    }

    private async Task<CampaignPerformanceDto> BuildPerformanceAsync(Guid campaignId, CancellationToken cancellationToken)
    {
        var memberCount = await _dbContext.CampaignMembers
            .AsNoTracking()
            .CountAsync(m => m.CampaignId == campaignId && !m.IsDeleted, cancellationToken);

        var attributionRows = await _dbContext.CampaignAttributions
            .AsNoTracking()
            .Where(a => a.CampaignId == campaignId && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var opportunityIds = attributionRows.Select(a => a.OpportunityId).Distinct().ToList();

        var opportunities = await _dbContext.Opportunities
            .AsNoTracking()
            .Where(o => opportunityIds.Contains(o.Id) && !o.IsDeleted)
            .Select(o => new
            {
                o.Id,
                o.Name,
                o.AccountId,
                Stage = o.Stage != null ? o.Stage.Name : "Unknown",
                o.Amount,
                o.Currency,
                o.IsClosed,
                o.IsWon,
                o.ExpectedCloseDate
            })
            .ToListAsync(cancellationToken);

        var accountIds = opportunities.Select(o => o.AccountId).Distinct().ToList();
        var accountLookup = await _dbContext.Accounts
            .AsNoTracking()
            .Where(a => accountIds.Contains(a.Id) && !a.IsDeleted)
            .Select(a => new { a.Id, a.Name })
            .ToDictionaryAsync(a => a.Id, a => a.Name, cancellationToken);

        var opportunityDtos = opportunities
            .Select(opp =>
            {
                var attribution = attributionRows.First(a => a.OpportunityId == opp.Id);
                return new CampaignAttributedOpportunityDto(
                    opp.Id,
                    opp.Name,
                    accountLookup.TryGetValue(opp.AccountId, out var accountName) ? accountName : "Unknown Account",
                    opp.Stage,
                    opp.Amount,
                    opp.Currency,
                    opp.IsClosed,
                    opp.IsWon,
                    opp.ExpectedCloseDate,
                    attribution.AttributedUtc);
            })
            .OrderByDescending(o => o.AttributedUtc)
            .ToList();

        var influencedOpportunities = opportunityDtos.Select(o => o.OpportunityId).Distinct().Count();
        var influencedPipeline = attributionRows.Sum(a => a.AttributedAmount);
        var wonRevenue = attributionRows
            .Where(a => opportunities.Any(o => o.Id == a.OpportunityId && o.IsClosed && o.IsWon))
            .Sum(a => a.AttributedAmount);

        var conversionRate = memberCount == 0
            ? 0
            : Math.Round((decimal)influencedOpportunities / memberCount * 100m, 2);

        return new CampaignPerformanceDto(
            campaignId,
            memberCount,
            influencedOpportunities,
            influencedPipeline,
            wonRevenue,
            conversionRate,
            opportunityDtos);
    }

    private async Task<(bool Success, string? Error)> ValidateCampaignRequestAsync(CampaignUpsertRequest request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return (false, "Name is required.");
        }

        if (request.OwnerUserId == Guid.Empty)
        {
            return (false, "OwnerUserId is required.");
        }

        if (request.StartDateUtc.HasValue && request.EndDateUtc.HasValue && request.EndDateUtc < request.StartDateUtc)
        {
            return (false, "EndDateUtc cannot be before StartDateUtc.");
        }

        if (request.BudgetPlanned < 0 || request.BudgetActual < 0)
        {
            return (false, "Budget values must be non-negative.");
        }

        var ownerExists = await _dbContext.Users
            .AsNoTracking()
            .AnyAsync(u => u.Id == request.OwnerUserId && !u.IsDeleted, cancellationToken);

        if (!ownerExists)
        {
            return (false, "Owner user not found.");
        }

        if (string.IsNullOrWhiteSpace(request.Type) || string.IsNullOrWhiteSpace(request.Channel) || string.IsNullOrWhiteSpace(request.Status))
        {
            return (false, "Type, Channel, and Status are required.");
        }

        return (true, null);
    }

    private static bool IsSupportedEntityType(string entityType)
        => entityType == "Lead" || entityType == "Contact";

    private static bool IsSupportedResponseStatus(string responseStatus)
        => responseStatus is "Sent" or "Responded" or "Qualified" or "Unsubscribed";

    private async Task<bool> EntityExistsAsync(string entityType, Guid entityId, CancellationToken cancellationToken)
    {
        if (entityType == "Lead")
        {
            return await _dbContext.Leads.AnyAsync(l => l.Id == entityId && !l.IsDeleted, cancellationToken);
        }

        return await _dbContext.Contacts.AnyAsync(c => c.Id == entityId && !c.IsDeleted, cancellationToken);
    }

    private async Task<string> ResolveEntityNameAsync(string entityType, Guid entityId, CancellationToken cancellationToken)
    {
        if (entityType == "Lead")
        {
            return await _dbContext.Leads
                .AsNoTracking()
                .Where(l => l.Id == entityId && !l.IsDeleted)
                .Select(l => (l.FirstName + " " + l.LastName).Trim())
                .FirstOrDefaultAsync(cancellationToken) ?? "Unknown Lead";
        }

        return await _dbContext.Contacts
            .AsNoTracking()
            .Where(c => c.Id == entityId && !c.IsDeleted)
            .Select(c => (c.FirstName + " " + c.LastName).Trim())
            .FirstOrDefaultAsync(cancellationToken) ?? "Unknown Contact";
    }

    private CampaignRecommendation CreateRecommendation(
        Guid campaignId,
        string type,
        string severity,
        string title,
        string description,
        decimal impactEstimate,
        decimal confidence,
        IReadOnlyList<string> evidence)
    {
        var normalizedEvidence = evidence.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.Trim()).Distinct().ToList();
        if (normalizedEvidence.Count == 0)
        {
            normalizedEvidence = ["Evidence unavailable."];
        }

        return new CampaignRecommendation
        {
            CampaignId = campaignId,
            Type = type,
            Severity = severity,
            Title = title,
            Description = description,
            ImpactEstimate = impactEstimate,
            Confidence = Math.Clamp(confidence, 0m, 1m),
            EvidenceJson = JsonSerializer.Serialize(normalizedEvidence),
            Status = "active",
            GeneratedUtc = DateTime.UtcNow,
            ExpiresUtc = DateTime.UtcNow.AddDays(7)
        };
    }

    private static CampaignRecommendationDto ToRecommendationDto(CampaignRecommendation recommendation)
        => new(
            recommendation.Id,
            recommendation.CampaignId,
            recommendation.Type,
            recommendation.Severity,
            recommendation.Title,
            recommendation.Description,
            recommendation.ImpactEstimate,
            recommendation.Confidence,
            recommendation.Status,
            recommendation.GeneratedUtc,
            recommendation.ExpiresUtc,
            recommendation.DecidedUtc,
            recommendation.DecisionReason,
            ParseJsonArray(recommendation.EvidenceJson));

    private async Task ApplyRecommendationActionsAsync(CampaignRecommendation recommendation, CancellationToken cancellationToken)
    {
        if (!string.Equals(recommendation.Type, "reengage_stalled_opportunities", StringComparison.Ordinal))
        {
            return;
        }

        var attributedRows = await _dbContext.CampaignAttributions
            .AsNoTracking()
            .Where(a => a.CampaignId == recommendation.CampaignId && !a.IsDeleted)
            .ToListAsync(cancellationToken);

        var opportunityIds = attributedRows.Select(x => x.OpportunityId).Distinct().ToList();
        var staleOpps = await _dbContext.Opportunities
            .Where(o => opportunityIds.Contains(o.Id) && !o.IsDeleted && !o.IsClosed)
            .Select(o => new { o.Id, o.Name, o.OwnerId })
            .ToListAsync(cancellationToken);

        foreach (var opp in staleOpps.Take(20))
        {
            _dbContext.Activities.Add(new Activity
            {
                Subject = $"Marketing re-engagement: {opp.Name}",
                Description = "Auto-created from marketing recommendation acceptance. Re-engage this influenced opportunity and update next step.",
                Type = ActivityType.Task,
                RelatedEntityType = ActivityRelationType.Opportunity,
                RelatedEntityId = opp.Id,
                OwnerId = opp.OwnerId,
                DueDateUtc = DateTime.UtcNow.Date.AddDays(2),
                Priority = "High"
            });
        }
    }

    private static List<string> BuildExplainabilityEvidence(
        IReadOnlyList<AttributionExplainabilityCandidateDto> candidates,
        Guid selectedCampaignId,
        string ruleVersion)
    {
        if (candidates.Count == 0)
        {
            return ["No qualifying campaign memberships were found on linked lead/contact records."];
        }

        var earliest = candidates
            .OrderBy(c => c.MemberAddedUtc)
            .First();
        var selected = candidates.FirstOrDefault(c => c.CampaignId == selectedCampaignId) ?? earliest;

        return
        [
            $"Model: first-touch ({ruleVersion}).",
            $"Earliest membership selected at {selected.MemberAddedUtc:u}.",
            $"Selected campaign id: {selectedCampaignId}.",
            $"Qualified memberships evaluated: {candidates.Count}."
        ];
    }

    private static List<string> ParseJsonArray(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return [];
        }

        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? [];
        }
        catch
        {
            return [];
        }
    }

    private async Task RemoveAttributionForOpportunityAsync(Guid opportunityId, CancellationToken cancellationToken)
    {
        var existing = await _dbContext.CampaignAttributions
            .FirstOrDefaultAsync(a => a.OpportunityId == opportunityId && a.Model == FirstTouchModel && !a.IsDeleted, cancellationToken);

        if (existing is null)
        {
            return;
        }

        existing.IsDeleted = true;
        existing.DeletedAtUtc = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
