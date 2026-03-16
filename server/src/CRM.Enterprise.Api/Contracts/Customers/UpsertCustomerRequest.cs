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
    public Guid? ParentAccountId { get; set; }
    public string? Territory { get; set; }
    public string? Description { get; set; }
    public decimal? AnnualRevenue { get; set; }
    public int? NumberOfEmployees { get; set; }
    public string? AccountType { get; set; }
    public string? Rating { get; set; }
    public string? AccountSource { get; set; }
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
    public DateTime? RenewalDate { get; set; }
    public DateTime? ContractEndDate { get; set; }
}
