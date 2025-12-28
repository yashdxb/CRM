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
        public const string CustomersManage = "Permissions.Customers.Manage";
        public const string ContactsManage = "Permissions.Contacts.Manage";
        public const string LeadsManage = "Permissions.Leads.Manage";
        public const string OpportunitiesManage = "Permissions.Opportunities.Manage";
        public const string ActivitiesManage = "Permissions.Activities.Manage";
        public const string AdministrationManage = "Permissions.Administration.Manage";
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
        new(Policies.CustomersManage, "Customers", "Create, edit, and report on customers and accounts."),
        new(Policies.ContactsManage, "Contacts", "Manage contacts, enrichment data, and ownership."),
        new(Policies.LeadsManage, "Leads", "Work marketing-sourced leads and conversions."),
        new(Policies.OpportunitiesManage, "Opportunities", "Advance deals through the selling stages."),
        new(Policies.ActivitiesManage, "Activities", "Log calls, meetings, and tasks tied to records."),
        new(Policies.AdministrationManage, "Administration", "Invite users, edit roles, and configure workspace policies."),
        new(Policies.TenantsManage, "Tenants", "Provision and manage tenant workspaces.")
    };

    public static IReadOnlyList<PermissionDefinition> Definitions { get; } = Array.AsReadOnly(DefinitionsSource);

    public static IReadOnlyList<string> AllKeys { get; } = Array.AsReadOnly(DefinitionsSource.Select(d => d.Key).ToArray());

    public static IReadOnlyList<string> WorkspaceAdminKeys { get; } = Array.AsReadOnly(
        DefinitionsSource
            .Where(d => d.Key != Policies.TenantsManage)
            .Select(d => d.Key)
            .ToArray());
}

public record PermissionDefinition(string Key, string Label, string Description);
