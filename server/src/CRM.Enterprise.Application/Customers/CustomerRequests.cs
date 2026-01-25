namespace CRM.Enterprise.Application.Customers;

public sealed record CustomerSearchRequest(
    string? Search,
    string? Status,
    int Page,
    int PageSize);

public sealed record CustomerUpsertRequest(
    string Name,
    string? AccountNumber,
    string? Industry,
    string? Website,
    string? Phone,
    string? LifecycleStage,
    Guid? OwnerId,
    Guid? ParentAccountId,
    string? Territory,
    string? Description);
