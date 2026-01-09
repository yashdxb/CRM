namespace CRM.Enterprise.Application.Sourcing;

public sealed record UpsertRfqLineRequest(
    string? ProductName,
    string? Description,
    decimal Quantity,
    string? Uom,
    decimal? TargetPrice);

public sealed record UpsertRfqRequest(
    string? RfqNumber,
    string Title,
    string? Description,
    string? Type,
    string? Status,
    DateTime? IssueDate,
    DateTime? CloseDate,
    DateTime? ResponseDeadline,
    string? Currency,
    IReadOnlyList<UpsertRfqLineRequest> Lines);
