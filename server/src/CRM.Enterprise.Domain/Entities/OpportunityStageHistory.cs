using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class OpportunityStageHistory : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Guid OpportunityStageId { get; set; }
    public DateTime ChangedAtUtc { get; set; }
    public string? ChangedBy { get; set; }
    public string? Notes { get; set; }

    public Opportunity? Opportunity { get; set; }
    public OpportunityStage? OpportunityStage { get; set; }
}
