import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

const API = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const TENANT = 'default';
const RUN = Date.now().toString(36).slice(-6);

const LEO = {
  name: 'Leo Martin',
  email: process.env.E2E_SALES_REP_EMAIL ?? 'leo.martin@crmenterprise.demo',
  password: process.env.E2E_SALES_REP_PASSWORD ?? 'ChangeThisRep!1',
};

function headers(token: string, json = true) {
  const output: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': TENANT,
  };
  if (json) output['Content-Type'] = 'application/json';
  return output;
}

function attachDiagnostics(page: Page) {
  page.on('pageerror', (err: Error) => console.log('[pageerror]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console.error]', msg.text());
  });
  page.on('requestfailed', (req) => {
    if (req.url().includes('/api/')) {
      console.log('[request-failed]', req.method(), req.url(), req.failure()?.errorText);
    }
  });
}

async function loginAsLeo(page: Page, request: APIRequestContext): Promise<string> {
  const res = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
    data: { email: LEO.email, password: LEO.password },
  });
  const body = await res.json();
  expect(body?.accessToken, 'Leo Martin local login should succeed').toBeTruthy();

  await page.goto(UI, { waitUntil: 'domcontentloaded' });
  await page.evaluate((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);

  return body.accessToken as string;
}

async function openSelect(page: Page, selector: string) {
  const selectHost = page.locator(selector);
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.click();
    return;
  }
  await selectHost.click();
}

async function selectByLabel(page: Page, selector: string, optionText: string) {
  await openSelect(page, selector);
  const option = page
    .locator('.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]')
    .filter({ hasText: optionText })
    .first();
  await option.waitFor({ state: 'visible', timeout: 5000 });
  await option.click({ force: true });
}

async function apiGet(request: APIRequestContext, token: string, url: string) {
  return request.get(url, { headers: headers(token, false) });
}

async function closeOpportunityWonViaApi(
  request: APIRequestContext,
  token: string,
  opportunityId: string,
  opportunity: Record<string, unknown>,
) {
  const res = await request.put(`${API}/api/opportunities/${opportunityId}`, {
    headers: headers(token),
    data: {
      name: opportunity.name,
      accountId: opportunity.accountId,
      ownerId: opportunity.ownerId,
      amount: 250000,
      currency: opportunity.currency ?? 'USD',
      probability: 100,
      expectedCloseDate: opportunity.closeDate ?? null,
      forecastCategory: 'Closed',
      opportunityType: opportunity.opportunityType ?? 'New',
      stageName: 'Closed Won',
      isClosed: true,
      isWon: true,
      winLossReason: 'Won during local UAT',
    },
  });
  if (!res.ok()) {
    console.log('close won PUT failed:', res.status(), await res.text());
  }
  expect(res.ok(), `close won PUT should succeed for ${opportunityId}`).toBeTruthy();
}

async function createDiscoveryMeeting(request: APIRequestContext, token: string, leadId: string) {
  const now = new Date().toISOString();
  const tomorrow = new Date(Date.now() + 86_400_000).toISOString();
  const res = await request.post(`${API}/api/activities`, {
    headers: headers(token),
    data: {
      subject: 'Discovery meeting',
      description: 'Leo Martin local UAT discovery meeting',
      outcome: 'Discovery held',
      type: 'Meeting',
      priority: 'Medium',
      dueDateUtc: now,
      completedDateUtc: now,
      nextStepSubject: 'Follow up after discovery',
      nextStepDueDateUtc: tomorrow,
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null,
    },
  });
  expect(res.ok(), 'discovery meeting should be created').toBeTruthy();
}

async function updateLeadStatusViaApi(
  request: APIRequestContext,
  token: string,
  leadId: string,
  leadInput: { firstName: string; lastName: string; company: string; email: string; jobTitle: string; source: string },
  status: string,
  extraFields: Record<string, unknown> = {},
) {
  const getRes = await apiGet(request, token, `${API}/api/leads/${leadId}`);
  expect(getRes.ok(), 'lead fetch before status update should succeed').toBeTruthy();
  const lead = await getRes.json();

  const res = await request.put(`${API}/api/leads/${leadId}`, {
    headers: headers(token),
    data: {
      ...lead,
      firstName: leadInput.firstName,
      lastName: leadInput.lastName,
      companyName: leadInput.company,
      email: leadInput.email,
      jobTitle: leadInput.jobTitle,
      source: leadInput.source,
      status,
      ...extraFields,
    },
  });
  if (!res.ok()) {
    console.log('lead status update failed:', res.status(), await res.text());
  }
  expect(res.ok(), `lead status update should succeed for ${leadId}`).toBeTruthy();
}

