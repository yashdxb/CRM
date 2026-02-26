import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

async function login(page, request: any) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await response.json();
  if (!response.ok() || !payload?.accessToken) {
    throw new Error(`Unable to authenticate. status=${response.status()} body=${JSON.stringify(payload)}`);
  }
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto(`${BASE_URL}/app/dashboard`, { waitUntil: 'networkidle' });
}

async function openSelect(page, selector: string) {
  const host = page.locator(selector);
  await host.waitFor({ state: 'visible', timeout: 10000 });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) await trigger.first().click({ force: true });
  else await host.click({ force: true });
}

async function selectByLabel(page, selector: string, label: string) {
  for (let i = 0; i < 3; i += 1) {
    await openSelect(page, selector);
    const option = page.locator('.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]').filter({ hasText: label }).first();
    try {
      await option.waitFor({ state: 'visible', timeout: 2000 });
      await option.click({ force: true });
      return true;
    } catch {
      await page.keyboard.press('Escape').catch(() => null);
      await page.waitForTimeout(120);
    }
  }
  return false;
}

async function selectFirst(page, selector: string) {
  await openSelect(page, selector);
  const option = page.locator('.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]').first();
  await option.waitFor({ state: 'visible', timeout: 3000 });
  await option.click({ force: true });
}

test('enter first intake lead data (Leo Martin)', async ({ page, request }) => {
  const suffix = Date.now();
  const company = `Acme Industrial Services ${suffix}`;
  const leadEmail = `nora.patel+${suffix}@example.com`;

  page.on('pageerror', (err) => console.log('PAGEERROR', err.message));
  page.on('console', (msg) => { if (msg.type() === 'error') console.log('CONSOLE_ERROR', msg.text()); });
  page.on('requestfailed', (req) => {
    if (req.url().includes('/api/') && !((req.failure()?.errorText ?? '').includes('ERR_ABORTED'))) {
      console.log('REQUEST_FAILED', req.url(), req.failure()?.errorText ?? '');
    }
  });

  await login(page, request);
  await page.goto(`${BASE_URL}/app/leads/new`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible', timeout: 20000 });

  await page.locator('input[name="firstName"]').fill('Nora');
  await page.locator('input[name="lastName"]').fill('Patel');
  await page.locator('input[name="companyName"]').fill(company);
  await page.locator('input[name="email"]').fill(leadEmail);
  await page.locator('input[name="jobTitle"]').fill('Operations Director');
  await page.locator('input[name="source"]').fill('Referral');

  // Intake path: phone can be added later after contact confirms details.

  // Sales Rep role may not have owner lookup access (403); keep default ownership if selectors are unavailable.
  const ownerSelectVisible = await page.locator('p-select[name="ownerId"]').count();
  if (ownerSelectVisible) {
    try {
      await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
      await selectByLabel(page, 'p-select[name="ownerId"]', 'Leo Martin');
    } catch {
      console.log('OWNER_ASSIGNMENT_SKIPPED', 'owner lookup/options unavailable for current role');
      await page.keyboard.press('Escape').catch(() => null);
    }
  }

  const createButton = page.locator('button:has-text("Create lead")');
  await expect(createButton).toBeEnabled();

  await page.screenshot({ path: 'output/playwright/lead-intake-before-create.png', fullPage: true });

  const createResponsePromise = page.waitForResponse(
    (r) => r.url().includes('/api/leads') && r.request().method() === 'POST',
    { timeout: 30000 }
  ).catch(() => null);

  await createButton.click();
  await page.waitForURL('**/app/leads/**/edit', { timeout: 30000 });

  const createResponse = await createResponsePromise;
  const leadId = (page.url().match(/\/app\/leads\/([^/]+)\/edit/) ?? [])[1] ?? null;
  console.log('CREATED_COMPANY', company);
  console.log('CREATED_EMAIL', leadEmail);
  console.log('CREATED_LEAD_ID', leadId);
  if (createResponse) {
    console.log('CREATE_STATUS', createResponse.status());
    console.log('CREATE_BODY', (await createResponse.text()).slice(0, 600));
  }

  await page.screenshot({ path: 'output/playwright/lead-intake-created.png', fullPage: true });
  await expect(page.locator('form.lead-form')).toBeVisible();
});
