import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
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

test('real estate preset updates workspace preview and lead form catalogs', async ({ page, request }) => {
  const token = await login(page, request);

  const originalSettingsResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  const originalSettings = await originalSettingsResponse.json();

  try {
    const presetResponse = await request.post(`${API_BASE_URL}/api/workspace/vertical-preset`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default',
        'Content-Type': 'application/json'
      },
      data: {
        presetId: 'RealEstateBrokerage',
        resetExisting: true
      }
    });
    expect(presetResponse.ok()).toBeTruthy();

    await page.goto('/app/settings/workspace');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('combobox', { name: 'Real Estate Brokerage' })).toBeVisible();
    await expect(page.getByText('Buyer readiness')).toBeVisible();
    await expect(page.getByText('Offer Pipeline Summary')).toBeVisible();
    await expect(page.getByText('Showing Follow-up Automation')).toBeVisible();

    await page.goto('/app/leads/new');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('combobox', { name: 'Select buyer type' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Select financing readiness' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Select pre-approval status' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Select property type' })).toBeVisible();
    await expect(page.getByRole('combobox', { name: 'Select budget band' })).toBeVisible();
  } finally {
    await request.put(`${API_BASE_URL}/api/workspace`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default',
        'Content-Type': 'application/json'
      },
      data: originalSettings
    });
  }
});
