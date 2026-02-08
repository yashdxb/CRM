namespace CRM.Enterprise.Application.Dashboard;

public record DashboardTemplateState(
    Guid Id,
    string Name,
    string? Description,
    bool IsDefault,
    DashboardLayoutState Layout);
