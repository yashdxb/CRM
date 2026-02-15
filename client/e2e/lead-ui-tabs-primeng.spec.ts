import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function loginByApi(request: any) {
  const login = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  expect(login.ok()).toBeTruthy();
  const payload = await login.json();
  expect(payload?.accessToken).toBeTruthy();
  return payload.accessToken as string;
}

test('lead edit uses PrimeNG tabs and switches panels', async ({ page, request }) => {
  const token = await loginByApi(request);
  const suffix = Date.now();

  const create = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default',
      Authorization: `Bearer ${token}`
    },
    data: {
      firstName: 'Primeng',
      lastName: `Tabs ${suffix}`,
      companyName: 'UI QA',
      assignmentStrategy: 'Manual',
      status: 'New'
    }
  });
  expect(create.ok()).toBeTruthy();
  const lead = await create.json();
  expect(lead?.id).toBeTruthy();

  await page.addInitScript((accessToken) => {
    localStorage.setItem('auth_token', accessToken as string);
    localStorage.setItem('tenant_key', 'default');
  }, token);

  await page.goto(`/app/leads/${lead.id}/edit`);
  await page.waitForURL('**/app/leads/**/edit');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  await expect(page.getByRole('tab', { name: 'Overview' })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Qualification/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: /Activity & Follow-Up/i })).toBeVisible();
  await expect(page.getByRole('tab', { name: 'History' })).toBeVisible();

  await page.getByRole('tab', { name: /Qualification/i }).click();
  await expect(page.locator('.section-title:visible', { hasText: 'Qualification' }).first()).toBeVisible();

  await page.getByRole('tab', { name: /Activity & Follow-Up/i }).click();
  await expect(page.locator('.section-title:visible', { hasText: 'Follow-Up Plan' }).first()).toBeVisible();

  await page.getByRole('tab', { name: 'History' }).click();
  await expect(page.locator('.section-title:visible', { hasText: 'Status history' }).first()).toBeVisible();

  await page.getByRole('tab', { name: 'Overview' }).click();
  await expect(page.locator('.section-title:visible', { hasText: 'Lead basics' }).first()).toBeVisible();
});
