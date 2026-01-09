namespace CRM.Enterprise.Api.Contracts.Sourcing;

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
