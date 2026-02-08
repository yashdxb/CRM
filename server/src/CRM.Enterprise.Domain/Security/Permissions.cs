using System;
using System.Collections.Generic;
using System.Linq;

namespace CRM.Enterprise.Security;

public static class Permissions
{
    public const string ClaimType = "crm:permission";

    public static class Policies
    {
        public const string DashboardView = "Permissions.Dashboard.View";
        public const string CustomersView = "Permissions.Customers.View";
        public const string CustomersManage = "Permissions.Customers.Manage";
        public const string ContactsView = "Permissions.Contacts.View";
        public const string ContactsManage = "Permissions.Contacts.Manage";
        public const string LeadsView = "Permissions.Leads.View";
        public const string LeadsManage = "Permissions.Leads.Manage";
        public const string OpportunitiesView = "Permissions.Opportunities.View";
        public const string OpportunitiesManage = "Permissions.Opportunities.Manage";
        public const string ActivitiesView = "Permissions.Activities.View";
        public const string ActivitiesManage = "Permissions.Activities.Manage";
        public const string AdministrationView = "Permissions.Administration.View";
        public const string AdministrationManage = "Permissions.Administration.Manage";
        public const string AuditView = "Permissions.Audit.View";
        public const string TenantsView = "Permissions.Tenants.View";
        public const string TenantsManage = "Permissions.Tenants.Manage";
    }

    public static class RoleNames
    {
        public const string SuperAdmin = "Super Admin";
        public const string Admin = "Admin";
        public const string SalesManager = "Sales Manager";
        public const string SalesRep = "Sales Rep";
        public const string MarketingOps = "Marketing Ops";
        public const string CustomerSuccess = "Customer Success";
        public const string Support = "Support";
    }

    public static IReadOnlyList<string> SystemRoleNames { get; } = Array.AsReadOnly(new[]
    {
        RoleNames.SuperAdmin,
        RoleNames.Admin,
        RoleNames.SalesManager,
        RoleNames.SalesRep,
        RoleNames.MarketingOps,
        RoleNames.CustomerSuccess,
        RoleNames.Support
    });

    private static readonly PermissionDefinition[] DefinitionsSource =
    {
        new(Policies.DashboardView, "Dashboard", "Access the unified pipeline snapshot, KPIs, and alerts.", "View & Analyze"),
        new(Policies.CustomersView, "Customers (View)", "View customers and account details.", "View & Analyze"),
        new(Policies.CustomersManage, "Customers (Manage)", "Create, edit, and report on customers and accounts.", "Create & Manage Records"),
        new(Policies.ContactsView, "Contacts (View)", "View contact records and linked accounts.", "View & Analyze"),
        new(Policies.ContactsManage, "Contacts (Manage)", "Manage contacts, enrichment data, and ownership.", "Create & Manage Records"),
        new(Policies.LeadsView, "Leads (View)", "View leads and conversion history.", "View & Analyze"),
        new(Policies.LeadsManage, "Leads (Manage)", "Work marketing-sourced leads and conversions.", "Create & Manage Records"),
        new(Policies.OpportunitiesView, "Opportunities (View)", "View opportunities, stages, and forecasting.", "View & Analyze"),
        new(Policies.OpportunitiesManage, "Opportunities (Manage)", "Advance deals through the selling stages.", "Create & Manage Records"),
        new(Policies.ActivitiesView, "Activities (View)", "View calls, meetings, and tasks tied to records.", "View & Analyze"),
        new(Policies.ActivitiesManage, "Activities (Manage)", "Log calls, meetings, and tasks tied to records.", "Create & Manage Records"),
        new(Policies.AdministrationView, "Administration (View)", "View users, roles, and workspace settings.", "Configure System"),
        new(Policies.AdministrationManage, "Administration (Manage)", "Invite users, edit roles, and configure workspace policies.", "Configure System"),
        new(Policies.AuditView, "Audit Log (View)", "View system audit history for records and changes.", "Audit & Compliance"),
        new(Policies.TenantsView, "Tenants (View)", "View tenant workspaces and status.", "Configure System"),
        new(Policies.TenantsManage, "Tenants (Manage)", "Provision and manage tenant workspaces.", "Configure System")
    };

