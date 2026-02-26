import { test, expect } from '@playwright/test';

const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any) {
  const resp = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const json = await resp.json();
  if (!resp.ok() || !json?.accessToken) throw new Error(`Login failed ${resp.status()}`);
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, json.accessToken);
}

test('dashboard pack management supports exact row drag reorder', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE}/app/dashboard`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Customize layout/i }).click();
  const rows = page.locator('.layout-order-list .layout-item-row');
  await expect(rows.first()).toBeVisible();
  const before = await rows.locator('.layout-item').allTextContents();
  if (before.length < 2) test.skip();

  const firstHandle = rows.nth(0).locator('.layout-item__drag');
  const secondRow = rows.nth(1);
  await firstHandle.dragTo(secondRow);

  const after = await page.locator('.layout-order-list .layout-item').allTextContents();
  expect(after[0]).toContain(before[1].trim().split(/\s+/).slice(-1)[0]);
  console.log('before0', before[0]);
  console.log('before1', before[1]);
  console.log('after0', after[0]);
  await page.screenshot({ path: 'output/playwright/dashboard-pack-drag-order.png', fullPage: false });
});
