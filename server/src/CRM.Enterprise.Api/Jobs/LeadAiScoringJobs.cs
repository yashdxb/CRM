using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Infrastructure.Persistence;
using Hangfire;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Api.Jobs;

public sealed class LeadAiScoringJobs
{
    private readonly CrmDbContext _dbContext;
    private readonly ILeadScoringService _leadScoringService;
    private readonly ITenantProvider _tenantProvider;

    public LeadAiScoringJobs(
        CrmDbContext dbContext,
        ILeadScoringService leadScoringService,
        ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _leadScoringService = leadScoringService;
        _tenantProvider = tenantProvider;
    }

    [AutomaticRetry(Attempts = 2, DelaysInSeconds = new[] { 15, 60 }, OnAttemptsExceeded = AttemptsExceededAction.Delete)]
    public async Task ScoreLeadAsync(Guid leadId, CancellationToken cancellationToken = default)
    {
        var leadTenant = await _dbContext.Leads
            .IgnoreQueryFilters()
            .AsNoTracking()
            .Where(l => l.Id == leadId)
            .Select(l => new { l.Id, l.TenantId })
            .FirstOrDefaultAsync(cancellationToken);

        if (leadTenant is null)
        {
            return;
        }

        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == leadTenant.TenantId, cancellationToken);

        if (tenant is null)
        {
            return;
        }

        _tenantProvider.SetTenant(tenant.Id, tenant.Key);

        var lead = await _dbContext.Leads
            .Include(l => l.Status)
            .FirstOrDefaultAsync(l => l.Id == leadId && !l.IsDeleted, cancellationToken);

        if (lead is null)
        {
            return;
        }

        var score = await _leadScoringService.ScoreAsync(lead, cancellationToken);
        lead.AiScore = score.Score;
        lead.AiConfidence = score.Confidence;
        lead.AiRationale = score.Rationale;
        lead.AiScoredAtUtc = DateTime.UtcNow;
        lead.Score = score.Score;

        await _dbContext.SaveChangesAsync(cancellationToken);
    }
}
