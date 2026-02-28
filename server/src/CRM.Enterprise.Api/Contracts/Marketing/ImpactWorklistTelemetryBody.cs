namespace CRM.Enterprise.Api.Contracts.Marketing;

public sealed record ImpactWorklistTelemetryBody(
    Guid CampaignId,
    string CampaignName,
    string Model,
    string Direction);
