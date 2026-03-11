import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
const UI_BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const SALES_REP_ID = 'f0e4e045-d8cb-44ce-a16b-47931c7788ac';
const SALES_MANAGER_EMAIL = process.env.E2E_SALES_MANAGER_EMAIL ?? 'yasser.ahamed@gmail.com';
const SALES_MANAGER_PASSWORD = process.env.E2E_SALES_MANAGER_PASSWORD ?? 'yAsh@123';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

type LeadRecord = {
  id: string;
  name: string;
  status: string;
  conversationScore: number | null;
  conversationSignalAvailable: boolean;
  conversionReadiness: {
    score: number;
    label: string;
    managerReviewRecommended: boolean;
    primaryGap: string | null;
    reasons: string[];
  } | null;
};

async function apiLogin(request, email: string, password: string): Promise<string> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email, password }
  });
  const payload = await response.json();
  expect(payload?.accessToken, `Login should succeed for ${email}`).toBeTruthy();
  return payload.accessToken as string;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Tenant-Key': 'default'
  };
}

function uniqueEmail(local: string, domain: string) {
  return `${local}.${Date.now()}@${domain}`;
}

async function createLead(request, token: string, input: Record<string, unknown>) {
  const response = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: authHeaders(token),
    data: input
  });
  expect(response.ok(), `lead create should succeed for ${JSON.stringify(input)}`).toBeTruthy();
  return (await response.json()) as { id: string };
}

async function deleteLead(request, token: string, leadId: string) {
  const response = await request.delete(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect([204, 404]).toContain(response.status());
}

async function cleanupLeadByName(request, token: string, name: string) {
  const response = await request.get(`${API_BASE_URL}/api/leads?search=${encodeURIComponent(name)}&page=1&pageSize=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `lead search should succeed for cleanup ${name}`).toBeTruthy();
  const payload = await response.json();
  const matches = (payload?.items ?? []).filter(
    (item: { id: string; name?: string }) => (item.name ?? '').trim().toLowerCase() === name.toLowerCase()
  );
  for (const match of matches) {
    await deleteLead(request, token, match.id);
  }
}

async function updateLead(request, token: string, leadId: string, input: Record<string, unknown>) {
  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: authHeaders(token),
    data: input
  });
  expect(response.status(), `lead update should succeed for ${leadId}`).toBe(204);
}

async function addCadenceTouch(request, token: string, leadId: string, channel: string, outcome: string, dueAt: string) {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/cadence-touch`, {
    headers: authHeaders(token),
    data: {
      channel,
      outcome,
      nextStepDueAtUtc: dueAt
    }
  });
  expect(response.ok(), `cadence touch should succeed for ${leadId}`).toBeTruthy();
}

async function createActivity(
  request,
  token: string,
  leadId: string,
  activity: {
    subject: string;
    description: string;
    outcome: string;
    type: string;
    dueDateUtc: string;
    completedDateUtc: string;
    nextStepSubject: string;
    nextStepDueDateUtc: string;
  }
) {
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: authHeaders(token),
    data: {
      ...activity,
      priority: 'High',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: SALES_REP_ID
    }
  });
  expect(response.status(), `activity create should succeed for ${leadId}`).toBe(201);
}

