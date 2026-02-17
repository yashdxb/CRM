namespace CRM.Enterprise.Api.Contracts.Auth;

public record BookDemoRequest(
    string FullName,
    string WorkEmail,
    string Company,
    string RoleTitle,
    string? Phone,
    string TeamSize,
    string PreferredDateTimeUtc,
    string PreferredDate,
    string PreferredTime,
    string Timezone,
    string UseCase,
    string? LandingPageUrl
);
