import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE_URL = process.env.E2E_BASE_URL ?? '';

function isLocal(url: string): boolean {
  return url.includes('localhost') || url.includes('127.0.0.1');
}

function makeAlphaSuffix(length = 6): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

type LeadScenario = {
  key: 'E' | 'F' | 'G' | 'H' | 'I';
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phoneE164: string;
  jobTitle: string;
  source: string;
  territory: string;
  status: 'Qualified' | 'Nurture' | 'Disqualified' | 'Lost';
  qualification: {
    budgetAvailability: string;
    readinessToSpend: string;
    buyingTimeline: string;
    problemSeverity: string;
    economicBuyer: string;
    icpFit: string;
  };
  expectedQualificationScore: number;
  qualifiedNotes?: string;
  nurtureFollowUpOffsetDays?: number;
  disqualifiedReason?: string;
  lossReason?: string;
  lossCompetitor?: string;
  lossNotes?: string;
};

// Local-only seeding helper:
// - Keep names/company realistic (no numeric suffixes)
// - Ensure uniqueness via email alias to avoid duplicate blocking across runs
const suffix = makeAlphaSuffix();

const scenarios: LeadScenario[] = [
  {
    key: 'E',
    firstName: 'Elena',
    lastName: 'Brooks',
    companyName: 'Northwind Bio',
    email: `elena.brooks.${suffix}@northwindbio.test`,
    phoneE164: '+14155550101',
    jobTitle: 'COO',
    source: 'Partner',
    territory: 'West',
    status: 'Qualified',
    qualification: {
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Ready to proceed pending final step',
      buyingTimeline: 'Decision date confirmed internally',
      problemSeverity: 'Critical business impact',
      economicBuyer: 'Buyer engaged in discussion',
      icpFit: 'Strong ICP fit'
    },
    expectedQualificationScore: 100,
    qualifiedNotes: 'Executive urgency, budget approved, decision date confirmed.'
  },
  {
    key: 'F',
    firstName: 'Noah',
    lastName: 'Stone',
    companyName: 'Atlas Retail Ops',
    email: `noah.stone.${suffix}@atlasretail.test`,
    phoneE164: '+13125550102',
    jobTitle: 'Operations Manager',
    source: 'Web',
    territory: 'Midwest',
    status: 'Qualified',
    qualification: {
      budgetAvailability: 'Indicative range mentioned',
      readinessToSpend: 'Actively evaluating solutions',
      buyingTimeline: 'Rough timeline mentioned',
      problemSeverity: 'Recognized operational problem',
      economicBuyer: 'Buyer identified, not engaged',
      icpFit: 'Partial ICP fit'
    },
    expectedQualificationScore: 54,
    qualifiedNotes: 'Good momentum, moderate evidence, buyer not fully engaged yet.'
  },
  {
    key: 'G',
    firstName: 'Lina',
    lastName: 'Park',
    companyName: 'Harborline Labs',
    email: `lina.park.${suffix}@harborlinelabs.test`,
    phoneE164: '+12025550103',
    jobTitle: 'Supply Chain Lead',
    source: 'Referral',
    territory: 'East',
    status: 'Nurture',
    qualification: {
      budgetAvailability: 'Budget identified but unapproved',
      readinessToSpend: 'Interest expressed, no urgency',
      buyingTimeline: 'No defined timeline',
      problemSeverity: 'Mild inconvenience',
      economicBuyer: 'Influencer identified',
      icpFit: 'Partial ICP fit'
    },
    expectedQualificationScore: 35,
    nurtureFollowUpOffsetDays: 45
  },
  {
    key: 'H',
    firstName: 'Ravi',
    lastName: 'Cole',
    companyName: 'QuickServe Mini',
    email: `ravi.cole.${suffix}@quickservemini.test`,
    phoneE164: '+16465550104',
    jobTitle: 'Store Manager',
    source: 'Cold outbound',
    territory: 'East',
    status: 'Disqualified',
    qualification: {
      budgetAvailability: 'No defined budget',
      readinessToSpend: 'Not planning to spend',
      buyingTimeline: 'Unknown / not discussed',
      problemSeverity: 'Mild inconvenience',
      economicBuyer: 'Unknown / not identified',
      icpFit: 'Clearly out of ICP'
    },
    expectedQualificationScore: 7,
    disqualifiedReason: 'No budget and out of ICP'
  },
  {
    key: 'I',
    firstName: 'Sofia',
    lastName: 'Nolan',
    companyName: 'Meridian Edge',
    email: `sofia.nolan.${suffix}@meridianedge.test`,
    phoneE164: '+17185550105',
    jobTitle: 'VP Operations',
    source: 'Partner',
    territory: 'East',
    status: 'Lost',
    qualification: {
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Actively evaluating solutions',
      buyingTimeline: 'Target date verbally confirmed',
      problemSeverity: 'High business impact',
      economicBuyer: 'Buyer engaged in discussion',
      icpFit: 'Strong ICP fit'
    },
    expectedQualificationScore: 87,
    lossReason: 'Selected competitor',
    lossCompetitor: 'Competitor X',
    lossNotes: 'Procurement preferred incumbent timeline.'
  }
];

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) {
    throw new Error('Unable to authenticate against API for local seeding.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto('/app/dashboard');
  return payload.accessToken as string;
}

async function openSelect(page, selector: string) {
  const host = page.locator(`${selector}:visible`).first();
  await host.waitFor({ state: 'visible' });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
    return;
  }
  await host.first().click({ force: true });
}

