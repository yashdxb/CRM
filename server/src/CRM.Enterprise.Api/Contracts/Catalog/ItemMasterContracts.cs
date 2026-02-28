namespace CRM.Enterprise.Api.Contracts.Catalog;

public sealed record ItemMasterSearchResponse(
    IReadOnlyList<ItemMasterListItem> Items,
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
