using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class OpportunityStage : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }
    public bool IsClosedStage { get; set; }
    public string? ForecastCategory { get; set; }

    public ICollection<Opportunity> Opportunities { get; set; } = new List<Opportunity>();
}
