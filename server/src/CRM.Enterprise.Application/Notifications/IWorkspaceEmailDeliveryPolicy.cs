namespace CRM.Enterprise.Application.Notifications;

public interface IWorkspaceEmailDeliveryPolicy
{
    Task<bool> IsEnabledAsync(WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default);
    Task<bool> IsEnabledAsync(Guid tenantId, WorkspaceEmailDeliveryCategory category, CancellationToken cancellationToken = default);
    Task<bool> IsStatusNotificationsEnabledAsync(Guid tenantId, CancellationToken cancellationToken = default);
}
