using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Rfq : AuditableEntity
{
    public string RfqNumber { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = "Draft";
    public DateTime IssueDate { get; set; }
    public DateTime? CloseDate { get; set; }
    public string? Type { get; set; }
    public string? Currency { get; set; }
    public string? Description { get; set; }

    public List<RfqLine> Lines { get; set; } = new();
}
