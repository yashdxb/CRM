namespace CRM.Enterprise.Infrastructure.Notifications;

public record EmailQueueMessage(
    string ToEmail,
    string Subject,
    string HtmlBody,
    string? TextBody,
    Guid? TenantId = null,
    Guid? RequestedByUserId = null);
