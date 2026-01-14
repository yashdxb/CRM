using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Dashboard;

public record DashboardLayoutResponse(IReadOnlyList<string> CardOrder);
