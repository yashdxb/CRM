using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class DirectChatMessage : AuditableEntity
{
    public Guid ThreadId { get; set; }
    public Guid SenderUserId { get; set; }
    public string Content { get; set; } = string.Empty;

    public DirectChatThread Thread { get; set; } = null!;
}
