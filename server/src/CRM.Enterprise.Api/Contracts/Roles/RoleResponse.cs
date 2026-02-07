using System;

namespace CRM.Enterprise.Api.Contracts.Roles;

public record RoleResponse(Guid Id, string Name, string? Description, bool IsSystem, int? Level, IReadOnlyList<string> Permissions);
