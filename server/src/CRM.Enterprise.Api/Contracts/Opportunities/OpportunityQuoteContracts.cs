namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityQuoteListItem(
    Guid Id,
    string QuoteNumber,
    string Name,
    string Status,
    Guid? PriceListId,
    string Currency,
    decimal TotalAmount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record OpportunityQuoteLine(
    Guid Id,
    Guid ItemMasterId,
    string ItemName,
    string ItemSku,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal DiscountPercent,
    decimal LineTotal);

public sealed record OpportunityQuoteDetail(
    Guid Id,
    Guid OpportunityId,
    string QuoteNumber,
    string Name,
    string Status,
    Guid? PriceListId,
    string Currency,
    decimal Subtotal,
    decimal DiscountAmount,
    decimal TaxAmount,
    decimal TotalAmount,
    string? Notes,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    IReadOnlyList<OpportunityQuoteLine> Lines);

public sealed record OpportunityQuoteLineRequest(
    Guid ItemMasterId,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal DiscountPercent);

public sealed record CreateOpportunityQuoteRequest(
    string Name,
    Guid? PriceListId,
    string Currency,
    decimal TaxAmount,
    string? Notes,
    IReadOnlyList<OpportunityQuoteLineRequest> Lines);

public sealed record UpdateOpportunityQuoteRequest(
    string Name,
    string Status,
    Guid? PriceListId,
    string Currency,
    decimal TaxAmount,
    string? Notes,
    IReadOnlyList<OpportunityQuoteLineRequest> Lines);
