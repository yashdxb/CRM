namespace CRM.Enterprise.Application.Common;

public sealed record CrmRealtimeEventEnvelope(
    string EventType,
    Guid TenantId,
    DateTime OccurredAtUtc,
    object Payload);
