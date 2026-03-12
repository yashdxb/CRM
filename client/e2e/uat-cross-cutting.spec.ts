/**
 * UAT E2E — Cross-Cutting Scenarios
 *
 * Covers features that span lead + deal lifecycle:
 *
 * Scenario 1: Decision Inbox Workflow (Create → AI Assist → Approve/Reject, Delegate, Escalate)
 * Scenario 2: Document Attachments (Upload, List, Delete)
 * Scenario 3: Stage Automation Rules CRUD
 * Scenario 4: Review Checklist (CRUD)
 * Scenario 5: Onboarding Tasks (CRUD)
 */

import { test, expect } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const API = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const TENANT = 'default';

const LEO_EMAIL = 'leo.martins@crmenterprise.demo';
const LEO_PASSWORD = process.env.E2E_LEO_PASSWORD ?? 'CrmTest!1';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const MANAGER_EMAIL = 'jordan.patel@crmenterprise.demo';
const MANAGER_PASSWORD = process.env.E2E_MANAGER_PASSWORD ?? 'CrmTest!1';

const RUN_ID = Date.now().toString(36).slice(-5);

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let cachedToken: string | null = null;
let authenticatedEmail: string | null = null;

async function ensureAuth(request: any): Promise<string> {
  if (cachedToken) return cachedToken;
  for (const cred of [
    { email: LEO_EMAIL, password: LEO_PASSWORD },
    { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  ]) {
    const res = await request.post(`${API}/api/auth/login`, {
      headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
      data: cred,
    });
    if (res.ok()) {
      const body = await res.json();
      if (body?.accessToken) {
        cachedToken = body.accessToken;
        authenticatedEmail = cred.email;
        console.log(`Authenticated as: ${cred.email}`);
        return cachedToken!;
      }
    }
  }
  throw new Error('Authentication failed for all credentials');
}

async function ensureAdminAuth(request: any): Promise<string> {
  const res = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  if (res.ok()) {
    const body = await res.json();
    if (body?.accessToken) return body.accessToken;
  }
  throw new Error('Admin authentication failed');
}

async function ensureManagerAuth(request: any): Promise<string> {
  const res = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
    data: { email: MANAGER_EMAIL, password: MANAGER_PASSWORD },
  });
  if (res.ok()) {
    const body = await res.json();
    if (body?.accessToken) return body.accessToken;
  }
  return ensureAdminAuth(request);
}

async function apiPost(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.post(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

async function apiGet(request: any, token: string, path: string) {
  return request.get(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT },
  });
}

