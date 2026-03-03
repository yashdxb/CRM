using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportSlaPolicy : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string Priority { get; set; } = "Medium";
    public string Severity { get; set; } = "S3";
    public int FirstResponseTargetMinutes { get; set; } = 240;
    public int ResolutionTargetMinutes { get; set; } = 1440;
    public int EscalationMinutes { get; set; } = 60;
    public string? BusinessHoursJson { get; set; }
    public bool IsActive { get; set; } = true;

    public ICollection<SupportCase> Cases { get; set; } = new List<SupportCase>();
}
