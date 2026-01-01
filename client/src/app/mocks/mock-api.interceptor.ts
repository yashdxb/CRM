import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { UpsertRoleRequest, UpsertUserRequest } from '../crm/features/settings/models/user-admin.model';
import { SaveOpportunityRequest } from '../crm/features/opportunities/services/opportunity-data.service';
import { PERMISSION_KEYS } from '../core/auth/permission.constants';
import {
  buildDashboardSummary,
  createRole,
  createUser,
  deleteRole,
  deleteUser,
  findRole,
  findUser,
  getWorkspaceSettings,
  updateWorkspaceSettings,
  getPermissionDefinitions,
  listRoles,
  mockCustomers,
  resetUserPassword,
  searchActivities,
  searchCustomers,
  searchOpportunities,
  searchUsers,
  setUserActiveStatus,
  updateRole,
  updateUser,
  createOpportunity,
  getOpportunityById,
  updateOpportunity,
  deleteOpportunity
} from './mock-db';

const toNumber = (value: string | null, fallback: number) => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizePath = (url: string) => {
  const path = (() => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      try {
        return new URL(url).pathname;
      } catch {
        return url;
      }
    }
    return url;
  })();

  return path.split('?')[0];
};

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const path = normalizePath(req.url);

  if (!environment.useMockApi || !path.startsWith('/api')) {
    return next(req);
  }

  const respond = <T>(body: T, status = 200, delayMs = 120) => of(new HttpResponse({ status, body })).pipe(delay(delayMs));

  // Mock login endpoint - creates a JWT with all permissions for development
  if (req.method === 'POST' && path === '/api/auth/login') {
    const allPermissions = Object.values(PERMISSION_KEYS);
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: 'mock-user-001',
      email: 'admin@example.com',
      name: 'Admin User',
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': ['System Administrator'],
      'crm:permission': allPermissions,
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 hours from now
    }));
    const signature = btoa('mock-signature');
    const mockToken = `${header}.${payload}.${signature}`;

    return respond({
      accessToken: mockToken,
      expiresAtUtc: new Date(Date.now() + 86400000).toISOString(),
      email: 'admin@example.com',
      fullName: 'Admin User',
      roles: ['System Administrator'],
      permissions: allPermissions,
      tenantKey: 'default'
    }, 200, 100);
  }

  if (req.method === 'GET' && path.startsWith('/api/customers/')) {
    const id = path.split('/').pop();
    const customer = mockCustomers.find((c) => c.id === id);
    return of(new HttpResponse({ status: customer ? 200 : 404, body: customer ?? { message: 'Not found' } })).pipe(delay(120));
  }

  if (req.method === 'GET' && path.startsWith('/api/customers')) {
    const page = toNumber(req.params.get('page'), 1);
    const pageSize = toNumber(req.params.get('pageSize'), 10);
    const status = req.params.get('status') as any;
    const search = req.params.get('search') ?? undefined;

    const result = searchCustomers({ page, pageSize, status, search });
    return of(new HttpResponse({ status: 200, body: result })).pipe(delay(140));
  }

  if (req.method === 'GET' && path.startsWith('/api/activities')) {
    const page = toNumber(req.params.get('page'), 1);
    const pageSize = toNumber(req.params.get('pageSize'), 10);
    const status = req.params.get('status') as any;
    const search = req.params.get('search') ?? undefined;
    const ownerId = req.params.get('ownerId') ?? undefined;
    const type = req.params.get('type') as any;

    const result = searchActivities({ page, pageSize, status, search, ownerId, type });
    return of(new HttpResponse({ status: 200, body: result })).pipe(delay(140));
  }

  if (req.method === 'GET' && /^\/api\/opportunities\/[^/]+$/.test(path)) {
    const id = path.split('/').pop() ?? '';
    const opportunity = getOpportunityById(id);
    return respond(opportunity ?? { message: 'Not found' }, opportunity ? 200 : 404, 120);
  }

  if (req.method === 'GET' && path.startsWith('/api/opportunities')) {
    const page = toNumber(req.params.get('page'), 1);
    const pageSize = toNumber(req.params.get('pageSize'), 10);
    const stage = req.params.get('stage') ?? undefined;
    const search = req.params.get('search') ?? undefined;

    const result = searchOpportunities({ page, pageSize, stage, search });
    return respond(result, 200, 140);
  }

  if (req.method === 'POST' && path === '/api/opportunities') {
    const payload = req.body as SaveOpportunityRequest;
    const created = createOpportunity(payload);
    return respond(created, 201, 140);
  }

  if (req.method === 'PUT' && /^\/api\/opportunities\/.+/.test(path)) {
    const match = path.match(/^\/api\/opportunities\/([^/]+)$/);
    if (match) {
      const payload = req.body as SaveOpportunityRequest;
      const updated = updateOpportunity(match[1], payload);
      return respond(updated ? null : { message: 'Not found' }, updated ? 204 : 404, 140);
    }
  }

  if (req.method === 'DELETE' && /^\/api\/opportunities\/.+/.test(path)) {
    const match = path.match(/^\/api\/opportunities\/([^/]+)$/);
    if (match) {
      const ok = deleteOpportunity(match[1]);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'GET' && path === '/api/dashboard/summary') {
    const summary = buildDashboardSummary();
    return of(new HttpResponse({ status: 200, body: summary })).pipe(delay(100));
  }

  if (req.method === 'POST' && path === '/api/auth/logout') {
    return respond(null, 204, 80);
  }

  if (req.method === 'GET' && path === '/api/workspace') {
    return respond(getWorkspaceSettings(), 200, 120);
  }

  if (req.method === 'PUT' && path === '/api/workspace') {
    return respond(updateWorkspaceSettings(req.body as any), 200, 140);
  }

  if (req.method === 'GET' && path === '/api/users') {
    const response = searchUsers({
      search: req.params.get('search') ?? undefined,
      includeInactive: req.params.get('includeInactive') === 'true',
      page: toNumber(req.params.get('page'), 1),
      pageSize: toNumber(req.params.get('pageSize'), 50)
    });
    return respond(response, 200, 140);
  }

  if (req.method === 'POST' && path === '/api/users') {
    const payload = req.body as UpsertUserRequest;
    const created = createUser(payload);
    return respond(created, 201, 140);
  }

  if (req.method === 'GET' && /^\/api\/users\/.+/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)$/);
    if (match) {
      const user = findUser(match[1]);
      return respond(user ?? { message: 'Not found' }, user ? 200 : 404, 130);
    }
  }

  if (req.method === 'PUT' && /^\/api\/users\/.+/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)$/);
    if (match) {
      const payload = req.body as UpsertUserRequest;
      const updated = updateUser(match[1], payload);
      return respond(updated ? null : { message: 'Not found' }, updated ? 204 : 404, 140);
    }
  }

  if (req.method === 'POST' && /reset-password$/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)\/reset-password$/);
    if (match) {
      const ok = resetUserPassword(match[1]);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'POST' && /activate$/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)\/activate$/);
    if (match) {
      const ok = setUserActiveStatus(match[1], true);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'POST' && /deactivate$/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)\/deactivate$/);
    if (match) {
      const ok = setUserActiveStatus(match[1], false);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'DELETE' && /^\/api\/users\/.+/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)$/);
    if (match) {
      const ok = deleteUser(match[1]);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'GET' && path === '/api/roles') {
    return respond(listRoles(), 200, 120);
  }

  if (req.method === 'GET' && /^\/api\/roles\/.+/.test(path) && path !== '/api/roles/permissions') {
    const match = path.match(/^\/api\/roles\/([^/]+)$/);
    if (match) {
      const role = findRole(match[1]);
      return respond(role ?? { message: 'Not found' }, role ? 200 : 404, 120);
    }
  }

  if (req.method === 'GET' && path === '/api/roles/permissions') {
    return respond(getPermissionDefinitions(), 200, 120);
  }

  if (req.method === 'POST' && path === '/api/roles') {
    const payload = req.body as UpsertRoleRequest;
    return respond(createRole(payload), 201, 130);
  }

  if (req.method === 'PUT' && /^\/api\/roles\/.+/.test(path)) {
    const match = path.match(/^\/api\/roles\/([^/]+)$/);
    if (match) {
      const payload = req.body as UpsertRoleRequest;
      const role = updateRole(match[1], payload);
      return respond(role ?? { message: 'Not found' }, role ? 200 : 404, 130);
    }
  }

  if (req.method === 'DELETE' && /^\/api\/roles\/.+/.test(path)) {
    const match = path.match(/^\/api\/roles\/([^/]+)$/);
    if (match) {
      const ok = deleteRole(match[1]);
      return respond(ok ? null : { message: 'Unable to delete role' }, ok ? 204 : 400, 130);
    }
  }

  return next(req);
};
