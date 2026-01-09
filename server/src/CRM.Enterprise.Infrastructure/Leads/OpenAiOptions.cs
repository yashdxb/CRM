namespace CRM.Enterprise.Infrastructure.Leads;

public sealed class OpenAiOptions
{
    public const string SectionName = "OpenAi";

    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://api.openai.com/v1/";
    public string Model { get; set; } = "gpt-4o-mini";
    public decimal Temperature { get; set; } = 0.2m;
    public int MaxTokens { get; set; } = 200;
}
