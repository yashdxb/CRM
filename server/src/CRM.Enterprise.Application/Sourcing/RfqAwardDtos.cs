namespace CRM.Enterprise.Application.Sourcing;

public sealed record RfqAwardListItemDto(
    Guid Id,
    string AwardNumber,
    string Status,
    DateTime AwardDate,
    decimal AwardAmount,
    string? Currency,
    string SupplierName,
    string RfqNumber);

public sealed record RfqAwardLineDto(
    Guid Id,
    int LineNumber,
    string ItemName,
    string? Uom,
    decimal Quantity,
    decimal? TargetPrice,
    decimal? LineTotal);

public sealed record RfqAwardDetailDto(
    Guid Id,
    string AwardNumber,
    string Status,
    DateTime AwardDate,
    decimal AwardAmount,
    string? Currency,
    string? Notes,
    Guid RfqId,
    string RfqNumber,
    string RfqTitle,
    Guid SupplierId,
    string SupplierName,
    IReadOnlyList<RfqAwardLineDto> Lines);
