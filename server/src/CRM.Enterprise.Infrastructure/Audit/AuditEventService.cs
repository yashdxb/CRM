using CRM.Enterprise.Application.Audit;
using CRM.Enterprise.Domain.Entities;
using CRM.Enterprise.Infrastructure.Persistence;
using CRM.Enterprise.Application.Tenants;

namespace CRM.Enterprise.Infrastructure.Audit;

public sealed class AuditEventService : IAuditEventService
{
    private readonly CrmDbContext _dbContext;
    private readonly ITenantProvider _tenantProvider;

    public AuditEventService(CrmDbContext dbContext, ITenantProvider tenantProvider)
    {
        _dbContext = dbContext;
        _tenantProvider = tenantProvider;
    }

    public Task TrackAsync(AuditEventEntry entry, CancellationToken cancellationToken = default)
    {
        _dbContext.AuditEvents.Add(Map(entry));
        return Task.CompletedTask;
    }

    public Task TrackManyAsync(IEnumerable<AuditEventEntry> entries, CancellationToken cancellationToken = default)
    {
        _dbContext.AuditEvents.AddRange(entries.Select(Map));
        return Task.CompletedTask;
    }

    private AuditEvent Map(AuditEventEntry entry)
    {
        return new AuditEvent
        {
            EntityType = entry.EntityType,
            EntityId = entry.EntityId,
            Action = entry.Action,
            Field = entry.Field,
            OldValue = entry.OldValue,
            NewValue = entry.NewValue,
            ChangedByUserId = entry.ChangedByUserId,
            ChangedByName = entry.ChangedByName,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = entry.ChangedByName,
            TenantId = _tenantProvider.TenantId
        };
    }
}