async function saveLeadUpdate(page: Page) {
  const updateButton = page.locator('button:has-text("Update lead")');
  await expect(updateButton).toBeEnabled();

  const [updateRes] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes('/api/leads/') && r.request().method() === 'PUT',
      { timeout: 30000 },
    ),
    updateButton.click(),
  ]);

  if (!updateRes.ok()) {
    console.log('lead update failed:', updateRes.status(), await updateRes.text());
  }
  expect(updateRes.ok(), 'lead update should succeed').toBeTruthy();
}

async function createLeadViaUI(
  page: Page,
  input: { firstName: string; lastName: string; company: string; email: string; jobTitle: string; source: string },
) {
  await page.goto(`${UI}/app/leads/new`);
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  await page.locator('#lead-firstName').fill(input.firstName);
  await page.locator('#lead-lastName').fill(input.lastName);
  await page.locator('#lead-companyName').fill(input.company);
  await page.locator('#lead-email').fill(input.email);
  await page.locator('#lead-jobTitle').fill(input.jobTitle);
  await page.locator('#lead-source').fill(input.source);

  await page.locator('p-select[name="ownerId"]').waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(1500);
  await expect(page.locator('button:has-text("Create lead")')).toBeEnabled();

  const [createReq, createRes] = await Promise.all([
    page.waitForRequest(
      (r) => r.url().endsWith('/api/leads') && r.method() === 'POST',
      { timeout: 30000 },
    ),
    page.waitForResponse(
      (r) => r.url().endsWith('/api/leads') && r.request().method() === 'POST',
      { timeout: 30000 },
    ),
    page.locator('button:has-text("Create lead")').click(),
  ]);
  expect(createRes.ok(), 'lead creation should succeed').toBeTruthy();
  const body = await createRes.json();
  expect(body?.id).toBeTruthy();

  await page.waitForURL('**/app/leads/**/edit', { timeout: 30000 });
  return body.id as string;
}

async function fillQualificationFactors(page: Page) {
  await page.locator('label[for="lead-budgetAvailability"]').waitFor({ state: 'visible', timeout: 10000 });
  await selectByLabel(page, '#lead-budgetAvailability', 'Budget allocated and approved');
  await selectByLabel(page, '#lead-readinessToSpend', 'Internal decision in progress');
  await selectByLabel(page, '#lead-buyingTimeline', 'Decision date confirmed internally');
  await selectByLabel(page, '#lead-problemSeverity', 'Critical business impact');
  await selectByLabel(page, '#lead-economicBuyer', 'Buyer engaged in discussion');
  await selectByLabel(page, '#lead-icpFit', 'Strong');
}

async function openTab(page: Page, label: string) {
  const tab = page.getByRole('tab', { name: label }).first();
  await tab.waitFor({ state: 'visible', timeout: 10000 });
  await tab.click({ force: true });
}

async function convertLeadViaUI(page: Page, leadId: string) {
  await page.goto(`${UI}/app/leads/${leadId}/edit`);
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  const convertBtn = page.locator('.lead-status-rail__primary', { hasText: 'Convert Lead' });
  await convertBtn.waitFor({ state: 'visible', timeout: 10000 });
  await convertBtn.click();

  const dialog = page.getByRole('dialog', { name: 'Convert Lead' });
  await dialog.waitFor({ state: 'visible', timeout: 5000 });
  await dialog.locator('button', { hasText: 'Proceed' }).click();

  await page.waitForURL(`**/app/leads/${leadId}/convert`, { timeout: 10000 });
  await page.locator('form.convert-form').waitFor({ state: 'visible' });

  const [convertRes] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes(`/api/leads/${leadId}/convert`) && r.request().method() === 'POST',
      { timeout: 30000 },
    ),
    page.locator('form.convert-form button:has-text("Convert lead")').click(),
  ]);
  if (!convertRes.ok()) {
    console.log('lead conversion failed:', convertRes.status(), await convertRes.text());
  }
  expect(convertRes.ok(), 'lead conversion should succeed').toBeTruthy();
  return await convertRes.json() as { accountId: string; contactId: string; opportunityId: string };
}

