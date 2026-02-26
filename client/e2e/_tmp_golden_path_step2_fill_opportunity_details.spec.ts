import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const OPPORTUNITY_ID = 'e1a04d46-4f50-4ec8-88a9-2573228d58bc';

async function apiLogin(page:any, request:any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(r.ok()).toBeTruthy();
  const body = await r.json();
  await page.addInitScript((token:string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

async function setDatePicker(page:any, inputId:string, value:string) {
  const input = page.locator(`#${inputId}`).first();
  if (await input.count()) {
    await input.click();
    await input.fill(value);
    await input.blur();
  }
}

test('golden path step2: fill opportunity details and save', async ({ page, request }) => {
  page.on('console', m => {
    const t = m.text();
    if (m.type() === 'error' && !t.includes('403')) console.log('CONSOLE_ERROR', t);
  });

  await apiLogin(page, request);
  await page.goto(`${UI}/app/opportunities/${OPPORTUNITY_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 20000 });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());

  // Fill realistic opportunity values
  await page.locator('input[name="name"]').fill('Acme Industrial - Q2 Expansion');

  const amountInput = page.locator('input[name="amount"]').first();
  await amountInput.click();
  await amountInput.fill('120000');
  await amountInput.blur();

  await setDatePicker(page, 'oppClose', '04/15/2026');

  await page.locator('textarea[name="summary"]').fill('Expansion rollout across two regions with phased onboarding and approval controls.');
  await page.locator('textarea[name="requirements"]').fill('Operational visibility, SLA tracking, approval controls, and phased rollout support.');
  await page.locator('textarea[name="buyingProcess"]').fill('Operations Director review followed by finance signoff and executive approval.');
  await page.locator('textarea[name="successCriteria"]').fill('Pilot go-live in 30 days and full rollout in 90 days with SLA compliance reporting.');

  const [saveResp] = await Promise.all([
    page.waitForResponse(r => r.url().includes(`/api/opportunities/${OPPORTUNITY_ID}`) && r.request().method() === 'PUT', { timeout: 20000 }),
    page.getByRole('button', { name: /Update opportunity/i }).click()
  ]);

  console.log('OPP_SAVE_STATUS', saveResp.status());
  if (!saveResp.ok()) console.log('OPP_SAVE_BODY', await saveResp.text());
  expect(saveResp.ok()).toBeTruthy();

  // Re-read values from UI after save completes
  await page.waitForTimeout(800);
  const values = {
    name: await page.locator('input[name="name"]').inputValue(),
    amount: await page.locator('input[name="amount"]').first().inputValue(),
    summary: await page.locator('textarea[name="summary"]').inputValue(),
    requirements: await page.locator('textarea[name="requirements"]').inputValue(),
    buyingProcess: await page.locator('textarea[name="buyingProcess"]').inputValue(),
    successCriteria: await page.locator('textarea[name="successCriteria"]').inputValue(),
    expectedClose: await page.locator('#oppClose').inputValue().catch(() => '')
  };
  console.log('OPP_SAVED_VALUES', JSON.stringify(values));

  await page.screenshot({ path: 'client/output/playwright/golden-path-step2-opportunity-filled.png', fullPage: true });
});
