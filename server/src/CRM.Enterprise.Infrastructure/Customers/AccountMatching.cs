using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Customers;

internal static class AccountMatching
{
    internal sealed record AccountMatch(Guid Id, string Name);

    public static async Task<AccountMatch?> FindBestMatchAsync(
        CrmDbContext dbContext,
        string? name,
        string? accountNumber,
        string? website,
        string? phone,
        Guid? excludeAccountId,
        CancellationToken cancellationToken)
    {
        var normalizedName = NormalizeText(name);
        var normalizedAccountNumber = NormalizeText(accountNumber);
        var normalizedWebsite = NormalizeWebsite(website);
        var normalizedPhone = NormalizePhone(phone);

        if (string.IsNullOrWhiteSpace(normalizedName)
            && string.IsNullOrWhiteSpace(normalizedAccountNumber)
            && string.IsNullOrWhiteSpace(normalizedWebsite)
            && string.IsNullOrWhiteSpace(normalizedPhone))
        {
            return null;
        }

        var query = dbContext.Accounts
            .AsNoTracking()
            .Where(a => !a.IsDeleted);

        if (excludeAccountId.HasValue && excludeAccountId.Value != Guid.Empty)
        {
            query = query.Where(a => a.Id != excludeAccountId.Value);
        }

        if (!string.IsNullOrWhiteSpace(normalizedName))
        {
            query = query.Where(a => a.Name != null && a.Name.ToLower() == normalizedName);
        }
        else
        {
            query = query.Where(a =>
                (!string.IsNullOrWhiteSpace(normalizedAccountNumber) && a.AccountNumber != null && a.AccountNumber.ToLower() == normalizedAccountNumber)
                || (!string.IsNullOrWhiteSpace(normalizedWebsite) && a.Website != null && NormalizeWebsite(a.Website) == normalizedWebsite)
                || (!string.IsNullOrWhiteSpace(normalizedPhone) && a.Phone != null && NormalizePhone(a.Phone) == normalizedPhone));
        }

        var candidates = await query
            .Select(a => new
            {
                a.Id,
                a.Name,
                a.AccountNumber,
                a.Website,
                a.Phone,
                a.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        if (candidates.Count == 0)
        {
            return null;
        }

        var best = candidates
            .Select(candidate => new
            {
                candidate.Id,
                candidate.Name,
                candidate.CreatedAtUtc,
                Score = ComputeMatchScore(
                    normalizedName,
                    normalizedAccountNumber,
                    normalizedWebsite,
                    normalizedPhone,
                    candidate.Name,
                    candidate.AccountNumber,
                    candidate.Website,
                    candidate.Phone)
            })
            .Where(item => item.Score > 0)
            .OrderByDescending(item => item.Score)
            .ThenBy(item => item.CreatedAtUtc)
            .FirstOrDefault();

        return best is null ? null : new AccountMatch(best.Id, best.Name);
    }

    private static int ComputeMatchScore(
        string? normalizedName,
        string? normalizedAccountNumber,
        string? normalizedWebsite,
        string? normalizedPhone,
        string? candidateName,
        string? candidateAccountNumber,
        string? candidateWebsite,
        string? candidatePhone)
    {
        var score = 0;
        if (!string.IsNullOrWhiteSpace(normalizedName) && NormalizeText(candidateName) == normalizedName)
        {
            score += 5;
        }

        if (!string.IsNullOrWhiteSpace(normalizedAccountNumber) && NormalizeText(candidateAccountNumber) == normalizedAccountNumber)
        {
            score += 3;
        }

        if (!string.IsNullOrWhiteSpace(normalizedWebsite) && NormalizeWebsite(candidateWebsite) == normalizedWebsite)
        {
            score += 2;
        }

        if (!string.IsNullOrWhiteSpace(normalizedPhone) && NormalizePhone(candidatePhone) == normalizedPhone)
        {
            score += 1;
        }

        return score;
    }

    private static string? NormalizeText(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Trim().ToLowerInvariant();
    }

    private static string? NormalizeWebsite(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var cleaned = value.Trim().ToLowerInvariant();
        cleaned = cleaned.Replace("https://", string.Empty, StringComparison.Ordinal);
        cleaned = cleaned.Replace("http://", string.Empty, StringComparison.Ordinal);
        cleaned = cleaned.Replace("www.", string.Empty, StringComparison.Ordinal);
        return cleaned.TrimEnd('/');
    }

    private static string? NormalizePhone(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        var chars = value.Where(char.IsDigit).ToArray();
        return chars.Length == 0 ? null : new string(chars);
    }
}
