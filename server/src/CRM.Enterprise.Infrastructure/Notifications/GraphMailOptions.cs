namespace CRM.Enterprise.Infrastructure.Notifications;

public class GraphMailOptions
{
    public const string SectionName = "GraphMail";
    public string TenantId { get; set; } = string.Empty;
    public string ClientId { get; set; } = string.Empty;
    public string ClientSecret { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;

    public bool IsValid()
        => !string.IsNullOrWhiteSpace(TenantId)
           && !string.IsNullOrWhiteSpace(ClientId)
           && !string.IsNullOrWhiteSpace(ClientSecret)
           && !string.IsNullOrWhiteSpace(SenderEmail);
}
