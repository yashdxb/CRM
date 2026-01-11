namespace CRM.Enterprise.Api.Contracts.Audit;

public sealed record AuditLogResponse(
    IReadOnlyList<AuditEventItem> Items,
    int Total);
