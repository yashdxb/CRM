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
  expect(createResp.ok(), await createResp.text()).toBeTruthy();
  const createdCampaign = await createResp.json();
  const campaignId = createdCampaign?.id as string;
  expect(campaignId).toBeTruthy();

  const recommendationResp = await request.get(`${API_BASE_URL}/api/marketing/campaigns/${campaignId}/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(recommendationResp.ok(), await recommendationResp.text()).toBeTruthy();
  const recommendations = await recommendationResp.json();
  expect(Array.isArray(recommendations)).toBeTruthy();
  expect(recommendations.length).toBeGreaterThan(0);

  const recommendationId = recommendations[0]?.id as string;
  expect(recommendationId).toBeTruthy();
  const decisionResp = await request.post(`${API_BASE_URL}/api/marketing/recommendations/${recommendationId}/decision`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      decision: 'snooze',
      reason: 'E2E decision workflow check',
      applyActions: false
    }
  });
  expect(decisionResp.ok(), await decisionResp.text()).toBeTruthy();
  const decisionBody = await decisionResp.json();
  expect(decisionBody?.status).toContain('snooz');

  await page.goto('/app/marketing/campaigns');
  await expect(page.getByRole('heading', { name: 'Campaign Management' })).toBeVisible();
  await expect(page.getByText(campaignName)).toBeVisible();

  await page.goto(`/app/marketing/campaigns/${campaignId}`);
  await expect(page.getByRole('button', { name: 'Action Center' })).toBeVisible();
  await expect(page.getByText('Campaign Health Score')).toBeVisible();

  await page.goto('/app/marketing/attribution');
  await expect(page.getByRole('heading', { name: 'Campaign Attribution' })).toBeVisible();
  await expect(page.getByText('Decision Cockpit')).toBeVisible();
  await expect(page.getByText('Next Best Actions')).toBeVisible();
});
