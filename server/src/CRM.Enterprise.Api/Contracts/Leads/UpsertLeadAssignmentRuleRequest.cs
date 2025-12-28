using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public class UpsertLeadAssignmentRuleRequest
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "Manual";
    public bool IsActive { get; set; } = true;
    public string? Territory { get; set; }
    public Guid? AssignedUserId { get; set; }
}
