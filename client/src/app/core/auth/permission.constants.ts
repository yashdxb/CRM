export const PERMISSION_KEYS = {
  dashboardView: 'Permissions.Dashboard.View',
  customersView: 'Permissions.Customers.View',
  customersManage: 'Permissions.Customers.Manage',
  contactsView: 'Permissions.Contacts.View',
  contactsManage: 'Permissions.Contacts.Manage',
  leadsView: 'Permissions.Leads.View',
  leadsManage: 'Permissions.Leads.Manage',
  opportunitiesView: 'Permissions.Opportunities.View',
  opportunitiesManage: 'Permissions.Opportunities.Manage',
  opportunitiesApprovalsRequest: 'Permissions.Opportunities.Approvals.Request',
  opportunitiesApprovalsApprove: 'Permissions.Opportunities.Approvals.Approve',
  opportunitiesApprovalsOverride: 'Permissions.Opportunities.Approvals.Override',
  activitiesView: 'Permissions.Activities.View',
  activitiesManage: 'Permissions.Activities.Manage',
  marketingView: 'Permissions.Marketing.View',
  marketingManage: 'Permissions.Marketing.Manage',
  administrationView: 'Permissions.Administration.View',
  administrationManage: 'Permissions.Administration.Manage',
  auditView: 'Permissions.Audit.View',
  tenantsView: 'Permissions.Tenants.View',
  tenantsManage: 'Permissions.Tenants.Manage'
} as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS];
