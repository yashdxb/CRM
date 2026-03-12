import { PERMISSION_KEYS } from '../../core/auth/permission.constants';
import { NavLink } from './navigation.model';

export const NAV_LINKS: NavLink[] = [
  { label: 'Dashboard', icon: 'pi-chart-bar', path: '/app/dashboard', permission: PERMISSION_KEYS.dashboardView },
  {
    label: 'Reports',
    icon: 'pi-chart-pie',
    path: '/app/reports',
    permission: PERMISSION_KEYS.reportsView,
    children: [
      { label: 'Report Library', icon: 'pi-eye', path: '/app/reports', permission: PERMISSION_KEYS.reportsView },
      { label: 'Report Workspace', icon: 'pi-palette', path: '/app/report-designer', permission: PERMISSION_KEYS.administrationManage }
    ]
  },
  {
    label: 'Decision Inbox',
    icon: 'pi-inbox',
    path: '/app/decisions',
    permission: PERMISSION_KEYS.opportunitiesView,
    children: [
      { label: 'Pending Action', icon: 'pi-inbox', path: '/app/decisions/pending-action', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Policies & SLA', icon: 'pi-shield', path: '/app/decisions/policies', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Decision History', icon: 'pi-history', path: '/app/decisions/audit', permission: PERMISSION_KEYS.opportunitiesView }
    ]
  },
  { 
    label: 'Customers', 
    icon: 'pi-building', 
    path: '/app/customers', 
    permission: PERMISSION_KEYS.customersView,
    children: [
      { label: 'All Customers', icon: 'pi-list', path: '/app/customers', permission: PERMISSION_KEYS.customersView },
      { label: 'Add Customer', icon: 'pi-plus', path: '/app/customers/new', permission: PERMISSION_KEYS.customersManage }
    ]
  },
  { 
    label: 'Leads', 
    icon: 'pi-bullseye', 
    path: '/app/leads', 
    permission: PERMISSION_KEYS.leadsView,
    children: [
      { label: 'All Leads', icon: 'pi-list', path: '/app/leads', permission: PERMISSION_KEYS.leadsView },
      { label: 'Add Lead', icon: 'pi-plus', path: '/app/leads/new', permission: PERMISSION_KEYS.leadsManage },
      { label: 'Pipeline', icon: 'pi-sitemap', path: '/app/leads/pipeline', permission: PERMISSION_KEYS.leadsView },
      { label: 'Import Leads', icon: 'pi-upload', path: '/app/leads/import', permission: PERMISSION_KEYS.leadsManage }
    ]
  },
  { 
    label: 'Deal', 
    icon: 'pi-chart-line', 
    path: '/app/opportunities', 
    permission: PERMISSION_KEYS.opportunitiesView,
    children: [
      { label: 'All Deals', icon: 'pi-list', path: '/app/opportunities', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Add Deal', icon: 'pi-plus', path: '/app/opportunities/new', permission: PERMISSION_KEYS.opportunitiesManage }
    ]
  },
  {
    label: 'Marketing',
    icon: 'pi-megaphone',
    path: '/app/marketing/campaigns',
    permission: PERMISSION_KEYS.marketingView,
    featureFlag: 'marketing.campaigns',
    children: [
      { label: 'Campaigns', icon: 'pi-list', path: '/app/marketing/campaigns', permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns' },
      { label: 'Add Campaign', icon: 'pi-plus', path: '/app/marketing/campaigns/new', permission: PERMISSION_KEYS.marketingManage, featureFlag: 'marketing.campaigns' },
      { label: 'Campaign Emails', icon: 'pi-send', path: '/app/marketing/emails', permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns' },
      { label: 'Attribution', icon: 'pi-percentage', path: '/app/marketing/attribution', permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns' }
    ]
  },
  { 
    label: 'Activities', 
    icon: 'pi-calendar', 
    path: '/app/activities', 
    permission: PERMISSION_KEYS.activitiesView,
    children: [
      { label: 'All Activities', icon: 'pi-list', path: '/app/activities', permission: PERMISSION_KEYS.activitiesView },
      { label: 'Calendar', icon: 'pi-calendar-plus', path: '/app/activities/calendar', permission: PERMISSION_KEYS.activitiesView },
      { label: 'Tasks', icon: 'pi-check-square', path: '/app/activities/tasks', permission: PERMISSION_KEYS.activitiesView }
    ]
  },
  {
    label: 'My Mailbox',
    icon: 'pi-envelope',
    path: '/app/mailbox',
    permission: PERMISSION_KEYS.emailsView,
    children: [
      { label: 'Inbox', icon: 'pi-inbox', path: '/app/mailbox/inbox', permission: PERMISSION_KEYS.emailsView, iconColor: '#3b82f6' },
      { label: 'Starred', icon: 'pi-star-fill', path: '/app/mailbox/starred', permission: PERMISSION_KEYS.emailsView, iconColor: '#eab308' },
      { label: 'Sent', icon: 'pi-send', path: '/app/mailbox/sent', permission: PERMISSION_KEYS.emailsView, iconColor: '#22c55e' },
      { label: 'Drafts', icon: 'pi-file-edit', path: '/app/mailbox/drafts', permission: PERMISSION_KEYS.emailsView, iconColor: '#a855f7' },
      { label: 'Archive', icon: 'pi-folder', path: '/app/mailbox/archive', permission: PERMISSION_KEYS.emailsView, iconColor: '#f97316' },
      { label: 'Spam', icon: 'pi-ban', path: '/app/mailbox/spam', permission: PERMISSION_KEYS.emailsView, iconColor: '#ef4444' },
      { label: 'Trash', icon: 'pi-trash', path: '/app/mailbox/trash', permission: PERMISSION_KEYS.emailsView, iconColor: '#6b7280' },
      { label: 'Templates', icon: 'pi-copy', path: '/app/mailbox/templates', permission: PERMISSION_KEYS.emailsManage, iconColor: '#06b6d4' }
    ]
  },
  { 
    label: 'Contacts', 
    icon: 'pi-id-card', 
    path: '/app/contacts', 
    permission: PERMISSION_KEYS.contactsView,
    children: [
      { label: 'All Contacts', icon: 'pi-list', path: '/app/contacts', permission: PERMISSION_KEYS.contactsView },
      { label: 'Add Contact', icon: 'pi-plus', path: '/app/contacts/new', permission: PERMISSION_KEYS.contactsManage }
    ]
  },
  {
    label: 'Settings',
    icon: 'pi-cog',
    path: '/app/settings',
    permission: PERMISSION_KEYS.administrationView,
    children: [
      {
        label: 'People & Access',
        icon: 'pi-users',
        path: '/app/settings/users',
        permission: PERMISSION_KEYS.administrationView,
        children: [
          {
            label: 'Users',
            icon: 'pi-users',
            path: '/app/settings/users',
            permission: PERMISSION_KEYS.administrationView
          },
          {
            label: 'Roles',
            icon: 'pi-shield',
            path: '/app/settings/roles',
            permission: PERMISSION_KEYS.administrationView
          },
          {
            label: 'Permision',
            icon: 'pi-lock',
            path: '/app/settings/permissions',
            permission: PERMISSION_KEYS.administrationView
          },
          {
            label: 'Security Level',
            icon: 'pi-shield',
            path: '/app/settings/security-levels',
            permission: PERMISSION_KEYS.administrationManage
          },
          {
            label: 'Dashboard Packs',
            icon: 'pi-th-large',
            path: '/app/settings/dashboard-packs',
            permission: PERMISSION_KEYS.administrationView
          }
        ]
      },
      {
        label: 'Workspace & Org',
        icon: 'pi-building',
        path: '/app/settings/workspace',
        permission: PERMISSION_KEYS.administrationManage,
        children: [
          { label: 'Workspace', icon: 'pi-sliders-h', path: '/app/settings/workspace', permission: PERMISSION_KEYS.administrationManage },
          { label: 'Tenant Configuration', icon: 'pi-building', path: '/app/settings/tenants', permission: PERMISSION_KEYS.tenantsView }
        ]
      },
      {
        label: 'Workflow & Rules',
        icon: 'pi-sitemap',
        path: '/app/settings/approvals',
        permission: PERMISSION_KEYS.administrationManage,
        children: [
          { label: 'Approvals', icon: 'pi-check-square', path: '/app/settings/approvals', permission: PERMISSION_KEYS.administrationManage },
          { label: 'Workflow Builder', icon: 'pi-share-alt', path: '/app/workflows/designer', permission: PERMISSION_KEYS.administrationManage },
          { label: 'Workflow Executions', icon: 'pi-history', path: '/app/workflows/executions', permission: PERMISSION_KEYS.administrationView },
          { label: 'Notifications', icon: 'pi-bell', path: '/app/settings/notifications', permission: PERMISSION_KEYS.administrationView },
          { label: 'Marketing', icon: 'pi-megaphone', path: '/app/settings/marketing', permission: PERMISSION_KEYS.administrationView, featureFlag: 'marketing.campaigns' },
          { label: 'Lead Assignment', icon: 'pi-sitemap', path: '/app/settings/lead-assignment', permission: PERMISSION_KEYS.leadsManage },
          { label: 'Qualification Policy', icon: 'pi-shield', path: '/app/settings/qualification-policy', permission: PERMISSION_KEYS.administrationManage },
          { label: 'Qualification Thresholds', icon: 'pi-filter', path: '/app/settings/qualification-thresholds', permission: PERMISSION_KEYS.administrationManage }
        ]
      },
      {
        label: 'Integrations',
        icon: 'pi-link',
        path: '/app/settings/email-accounts',
        permission: PERMISSION_KEYS.emailsManage,
        children: [
          { label: 'Email Accounts', icon: 'pi-envelope', path: '/app/settings/email-accounts', permission: PERMISSION_KEYS.emailsManage }
        ]
      },
      {
        label: 'Trust & Audit',
        icon: 'pi-clipboard',
        path: '/app/settings/audit-log',
        permission: PERMISSION_KEYS.auditView,
        children: [
          { label: 'Audit Log', icon: 'pi-clipboard', path: '/app/settings/audit-log', permission: PERMISSION_KEYS.auditView }
        ]
      }
    ]
  },
  {
    label: 'Help Desk',
    icon: 'pi-headphones',
    path: '/app/helpdesk/cases',
    permission: PERMISSION_KEYS.helpDeskView,
    featureFlag: 'helpdesk.cases',
    children: [
      { label: 'Cases', icon: 'pi-list', path: '/app/helpdesk/cases', permission: PERMISSION_KEYS.helpDeskView, featureFlag: 'helpdesk.cases' },
      { label: 'Queues', icon: 'pi-sitemap', path: '/app/helpdesk/queues', permission: PERMISSION_KEYS.helpDeskAdmin, featureFlag: 'helpdesk.cases' },
      { label: 'Help Desk Settings', icon: 'pi-cog', path: '/app/helpdesk/settings', permission: PERMISSION_KEYS.helpDeskAdmin, featureFlag: 'helpdesk.cases' }
    ]
  }
];
