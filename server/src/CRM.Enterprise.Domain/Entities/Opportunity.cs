using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Opportunity : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public Guid AccountId { get; set; }
    public Guid? PrimaryContactId { get; set; }
    public Guid StageId { get; set; }
    public Guid OwnerId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public decimal Probability { get; set; }
    public DateTime? ExpectedCloseDate { get; set; }
    public string? ForecastCategory { get; set; }
    public string? Summary { get; set; }
    public string? WinLossReason { get; set; }
    public bool IsClosed { get; set; }
    public bool IsWon { get; set; }
    public decimal? DiscountPercent { get; set; }
    public decimal? DiscountAmount { get; set; }
    public string? PricingNotes { get; set; }
    public string? SecurityReviewStatus { get; set; }
    public string? SecurityNotes { get; set; }
    public string? LegalReviewStatus { get; set; }
    public string? LegalNotes { get; set; }

    public Account? Account { get; set; }
    public Contact? PrimaryContact { get; set; }
    public OpportunityStage? Stage { get; set; }
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public ICollection<OpportunityStageHistory> StageHistory { get; set; } = new List<OpportunityStageHistory>();
}
