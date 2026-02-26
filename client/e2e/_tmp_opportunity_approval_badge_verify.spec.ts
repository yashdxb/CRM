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

test('opportunity amount/discount approval badges render', async ({ page, request }) => {
  page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE_ERROR', m.text()); });
  await apiLogin(page, request);
  await page.goto(`${UI}/app/opportunities/${OPPORTUNITY_ID}/edit`, { waitUntil: 'domcontentloaded' });
  await page.locator('form.form-layout').waitFor({ state: 'visible', timeout: 20000 });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());

  const amountField = page.locator('.form-card').filter({ has: page.getByRole('heading', { name: 'Deal Settings' }) });
  const pricingField = page.locator('.form-card').filter({ has: page.getByRole('heading', { name: 'Pricing & Discounts' }) });

  const amountBadge = amountField.locator('.field').filter({ has: page.locator('label[for="oppAmount"]') }).locator('.approval-requirement-badge').first();
  const discountBadge = pricingField.locator('.field').filter({ has: page.locator('label[for="oppDiscountPercent"]') }).locator('.approval-requirement-badge').first();

  await expect(amountBadge).toBeVisible();
  await expect(discountBadge).toBeVisible();

  const amountText = (await amountBadge.textContent())?.trim();
  const discountText = (await discountBadge.textContent())?.trim();
  const amountHint = (await amountField.locator('.field').filter({ has: page.locator('label[for="oppAmount"]') }).locator('.field-hint').first().textContent())?.trim();
  const discountHint = (await pricingField.locator('.field').filter({ has: page.locator('label[for="oppDiscountPercent"]') }).locator('.field-hint').first().textContent())?.trim();

  console.log('AMOUNT_BADGE', amountText);
  console.log('AMOUNT_HINT', amountHint);
  console.log('DISCOUNT_BADGE', discountText);
  console.log('DISCOUNT_HINT', discountHint);

  await page.screenshot({ path: 'client/output/playwright/opportunity-approval-badges.png', fullPage: true });
});