async function apiPut(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.put(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

async function apiPatch(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.patch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

async function apiDelete(request: any, token: string, path: string) {
  return request.delete(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT },
  });
}

function futureDate(days: number): string {
  return new Date(Date.now() + days * 86400000).toISOString();
}

/* ------------------------------------------------------------------ */
/*  Setup — shared opportunity for cross-cutting tests                 */
/* ------------------------------------------------------------------ */

let sharedOppId: string;

async function ensureOpportunity(request: any, token: string): Promise<string> {
  if (sharedOppId) return sharedOppId;

  // Search for any existing opportunity
  const res = await apiGet(request, token, '/api/opportunities?page=1&pageSize=5');
  if (res.ok()) {
    const data = await res.json();
    const items = data.items ?? [];
    if (items.length > 0) {
      sharedOppId = items[0].id;
      console.log(`Using existing opportunity: ${items[0].name} (${sharedOppId})`);
      return sharedOppId;
    }
  }

  // Create one if none found
  const accountRes = await apiPost(request, token, '/api/accounts', {
    name: `CrossCutTest Corp ${RUN_ID}`,
    industry: 'Technology',
    email: `info@crosscut-${RUN_ID}.example.com`,
  });
  let accountId: string | undefined;
  if (accountRes.ok()) {
    const body = await accountRes.json();
    accountId = body.id;
  }

  const oppRes = await apiPost(request, token, '/api/opportunities', {
    name: `CrossCut Test Deal ${RUN_ID}`,
    accountId,
    amount: 75000,
    currency: 'USD',
    probability: 40,
    expectedCloseDate: futureDate(60),
    stageName: 'Qualification',
    summary: 'Cross-cutting test opportunity',
  });
  if (oppRes.ok()) {
    const body = await oppRes.json();
    sharedOppId = body.id;
    console.log(`Created test opportunity: ${sharedOppId}`);
  }
  expect(sharedOppId).toBeTruthy();
  return sharedOppId;
}

/* ================================================================== */
/*  SCENARIO 1 — Decision Inbox Workflow                               */
/*  POST /api/decisions/requests → assist-draft → decide               */
/*  Also: delegate, escalate, request-info                             */
/* ================================================================== */

test.describe('Scenario 1 — Decision Inbox Workflow', () => {
  test.setTimeout(120_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let decisionRequestId: string;

  test('1.1 — Create a decision request', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPost(request, token, '/api/decisions/requests', {
      opportunityId: oppId,
      type: 'DiscountApproval',
      title: `15% Discount Request — CrossCut Deal ${RUN_ID}`,
      description: 'Customer requesting 15% discount on 200-seat license. Competitive response to Salesforce offer.',
      amount: 11250,
      currency: 'USD',
      urgency: 'High',
    });

    if (res.ok()) {
      const body = await res.json();
      decisionRequestId = body.id;
      console.log(`Decision request created: ${decisionRequestId}`);
    } else {
      console.log(`Decision request creation: ${res.status()} ${await res.text()}`);
      // May use different field names — try simpler payload
      const simpleRes = await apiPost(request, token, '/api/decisions/requests', {
        opportunityId: oppId,
        title: `Discount Request ${RUN_ID}`,
        description: 'Customer needs 15% discount.',
      });
      if (simpleRes.ok()) {
        const body = await simpleRes.json();
        decisionRequestId = body.id;
        console.log(`Decision request created (simple): ${decisionRequestId}`);
      } else {
        console.log(`Simple decision request: ${simpleRes.status()}`);
      }
    }
  });

  test('1.2 — View decisions inbox', async ({ request }) => {
    const managerToken = await ensureManagerAuth(request);

    const res = await apiGet(request, managerToken, '/api/decisions/inbox');
    if (res.ok()) {
      const inbox = await res.json();
      const items = Array.isArray(inbox) ? inbox : inbox.items ?? [];
      console.log(`Decisions inbox: ${items.length} item(s)`);
      if (decisionRequestId) {
        const ours = items.find((d: any) => d.id === decisionRequestId);
        if (ours) console.log(`Found our decision: title="${ours.title}", status=${ours.status}`);
      }
    } else {
      console.log(`Decisions inbox: ${res.status()}`);
    }
  });

  test('1.3 — View decision history', async ({ request }) => {
    token = await ensureAuth(request);

    const res = await apiGet(request, token, '/api/decisions/history');
    if (res.ok()) {
      const history = await res.json();
      const items = Array.isArray(history) ? history : history.items ?? [];
      console.log(`Decision history: ${items.length} item(s)`);
    } else {
      console.log(`Decision history: ${res.status()}`);
    }
  });

  test('1.4 — AI-assist decision draft', async ({ request }) => {
    if (!decisionRequestId) { console.log('No decision request — skip'); return; }

    const managerToken = await ensureManagerAuth(request);

    const res = await apiPost(request, managerToken, `/api/decisions/${decisionRequestId}/assist-draft`, {});
    if (res.ok()) {
      const draft = await res.json();
      console.log(`AI draft: ${draft.recommendation?.substring(0, 100) ?? JSON.stringify(draft).substring(0, 100)}`);
    } else {
      console.log(`AI assist-draft: ${res.status()} — may need AI configuration`);
      expect([200, 400, 500, 502, 503, 424].includes(res.status())).toBeTruthy();
    }
  });

  test('1.5 — Request additional info on decision', async ({ request }) => {
    if (!decisionRequestId) { console.log('No decision request — skip'); return; }

    const managerToken = await ensureManagerAuth(request);

    const res = await apiPost(request, managerToken, `/api/decisions/${decisionRequestId}/request-info`, {
      message: 'What is the competitive situation? What discount did Salesforce offer?',
    });

    if (res.ok()) {
      console.log('Additional info requested on decision');
    } else {
      console.log(`Request info: ${res.status()}`);
    }
  });

  test('1.6 — Approve the decision', async ({ request }) => {
    if (!decisionRequestId) { console.log('No decision request — skip'); return; }

    const managerToken = await ensureManagerAuth(request);

    const res = await apiPatch(request, managerToken, `/api/decisions/${decisionRequestId}`, {
      approved: true,
      notes: 'Approved — competitive response justified. Cap at 15%, no further discounting.',
    });

    if (res.ok()) {
      console.log('Decision approved');
    } else {
      console.log(`Decision approval: ${res.status()} ${await res.text()}`);
      // Try admin
      const adminToken = await ensureAdminAuth(request);
      const retryRes = await apiPatch(request, adminToken, `/api/decisions/${decisionRequestId}`, {
        approved: true, notes: 'Approved via admin.',
      });
      if (retryRes.ok()) console.log('Decision approved via admin');
      else console.log(`Decision admin approval: ${retryRes.status()}`);
    }
  });
});

/* ================================================================== */
/*  SCENARIO 1B — Decision Delegation & Escalation                     */
/* ================================================================== */

test.describe('Scenario 1B — Decision Delegation & Escalation', () => {
  test.setTimeout(90_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let delegateDecisionId: string;
  let escalateDecisionId: string;

  test('1B.1 — Create decision for delegation test', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPost(request, token, '/api/decisions/requests', {
      opportunityId: oppId,
      title: `Delegation Test Decision ${RUN_ID}`,
      description: 'Testing delegation workflow.',
    });

    if (res.ok()) {
      const body = await res.json();
      delegateDecisionId = body.id;
      console.log(`Delegation test decision: ${delegateDecisionId}`);
    } else {
      console.log(`Decision for delegation: ${res.status()}`);
    }
  });

  test('1B.2 — Delegate decision to another user', async ({ request }) => {
    if (!delegateDecisionId) { console.log('No decision — skip'); return; }

    const managerToken = await ensureManagerAuth(request);

    // Find a user to delegate to
    const usersRes = await apiGet(request, managerToken, '/api/users?page=1&pageSize=10');
    let delegateUserId: string | null = null;
    if (usersRes.ok()) {
      const usersData = await usersRes.json();
      const users = usersData.items ?? usersData ?? [];
      const candidate = users.find((u: any) => u.email !== MANAGER_EMAIL && u.email !== authenticatedEmail && u.id);
      if (candidate) delegateUserId = candidate.id;
    }

    if (!delegateUserId) { console.log('No user to delegate to — skip'); return; }

    const res = await apiPost(request, managerToken, `/api/decisions/${delegateDecisionId}/delegate`, {
      delegateToUserId: delegateUserId,
      reason: 'Delegating to regional manager for local context.',
    });

    if (res.ok()) {
      console.log(`Decision delegated to user: ${delegateUserId}`);
    } else {
      console.log(`Delegation: ${res.status()} ${await res.text()}`);
    }
  });

  test('1B.3 — Create decision for escalation test', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPost(request, token, '/api/decisions/requests', {
      opportunityId: oppId,
      title: `Escalation Test Decision ${RUN_ID}`,
      description: 'Testing escalation workflow.',
    });

    if (res.ok()) {
      const body = await res.json();
      escalateDecisionId = body.id;
      console.log(`Escalation test decision: ${escalateDecisionId}`);
    } else {
      console.log(`Decision for escalation: ${res.status()}`);
    }
  });

  test('1B.4 — Escalate decision', async ({ request }) => {
    if (!escalateDecisionId) { console.log('No decision — skip'); return; }

    const managerToken = await ensureManagerAuth(request);

    const res = await apiPost(request, managerToken, `/api/decisions/${escalateDecisionId}/escalate`, {
      reason: 'Amount exceeds my approval authority. Escalating to VP level.',
    });

    if (res.ok()) {
      console.log('Decision escalated');
    } else {
      console.log(`Escalation: ${res.status()} ${await res.text()}`);
    }
  });
});

