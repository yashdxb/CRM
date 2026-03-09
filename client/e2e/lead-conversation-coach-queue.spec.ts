import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function apiLogin(request, email: string, password: string): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email, password }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error(`Unable to authenticate (${email}) against API for coach queue test.`);
  }

  return payload.accessToken as string;
}

test('lead list exposes conversation coach filters and queue summary', async ({ page, request }) => {
  const token = await apiLogin(request, ADMIN_EMAIL, ADMIN_PASSWORD);
  await page.addInitScript((value) => {
    localStorage.setItem('auth_token', value as string);
    localStorage.setItem('tenant_key', 'default');
  }, token);

  await page.goto(`${BASE_URL}/app/leads`);
  await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();
  await expect(page.getByText('Conversation Coaching')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Coaching queue' })).toBeVisible();

  await page.getByRole('button', { name: 'Weak conversation' }).click();
  await expect(page.getByRole('heading', { name: 'Weak conversation' })).toBeVisible();

  await page.getByRole('button', { name: 'No signal' }).click();
  await expect(page.getByRole('heading', { name: 'No signal' })).toBeVisible();
});
