using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Campaign : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "General";
    public string Channel { get; set; } = "Mixed";
    public string Status { get; set; } = "Draft";
    public Guid OwnerUserId { get; set; }
    public DateTime? StartDateUtc { get; set; }
    public DateTime? EndDateUtc { get; set; }
    public decimal BudgetPlanned { get; set; }
    public decimal BudgetActual { get; set; }
    public string? Objective { get; set; }

    public User? OwnerUser { get; set; }
    public ICollection<CampaignMember> Members { get; set; } = new List<CampaignMember>();
    public ICollection<CampaignAttribution> Attributions { get; set; } = new List<CampaignAttribution>();
    public ICollection<CampaignInsightSnapshot> InsightSnapshots { get; set; } = new List<CampaignInsightSnapshot>();
    public ICollection<CampaignRecommendation> Recommendations { get; set; } = new List<CampaignRecommendation>();
}
