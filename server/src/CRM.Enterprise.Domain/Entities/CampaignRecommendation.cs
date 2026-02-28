using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignRecommendation : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Severity { get; set; } = "info";
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal ImpactEstimate { get; set; }
    public decimal Confidence { get; set; }
    public string EvidenceJson { get; set; } = "[]";
    public string Status { get; set; } = "active";
    public DateTime GeneratedUtc { get; set; }
    public DateTime? ExpiresUtc { get; set; }
    public DateTime? DecidedUtc { get; set; }
    public Guid? DecidedByUserId { get; set; }
    public string? DecisionReason { get; set; }

    public Campaign? Campaign { get; set; }
    public ICollection<CampaignRecommendationDecision> Decisions { get; set; } = new List<CampaignRecommendationDecision>();
}
