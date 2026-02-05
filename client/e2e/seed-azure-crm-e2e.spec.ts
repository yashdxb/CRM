import { test, expect } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';

const TENANT_KEY = 'default';

const USERS = [
  { email: 'yasser0503@outlook.com', password: 'yAsh@123' },
  { email: 'udemy786@outlook.com', password: 'yAsh@123' }
];

const INDUSTRIES = [
  'Healthcare',
  'FinTech',
  'Retail',
  'Manufacturing',
  'Education',
  'Logistics',
  'Energy',
  'SaaS',
  'Hospitality',
  'Public Sector'
];

const FIRST_NAMES = [
  'Ava',
  'Noah',
  'Mia',
  'Ethan',
  'Liam',
  'Olivia',
  'Mason',
  'Sophia',
  'Lucas',
  'Isabella'
];

const LAST_NAMES = [
  'Reed',
  'Carter',
  'Patel',
  'Nguyen',
  'Brooks',
  'Santos',
  'Kim',
  'Morgan',
  'Ali',
  'Turner'
];

async function login(page, request, email: string, password: string) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': TENANT_KEY
    },
    data: { email, password }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against the API for UI test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
  }, payload.accessToken);
  await page.goto('/app/dashboard');
  return payload.accessToken as string;
}

async function openSelect(page, selector) {
  const selectHost = page.locator(selector).first();
  await selectHost.waitFor({ state: 'visible' });
  await selectHost.scrollIntoViewIfNeeded();
  await page.keyboard.press('Escape');
  await page.waitForTimeout(50);
  const trigger = selectHost.locator('.p-select').first();
  const target = (await trigger.count()) ? trigger : selectHost;
  await target.click({ force: true });
}

async function selectByLabel(page, selector, optionText) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  try {
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click({ force: true });
  } catch {
    await openSelect(page, selector);
    const count = await options.count();
    for (let i = 0; i < count; i += 1) {
      const candidate = options.nth(i);
      const text = (await candidate.innerText()).toLowerCase();
      if (!text.includes('unknown')) {
        await candidate.click({ force: true });
        return;
      }
    }
    await options.first().waitFor({ state: 'visible', timeout: 5000 });
    await options.first().click({ force: true });
  }
}

async function setEvidence(page, fieldName: string, value: string) {
  const select = page.locator(`p-select[name="${fieldName}"]`);
  if (await select.count()) {
    await selectByLabel(page, `p-select[name="${fieldName}"]`, value);
    return;
  }
  const textarea = page.locator(`textarea[name="${fieldName}"]`);
  if (await textarea.count()) {
    await textarea.fill(value);
  }
}

async function searchLeads(page, term) {
  const input = page.locator('.search-box input');
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(300);
}

async function openTab(page, label) {
  const tab = page.locator('.lead-tab', { hasText: label }).first();
  if (await tab.count()) {
    await tab.click();
  }
}

async function setDateInputByOffset(page, selector, offsetDays) {
  const input = page.locator(`${selector} input`);
  await input.waitFor({ state: 'visible' });
  await input.click();

  const target = new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000);
  const targetDay = target.getDate();
  const targetMonth = target.getMonth();
  const targetYear = target.getFullYear();

  const calendarDialog = page.getByRole('dialog', { name: 'Choose Date' });
  await calendarDialog.waitFor({ state: 'visible' });

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  for (let i = 0; i < 12; i += 1) {
    const monthButton = calendarDialog.locator('button[aria-label="Choose Month"]');
    const yearButton = calendarDialog.locator('button[aria-label="Choose Year"]');
    const monthText = (await monthButton.innerText()).trim();
    const yearText = (await yearButton.innerText()).trim();
    const monthIndex = monthNames.indexOf(monthText);
    const year = Number(yearText);
    if (monthIndex === targetMonth && year === targetYear) {
      break;
    }
    const next = calendarDialog.getByRole('button', { name: 'Next Month' });
    await next.click();
    await page.waitForTimeout(150);
  }

  await calendarDialog.getByRole('gridcell', { name: String(targetDay) }).first().click();
  await input.press('Tab');
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = Buffer.from(normalized, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getUserIdFromPayload(payload: Record<string, unknown>): string | null {
  const direct =
    (payload['sub'] as string | undefined) ||
    (payload['nameid'] as string | undefined) ||
    (payload['userId'] as string | undefined) ||
    (payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] as string | undefined);
  return direct ?? null;
}

async function createDiscoveryMeeting(request, token, leadId) {
  const dueDateUtc = new Date().toISOString();
  await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT_KEY,
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Discovery meeting',
      description: 'E2E discovery meeting',
      outcome: null,
      type: 3,
      priority: 'Medium',
      dueDateUtc,
      completedDateUtc: null,
      nextStepSubject: null,
      nextStepDueDateUtc: null,
      relatedEntityType: 1,
      relatedEntityId: leadId,
      ownerId: null
    }
  });
}

