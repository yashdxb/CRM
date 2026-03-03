using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportQueueMember : AuditableEntity
{
    public Guid QueueId { get; set; }
    public Guid UserId { get; set; }
    public bool IsActive { get; set; } = true;

    public SupportQueue Queue { get; set; } = null!;
    public User? User { get; set; }
}
