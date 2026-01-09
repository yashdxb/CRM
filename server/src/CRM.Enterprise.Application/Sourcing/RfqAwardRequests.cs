namespace CRM.Enterprise.Application.Sourcing;

public sealed record CreateRfqAwardRequest(
    Guid RfqId,
    Guid SupplierId,
    string? AwardNumber,
    DateTime? AwardDate,
    string? Status,
    decimal AwardAmount,
    string? Currency,
    string? Notes);
