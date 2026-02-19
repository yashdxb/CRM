using SecurityPermissions = CRM.Enterprise.Security.Permissions;

namespace CRM.Enterprise.Api.Authorization;

/// <summary>
/// Defines the supported assistant action types and their corresponding permission requirements.
/// </summary>
public static class AssistantActionTypes
{
    public const string ApprovalFollowUp = "approval_follow_up";
    
    /// <summary>
    /// Maps action types to their required permissions.
    /// </summary>
    public static string GetRequiredPermission(string actionType)
    {
        var normalized = (actionType ?? string.Empty).Trim().ToLowerInvariant();
        
        return normalized switch
        {
            ApprovalFollowUp => SecurityPermissions.Policies.OpportunitiesApprovalsRequest,
            _ => SecurityPermissions.Policies.ActivitiesManage
        };
    }
}
