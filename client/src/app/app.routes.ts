import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { tenantFeatureGuard } from './core/auth/tenant-feature.guard';
import { PERMISSION_KEYS } from './core/auth/permission.constants';
import { unsavedChangesGuard } from './core/guards/unsaved-changes.guard';

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
    path: 'platform',
    loadComponent: () =>
      import('./public/product-capabilities/product-capabilities.page').then((m) => m.ProductCapabilitiesPage)
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
    path: 'unsubscribe',
    loadComponent: () =>
      import('./public/email-unsubscribe/email-unsubscribe.page').then((m) => m.EmailUnsubscribePage)
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
        path: 'reports',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.reportsView, breadcrumb: 'Reports', icon: 'pi-chart-pie' },
        loadComponent: () =>
          import('./crm/features/reports/pages/reports.page').then((m) => m.ReportsPage)
      },
      {
        path: 'report-designer',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.reportsDesign, breadcrumb: 'Report Workspace', icon: 'pi-palette' },
        loadComponent: () =>
          import('./crm/features/reports/pages/report-designer.page').then((m) => m.ReportDesignerPage)
      },
      {
        path: 'module-disabled',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.dashboardView, breadcrumb: 'Module Disabled', icon: 'pi-ban' },
        loadComponent: () =>
          import('./shared/pages/module-disabled.page').then((m) => m.ModuleDisabledPage)
      },
      {
        path: 'access-denied',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.dashboardView, breadcrumb: 'Access Denied', icon: 'pi-lock' },
        loadComponent: () =>
          import('./shared/pages/access-denied.page').then((m) => m.AccessDeniedPage)
      },
      {
        path: 'decisions',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Decision Inbox', icon: 'pi-inbox' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'pending-action'
          },
          {
            path: '',
            loadComponent: () =>
              import('./crm/features/opportunities/pages/decision-inbox-shell.page').then((m) => m.DecisionInboxShellPage),
            children: [
              {
                path: 'pending-action',
                data: {
                  breadcrumb: 'Pending Action',
                  decisionView: 'pending-action'
                },
                loadComponent: () =>
                  import('./crm/features/opportunities/pages/opportunity-approvals.page').then((m) => m.OpportunityApprovalsPage)
              },
              {
                path: 'inbox',
                pathMatch: 'full',
                redirectTo: 'pending-action'
              },
              {
                path: 'approvals',
                pathMatch: 'full',
                redirectTo: 'pending-action'
              },
              {
                path: 'ai-reviews',
                pathMatch: 'full',
                redirectTo: 'pending-action'
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
            canDeactivate: [unsavedChangesGuard],
            data: { permission: PERMISSION_KEYS.customersManage, breadcrumb: 'New Customer' },
            loadComponent: () =>
              import('./crm/features/customers/pages/customer-form.page').then((m) => m.CustomerFormPage)
          },
          {
            path: ':id',
            data: { breadcrumb: 'Customer Detail' },
            loadComponent: () =>
              import('./crm/features/customers/pages/customer-detail.page').then((m) => m.CustomerDetailPage)
          },
          {
            path: ':id/edit',
            canActivate: [roleGuard],
            canDeactivate: [unsavedChangesGuard],
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
            canDeactivate: [unsavedChangesGuard],
            data: { permission: PERMISSION_KEYS.contactsManage, breadcrumb: 'New Contact' },
            loadComponent: () =>
              import('./crm/features/contacts/pages/contact-form.page').then((m) => m.ContactFormPage)
          },
          {
            path: ':id/edit',
            canActivate: [roleGuard],
            canDeactivate: [unsavedChangesGuard],
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
        canDeactivate: [unsavedChangesGuard],
        data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'New Lead', icon: 'pi-plus' },
        loadComponent: () => import('./crm/features/leads/pages/lead-form.page').then((m) => m.LeadFormPage)
      },
      {
        path: 'leads/:id/edit',
        canActivate: [roleGuard],
        canDeactivate: [unsavedChangesGuard],
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
        path: 'deals/new',
        canActivate: [roleGuard],
        canDeactivate: [unsavedChangesGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'New Deal', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'deals/approvals',
        redirectTo: 'decisions/pending-action',
        pathMatch: 'full'
      },
      {
        path: 'deals/:id/edit',
        canActivate: [roleGuard],
        canDeactivate: [unsavedChangesGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'Edit Deal', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'deals/:id',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Deal Details', icon: 'pi-eye' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-detail.page').then((m) => m.OpportunityDetailPage)
      },
      {
        path: 'deals',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Deals', icon: 'pi-chart-line' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunities.page').then((m) => m.OpportunitiesPage)
      },
      {
        path: 'deals/pipeline',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Deal Pipeline', icon: 'pi-objects-column' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunities.page').then((m) => m.OpportunitiesPage)
      },
      {
        path: 'opportunities',
        pathMatch: 'full',
        redirectTo: 'deals'
      },
      {
        path: 'opportunities/new',
        pathMatch: 'full',
        redirectTo: 'deals/new'
      },
      {
        path: 'opportunities/approvals',
        pathMatch: 'full',
        redirectTo: 'deals/approvals'
      },
      {
        path: 'opportunities/pipeline',
        pathMatch: 'full',
        redirectTo: 'deals/pipeline'
      },
      {
        path: 'opportunities/:id/edit',
        pathMatch: 'full',
        redirectTo: 'deals/:id/edit'
      },
      {
        path: 'opportunities/:id',
        pathMatch: 'full',
        redirectTo: 'deals/:id'
      },
      {
        path: 'properties',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.propertiesView, featureFlag: 'properties', moduleName: 'Properties', breadcrumb: 'Properties', icon: 'pi-home' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./crm/features/properties/pages/properties.page').then((m) => m.PropertiesPage)
          },
          {
            path: 'new',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.propertiesManage, breadcrumb: 'New Property' },
            loadComponent: () =>
              import('./crm/features/properties/pages/property-form.page').then((m) => m.PropertyFormPage)
          },
          {
            path: ':id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.propertiesManage, breadcrumb: 'Edit Property' },
            loadComponent: () =>
              import('./crm/features/properties/pages/property-form.page').then((m) => m.PropertyFormPage)
          },
          {
            path: ':id',
            data: { breadcrumb: 'Property Details', icon: 'pi-eye' },
            loadComponent: () =>
              import('./crm/features/properties/pages/property-detail.page').then((m) => m.PropertyDetailPage)
          }
        ]
      },
      {
        path: 'marketing/campaigns',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Campaigns', icon: 'pi-megaphone' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaigns.page').then((m) => m.CampaignsPage)
      },
      {
        path: 'marketing/campaigns/new',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingManage, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'New Campaign', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-form.page').then((m) => m.CampaignFormPage)
      },
      {
        path: 'marketing/campaigns/:id/edit',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingManage, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Edit Campaign', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-form.page').then((m) => m.CampaignFormPage)
      },
      {
        path: 'marketing/campaigns/:id',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Campaign Detail', icon: 'pi-chart-bar' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-detail.page').then((m) => m.CampaignDetailPage)
      },
      {
        path: 'marketing/attribution',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Attribution', icon: 'pi-percentage' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-attribution.page').then((m) => m.CampaignAttributionPage)
      },
      {
        path: 'marketing/emails',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Campaign Emails', icon: 'pi-send' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-emails.page').then((m) => m.CampaignEmailsPage)
      },
      {
        path: 'marketing/emails/new',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingManage, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Compose Email', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-email-form.page').then((m) => m.CampaignEmailFormPage)
      },
      {
        path: 'marketing/emails/:id/edit',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingManage, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Edit Email', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-email-form.page').then((m) => m.CampaignEmailFormPage)
      },
      {
        path: 'marketing/emails/:id',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.marketingView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Email Details', icon: 'pi-send' },
        loadComponent: () =>
          import('./crm/features/marketing/pages/campaign-email-detail.page').then((m) => m.CampaignEmailDetailPage)
      },
      {
        path: 'helpdesk/cases',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.helpDeskView, featureFlag: 'helpdesk.cases', moduleName: 'Help Desk', breadcrumb: 'Help Desk Cases', icon: 'pi-headphones' },
        loadComponent: () =>
          import('./crm/features/helpdesk/pages/helpdesk-cases.page').then((m) => m.HelpDeskCasesPage)
      },
      {
        path: 'helpdesk/cases/new',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.helpDeskManage, featureFlag: 'helpdesk.cases', moduleName: 'Help Desk', breadcrumb: 'New Case', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/helpdesk/pages/helpdesk-case-detail.page').then((m) => m.HelpDeskCaseDetailPage)
      },
      {
        path: 'helpdesk/cases/:id',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.helpDeskView, featureFlag: 'helpdesk.cases', moduleName: 'Help Desk', breadcrumb: 'Case Workspace', icon: 'pi-ticket' },
        loadComponent: () =>
          import('./crm/features/helpdesk/pages/helpdesk-case-detail.page').then((m) => m.HelpDeskCaseDetailPage)
      },
      {
        path: 'helpdesk/queues',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.helpDeskAdmin, featureFlag: 'helpdesk.cases', moduleName: 'Help Desk', breadcrumb: 'Help Desk Queues', icon: 'pi-sitemap' },
        loadComponent: () =>
          import('./crm/features/helpdesk/pages/helpdesk-queues.page').then((m) => m.HelpDeskQueuesPage)
      },
      {
        path: 'helpdesk/settings',
        canActivate: [roleGuard, tenantFeatureGuard],
        data: { permission: PERMISSION_KEYS.helpDeskAdmin, featureFlag: 'helpdesk.cases', moduleName: 'Help Desk', breadcrumb: 'Help Desk Settings', icon: 'pi-cog' },
        loadComponent: () =>
          import('./crm/features/helpdesk/pages/helpdesk-settings.page').then((m) => m.HelpDeskSettingsPage)
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
      // ═══════════════════════════════════════════════════════════════════════
      // MAILBOX (My Mailbox) - Outlook-like email client with folder children
      // ═══════════════════════════════════════════════════════════════════════
      {
        path: 'mailbox',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.emailsView, breadcrumb: 'My Mailbox', icon: 'pi-envelope' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'inbox' },
          {
            path: 'inbox',
            data: { breadcrumb: 'Inbox', folder: 'inbox' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'starred',
            data: { breadcrumb: 'Starred', folder: 'starred' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'sent',
            data: { breadcrumb: 'Sent', folder: 'sent' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'drafts',
            data: { breadcrumb: 'Drafts', folder: 'drafts' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'archive',
            data: { breadcrumb: 'Archive', folder: 'archive' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'spam',
            data: { breadcrumb: 'Spam', folder: 'spam' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'trash',
            data: { breadcrumb: 'Trash', folder: 'trash' },
            loadComponent: () =>
              import('./crm/features/emails/pages/emails.page').then((m) => m.EmailsPage)
          },
          {
            path: 'templates',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.emailsManage, breadcrumb: 'Email Templates', icon: 'pi-copy' },
            loadComponent: () =>
              import('./crm/features/emails/pages/email-templates.page').then((m) => m.EmailTemplatesPage)
          }
        ]
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
            path: 'marketing',
            canActivate: [tenantFeatureGuard],
            data: { permission: PERMISSION_KEYS.administrationView, featureFlag: 'marketing.campaigns', moduleName: 'Marketing', breadcrumb: 'Marketing' },
            loadComponent: () =>
              import('./crm/features/settings/pages/marketing-settings.page').then((m) => m.MarketingSettingsPage)
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
            path: 'email-accounts',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.emailsManage, breadcrumb: 'Email Accounts' },
            loadComponent: () => import('./crm/features/settings/pages/email-accounts.page').then((m) => m.EmailAccountsPage)
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
            data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'Deal Automation' },
            loadComponent: () =>
              import('./crm/features/settings/pages/opportunity-automation.page').then((m) => m.OpportunityAutomationPage)
          },
          {
            path: 'deal-health',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Deal Health Scoring' },
            loadComponent: () =>
              import('./crm/features/settings/pages/deal-health-settings.page').then((m) => m.DealHealthSettingsPage)
          },
          {
            path: 'workflow-builder',
            pathMatch: 'full',
            redirectTo: '/app/workflows/designer'
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
            loadComponent: () => import('./crm/features/settings/pages/audit-log.page').then((m) => m.AuditLogPage)
          },
          {
            path: 'lookups/lead-statuses',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Lead Statuses' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-lead-statuses.page').then((m) => m.LookupLeadStatusesPage)
          },
          {
            path: 'lookups/opportunity-stages',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Opportunity Stages' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-opportunity-stages.page').then(
                (m) => m.LookupOpportunityStagesPage
              )
          },
          {
            path: 'lookups/currencies',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Currencies' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-currencies.page').then((m) => m.LookupCurrenciesPage)
          },
          {
            path: 'lookups/phone-types',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Phone Types' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-phone-types.page').then((m) => m.LookupPhoneTypesPage)
          },
          {
            path: 'lookups/cadence-channels',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Cadence Channels' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-cadence-channels.page').then(
                (m) => m.LookupCadenceChannelsPage
              )
          },
          {
            path: 'lookups/account-types',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Account Types' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-account-types.page').then((m) => m.LookupAccountTypesPage)
          },
          {
            path: 'lookups/account-sources',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Account Sources' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-account-sources.page').then((m) => m.LookupAccountSourcesPage)
          },
          {
            path: 'lookups/customer-ratings',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Customer Ratings' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-customer-ratings.page').then(
                (m) => m.LookupCustomerRatingsPage
              )
          },
          {
            path: 'lookups/contact-buying-roles',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Contact Buying Roles' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-contact-buying-roles.page').then(
                (m) => m.LookupContactBuyingRolesPage
              )
          },
          {
            path: 'lookups/activity-types',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Activity Types' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-activity-types.page').then((m) => m.LookupActivityTypesPage)
          },
          {
            path: 'lookups/activity-priorities',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Activity Priorities' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-activity-priorities.page').then(
                (m) => m.LookupActivityPrioritiesPage
              )
          },
          {
            path: 'lookups/helpdesk-case-statuses',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Case Statuses' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-helpdesk-case-statuses.page').then((m) => m.LookupHelpdeskCaseStatusesPage)
          },
          {
            path: 'lookups/helpdesk-priorities',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Helpdesk Priorities' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-helpdesk-priorities.page').then((m) => m.LookupHelpdeskPrioritiesPage)
          },
          {
            path: 'lookups/helpdesk-severities',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Helpdesk Severities' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-helpdesk-severities.page').then((m) => m.LookupHelpdeskSeveritiesPage)
          },
          {
            path: 'lookups/helpdesk-sources',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Helpdesk Sources' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-helpdesk-sources.page').then((m) => m.LookupHelpdeskSourcesPage)
          },
          {
            path: 'lookups/property-statuses',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Property Statuses' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-property-statuses.page').then((m) => m.LookupPropertyStatusesPage)
          },
          {
            path: 'lookups/property-types',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Property Types' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-property-types.page').then((m) => m.LookupPropertyTypesPage)
          },
          {
            path: 'lookups/deal-types',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Deal Types' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-deal-types.page').then((m) => m.LookupDealTypesPage)
          },
          {
            path: 'lookups/deal-segments',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Deal Segments' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-deal-segments.page').then((m) => m.LookupDealSegmentsPage)
          },
          {
            path: 'lookups/document-categories',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Document Categories' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-document-categories.page').then((m) => m.LookupDocumentCategoriesPage)
          },
          {
            path: 'lookups/lead-disqualification-reasons',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Lead Disqualification Reasons' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-lead-disqualification-reasons.page').then((m) => m.LookupLeadDisqualificationReasonsPage)
          },
          {
            path: 'lookups/lead-loss-reasons',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Lead Loss Reasons' },
            loadComponent: () =>
              import('./crm/features/settings/pages/lookup-lead-loss-reasons.page').then((m) => m.LookupLeadLossReasonsPage)
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
        path: 'workflows',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Workflows', icon: 'pi-share-alt' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'designer' },
          {
            path: 'designer',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Workflow Builder' },
            loadComponent: () =>
              import('./crm/features/workflows/pages/workflow-designer.page').then((m) => m.WorkflowDesignerPage)
          },
          {
            path: 'designer/advanced',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Advanced Workflow Builder' },
            loadComponent: () =>
              import('./crm/features/workflows/pages/workflow-designer-advanced.page').then((m) => m.WorkflowDesignerAdvancedPage)
          },
          {
            path: 'designer/legacy',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationManage, breadcrumb: 'Legacy Workflow Designer' },
            loadComponent: () =>
              import('./crm/features/workflows/pages/workflow-designer-legacy.page').then((m) => m.WorkflowDesignerLegacyPage)
          },
          {
            path: 'executions',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.administrationView, breadcrumb: 'Workflow Executions' },
            loadComponent: () =>
              import('./crm/features/workflows/pages/workflow-execution-viewer.page').then((m) => m.WorkflowExecutionViewerPage)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
