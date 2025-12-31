using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class ImportJob : AuditableEntity
{
    public string EntityType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string Status { get; set; } = "Queued";
    public int TotalRows { get; set; }
    public int Imported { get; set; }
    public int Skipped { get; set; }
    public string? ErrorsJson { get; set; }
    public string? ErrorMessage { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public Guid? RequestedById { get; set; }
}
