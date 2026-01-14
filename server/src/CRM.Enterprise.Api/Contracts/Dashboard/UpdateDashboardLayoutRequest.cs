using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record UpdateDashboardLayoutRequest(IReadOnlyList<string> CardOrder);
