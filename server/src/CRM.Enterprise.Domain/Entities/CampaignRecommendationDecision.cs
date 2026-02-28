using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignRecommendationDecision : AuditableEntity
{
    public Guid RecommendationId { get; set; }
    public string Decision { get; set; } = string.Empty;
    public string? Reason { get; set; }
    public DateTime DecidedUtc { get; set; }
    public Guid? DecidedByUserId { get; set; }

    public CampaignRecommendation? Recommendation { get; set; }
}
