namespace CRM.Enterprise.Application.Catalog;

public sealed record ItemMasterDto(
    Guid Id,
    string Sku,
    string Name,
    string? Description,
    string? CategoryName,
    string? DefaultUom,
    bool IsActive,
    decimal? DefaultUnitPrice,
    string? DefaultPriceListName
);

public sealed record ItemMasterSearchRequest(
    string? Search,
    string? Category,
    bool? IsActive,
    int Page,
    int PageSize
);

public sealed record ItemMasterSearchResponse(
    IReadOnlyList<ItemMasterDto> Items,
    int Total
);

public sealed record ItemMasterUpsertRequest(
    string Sku,
    string Name,
    string? Description,
    string? CategoryName,
    string? DefaultUom,
    bool IsActive
);
