namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityStageAutomationRuleResponse(
    Guid Id,
    string Name,
    string StageName,
    string TaskSubject,
    string? TaskDescription,
    int DueInDays,
    string? Priority,
    bool IsActive,
    DateTime? UpdatedAtUtc);
