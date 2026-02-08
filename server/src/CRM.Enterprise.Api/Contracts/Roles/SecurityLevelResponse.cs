namespace CRM.Enterprise.Api.Contracts.Roles;

public record SecurityLevelResponse(
    Guid Id,
    string Name,
    string? Description,
    int Rank,
    bool IsDefault);
