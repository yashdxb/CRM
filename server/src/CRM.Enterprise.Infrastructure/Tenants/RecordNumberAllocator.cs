using System.Data;
using System.Text.Json;
using CRM.Enterprise.Application.Tenants;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CRM.Enterprise.Infrastructure.Tenants;

public sealed class RecordNumberAllocator : IRecordNumberAllocator
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public RecordNumberAllocator(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public async Task<string> AllocateAsync(string moduleKey, CancellationToken cancellationToken = default)
    {
        var tenantId = _tenantProvider.TenantId;
        var tenant = await _dbContext.Tenants
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == tenantId, cancellationToken)
            ?? throw new InvalidOperationException("Tenant context could not be resolved for record numbering.");

        var policy = RecordNumberingPolicyDefaults.Resolve(DeserializePolicies(tenant.RecordNumberingPolicyJson), moduleKey);
        if (!policy.Enabled)
        {
            throw new InvalidOperationException($"Record numbering is disabled for module '{moduleKey}'.");
        }

        const int maxAttempts = 3;
        for (var attempt = 1; attempt <= maxAttempts; attempt++)
        {
            try
            {
                var executionStrategy = _dbContext.Database.CreateExecutionStrategy();
                return await executionStrategy.ExecuteAsync(async () =>
                {
                    await using var transaction = await _dbContext.Database.BeginTransactionAsync(IsolationLevel.Serializable, cancellationToken);

                    var counter = await _dbContext.TenantRecordNumberCounters
                        .FirstOrDefaultAsync(
                            item => item.TenantId == tenantId
                                && item.ModuleKey == moduleKey
                                && !item.IsDeleted,
                            cancellationToken);

                    var sequence = counter?.NextValue ?? 1;
                    if (counter is null)
                    {
                        _dbContext.TenantRecordNumberCounters.Add(new TenantRecordNumberCounter
                        {
                            TenantId = tenantId,
                            ModuleKey = moduleKey,
                            NextValue = sequence + 1,
                            CreatedAtUtc = DateTime.UtcNow
                        });
                    }
                    else
                    {
                        counter.NextValue = sequence + 1;
                        counter.UpdatedAtUtc = DateTime.UtcNow;
                    }

                    await _dbContext.SaveChangesAsync(cancellationToken);
                    await transaction.CommitAsync(cancellationToken);
                    return $"{policy.Prefix}{sequence.ToString($"D{policy.Padding}")}";
                });
            }
            catch (DbUpdateException) when (attempt < maxAttempts)
            {
                _dbContext.ChangeTracker.Clear();
            }
        }

        throw new InvalidOperationException($"Unable to allocate the next record number for module '{moduleKey}'.");
    }

    private static IReadOnlyList<RecordNumberingPolicy> DeserializePolicies(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return RecordNumberingPolicyDefaults.CreateDefault();
        }

        try
        {
            return RecordNumberingPolicyDefaults.Normalize(
                JsonSerializer.Deserialize<List<RecordNumberingPolicy>>(json, JsonOptions));
        }
        catch (JsonException)
        {
            return RecordNumberingPolicyDefaults.CreateDefault();
        }
    }
}
