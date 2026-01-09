namespace CRM.Enterprise.Application.Pricing;

public sealed record PriceListListItemDto(
    Guid Id,
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    int ItemCount
);

public sealed record PriceListItemDto(
    Guid Id,
    Guid ItemMasterId,
    string? ItemName,
    string? Uom,
    decimal UnitPrice,
    int? MinQty,
    int? MaxQty,
    int? LeadTimeDays,
    bool IsActive
);

public sealed record PriceListDetailDto(
    Guid Id,
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    string? Notes,
    IReadOnlyList<PriceListItemDto> Items
);
