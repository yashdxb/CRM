namespace CRM.Enterprise.Api.Contracts.Suppliers;

public sealed record SupplierListItem(
    Guid Id,
    string Name,
    string? Category,
    string Status,
    string? Country,
    string? ContactName,
    string? ContactEmail);
