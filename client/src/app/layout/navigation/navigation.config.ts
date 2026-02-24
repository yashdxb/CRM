import { PERMISSION_KEYS } from '../../core/auth/permission.constants';
import { NavLink } from './navigation.model';

export const NAV_LINKS: NavLink[] = [
  { label: 'Dashboard', icon: 'pi-chart-bar', path: '/app/dashboard', permission: PERMISSION_KEYS.dashboardView },
  {
    label: 'Decision Inbox',
    icon: 'pi-inbox',
    path: '/app/decisions',
    permission: PERMISSION_KEYS.opportunitiesView,
    children: [
      { label: 'Inbox', icon: 'pi-inbox', path: '/app/decisions/inbox', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Approvals', icon: 'pi-check-circle', path: '/app/decisions/approvals', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'AI Reviews', icon: 'pi-sparkles', path: '/app/decisions/ai-reviews', permission: PERMISSION_KEYS.opportunitiesView },
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
    label: 'Opportunities', 
    icon: 'pi-chart-line', 
    path: '/app/opportunities', 
    permission: PERMISSION_KEYS.opportunitiesView,
    children: [
      { label: 'All Opportunities', icon: 'pi-list', path: '/app/opportunities', permission: PERMISSION_KEYS.opportunitiesView },
      { label: 'Add Opportunity', icon: 'pi-plus', path: '/app/opportunities/new', permission: PERMISSION_KEYS.opportunitiesManage }
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
    label: 'Supply Chain',
    icon: 'pi-sitemap',
    path: '/app/supply-chain',
    pack: 'supply-chain',
    children: [
      {
        label: 'Sourcing',
        icon: 'pi-compass',
        path: '/app/supply-chain/rfqs',
        pack: 'supply-chain',
        children: [
          { label: 'RFQ', icon: 'pi-list', path: '/app/supply-chain/rfqs', pack: 'supply-chain', module: 'rfq' },
          { label: 'RFQ Drafts', icon: 'pi-file-edit', path: '/app/supply-chain/rfqs/draft', pack: 'supply-chain', module: 'rfq' },
          { label: 'RFQ History', icon: 'pi-history', path: '/app/supply-chain/rfqs/history', pack: 'supply-chain', module: 'rfq' },
          { label: 'Compare RFQs', icon: 'pi-chart-bar', path: '/app/supply-chain/rfqs/compare', pack: 'supply-chain', module: 'rfq' },
          { label: 'Quote Comparison', icon: 'pi-sliders-h', path: '/app/supply-chain/quotes', pack: 'supply-chain', module: 'quotes' },
          { label: 'Awards', icon: 'pi-trophy', path: '/app/supply-chain/awards', pack: 'supply-chain', module: 'awards' }
        ]
      },
      {
        label: 'Supplier Management',
        icon: 'pi-users',
        path: '/app/supply-chain/suppliers',
        pack: 'supply-chain',
        module: 'suppliers',
        children: [
          { label: 'Supplier Directory', icon: 'pi-id-card', path: '/app/supply-chain/suppliers', pack: 'supply-chain', module: 'suppliers' },
          { label: 'Compliance', icon: 'pi-shield', path: '/app/supply-chain/suppliers/compliance', pack: 'supply-chain', module: 'suppliers' },
          { label: 'Performance', icon: 'pi-chart-line', path: '/app/supply-chain/suppliers/performance', pack: 'supply-chain', module: 'suppliers' }
        ]
      },
      {
        label: 'Catalog & Pricing',
        icon: 'pi-tags',
        path: '/app/supply-chain/catalog',
        pack: 'supply-chain',
        children: [
          { label: 'Item Master', icon: 'pi-book', path: '/app/supply-chain/catalog', pack: 'supply-chain', module: 'catalog' },
          { label: 'Price Lists', icon: 'pi-receipt', path: '/app/supply-chain/pricing', pack: 'supply-chain', module: 'pricing' },
          { label: 'Contracts', icon: 'pi-file-check', path: '/app/supply-chain/contracts', pack: 'supply-chain', module: 'contracts' }
        ]
      },
      {
        label: 'Procurement',
        icon: 'pi-briefcase',
        path: '/app/supply-chain/po',
        pack: 'supply-chain',
        children: [
          { label: 'Purchase Orders (POs)', icon: 'pi-file', path: '/app/supply-chain/po', pack: 'supply-chain' },
          { label: 'Approvals', icon: 'pi-check-circle', path: '/app/supply-chain/approvals', pack: 'supply-chain' },
          { label: 'Change Orders', icon: 'pi-refresh', path: '/app/supply-chain/change-orders', pack: 'supply-chain' }
        ]
      },
      {
        label: 'Logistics',
        icon: 'pi-truck',
        path: '/app/supply-chain/logistics',
        pack: 'supply-chain',
        module: 'logistics',
        children: [
          { label: 'Receiving', icon: 'pi-inbox', path: '/app/supply-chain/receiving', pack: 'supply-chain', module: 'logistics' },
          { label: 'Shipments', icon: 'pi-send', path: '/app/supply-chain/shipments', pack: 'supply-chain', module: 'logistics' },
          { label: 'Carrier Management', icon: 'pi-compass', path: '/app/supply-chain/carriers', pack: 'supply-chain', module: 'logistics' }
        ]
      },
      {
        label: 'Inventory',
        icon: 'pi-box',
        path: '/app/supply-chain/inventory',
        pack: 'supply-chain',
        children: [
          { label: 'Stock Levels', icon: 'pi-database', path: '/app/supply-chain/inventory', pack: 'supply-chain', module: 'inventory' },
          { label: 'Reorder', icon: 'pi-sync', path: '/app/supply-chain/replenishment', pack: 'supply-chain', module: 'inventory' },
          { label: 'Warehousing', icon: 'pi-home', path: '/app/supply-chain/warehousing', pack: 'supply-chain', module: 'inventory' }
        ]
      },
      {
        label: 'Quality',
        icon: 'pi-check-square',
        path: '/app/supply-chain/quality',
        pack: 'supply-chain',
        children: [
          { label: 'Inspections', icon: 'pi-search', path: '/app/supply-chain/quality/inspections', pack: 'supply-chain', module: 'quality' },
          { label: 'Non-conformance', icon: 'pi-exclamation-triangle', path: '/app/supply-chain/quality/nonconformance', pack: 'supply-chain', module: 'quality' },
          { label: 'Corrective Actions', icon: 'pi-wrench', path: '/app/supply-chain/quality/capa', pack: 'supply-chain', module: 'quality' }
        ]
      },
      {
        label: 'Analytics',
        icon: 'pi-chart-bar',
        path: '/app/supply-chain/analytics',
        pack: 'supply-chain',
        children: [
          { label: 'Spend Analytics', icon: 'pi-chart-line', path: '/app/supply-chain/analytics/spend', pack: 'supply-chain', module: 'analytics' },
          { label: 'Supplier Performance', icon: 'pi-star', path: '/app/supply-chain/analytics/suppliers', pack: 'supply-chain', module: 'analytics' },
          { label: 'Savings Tracking', icon: 'pi-percentage', path: '/app/supply-chain/analytics/savings', pack: 'supply-chain', module: 'analytics' }
        ]
      }
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
          { label: 'Notifications', icon: 'pi-bell', path: '/app/settings/notifications', permission: PERMISSION_KEYS.administrationView },
          { label: 'Lead Assignment', icon: 'pi-sitemap', path: '/app/settings/lead-assignment', permission: PERMISSION_KEYS.leadsManage },
          { label: 'Qualification Policy', icon: 'pi-shield', path: '/app/settings/qualification-policy', permission: PERMISSION_KEYS.administrationManage },
          { label: 'Qualification Thresholds', icon: 'pi-filter', path: '/app/settings/qualification-thresholds', permission: PERMISSION_KEYS.administrationManage }
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
  }
];

export const SUPPLY_CHAIN_MODULES = [
  'rfq',
  'rfi',
  'quotes',
  'awards',
  'suppliers',
  'catalog',
  'pricing',
  'contracts',
  'procurement',
  'logistics',
  'inventory',
  'quality',
  'analytics'
];
