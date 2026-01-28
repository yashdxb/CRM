using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityOnboardingItem : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }
    public string Type { get; set; } = "Checklist";
    public string Title { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public DateTime? DueDateUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public string? Notes { get; set; }
}
