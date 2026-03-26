namespace CRM.Enterprise.Infrastructure.Caching;

public sealed class RedisCacheOptions
{
    public const string SectionName = "Cache:Redis";

    public bool Enabled { get; set; } = true;
    public string? ConnectionString { get; set; }
    public string InstanceName { get; set; } = "crm-enterprise:";
    public int DashboardSummaryTtlSeconds { get; set; } = 30;
    public int ManagerPipelineHealthTtlSeconds { get; set; } = 30;
    public int AssistantInsightsTtlSeconds { get; set; } = 30;
}
