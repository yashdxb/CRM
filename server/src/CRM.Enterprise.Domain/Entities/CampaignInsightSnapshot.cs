using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CampaignInsightSnapshot : AuditableEntity
{
    public Guid CampaignId { get; set; }
    public int Score { get; set; }
    public string Trend { get; set; } = "flat";
    public int CalculationWindowDays { get; set; } = 30;
    public string ReasonChipsJson { get; set; } = "[]";
    public string MetricsJson { get; set; } = "{}";
    public DateTime ComputedUtc { get; set; }

    public Campaign? Campaign { get; set; }
}
