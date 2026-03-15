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
    public DateTime? LastActivityAtUtc { get; set; }
    public int HealthScore { get; set; }

    // Firmographic fields
    public decimal? AnnualRevenue { get; set; }
    public int? NumberOfEmployees { get; set; }
    public string? AccountType { get; set; }
    public string? Rating { get; set; }
    public string? AccountSource { get; set; }

    // Structured address fields
    public string? BillingStreet { get; set; }
    public string? BillingCity { get; set; }
    public string? BillingState { get; set; }
    public string? BillingPostalCode { get; set; }
    public string? BillingCountry { get; set; }
    public string? ShippingStreet { get; set; }
    public string? ShippingCity { get; set; }
    public string? ShippingState { get; set; }
    public string? ShippingPostalCode { get; set; }
    public string? ShippingCountry { get; set; }

    public Account? ParentAccount { get; set; }
    public ICollection<Account> ChildAccounts { get; set; } = new List<Account>();
    public ICollection<Contact> Contacts { get; set; } = new List<Contact>();
    public ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
    public ICollection<Lead> Leads { get; set; } = new List<Lead>();
    public ICollection<SupportCase> SupportCases { get; set; } = new List<SupportCase>();
    public ICollection<AccountTeamMember> TeamMembers { get; set; } = new List<AccountTeamMember>();
}
