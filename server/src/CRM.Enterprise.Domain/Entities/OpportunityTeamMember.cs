using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public sealed class OpportunityTeamMember : AuditableEntity
{
    public Guid OpportunityId { get; set; }
    public Opportunity? Opportunity { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Role { get; set; } = string.Empty;
}
