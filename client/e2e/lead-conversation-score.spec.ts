import { expect, test } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'http://localhost:5014';
const UI_BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'super.admin@crmenterprise.demo';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'ChangeThisSuper!1';

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
    throw new Error('Unable to authenticate against the API for conversation score test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  await page.goto(`${UI_BASE_URL}/app/dashboard`);
  return payload.accessToken as string;
}

async function createLeadWithConversationEvidence(request, token: string) {
  const suffix = Date.now();
  const created = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: {
      firstName: 'Conversation',
      lastName: `Signal${suffix}`,
      companyName: 'North Edge',
      email: `conversation-signal-${suffix}@example.com`,
      status: 'New',
      assignmentStrategy: 'Manual',
      score: 42
    }
  });
  expect(created.ok()).toBeTruthy();
  const lead = await created.json();

  const touch = await request.post(`${API_BASE_URL}/api/leads/${lead.id}/cadence-touch`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: {
      channel: 'Call',
      outcome: 'Budget approved and buyer requested launch planning discussion.',
      nextStepDueAtUtc: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  });
  expect(touch.ok()).toBeTruthy();

  return lead.id as string;
}

test('lead conversation score appears on qualification and conversion screens', async ({ page, request }) => {
  const token = await login(page, request);
  const leadId = await createLeadWithConversationEvidence(request, token);

  await page.goto(`${UI_BASE_URL}/app/leads/${leadId}/edit`);
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  const qualificationTab = page.getByRole('tab', { name: /Qualifications/i }).first();
  await qualificationTab.waitFor({ state: 'visible' });
  await qualificationTab.evaluate((element: HTMLElement) => element.click());
  await expect(qualificationTab).toHaveAttribute('aria-selected', 'true');
  const qualificationPanel = page.locator('p-tabpanel[value="qualification"]:not([hidden])');
  await expect(qualificationPanel.getByText('Conversation Score').first()).toBeVisible();
  await expect(qualificationPanel.locator('.summary-metric__value', { hasText: /high|medium|low|unavailable/i }).first()).toBeVisible();
  await expect(qualificationPanel.locator('.feedback-suggestions-list li').first()).toBeVisible();

  await page.goto(`${UI_BASE_URL}/app/leads/${leadId}/convert`);
  await expect(page.getByText('Qualification guardrails')).toBeVisible();
  await expect(page.getByText('Conversation').first()).toBeVisible();
  await expect(page.locator('.hint-list li').first()).toBeVisible();
});
