using CRM.Enterprise.Domain.Enums;

namespace CRM.Enterprise.Application.Common;

public sealed record VisibilityContext(RoleVisibilityScope Scope, IReadOnlyCollection<Guid>? VisibleUserIds);

public interface IVisibilityResolver
{
    Task<VisibilityContext> ResolveAsync(Guid? userId, CancellationToken cancellationToken = default);
}