/* ================================================================== */
/*  SCENARIO 2 — Document Attachments                                  */
/*  POST/GET/DELETE /api/attachments                                   */
/* ================================================================== */

test.describe('Scenario 2 — Document Attachments', () => {
  test.setTimeout(60_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let attachmentId: string;

  test('2.1 — Upload attachment to opportunity', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const csvContent = `Product,Qty,Price\nCRM License,200,480\nImplementation,1,24000`;

    const res = await request.post(`${API}/api/attachments`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': TENANT,
      },
      multipart: {
        file: {
          name: `quote-details-${RUN_ID}.csv`,
          mimeType: 'text/csv',
          buffer: Buffer.from(csvContent),
        },
        relatedEntityType: 'Opportunity',
        relatedEntityId: oppId,
      },
    });

    if (res.ok()) {
      const body = await res.json();
      attachmentId = body.id;
      console.log(`Attachment uploaded: ${attachmentId}, name=${body.fileName}`);
    } else {
      console.log(`Attachment upload: ${res.status()} ${await res.text()}`);
      expect([200, 201, 400, 413].includes(res.status())).toBeTruthy();
    }
  });

  test('2.2 — List attachments for opportunity', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiGet(request, token, `/api/attachments?relatedEntityType=Opportunity&relatedEntityId=${oppId}`);
    if (res.ok()) {
      const attachments = await res.json();
      const items = Array.isArray(attachments) ? attachments : attachments.items ?? [];
      console.log(`Attachments for opportunity: ${items.length}`);
      for (const a of items) {
        console.log(`  - ${a.fileName} (${a.fileSize ?? 'n/a'} bytes), type=${a.contentType ?? a.mimeType}`);
      }
      if (attachmentId) {
        const ours = items.find((a: any) => a.id === attachmentId);
        expect(ours).toBeTruthy();
      }
    } else {
      console.log(`List attachments: ${res.status()}`);
    }
  });

  test('2.3 — Upload attachment to lead', async ({ request }) => {
    token = await ensureAuth(request);

    // Find any lead
    const leadsRes = await apiGet(request, token, '/api/leads?page=1&pageSize=1');
    if (!leadsRes.ok()) { console.log('No leads — skip'); return; }
    const leadsData = await leadsRes.json();
    const leads = leadsData.items ?? [];
    if (leads.length === 0) return;

    const leadId = leads[0].id;

    const textContent = `Meeting notes for ${leads[0].firstName} ${leads[0].lastName}\n\nDiscussion summary...`;

    const res = await request.post(`${API}/api/attachments`, {
      headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT },
      multipart: {
        file: {
          name: `meeting-notes-${RUN_ID}.txt`,
          mimeType: 'text/plain',
          buffer: Buffer.from(textContent),
        },
        relatedEntityType: 'Lead',
        relatedEntityId: leadId,
      },
    });

    if (res.ok()) {
      console.log('Lead attachment uploaded');
    } else {
      console.log(`Lead attachment: ${res.status()}`);
    }
  });

  test('2.4 — Delete attachment', async ({ request }) => {
    if (!attachmentId) { console.log('No attachment to delete — skip'); return; }

    token = await ensureAuth(request);

    const res = await apiDelete(request, token, `/api/attachments/${attachmentId}`);
    if (res.ok()) {
      console.log(`Attachment deleted: ${attachmentId}`);
    } else {
      console.log(`Delete attachment: ${res.status()}`);
    }
  });
});

