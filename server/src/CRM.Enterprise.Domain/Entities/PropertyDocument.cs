using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class PropertyDocument : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FileUrl { get; set; } = string.Empty;
    public long? FileSize { get; set; }
    public string? MimeType { get; set; }
    public DocumentCategory Category { get; set; } = DocumentCategory.Other;
    public string? UploadedBy { get; set; }
    public DateTime UploadedAtUtc { get; set; } = DateTime.UtcNow;

    public Property? Property { get; set; }
}
