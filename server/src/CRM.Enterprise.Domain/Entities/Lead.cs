using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Lead : AuditableEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? CompanyName { get; set; }
    public string? JobTitle { get; set; }
    public Guid LeadStatusId { get; set; }
    public Guid OwnerId { get; set; }
    public string? Source { get; set; }
    public string? Territory { get; set; }
    public int Score { get; set; }
    public int? AiScore { get; set; }
    public decimal? AiConfidence { get; set; }
    public string? AiRationale { get; set; }
    public DateTime? AiScoredAtUtc { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? ContactId { get; set; }
    public Guid? ConvertedOpportunityId { get; set; }
    public DateTime? QualifiedAtUtc { get; set; }
    public DateTime? ConvertedAtUtc { get; set; }
    public string? DisqualifiedReason { get; set; }
    public DateTime? NurtureFollowUpAtUtc { get; set; }
    public string? QualifiedNotes { get; set; }
    public DateTime? FirstTouchDueAtUtc { get; set; }
    public DateTime? FirstTouchedAtUtc { get; set; }
    public string? BudgetAvailability { get; set; }
    public string? BudgetEvidence { get; set; }
    public string? ReadinessToSpend { get; set; }
    public string? ReadinessEvidence { get; set; }
    public string? BuyingTimeline { get; set; }
    public string? TimelineEvidence { get; set; }
    public string? ProblemSeverity { get; set; }
    public string? ProblemEvidence { get; set; }
    public string? EconomicBuyer { get; set; }
    public string? EconomicBuyerEvidence { get; set; }
    public string? IcpFit { get; set; }
    public string? IcpFitEvidence { get; set; }

    public LeadStatus? Status { get; set; }
    public Account? Account { get; set; }
    public Contact? Contact { get; set; }
    public Opportunity? ConvertedOpportunity { get; set; }
    public ICollection<LeadStatusHistory> StatusHistory { get; set; } = new List<LeadStatusHistory>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
}
