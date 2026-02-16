using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record DashboardPackOptionsResponse(
    IReadOnlyList<DashboardPackOptionItem> RoleDefaults,
    IReadOnlyList<DashboardPackOptionItem> CustomPacks);
