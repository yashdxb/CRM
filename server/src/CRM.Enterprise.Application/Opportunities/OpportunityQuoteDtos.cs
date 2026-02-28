namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityQuoteListItemDto(
    Guid Id,
    string QuoteNumber,
    string Name,
    string Status,
    Guid? PriceListId,
    string Currency,
    decimal TotalAmount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record OpportunityQuoteLineDto(
    Guid Id,
    Guid ItemMasterId,
    string ItemName,
    string ItemSku,
    string? Description,
    decimal Quantity,
    decimal UnitPrice,
    decimal DiscountPercent,
    decimal LineTotal);

public sealed record OpportunityQuoteDetailDto(
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
    IReadOnlyList<OpportunityQuoteLineDto> Lines);
