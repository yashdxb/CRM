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

async function apiCreateCustomer(request, token: string, name: string) {
  const response = await request.post(`${API_BASE_URL}/api/customers`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY, 'Content-Type': 'application/json' },
    data: {
      name,
      accountNumber: null,
      industry: null,
      website: null,
      phone: null,
      lifecycleStage: 'Customer',
      ownerId: null,
      parentAccountId: null,
      territory: null,
      description: null
    }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  return payload.id as string;
}

async function apiCreateOpportunity(
  request,
  token: string,
  payload: { name: string; accountId: string; stageName: string; amount: number; probability: number; expectedCloseDate: string }
) {
  const response = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY, 'Content-Type': 'application/json' },
    data: {
      name: payload.name,
      accountId: payload.accountId,
      primaryContactId: null,
      stageId: null,
      stageName: payload.stageName,
      ownerId: null,
      amount: payload.amount,
      currency: 'USD',
      probability: payload.probability,
      expectedCloseDate: payload.expectedCloseDate,
      contractStartDateUtc: null,
      contractEndDateUtc: null,
      forecastCategory: null,
      opportunityType: 'New',
      summary: null,
      requirements: null,
      buyingProcess: null,
      successCriteria: null,
      discountPercent: null,
      discountAmount: null,
      pricingNotes: null,
      securityReviewStatus: null,
      securityNotes: null,
      legalReviewStatus: null,
      legalNotes: null,
      proposalStatus: null,
      proposalNotes: null,
      proposalLink: null,
      proposalGeneratedAtUtc: null,
      proposalSentAtUtc: null,
      preSalesScope: null,
      preSalesApproach: null,
      deliveryOwnerId: null,
      deliveryHandoffScope: null,
      deliveryHandoffRisks: null,
      deliveryHandoffTimeline: null,
      deliveryStatus: null,
      deliveryCompletedAtUtc: null,
      isClosed: false,
      isWon: false,
      winLossReason: null
    }
  });
  expect(response.ok()).toBeTruthy();
}

test('Dashboard pipeline by stage reflects real open opportunity data', async ({ page, request }) => {
  const token = await apiLogin(request);
  await loginUi(page, token);

  const accountId = await apiCreateCustomer(request, token, 'North Ridge Foods');
  const closeDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await apiCreateOpportunity(request, token, {
    name: 'Annual Supply Agreement',
    accountId,
    stageName: 'Prospecting',
    amount: 12000,
    probability: 20,
    expectedCloseDate: closeDate
  });
  await apiCreateOpportunity(request, token, {
    name: 'Q2 Expansion',
    accountId,
    stageName: 'Qualification',
    amount: 25000,
    probability: 35,
    expectedCloseDate: closeDate
  });
  await apiCreateOpportunity(request, token, {
    name: 'New Distribution Rollout',
    accountId,
    stageName: 'Proposal',
    amount: 18000,
    probability: 55,
    expectedCloseDate: closeDate
  });

  const summaryResponse = await request.get(`${API_BASE_URL}/api/dashboard/summary`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT_KEY }
  });
  expect(summaryResponse.ok()).toBeTruthy();
  const summaryPayload = await summaryResponse.json();
  const expectedStages = (summaryPayload.pipelineValue ?? []) as Array<{ stage: string; count: number; value: number }>;
  const expectedPipelineTotal = expectedStages.reduce((total, stage) => total + (stage.value ?? 0), 0);

  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });

  const pipelineCard = page.locator('article.dashboard-card').filter({ hasText: 'Pipeline by Stage' }).first();
  await expect(pipelineCard).toBeVisible();

  const expectedTotalText = Math.round(expectedPipelineTotal).toLocaleString('en-US');
  await expect(pipelineCard.locator('.card-badge')).toContainText(expectedTotalText);

  const stats = pipelineCard.locator('.pipeline-stat .stat-label');
  await expect(stats).toHaveCount(expectedStages.length);
  for (let index = 0; index < expectedStages.length; index += 1) {
    await expect(stats.nth(index)).toHaveText(expectedStages[index].stage);
  }

  const dealCounts = pipelineCard.locator('.pipeline-stat .stat-value');
  for (let index = 0; index < expectedStages.length; index += 1) {
    await expect(dealCounts.nth(index)).toContainText(`${expectedStages[index].count}`);
  }
});
