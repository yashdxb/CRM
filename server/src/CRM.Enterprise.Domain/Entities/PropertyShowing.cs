using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyShowing : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public Guid? AgentId { get; set; }
    public string? AgentName { get; set; }
    public string VisitorName { get; set; } = string.Empty;
    public string? VisitorEmail { get; set; }
    public string? VisitorPhone { get; set; }
    public DateTime ScheduledAtUtc { get; set; }
    public int? DurationMinutes { get; set; }
    public string? Feedback { get; set; }
    public int? Rating { get; set; }
    public ShowingStatus Status { get; set; } = ShowingStatus.Scheduled;

    public Property? Property { get; set; }
}
