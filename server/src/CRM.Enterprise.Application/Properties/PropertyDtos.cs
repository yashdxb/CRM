namespace CRM.Enterprise.Application.Properties;

public sealed record PropertyListItemDto(
    Guid Id,
    string? MlsNumber,
    string Address,
    string? City,
    string? Province,
    string? PostalCode,
    string? Country,
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
    decimal? CommissionRate,
    decimal? BuyerAgentCommission,
    decimal? SellerAgentCommission,
    Guid? CoListingAgentId,
    string? CoListingAgentName,
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

// ── Sub-resource DTOs ──

public sealed record ShowingDto(
    Guid Id,
    Guid PropertyId,
    Guid? AgentId,
    string? AgentName,
    string VisitorName,
    string? VisitorEmail,
    string? VisitorPhone,
    DateTime ScheduledAtUtc,
    int? DurationMinutes,
    string? Feedback,
    int? Rating,
    string Status,
    DateTime CreatedAtUtc);

public sealed record PropertyDocumentDto(
    Guid Id,
    Guid PropertyId,
    string FileName,
    string FileUrl,
    long? FileSize,
    string? MimeType,
    string Category,
    string? UploadedBy,
    DateTime UploadedAtUtc);

public sealed record PropertyActivityDto(
    Guid Id,
    Guid PropertyId,
    string Type,
    string Subject,
    string? Description,
    DateTime? DueDate,
    DateTime? CompletedDate,
    string Status,
    string Priority,
    Guid? AssignedToId,
    string? AssignedToName,
    string? CreatedByName,
    DateTime CreatedAtUtc);

public sealed record PriceChangeDto(
    Guid Id,
    Guid PropertyId,
    decimal PreviousPrice,
    decimal NewPrice,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Reason);
