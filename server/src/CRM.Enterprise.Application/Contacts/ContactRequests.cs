namespace CRM.Enterprise.Application.Contacts;

public sealed record ContactSearchRequest(
    string? Search,
    Guid? AccountId,
    string? Tag,
    int Page,
    int PageSize,
    Guid? CurrentUserId = null);

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
    int ActivityScore,
    string? Street = null,
    string? City = null,
    string? State = null,
    string? PostalCode = null,
    string? Country = null,
    IReadOnlyList<string>? Tags = null,
    Guid? ReportsToId = null);

// C15: Duplicate detection
public sealed record DuplicateCheckRequest(string? FirstName, string? LastName, string? Email, string? Phone, Guid? ExcludeContactId);

// C16: Merge
public sealed record ContactMergeRequest(Guid MasterContactId, IReadOnlyList<Guid> SecondaryContactIds);
