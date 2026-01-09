using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class RfqAward : AuditableEntity
{
    public Guid RfqId { get; set; }
    public Guid SupplierId { get; set; }
    public string AwardNumber { get; set; } = string.Empty;
    public DateTime AwardDate { get; set; }
    public string Status { get; set; } = "Awarded";
    public decimal AwardAmount { get; set; }
    public string? Currency { get; set; }
    public string? Notes { get; set; }

    public Rfq? Rfq { get; set; }
    public Supplier? Supplier { get; set; }
}
