export const PERMISSION_KEYS = {
  dashboard: 'Permissions.Dashboard.View',
  customers: 'Permissions.Customers.Manage',
  contacts: 'Permissions.Contacts.Manage',
  leads: 'Permissions.Leads.Manage',
  opportunities: 'Permissions.Opportunities.Manage',
  activities: 'Permissions.Activities.Manage',
  administration: 'Permissions.Administration.Manage',
  tenants: 'Permissions.Tenants.Manage'
} as const;

export type PermissionKey = (typeof PERMISSION_KEYS)[keyof typeof PERMISSION_KEYS];
