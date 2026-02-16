using System;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UpdateUserDashboardPackRequest(
    string SourceType,
    int? RoleLevel,
    Guid? TemplateId);
