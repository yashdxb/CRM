namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record UpdateOpportunityTeamRequest(IReadOnlyList<OpportunityTeamMemberRequest> Members);

public sealed record OpportunityTeamMemberRequest(Guid UserId, string Role);