async function selectByLabel(page, selector: string, optionText: string) {
  const option = page.getByRole('option', { name: optionText, exact: true });
  for (let i = 0; i < 3; i += 1) {
    await openSelect(page, selector);
    try {
      await option.waitFor({ state: 'visible', timeout: 2_500 });
      await option.click({ force: true });
      return;
    } catch {
      await page.keyboard.press('Escape').catch(() => null);
      await page.waitForTimeout(120);
    }
  }
  throw new Error(`Option "${optionText}" not found for ${selector}.`);
}

async function trySelectByLabel(page, selector: string, optionText: string): Promise<boolean> {
  try {
    await selectByLabel(page, selector, optionText);
    return true;
  } catch {
    return false;
  }
}

function leadIdFromUrl(page): string {
  const match = page.url().match(/\/app\/leads\/([^/]+)\/edit/);
  if (!match?.[1]) {
    throw new Error(`Unable to parse lead id from url: ${page.url()}`);
  }
  return match[1];
}

function nationalNumberFromE164(phoneE164: string): string {
  return phoneE164.replace(/^\+1/, '').replace(/[^\d]/g, '');
}

async function fillPhoneField(page, phoneE164: string) {
  const national = nationalNumberFromE164(phoneE164);
  const phoneNumberInput = page.locator('input[name="phoneNumber"]');
  if (await phoneNumberInput.count()) {
    await phoneNumberInput.first().fill(national);
    return;
  }
  const legacyPhoneInput = page.locator('input[name="phone"]');
  if (await legacyPhoneInput.count()) {
    await legacyPhoneInput.first().fill(phoneE164);
  }
}

async function openLeadTab(page, tabLabel: string) {
  const tabByRole = page.getByRole('tab', { name: new RegExp(tabLabel, 'i') }).first();
  if (await tabByRole.count()) {
    for (let i = 0; i < 3; i += 1) {
      await tabByRole.click({ force: true });
      const selected = await tabByRole.getAttribute('aria-selected');
      if (selected === 'true') {
        return;
      }
      await page.waitForTimeout(120);
    }
  }

  const tabByClass = page.locator('.lead-tab:visible', { hasText: tabLabel }).first();
  await tabByClass.waitFor({ state: 'visible' });
  for (let i = 0; i < 3; i += 1) {
    await tabByClass.click({ force: true });
    const selected = await tabByClass.getAttribute('aria-selected');
    if (selected === 'true') {
      return;
    }
    await page.waitForTimeout(120);
  }
}

