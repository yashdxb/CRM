using System;
using System.Threading;
using System.Threading.Tasks;
using CRM.Enterprise.Application.Leads;
using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class RuleBasedLeadScoringService : ILeadScoringService
{
    public Task<LeadAiScore> ScoreAsync(Lead lead, CancellationToken cancellationToken)
    {
        var score = ResolveLeadScore(lead);
        var confidence = 0.35m;
        var rationale = "Rule-based score computed from lead signals.";
        return Task.FromResult(new LeadAiScore(score, confidence, rationale));
    }

    private static int ResolveLeadScore(Lead lead)
    {
        var score = 20;
        if (!string.IsNullOrWhiteSpace(lead.Email)) score += 20;
        if (!string.IsNullOrWhiteSpace(lead.Phone)) score += 15;
        if (!string.IsNullOrWhiteSpace(lead.CompanyName)) score += 10;
        if (!string.IsNullOrWhiteSpace(lead.JobTitle)) score += 10;
        if (!string.IsNullOrWhiteSpace(lead.Source)) score += 10;
        if (!string.IsNullOrWhiteSpace(lead.Territory)) score += 5;
        if (lead.AccountId.HasValue) score += 5;
        if (lead.ContactId.HasValue) score += 5;
        return Math.Clamp(score, 0, 100);
    }
}
