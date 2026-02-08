using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityApprovalChain : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }

    public Guid? RequestedByUserId { get; set; }
    public string Purpose { get; set; } = "Close";
    public string Status { get; set; } = "Pending";
    public int CurrentStep { get; set; } = 1;
    public int TotalSteps { get; set; } = 1;
    public string StepsJson { get; set; } = "[]";
    public DateTime RequestedOn { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedOn { get; set; }
}
