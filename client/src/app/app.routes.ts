import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { PERMISSION_KEYS } from './core/auth/permission.constants';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'landing'
  },
  {
    path: 'landing',
    loadComponent: () => import('./public/landing/landing.page').then((m) => m.LandingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./public/auth/login.page').then((m) => m.LoginPage)
  },
  {
    path: 'change-password',
    canActivate: [authGuard],
    loadComponent: () => import('./public/auth/change-password.page').then((m) => m.ChangePasswordPage)
  },
  {
    path: 'accept-invite',
    loadComponent: () => import('./public/auth/accept-invite.page').then((m) => m.AcceptInvitePage)
  },
  {
    path: 'supplier/onboard',
    loadComponent: () =>
      import('./public/supplier/supplier-onboarding.page').then((m) => m.SupplierOnboardingPage)
  },
  {
    path: 'supplier/onboard/:token',
    loadComponent: () =>
      import('./public/supplier/supplier-onboarding.page').then((m) => m.SupplierOnboardingPage)
  },
  {
    path: 'app',
    component: ShellComponent,
    canActivate: [authGuard],
    data: { breadcrumb: 'Home', icon: 'pi-home' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.dashboardView, breadcrumb: 'Dashboard', icon: 'pi-chart-bar' },
        loadComponent: () =>
          import('./crm/features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'decisions',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Decision Inbox', icon: 'pi-inbox' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'inbox'
          },
          {
            path: '',
            loadComponent: () =>
              import('./crm/features/opportunities/pages/decision-inbox-shell.page').then((m) => m.DecisionInboxShellPage),
            children: [
              {
                path: 'inbox',
                data: { breadcrumb: 'Inbox' },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/opportunity-approvals.page').then((m) => m.OpportunityApprovalsPage)
              },
              {
                path: 'approvals',
                data: {
                  breadcrumb: 'Approvals',
                  decisionView: 'approvals'
                },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/opportunity-approvals.page').then((m) => m.OpportunityApprovalsPage)
              },
              {
                path: 'ai-reviews',
                data: {
                  breadcrumb: 'AI Reviews',
                  decisionView: 'ai-reviews'
                },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/opportunity-approvals.page').then((m) => m.OpportunityApprovalsPage)
              },
              {
                path: 'policies',
                data: {
                  breadcrumb: 'Policies & SLA',
                  title: 'Policies & SLA',
                  heading: 'Decision Policies & SLA Controls',
                  description: 'Policy routing, thresholds, and escalation SLA controls belong here in the enterprise rollout. This page is stubbed to establish the navigation architecture.'
                },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/decision-policies-sla.page').then((m) => m.DecisionPoliciesSlaPage)
              },
              {
                path: 'audit',
                data: {
                  breadcrumb: 'Decision History',
                  title: 'Decision History',
                  heading: 'Decision History'
                },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/decision-history.page').then((m) => m.DecisionHistoryPage)
              }
            ]
          }
        ]
      },
      {
        path: 'customers',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.customersView, breadcrumb: 'Customers', icon: 'pi-building' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./crm/features/customers/pages/customers.page').then((m) => m.CustomersPage)
          },
          {
            path: 'new',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.customersManage, breadcrumb: 'New Customer' },
            loadComponent: () =>
              import('./crm/features/customers/pages/customer-form.page').then((m) => m.CustomerFormPage)
          },
          {
            path: ':id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.customersManage, breadcrumb: 'Edit Customer' },
            loadComponent: () =>
              import('./crm/features/customers/pages/customer-form.page').then((m) => m.CustomerFormPage)
          }
        ]
      },
      {
        path: 'contacts',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.contactsView, breadcrumb: 'Contacts', icon: 'pi-id-card' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./crm/features/contacts/pages/contacts.page').then((m) => m.ContactsPage)
          },
          {
            path: 'new',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.contactsManage, breadcrumb: 'New Contact' },
            loadComponent: () =>
              import('./crm/features/contacts/pages/contact-form.page').then((m) => m.ContactFormPage)
          },
          {
            path: ':id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.contactsManage, breadcrumb: 'Edit Contact' },
            loadComponent: () =>
              import('./crm/features/contacts/pages/contact-form.page').then((m) => m.ContactFormPage)
          }
        ]
      },
      {
        path: 'leads',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsView, breadcrumb: 'Leads', icon: 'pi-bullseye' },
        pathMatch: 'full',
        loadComponent: () => import('./crm/features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/pipeline',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsView, breadcrumb: 'Pipeline', icon: 'pi-sitemap' },
        loadComponent: () => import('./crm/features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/import',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Import Leads', icon: 'pi-upload' },
        loadComponent: () => import('./crm/features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'New Lead', icon: 'pi-plus' },
        loadComponent: () => import('./crm/features/leads/pages/lead-form.page').then((m) => m.LeadFormPage)
      },
      {
        path: 'leads/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Edit Lead', icon: 'pi-pencil' },
        loadComponent: () => import('./crm/features/leads/pages/lead-form.page').then((m) => m.LeadFormPage)
      },
      {
        path: 'leads/:id/convert',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Convert Lead', icon: 'pi-bolt' },
        loadComponent: () => import('./crm/features/leads/pages/lead-convert.page').then((m) => m.LeadConvertPage)
      },
      {
        path: 'opportunities/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'New Opportunity', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'opportunities/approvals',
        redirectTo: 'decisions/approvals',
        pathMatch: 'full'
      },
      {
        path: 'opportunities/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'Edit Opportunity', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'opportunities',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Opportunities', icon: 'pi-chart-line' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunities.page').then((m) => m.OpportunitiesPage)
      },
      {
        path: 'activities',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activitiesView, breadcrumb: 'Activities', icon: 'pi-calendar' },
        loadComponent: () =>
          import('./crm/features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/calendar',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activitiesView, breadcrumb: 'Calendar', icon: 'pi-calendar-plus' },
        loadComponent: () =>
          import('./crm/features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/tasks',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activitiesView, breadcrumb: 'Tasks', icon: 'pi-check-square' },
        loadComponent: () =>
          import('./crm/features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activitiesManage, breadcrumb: 'New Activity', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/activities/pages/activity-form.page').then((m) => m.ActivityFormPage)
      },
      {
        path: 'activities/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activitiesManage, breadcrumb: 'Edit Activity', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/activities/pages/activity-form.page').then((m) => m.ActivityFormPage)
      },
      {
        path: 'settings',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Settings', icon: 'pi-cog' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'users' },
          {
            path: 'users',
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Users' },
            pathMatch: 'full',
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'notifications',
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Notifications' },
            loadComponent: () =>
              import('./crm/features/settings/pages/notifications.page').then((m) => m.NotificationsPage)
          },
          {
            path: 'users/:id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Edit User' },
            loadComponent: () => import('./crm/features/settings/pages/user-edit.page').then((m) => m.UserEditPage)
          },
          {
            path: 'roles',
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Roles' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'permissions',
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Permision' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'teams',
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Teams' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'roles/new',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'New Role' },
            loadComponent: () => import('./crm/features/settings/pages/role-form.page').then((m) => m.RoleFormPage)
          },
          {
            path: 'roles/:id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Edit Role' },
            loadComponent: () => import('./crm/features/settings/pages/role-form.page').then((m) => m.RoleFormPage)
          },
          {
            path: 'invite',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Invite User' },
            loadComponent: () => import('./crm/features/settings/pages/invite-user.page').then((m) => m.InviteUserPage)
          },
          {
            path: 'workspace',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Workspace Settings' },
            loadComponent: () => import('./crm/features/settings/pages/workspace-settings.page').then((m) => m.WorkspaceSettingsPage)
          },
          {
            path: 'approvals',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Approval Settings' },
            loadComponent: () => import('./crm/features/settings/pages/approval-settings.page').then((m) => m.ApprovalSettingsPage)
          },
          {
            path: 'qualification-policy',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Qualification Policy' },
            loadComponent: () =>
              import('./crm/features/settings/pages/qualification-policy.page').then((m) => m.QualificationPolicyPage)
          },
          {
            path: 'qualification-thresholds',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Qualification Threshold Rules' },
            loadComponent: () =>
              import('./crm/features/settings/pages/qualification-thresholds.page').then((m) => m.QualificationThresholdsPage)
          },
          {
            path: 'lead-assignment',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Lead Assignment' },
            loadComponent: () => import('./crm/features/settings/pages/lead-assignment.page').then((m) => m.LeadAssignmentPage)
          },
          {
            path: 'opportunity-automation',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'Opportunity Automation' },
            loadComponent: () =>
              import('./crm/features/settings/pages/opportunity-automation.page').then((m) => m.OpportunityAutomationPage)
          },
          {
            path: 'dashboard-packs',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Dashboard Packs' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'security-levels',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Security Level' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'lead-assignment/:id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Edit Lead Assignment' },
            loadComponent: () => import('./crm/features/settings/pages/lead-assignment.page').then((m) => m.LeadAssignmentPage)
          },
          {
            path: 'audit-log',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.auditView, breadcrumb: 'Audit Log' },
            loadComponent: () => import('./crm/features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'tenants/new',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.tenantsManage, breadcrumb: 'Create Tenant' },
            loadComponent: () => import('./crm/features/settings/pages/tenant-create.page').then((m) => m.TenantCreatePage)
          },
          {
            path: 'tenants',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.tenantsView, breadcrumb: 'Tenant Configuration' },
            loadComponent: () => import('./crm/features/settings/pages/tenants.page').then((m) => m.TenantsPage)
          }
        ]
      },
      {
        path: 'supply-chain',
        data: { breadcrumb: 'Supply Chain', icon: 'pi-sitemap' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'rfqs' },
          {
            path: 'rfqs',
            data: { breadcrumb: 'RFQs' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-list/rfq-list').then((m) => m.RfqListComponent)
          },
          {
            path: 'rfqs/new',
            data: { breadcrumb: 'New RFQ' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-create/rfq-create').then((m) => m.RfqCreateComponent)
          },
          {
            path: 'rfqs/draft',
            data: { breadcrumb: 'RFQ Draft' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-draft-workspace/rfq-draft-workspace.component').then((m) => m.RfqDraftWorkspaceComponent)
          },
          {
            path: 'rfqs/compare',
            data: { breadcrumb: 'Compare RFQs' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-compare/rfq-compare.component').then((m) => m.RfqCompareComponent)
          },
          {
            path: 'rfqs/history',
            data: { breadcrumb: 'RFQ History' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-history/rfq-history.component').then((m) => m.RfqHistoryComponent)
          },
          {
            path: 'quotes',
            data: { breadcrumb: 'Quote Comparison' },
            loadComponent: () =>
              import('./packs/supply-chain/features/quotes/quote-comparison/quote-comparison.component').then((m) => m.QuoteComparisonComponent)
          },
          {
            path: 'awards',
            data: { breadcrumb: 'Awards' },
            loadComponent: () =>
              import('./packs/supply-chain/features/awards/awards.component').then((m) => m.AwardsComponent)
          },
          {
            path: 'awards/:id',
            data: { breadcrumb: 'Award Details' },
            loadComponent: () =>
              import('./packs/supply-chain/features/awards/award-detail/award-detail.component').then(
                (m) => m.AwardDetailComponent
              )
          },
          {
            path: 'suppliers',
            data: { breadcrumb: 'Supplier Directory' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-directory/supplier-directory.component').then(
                (m) => m.SupplierDirectoryComponent
              )
          },
          {
            path: 'suppliers/compliance',
            data: { breadcrumb: 'Compliance / Certifications' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-compliance/supplier-compliance.component').then(
                (m) => m.SupplierComplianceComponent
              )
          },
          {
            path: 'suppliers/performance',
            data: { breadcrumb: 'Performance / Scorecards' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-scorecards/supplier-scorecards.component').then(
                (m) => m.SupplierScorecardsComponent
              )
          },
          {
            path: 'suppliers/:id',
            data: { breadcrumb: 'Supplier Details' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-detail/supplier-detail.component').then(
                (m) => m.SupplierDetailComponent
              )
          },
          {
            path: 'suppliers/new/edit',
            data: { breadcrumb: 'Add Supplier' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-edit/supplier-edit.component').then(
                (m) => m.SupplierEditComponent
              )
          },
          {
            path: 'suppliers/:id/edit',
            data: { breadcrumb: 'Edit Supplier' },
            loadComponent: () =>
              import('./packs/supply-chain/features/suppliers/supplier-edit/supplier-edit.component').then(
                (m) => m.SupplierEditComponent
              )
          },
          {
            path: 'po',
            data: { breadcrumb: 'Purchase Orders' },
            loadComponent: () =>
              import('./packs/supply-chain/features/procurement/purchase-orders/po-list/po-list.component').then(
                (m) => m.PoListComponent
              )
          },
          {
            path: 'approvals',
            data: { breadcrumb: 'Approvals' },
            loadComponent: () =>
              import('./packs/supply-chain/features/procurement/purchase-orders/po-approvals/po-approvals.component').then(
                (m) => m.PoApprovalsComponent
              )
          },
          {
            path: 'change-orders',
            data: { breadcrumb: 'Change Orders' },
            loadComponent: () =>
              import('./packs/supply-chain/features/procurement/purchase-orders/change-orders/change-orders.component').then(
                (m) => m.ChangeOrdersComponent
              )
          },
          {
            path: 'receiving',
            data: { breadcrumb: 'Receiving / GRN' },
            loadComponent: () =>
              import('./packs/supply-chain/features/logistics/receiving/delivery-schedule.component').then(
                (m) => m.DeliveryScheduleComponent
              )
          },
          {
            path: 'shipments',
            data: { breadcrumb: 'Shipments' },
            loadComponent: () =>
              import('./packs/supply-chain/features/logistics/shipments/in-transit-tracking.component').then(
                (m) => m.InTransitTrackingComponent
              )
          },
          {
            path: 'carriers',
            data: { breadcrumb: 'Carrier Management' },
            loadComponent: () =>
              import('./packs/supply-chain/features/logistics/carriers/carrier-list.component').then(
                (m) => m.CarrierListComponent
              )
          },
          {
            path: 'inventory',
            data: { breadcrumb: 'Stock Levels' },
            loadComponent: () =>
              import('./packs/supply-chain/features/inventory/stock-levels/inventory-stock-levels.component').then(
                (m) => m.InventoryStockLevelsComponent
              )
          },
          {
            path: 'replenishment',
            data: { breadcrumb: 'Replenishment' },
            loadComponent: () =>
              import('./packs/supply-chain/features/inventory/replenishment-planning/replenishment-planning.component').then(
                (m) => m.ReplenishmentPlanningComponent
              )
          },
          {
            path: 'warehousing',
            data: { breadcrumb: 'Warehousing' },
            loadComponent: () =>
              import('./packs/supply-chain/features/inventory/stock-overview/inventory-stock-overview.component').then(
                (m) => m.InventoryStockOverviewComponent
              )
          },
          {
            path: 'catalog',
            data: { breadcrumb: 'Catalog' },
            children: [
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'item-master'
              },
              {
                path: 'item-master',
                data: { breadcrumb: 'Item Master' },
                loadComponent: () =>
                  import('./packs/supply-chain/features/catalog/item-master/item-master.component').then(
                    (m) => m.ItemMasterComponent
                  )
              },
              {
                path: 'supplier-catalog',
                data: { breadcrumb: 'Supplier Catalog' },
                loadComponent: () =>
                  import('./packs/supply-chain/features/catalog/product-list/product-list.component').then(
                    (m) => m.ProductListComponent
                  )
              }
            ]
          },
          {
            path: 'catalog/categories',
            data: { breadcrumb: 'Categories' },
            loadComponent: () =>
              import('./packs/supply-chain/features/catalog/category-list/category-list.component').then(
                (m) => m.CategoryListComponent
              )
          },
          {
            path: 'catalog/categories/:id',
            data: { breadcrumb: 'Category Details' },
            loadComponent: () =>
              import('./packs/supply-chain/features/catalog/category-detail/category-detail.component').then(
                (m) => m.CategoryDetailComponent
              )
          },
          {
            path: 'catalog/alerts',
            data: { breadcrumb: 'Stock Alerts' },
            loadComponent: () =>
              import('./packs/supply-chain/features/catalog/stock-alerts/catalog-stock-alerts.component').then(
                (m) => m.CatalogStockAlertsComponent
              )
          },
          {
            path: 'pricing',
            data: { breadcrumb: 'Pricing' },
            loadComponent: () =>
              import('./packs/supply-chain/features/catalog/pricing/pricing-rates.component').then(
                (m) => m.PricingRatesComponent
              )
          },
          {
            path: 'contracts',
            data: { breadcrumb: 'Contracts' },
            loadComponent: () =>
              import('./packs/supply-chain/features/catalog/contracts/contracts.component').then(
                (m) => m.ContractsComponent
              )
          },
          {
            path: 'quality/inspections',
            data: { breadcrumb: 'Inspections' },
            loadComponent: () =>
              import('./packs/supply-chain/features/quality/inspections/quality-inspection.component').then(
                (m) => m.QualityInspectionComponent
              )
          },
          {
            path: 'quality/nonconformance',
            data: { breadcrumb: 'Non-conformance' },
            loadComponent: () =>
              import('./packs/supply-chain/features/quality/nonconformance/returns-claims.component').then(
                (m) => m.ReturnsClaimsComponent
              )
          },
          {
            path: 'quality/capa',
            data: { breadcrumb: 'Corrective Actions' },
            loadComponent: () =>
              import('./packs/supply-chain/features/quality/corrective-actions/corrective-actions.component').then(
                (m) => m.CorrectiveActionsComponent
              )
          },
          {
            path: 'analytics/spend',
            data: { breadcrumb: 'Spend Analytics' },
            loadComponent: () =>
              import('./packs/supply-chain/features/analytics/spend/spend-analysis.component').then(
                (m) => m.SpendAnalysisComponent
              )
          },
          {
            path: 'analytics/suppliers',
            data: { breadcrumb: 'Supplier Performance' },
            loadComponent: () =>
              import('./packs/supply-chain/features/analytics/suppliers/supplier-performance-analytics.component').then(
                (m) => m.SupplierPerformanceAnalyticsComponent
              )
          },
          {
            path: 'analytics/savings',
            data: { breadcrumb: 'Savings Tracking' },
            loadComponent: () =>
              import('./packs/supply-chain/features/analytics/savings/savings-tracking.component').then(
                (m) => m.SavingsTrackingComponent
              )
          },
          {
            path: 'rfqs/:id',
            data: { breadcrumb: 'RFQ Details' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-detail/rfq-detail.component').then((m) => m.RfqDetailComponent)
          },
          {
            path: 'rfqs/:id/edit',
            data: { breadcrumb: 'Edit RFQ' },
            loadComponent: () =>
              import('./packs/supply-chain/features/rfq/rfq-create/rfq-create').then((m) => m.RfqCreateComponent)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
