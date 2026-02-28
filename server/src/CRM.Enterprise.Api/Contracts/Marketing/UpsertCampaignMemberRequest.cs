namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record UpsertCampaignMemberRequest(
    string EntityType,
    Guid EntityId,
    string ResponseStatus);
