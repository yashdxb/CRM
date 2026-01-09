namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record RfqAwardLineResponse(
    Guid Id,
    int LineNumber,
    string ItemName,
    string? Uom,
    decimal Quantity,
    decimal? TargetPrice,
    decimal? LineTotal);

public sealed record RfqAwardDetailResponse(
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
    IReadOnlyList<RfqAwardLineResponse> Lines);
