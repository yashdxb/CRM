using System;

namespace CRM.Enterprise.Api.Contracts.Roles;

public record RoleResponse(
    Guid Id,
    string Name,
    string? Description,
    bool IsSystem,
    Guid? ParentRoleId,
    int? HierarchyLevel,
    string? HierarchyPath,
    string VisibilityScope,
    Guid? SecurityLevelId,
    string? SecurityLevelName,
    IReadOnlyList<string> Permissions);
