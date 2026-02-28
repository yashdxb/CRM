using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class AttributionExplainabilityEvent : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public Guid OpportunityId { get; set; }
    public string Model { get; set; } = "first_touch";
    public string SourceEntityType { get; set; } = string.Empty;
    public Guid SourceEntityId { get; set; }
    public DateTime MemberAddedUtc { get; set; }
    public DateTime AttributedUtc { get; set; }
    public string RuleVersion { get; set; } = "first_touch:v1";
    public string EvidenceJson { get; set; } = "[]";

    public Campaign? Campaign { get; set; }
    public Opportunity? Opportunity { get; set; }
}
