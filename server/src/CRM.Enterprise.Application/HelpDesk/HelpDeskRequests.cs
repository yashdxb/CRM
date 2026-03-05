namespace CRM.Enterprise.Application.HelpDesk;

public sealed record SupportCaseSearchRequest(
    string? Search,
    string? Status,
    string? Priority,
    string? Severity,
    Guid? QueueId,
    Guid? OwnerUserId,
    string? Source,
    int Page,
    int PageSize);

public sealed record SupportCaseCreateRequest(
    string Subject,
    string Description,
    string Priority,
    string Severity,
    string Category,
    string? Subcategory,
    string Source,
    Guid? AccountId,
    Guid? ContactId,
    Guid? QueueId,
    Guid? OwnerUserId,
    string? ClosureReason,
    int? CsatScore,
    string? CsatFeedback);

public sealed record SupportCaseUpdateRequest(
    string Subject,
    string Description,
    string Priority,
    string Severity,
    string Category,
    string? Subcategory,
    Guid? AccountId,
    Guid? ContactId,
    Guid? QueueId,
    Guid? OwnerUserId,
    string? ClosureReason,
    int? CsatScore,
    string? CsatFeedback);

public sealed record SupportCaseAssignRequest(Guid? QueueId, Guid? OwnerUserId);

public sealed record SupportCaseStatusRequest(string Status, string? Note);

public sealed record SupportCaseCommentCreateRequest(
    string Body,
    bool IsInternal,
    Guid AuthorUserId,
    string AuthorUserName,
    IReadOnlyCollection<Guid>? AttachmentIds);

public sealed record SupportQueueUpsertRequest(string Name, string? Description, bool IsActive, IReadOnlyCollection<Guid>? MemberUserIds);

public sealed record SupportSlaPolicyUpdateRequest(
    string Name,
    string Priority,
    string Severity,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    int EscalationMinutes,
    string? BusinessHoursJson,
    bool IsActive);

public sealed record HelpDeskEmailIntakeRequest(
    string MessageId,
    string ThreadKey,
    string Subject,
    string Body,
    string FromEmail,
    DateTime ReceivedAtUtc);
