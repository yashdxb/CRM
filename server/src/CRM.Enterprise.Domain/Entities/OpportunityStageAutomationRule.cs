using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class OpportunityStageAutomationRule : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string StageName { get; set; } = string.Empty;
    public string TaskSubject { get; set; } = string.Empty;
    public string? TaskDescription { get; set; }
    public int DueInDays { get; set; }
    public string? Priority { get; set; }
    public bool IsActive { get; set; } = true;
}
