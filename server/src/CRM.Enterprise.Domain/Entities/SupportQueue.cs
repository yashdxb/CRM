using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportQueue : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<SupportQueueMember> Members { get; set; } = new List<SupportQueueMember>();
    public ICollection<SupportCase> Cases { get; set; } = new List<SupportCase>();
}
