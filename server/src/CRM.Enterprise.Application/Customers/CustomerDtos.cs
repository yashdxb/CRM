namespace CRM.Enterprise.Application.Customers;

public sealed record CustomerListItemDto(
    Guid Id,
    string Name,
    string DisplayName,
    string? Email,
    string? Phone,
    string Status,
    Guid OwnerId,
    string OwnerName,
    Guid? ParentAccountId,
    string? ParentAccountName,
    DateTime CreatedAtUtc);

public sealed record CustomerSearchResultDto(IReadOnlyList<CustomerListItemDto> Items, int Total);

public sealed record CustomerOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static CustomerOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static CustomerOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static CustomerOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
