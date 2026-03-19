namespace CRM.Enterprise.Application.Drafts;

public sealed record FormDraftSummaryDto(
    Guid Id,
    string EntityType,
    string Title,
    string? Subtitle,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc);

public sealed record FormDraftDetailDto(
    Guid Id,
    string EntityType,
    string Title,
    string? Subtitle,
    string PayloadJson,
    string Status,
    DateTime CreatedAtUtc,
    DateTime UpdatedAtUtc);

public sealed record FormDraftListResultDto(
    IReadOnlyList<FormDraftSummaryDto> Items,
    int Total);

public sealed record FormDraftSaveRequest(
    Guid? Id,
    string EntityType,
    string Title,
    string? Subtitle,
    string PayloadJson);
