using System;

namespace CRM.Enterprise.Api.Contracts.Properties;

public class UpsertPropertyRequest
{
    public string? MlsNumber { get; set; }
    public string Address { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? PostalCode { get; set; }
    public decimal? ListPrice { get; set; }
    public decimal? SalePrice { get; set; }
    public string Currency { get; set; } = "CAD";
    public DateTime? ListingDateUtc { get; set; }
    public DateTime? SoldDateUtc { get; set; }
    public string? Status { get; set; }
    public string? PropertyType { get; set; }
    public int? Bedrooms { get; set; }
    public int? Bathrooms { get; set; }
    public decimal? SquareFeet { get; set; }
    public decimal? LotSizeSqFt { get; set; }
    public int? YearBuilt { get; set; }
    public int? GarageSpaces { get; set; }
    public string? Description { get; set; }
    public string? Features { get; set; }
    public string? PhotoUrls { get; set; }
    public string? VirtualTourUrl { get; set; }
    public Guid? OwnerId { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? PrimaryContactId { get; set; }
    public Guid? OpportunityId { get; set; }
    public string? Neighborhood { get; set; }
}
