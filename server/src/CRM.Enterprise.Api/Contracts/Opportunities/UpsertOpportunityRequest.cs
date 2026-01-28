using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public class UpsertOpportunityRequest
{
    public string Name { get; set; } = string.Empty;
    public Guid? AccountId { get; set; }
    public Guid? PrimaryContactId { get; set; }
    public Guid? StageId { get; set; }
    public string? StageName { get; set; }
    public Guid? OwnerId { get; set; }
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD";
    public decimal Probability { get; set; }
    public DateTime? ExpectedCloseDate { get; set; }
    public DateTime? ContractStartDateUtc { get; set; }
    public DateTime? ContractEndDateUtc { get; set; }
    public string? ForecastCategory { get; set; }
    public string? OpportunityType { get; set; }
    public string? Summary { get; set; }
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
    public bool IsClosed { get; set; }
    public bool IsWon { get; set; }
    public string? WinLossReason { get; set; }
}
