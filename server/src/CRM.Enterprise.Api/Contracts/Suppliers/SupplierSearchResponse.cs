namespace CRM.Enterprise.Api.Contracts.Suppliers;

public sealed record SupplierSearchResponse(IEnumerable<SupplierListItem> Items, int Total);
