using CRM.Enterprise.Application.Marketing;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Marketing;

public sealed class EmailComplianceService : IEmailComplianceService
{
    private const int HardBounceThreshold = 3;
    private readonly CrmDbContext _dbContext;

    public EmailComplianceService(CrmDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsEligibleForEmailAsync(string email, Guid tenantId, CancellationToken cancellationToken = default)
    {
        var pref = await _dbContext.EmailPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.TenantId == tenantId && p.Email == email && !p.IsDeleted, cancellationToken);

        if (pref is null) return true;
        if (!pref.IsSubscribed) return false;
        if (pref.HardBounceCount >= HardBounceThreshold) return false;

        return true;
    }

    public async Task<IReadOnlyList<string>> FilterEligibleRecipientsAsync(IReadOnlyList<string> emails, Guid tenantId, CancellationToken cancellationToken = default)
    {
        if (emails.Count == 0) return emails;

        var suppressed = await _dbContext.EmailPreferences
            .AsNoTracking()
            .Where(p => p.TenantId == tenantId && emails.Contains(p.Email) && !p.IsDeleted
                        && (!p.IsSubscribed || p.HardBounceCount >= HardBounceThreshold))
            .Select(p => p.Email)
            .ToListAsync(cancellationToken);

        var suppressedSet = new HashSet<string>(suppressed, StringComparer.OrdinalIgnoreCase);
        return emails.Where(e => !suppressedSet.Contains(e)).ToList();
    }

    public async Task ProcessUnsubscribeAsync(string email, Guid tenantId, string source, string? reason = null, CancellationToken cancellationToken = default)
    {
        var pref = await _dbContext.EmailPreferences
            .FirstOrDefaultAsync(p => p.TenantId == tenantId && p.Email == email && !p.IsDeleted, cancellationToken);

        if (pref is null)
        {
            pref = new EmailPreference
            {
                TenantId = tenantId,
                Email = email,
                EntityType = "Unknown",
                EntityId = Guid.Empty,
                IsSubscribed = false,
                UnsubscribedAtUtc = DateTime.UtcNow,
                UnsubscribeReason = reason,
                UnsubscribeSource = source
            };
            _dbContext.EmailPreferences.Add(pref);
        }
        else
        {
            pref.IsSubscribed = false;
            pref.UnsubscribedAtUtc = DateTime.UtcNow;
            pref.UnsubscribeReason = reason;
            pref.UnsubscribeSource = source;
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task ProcessBounceAsync(string email, string? bounceReason, Guid tenantId, CancellationToken cancellationToken = default)
    {
        var pref = await _dbContext.EmailPreferences
            .FirstOrDefaultAsync(p => p.TenantId == tenantId && p.Email == email && !p.IsDeleted, cancellationToken);

        if (pref is null)
        {
            pref = new EmailPreference
            {
                TenantId = tenantId,
                Email = email,
                EntityType = "Unknown",
                EntityId = Guid.Empty,
                HardBounceCount = 1,
                LastBounceAtUtc = DateTime.UtcNow
            };
            _dbContext.EmailPreferences.Add(pref);
        }
        else
        {
            pref.HardBounceCount++;
            pref.LastBounceAtUtc = DateTime.UtcNow;

            if (pref.HardBounceCount >= HardBounceThreshold && pref.IsSubscribed)
            {
                pref.IsSubscribed = false;
                pref.UnsubscribedAtUtc = DateTime.UtcNow;
                pref.UnsubscribeSource = "Bounce";
                pref.UnsubscribeReason = $"Auto-suppressed after {HardBounceThreshold} hard bounces. Last: {bounceReason}";
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<EmailPreferenceDto?> GetPreferenceAsync(string email, Guid tenantId, CancellationToken cancellationToken = default)
    {
        var pref = await _dbContext.EmailPreferences
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.TenantId == tenantId && p.Email == email && !p.IsDeleted, cancellationToken);

        return pref is null ? null : ToDto(pref);
    }

    public async Task<EmailPreferenceDto> UpdatePreferenceAsync(string email, Guid tenantId, bool isSubscribed, string source, CancellationToken cancellationToken = default)
    {
        var pref = await _dbContext.EmailPreferences
            .FirstOrDefaultAsync(p => p.TenantId == tenantId && p.Email == email && !p.IsDeleted, cancellationToken);

        if (pref is null)
        {
            pref = new EmailPreference
            {
                TenantId = tenantId,
                Email = email,
                EntityType = "Unknown",
                EntityId = Guid.Empty,
                IsSubscribed = isSubscribed,
                UnsubscribeSource = source
            };

            if (!isSubscribed)
            {
                pref.UnsubscribedAtUtc = DateTime.UtcNow;
            }

            _dbContext.EmailPreferences.Add(pref);
        }
        else
        {
            pref.IsSubscribed = isSubscribed;
            pref.UnsubscribeSource = source;

            if (!isSubscribed && pref.UnsubscribedAtUtc is null)
            {
                pref.UnsubscribedAtUtc = DateTime.UtcNow;
            }
            else if (isSubscribed)
            {
                pref.UnsubscribedAtUtc = null;
                pref.UnsubscribeReason = null;
            }
        }

        await _dbContext.SaveChangesAsync(cancellationToken);
        return ToDto(pref);
    }

    private static EmailPreferenceDto ToDto(EmailPreference p)
        => new(p.Id, p.Email, p.EntityType, p.EntityId, p.IsSubscribed,
               p.UnsubscribedAtUtc, p.UnsubscribeReason, p.UnsubscribeSource,
               p.HardBounceCount, p.LastBounceAtUtc);
}
