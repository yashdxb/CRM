import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  return payload.accessToken as string;
}

test('marketing MVP screens and campaign appears in list', async ({ page, request }) => {
  const token = await login(page, request);

  const usersResp = await request.get(`${API_BASE_URL}/api/users/lookup?max=1`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': 'default' }
  });
  const users = await usersResp.json();
  const ownerId = users?.[0]?.id as string;

  const campaignName = `E2E MVP Campaign ${Date.now()}`;
  const createResp = await request.post(`${API_BASE_URL}/api/marketing/campaigns`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: campaignName,
      type: 'Demand Gen',
      channel: 'Web',
      status: 'Active',
      ownerUserId: ownerId,
      budgetPlanned: 1000,
      budgetActual: 100,
      objective: 'Playwright verification campaign'
    }
  });
  expect(createResp.ok()).toBeTruthy();

  await page.goto('/app/marketing/campaigns');
  await expect(page.getByRole('heading', { name: 'Campaign Management' })).toBeVisible();
  await expect(page.getByText(campaignName)).toBeVisible();

  await page.goto('/app/marketing/attribution');
  await expect(page.getByRole('heading', { name: 'Campaign Attribution' })).toBeVisible();
});
