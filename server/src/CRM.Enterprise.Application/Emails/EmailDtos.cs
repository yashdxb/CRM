using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Application.Emails;

// ============ EMAIL LOG DTOs ============

public record EmailSearchRequest(
    int Page = 1,
    int PageSize = 25,
    string? Search = null,
    EmailStatus? Status = null,
    EmailRelationType? RelatedEntityType = null,
    Guid? RelatedEntityId = null,
    Guid? SenderId = null,
    DateTime? FromDate = null,
    DateTime? ToDate = null
);

public record EmailSearchResult(
    IReadOnlyList<EmailListItemDto> Items,
    int Total,
    int Page,
    int PageSize
);

public record EmailListItemDto(
    Guid Id,
    string ToEmail,
    string? ToName,
    string Subject,
    string Status,
    DateTime CreatedAtUtc,
    DateTime? SentAtUtc,
    DateTime? DeliveredAtUtc,
    DateTime? OpenedAtUtc,
    string? RelatedEntityType,
    Guid? RelatedEntityId,
    Guid SenderId,
    string? SenderName
);

public record EmailDto(
    Guid Id,
    string ToEmail,
    string? ToName,
    string? CcEmails,
    string? BccEmails,
    string Subject,
    string HtmlBody,
    string? TextBody,
    string Status,
    string? MessageId,
    string? ErrorMessage,
    int RetryCount,
    DateTime CreatedAtUtc,
    DateTime? SentAtUtc,
    DateTime? DeliveredAtUtc,
    DateTime? OpenedAtUtc,
    DateTime? ClickedAtUtc,
    DateTime? BouncedAtUtc,
    string? BounceReason,
    string? RelatedEntityType,
    Guid? RelatedEntityId,
    Guid? TemplateId,
    string? TemplateName,
    Guid SenderId,
    string? SenderName
);

public record SendEmailRequest(
    string ToEmail,
    string? ToName = null,
    string? CcEmails = null,
    string? BccEmails = null,
    string Subject = "",
    string HtmlBody = "",
    string? TextBody = null,
    Guid? TemplateId = null,
    Dictionary<string, string>? TemplateVariables = null,
    EmailRelationType? RelatedEntityType = null,
    Guid? RelatedEntityId = null,
    bool SendImmediately = true,
    string? TrackingBaseUrl = null,
    bool EnableTracking = true
);

public record EmailStatsDto(
    int TotalSent,
    int TotalDelivered,
    int TotalOpened,
    int TotalClicked,
    int TotalBounced,
    int TotalFailed,
    int PendingCount,
    double OpenRate,
    double ClickRate,
    double BounceRate
);

// ============ TEMPLATE DTOs ============

public record TemplateSearchRequest(
    int Page = 1,
    int PageSize = 25,
    string? Search = null,
    string? Category = null,
    bool? IsActive = null
);

public record TemplateSearchResult(
    IReadOnlyList<EmailTemplateListItemDto> Items,
    int Total,
    int Page,
    int PageSize
);

public record EmailTemplateListItemDto(
    Guid Id,
    string Name,
    string? Category,
    string Subject,
    bool IsActive,
    bool IsSystem,
    int UsageCount,
    DateTime? LastUsedAtUtc,
    DateTime CreatedAtUtc
);

public record EmailTemplateDto(
    Guid Id,
    string Name,
    string? Description,
    string Subject,
    string HtmlBody,
    string? TextBody,
    string? Category,
    bool IsActive,
    bool IsSystem,
    string? Variables,
    int UsageCount,
    DateTime? LastUsedAtUtc,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc
);

public record UpsertTemplateRequest(
    string Name,
    string? Description = null,
    string Subject = "",
    string HtmlBody = "",
    string? TextBody = null,
    string? Category = null,
    bool IsActive = true,
    string? Variables = null
);
