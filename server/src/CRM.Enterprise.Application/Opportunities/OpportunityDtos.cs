namespace CRM.Enterprise.Application.Opportunities;

public sealed record OpportunityListItemDto(
    Guid Id,
    string Name,
    Guid AccountId,
    string AccountName,
    string Stage,
    decimal Amount,
    decimal Probability,
    string Currency,
    DateTime? ExpectedCloseDate,
    Guid OwnerId,
    string OwnerName,
    string Status,
    string? WinLossReason,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record OpportunitySearchResultDto(IReadOnlyList<OpportunityListItemDto> Items, int Total);

public sealed record OpportunityStageHistoryDto(
    Guid Id,
    string Stage,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Notes);

public sealed record OpportunityAuditEventDto(
    Guid Id,
    string EntityType,
    Guid EntityId,
    string Action,
    string? Field,
    string? OldValue,
    string? NewValue,
    Guid? ChangedByUserId,
    string? ChangedByName,
    DateTime CreatedAtUtc);

public sealed record OpportunityOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static OpportunityOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static OpportunityOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static OpportunityOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
