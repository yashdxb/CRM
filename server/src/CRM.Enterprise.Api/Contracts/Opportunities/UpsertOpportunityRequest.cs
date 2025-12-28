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
    public string? Summary { get; set; }
    public bool IsClosed { get; set; }
    public bool IsWon { get; set; }
    public string? WinLossReason { get; set; }
}
