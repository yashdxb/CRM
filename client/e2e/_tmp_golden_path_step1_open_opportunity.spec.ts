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

test('golden path step1: open converted opportunity and verify key fields', async ({ page, request }) => {
  page.on('console', m => {
    if (m.type() === 'error') console.log('CONSOLE_ERROR', m.text());
  });

  await apiLogin(page, request);
  await page.goto(`${UI}/app/opportunities/${OPPORTUNITY_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 20000 });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());

  const nameInput = page.locator('input[name="name"]');
  const amountInput = page.locator('input[name="amount"]');
  const summaryArea = page.locator('textarea[name="summary"]');
  const requirementsArea = page.locator('textarea[name="requirements"]');
  const buyingProcessArea = page.locator('textarea[name="buyingProcess"]');
  const successCriteriaArea = page.locator('textarea[name="successCriteria"]');

  await expect(nameInput).toBeVisible();
  await expect(amountInput).toBeVisible();
  await expect(summaryArea).toBeVisible();
  await expect(requirementsArea).toBeVisible();
  await expect(buyingProcessArea).toBeVisible();
  await expect(successCriteriaArea).toBeVisible();

  const values = {
    name: await nameInput.inputValue(),
    amount: await amountInput.inputValue(),
    summary: await summaryArea.inputValue(),
    requirements: await requirementsArea.inputValue(),
    buyingProcess: await buyingProcessArea.inputValue(),
    successCriteria: await successCriteriaArea.inputValue(),
  };

  console.log('OPP_VALUES', JSON.stringify(values));

  expect(values.name.trim().length).toBeGreaterThan(0);
  // amount may be formatted, just require non-empty
  expect(values.amount.trim().length).toBeGreaterThan(0);

  const missingLongText = Object.entries(values)
    .filter(([k, v]) => ['summary','requirements','buyingProcess','successCriteria'].includes(k) && !String(v).trim())
    .map(([k]) => k);
  console.log('MISSING_LONGTEXT', JSON.stringify(missingLongText));

  await page.screenshot({ path: 'client/output/playwright/golden-path-step1-opportunity-open.png', fullPage: true });
});
