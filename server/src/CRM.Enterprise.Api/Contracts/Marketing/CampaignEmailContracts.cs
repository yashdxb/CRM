namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record CampaignEmailListItem(
    Guid Id,
    Guid CampaignId,
    string CampaignName,
    string Subject,
    string Status,
    string FromName,
    DateTime? ScheduledAtUtc,
    DateTime? SentAtUtc,
    int RecipientCount,
    int SentCount,
    int DeliveredCount,
    int OpenCount,
    int ClickCount,
    int BounceCount,
    int UnsubscribeCount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignEmailSearchResponse(IEnumerable<CampaignEmailListItem> Items, int Total);

public sealed record CampaignEmailDetailResponse(
    Guid Id,
    Guid CampaignId,
    string CampaignName,
    Guid? TemplateId,
    string Subject,
    string HtmlBody,
    string? TextBody,
    string FromName,
    string? ReplyTo,
    string Status,
    DateTime? ScheduledAtUtc,
    DateTime? SentAtUtc,
    int RecipientCount,
    int SentCount,
    int DeliveredCount,
    int OpenCount,
    int ClickCount,
    int BounceCount,
    int UnsubscribeCount,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

public sealed record CampaignEmailRecipientItem(
    Guid Id,
    string Email,
    string? Name,
    string Status,
    string? SkipReason,
    DateTime? SentAtUtc,
    DateTime? DeliveredAtUtc,
    DateTime? OpenedAtUtc,
    DateTime? ClickedAtUtc);

public sealed record CampaignEmailRecipientSearchResponse(IEnumerable<CampaignEmailRecipientItem> Items, int Total);
