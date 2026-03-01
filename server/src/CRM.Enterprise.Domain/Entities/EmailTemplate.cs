using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class EmailTemplate : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string HtmlBody { get; set; } = string.Empty;
    public string? TextBody { get; set; }
    public string? Category { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsSystem { get; set; }
    
    // JSON array of variable placeholders, e.g., ["{{firstName}}", "{{companyName}}"]
    public string? Variables { get; set; }
    
    // Statistics
    public int UsageCount { get; set; }
    public DateTime? LastUsedAtUtc { get; set; }
    
    public ICollection<EmailLog> EmailLogs { get; set; } = new List<EmailLog>();
}
