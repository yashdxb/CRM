namespace CRM.Enterprise.Infrastructure.AI;

public sealed class AzureSearchKnowledgeOptions
{
    public const string SectionName = "AssistantKnowledgeSearch";

    public string Endpoint { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string IndexName { get; set; } = "crm-ai-knowledge";
    public string ApiVersion { get; set; } = "2023-11-01";
    public int Top { get; set; } = 5;
    public bool ApprovedOnly { get; set; } = true;
    public int MaxContentCharsPerDoc { get; set; } = 1200;
}
