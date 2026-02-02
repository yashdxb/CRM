namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class AzureOpenAiOptions
{
    public const string SectionName = "AzureOpenAi";

    public string Endpoint { get; set; } = string.Empty;
    public string Deployment { get; set; } = string.Empty;
    public string ApiVersion { get; set; } = "2024-05-01-preview";
    public string ApiKey { get; set; } = string.Empty;
    public decimal Temperature { get; set; } = 0.2m;
    public int MaxTokens { get; set; } = 200;
}
