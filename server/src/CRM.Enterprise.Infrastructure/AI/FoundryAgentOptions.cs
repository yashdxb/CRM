namespace CRM.Enterprise.Infrastructure.AI;

public sealed class FoundryAgentOptions
{
    public const string SectionName = "FoundryAgent";

    public string Endpoint { get; set; } = string.Empty;
    public string ApiKey { get; set; } = string.Empty;
    public string ApiVersion { get; set; } = "2024-05-01-preview";
    public string AgentId { get; set; } = string.Empty;
    public int PollAttempts { get; set; } = 20;
    public int PollDelayMs { get; set; } = 750;
}
