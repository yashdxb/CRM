namespace CRM.Enterprise.Api.Contracts.Drafts;

public sealed record FormDraftSummaryItem(
    Guid Id,
    string EntityType,
    string Title,
    string? Subtitle,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc);

public sealed record FormDraftDetailResponse(
    Guid Id,
    string EntityType,
    string Title,
    string? Subtitle,
    string PayloadJson,
    string Status,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc);

public sealed record FormDraftListResponse(
    IReadOnlyList<FormDraftSummaryItem> Items,
    int Total);

public sealed record SaveFormDraftRequest(
    Guid? Id,
    string EntityType,
    string? Title,
    string? Subtitle,
    string? PayloadJson);