    public static IReadOnlyList<PermissionDefinition> Definitions { get; } = Array.AsReadOnly(DefinitionsSource);

    public static IReadOnlyList<string> AllKeys { get; } = Array.AsReadOnly(DefinitionsSource.Select(d => d.Key).ToArray());

    public static IReadOnlyList<string> WorkspaceAdminKeys { get; } = Array.AsReadOnly(
        DefinitionsSource
            .Where(d => d.Key != Policies.TenantsManage && d.Key != Policies.TenantsView)
            .Select(d => d.Key)
            .ToArray());

    private static readonly string[] SalesRepPermissions =
    {
        Policies.DashboardView,
        Policies.CustomersView,
        Policies.CustomersManage,
        Policies.ContactsView,
        Policies.ContactsManage,
        Policies.LeadsView,
        Policies.LeadsManage,
        Policies.OpportunitiesView,
        Policies.OpportunitiesManage,
        Policies.ActivitiesView,
        Policies.ActivitiesManage
    };

    private static readonly string[] SalesManagerPermissions = SalesRepPermissions;

    private static readonly string[] AdminPermissions =
        WorkspaceAdminKeys.Concat(new[] { Policies.AuditView }).Distinct().ToArray();

    public static IReadOnlyList<RoleIntentDefinition> RoleIntents { get; } = Array.AsReadOnly(new[]
    {
        new RoleIntentDefinition(RoleNames.SalesRep, "Sales Rep", "Owns assigned accounts and opportunities.", SalesRepPermissions),
        new RoleIntentDefinition(RoleNames.SalesManager, "Sales Manager", "Manages team pipeline and forecasts.", SalesManagerPermissions),
        new RoleIntentDefinition(RoleNames.Admin, "Admin", "System administrator with workspace governance.", AdminPermissions),
        new RoleIntentDefinition(RoleNames.MarketingOps, "Marketing Ops", "Runs campaigns and lead intake.", new[]
        {
            Policies.DashboardView,
            Policies.LeadsView,
            Policies.LeadsManage,
            Policies.ActivitiesView,
            Policies.ActivitiesManage
        }),
        new RoleIntentDefinition(RoleNames.CustomerSuccess, "Customer Success", "Manages onboarding and renewals.", new[]
        {
            Policies.DashboardView,
            Policies.CustomersView,
            Policies.CustomersManage,
            Policies.ContactsView,
            Policies.ContactsManage,
            Policies.ActivitiesView,
            Policies.ActivitiesManage
        }),
        new RoleIntentDefinition(RoleNames.Support, "Support", "Handles escalations and tickets.", new[]
        {
            Policies.DashboardView,
            Policies.CustomersView,
            Policies.CustomersManage,
            Policies.ContactsView,
            Policies.ContactsManage,
            Policies.ActivitiesView,
            Policies.ActivitiesManage
        })
    });

    public static IReadOnlyList<PermissionPackPresetDefinition> PermissionPackPresets { get; } = Array.AsReadOnly(new[]
    {
        new PermissionPackPresetDefinition("H1", "H1 Base Pack", "Individual contributor baseline permissions.", 1, SalesRepPermissions),
        new PermissionPackPresetDefinition("H2", "H2 Manager Pack", "Manager baseline permissions.", 2, SalesManagerPermissions),
        new PermissionPackPresetDefinition("H3", "H3 Admin Pack", "Admin baseline permissions.", 3, AdminPermissions)
    });
}

public record PermissionDefinition(string Key, string Label, string Description, string Capability);

public record RoleIntentDefinition(string Key, string Label, string Description, IReadOnlyList<string> Permissions);

public record PermissionPackPresetDefinition(string Key, string Label, string Description, int HierarchyLevel, IReadOnlyList<string> Permissions);
