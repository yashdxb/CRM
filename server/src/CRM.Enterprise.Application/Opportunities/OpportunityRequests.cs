namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunitySearchRequest(
    string? Search,
    string? Stage,
    Guid? AccountId,
    int Page,
    int PageSize);

public sealed record OpportunityUpsertRequest(
    string Name,
    Guid? AccountId,
    Guid? PrimaryContactId,
    Guid? StageId,
    string? StageName,
    Guid? OwnerId,
    decimal Amount,
    string Currency,
    decimal Probability,
    DateTime? ExpectedCloseDate,
    string? Summary,
    bool IsClosed,
    bool IsWon,
    string? WinLossReason);