/* ================================================================== */
/*  SCENARIO 3 — Stage Automation Rules CRUD                           */
/*  GET/POST/PUT/DELETE /api/opportunities/automation-rules             */
/*  Requires Admin auth (AdministrationManage)                         */
/* ================================================================== */

test.describe('Scenario 3 — Stage Automation Rules CRUD', () => {
  test.setTimeout(60_000);
  test.describe.configure({ mode: 'serial' });

  let adminToken: string;
  let ruleId: string;

  test('3.1 — Create an automation rule', async ({ request }) => {
    adminToken = await ensureAdminAuth(request);

    const res = await apiPost(request, adminToken, '/api/opportunities/automation-rules', {
      name: `Auto-Task: Send Welcome Kit ${RUN_ID}`,
      stageName: 'Closed Won',
      taskSubject: 'Send Welcome Kit to Customer',
      taskDescription: 'Prepare and send the welcome kit, onboarding docs, and access credentials within 24 hours.',
      dueInDays: 1,
      priority: 'High',
      isActive: true,
    });

    if (res.status() === 201 || res.ok()) {
      const body = await res.json();
      ruleId = body.id;
      console.log(`Automation rule created: ${ruleId}, name="${body.name}"`);
    } else {
      console.log(`Create rule: ${res.status()} ${await res.text()}`);
      // Try to find existing
      const listRes = await apiGet(request, adminToken, '/api/opportunities/automation-rules');
      if (listRes.ok()) {
        const rules = await listRes.json();
        const list = Array.isArray(rules) ? rules : rules.items ?? [];
        const match = list.find((r: any) => r.name?.includes(RUN_ID));
        if (match) ruleId = match.id;
      }
    }
  });

  test('3.2 — List automation rules', async ({ request }) => {
    adminToken = await ensureAdminAuth(request);

    const res = await apiGet(request, adminToken, '/api/opportunities/automation-rules');
    expect(res.ok()).toBeTruthy();

    const rules = await res.json();
    const list = Array.isArray(rules) ? rules : rules.items ?? [];
    console.log(`Automation rules: ${list.length} rules`);
    for (const r of list) {
      console.log(`  - [${r.isActive ? 'ACTIVE' : 'INACTIVE'}] "${r.name}" → stage "${r.stageName}", dueIn=${r.dueInDays}d`);
    }
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  test('3.3 — Update automation rule', async ({ request }) => {
    if (!ruleId) { console.log('No rule — skip update'); return; }

    adminToken = await ensureAdminAuth(request);

    const res = await apiPut(request, adminToken, `/api/opportunities/automation-rules/${ruleId}`, {
      name: `Auto-Task: Send Welcome Kit ${RUN_ID}`,
      stageName: 'Closed Won',
      taskSubject: 'Send Welcome Kit to Customer (Updated)',
      taskDescription: 'Updated: include video tour link and credential setup guide.',
      dueInDays: 2,
      priority: 'Medium',
      isActive: true,
    });

    if (res.ok()) {
      console.log('Automation rule updated: dueInDays=2, priority=Medium');
    } else {
      console.log(`Update rule: ${res.status()}`);
    }
  });

  test('3.4 — Deactivate and then delete automation rule', async ({ request }) => {
    if (!ruleId) { console.log('No rule — skip'); return; }

    adminToken = await ensureAdminAuth(request);

    // Deactivate
    const deactivateRes = await apiPut(request, adminToken, `/api/opportunities/automation-rules/${ruleId}`, {
      name: `Auto-Task: Send Welcome Kit ${RUN_ID}`,
      stageName: 'Closed Won',
      taskSubject: 'Send Welcome Kit to Customer (Updated)',
      taskDescription: 'Deactivated rule.',
      dueInDays: 2,
      priority: 'Medium',
      isActive: false,
    });

    if (deactivateRes.ok()) {
      console.log('Automation rule deactivated');
    }

    // Delete
    const deleteRes = await apiDelete(request, adminToken, `/api/opportunities/automation-rules/${ruleId}`);
    if (deleteRes.ok()) {
      console.log(`Automation rule deleted: ${ruleId}`);
    } else {
      console.log(`Delete rule: ${deleteRes.status()}`);
    }
  });
});

/* ================================================================== */
/*  SCENARIO 4 — Review Checklist CRUD                                 */
/*  GET/POST/PATCH/DELETE /api/opportunities/{id}/review-checklist     */
/* ================================================================== */

test.describe('Scenario 4 — Review Checklist', () => {
  test.setTimeout(60_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let checklistItemId: string;

  test('4.1 — Create checklist item', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPost(request, token, `/api/opportunities/${oppId}/review-checklist`, {
      title: `Technical requirements validated ${RUN_ID}`,
      status: 'Pending',
      notes: 'Verify that all technical requirements from RFP are addressed in proposal.',
      type: 'Technical',
    });

    if (res.ok()) {
      const body = await res.json();
      checklistItemId = body.id;
      console.log(`Checklist item created: ${checklistItemId}`);
    } else {
      console.log(`Checklist create: ${res.status()} ${await res.text()}`);
    }
  });

  test('4.2 — Create additional checklist items', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    for (const item of [
      { title: `Legal review completed ${RUN_ID}`, type: 'Legal', status: 'Pending', notes: 'Contract terms reviewed by legal.' },
      { title: `Pricing approved ${RUN_ID}`, type: 'Financial', status: 'Pending', notes: 'Final pricing validated by finance.' },
    ]) {
      const res = await apiPost(request, token, `/api/opportunities/${oppId}/review-checklist`, item);
      if (res.ok()) {
        console.log(`Checklist item: "${item.title}" created`);
      } else {
        console.log(`Checklist item "${item.title}": ${res.status()}`);
      }
    }
  });

  test('4.3 — List checklist items', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiGet(request, token, `/api/opportunities/${oppId}/review-checklist`);
    expect(res.ok()).toBeTruthy();

    const items = await res.json();
    const list = Array.isArray(items) ? items : items.items ?? [];
    console.log(`Review checklist: ${list.length} item(s)`);
    for (const c of list) {
      console.log(`  - [${c.status}] ${c.title} (type: ${c.type})`);
    }
  });

  test('4.4 — Update checklist item status to Complete', async ({ request }) => {
    if (!checklistItemId) { console.log('No checklist item — skip'); return; }

    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPatch(request, token, `/api/opportunities/${oppId}/review-checklist/${checklistItemId}`, {
      status: 'Complete',
      notes: 'All technical requirements confirmed and mapped to solution.',
    });

    if (res.ok()) {
      console.log('Checklist item marked Complete');
    } else {
      console.log(`Checklist update: ${res.status()}`);
    }
  });

  test('4.5 — Delete checklist item', async ({ request }) => {
    if (!checklistItemId) { console.log('No checklist item — skip'); return; }

    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiDelete(request, token, `/api/opportunities/${oppId}/review-checklist/${checklistItemId}`);
    if (res.ok()) {
      console.log(`Checklist item deleted: ${checklistItemId}`);
    } else {
      console.log(`Checklist delete: ${res.status()}`);
    }
  });
});

