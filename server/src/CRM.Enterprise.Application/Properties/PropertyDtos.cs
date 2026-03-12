namespace CRM.Enterprise.Application.Properties;

public sealed record PropertyListItemDto(
    Guid Id,
    string? MlsNumber,
    string Address,
    string? City,
    string? Province,
    string? PostalCode,
    decimal? ListPrice,
    decimal? SalePrice,
    string Currency,
    DateTime? ListingDateUtc,
    DateTime? SoldDateUtc,
    string Status,
    string PropertyType,
    int? Bedrooms,
    int? Bathrooms,
    decimal? SquareFeet,
    decimal? LotSizeSqFt,
    int? YearBuilt,
    int? GarageSpaces,
    string? Description,
    string? Features,
    string? PhotoUrls,
    string? VirtualTourUrl,
    Guid OwnerId,
    string OwnerName,
    Guid? AccountId,
    string? AccountName,
    Guid? PrimaryContactId,
    string? PrimaryContactName,
    Guid? OpportunityId,
    string? Neighborhood,
    DateTime CreatedAtUtc);

public sealed record PropertySearchResultDto(IReadOnlyList<PropertyListItemDto> Items, int Total);

public sealed record PropertyOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static PropertyOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static PropertyOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static PropertyOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
