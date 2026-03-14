using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyActivity : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public ActivityType Type { get; set; } = ActivityType.Task;
    public string Subject { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public PropertyActivityStatus Status { get; set; } = PropertyActivityStatus.Open;
    public PropertyActivityPriority Priority { get; set; } = PropertyActivityPriority.Medium;
    public Guid? AssignedToId { get; set; }
    public string? AssignedToName { get; set; }
    public string? CreatedByName { get; set; }

    public Property? Property { get; set; }
}
