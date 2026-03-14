using CRM.Enterprise.Domain.Common;

namespace CRM.Enterprise.Domain.Entities;

public class SignatureRequest : AuditableEntity
{
    public Guid PropertyId { get; set; }
    public string DocumentName { get; set; } = string.Empty;
    public string DocumentType { get; set; } = "Other";
    public string Provider { get; set; } = "DocuSign";
    public string Status { get; set; } = "Draft";
    public string? EnvelopeId { get; set; }
    public string SignersJson { get; set; } = "[]";
    public DateTime? SentAtUtc { get; set; }
    public DateTime? CompletedAtUtc { get; set; }
    public DateTime? ExpiresAtUtc { get; set; }
    public string? CreatedByName { get; set; }

    public Property? Property { get; set; }
}
