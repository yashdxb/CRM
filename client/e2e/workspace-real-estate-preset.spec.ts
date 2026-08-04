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

    const updatedSettingsResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Tenant-Key': 'default'
      }
    });
    const updatedSettings = await updatedSettingsResponse.json();
    expect(updatedSettings.verticalPresetConfiguration?.leadProfileCatalog?.fields?.['brokerage.buyerTypes']?.length ?? 0).toBeGreaterThan(0);
    expect(updatedSettings.verticalPresetConfiguration?.leadProfileCatalog?.fields?.['brokerage.propertyTypes']?.length ?? 0).toBeGreaterThan(0);

    await page.goto('/app/settings/workspace');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Modules and industry preset are managed in Tenant Configuration')).toBeVisible();
    await expect(page.getByText('RealEstateBrokerage', { exact: true })).toBeVisible();
    await expect(page.getByText('Operational settings below respect this module scope.')).toBeVisible();

    await page.goto('/app/leads/new');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('button', { name: 'Buyer Profile' })).toBeVisible();
    await expect(page.getByLabel('Buyer type')).toBeVisible();
    await expect(page.getByLabel('Preferred area')).toBeVisible();
    await expect(page.getByLabel('Property type')).toBeVisible();
    await expect(page.getByLabel('Budget band')).toBeVisible();
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
