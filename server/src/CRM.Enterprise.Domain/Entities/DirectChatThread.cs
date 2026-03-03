using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class DirectChatThread : AuditableEntity
{
    public string? Title { get; set; }

    public ICollection<DirectChatParticipant> Participants { get; set; } = new List<DirectChatParticipant>();
    public ICollection<DirectChatMessage> Messages { get; set; } = new List<DirectChatMessage>();
}
