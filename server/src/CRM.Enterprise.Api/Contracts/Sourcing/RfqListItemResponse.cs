namespace CRM.Enterprise.Api.Contracts.Sourcing;

public sealed record RfqListItemResponse(
    Guid Id,
    string RfqNumber,
    string Title,
    string Status,
    string? Type,
    DateTime IssueDate,
    DateTime? CloseDate,
    string? Currency,
    string BuyerName,
    int ResponseCount,
    int SupplierCount);
