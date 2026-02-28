import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
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

test('accepting re-engage recommendation creates follow-up activity tasks', async ({ page, request }) => {
  const token = await login(page, request);

  const usersResp = await request.get(`${API_BASE_URL}/api/users/lookup?max=1`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': 'default' }
  });
  expect(usersResp.ok(), await usersResp.text()).toBeTruthy();
  const users = await usersResp.json();
  const ownerId = users?.[0]?.id as string;
  expect(ownerId).toBeTruthy();

  const suffix = Date.now();
  const campaignName = `E2E Reengage Campaign ${suffix}`;
  const accountName = `E2E Account ${suffix}`;
  const contactFirstName = 'Reengage';
  const contactLastName = `Contact ${suffix}`;
  const opportunityName = `E2E Reengage Opp ${suffix}`;

  const createCampaignResp = await request.post(`${API_BASE_URL}/api/marketing/campaigns`, {
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
      budgetActual: 1800,
      objective: 'E2E recommendation accept flow'
    }
  });
  expect(createCampaignResp.ok(), await createCampaignResp.text()).toBeTruthy();
  const campaign = await createCampaignResp.json();

  const createAccountResp = await request.post(`${API_BASE_URL}/api/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: accountName,
      ownerId,
      industry: 'Technology'
    }
  });
  expect(createAccountResp.ok(), await createAccountResp.text()).toBeTruthy();
  const account = await createAccountResp.json();

  const createContactResp = await request.post(`${API_BASE_URL}/api/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      firstName: contactFirstName,
      lastName: contactLastName,
      accountId: account.id,
      ownerId,
      email: `reengage.${suffix}@example.com`
    }
  });
  expect(createContactResp.ok(), await createContactResp.text()).toBeTruthy();
  const contact = await createContactResp.json();

  const addMemberResp = await request.post(`${API_BASE_URL}/api/marketing/campaigns/${campaign.id}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      entityType: 'Contact',
      entityId: contact.id,
      responseStatus: 'Responded'
    }
  });
  expect(addMemberResp.ok(), await addMemberResp.text()).toBeTruthy();

  const createOppResp = await request.post(`${API_BASE_URL}/api/opportunities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      name: opportunityName,
      accountId: account.id,
      primaryContactId: contact.id,
      stageName: 'Qualification',
      amount: 75000,
      currency: 'USD',
      probability: 25,
      expectedCloseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
      summary: 'E2E summary',
      requirements: 'E2E requirements',
      buyingProcess: 'E2E buying process',
      successCriteria: 'E2E success criteria'
    }
  });
  expect(createOppResp.ok(), await createOppResp.text()).toBeTruthy();

  await page.goto(`/app/marketing/campaigns/${campaign.id}`);
  await expect(page.getByRole('button', { name: 'Action Center' })).toBeVisible();
  await page.getByRole('button', { name: 'Action Center' }).click();
  await expect(page.getByText('Next Best Actions')).toBeVisible();

  const recommendationResp = await request.get(`${API_BASE_URL}/api/marketing/campaigns/${campaign.id}/recommendations`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(recommendationResp.ok(), await recommendationResp.text()).toBeTruthy();
  const recommendations = await recommendationResp.json();
  const reengageRecommendation = recommendations.find((r: any) => r.type === 'reengage_stalled_opportunities') ?? recommendations[0];
  expect(reengageRecommendation?.id).toBeTruthy();

  const beforeActivitiesResp = await request.get(`${API_BASE_URL}/api/activities?page=1&pageSize=200`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(beforeActivitiesResp.ok(), await beforeActivitiesResp.text()).toBeTruthy();
  const beforeActivities = await beforeActivitiesResp.json();
  const beforeCount = (beforeActivities.items ?? []).filter((a: any) =>
    typeof a.subject === 'string' && a.subject.includes('Marketing recommendation follow-up:')
  ).length;

  const decisionResp = await request.post(`${API_BASE_URL}/api/marketing/recommendations/${reengageRecommendation.id}/decision`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      decision: 'accept',
      reason: 'E2E accept test',
      applyActions: true
    }
  });
  expect(decisionResp.ok(), await decisionResp.text()).toBeTruthy();
  const decision = await decisionResp.json();
  expect(decision.status).toBe('accepted');

  const afterActivitiesResp = await request.get(`${API_BASE_URL}/api/activities?page=1&pageSize=200`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(afterActivitiesResp.ok(), await afterActivitiesResp.text()).toBeTruthy();
  const afterActivities = await afterActivitiesResp.json();
  const afterCount = (afterActivities.items ?? []).filter((a: any) =>
    typeof a.subject === 'string' && a.subject.includes('Marketing recommendation follow-up:')
  ).length;

  expect(afterCount).toBeGreaterThan(beforeCount);
});
