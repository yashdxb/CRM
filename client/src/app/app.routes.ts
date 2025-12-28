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
    loadComponent: () => import('./features/landing/landing.page').then((m) => m.LandingPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login.page').then((m) => m.LoginPage)
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
        data: { permission: PERMISSION_KEYS.dashboard, breadcrumb: 'Dashboard', icon: 'pi-chart-bar' },
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard.page').then((m) => m.DashboardPage)
      },
      {
        path: 'customers',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.customers, breadcrumb: 'Customers', icon: 'pi-building' },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/customers/pages/customers.page').then((m) => m.CustomersPage)
          },
          {
            path: 'new',
            data: { breadcrumb: 'New Customer' },
            loadComponent: () =>
              import('./features/customers/pages/customer-form.page').then((m) => m.CustomerFormPage)
          },
          {
            path: ':id/edit',
            data: { breadcrumb: 'Edit Customer' },
            loadComponent: () =>
              import('./features/customers/pages/customer-form.page').then((m) => m.CustomerFormPage)
          }
        ]
      },
      {
        path: 'contacts',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.contacts, breadcrumb: 'Contacts', icon: 'pi-id-card' },
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./features/contacts/pages/contacts.page').then((m) => m.ContactsPage)
          },
          {
            path: 'new',
            data: { breadcrumb: 'New Contact' },
            loadComponent: () =>
              import('./features/contacts/pages/contact-form.page').then((m) => m.ContactFormPage)
          },
          {
            path: ':id/edit',
            data: { breadcrumb: 'Edit Contact' },
            loadComponent: () =>
              import('./features/contacts/pages/contact-form.page').then((m) => m.ContactFormPage)
          }
        ]
      },
      {
        path: 'leads',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'Leads', icon: 'pi-bullseye' },
        pathMatch: 'full',
        loadComponent: () => import('./features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/pipeline',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'Pipeline', icon: 'pi-sitemap' },
        loadComponent: () => import('./features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/import',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'Import Leads', icon: 'pi-upload' },
        loadComponent: () => import('./features/leads/pages/leads.page').then((m) => m.LeadsPage)
      },
      {
        path: 'leads/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'New Lead', icon: 'pi-plus' },
        loadComponent: () => import('./features/leads/pages/lead-form.page').then((m) => m.LeadFormPage)
      },
      {
        path: 'leads/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'Edit Lead', icon: 'pi-pencil' },
        loadComponent: () => import('./features/leads/pages/lead-form.page').then((m) => m.LeadFormPage)
      },
      {
        path: 'leads/:id/convert',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.leads, breadcrumb: 'Convert Lead', icon: 'pi-bolt' },
        loadComponent: () => import('./features/leads/pages/lead-convert.page').then((m) => m.LeadConvertPage)
      },
      {
        path: 'opportunities',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunities, breadcrumb: 'Opportunities', icon: 'pi-chart-line' },
        loadComponent: () =>
          import('./features/opportunities/pages/opportunities.page').then((m) => m.OpportunitiesPage)
      },
      {
        path: 'opportunities/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.opportunities, breadcrumb: 'New Opportunity', icon: 'pi-plus' },
        loadComponent: () =>
          import('./features/opportunities/pages/opportunity-form.page').then((m) => m.OpportunityFormPage)
      },
      {
        path: 'activities',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activities, breadcrumb: 'Activities', icon: 'pi-calendar' },
        loadComponent: () =>
          import('./features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/calendar',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activities, breadcrumb: 'Calendar', icon: 'pi-calendar-plus' },
        loadComponent: () =>
          import('./features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/tasks',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activities, breadcrumb: 'Tasks', icon: 'pi-check-square' },
        loadComponent: () =>
          import('./features/activities/pages/activities.page').then((m) => m.ActivitiesPage)
      },
      {
        path: 'activities/new',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activities, breadcrumb: 'New Activity', icon: 'pi-plus' },
        loadComponent: () =>
          import('./features/activities/pages/activity-form.page').then((m) => m.ActivityFormPage)
      },
      {
        path: 'activities/:id/edit',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.activities, breadcrumb: 'Edit Activity', icon: 'pi-pencil' },
        loadComponent: () =>
          import('./features/activities/pages/activity-form.page').then((m) => m.ActivityFormPage)
      },
      {
        path: 'settings',
        canActivate: [roleGuard],
        data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Settings', icon: 'pi-cog' },
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'users' },
          {
            path: 'users',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Users' },
            pathMatch: 'full',
            loadComponent: () => import('./features/settings/pages/settings.page').then((m) => m.SettingsPage)
          },
          {
            path: 'users/:id/edit',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Edit User' },
            loadComponent: () => import('./features/settings/pages/user-edit.page').then((m) => m.UserEditPage)
          },
          {
            path: 'roles',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Roles' },
            loadComponent: () => import('./features/settings/pages/roles.page').then((m) => m.RolesPage)
          },
          {
            path: 'roles/new',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'New Role' },
            loadComponent: () => import('./features/settings/pages/role-form.page').then((m) => m.RoleFormPage)
          },
          {
            path: 'roles/:id/edit',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Edit Role' },
            loadComponent: () => import('./features/settings/pages/role-form.page').then((m) => m.RoleFormPage)
          },
          {
            path: 'invite',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Invite User' },
            loadComponent: () => import('./features/settings/pages/invite-user.page').then((m) => m.InviteUserPage)
          },
          {
            path: 'workspace',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Workspace Settings' },
            loadComponent: () => import('./features/settings/pages/workspace-settings.page').then((m) => m.WorkspaceSettingsPage)
          },
          {
            path: 'lead-assignment',
            data: { permission: PERMISSION_KEYS.administration, breadcrumb: 'Lead Assignment' },
            loadComponent: () => import('./features/settings/pages/lead-assignment.page').then((m) => m.LeadAssignmentPage)
          },
          {
            path: 'tenants',
            data: { permission: PERMISSION_KEYS.tenants, breadcrumb: 'Tenants' },
            loadComponent: () => import('./features/settings/pages/tenants.page').then((m) => m.TenantsPage)
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
