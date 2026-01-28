using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class Activity : AuditableEntity
{
    public string Subject { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Outcome { get; set; }
    public string? TemplateKey { get; set; }
    public ActivityType Type { get; set; }
    public ActivityRelationType RelatedEntityType { get; set; }
    public Guid RelatedEntityId { get; set; }
    public Guid OwnerId { get; set; }
    public DateTime? DueDateUtc { get; set; }
    public DateTime? CompletedDateUtc { get; set; }
    public string? Location { get; set; }
    public bool IsAllDay { get; set; }
    public string? Priority { get; set; }
    public string? ExternalReference { get; set; }
}
