using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class Tenant : Entity
{
    public string Key { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string TimeZone { get; set; } = "UTC";
    public string Currency { get; set; } = "USD";
    public decimal? ApprovalAmountThreshold { get; set; }
    public string? ApprovalApproverRole { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? UpdatedAtUtc { get; set; }
}