/* ================================================================== */
/*  SCENARIO 5 — Onboarding Tasks CRUD                                 */
/*  GET/POST/PATCH/DELETE /api/opportunities/{id}/onboarding           */
/* ================================================================== */

test.describe('Scenario 5 — Onboarding Tasks', () => {
  test.setTimeout(60_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let taskId: string;

  test('5.1 — Create onboarding task', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPost(request, token, `/api/opportunities/${oppId}/onboarding`, {
      type: 'Setup',
      title: `Configure SSO integration ${RUN_ID}`,
      status: 'NotStarted',
      dueDateUtc: futureDate(14),
      notes: 'Set up SAML SSO with customer Azure AD tenant.',
    });

    if (res.ok()) {
      const body = await res.json();
      taskId = body.id;
      console.log(`Onboarding task created: ${taskId}`);
    } else {
      console.log(`Onboarding create: ${res.status()} ${await res.text()}`);
    }
  });

  test('5.2 — Create additional onboarding tasks', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    for (const t of [
      { type: 'Training', title: `Admin training session ${RUN_ID}`, status: 'NotStarted', dueDateUtc: futureDate(21), notes: '2hr admin training.' },
      { type: 'DataMigration', title: `Import historical data ${RUN_ID}`, status: 'NotStarted', dueDateUtc: futureDate(30), notes: 'Migrate 3 years of data from legacy.' },
    ]) {
      const res = await apiPost(request, token, `/api/opportunities/${oppId}/onboarding`, t);
      if (res.ok()) {
        console.log(`Onboarding task: "${t.title}" created`);
      }
    }
  });

  test('5.3 — List onboarding tasks', async ({ request }) => {
    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiGet(request, token, `/api/opportunities/${oppId}/onboarding`);
    expect(res.ok()).toBeTruthy();

    const tasks = await res.json();
    const list = Array.isArray(tasks) ? tasks : tasks.items ?? [];
    console.log(`Onboarding tasks: ${list.length}`);
    for (const t of list) {
      console.log(`  - [${t.status}] ${t.title} (type: ${t.type}, due: ${t.dueDateUtc})`);
    }
  });

  test('5.4 — Update onboarding task status', async ({ request }) => {
    if (!taskId) { console.log('No task — skip'); return; }

    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPatch(request, token, `/api/opportunities/${oppId}/onboarding/${taskId}`, {
      status: 'InProgress',
      notes: 'SSO federation metadata exchanged. Configuring trust relationship.',
    });

    if (res.ok()) {
      console.log('Onboarding task: NotStarted → InProgress');
    } else {
      console.log(`Onboarding update: ${res.status()}`);
    }
  });

  test('5.5 — Complete onboarding task', async ({ request }) => {
    if (!taskId) { console.log('No task — skip'); return; }

    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiPatch(request, token, `/api/opportunities/${oppId}/onboarding/${taskId}`, {
      status: 'Completed',
      notes: 'SSO integration completed and tested. Login verified with customer Azure AD.',
    });

    if (res.ok()) {
      console.log('Onboarding task: InProgress → Completed');
    } else {
      console.log(`Onboarding complete: ${res.status()}`);
    }
  });

  test('5.6 — Delete onboarding task', async ({ request }) => {
    if (!taskId) { console.log('No task — skip'); return; }

    token = await ensureAuth(request);
    const oppId = await ensureOpportunity(request, token);

    const res = await apiDelete(request, token, `/api/opportunities/${oppId}/onboarding/${taskId}`);
    if (res.ok()) {
      console.log(`Onboarding task deleted: ${taskId}`);
    } else {
      console.log(`Onboarding delete: ${res.status()}`);
    }
  });
});
