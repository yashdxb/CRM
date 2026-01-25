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
    public DateTime? NurtureFollowUpAtUtc { get; set; }
    public string? QualifiedNotes { get; set; }
}
