using CRM.Enterprise.Domain.Entities;

namespace CRM.Enterprise.Api.Contracts.Emails;

// ============ EMAIL LOG CONTRACTS ============

public record EmailSearchResponse(
    IEnumerable<EmailListItem> Items,
    int Total,
    int Page,
    int PageSize
);

public record EmailListItem(
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

public record EmailDetailResponse(
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
    string? Subject = null,
    string? HtmlBody = null,
    string? TextBody = null,
    Guid? TemplateId = null,
    Dictionary<string, string>? TemplateVariables = null,
    string? RelatedEntityType = null,
    Guid? RelatedEntityId = null,
    bool SendImmediately = true
);

public record EmailStatsResponse(
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

// ============ TEMPLATE CONTRACTS ============

public record TemplateSearchResponse(
    IEnumerable<EmailTemplateListItem> Items,
    int Total,
    int Page,
    int PageSize
);

public record EmailTemplateListItem(
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

public record EmailTemplateDetailResponse(
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
    string? Subject = null,
    string? HtmlBody = null,
    string? TextBody = null,
    string? Category = null,
    bool IsActive = true,
    string? Variables = null
);

// ============ WEBHOOK CONTRACTS ============

public record EmailWebhookPayload(
    string MessageId,
    string Status,
    string? Details = null
);
