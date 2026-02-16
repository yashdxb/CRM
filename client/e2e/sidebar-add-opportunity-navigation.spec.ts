import { test, expect } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const TENANT_KEY = process.env.E2E_TENANT_KEY ?? 'default';

async function apiLogin(request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT_KEY },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }
  return payload.accessToken as string;
}

async function loginUi(page, token: string) {
  await page.addInitScript(({ t, tenantKey }) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', tenantKey);
  }, { t: token, tenantKey: TENANT_KEY });
}

test('Sidebar: Add Opportunity navigates to new opportunity form', async ({ page, request }) => {
  page.on('pageerror', (err) => console.log('pageerror:', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('console error:', msg.text());
  });

  const token = await apiLogin(request);
  await loginUi(page, token);

  // Sanity: direct navigation should work (route must exist).
  await page.goto('/app/opportunities/new', { waitUntil: 'networkidle' });
  await expect(page).toHaveURL(/\/app\/opportunities\/new/);
  await expect(page.getByText('Opportunity Details').first()).toBeVisible();

  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });

  // Expand Opportunities submenu if needed.
  const opportunitiesMenu = page.locator('a.nav__item', { hasText: 'Opportunities' }).first();
  await expect(opportunitiesMenu).toBeVisible();
  await opportunitiesMenu.click();

  const allOpportunities = page.locator('a.nav__child', { hasText: 'All Opportunities' }).first();
  await expect(allOpportunities).toBeVisible();
  await allOpportunities.click();
  await expect(page).toHaveURL(/\/app\/opportunities$/);

  // On-page "New Opportunity" action should navigate too.
  const newOppButton = page.getByRole('button', { name: /New Opportunity/i }).first();
  await expect(newOppButton).toBeVisible();
  await newOppButton.click();
  await expect(page).toHaveURL(/\/app\/opportunities\/new/);

  // Go back to list to test sidebar child navigation.
  await page.goto('/app/opportunities', { waitUntil: 'networkidle' });

  // Expand again (navigation may auto-collapse).
  await opportunitiesMenu.click();

  const addOpportunity = page.locator('a.nav__child', { hasText: 'Add Opportunity' }).first();
  await expect(addOpportunity).toBeVisible();
  await expect(addOpportunity).toHaveAttribute('href', /\/app\/opportunities\/new/);
  await addOpportunity.click();

  await expect(page).toHaveURL(/\/app\/opportunities\/new/);
  // Basic signal the form rendered (title/breadcrumb).
  await expect(page.getByText(/New Opportunity|Opportunity/i).first()).toBeVisible();
});
