namespace CRM.Enterprise.Api.Contracts.Customers;

public sealed record DuplicateCheckRequest(
    string? Name = null,
    string? AccountNumber = null,
    string? Website = null,
    string? Phone = null,
    Guid? ExcludeId = null);

public sealed record DuplicateCheckResponse(
    bool IsDuplicate,
    Guid? MatchId = null,
    string? MatchName = null);

// Multi-match response (#11)
public sealed record DuplicateMatchItem(Guid Id, string Name, string? AccountNumber, string? Website, string? Phone, int MatchScore);

// Merge request/response (#11)
public sealed record MergeAccountRequest(Guid DuplicateId);

public sealed record MergeAccountResponse(
    bool Success,
    Guid SurvivorId,
    int ContactsMoved,
    int OpportunitiesMoved,
    int LeadsMoved,
    int CasesMoved,
    string? Error = null);

// Hierarchy (#13)
public sealed record AccountHierarchyNode(
    Guid Id,
    string Name,
    string? Industry,
    string? LifecycleStage,
    Guid OwnerId,
    string OwnerName,
    int Depth,
    IEnumerable<AccountHierarchyNode> Children);

// Timeline (#15)
public sealed record AccountTimelineEntry(
    Guid Id,
    string Type,
    string? Subject,
    string? Description,
    string? Outcome,
    DateTime OccurredAt,
    string? OwnerName,
    string? FromEmail,
    string? Direction);
