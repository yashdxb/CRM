import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { UpsertRoleRequest, UpsertUserRequest } from '../crm/features/settings/models/user-admin.model';
import { SaveOpportunityRequest } from '../crm/features/opportunities/services/opportunity-data.service';
import { PERMISSION_KEYS } from '../core/auth/permission.constants';
import { SavePropertyRequest } from '../crm/features/properties/services/property-data.service';
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
  lookupActiveUsers,
  listRoles,
  isUserAudienceRoleAssignmentAllowed,
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
  deleteOpportunity,
  searchProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getPriceHistory,
  addPriceChange,
  getShowings,
  createShowing,
  updateShowing,
  getDocuments,
  addDocument,
  deleteDocument,
  getActivities,
  createActivity,
  updateActivity,
  getMlsFeeds,
  createMlsFeed,
  triggerMlsImport,
  getMlsImportHistory,
  getCmaReport,
  getSignatureRequests,
  createSignatureRequest,
  getAlertRules,
  createAlertRule,
  toggleAlertRule,
  getAlertNotifications,
  searchContacts
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

  // Mock tenant-context endpoint — enable all feature flags for development
  if (req.method === 'GET' && path === '/api/tenant-context') {
    return respond({
      tenantKey: 'default',
      tenantName: 'Mock Tenant',
      featureFlags: {
        properties: true,
        leads: true,
        opportunities: true,
        contacts: true,
        helpdesk: true,
        marketing: true,
        reports: true,
        activities: true,
        emails: true,
        workflows: true,
        'communications.emailDelivery': false,
        'communications.emailDelivery.invites': false,
        'communications.emailDelivery.security': false,
        'communications.emailDelivery.approvals': false,
        'communications.emailDelivery.proposals': false,
        'communications.emailDelivery.marketing': false,
        'communications.emailDelivery.notifications': false,
        'communications.emailDelivery.mailbox': false,
        'communications.emailDelivery.statusNotifications': false
      }
    });
  }

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

  if (req.method === 'POST' && path === '/api/opportunities/duplicate-check') {
    return respond({ decision: 'allow', isBlocked: false, hasWarnings: false, matches: [] }, 200, 80);
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

  // ── Contacts ──
  if (req.method === 'GET' && path === '/api/contacts') {
    const page = toNumber(req.params.get('page'), 1);
    const pageSize = toNumber(req.params.get('pageSize'), 200);
    const search = req.params.get('search') ?? undefined;
    const accountId = req.params.get('accountId') ?? undefined;
    const result = searchContacts({ page, pageSize, search, accountId });
    return respond(result, 200, 120);
  }

  // ── Properties ──

  // MLS/IDX Feeds (G1) — must come before generic property routes
  if (req.method === 'GET' && path === '/api/properties/mls-feeds') {
    return respond(getMlsFeeds(), 200, 120);
  }
  if (req.method === 'POST' && path === '/api/properties/mls-feeds') {
    return respond(createMlsFeed(req.body as any), 201, 140);
  }
  if (req.method === 'POST' && /^\/api\/properties\/mls-feeds\/[^/]+\/import$/.test(path)) {
    const feedId = path.split('/')[4];
    return respond(triggerMlsImport(feedId), 200, 800);
  }
  if (req.method === 'GET' && path === '/api/properties/mls-imports') {
    return respond(getMlsImportHistory(), 200, 120);
  }

  if (req.method === 'GET' && /^\/api\/properties\/[^/]+$/.test(path)) {
    const id = path.split('/').pop() ?? '';
    const property = getPropertyById(id);
    return respond(property ?? { message: 'Not found' }, property ? 200 : 404, 120);
  }

  if (req.method === 'GET' && path.startsWith('/api/properties')) {
    const page = toNumber(req.params.get('page'), 1);
    const pageSize = toNumber(req.params.get('pageSize'), 10);
    const status = req.params.get('status') ?? undefined;
    const propertyType = req.params.get('propertyType') ?? undefined;
    const city = req.params.get('city') ?? undefined;
    const search = req.params.get('search') ?? undefined;
    const result = searchProperties({ page, pageSize, status: status as any, propertyType: propertyType as any, city, search });
    return respond(result, 200, 140);
  }

  if (req.method === 'POST' && path === '/api/properties') {
    const payload = req.body as SavePropertyRequest;
    const created = createProperty(payload);
    return respond(created, 201, 140);
  }

  if (req.method === 'PUT' && /^\/api\/properties\/.+/.test(path)) {
    const match = path.match(/^\/api\/properties\/([^/]+)$/);
    if (match) {
      const payload = req.body as SavePropertyRequest;
      const updated = updateProperty(match[1], payload);
      return respond(updated ? null : { message: 'Not found' }, updated ? 204 : 404, 140);
    }
  }

  if (req.method === 'DELETE' && /^\/api\/properties\/.+/.test(path)) {
    const match = path.match(/^\/api\/properties\/([^/]+)$/);
    if (match) {
      const ok = deleteProperty(match[1]);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  // ── Property Price History (X4) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/price-history$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getPriceHistory(id), 200, 100);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/price-history$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    const record = addPriceChange({ propertyId: id, previousPrice: body.previousPrice, newPrice: body.newPrice, changedAtUtc: new Date().toISOString(), changedBy: body.changedBy, reason: body.reason });
    return respond(record, 201, 100);
  }

  // ── Property Showings (X3) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/showings$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getShowings(id), 200, 100);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/showings$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    const record = createShowing({ propertyId: id, agentId: body.agentId, agentName: body.agentName, visitorName: body.visitorName, visitorEmail: body.visitorEmail, visitorPhone: body.visitorPhone, scheduledAtUtc: body.scheduledAtUtc, durationMinutes: body.durationMinutes, feedback: body.feedback, rating: body.rating, status: body.status || 'Scheduled' });
    return respond(record, 201, 100);
  }
  if (req.method === 'PUT' && /^\/api\/properties\/[^/]+\/showings\/[^/]+$/.test(path)) {
    const parts = path.split('/');
    const showingId = parts[5];
    const updated = updateShowing(showingId, req.body as any);
    return respond(updated ?? { message: 'Not found' }, updated ? 200 : 404, 100);
  }

  // ── Property Documents (X1) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/documents$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getDocuments(id), 200, 100);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/documents$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    const record = addDocument({ propertyId: id, fileName: body.fileName, fileUrl: body.fileUrl || '/assets/mock/uploaded.pdf', fileSize: body.fileSize, mimeType: body.mimeType, category: body.category || 'Other', uploadedBy: body.uploadedBy, uploadedAtUtc: new Date().toISOString() });
    return respond(record, 201, 100);
  }
  if (req.method === 'DELETE' && /^\/api\/properties\/[^/]+\/documents\/[^/]+$/.test(path)) {
    const docId = path.split('/')[5];
    const ok = deleteDocument(docId);
    return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 100);
  }

  // ── Property Activities (X2) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/activities$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getActivities(id), 200, 100);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/activities$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    const record = createActivity({ propertyId: id, type: body.type || 'Task', subject: body.subject, description: body.description, dueDate: body.dueDate, status: body.status || 'Open', priority: body.priority || 'Medium', assignedToId: body.assignedToId, assignedToName: body.assignedToName, createdByName: body.createdByName });
    return respond(record, 201, 100);
  }
  if (req.method === 'PUT' && /^\/api\/properties\/[^/]+\/activities\/[^/]+$/.test(path)) {
    const actId = path.split('/')[5];
    const updated = updateActivity(actId, req.body as any);
    return respond(updated ?? { message: 'Not found' }, updated ? 200 : 404, 100);
  }

  // ── CMA Reports (G3) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/cma$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getCmaReport(id), 200, 200);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/cma$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getCmaReport(id), 201, 500);
  }

  // ── E-Signature Requests (G4) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/signatures$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getSignatureRequests(id), 200, 120);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/signatures$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    body.propertyId = id;
    return respond(createSignatureRequest(body), 201, 140);
  }

  // ── Property Alerts (G5) ──
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/alerts$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getAlertRules(id), 200, 100);
  }
  if (req.method === 'POST' && /^\/api\/properties\/[^/]+\/alerts$/.test(path)) {
    const id = path.split('/')[3];
    const body = req.body as any;
    body.propertyId = id;
    return respond(createAlertRule(body), 201, 140);
  }
  if (req.method === 'PUT' && /^\/api\/properties\/[^/]+\/alerts\/[^/]+$/.test(path)) {
    const ruleId = path.split('/')[5];
    const body = req.body as any;
    const updated = toggleAlertRule(ruleId, body.isActive);
    return respond(updated ?? { message: 'Not found' }, updated ? 200 : 404, 100);
  }
  if (req.method === 'GET' && /^\/api\/properties\/[^/]+\/alert-notifications$/.test(path)) {
    const id = path.split('/')[3];
    return respond(getAlertNotifications(id), 200, 120);
  }

  // ── Opportunity Contact Roles (Stakeholders) ──
  if (req.method === 'GET' && /^\/api\/opportunities\/[^/]+\/contact-roles$/.test(path)) {
    return respond([], 200, 100);
  }

  if (req.method === 'POST' && /^\/api\/opportunities\/[^/]+\/contact-roles$/.test(path)) {
    const body = req.body as any;
    const fakeRole = {
      id: crypto.randomUUID(),
      contactId: body.contactId,
      contactName: 'Mock Contact',
      email: 'mock@example.com',
      jobTitle: 'Stakeholder',
      role: body.role,
      notes: body.notes ?? null,
      isPrimary: body.isPrimary ?? false,
      createdAtUtc: new Date().toISOString(),
      updatedAtUtc: null
    };
    return respond(fakeRole, 201, 120);
  }

  if (req.method === 'DELETE' && /^\/api\/opportunities\/[^/]+\/contact-roles\/[^/]+$/.test(path)) {
    return respond(null, 204, 100);
  }

  // ── Opportunity Health Score ──
  if (req.method === 'GET' && /^\/api\/opportunities\/[^/]+\/health-score$/.test(path)) {
    const mockHealthScore = {
      score: 68,
      label: 'Good',
      confidence: 0.75,
      rationale: 'Deal is progressing well. Activity recency and stakeholder coverage could be improved.',
      factors: [
        { factor: 'Stage Progression', score: 9, maxScore: 15 },
        { factor: 'Activity Recency', score: 12, maxScore: 20 },
        { factor: 'Close Date Health', score: 12, maxScore: 15 },
        { factor: 'Stakeholder Coverage', score: 4, maxScore: 10 },
        { factor: 'Deal Completeness', score: 12, maxScore: 15 },
        { factor: 'Team Coverage', score: 6, maxScore: 10 },
        { factor: 'Process Compliance', score: 8, maxScore: 15 }
      ],
      computedUtc: new Date().toISOString()
    };
    return respond(mockHealthScore, 200, 300);
  }

  // ── Opportunity Stage History ──
  if (req.method === 'GET' && /^\/api\/opportunities\/[^/]+\/history$/.test(path)) {
    const now = new Date();
    const daysAgo = (d: number) => new Date(now.getTime() - d * 86_400_000).toISOString();
    const mockHistory = [
      { id: 'sh-1', stage: 'Prospecting', changedAtUtc: daysAgo(42), changedBy: 'Jane Smith', notes: 'Deal created' },
      { id: 'sh-2', stage: 'Qualification', changedAtUtc: daysAgo(35), changedBy: 'Jane Smith', notes: 'Qualified after discovery call' },
      { id: 'sh-3', stage: 'Proposal', changedAtUtc: daysAgo(21), changedBy: 'John Doe', notes: 'Proposal sent' },
      { id: 'sh-4', stage: 'Negotiation', changedAtUtc: daysAgo(10), changedBy: 'Jane Smith', notes: 'Terms under review' }
    ];
    return respond(mockHistory, 200, 200);
  }

  if (req.method === 'GET' && path === '/api/dashboard/summary') {
    const period = (req.params.get('period') as 'today' | 'week' | 'month' | 'range' | null) ?? 'month';
    const fromUtc = req.params.get('fromUtc') ?? undefined;
    const toUtc = req.params.get('toUtc') ?? undefined;
    const summary = buildDashboardSummary(period, fromUtc, toUtc);
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

  if (req.method === 'GET' && path === '/api/users/lookup') {
    const items = lookupActiveUsers(req.params.get('search') ?? undefined, toNumber(req.params.get('max'), 200));
    return respond(items, 200, 120);
  }

  if (req.method === 'POST' && path === '/api/users') {
    const payload = req.body as UpsertUserRequest;
    if (!isUserAudienceRoleAssignmentAllowed(payload.userAudience ?? 'Internal', payload.roleIds ?? [])) {
      return respond({ message: 'Selected roles are not allowed for External audience users.' }, 400, 120);
    }
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
      if (!isUserAudienceRoleAssignmentAllowed(payload.userAudience ?? 'Internal', payload.roleIds ?? [])) {
        return respond({ message: 'Selected roles are not allowed for External audience users.' }, 400, 120);
      }
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
    // Profile picture delete must be checked BEFORE generic user delete
    const picDeleteMatch = path.match(/^\/api\/users\/([^/]+)\/profile-picture$/);
    if (picDeleteMatch) {
      return respond(null, 204, 120);
    }
    const match = path.match(/^\/api\/users\/([^/]+)$/);
    if (match) {
      const ok = deleteUser(match[1]);
      return respond(ok ? null : { message: 'Not found' }, ok ? 204 : 404, 120);
    }
  }

  if (req.method === 'POST' && /profile-picture$/.test(path)) {
    const match = path.match(/^\/api\/users\/([^/]+)\/profile-picture$/);
    if (match) {
      return respond({ url: `https://mock-storage.example.com/user-avatars/${match[1]}.jpg` }, 200, 300);
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

  // ── Help Desk mock endpoints ──

  if (req.method === 'GET' && path === '/api/helpdesk/cases') {
    return respond({ items: [], total: 0 }, 200, 120);
  }

  if (req.method === 'GET' && /^\/api\/helpdesk\/cases\/[^/]+$/.test(path)) {
    return respond({ message: 'Not found' }, 404, 120);
  }

  if (req.method === 'POST' && path === '/api/helpdesk/cases') {
    const now = new Date().toISOString();
    const id = `mock-case-${Date.now()}`;
    const body = req.body as Record<string, unknown>;
    return respond({
      id,
      caseNumber: `CASE-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: body['subject'] ?? '',
      description: body['description'] ?? '',
      status: 'New',
      priority: body['priority'] ?? 'Medium',
      severity: body['severity'] ?? 'S3',
      category: body['category'] ?? 'General',
      subcategory: body['subcategory'] ?? null,
      source: body['source'] ?? 'Manual',
      accountId: body['accountId'] ?? null,
      accountName: null,
      contactId: body['contactId'] ?? null,
      contactName: null,
      queueId: body['queueId'] ?? null,
      queueName: null,
      ownerUserId: null,
      ownerUserName: null,
      firstResponseDueUtc: now,
      resolutionDueUtc: now,
      firstRespondedUtc: null,
      resolvedUtc: null,
      closedUtc: null,
      closureReason: null,
      csatScore: null,
      csatFeedback: null,
      createdAtUtc: now,
      updatedAtUtc: null
    }, 201, 150);
  }

  if (req.method === 'PUT' && /^\/api\/helpdesk\/cases\/[^/]+$/.test(path)) {
    return respond(null, 204, 120);
  }

  if (req.method === 'POST' && /^\/api\/helpdesk\/cases\/[^/]+\/status$/.test(path)) {
    return respond(null, 204, 120);
  }

  if (req.method === 'POST' && /^\/api\/helpdesk\/cases\/[^/]+\/assign$/.test(path)) {
    return respond(null, 204, 120);
  }

  if (req.method === 'POST' && /^\/api\/helpdesk\/cases\/[^/]+\/comments$/.test(path)) {
    return respond(null, 204, 120);
  }

  if (req.method === 'GET' && path === '/api/helpdesk/queues') {
    return respond([], 200, 100);
  }

  if (req.method === 'GET' && path === '/api/helpdesk/sla-policies') {
    return respond([], 200, 100);
  }

  if (req.method === 'GET' && path === '/api/helpdesk/reports/summary') {
    return respond({
      openCount: 0,
      atRiskCount: 0,
      breachedCount: 0,
      resolvedTodayCount: 0,
      averageCsatScore: null,
      ratedCaseCount: 0,
      topClosureReasons: []
    }, 200, 100);
  }

  // ── Lookup / Picklist CRUD stubs ──
  // Return empty arrays for GET list, 501 for mutations — backend handles real data.

  if (req.method === 'GET' && path === '/api/lookups/lead-statuses') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/opportunity-stages') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/currencies') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/phone-types') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/cadence-channels') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/account-types') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/account-sources') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/customer-ratings') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/contact-buying-roles') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/activity-types') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/activity-priorities') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/helpdesk-case-statuses') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/helpdesk-priorities') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/helpdesk-severities') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/helpdesk-sources') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/property-statuses') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/property-types') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/deal-types') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/deal-segments') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/document-categories') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/lead-disqualification-reasons') {
    return respond([], 200, 80);
  }
  if (req.method === 'GET' && path === '/api/lookups/lead-loss-reasons') {
    return respond([], 200, 80);
  }

  // Catch-all for lookup mutations (POST/PUT/DELETE) — return 501 in mock mode
  if (/^\/api\/lookups\//.test(path) && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return respond({ message: 'Lookup mutations are not available in mock mode' }, 501, 50);
  }

  return next(req);
};
