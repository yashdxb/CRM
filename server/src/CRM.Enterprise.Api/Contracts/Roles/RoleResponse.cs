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
    IReadOnlyList<string> Permissions,
    IReadOnlyList<string> InheritedPermissions,
    IReadOnlyList<string> BasePermissions,
    DateTime? BasePermissionsUpdatedAtUtc,
    string? DriftNotes,
    DateTime? DriftAcceptedAtUtc,
    string? DriftAcceptedBy);
