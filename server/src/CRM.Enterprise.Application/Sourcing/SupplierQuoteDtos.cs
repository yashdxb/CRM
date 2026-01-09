namespace CRM.Enterprise.Application.Sourcing;

public sealed record SupplierQuoteComparisonDto(
    Guid Id,
    Guid RfqId,
    string QuoteNumber,
    string Status,
    DateTime SubmittedDate,
    string? Currency,
    decimal? TotalAmount,
    string SupplierName);
