namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record RfqLineResponse(
    Guid Id,
    int LineNumber,
    string? ProductName,
    string? Description,
    decimal Quantity,
    string? Uom,
    decimal? TargetPrice);