async function updateLeadApi(request, token, leadId, ownerId, lead, updates) {
  const payload = {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    companyName: lead.companyName,
    jobTitle: lead.jobTitle,
    status: updates.status ?? lead.status ?? 'New',
    ownerId,
    assignmentStrategy: 'Manual',
    source: lead.source,
    territory: lead.territory ?? '',
    autoScore: true,
    score: 0,
    accountId: null,
    contactId: null,
    disqualifiedReason: updates.disqualifiedReason ?? '',
    nurtureFollowUpAtUtc: updates.nurtureFollowUpAtUtc ?? null,
    qualifiedNotes: updates.qualifiedNotes ?? '',
    budgetAvailability: updates.budgetAvailability ?? '',
    budgetEvidence: updates.budgetEvidence ?? 'No evidence yet',
    readinessToSpend: updates.readinessToSpend ?? '',
    readinessEvidence: updates.readinessEvidence ?? 'No evidence yet',
    buyingTimeline: updates.buyingTimeline ?? '',
    timelineEvidence: updates.timelineEvidence ?? 'No evidence yet',
    problemSeverity: updates.problemSeverity ?? '',
    problemEvidence: updates.problemEvidence ?? 'No evidence yet',
    economicBuyer: updates.economicBuyer ?? '',
    economicBuyerEvidence: updates.economicBuyerEvidence ?? 'No evidence yet',
    icpFit: updates.icpFit ?? '',
    icpFitEvidence: updates.icpFitEvidence ?? 'No evidence yet'
  };

  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT_KEY,
      'Content-Type': 'application/json'
    },
    data: payload
  });
  if (!response.ok()) {
    console.log('lead update failed:', response.status(), await response.text());
  }
  return response.ok();
}

async function saveLeadUpdate(page) {
  const updateButton = page.locator('button:has-text("Update lead")');
  await expect(updateButton).toBeEnabled();

  const responsePromise = page
    .waitForResponse(
      (response) => response.url().includes('/api/leads') && response.request().method() === 'PUT',
      { timeout: 30_000 }
    )
    .catch(() => null);
  const toastPromise = page
    .getByText('Lead updated.')
    .waitFor({ state: 'visible', timeout: 30_000 })
    .then(() => 'toast')
    .catch(() => null);

  await updateButton.click();

  const result = await Promise.race([
    responsePromise.then((response) => ({ type: 'response', response })),
    toastPromise.then((toast) => ({ type: 'toast', toast }))
  ]);

  if (!result || (result.type === 'response' && !result.response)) {
    throw new Error('Lead update did not complete within timeout.');
  }
  if (result.type === 'response' && !result.response.ok()) {
    console.log('lead update failed:', result.response.status(), await result.response.text());
  }
}

async function createLeadUI(page, lead) {
  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await page.locator('input[name="firstName"]').fill(lead.firstName);
  await page.locator('input[name="lastName"]').fill(lead.lastName);
  await page.locator('input[name="companyName"]').fill(lead.companyName);
  await page.locator('input[name="email"]').fill(lead.email);
  await page.locator('input[name="phone"]').fill(lead.phone);
  await page.locator('input[name="jobTitle"]').fill(lead.jobTitle);
  await page.locator('input[name="source"]').fill(lead.source);
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Round robin');

  const [createResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().includes('/api/leads') && response.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click()
  ]);

  if (!createResponse.ok()) {
    console.log('lead create failed:', createResponse.status(), await createResponse.text());
  }
  expect(createResponse.ok()).toBeTruthy();
  const created = await createResponse.json();
  return created?.id ?? null;
}

async function openLeadForEdit(page, companyName) {
  await page.goto('/app/leads');
  await searchLeads(page, companyName);
  const row = page.locator('tr').filter({ hasText: companyName }).first();
  await row.locator('button[title="Edit"]').click();
  await page.waitForURL('**/app/leads/**');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
}

