using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class SupportCaseComment : AuditableEntity
{
    public Guid CaseId { get; set; }
    public Guid? AuthorUserId { get; set; }
    public string Body { get; set; } = string.Empty;
    public bool IsInternal { get; set; } = true;

    public SupportCase Case { get; set; } = null!;
    public User? AuthorUser { get; set; }
}
