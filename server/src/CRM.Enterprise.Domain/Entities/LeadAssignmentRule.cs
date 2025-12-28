using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class LeadAssignmentRule : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "Manual";
    public bool IsActive { get; set; } = true;
    public string? Territory { get; set; }
    public Guid? AssignedUserId { get; set; }
    public Guid? LastAssignedUserId { get; set; }
}
