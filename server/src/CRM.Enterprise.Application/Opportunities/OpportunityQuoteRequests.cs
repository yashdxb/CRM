namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityQuoteLineRequest(
    Guid ItemMasterId,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal DiscountPercent);

public sealed record OpportunityQuoteCreateRequest(
    string Name,
    Guid? PriceListId,
    string Currency,
    decimal TaxAmount,
    string? Notes,
    IReadOnlyList<OpportunityQuoteLineRequest> Lines);

public sealed record OpportunityQuoteUpdateRequest(
    string Name,
    string Status,
    Guid? PriceListId,
    string Currency,
    decimal TaxAmount,
    string? Notes,
    IReadOnlyList<OpportunityQuoteLineRequest> Lines);

public sealed record OpportunityQuoteSendProposalRequest(
    string? ToEmail,
    string? Message);
