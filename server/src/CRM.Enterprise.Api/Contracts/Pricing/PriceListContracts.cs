namespace CRM.Enterprise.Api.Contracts.Pricing;

public sealed record PriceListListItem(
    Guid Id,
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    int ItemCount
);

public sealed record PriceListItem(
    Guid ItemMasterId,
    string? Uom,
    decimal UnitPrice,
    int? MinQty,
    int? MaxQty,
    int? LeadTimeDays,
    bool IsActive
);

public sealed record PriceListDetail(
    Guid Id,
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    string? Notes,
    IReadOnlyList<PriceListItem> Items
);

public sealed record PriceListSearchResponse(
    IReadOnlyList<PriceListListItem> Items,
    int Total
);

public sealed record UpsertPriceListRequest(
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    string? Notes,
    IReadOnlyList<PriceListItem> Items
);
