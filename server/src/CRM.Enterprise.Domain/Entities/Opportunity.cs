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
    public DateTime? ContractStartDateUtc { get; set; }
    public DateTime? ContractEndDateUtc { get; set; }
    public string? ForecastCategory { get; set; }
    public string OpportunityType { get; set; } = "New";
    public Guid? RenewalOfOpportunityId { get; set; }
    public Guid? RenewalOpportunityId { get; set; }
    public DateTime? Renewal90TaskCreatedAtUtc { get; set; }
    public DateTime? Renewal60TaskCreatedAtUtc { get; set; }
    public DateTime? Renewal30TaskCreatedAtUtc { get; set; }
    public string? Summary { get; set; }
    public string? Requirements { get; set; }
    public string? BuyingProcess { get; set; }
    public string? SuccessCriteria { get; set; }
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
    public Guid? DeliveryOwnerId { get; set; }
    public string? DeliveryHandoffScope { get; set; }
    public string? DeliveryHandoffRisks { get; set; }
    public string? DeliveryHandoffTimeline { get; set; }
    public string? DeliveryStatus { get; set; }
    public DateTime? DeliveryCompletedAtUtc { get; set; }

    public Account? Account { get; set; }
    public Contact? PrimaryContact { get; set; }
    public OpportunityStage? Stage { get; set; }
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public ICollection<OpportunityStageHistory> StageHistory { get; set; } = new List<OpportunityStageHistory>();
    public ICollection<OpportunityTeamMember> TeamMembers { get; set; } = new List<OpportunityTeamMember>();
    public ICollection<OpportunityOnboardingItem> OnboardingItems { get; set; } = new List<OpportunityOnboardingItem>();
}
