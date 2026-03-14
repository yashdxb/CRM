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

public sealed record PropertyTimelineEventDto(
    Guid Id,
    Guid PropertyId,
    string EventType,
    string Label,
    string? Description,
    string Icon,
    string Variant,
    DateTime OccurredAtUtc);

public sealed record PropertyAlertCriteriaDto(
    decimal? MinPrice,
    decimal? MaxPrice,
    IReadOnlyList<string>? PropertyTypes,
    int? MinBedrooms,
    IReadOnlyList<string>? Cities,
    IReadOnlyList<string>? Neighborhoods);

public sealed record PropertyAlertRuleDto(
    Guid Id,
    Guid PropertyId,
    string ClientName,
    string ClientEmail,
    PropertyAlertCriteriaDto Criteria,
    string Frequency,
    bool IsActive,
    int MatchCount,
    DateTime? LastNotifiedAtUtc,
    DateTime CreatedAtUtc);

public sealed record PropertyAlertNotificationDto(
    Guid Id,
    Guid PropertyId,
    Guid RuleId,
    string ClientName,
    string ClientEmail,
    int MatchedProperties,
    DateTime SentAtUtc,
    string Status,
    string? TriggeredBy);

// ── CMA (G3) ──

public sealed record ComparablePropertyDto(
    Guid Id,
    string Address,
    string? City,
    string? Neighborhood,
    string PropertyType,
    decimal ListPrice,
    decimal? SalePrice,
    decimal? SquareFeet,
    int? Bedrooms,
    int? Bathrooms,
    int? YearBuilt,
    string Status,
    DateTime? SoldDateUtc,
    int DaysOnMarket,
    decimal? PricePerSqFt,
    double DistanceMiles,
    string Source);

public sealed record CmaSummaryDto(
    decimal AvgListPrice,
    decimal AvgSalePrice,
    decimal AvgPricePerSqFt,
    int AvgDaysOnMarket,
    decimal MedianPrice,
    decimal PriceRangeLow,
    decimal PriceRangeHigh,
    decimal SuggestedPrice,
    string MarketTrend);

public sealed record CmaReportDto(
    Guid PropertyId,
    DateTime GeneratedAtUtc,
    IReadOnlyList<ComparablePropertyDto> Comparables,
    CmaSummaryDto Summary);

// ── E-Signature (G4) ──

public sealed record SignatureRequestSignerDto(
    string Name,
    string Email,
    string Role,
    string Status,
    DateTime? SignedAtUtc);

public sealed record SignatureRequestDto(
    Guid Id,
    Guid PropertyId,
    string DocumentName,
    string DocumentType,
    string Provider,
    string Status,
    string? EnvelopeId,
    IReadOnlyList<SignatureRequestSignerDto> Signers,
    DateTime? SentAtUtc,
    DateTime? CompletedAtUtc,
    DateTime? ExpiresAtUtc,
    string? CreatedByName,
    DateTime CreatedAtUtc);
