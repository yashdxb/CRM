namespace CRM.Enterprise.Infrastructure.Notifications;

public class AcsEmailOptions
{
    public const string SectionName = "AcsEmail";

    public string ConnectionString { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public string ServiceBusConnectionString { get; set; } = string.Empty;
    public string QueueName { get; set; } = "email-outbox";
    public bool UseQueue { get; set; } = true;

    public bool IsValid() =>
        !string.IsNullOrWhiteSpace(ConnectionString) &&
        !string.IsNullOrWhiteSpace(SenderEmail);
}
