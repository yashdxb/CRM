namespace CRM.Enterprise.Application.Suppliers;

public record SupplierDto(
    Guid Id,
    string Name,
    string? Category,
    string Status,
    string? Country,
    string? Website,
    string? ContactName,
    string? ContactEmail,
    string? ContactPhone,
    string? Notes
);

public record SupplierListItemDto(
    Guid Id,
    string Name,
    string? Category,
    string Status,
    string? Country,
    string? ContactName,
    string? ContactEmail
);

public record SupplierSearchResponse(
    IReadOnlyList<SupplierListItemDto> Items,
    int Total
);
