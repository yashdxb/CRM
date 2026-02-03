import { test, expect } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';

const TENANT_KEY = 'default';

const USERS = [
  { email: 'yasser05003@outlook.com', password: 'yAsh@123' },
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
  const selectHost = page.locator(selector);
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.click();
  } else {
    await selectHost.click();
  }
}

async function selectByLabel(page, selector, optionText) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
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

async function getUserNameByEmail(request, token: string, email: string) {
  const response = await request.get(`${API_BASE_URL}/api/users?page=1&pageSize=200`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT_KEY
    }
  });
  if (!response.ok()) {
    return null;
  }
  const payload = await response.json();
  const items = Array.isArray(payload) ? payload : payload.items ?? payload.data ?? [];
  const match = items.find((u) => String(u?.email ?? '').toLowerCase() === email.toLowerCase());
  return match?.fullName ?? null;
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
  await selectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
  await selectByLabel(page, 'p-select[name="ownerId"]', lead.ownerName);

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
  await selectByLabel(page, 'p-select[name="budgetEvidence"]', 'Written confirmation');
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Actively evaluating solutions');
  await selectByLabel(page, 'p-select[name="readinessEvidence"]', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'Target date verbally confirmed');
  await selectByLabel(page, 'p-select[name="timelineEvidence"]', 'Observed behaviour');
  await selectByLabel(page, 'p-select[name="problemSeverity"]', 'Critical business impact');
  await selectByLabel(page, 'p-select[name="problemEvidence"]', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Buyer engaged in discussion');
  await selectByLabel(page, 'p-select[name="economicBuyerEvidence"]', 'Direct buyer statement');
  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong ICP fit');
  await selectByLabel(page, 'p-select[name="icpFitEvidence"]', 'Written confirmation');
  await page.locator('textarea[name="qualifiedNotes"]').fill('Qualified via Azure E2E seed.');
  await openTab(page, 'Overview');
}

async function setStatus(page, status: string) {
  await selectByLabel(page, 'p-select[name="status"]', status);
}

test.describe('seed azure dev CRM scenarios', () => {
  test.setTimeout(300_000);

  for (const user of USERS) {
    test(`seed scenarios for ${user.email}`, async ({ page, request }) => {
      const suffix = Date.now();
      const token = await login(page, request, user.email, user.password);
      const ownerName = await getUserNameByEmail(request, token, user.email);
      if (!ownerName) {
        throw new Error(`Unable to resolve user name for ${user.email}`);
      }

      const leads = Array.from({ length: 10 }).map((_, index) => {
        const industry = INDUSTRIES[index % INDUSTRIES.length];
        const companyName = `${industry} Lead ${suffix}-${index + 1}`;
        return {
          firstName: `Lead${index + 1}`,
          lastName: user.email.split('@')[0],
          companyName,
          email: `lead.${suffix}.${index + 1}@example.com`,
          phone: `+1555${String(suffix + index).slice(-7)}`,
          jobTitle: ['Director', 'Manager', 'VP', 'Analyst'][index % 4],
          source: ['Website', 'Referral', 'Event', 'Outbound'][index % 4],
          ownerName
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
          continue;
        }

        if (scenario.action === 'qualified' || scenario.action === 'convert') {
          await createDiscoveryMeeting(request, token, leadId);
        }

        await openLeadForEdit(page, lead.companyName);

        if (scenario.action === 'nurture') {
          await openTab(page, 'Overview');
          await setStatus(page, 'Nurture');
          await openTab(page, 'Qualification');
          await setDateInputByOffset(page, 'p-datepicker[name="nurtureFollowUpAtUtc"]', 7);
          await openTab(page, 'Overview');
          await saveLeadUpdate(page);
          continue;
        }

        if (scenario.action === 'disqualified') {
          await openTab(page, 'Overview');
          await setStatus(page, 'Disqualified');
          await openTab(page, 'Qualification');
          await page.locator('textarea[name="disqualifiedReason"]').fill('No fit / budget.');
          await openTab(page, 'Overview');
          await saveLeadUpdate(page);
          continue;
        }

        await setQualificationFields(page);
        await setStatus(page, 'Qualified');
        await saveLeadUpdate(page);

        if (scenario.action === 'convert') {
          await page.locator('button:has-text("Convert lead")').first().click();
          await page.waitForURL('**/app/leads/**/convert');
          const [convertResponse] = await Promise.all([
            page.waitForResponse(
              (response) => response.url().includes('/convert') && response.request().method() === 'POST'
            ),
            page.locator('form.convert-form button:has-text("Convert lead")').click()
          ]);
          if (!convertResponse.ok()) {
            console.log('convert failed:', convertResponse.status(), await convertResponse.text());
          }
          expect(convertResponse.ok()).toBeTruthy();
          await page.waitForURL('**/app/leads');
        }
      }
    });
  }
});
