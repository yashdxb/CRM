using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class Property : AuditableEntity
{
    public string? MlsNumber { get; set; }
    public string Address { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? Province { get; set; }
    public string? PostalCode { get; set; }
    public string? Country { get; set; }
    public decimal? ListPrice { get; set; }
    public decimal? SalePrice { get; set; }
    public string Currency { get; set; } = "CAD";
    public DateTime? ListingDateUtc { get; set; }
    public DateTime? SoldDateUtc { get; set; }
    public PropertyStatus Status { get; set; } = PropertyStatus.Draft;
    public PropertyType PropertyType { get; set; } = PropertyType.Detached;
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
    public decimal? CommissionRate { get; set; }
    public decimal? BuyerAgentCommission { get; set; }
    public decimal? SellerAgentCommission { get; set; }
    public Guid? CoListingAgentId { get; set; }
    public Guid OwnerId { get; set; }
    public Guid? AccountId { get; set; }
    public Guid? PrimaryContactId { get; set; }
    public Guid? OpportunityId { get; set; }
    public string? Neighborhood { get; set; }

    // Navigation properties
    public Account? Account { get; set; }
    public Contact? PrimaryContact { get; set; }
    public Opportunity? Opportunity { get; set; }
}
