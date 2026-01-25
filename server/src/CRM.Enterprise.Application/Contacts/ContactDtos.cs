namespace CRM.Enterprise.Application.Contacts;

public sealed record ContactListItemDto(
    Guid Id,
    string FullName,
    string? Email,
    string? Phone,
    string? Mobile,
    string? JobTitle,
    string? BuyingRole,
    Guid? AccountId,
    string? AccountName,
    Guid OwnerId,
    string OwnerName,
    string LifecycleStage,
    int ActivityScore,
    DateTime CreatedAtUtc);

public sealed record ContactDetailDto(
    Guid Id,
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? Mobile,
    string? JobTitle,
    string? BuyingRole,
    Guid? AccountId,
    string? AccountName,
    Guid OwnerId,
    string? OwnerName,
    string? LinkedInProfile,
    string? LifecycleStage,
    int ActivityScore,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record ContactSearchResultDto(IReadOnlyList<ContactListItemDto> Items, int Total);

public sealed record ContactOperationResult<T>(bool Success, T? Value, string? Error, bool NotFound = false)
{
    public static ContactOperationResult<T> Ok(T value) => new(true, value, null, false);
    public static ContactOperationResult<T> Fail(string error) => new(false, default, error, false);
    public static ContactOperationResult<T> NotFoundResult() => new(false, default, null, true);
}
