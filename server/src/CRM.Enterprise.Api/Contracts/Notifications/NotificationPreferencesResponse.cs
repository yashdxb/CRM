using System.Text.Json.Serialization;

namespace CRM.Enterprise.Api.Contracts.Notifications;

public record NotificationChannelPreferences(
    [property: JsonPropertyName("success")] bool Success,
    [property: JsonPropertyName("error")] bool Error,
    [property: JsonPropertyName("warning")] bool Warning,
    [property: JsonPropertyName("info")] bool Info);

public record NotificationPreferencesResponse(
    [property: JsonPropertyName("inApp")] NotificationChannelPreferences InApp,
    [property: JsonPropertyName("email")] NotificationChannelPreferences Email);

public record UpdateNotificationPreferencesRequest(
    [property: JsonPropertyName("inApp")] NotificationChannelPreferences InApp,
    [property: JsonPropertyName("email")] NotificationChannelPreferences Email);
