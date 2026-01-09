namespace CRM.Enterprise.Application.Sourcing;

public sealed record RfqListItemDto(
    Guid Id,
    string RfqNumber,
    string Title,
    string Status,
    string? Type,
    DateTime IssueDate,
    DateTime? CloseDate,
    string? Currency,
    string BuyerName,
    int ResponseCount,
    int SupplierCount);

public sealed record RfqLineDto(
    Guid Id,
    int LineNumber,
    string? ProductName,
    string? Description,
    decimal Quantity,
    string? Uom,
    decimal? TargetPrice);

public sealed record RfqDetailDto(
    Guid Id,
    string RfqNumber,
    string Title,
    string Status,
    string? Type,
    string? Description,
    DateTime IssueDate,
    DateTime? CloseDate,
    DateTime ResponseDeadline,
    string? Currency,
    string BuyerName,
    string CreatedBy,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    int ResponseCount,
    int SupplierCount,
    IReadOnlyList<RfqLineDto> Lines);
