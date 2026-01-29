using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class AssistantThread : AuditableEntity
{
    public Guid UserId { get; set; }
    public string ThreadId { get; set; } = string.Empty;
}
