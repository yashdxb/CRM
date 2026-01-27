using System;

namespace CRM.Enterprise.Api.Contracts.Opportunities;

public sealed record OpportunityReviewThreadItem(
    Guid ActivityId,
    string Kind,
    string Outcome,
    string Subject,
    string? Comment,
    Guid OwnerId,
    string OwnerName,
    DateTime CreatedAtUtc,
    DateTime? DueDateUtc,
    DateTime? CompletedDateUtc,
    bool RequiresAcknowledgment);

