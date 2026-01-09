namespace CRM.Enterprise.Application.Pricing;

public sealed record PriceListSearchRequest(
    string? Search,
    string? Status,
    string? Currency,
    int Page,
    int PageSize
);

public sealed record PriceListSearchResponse(
    IReadOnlyList<PriceListListItemDto> Items,
    int Total
);

public sealed record PriceListItemRequest(
    Guid ItemMasterId,
    string? Uom,
    decimal UnitPrice,
    int? MinQty,
    int? MaxQty,
    int? LeadTimeDays,
    bool IsActive
);

public sealed record CreatePriceListRequest(
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    string? Notes,
    IReadOnlyList<PriceListItemRequest> Items
);

public sealed record UpdatePriceListRequest(
    string Name,
    string Currency,
    string Status,
    DateTime? ValidFrom,
    DateTime? ValidTo,
    string? Notes,
    IReadOnlyList<PriceListItemRequest> Items
);