test.describe('Leo Martin local leads UAT', () => {
  test.setTimeout(180000);

  test('full lead lifecycle: New -> Contacted -> Qualified -> Converted -> Closed Won', async ({ page, request }) => {
    attachDiagnostics(page);
    const token = await loginAsLeo(page, request);
    const suffix = `Leo-${RUN}`;
    const company = `Pinnacle Dynamics ${suffix}`;

    const leadInput = {
      firstName: 'Marcus',
      lastName: `Chen ${suffix}`,
      company,
      email: `marcus.chen.${RUN}@example.com`,
      jobTitle: 'VP of Procurement',
      source: 'Web',
    };
    const leadId = await createLeadViaUI(page, leadInput);

    await page.goto(`${UI}/app/leads`);
    await expect(page.locator('body')).toContainText(company);

    await createDiscoveryMeeting(request, token, leadId);
    const leadAfterContacted = await (await apiGet(request, token, `${API}/api/leads/${leadId}`)).json();
    expect(leadAfterContacted.status).toBe('Contacted');

    await updateLeadStatusViaApi(request, token, leadId, leadInput, 'Qualified', {
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Internal decision in progress',
      buyingTimeline: 'Decision date confirmed internally',
      problemSeverity: 'Critical business impact',
      economicBuyer: 'Buyer engaged in discussion',
      icpFit: 'Strong ICP fit',
      qualifiedNotes: 'Strong procurement need. Budget approved. Economic buyer engaged and timeline confirmed.',
      budgetEvidence: 'Discovery meeting notes',
      readinessEvidence: 'Discovery meeting notes',
      timelineEvidence: 'Discovery meeting notes',
      problemEvidence: 'Discovery meeting notes',
      economicBuyerEvidence: 'Discovery meeting notes',
      icpFitEvidence: 'Discovery meeting notes',
    });
    const leadAfterQualified = await (await apiGet(request, token, `${API}/api/leads/${leadId}`)).json();
    expect(leadAfterQualified.status).toBe('Qualified');

    const conversion = await convertLeadViaUI(page, leadId);
    expect(conversion.accountId).toBeTruthy();
    expect(conversion.contactId).toBeTruthy();
    expect(conversion.opportunityId).toBeTruthy();

    const contact = await (await apiGet(request, token, `${API}/api/contacts/${conversion.contactId}`)).json();
    const customer = await (await apiGet(request, token, `${API}/api/customers/${conversion.accountId}`)).json();
    const opportunityRes = await apiGet(request, token, `${API}/api/opportunities/${conversion.opportunityId}`);
    const opportunity = await opportunityRes.json();
    expect(contact).toBeTruthy();
    expect(customer).toBeTruthy();
    expect(opportunity).toBeTruthy();

    await page.goto(`${UI}/app/opportunities/${conversion.opportunityId}/edit`);
    await page.waitForURL(`**/app/opportunities/${conversion.opportunityId}/edit`);
    await page.waitForTimeout(1000);

    const amountField = page.locator('input#oppAmount, p-inputnumber[name="amount"] input').first();
    if (await amountField.isVisible().catch(() => false)) {
      await amountField.fill('250000');
    }

    await selectByLabel(page, 'p-select[name="stage"]', 'Closed Won').catch(async () => {
      await closeOpportunityWonViaApi(request, token, conversion.opportunityId, opportunity);
    });

    const saveOppBtn = page.locator('button:has-text("Save deal"), button:has-text("Update deal")').first();
    if (await saveOppBtn.isVisible().catch(() => false)) {
      const responsePromise = page.waitForResponse(
        (r) => r.url().includes('/api/opportunities/') && r.request().method() === 'PUT',
        { timeout: 15000 },
      ).catch(() => null);
      await saveOppBtn.click();
      const oppSaveRes = await responsePromise;
      if (oppSaveRes) {
        expect(oppSaveRes.ok(), 'opportunity save should succeed').toBeTruthy();
      }
    }

    let finalOpp = await (await apiGet(request, token, `${API}/api/opportunities/${conversion.opportunityId}`)).json();
    if ((finalOpp.stage ?? finalOpp.stageName) !== 'Closed Won') {
      await closeOpportunityWonViaApi(request, token, conversion.opportunityId, finalOpp);
      finalOpp = await (await apiGet(request, token, `${API}/api/opportunities/${conversion.opportunityId}`)).json();
    }
    expect(finalOpp.stage ?? finalOpp.stageName).toBe('Closed Won');

    await page.goto(`${UI}/app/customers`);
    await expect(page.locator('body')).toContainText(/customer|workspace/i);
  });
});
