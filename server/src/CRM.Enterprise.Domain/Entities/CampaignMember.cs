using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignMember : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public string EntityType { get; set; } = "Lead";
    public Guid EntityId { get; set; }
    public string ResponseStatus { get; set; } = "Sent";
    public DateTime AddedUtc { get; set; }

    public Campaign? Campaign { get; set; }
}
