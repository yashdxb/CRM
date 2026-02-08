using System.Text.Json.Serialization;

namespace CRM.Enterprise.Api.Contracts.Notifications;

public record NotificationChannelPreferences(
    [property: JsonPropertyName("success")] bool Success,
    [property: JsonPropertyName("error")] bool Error,
    [property: JsonPropertyName("warning")] bool Warning,
    [property: JsonPropertyName("info")] bool Info);

public record EmailAlertPreferences(
    [property: JsonPropertyName("leadSla")] bool LeadSla,
    [property: JsonPropertyName("idleDeal")] bool IdleDeal,
    [property: JsonPropertyName("coachingEscalation")] bool CoachingEscalation,
    [property: JsonPropertyName("idleDealDays")] int IdleDealDays,
    [property: JsonPropertyName("idleDealCooldownDays")] int IdleDealCooldownDays,
    [property: JsonPropertyName("coachingEscalationCooldownDays")] int CoachingEscalationCooldownDays);

public record NotificationPreferencesResponse(
    [property: JsonPropertyName("inApp")] NotificationChannelPreferences InApp,
    [property: JsonPropertyName("email")] NotificationChannelPreferences Email,
    [property: JsonPropertyName("emailAlerts")] EmailAlertPreferences EmailAlerts,
    [property: JsonPropertyName("alertsEnabled")] bool AlertsEnabled);

public record UpdateNotificationPreferencesRequest(
    [property: JsonPropertyName("inApp")] NotificationChannelPreferences InApp,
    [property: JsonPropertyName("email")] NotificationChannelPreferences Email,
    [property: JsonPropertyName("emailAlerts")] EmailAlertPreferences EmailAlerts,
    [property: JsonPropertyName("alertsEnabled")] bool AlertsEnabled);
