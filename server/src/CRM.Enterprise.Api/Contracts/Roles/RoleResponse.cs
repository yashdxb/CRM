using System;

namespace CRM.Enterprise.Api.Contracts.Roles;

public record RoleResponse(Guid Id, string Name, string? Description, bool IsSystem, IReadOnlyList<string> Permissions);
