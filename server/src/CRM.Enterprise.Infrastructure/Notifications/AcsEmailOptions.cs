namespace CRM.Enterprise.Infrastructure.Notifications;

public class AcsEmailOptions
{
    public const string SectionName = "AcsEmail";

    public string ConnectionString { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public string ServiceBusConnectionString { get; set; } = string.Empty;
    public string QueueName { get; set; } = "email-outbox";
    public bool UseQueue { get; set; } = true;

    /// <summary>
    /// Global kill-switch for all outbound email. Defaults to false so no email
    /// is ever sent from local dev or Azure unless explicitly opted-in via config.
    /// Set AcsEmail:Enabled=true in appsettings to allow sending.
    /// </summary>
    public bool Enabled { get; set; } = false;

    public bool IsValid() =>
        !string.IsNullOrWhiteSpace(ConnectionString) &&
        !string.IsNullOrWhiteSpace(SenderEmail);
}
