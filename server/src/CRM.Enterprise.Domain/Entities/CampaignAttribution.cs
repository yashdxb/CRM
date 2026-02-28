using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignAttribution : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public Guid OpportunityId { get; set; }
    public string Model { get; set; } = "first_touch";
    public decimal AttributedAmount { get; set; }
    public DateTime AttributedUtc { get; set; }

    public Campaign? Campaign { get; set; }
    public Opportunity? Opportunity { get; set; }
}
