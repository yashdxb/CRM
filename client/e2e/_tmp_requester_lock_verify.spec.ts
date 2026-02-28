import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';

function decodeJwtSub(token: string): string {
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf-8')) as Record<string, unknown>;
  return String(payload['sub'] ?? payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? '');
}

async function loginViaApi(
  request: Parameters<typeof test>[0]['request'],
  email: string,
  password: string
): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email, password }
  });
  expect(response.ok()).toBeTruthy();
  const payload = await response.json();
  const accessToken = payload?.accessToken as string | undefined;
  expect(accessToken).toBeTruthy();
  return accessToken!;
}

test('requester pending approval lock is enforced and visible; manager bypass works', async ({ page, request }) => {
  const repToken = await loginViaApi(request, 'ava.chen@crmenterprise.demo', 'ChangeThisRep!1');
  const adminToken = await loginViaApi(request, 'yasser.ahamed@live.com', 'yAsh@123');
  const repUserId = decodeJwtSub(repToken);

  const seedOppRes = await request.get(`${API_BASE_URL}/api/opportunities?page=1&pageSize=1`, {
    headers: {
      Authorization: `Bearer ${repToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(seedOppRes.ok()).toBeTruthy();
  const seedOppBody = await seedOppRes.json();
  const seedOpp = seedOppBody?.items?.[0];
  expect(seedOpp?.accountId).toBeTruthy();

  const createOppRes = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers: {
      Authorization: `Bearer ${repToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: `Requester Lock E2E ${Date.now()}`,
      accountId: seedOpp.accountId,
      stageName: 'Prospecting',
      amount: 25000,
      currency: 'USD',
      probability: 20,
      expectedCloseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      forecastCategory: 'Pipeline',
      opportunityType: 'New',
      isClosed: false,
      isWon: false
    }
  });
  expect(createOppRes.status()).toBe(201);
  const target = await createOppRes.json();
  expect(target?.id).toBeTruthy();

  // Create/refresh a pending decision approval request for the same rep user.
  const createDecisionRes = await request.post(`${API_BASE_URL}/api/decisions/requests`, {
    headers: {
      Authorization: `Bearer ${repToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      decisionType: 'OpportunityApproval',
      workflowType: 'OpportunityApproval',
      entityType: 'Opportunity',
      entityId: target.id,
      entityName: target.name ?? 'Deal',
      parentEntityName: target.accountName ?? seedOpp.accountName ?? null,
      purpose: 'Discount',
      status: 'Submitted',
      policyReason: 'E2E lock verification',
      businessImpactLabel: 'commercial approval',
      amount: Number(target.amount ?? 25000),
      currency: target.currency ?? 'USD',
      requestedByUserId: repUserId,
      requestedByName: 'Ava Chen'
    }
  });
  expect(createDecisionRes.ok()).toBeTruthy();

  // API lock: requester stage mutation should be blocked with lock message.
  const repStageRes = await request.patch(`${API_BASE_URL}/api/opportunities/${target.id}/stage`, {
    headers: {
      Authorization: `Bearer ${repToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: { stage: target.stage ?? 'Prospecting' }
  });
  expect(repStageRes.status()).toBe(400);
  const repStageBody = await repStageRes.text();
  expect(repStageBody).toContain('Deal is locked while your approval request is pending.');

  // API bypass: admin/manager can still mutate.
  const adminStageRes = await request.patch(`${API_BASE_URL}/api/opportunities/${target.id}/stage`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: { stage: target.stage ?? 'Prospecting' }
  });
  expect(adminStageRes.status()).toBe(204);

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, repToken);

  await page.goto(`/app/opportunities/${target.id}/edit`, { waitUntil: 'domcontentloaded' });

  await expect(page.getByText('Record locked for approval')).toBeVisible();
  await expect(page.getByText('Approval Pending')).toBeVisible();
  await expect(page.getByRole('button', { name: /Save Deal/i })).toBeDisabled();

  await page.screenshot({ path: 'output/playwright/requester-lock-verify.png', fullPage: true });
});
