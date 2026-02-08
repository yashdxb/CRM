using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public class UpsertLeadRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? CompanyName { get; set; }
    public string? JobTitle { get; set; }
    public string? Status { get; set; }
    public Guid? OwnerId { get; set; }
    public string? AssignmentStrategy { get; set; }
    public string? Source { get; set; }
    public string? Territory { get; set; }
    public bool? AutoScore { get; set; }
    public int Score { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? ContactId { get; set; }
    public string? DisqualifiedReason { get; set; }
    public string? LossReason { get; set; }
    public string? LossCompetitor { get; set; }
    public string? LossNotes { get; set; }
    public DateTime? NurtureFollowUpAtUtc { get; set; }
    public string? QualifiedNotes { get; set; }
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
}
