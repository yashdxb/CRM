using System;

namespace CRM.Enterprise.Api.Contracts.Leads;

public record LeadAssignmentRuleDto(
    Guid Id,
    string Name,
    string Type,
    bool IsActive,
    string? Territory,
    Guid? AssignedUserId,
    string? AssignedUserName,
    Guid? LastAssignedUserId,
    string? LastAssignedUserName);
