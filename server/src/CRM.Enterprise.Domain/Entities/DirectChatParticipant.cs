using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class DirectChatParticipant : AuditableEntity
{
    public Guid ThreadId { get; set; }
    public Guid UserId { get; set; }
    public bool IsArchived { get; set; }
    public DateTime? ArchivedAtUtc { get; set; }
    public DateTime? LastClearedAtUtc { get; set; }
    public DateTime? LastReadAtUtc { get; set; }

    public DirectChatThread Thread { get; set; } = null!;
}