async function recycleLead(request, token: string, leadId: string) {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/recycle-to-nurture`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `recycle to nurture should succeed for ${leadId}`).toBeTruthy();
}

async function getLead(request, token: string, leadId: string): Promise<LeadRecord> {
  const response = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `lead fetch should succeed for ${leadId}`).toBeTruthy();
  return (await response.json()) as LeadRecord;
}

async function loginUi(page, token: string) {
  await page.addInitScript((accessToken) => {
    localStorage.setItem('auth_token', accessToken as string);
    localStorage.setItem('tenant_key', 'default');
  }, token);
  await page.goto(`${UI_BASE_URL}/app/leads`);
  await expect(page).toHaveURL(/\/app\/leads/);
  await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();
}

async function searchLeadInUi(page, name: string) {
  const search = page.getByPlaceholder('Search leads...');
  await search.fill('');
  await search.fill(name);
  await page.waitForTimeout(1500);
  await expect(page.locator('tr.table-row', { hasText: name }).first()).toBeVisible({ timeout: 20000 });
}

async function applyConversationFilter(page, name: string) {
  await page.getByRole('button', { name }).click();
  await page.waitForTimeout(1500);
}

test('Robert Lambke manager UAT covers coaching, readiness, and disposition oversight', async ({ page, request }) => {
  test.setTimeout(120_000);
  const repToken = await apiLogin(request, SALES_REP_EMAIL, SALES_REP_PASSWORD);
  const managerToken = await apiLogin(request, SALES_MANAGER_EMAIL, SALES_MANAGER_PASSWORD);
  const adminToken = await apiLogin(request, ADMIN_EMAIL, ADMIN_PASSWORD);

  const workspaceResponse = await request.get(`${API_BASE_URL}/api/workspace`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(workspaceResponse.ok(), 'workspace settings should load for admin').toBeTruthy();
  const workspace = await workspaceResponse.json();
  const qualificationPolicy = {
    ...(workspace?.qualificationPolicy ?? {}),
    showCqvsInLeadList: true
  };
  const saveWorkspaceResponse = await request.put(`${API_BASE_URL}/api/workspace`, {
    headers: authHeaders(adminToken),
    data: {
      ...workspace,
      qualificationPolicy
    }
  });
  expect(saveWorkspaceResponse.ok(), 'workspace settings should save for admin').toBeTruthy();

  const now = Date.now();
  const inDays = (days: number, hour = 15) =>
    new Date(now + days * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000).toISOString();
  const daysAgo = (days: number, hour = 14) =>
    new Date(now - days * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000).toISOString();

  await cleanupLeadByName(request, repToken, 'Alicia Warren');
  await cleanupLeadByName(request, repToken, 'Ben Holzer');
  await cleanupLeadByName(request, repToken, 'Carla Mendes');
  await cleanupLeadByName(request, repToken, 'Darius Cole');
  await cleanupLeadByName(request, repToken, 'Elena Petrov');

  // Manager review queue lead: strong motion, weak budget proof.
  const aliciaEmail = uniqueEmail('alicia.warren', 'granitequayrealty.ca');
  const alicia = await createLead(request, repToken, {
    firstName: 'Alicia',
    lastName: 'Warren',
    companyName: 'Granite Quay Realty',
    email: aliciaEmail,
    jobTitle: 'Leasing Operations Director',
    source: 'Referral',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    repToken,
    alicia.id,
    'Email',
    'Sent a recap of current automation options after Alicia requested a commercial comparison for the brokerage operations team.',
    inDays(2)
  );
  await createActivity(request, repToken, alicia.id, {
    subject: 'Discovery meeting with Alicia Warren',
    description:
      'Met Alicia Warren to review the lead routing bottlenecks, showing follow-up workflow, and the internal buying committee timeline.',
    outcome: 'Alicia confirmed active evaluation but did not confirm approved budget ownership.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Collect buying committee budget confirmation',
    nextStepDueDateUtc: inDays(3)
  });
  await updateLead(request, repToken, alicia.id, {
    firstName: 'Alicia',
    lastName: 'Warren',
    companyName: 'Granite Quay Realty',
    email: aliciaEmail,
    jobTitle: 'Leasing Operations Director',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Referral',
    qualifiedNotes:
      'Alicia is actively evaluating lead-routing changes for a live brokerage operations initiative, but budget sign-off is still assumed.',
    budgetAvailability: 'Indicative range mentioned',
    budgetEvidence: 'Discovery call notes',
    readinessToSpend: 'Actively evaluating solutions',
    readinessEvidence: 'Meeting notes',
    buyingTimeline: 'Rough timeline mentioned',
    timelineEvidence: 'Meeting notes',
    problemSeverity: 'High business impact',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer identified, not engaged',
    economicBuyerEvidence: 'Stakeholder map',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account research'
  });
  const aliciaLead = await getLead(request, repToken, alicia.id);
  expect(aliciaLead.conversionReadiness?.managerReviewRecommended).toBeTruthy();

  // At risk lead: minimal activity and weak signal.
  const benEmail = uniqueEmail('ben.holzer', 'harborlineasset.ca');
  const ben = await createLead(request, repToken, {
    firstName: 'Ben',
    lastName: 'Holzer',
    companyName: 'Harborline Asset Group',
    email: benEmail,
    jobTitle: 'Analyst',
    source: 'Web Form',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  const benLead = await getLead(request, repToken, ben.id);
  expect(benLead.conversionReadiness?.label).toBe('At Risk');

  // Ready lead: complete CQVS evidence and active conversation.
  const carlaEmail = uniqueEmail('carla.mendes', 'queenwestresidential.ca');
  const carla = await createLead(request, repToken, {
    firstName: 'Carla',
    lastName: 'Mendes',
    companyName: 'Queen West Residential',
    email: carlaEmail,
    jobTitle: 'Brokerage Director',
    source: 'Executive Referral',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    repToken,
    carla.id,
    'Email',
    'Recapped the buying committee requirements and the approved rollout window for the brokerage expansion team.',
    inDays(1)
  );
  await createActivity(request, repToken, carla.id, {
    subject: 'Buyer readiness meeting with Carla Mendes',
    description:
      'Met Carla Mendes and the operating partner to confirm budget, rollout timeline, decision path, and buyer readiness for the CRM rollout.',
    outcome: 'Budget approved, buyer engaged, and timeline confirmed by the executive sponsor.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Prepare final conversion package for Carla Mendes',
    nextStepDueDateUtc: inDays(2)
  });
  await updateLead(request, repToken, carla.id, {
    firstName: 'Carla',
    lastName: 'Mendes',
    companyName: 'Queen West Residential',
    email: carlaEmail,
    jobTitle: 'Brokerage Director',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Executive Referral',
    qualifiedNotes:
      'Carla confirmed approved budget, executive sponsor backing, and a committed implementation date for the brokerage sales operation.',
    budgetAvailability: 'Budget allocated and approved',
    budgetEvidence: 'Executive approval email',
    readinessToSpend: 'Ready to proceed pending final step',
    readinessEvidence: 'Meeting notes',
    buyingTimeline: 'Decision date confirmed internally',
    timelineEvidence: 'Meeting notes',
    problemSeverity: 'Critical business impact',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer engaged in discussion',
    economicBuyerEvidence: 'Executive sponsor meeting',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account plan'
  });
  const carlaLead = await getLead(request, repToken, carla.id);
  expect(carlaLead.conversionReadiness?.label).toBe('Ready');
  expect(carlaLead.conversionReadiness?.managerReviewRecommended).toBeFalsy();

  // Disqualified lead for reporting.
  const dariusEmail = uniqueEmail('darius.cole', 'summitlaneadvisory.ca');
  const darius = await createLead(request, repToken, {
    firstName: 'Darius',
    lastName: 'Cole',
    companyName: 'Summit Lane Advisory',
    email: dariusEmail,
    jobTitle: 'Brokerage Analyst',
    source: 'Inbound Call',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await updateLead(request, repToken, darius.id, {
    firstName: 'Darius',
    lastName: 'Cole',
    companyName: 'Summit Lane Advisory',
    email: dariusEmail,
    jobTitle: 'Brokerage Analyst',
    status: 'Disqualified',
    ownerId: SALES_REP_ID,
    source: 'Inbound Call',
    disqualifiedReason: 'No budget / funding'
  });

  // Lost -> nurture recycle for reporting and manager oversight.
  const elenaEmail = uniqueEmail('elena.petrov', 'crescentbridgerealty.ca');
  const elena = await createLead(request, repToken, {
    firstName: 'Elena',
    lastName: 'Petrov',
    companyName: 'Crescent Bridge Realty',
    email: elenaEmail,
    jobTitle: 'Transactions Manager',
    source: 'Industry Event',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await updateLead(request, repToken, elena.id, {
    firstName: 'Elena',
    lastName: 'Petrov',
    companyName: 'Crescent Bridge Realty',
    email: elenaEmail,
    jobTitle: 'Transactions Manager',
    status: 'Lost',
    ownerId: SALES_REP_ID,
    source: 'Industry Event',
    lossReason: 'Lost to competitor',
    lossCompetitor: 'Vertex Property Cloud',
    lossNotes: 'Crescent Bridge selected Vertex Property Cloud because procurement prioritized an existing finance-system integration.'
  });
  await recycleLead(request, repToken, elena.id);

  const dispositionReportResponse = await request.get(`${API_BASE_URL}/api/leads/disposition-report`, {
    headers: {
      Authorization: `Bearer ${managerToken}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(dispositionReportResponse.ok()).toBeTruthy();
  const dispositionReport = await dispositionReportResponse.json();
  expect(dispositionReport.totals.disqualified).toBeGreaterThanOrEqual(1);
  expect(dispositionReport.totals.inNurture).toBeGreaterThanOrEqual(1);
  expect(
    dispositionReport.disqualificationReasons.some((item: { reason: string; count: number }) => item.reason === 'No budget / funding')
  ).toBeTruthy();
  expect(
    dispositionReport.lossReasons.some((item: { reason: string; count: number }) => item.reason === 'Lost to competitor')
  ).toBeTruthy();
  expect(
    dispositionReport.trend.some((item: { recycledToNurture: number }) => item.recycledToNurture >= 1)
  ).toBeTruthy();

  await loginUi(page, managerToken);

  await applyConversationFilter(page, 'Manager review');
  await searchLeadInUi(page, 'Ben Holzer');
  const benRow = page.locator('tr.table-row', { hasText: 'Ben Holzer' }).first();
  await expect(benRow).toContainText('Readiness:');
  await benRow.hover();
  const benCoachButton = benRow.locator('[data-testid="lead-coach-open"]');
  await expect(benCoachButton).toBeVisible();
  await benCoachButton.click();
  const coachDrawer = page.locator('[data-testid="lead-coach-drawer"]');
  await expect(coachDrawer).toBeVisible();
  await expect(page.locator('[data-testid="lead-coach-title"]')).toContainText('Ben Holzer');
  await expect(coachDrawer).toContainText('Conversion Readiness');
  await expect(coachDrawer).toContainText('Manager review recommended before conversion.');
  await expect(coachDrawer).toContainText(/At Risk|review/i);
  await page.keyboard.press('Escape');
  await expect(coachDrawer).toBeHidden();

  await applyConversationFilter(page, 'All signals');
  await searchLeadInUi(page, 'Alicia Warren');
  const aliciaRow = page.locator('tr.table-row', { hasText: 'Alicia Warren' }).first();
  await aliciaRow.hover();
  const aliciaCoachButton = aliciaRow.locator('[data-testid="lead-coach-open"]');
  await expect(aliciaCoachButton).toBeVisible();
  await aliciaCoachButton.click();
  await expect(page.locator('[data-testid="lead-coach-title"]')).toContainText('Alicia Warren');
  await expect(coachDrawer).toContainText(/Budget availability|Budget/i);
  await page.keyboard.press('Escape');
  await expect(coachDrawer).toBeHidden();

  await applyConversationFilter(page, 'At risk');
  await searchLeadInUi(page, 'Ben Holzer');
  await expect(page.locator('tr.table-row', { hasText: 'Ben Holzer' }).first()).toContainText('At Risk');

  await applyConversationFilter(page, 'Ready to convert');
  await searchLeadInUi(page, 'Carla Mendes');
  const carlaRow = page.locator('tr.table-row', { hasText: 'Carla Mendes' }).first();
  await expect(carlaRow).toContainText('Ready');
  await carlaRow.hover();
  const carlaCoachButton = carlaRow.locator('[data-testid="lead-coach-open"]');
  await expect(carlaCoachButton).toBeVisible();
  await carlaCoachButton.click();
  await expect(coachDrawer).toBeVisible();
  await expect(page.locator('[data-testid="lead-coach-title"]')).toContainText('Carla Mendes');
  await expect(coachDrawer).toContainText('Ready');
  await expect(coachDrawer.getByText('Manager review recommended before conversion.')).toHaveCount(0);
  await expect(coachDrawer).toContainText('CQVS Summary');
  await expect(page.locator('[data-testid="cqvs-group-Q"]')).toBeVisible();
});
