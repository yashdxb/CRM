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

test('workspace settings displays configurable lead outcome reasons', async ({ page, request }) => {
  const token = await login(page, request);
  const customDisqualificationReason = `Custom DQ ${Date.now()}`;
  const customLossReason = `Custom Lost ${Date.now()}`;

  const settingsResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  const settings = await settingsResponse.json();

  await request.put(`${API_BASE_URL}/api/workspace`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      ...settings,
      leadDispositionPolicy: {
        disqualificationReasons: [...(settings.leadDispositionPolicy?.disqualificationReasons ?? []), customDisqualificationReason],
        lossReasons: [...(settings.leadDispositionPolicy?.lossReasons ?? []), customLossReason]
      }
    }
  });

  await page.goto('/app/settings/workspace');
  await page.waitForLoadState('networkidle');

  const disqualificationArea = page.locator('#ws-leadDisqualificationReasons');
  const lossArea = page.locator('#ws-leadLossReasons');

  await expect(disqualificationArea).toBeVisible();
  await expect(lossArea).toBeVisible();
  await expect(disqualificationArea).toHaveValue(new RegExp(customDisqualificationReason.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  await expect(lossArea).toHaveValue(new RegExp(customLossReason.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
