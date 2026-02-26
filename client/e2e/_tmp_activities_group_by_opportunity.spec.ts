import { test, expect } from '@playwright/test';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
async function login(page:any, request:any) {
  const r = await request.post(`${API}/api/auth/login`, { headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' }, data: { email: 'yasser0503@outlook.com', password: 'yAsh@123' } });
  const p = await r.json();
  if (!r.ok() || !p?.accessToken) throw new Error(`login failed ${r.status()}`);
  await page.addInitScript((t) => { localStorage.setItem('auth_token', t as string); localStorage.setItem('tenant_key', 'default'); }, p.accessToken);
}

test('activities group by opportunity renders', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE}/app/activities`, { waitUntil: 'domcontentloaded' });
  await page.locator('.toolbar').waitFor();
  await page.locator('p-select.filter-select').nth(0).click();
  await page.locator('.p-select-option').filter({ hasText: /^Opportunity$/i }).first().click();

  await expect(page.locator('.grouped-activities__label')).toHaveCount(0);
  await expect(page.locator('.empty-state, .grouped-activities')).toHaveCount(1);
  await page.screenshot({ path: 'output/playwright/activities-group-by-opportunity.png', fullPage: true });
});
