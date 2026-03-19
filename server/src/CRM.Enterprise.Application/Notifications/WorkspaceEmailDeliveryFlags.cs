namespace CRM.Enterprise.Application.Notifications;

public static class WorkspaceEmailDeliveryFlags
{
    public const string Master = "communications.emailDelivery";
    public const string Invites = "communications.emailDelivery.invites";
    public const string Security = "communications.emailDelivery.security";
    public const string Approvals = "communications.emailDelivery.approvals";
    public const string Proposals = "communications.emailDelivery.proposals";
    public const string Marketing = "communications.emailDelivery.marketing";
    public const string Notifications = "communications.emailDelivery.notifications";
    public const string Mailbox = "communications.emailDelivery.mailbox";
    public const string StatusNotifications = "communications.emailDelivery.statusNotifications";

    public static string ForCategory(WorkspaceEmailDeliveryCategory category)
        => category switch
        {
            WorkspaceEmailDeliveryCategory.Invites => Invites,
            WorkspaceEmailDeliveryCategory.Security => Security,
            WorkspaceEmailDeliveryCategory.Approvals => Approvals,
            WorkspaceEmailDeliveryCategory.Proposals => Proposals,
            WorkspaceEmailDeliveryCategory.Marketing => Marketing,
            WorkspaceEmailDeliveryCategory.Notifications => Notifications,
            WorkspaceEmailDeliveryCategory.Mailbox => Mailbox,
            _ => Master
        };
}
