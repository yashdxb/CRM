using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Roles;

public record UpsertRoleRequest(string Name, string? Description, int? Level, IReadOnlyCollection<string> Permissions);
