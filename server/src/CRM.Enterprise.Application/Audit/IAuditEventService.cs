namespace CRM.Enterprise.Application.Audit;

public interface IAuditEventService
{
    Task TrackAsync(AuditEventEntry entry, CancellationToken cancellationToken = default);
    Task TrackManyAsync(IEnumerable<AuditEventEntry> entries, CancellationToken cancellationToken = default);
}
