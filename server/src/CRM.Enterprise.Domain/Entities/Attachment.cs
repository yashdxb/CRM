using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class Attachment : AuditableEntity
{
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public long Size { get; set; }
    public string StoragePath { get; set; } = string.Empty;
    public ActivityRelationType RelatedEntityType { get; set; }
    public Guid RelatedEntityId { get; set; }
    public Guid UploadedById { get; set; }
}
