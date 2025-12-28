using System;

namespace CRM.Enterprise.Api.Contracts.Contacts;

public class UpsertContactRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Mobile { get; set; }
    public string? JobTitle { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? OwnerId { get; set; }
    public string? LinkedInProfile { get; set; }
    public string? LifecycleStage { get; set; }
    public int ActivityScore { get; set; }
}
