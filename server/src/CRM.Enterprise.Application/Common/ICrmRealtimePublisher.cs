namespace CRM.Enterprise.Application.Common;

public interface ICrmRealtimePublisher
{
    Task PublishTenantEventAsync(
        Guid tenantId,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default);

    Task PublishUserEventAsync(
        Guid tenantId,
        Guid userId,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default);

    Task PublishUsersEventAsync(
        Guid tenantId,
        IEnumerable<Guid> userIds,
        string eventType,
        object payload,
        CancellationToken cancellationToken = default);
}
