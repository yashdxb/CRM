using System;

namespace CRM.Enterprise.Api.Contracts.Users;

public record DashboardPackOptionItem(
    string Key,
    string Name,
    string Type,
    int? RoleLevel,
    Guid? TemplateId);
