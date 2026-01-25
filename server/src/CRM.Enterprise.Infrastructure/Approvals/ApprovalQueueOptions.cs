namespace CRM.Enterprise.Infrastructure.Approvals;

public sealed class ApprovalQueueOptions
{
    public const string SectionName = "ApprovalQueue";

    public bool Enabled { get; set; } = false;
    public string QueueName { get; set; } = "crm-opportunity-approvals";
}
