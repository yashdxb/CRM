using System.Collections.Generic;

namespace CRM.Enterprise.Api.Contracts.Users;

public record UserSearchResponse(IReadOnlyList<UserListItem> Items, int Total);
