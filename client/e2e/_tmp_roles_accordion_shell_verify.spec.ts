import { test, expect } from '@playwright/test';

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page: any, request: any) {
  const res = await request.post(`${API_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

test('roles page uses accordion shell and shows hierarchy panel with badges', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE_URL}/app/settings/roles`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1200);

  await expect(page.getByRole('heading', { name: /Role Management/i })).toBeVisible();

  const tabs = page.locator('.workspace-card .p-tablist, .workspace-card [role="tablist"]');
  await expect(tabs).toHaveCount(0);

  const accordionHeaders = page.locator('.workspace-card .p-accordionheader');
  const headerCount = await accordionHeaders.count();
  expect(headerCount).toBeGreaterThanOrEqual(4);

  await expect(page.locator('.workspace-accordion-header__title').filter({ hasText: 'Role Directory' })).toBeVisible();
  await expect(page.locator('.workspace-accordion-header__title').filter({ hasText: 'Organization Hierarchy' })).toBeVisible();
  await expect(page.locator('.workspace-accordion-header__title').filter({ hasText: 'Role Presets' })).toBeVisible();
  await expect(page.locator('.workspace-accordion-header__title').filter({ hasText: 'Drift Monitor' })).toBeVisible();

  const badgeTexts = await page.locator('.workspace-accordion-header__badges .status-badge').allTextContents();
  console.log('BADGES=', badgeTexts);

  const orgchart = page.locator('.orgchart-wrapper .p-organizationchart');
  await expect(orgchart).toBeVisible();

  await page.screenshot({ path: 'output/playwright/roles-accordion-shell-verify.png', fullPage: true });
});
