import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against API for Help Desk E2E test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

async function apiPost(request, token: string, url: string, data: unknown) {
  const response = await request.post(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data
  });
  expect(response.ok(), await response.text()).toBeTruthy();
  return response;
}

async function apiPut(request, token: string, url: string, data: unknown) {
  const response = await request.put(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data
  });
  expect(response.ok(), await response.text()).toBeTruthy();
  return response;
}

test('helpdesk now flow: queue members, comment, status and SLA', async ({ page, request }) => {
  const token = await login(page, request);

  const usersResp = await request.get(`${API_BASE_URL}/api/users/lookup?max=10`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': 'default' }
  });
  expect(usersResp.ok(), await usersResp.text()).toBeTruthy();
  const users = (await usersResp.json()) as Array<{ id: string; fullName: string; email: string }>;
  expect(users.length).toBeGreaterThan(0);
  const agent = users[0];

  const queueName = `E2E Help Desk Queue ${Date.now()}`;
  const createQueueResp = await apiPost(request, token, `${API_BASE_URL}/api/helpdesk/queues`, {
    name: queueName,
    description: 'Queue for Help Desk Now flow validation',
    isActive: true,
    memberUserIds: []
  });
  const createdQueue = await createQueueResp.json() as { id: string };
  expect(createdQueue.id).toBeTruthy();

  const caseSubject = `E2E Help Desk Case ${Date.now()}`;
  const createCaseResp = await apiPost(request, token, `${API_BASE_URL}/api/helpdesk/cases`, {
    subject: caseSubject,
    description: 'E2E case for attachment + SLA + status verification',
    priority: 'Medium',
    severity: 'S3',
    category: 'General',
    subcategory: 'E2E',
    source: 'Manual',
    queueId: createdQueue.id
  });
  const createdCase = await createCaseResp.json() as { id: string; caseNumber: string };
  expect(createdCase.id).toBeTruthy();
  expect(createdCase.caseNumber).toContain('CASE-');

  await apiPut(request, token, `${API_BASE_URL}/api/helpdesk/queues/${createdQueue.id}`, {
    name: queueName,
    description: 'Queue for Help Desk Now flow validation',
    isActive: true,
    memberUserIds: [agent.id]
  });
  const queuesResp = await request.get(`${API_BASE_URL}/api/helpdesk/queues`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(queuesResp.ok(), await queuesResp.text()).toBeTruthy();
  const queues = (await queuesResp.json()) as Array<{ id: string; activeMemberCount: number }>;
  const updatedQueue = queues.find((row) => row.id === createdQueue.id);
  expect(updatedQueue).toBeTruthy();
  expect(updatedQueue?.activeMemberCount).toBeGreaterThan(0);

  await page.goto(`/app/helpdesk/cases/${createdCase.id}`);
  await expect(page.getByRole('heading', { name: new RegExp(createdCase.caseNumber) })).toBeVisible();
  await expect(page.getByText('Quick status:')).toBeVisible();

  await apiPost(request, token, `${API_BASE_URL}/api/helpdesk/cases/${createdCase.id}/comments`, {
    body: 'E2E note from playwright flow',
    isInternal: true,
    attachmentIds: []
  });
  await apiPost(request, token, `${API_BASE_URL}/api/helpdesk/cases/${createdCase.id}/status`, {
    status: 'Resolved',
    note: 'Resolved by Playwright flow'
  });

  await page.goto('/app/helpdesk/cases');
  const caseRow = page.getByRole('row', { name: new RegExp(createdCase.caseNumber) });
  await expect(caseRow).toContainText('Resolved');
  await expect(caseRow).toContainText(caseSubject);
});
