namespace CRM.Enterprise.Api.Contracts.Notifications;

public record TestEmailRequest(
    string ToEmail,
    string? Subject,
    string? HtmlBody,
    string? TextBody);
