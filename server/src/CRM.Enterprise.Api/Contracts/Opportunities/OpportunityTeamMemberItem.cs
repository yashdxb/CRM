namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityTeamMemberItem(
    Guid UserId,
    string UserName,
    string Role,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);
