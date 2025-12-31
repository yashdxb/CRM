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
        new(Policies.DashboardView, "Dashboard", "Access the unified pipeline snapshot, KPIs, and alerts."),
        new(Policies.CustomersView, "Customers (View)", "View customers and account details."),
        new(Policies.CustomersManage, "Customers (Manage)", "Create, edit, and report on customers and accounts."),
        new(Policies.ContactsView, "Contacts (View)", "View contact records and linked accounts."),
        new(Policies.ContactsManage, "Contacts (Manage)", "Manage contacts, enrichment data, and ownership."),
        new(Policies.LeadsView, "Leads (View)", "View leads and conversion history."),
        new(Policies.LeadsManage, "Leads (Manage)", "Work marketing-sourced leads and conversions."),
        new(Policies.OpportunitiesView, "Opportunities (View)", "View opportunities, stages, and forecasting."),
        new(Policies.OpportunitiesManage, "Opportunities (Manage)", "Advance deals through the selling stages."),
        new(Policies.ActivitiesView, "Activities (View)", "View calls, meetings, and tasks tied to records."),
        new(Policies.ActivitiesManage, "Activities (Manage)", "Log calls, meetings, and tasks tied to records."),
        new(Policies.AdministrationView, "Administration (View)", "View users, roles, and workspace settings."),
        new(Policies.AdministrationManage, "Administration (Manage)", "Invite users, edit roles, and configure workspace policies."),
        new(Policies.TenantsView, "Tenants (View)", "View tenant workspaces and status."),
        new(Policies.TenantsManage, "Tenants (Manage)", "Provision and manage tenant workspaces.")
    };

    public static IReadOnlyList<PermissionDefinition> Definitions { get; } = Array.AsReadOnly(DefinitionsSource);

    public static IReadOnlyList<string> AllKeys { get; } = Array.AsReadOnly(DefinitionsSource.Select(d => d.Key).ToArray());

    public static IReadOnlyList<string> WorkspaceAdminKeys { get; } = Array.AsReadOnly(
        DefinitionsSource
            .Where(d => d.Key != Policies.TenantsManage && d.Key != Policies.TenantsView)
            .Select(d => d.Key)
            .ToArray());
}

public record PermissionDefinition(string Key, string Label, string Description);
