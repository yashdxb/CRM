namespace CRM.Enterprise.Api.Contracts.Properties;

public record ShowingListItem(
    Guid Id,
    Guid PropertyId,
    Guid? AgentId,
    string? AgentName,
    string VisitorName,
    string? VisitorEmail,
    string? VisitorPhone,
    DateTime ScheduledAtUtc,
    int? DurationMinutes,
    string? Feedback,
    int? Rating,
    string Status,
    DateTime CreatedAtUtc);

public record DocumentListItem(
    Guid Id,
    Guid PropertyId,
    string FileName,
    string FileUrl,
    long? FileSize,
    string? MimeType,
    string Category,
    string? UploadedBy,
    DateTime UploadedAtUtc);

public record ActivityListItem(
    Guid Id,
    Guid PropertyId,
    string Type,
    string Subject,
    string? Description,
    DateTime? DueDate,
    DateTime? CompletedDate,
    string Status,
    string Priority,
    Guid? AssignedToId,
    string? AssignedToName,
    string? CreatedByName,
    DateTime CreatedAtUtc);

public record PriceChangeListItem(
    Guid Id,
    Guid PropertyId,
    decimal PreviousPrice,
    decimal NewPrice,
    DateTime ChangedAtUtc,
    string? ChangedBy,
    string? Reason);

public record TimelineEventListItem(
    Guid Id,
    Guid PropertyId,
    string EventType,
    string Label,
    string? Description,
    string Icon,
    string Variant,
    DateTime OccurredAtUtc);

public record PropertyAlertCriteria(
    decimal? MinPrice,
    decimal? MaxPrice,
    IReadOnlyList<string>? PropertyTypes,
    int? MinBedrooms,
    IReadOnlyList<string>? Cities,
    IReadOnlyList<string>? Neighborhoods);

public record PropertyAlertRuleListItem(
    Guid Id,
    Guid PropertyId,
    string ClientName,
    string ClientEmail,
    PropertyAlertCriteria Criteria,
    string Frequency,
    bool IsActive,
    int MatchCount,
    DateTime? LastNotifiedAtUtc,
    DateTime CreatedAtUtc);

public record PropertyAlertNotificationListItem(
    Guid Id,
    Guid PropertyId,
    Guid RuleId,
    string ClientName,
    string ClientEmail,
    int MatchedProperties,
    DateTime SentAtUtc,
    string Status,
    string? TriggeredBy);

// ── Create/Update request contracts ──

public class CreateShowingRequest
{
    public Guid? AgentId { get; set; }
    public string? AgentName { get; set; }
    public string VisitorName { get; set; } = string.Empty;
    public string? VisitorEmail { get; set; }
    public string? VisitorPhone { get; set; }
    public DateTime ScheduledAtUtc { get; set; }
    public int? DurationMinutes { get; set; }
    public string? Status { get; set; }
}

public class UpdateShowingRequest
{
    public Guid? AgentId { get; set; }
    public string? AgentName { get; set; }
    public string? VisitorName { get; set; }
    public string? VisitorEmail { get; set; }
    public string? VisitorPhone { get; set; }
    public DateTime? ScheduledAtUtc { get; set; }
    public int? DurationMinutes { get; set; }
    public string? Feedback { get; set; }
    public int? Rating { get; set; }
    public string? Status { get; set; }
}

public class CreateDocumentRequest
{
    public string FileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public long? FileSize { get; set; }
    public string? MimeType { get; set; }
    public string? Category { get; set; }
}

public class CreateActivityRequest
{
    public string? Type { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public Guid? AssignedToId { get; set; }
    public string? AssignedToName { get; set; }
}

public class UpdateActivityRequest
{
    public string? Type { get; set; }
    public string? Subject { get; set; }
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public string? Status { get; set; }
    public string? Priority { get; set; }
    public Guid? AssignedToId { get; set; }
    public string? AssignedToName { get; set; }
}

public class AddPriceChangeRequest
{
    public decimal PreviousPrice { get; set; }
    public decimal NewPrice { get; set; }
    public string? ChangedBy { get; set; }
    public string? Reason { get; set; }
}

public class CreateAlertRuleRequest
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public PropertyAlertCriteria Criteria { get; set; } = new(null, null, null, null, null, null);
    public string? Frequency { get; set; }
}

public class ToggleAlertRuleRequest
{
    public bool IsActive { get; set; }
}
