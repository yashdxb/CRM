import { test, expect } from '@playwright/test';

const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const p = await r.json();
  if (!r.ok() || !p?.accessToken) throw new Error(`login failed ${r.status()}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, p.accessToken);
}

test('activities group by lead shows Nora lead group and discovery meeting', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE}/app/activities`, { waitUntil: 'domcontentloaded' });
  await page.locator('.toolbar').waitFor();

  const selects = page.locator('p-select.filter-select');
  await selects.nth(0).click();
  const groupOption = page.locator('.p-select-option').filter({ hasText: /Lead/i }).first();
  await groupOption.click();

  await expect(page.locator('.grouped-activities__label')).toHaveText(/Grouped by Lead/i);
  const leadCard = page.locator('.lead-group-card').filter({ hasText: 'Nora Patel' }).first();
  await expect(leadCard).toBeVisible();
  await expect(leadCard).toContainText('Discovery meeting - Acme expansion');

  const groupCount = await page.locator('.lead-group-card').count();
  console.log('LEAD_GROUP_COUNT=', groupCount);

  await page.screenshot({ path: 'output/playwright/activities-group-by-lead.png', fullPage: true });
});
