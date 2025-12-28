using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class LeadStatusHistory : AuditableEntity
{
    public Guid LeadId { get; set; }
    public Guid LeadStatusId { get; set; }
    public DateTime ChangedAtUtc { get; set; }
    public string? ChangedBy { get; set; }
    public string? Notes { get; set; }

    public Lead? Lead { get; set; }
    public LeadStatus? LeadStatus { get; set; }
}
