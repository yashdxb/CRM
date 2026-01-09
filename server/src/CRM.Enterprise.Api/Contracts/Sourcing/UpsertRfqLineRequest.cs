namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record UpsertRfqLineRequest(
    string? ProductName,
    string? Description,
    decimal Quantity,
    string? Uom,
    decimal? TargetPrice);
