using CRM.Enterprise.Application.Opportunities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Opportunities;

internal static class OpportunityMatching
{
    internal sealed record ScoredOpportunityMatch(
        Guid Id,
        string Name,
        string? AccountName,
        string? StageName,
        decimal Amount,
        DateTime? ExpectedCloseDate,
        int Score,
        string MatchLevel,
        IReadOnlyList<string> MatchedSignals);

    public static async Task<IReadOnlyList<ScoredOpportunityMatch>> FindDuplicatesAsync(
        CrmDbContext dbContext,
        string name,
        Guid? accountId,
        decimal amount,
        DateTime? expectedCloseDate,
        string? stageName,
        Guid? excludeOpportunityId,
        CancellationToken cancellationToken)
    {
        var normalizedName = NormalizeText(name);

        if (string.IsNullOrWhiteSpace(normalizedName))
        {
            return [];
        }

        var query = dbContext.Opportunities
            .AsNoTracking()
            .Where(o => !o.IsDeleted && !o.IsClosed);

        if (excludeOpportunityId.HasValue && excludeOpportunityId.Value != Guid.Empty)
        {
            query = query.Where(o => o.Id != excludeOpportunityId.Value);
        }

        // Pre-filter: only load candidates that share the name or the account
        var hasAccount = accountId.HasValue && accountId.Value != Guid.Empty;

        query = query.Where(o =>
            (o.Name != null && o.Name.ToLower() == normalizedName)
            || (hasAccount && o.AccountId == accountId));

        var candidates = await query
            .OrderByDescending(o => o.CreatedAtUtc)
            .Select(o => new
            {
                o.Id,
                o.Name,
                o.AccountId,
                AccountName = o.Account != null ? o.Account.Name : null,
                StageName = o.Stage != null ? o.Stage.Name : null,
                o.Amount,
                o.ExpectedCloseDate,
                o.CreatedAtUtc
            })
            .Take(100)
            .ToListAsync(cancellationToken);

        if (candidates.Count == 0)
        {
            return [];
        }

        var normalizedStage = NormalizeText(stageName);

        var matches = new List<ScoredOpportunityMatch>();

        foreach (var c in candidates)
        {
            var candidateName = NormalizeText(c.Name);
            var signals = new List<string>();
            var score = 0;

            // Name + same account → strongest signal (5 pts)
            var nameMatch = !string.IsNullOrWhiteSpace(candidateName) && candidateName == normalizedName;
            var accountMatch = hasAccount && c.AccountId == accountId;

            if (nameMatch && accountMatch)
            {
                signals.Add("name + account exact");
                score += 5;
            }
            else if (nameMatch)
            {
                signals.Add("name exact");
                score += 3;
            }

            // Same account + similar amount + close date within 30 days (2 pts)
            if (accountMatch && amount > 0 && c.Amount > 0)
            {
                var amountRatio = Math.Min((double)amount, (double)c.Amount) / Math.Max((double)amount, (double)c.Amount);
                var closeDateProximity = expectedCloseDate.HasValue && c.ExpectedCloseDate.HasValue
                    && Math.Abs((expectedCloseDate.Value - c.ExpectedCloseDate.Value).TotalDays) <= 30;

                if (amountRatio >= 0.8 && closeDateProximity)
                {
                    signals.Add("account + amount + close date");
                    score += 2;
                }
            }

            // Same account + same stage (1 pt)
            if (accountMatch && !string.IsNullOrWhiteSpace(normalizedStage)
                && NormalizeText(c.StageName) == normalizedStage)
            {
                signals.Add("account + stage");
                score += 1;
            }

            if (score < 3)
            {
                continue;
            }

            var level = score >= 5 ? "block" : "warning";

            matches.Add(new ScoredOpportunityMatch(
                c.Id,
                c.Name ?? "(No name)",
                c.AccountName,
                c.StageName,
                c.Amount,
                c.ExpectedCloseDate,
                score,
                level,
                signals));
        }

        return matches
            .OrderByDescending(m => m.Score)
            .ThenByDescending(m => m.Amount)
            .Take(8)
            .ToList();
    }

    private static string? NormalizeText(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Trim().ToLowerInvariant();
    }
}
