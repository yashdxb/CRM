namespace CRM.Enterprise.Api.Contracts.Catalog;

public sealed record ItemMasterListItem(
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
