namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record UpsertCampaignEmailRequest(
    Guid CampaignId,
    Guid? TemplateId,
    string Subject,
    string HtmlBody,
    string? TextBody,
    string FromName,
    string? ReplyTo);

public sealed record ScheduleCampaignEmailRequest(
    DateTime ScheduledAtUtc);

public sealed record EmailPreferenceResponse(
    Guid Id,
    string Email,
    string EntityType,
    Guid EntityId,
    bool IsSubscribed,
    DateTime? UnsubscribedAtUtc,
    string? UnsubscribeReason,
    string UnsubscribeSource,
    int HardBounceCount,
    DateTime? LastBounceAtUtc);

public sealed record UpdateEmailPreferenceRequest(
    bool IsSubscribed);

public sealed record PublicUnsubscribeRequest(
    string Email,
    Guid TenantId,
    string? Reason);