async function createLeadOverview(page, scenario: LeadScenario): Promise<string> {
  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  await page.locator('input[name="firstName"]').fill(scenario.firstName);
  await page.locator('input[name="lastName"]').fill(scenario.lastName);
  await page.locator('input[name="companyName"]').fill(scenario.companyName);
  await page.locator('input[name="email"]').fill(scenario.email);
  await page.locator('input[name="jobTitle"]').fill(scenario.jobTitle);
  await page.locator('input[name="source"]').fill(scenario.source);
  await page.locator('input[name="territory"]').fill(scenario.territory);

  await trySelectByLabel(page, 'p-select[name="assignmentStrategy"]', 'Manual');
  await trySelectByLabel(page, 'p-select[name="phoneTypeId"]', 'Mobile');
  await trySelectByLabel(page, 'p-select[name="phoneCountry"]', 'United States');
  await fillPhoneField(page, scenario.phoneE164);

  const createResponsePromise = page.waitForResponse(
    (res) => res.url().includes('/api/leads') && res.request().method() === 'POST',
    { timeout: 30_000 }
  );
  await page.locator('button:has-text("Create lead")').click();
  const createResponse = await createResponsePromise;
  if (!createResponse.ok()) {
    throw new Error(`Create lead failed (${scenario.key}): ${createResponse.status()} ${await createResponse.text()}`);
  }
  await page.waitForURL('**/app/leads/**/edit', { timeout: 30_000 });
  return leadIdFromUrl(page);
}

async function createDiscoveryMeeting(request, token: string, leadId: string) {
  const nowIso = new Date().toISOString();
  const nextStepIso = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default',
      'Content-Type': 'application/json'
    },
    data: {
      subject: 'Discovery meeting',
      description: 'Scenario seed discovery call.',
      outcome: 'Connected',
      type: 'Meeting',
      priority: 'High',
      dueDateUtc: nowIso,
      completedDateUtc: nowIso,
      nextStepSubject: 'Scenario follow-up',
      nextStepDueDateUtc: nextStepIso,
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null
    }
  });
  if (!response.ok()) {
    throw new Error(`Discovery meeting create failed for ${leadId}: ${response.status()} ${await response.text()}`);
  }
}

async function setNurtureDate(page, offsetDays: number) {
  const input = page.locator('p-datepicker[name="nurtureFollowUpAtUtc"] input');
  await input.waitFor({ state: 'visible' });
  await input.click();
  const dialog = page.getByRole('dialog', { name: 'Choose Date' });
  await dialog.waitFor({ state: 'visible' });

  const target = new Date();
  target.setDate(target.getDate() + offsetDays);
  const day = target.getDate().toString();

  for (let i = 0; i < 12; i += 1) {
    const monthButton = dialog.locator('button[aria-label="Choose Month"]');
    const yearButton = dialog.locator('button[aria-label="Choose Year"]');
    const monthText = (await monthButton.innerText()).trim();
    const yearText = Number((await yearButton.innerText()).trim());
    const monthIndex = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ].indexOf(monthText);
    if (monthIndex === target.getMonth() && yearText === target.getFullYear()) {
      break;
    }
    await dialog.getByRole('button', { name: 'Next Month' }).click();
    await page.waitForTimeout(80);
  }

  await dialog.getByRole('gridcell', { name: day }).first().click();
  await input.press('Tab');
}

