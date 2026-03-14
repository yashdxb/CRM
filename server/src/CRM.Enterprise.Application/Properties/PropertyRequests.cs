namespace CRM.Enterprise.Application.Properties;

public sealed record PropertySearchRequest(
    string? Search,
    string? Status,
    string? PropertyType,
    string? City,
    string? SortBy,
    int Page,
    int PageSize);

public sealed record PropertyUpsertRequest(
    string? MlsNumber,
    string Address,
    string? City,
    string? Province,
    string? PostalCode,
    string? Country,
    decimal? ListPrice,
    decimal? SalePrice,
    string? Currency,
    DateTime? ListingDateUtc,
    DateTime? SoldDateUtc,
    string? Status,
    string? PropertyType,
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
    Guid? OwnerId,
    Guid? AccountId,
    Guid? PrimaryContactId,
    Guid? OpportunityId,
    string? Neighborhood);

// ── Sub-resource Requests ──

public sealed record CreateShowingRequest(
    Guid? AgentId,
    string? AgentName,
    string VisitorName,
    string? VisitorEmail,
    string? VisitorPhone,
    DateTime ScheduledAtUtc,
    int? DurationMinutes,
    string? Status);

public sealed record UpdateShowingRequest(
    Guid? AgentId,
    string? AgentName,
    string? VisitorName,
    string? VisitorEmail,
    string? VisitorPhone,
    DateTime? ScheduledAtUtc,
    int? DurationMinutes,
    string? Feedback,
    int? Rating,
    string? Status);

public sealed record CreateDocumentRequest(
    string FileName,
    string FileUrl,
    long? FileSize,
    string? MimeType,
    string? Category);

public sealed record CreatePropertyActivityRequest(
    string? Type,
    string Subject,
    string? Description,
    DateTime? DueDate,
    string? Status,
    string? Priority,
    Guid? AssignedToId,
    string? AssignedToName);

public sealed record UpdatePropertyActivityRequest(
    string? Type,
    string? Subject,
    string? Description,
    DateTime? DueDate,
    DateTime? CompletedDate,
    string? Status,
    string? Priority,
    Guid? AssignedToId,
    string? AssignedToName);

public sealed record AddPriceChangeRequest(
    decimal PreviousPrice,
    decimal NewPrice,
    string? ChangedBy,
    string? Reason);
