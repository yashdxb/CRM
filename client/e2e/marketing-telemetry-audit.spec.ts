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

test('marketing settings telemetry KPI drills down to prefiltered audit log', async ({ page, request }) => {
  const token = await login(page, request);

  const usersResp = await request.get(`${API_BASE_URL}/api/users/lookup?max=1`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': 'default' }
  });
  const users = await usersResp.json();
  const ownerId = users?.[0]?.id as string;
  expect(ownerId).toBeTruthy();

  const campaignName = `Telemetry Drilldown ${Date.now()}`;
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
      budgetActual: 100
    }
  });
  expect(createResp.ok(), await createResp.text()).toBeTruthy();
  const createdCampaign = await createResp.json();
  const campaignId = createdCampaign?.id as string;
  expect(campaignId).toBeTruthy();

  const telemetryResp = await request.post(`${API_BASE_URL}/api/marketing/telemetry/impact-worklist-click`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      campaignId,
      campaignName,
      model: 'linear',
      direction: 'positive'
    }
  });
  expect(telemetryResp.status(), await telemetryResp.text()).toBe(204);

  await page.goto('/app/settings/marketing');
  await expect(page.getByRole('heading', { name: /Marketing Settings/i })).toBeVisible();
  await expect(page.getByRole('button', { name: 'View Impact Telemetry Audit' })).toBeVisible();

  const auditResponsePromise = page.waitForResponse((response) => {
    const url = response.url();
    return url.includes('/api/audit')
      && url.includes('entityType=MarketingTelemetry')
      && url.includes('action=ImpactWorklistOpened');
  });

  await page.getByRole('button', { name: 'View Impact Telemetry Audit' }).click();
  const auditResponse = await auditResponsePromise;
  expect(auditResponse.ok()).toBeTruthy();

  await expect(page).toHaveURL(/\/app\/settings\/audit-log\?entityType=MarketingTelemetry&action=ImpactWorklistOpened/);
  await expect(page.getByRole('heading', { name: /Security/i })).toBeVisible();
});
