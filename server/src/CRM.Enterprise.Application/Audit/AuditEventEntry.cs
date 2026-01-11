namespace CRM.Enterprise.Application.Audit;

public sealed record AuditEventEntry(
    string EntityType,
    Guid EntityId,
    string Action,
    string? Field,
    string? OldValue,
    string? NewValue,
    Guid? ChangedByUserId,
    string? ChangedByName);
