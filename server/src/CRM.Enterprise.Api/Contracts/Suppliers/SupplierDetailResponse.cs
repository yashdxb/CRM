namespace CRM.Enterprise.Api.Contracts.Suppliers;

public sealed record SupplierDetailResponse(
    Guid Id,
    string Name,
    string? Category,
    string Status,
    string? Country,
    string? Website,
    string? ContactName,
    string? ContactEmail,
    string? ContactPhone,
    string? Notes);
