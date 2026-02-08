namespace CRM.Enterprise.Api.Contracts.Opportunities;

public record OpportunityStageAutomationRuleRequest(
    string Name,
    string StageName,
    string TaskSubject,
    string? TaskDescription,
    int DueInDays,
    string? Priority,
    bool IsActive);
