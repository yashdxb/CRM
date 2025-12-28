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
    public Guid? AccountId { get; set; }
    public Guid? ContactId { get; set; }
    public Guid? ConvertedOpportunityId { get; set; }
    public DateTime? QualifiedAtUtc { get; set; }
    public DateTime? ConvertedAtUtc { get; set; }

    public LeadStatus? Status { get; set; }
    public Account? Account { get; set; }
    public Contact? Contact { get; set; }
    public Opportunity? ConvertedOpportunity { get; set; }
    public ICollection<LeadStatusHistory> StatusHistory { get; set; } = new List<LeadStatusHistory>();
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
}
