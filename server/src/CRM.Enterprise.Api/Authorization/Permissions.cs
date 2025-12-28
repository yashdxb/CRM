namespace CRM.Enterprise.Api.Authorization;

public static class Permissions
{
    public static class Policies
    {
        public const string DashboardView = "Permissions.Dashboard.View";
        public const string CustomersManage = "Permissions.Customers.Manage";
        public const string ContactsManage = "Permissions.Contacts.Manage";
        public const string LeadsManage = "Permissions.Leads.Manage";
        public const string OpportunitiesManage = "Permissions.Opportunities.Manage";
        public const string ActivitiesManage = "Permissions.Activities.Manage";
    }

    public static class RoleNames
    {
        public const string Admin = "Admin";
        public const string SalesManager = "Sales Manager";
        public const string SalesRep = "Sales Rep";
        public const string MarketingOps = "Marketing Ops";
        public const string CustomerSuccess = "Customer Success";
        public const string Support = "Support";
    }

    public static class RoleSets
    {
        public static readonly string[] Dashboard =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep,
            RoleNames.MarketingOps,
            RoleNames.CustomerSuccess,
            RoleNames.Support
        };

        public static readonly string[] Customers =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep,
            RoleNames.CustomerSuccess,
            RoleNames.Support
        };

        public static readonly string[] Contacts =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep,
            RoleNames.CustomerSuccess,
            RoleNames.Support
        };

        public static readonly string[] Leads =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep,
            RoleNames.MarketingOps
        };

        public static readonly string[] Opportunities =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep
        };

        public static readonly string[] Activities =
        {
            RoleNames.Admin,
            RoleNames.SalesManager,
            RoleNames.SalesRep,
            RoleNames.MarketingOps,
            RoleNames.CustomerSuccess,
            RoleNames.Support
        };
    }
}
