using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class CustomFieldDefinition : AuditableEntity
{
    public string EntityName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string SchemaName { get; set; } = string.Empty;
    public FieldDataType DataType { get; set; }
    public bool IsRequired { get; set; }
    public bool IsActive { get; set; } = true;
    public int Order { get; set; }
}
