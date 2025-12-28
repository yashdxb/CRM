using System;

namespace CRM.Enterprise.Api.Contracts.Customers;

public class UpsertCustomerRequest
{
    public string Name { get; set; } = string.Empty;
    public string? AccountNumber { get; set; }
    public string? Industry { get; set; }
    public string? Website { get; set; }
    public string? Phone { get; set; }
    public string? LifecycleStage { get; set; }
    public Guid? OwnerId { get; set; }
    public string? Territory { get; set; }
    public string? Description { get; set; }
}
