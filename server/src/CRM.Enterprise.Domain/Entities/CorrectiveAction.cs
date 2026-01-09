using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CorrectiveAction : AuditableEntity
{
    public string ActionNumber { get; set; } = string.Empty;
    public string Status { get; set; } = "Open";
    public string? ActionType { get; set; }
    public string? Owner { get; set; }
    public Guid? NonConformanceId { get; set; }
    public Guid? SupplierId { get; set; }
    public DateTime OpenedDate { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? ClosedDate { get; set; }
    public string? RootCause { get; set; }
    public string? ActionPlan { get; set; }
    public string? VerificationNotes { get; set; }

    public NonConformance? NonConformance { get; set; }
    public Supplier? Supplier { get; set; }
}
