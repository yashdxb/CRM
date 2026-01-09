namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record SupplierQuoteComparisonResponse(
    Guid Id,
    Guid RfqId,
    string QuoteNumber,
    string Status,
    DateTime SubmittedDate,
    string? Currency,
    decimal? TotalAmount,
    string SupplierName);
