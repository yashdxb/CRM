using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class CustomFieldValue : AuditableEntity
{
    public Guid CustomFieldDefinitionId { get; set; }
    public Guid EntityId { get; set; }
    public string EntityName { get; set; } = string.Empty;
    public string? TextValue { get; set; }
    public decimal? NumberValue { get; set; }
    public decimal? CurrencyValue { get; set; }
    public DateTime? DateValue { get; set; }
    public bool? BooleanValue { get; set; }

    public CustomFieldDefinition? Definition { get; set; }
}
