using System;
using CRM.Enterprise.Domain.Common;
using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Domain.Entities;

public class Role : AuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int? Level { get; set; }
    public Guid? ParentRoleId { get; set; }
    public int? HierarchyLevel { get; set; }
    public string? HierarchyPath { get; set; }
    public RoleVisibilityScope VisibilityScope { get; set; } = RoleVisibilityScope.Team;
    public Guid? SecurityLevelId { get; set; }
    public string? BasePermissionsJson { get; set; }
    public DateTime? BasePermissionsUpdatedAtUtc { get; set; }
    public string? DriftNotes { get; set; }
    public DateTime? DriftAcceptedAtUtc { get; set; }
    public string? DriftAcceptedBy { get; set; }

    public SecurityLevelDefinition? SecurityLevel { get; set; }

    public ICollection<UserRole> Users { get; set; } = new List<UserRole>();
    public ICollection<RolePermission> Permissions { get; set; } = new List<RolePermission>();
}
