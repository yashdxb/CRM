namespace CRM.Enterprise.Infrastructure.DocuSign;

public class DocuSignOptions
{
    public const string SectionName = "DocuSign";

    public string IntegrationKey { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
    public string AccountId { get; set; } = string.Empty;
    public string ApiAccountId { get; set; } = string.Empty;
    public string RsaPrivateKey { get; set; } = string.Empty;
    public string BaseUri { get; set; } = "https://demo.docusign.net";
    public string OAuthHost { get; set; } = "account-d.docusign.com";
}
