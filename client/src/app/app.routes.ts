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
        path: 'opportunities',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesView, breadcrumb: 'Opportunities', icon: 'pi-chart-line' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunities.page').then((m) => m.OpportunitiesPage)
      },
      {
        path: 'opportunities/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'New Opportunity', icon: 'pi-plus' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'opportunities/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunitiesManage, breadcrumb: 'Edit Opportunity', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./crm/features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
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
            loadComponent: () => import('./crm/features/settings/pages/roles.page').then((m) => m.RolesPage)
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
            path: 'lead-assignment',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Lead Assignment' },
            loadComponent: () => import('./crm/features/settings/pages/lead-assignment.page').then((m) => m.LeadAssignmentPage)
          },
          {
            path: 'lead-assignment/:id/edit',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.leadsManage, breadcrumb: 'Edit Lead Assignment' },
            loadComponent: () => import('./crm/features/settings/pages/lead-assignment.page').then((m) => m.LeadAssignmentPage)
          },
          {
            path: 'tenants',
            canActivate: [roleGuard],
            data: { permission: PERMISSION_KEYS.tenantsView, breadcrumb: 'Tenants' },
            loadComponent: () => import('./crm/features/settings/pages/tenants.page').then((m) => m.TenantsPage)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
