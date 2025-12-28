using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Account : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? AccountNumber { get; set; }
    public string? Industry { get; set; }
    public string? Website { get; set; }
    public string? Phone { get; set; }
    public Guid? ParentAccountId { get; set; }
    public Guid OwnerId { get; set; }
    public string? LifecycleStage { get; set; }
    public int ActivityScore { get; set; }
    public string? Territory { get; set; }
    public string? Description { get; set; }
    public DateTime? LastViewedAtUtc { get; set; }

    public Account? ParentAccount { get; set; }
    public ICollection<Account> ChildAccounts { get; set; } = new List<Account>();
    public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
    public ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
}
