using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Contact : AuditableEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public string? JobTitle { get; set; }
    public string? BuyingRole { get; set; }
    public Guid? AccountId { get; set; }
    public Guid OwnerId { get; set; }
    public string? LinkedInProfile { get; set; }
    public string? LifecycleStage { get; set; }
    public int ActivityScore { get; set; }

    public Account? Account { get; set; }
    public ICollection<Activity> Activities { get; set; } = new List<Activity>();
    public ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
}