async function setQualificationFields(page) {
  await openTab(page, 'Qualification');
  await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Budget allocated and approved');
  await setEvidence(page, 'budgetEvidence', 'Written confirmation');
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Actively evaluating solutions');
  await setEvidence(page, 'readinessEvidence', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'Target date verbally confirmed');
  await setEvidence(page, 'timelineEvidence', 'Observed behaviour');
  await selectByLabel(page, 'p-select[name="problemSeverity"]', 'Critical business impact');
  await setEvidence(page, 'problemEvidence', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Buyer engaged in discussion');
  await setEvidence(page, 'economicBuyerEvidence', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong ICP fit');
  await setEvidence(page, 'icpFitEvidence', 'Written confirmation');
  await page.locator('textarea[name="qualifiedNotes"]').fill('Qualified via Azure E2E seed.');
  await openTab(page, 'Overview');
}

async function setStatus(page, status: string) {
  await selectByLabel(page, 'p-select[name="status"]', status);
}

test.describe('seed azure dev CRM scenarios', () => {
  test.skip(({ baseURL }) => {
    return !!baseURL && !baseURL.includes('localhost') && !baseURL.includes('127.0.0.1');
  }, 'Seeding is disabled for Azure/dev. Run against local only.');
  test.setTimeout(300_000);

  for (const user of USERS) {
    test(`seed scenarios for ${user.email}`, async ({ page, request }) => {
      const suffix = Date.now();
      const token = await login(page, request, user.email, user.password);
      const payload = decodeJwtPayload(token) ?? {};
      const ownerName =
        (payload['name'] as string | undefined) ||
        (payload['fullName'] as string | undefined) ||
        (payload['given_name'] as string | undefined) ||
        null;
      const ownerId = getUserIdFromPayload(payload);

      const leads = Array.from({ length: 10 }).map((_, index) => {
        const industry = INDUSTRIES[index % INDUSTRIES.length];
        const companyName = `${industry} Lead ${suffix}-${index + 1}`;
        const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
        const lastName = LAST_NAMES[index % LAST_NAMES.length];
        return {
          firstName,
          lastName,
          companyName,
          email: `lead.${suffix}.${index + 1}@example.com`,
          phone: `+1555${String(suffix + index).slice(-7)}`,
          jobTitle: ['Director', 'Manager', 'VP', 'Analyst'][index % 4],
          source: ['Website', 'Referral', 'Event', 'Outbound'][index % 4],
          ownerName,
          status: 'New'
        };
      });

      const scenarios = [
        { status: 'New', action: 'new' },
        { status: 'Nurture', action: 'nurture' },
        { status: 'Qualified', action: 'qualified' },
        { status: 'Disqualified', action: 'disqualified' },
        { status: 'Qualified', action: 'convert' },
        { status: 'Nurture', action: 'nurture' },
        { status: 'Qualified', action: 'qualified' },
        { status: 'Disqualified', action: 'disqualified' },
        { status: 'Qualified', action: 'convert' },
        { status: 'New', action: 'new' }
      ];

      for (let i = 0; i < leads.length; i += 1) {
        const lead = leads[i];
        const scenario = scenarios[i];
        const leadId = await createLeadUI(page, lead);

        if (!leadId || scenario.action === 'new') {
          if (leadId && ownerId) {
            await updateLeadApi(request, token, leadId, ownerId, lead, {
              status: 'New'
            });
          }
          continue;
        }

        if (scenario.action === 'qualified' || scenario.action === 'convert') {
          await createDiscoveryMeeting(request, token, leadId);
        }

        if (scenario.action === 'nurture') {
          const followUpAtUtc = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
          await updateLeadApi(request, token, leadId, ownerId, lead, {
            status: 'Nurture',
            nurtureFollowUpAtUtc: followUpAtUtc
          });
          continue;
        }

        if (scenario.action === 'disqualified') {
          await updateLeadApi(request, token, leadId, ownerId, lead, {
            status: 'Disqualified',
            disqualifiedReason: 'No fit / budget.'
          });
          continue;
        }

        await updateLeadApi(request, token, leadId, ownerId, lead, {
          status: 'Qualified',
          qualifiedNotes: 'Qualified via Azure E2E seed.',
          budgetAvailability: 'Budget allocated and approved',
          budgetEvidence: 'Written confirmation',
          readinessToSpend: 'Actively evaluating solutions',
          readinessEvidence: 'Direct buyer statement',
          buyingTimeline: 'Target date verbally confirmed',
          timelineEvidence: 'Observed behaviour',
          problemSeverity: 'Critical business impact',
          problemEvidence: 'Direct buyer statement',
          economicBuyer: 'Buyer engaged in discussion',
          economicBuyerEvidence: 'Direct buyer statement',
          icpFit: 'Strong ICP fit',
          icpFitEvidence: 'Written confirmation'
        });

        if (scenario.action === 'convert') {
          const convertResponse = await request.post(`${API_BASE_URL}/api/leads/${leadId}/convert`, {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Tenant-Key': TENANT_KEY,
              'Content-Type': 'application/json'
            },
            data: {
              createAccount: true,
              accountName: lead.companyName,
              createContact: true,
              createOpportunity: true,
              opportunityName: `${lead.companyName} Opportunity`,
              amount: 25000,
              expectedCloseDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            }
          });
          if (!convertResponse.ok()) {
            console.log('convert failed:', convertResponse.status(), await convertResponse.text());
          }
          expect(convertResponse.ok()).toBeTruthy();
        }
      }
    });
  }
});
