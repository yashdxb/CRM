using System;
using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Roles;

public record UpsertRoleRequest(
    string Name,
    string? Description,
    Guid? ParentRoleId,
    string? VisibilityScope,
    Guid? SecurityLevelId,
    IReadOnlyCollection<string> Permissions);
