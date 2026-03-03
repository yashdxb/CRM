namespace CRM.Enterprise.Application.HelpDesk;

public sealed record SupportCaseListItemDto(
    Guid Id,
    string CaseNumber,
    string Subject,
    string Description,
    string Status,
    string Priority,
    string Severity,
    string Category,
    string? Subcategory,
    string Source,
    Guid? AccountId,
    string? AccountName,
    Guid? ContactId,
    string? ContactName,
    Guid? QueueId,
    string? QueueName,
    Guid? OwnerUserId,
    string? OwnerUserName,
    DateTime FirstResponseDueUtc,
    DateTime ResolutionDueUtc,
    DateTime? FirstRespondedUtc,
    DateTime? ResolvedUtc,
    DateTime? ClosedUtc,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record SupportCaseSearchResultDto(
    IReadOnlyList<SupportCaseListItemDto> Items,
    int Total);

public sealed record SupportCaseCommentDto(
    Guid Id,
    Guid CaseId,
    Guid? AuthorUserId,
    string AuthorUserName,
    string Body,
    bool IsInternal,
    DateTime CreatedAtUtc);

public sealed record SupportCaseEscalationEventDto(
    Guid Id,
    Guid CaseId,
    string Type,
    DateTime OccurredUtc,
    Guid? ActorUserId,
    string? ActorUserName,
    string? Notes);

public sealed record SupportCaseDetailDto(
    SupportCaseListItemDto Case,
    IReadOnlyList<SupportCaseCommentDto> Comments,
    IReadOnlyList<SupportCaseEscalationEventDto> Escalations);

public sealed record SupportQueueDto(
    Guid Id,
    string Name,
    string? Description,
    bool IsActive,
    int ActiveMemberCount);

public sealed record SupportSlaPolicyDto(
    Guid Id,
    string Name,
    string Priority,
    string Severity,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    int EscalationMinutes,
    string? BusinessHoursJson,
    bool IsActive);

public sealed record HelpDeskReportSummaryDto(
    int OpenCount,
    int AtRiskCount,
    int BreachedCount,
    int ResolvedTodayCount);

public sealed record HelpDeskOperationResult(
    bool Success,
    bool NotFound = false,
    string? Error = null);

public sealed record HelpDeskValueResult<T>(
    bool Success,
    T? Value,
    bool NotFound = false,
    string? Error = null);