async function fillQualificationAndStatus(page, scenario: LeadScenario) {
  await openLeadTab(page, 'Overview');
  await selectByLabel(page, 'p-select[name="status"]', scenario.status);

  await openLeadTab(page, 'Qualification');
  await page.locator('p-tabpanel[value="qualification"] .form-section--qualification:visible').first().waitFor({ state: 'visible' });
  await page.locator('p-select[name="budgetAvailability"]:visible').first().waitFor({ state: 'visible' });

  await selectByLabel(page, 'p-select[name="budgetAvailability"]', scenario.qualification.budgetAvailability);
  await selectByLabel(page, 'p-select[name="readinessToSpend"]', scenario.qualification.readinessToSpend);
  await selectByLabel(page, 'p-select[name="buyingTimeline"]', scenario.qualification.buyingTimeline);
  await selectByLabel(page, 'p-select[name="problemSeverity"]', scenario.qualification.problemSeverity);
  await selectByLabel(page, 'p-select[name="economicBuyer"]', scenario.qualification.economicBuyer);
  await selectByLabel(page, 'p-select[name="icpFit"]', scenario.qualification.icpFit);

  if (scenario.qualifiedNotes) {
    await page.locator('textarea[name="qualifiedNotes"]').fill(scenario.qualifiedNotes);
  }
  if (scenario.nurtureFollowUpOffsetDays) {
    await setNurtureDate(page, scenario.nurtureFollowUpOffsetDays);
  }
  if (scenario.disqualifiedReason) {
    await page.locator('textarea[name="disqualifiedReason"]').fill(scenario.disqualifiedReason);
  }
  if (scenario.lossReason) {
    await page.locator('textarea[name="lossReason"]').fill(scenario.lossReason);
  }
  if (scenario.lossCompetitor) {
    await page.locator('input[name="lossCompetitor"]').fill(scenario.lossCompetitor);
  }
  if (scenario.lossNotes) {
    await page.locator('textarea[name="lossNotes"]').fill(scenario.lossNotes);
  }

  await openLeadTab(page, 'Overview');
}

async function saveLead(page) {
  const updateButton = page.locator('button:has-text("Update lead")');
  await updateButton.waitFor({ state: 'visible' });
  await expect(updateButton).toBeEnabled();

  const updateResponsePromise = page.waitForResponse(
    (res) => res.url().includes('/api/leads/') && res.request().method() === 'PUT',
    { timeout: 30_000 }
  );
  await updateButton.click();
  const updateResponse = await updateResponsePromise;
  if (!updateResponse.ok()) {
    throw new Error(`Update lead failed: ${updateResponse.status()} ${await updateResponse.text()}`);
  }
}

async function fetchLeadScore(request, token: string, leadId: string): Promise<number> {
  const response = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  if (!response.ok()) {
    throw new Error(`Lead fetch failed for ${leadId}: ${response.status()} ${await response.text()}`);
  }
  const lead = await response.json();
  return Number(lead.score ?? 0);
}

test('seed extra local lead scenarios with varied scores via UI', async ({ page, request }) => {
  // Guardrail: never run against Azure/dev/prod. This spec creates leads/activities.
  test.skip(!BASE_URL || !isLocal(BASE_URL) || !isLocal(API_BASE_URL), 'Local-only seeding spec.');

  test.setTimeout(480_000);
  const token = await login(page, request);

  const created: Array<{ key: string; leadId: string; expectedQualificationScore: number; savedScore: number }> = [];

  for (const scenario of scenarios) {
    const leadId = await createLeadOverview(page, scenario);
    if (scenario.status === 'Qualified') {
      await createDiscoveryMeeting(request, token, leadId);
      await page.reload();
      await page.locator('form.lead-form').waitFor({ state: 'visible' });
    }

    await fillQualificationAndStatus(page, scenario);
    await saveLead(page);
    const savedScore = await fetchLeadScore(request, token, leadId);
    created.push({
      key: scenario.key,
      leadId,
      expectedQualificationScore: scenario.expectedQualificationScore,
      savedScore
    });
  }

  const distinctScores = new Set(created.map((item) => item.savedScore));
  expect(distinctScores.size).toBeGreaterThanOrEqual(4);

  console.log('Extra lead scenarios seeded (local):');
  for (const row of created) {
    console.log(
      `Scenario ${row.key} -> leadId=${row.leadId}, qualificationScoreExpected=${row.expectedQualificationScore}, savedOverallScore=${row.savedScore}`
    );
  }
});
