namespace CRM.Enterprise.Api.Contracts.HelpDesk;

public sealed record SupportCaseSearchResponse(
    IReadOnlyList<SupportCaseItem> Items,
    int Total);

public sealed record SupportCaseItem(
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
    string? ClosureReason,
    int? CsatScore,
    string? CsatFeedback,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record SupportCaseCommentItem(
    Guid Id,
    Guid CaseId,
    Guid? AuthorUserId,
    string AuthorUserName,
    string Body,
    bool IsInternal,
    DateTime CreatedAtUtc,
    IReadOnlyList<SupportCaseCommentAttachmentItem> Attachments);

public sealed record SupportCaseCommentAttachmentItem(
    Guid AttachmentId,
    string FileName,
    string ContentType,
    long Size,
    string DownloadUrl);

public sealed record SupportCaseEscalationItem(
    Guid Id,
    Guid CaseId,
    string Type,
    DateTime OccurredUtc,
    Guid? ActorUserId,
    string? ActorUserName,
    string? Notes);

public sealed record SupportCaseDetailResponse(
    SupportCaseItem Case,
    IReadOnlyList<SupportCaseCommentItem> Comments,
    IReadOnlyList<SupportCaseEscalationItem> Escalations);

public sealed record SupportCaseUpsertRequest(
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

public sealed record SupportCaseAssignApiRequest(Guid? QueueId, Guid? OwnerUserId);

public sealed record SupportCaseStatusApiRequest(string Status, string? Note);

public sealed record SupportCaseCommentApiRequest(string Body, bool IsInternal = true, IReadOnlyList<Guid>? AttachmentIds = null);

public sealed record SupportQueueItem(
    Guid Id,
    string Name,
    string? Description,
    bool IsActive,
    int ActiveMemberCount,
    IReadOnlyList<SupportQueueMemberItem> Members);

public sealed record SupportQueueMemberItem(
    Guid UserId,
    string UserName);

public sealed record SupportQueueUpsertApiRequest(
    string Name,
    string? Description,
    bool IsActive,
    IReadOnlyCollection<Guid>? MemberUserIds);

public sealed record SupportSlaPolicyItem(
    Guid Id,
    string Name,
    string Priority,
    string Severity,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    int EscalationMinutes,
    string? BusinessHoursJson,
    bool IsActive);

public sealed record SupportSlaPolicyUpdateApiRequest(
    string Name,
    string Priority,
    string Severity,
    int FirstResponseTargetMinutes,
    int ResolutionTargetMinutes,
    int EscalationMinutes,
    string? BusinessHoursJson,
    bool IsActive);

public sealed record HelpDeskSummaryResponse(
    int OpenCount,
    int AtRiskCount,
    int BreachedCount,
    int ResolvedTodayCount,
    decimal? AverageCsatScore,
    int RatedCaseCount,
    IReadOnlyList<HelpDeskClosureReasonCountItem> TopClosureReasons);

public sealed record HelpDeskClosureReasonCountItem(
    string Reason,
    int Count);

public sealed record HelpDeskEmailWebhookRequest(
    string MessageId,
    string ThreadKey,
    string Subject,
    string Body,
    string FromEmail,
    DateTime ReceivedAtUtc);
