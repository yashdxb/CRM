using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class ContactTag : AuditableEntity
{
    public Guid ContactId { get; set; }
    public string Tag { get; set; } = string.Empty;

    public Contact? Contact { get; set; }
}
