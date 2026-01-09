namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record RfqDetailResponse(
    Guid Id,
    string RfqNumber,
    string Title,
    string Status,
    string? Type,
    string? Description,
    DateTime IssueDate,
    DateTime? CloseDate,
    DateTime ResponseDeadline,
    string? Currency,
    string BuyerName,
    string CreatedBy,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc,
    int ResponseCount,
    int SupplierCount,
    IReadOnlyList<RfqLineResponse> Lines);
