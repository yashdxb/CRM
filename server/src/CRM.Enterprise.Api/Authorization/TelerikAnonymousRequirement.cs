using Microsoft.AspNetCore.Authorization;

namespace CRM.Enterprise.Api.Authorization;

/// <summary>
/// Custom authorization handler that allows anonymous access to Telerik discovery endpoints
/// (formats, version) while requiring authentication for report data endpoints.
/// </summary>
public class TelerikAnonymousHandler : IAuthorizationHandler
{
    public Task HandleAsync(AuthorizationHandlerContext context)
    {
        if (context.Resource is HttpContext httpContext)
        {
            var path = httpContext.Request.Path.Value ?? "";
            
            // Allow anonymous access to Telerik discovery endpoints
            if (path.StartsWith("/api/telerik-reports/formats", StringComparison.OrdinalIgnoreCase) ||
                path.StartsWith("/api/telerik-reports/version", StringComparison.OrdinalIgnoreCase))
            {
                // Mark all pending requirements as succeeded for these paths
                foreach (var requirement in context.PendingRequirements.ToList())
                {
                    context.Succeed(requirement);
                }
            }
        }
        
        return Task.CompletedTask;
    }
}
