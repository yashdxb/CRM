import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function login(page: any, request: any) {
  const resp = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const payload = await resp.json();
  if (!resp.ok() || !payload?.accessToken) throw new Error(`login failed ${resp.status()}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

async function selectByLabel(page: any, hostSelector: string, optionText: string) {
  const host = page.locator(hostSelector);
  await host.waitFor({ state: 'visible', timeout: 10000 });
  const combo = host.locator('[role="combobox"]').first();
  await combo.focus();
  await page.keyboard.press('ArrowDown');
  await expect(combo).toHaveAttribute('aria-expanded', 'true');
  const option = page.getByRole('option', { name: new RegExp(optionText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }).first();
  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click({ force: true });
}

async function saveLeadUpdate(page: any) {
  const btn = page.locator('button:has-text("Update lead")').first();
  await expect(btn).toBeEnabled();
  const putResp = page.waitForResponse(r => r.url().includes(`/api/leads/${LEAD_ID}`) && r.request().method() === 'PUT', { timeout: 30000 });
  await btn.click();
  const resp = await putResp;
  expect(resp.ok()).toBeTruthy();
}

test('fill qualifications for Nora lead', async ({ page, request }) => {
  page.on('console', msg => { if (msg.type() === 'error') console.log('console error:', msg.text()); });
  await login(page, request);
  await page.goto(`${BASE_URL}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  const qualificationTab = page.getByRole('tab', { name: /Qualifications/i }).first();
  await qualificationTab.click();
  await expect(qualificationTab).toHaveAttribute('aria-selected', 'true');

  const summaryCard = page.locator('p-tabpanel[value="qualification"] .qualification-summary-card');
  await summaryCard.waitFor({ state: 'visible', timeout: 10000 });

  const factorsHeader = page.locator('p-accordion-header').filter({ hasText: /Qualification factors/i }).first();
  const budgetHost = page.locator('p-select[name="budgetAvailability"]');
  if (!(await budgetHost.isVisible().catch(() => false))) {
    await factorsHeader.click({ force: true });
  }
  await budgetHost.waitFor({ state: 'visible', timeout: 10000 });

  await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Budget allocated and approved');
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Internal decision in progress');
  await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'Decision date confirmed internally');
  await selectByLabel(page, 'p-select[name="problemSeverity"]', 'Critical business impact');
  await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Buyer engaged in discussion');
  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong ICP fit');

  const contextHeader = page.locator('p-accordion-header').filter({ hasText: /Context & supporting notes/i }).first();
  const notes = page.locator('textarea[name="qualifiedNotes"]').first();
  if (!(await notes.isVisible().catch(() => false))) {
    await contextHeader.click({ force: true });
  }
  await notes.waitFor({ state: 'visible', timeout: 10000 });
  await notes.fill('Discovery completed. Buyer engaged, budget approved, and decision planning is in progress.');

  await saveLeadUpdate(page);

  await page.screenshot({ path: 'output/playwright/lead-qualification-filled.png', fullPage: true });
});
