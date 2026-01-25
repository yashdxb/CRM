namespace CRM.Enterprise.Application.Contacts;

public sealed record ContactSearchRequest(
    string? Search,
    Guid? AccountId,
    int Page,
    int PageSize);

public sealed record ContactUpsertRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Phone,
    string? Mobile,
    string? JobTitle,
    string? BuyingRole,
    Guid? AccountId,
    Guid? OwnerId,
    string? LinkedInProfile,
    string? LifecycleStage,
    int ActivityScore);
