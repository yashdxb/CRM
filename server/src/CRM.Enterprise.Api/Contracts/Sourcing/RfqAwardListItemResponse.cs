namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record RfqAwardListItemResponse(
    Guid Id,
    string AwardNumber,
    string Status,
    DateTime AwardDate,
    decimal AwardAmount,
    string? Currency,
    string SupplierName,
    string RfqNumber);
