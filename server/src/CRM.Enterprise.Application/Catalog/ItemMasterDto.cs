namespace CRM.Enterprise.Application.Catalog;

public sealed record ItemMasterDto(
    Guid Id,
    string Sku,
    string Name,
    string? Description,
    string? CategoryName,
    string? DefaultUom,
    bool IsActive
);
