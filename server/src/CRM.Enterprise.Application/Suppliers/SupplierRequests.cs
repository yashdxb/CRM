namespace CRM.Enterprise.Application.Suppliers;

public record SupplierSearchRequest(
    string? Search = null,
    string? Status = null,
    int Page = 1,
    int PageSize = 20
);

public record CreateSupplierRequest(
    string Name,
    string? Category = null,
    string? Status = null,
    string? Country = null,
    string? Website = null,
    string? ContactName = null,
    string? ContactEmail = null,
    string? ContactPhone = null,
    string? Notes = null
);

public record UpdateSupplierRequest(
    string Name,
    string? Category = null,
    string? Status = null,
    string? Country = null,
    string? Website = null,
    string? ContactName = null,
    string? ContactEmail = null,
    string? ContactPhone = null,
    string? Notes = null
);
