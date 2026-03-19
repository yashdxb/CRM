using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class FormDraft : AuditableEntity
{
    public Guid OwnerUserId { get; set; }
    public string EntityType { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Subtitle { get; set; }
    public string PayloadJson { get; set; } = "{}";
    public string Status { get; set; } = "Active";
    public DateTime? CompletedAtUtc { get; set; }
}
