using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed class OpportunityReviewOutcomeRequest
{
    public string Outcome { get; set; } = string.Empty;
    public string? Comment { get; set; }
    public DateTime? AcknowledgmentDueAtUtc { get; set; }
}

