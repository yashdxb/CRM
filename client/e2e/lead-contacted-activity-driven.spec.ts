import { expect, test } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for contacted-policy test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto('/app/dashboard');
  return payload.accessToken as string;
}

function decodeUserIdFromJwt(token: string): string {
  const payloadSegment = token.split('.')[1];
  const payloadJson = Buffer.from(payloadSegment, 'base64').toString('utf8');
  const payload = JSON.parse(payloadJson) as Record<string, string>;
  return (
    payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ??
    payload.nameid ??
    payload.sub
  );
}

async function createLead(request, token, suffix: string, ownerId: string): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      firstName: 'Playwright',
      lastName: `ContactPolicy${suffix}`,
      email: `playwright.contact.policy.${suffix}@example.com`,
      phone: '+14155550134',
      companyName: `Policy Corp ${suffix}`,
      jobTitle: 'Sales Rep',
      status: 'New',
      ownerId,
      assignmentStrategy: 'Manual',
      source: 'Referral',
      territory: 'West',
      autoScore: true,
      score: 0
    }
  });
  if (!response.ok()) {
    throw new Error(`Lead create failed: ${response.status()} ${await response.text()}`);
  }
  const lead = await response.json();
  return lead.id as string;
}

async function updateLeadStatusExpectFailure(request, token, leadId: string, status: string) {
  const existing = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  if (!existing.ok()) {
    throw new Error(`Unable to load lead ${leadId}: ${existing.status()}`);
  }
  const lead = await existing.json();
  const [firstName, ...rest] = (lead.name as string).split(' ');
  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      firstName: firstName || 'Lead',
      lastName: rest.join(' ') || 'Lead',
      email: lead.email ?? null,
      phone: lead.phone ?? null,
      companyName: lead.company ?? null,
      jobTitle: lead.jobTitle ?? null,
      status,
      ownerId: lead.ownerId ?? null,
      assignmentStrategy: lead.ownerId ? 'Manual' : null,
      source: lead.source ?? null,
      territory: lead.territory ?? null,
      autoScore: false,
      score: lead.score ?? 0
    }
  });
  expect(response.ok()).toBeFalsy();
  const body = await response.text();
  expect(body.toLowerCase()).toContain('activity-driven');
}

async function createCompletedLeadCall(request, token, leadId: string) {
  const nowIso = new Date().toISOString();
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Policy test call',
      description: 'Completed call for contacted policy e2e.',
      outcome: 'Connected',
      type: 'Call',
      priority: 'Medium',
      dueDateUtc: nowIso,
      completedDateUtc: nowIso,
      nextStepSubject: null,
      nextStepDueDateUtc: null,
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null
    }
  });
  if (!response.ok()) {
    throw new Error(`Activity create failed: ${response.status()} ${await response.text()}`);
  }
}

test('Contacted status is activity-driven in edit lead', async ({ page, request }) => {
  const token = await login(page, request);
  const ownerId = decodeUserIdFromJwt(token);
  const suffix = Date.now().toString();
  const leadId = await createLead(request, token, suffix, ownerId);

  await page.goto(`/app/leads/${leadId}/edit`);
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await page.locator('p-select[name="status"]').click({ force: true });
  const contactedOption = page.getByRole('option', { name: 'Contacted', exact: true });
  await contactedOption.waitFor({ state: 'visible' });
  await expect(contactedOption).toHaveClass(/p-disabled/);
  await page.keyboard.press('Escape');

  await updateLeadStatusExpectFailure(request, token, leadId, 'Contacted');
  await createCompletedLeadCall(request, token, leadId);

  await page.reload();
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  const statusLabel = page.locator('p-select[name="status"] .p-select-label').first();
  await expect(statusLabel).toContainText('Contacted');
});
