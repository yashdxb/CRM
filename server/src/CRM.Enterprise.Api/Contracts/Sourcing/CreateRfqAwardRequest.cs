namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record CreateRfqAwardRequest(
    Guid RfqId,
    Guid SupplierId,
    string? AwardNumber,
    DateTime? AwardDate,
    string? Status,
    decimal AwardAmount,
    string? Currency,
    string? Notes);
