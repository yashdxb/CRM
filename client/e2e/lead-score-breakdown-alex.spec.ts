import { expect, test } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const ALEX_LEAD_ID = process.env.E2E_ALEX_LEAD_ID ?? 'a898eab9-cbe2-479e-9c0a-b1df3f912a79';

function toKey(value?: string | null): string {
  return (value ?? '').trim().toLowerCase();
}

function budgetScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'budget allocated and approved': return 25;
    case 'budget identified but unapproved':
    case 'indicative range mentioned': return 15;
    case 'no defined budget': return 5;
    default: return 0;
  }
}

function readinessScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'internal decision in progress':
    case 'ready to proceed pending final step': return 20;
    case 'actively evaluating solutions': return 15;
    case 'interest expressed, no urgency': return 8;
    default: return 0;
  }
}

function timelineScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'decision date confirmed internally': return 15;
    case 'target date verbally confirmed': return 12;
    case 'rough timeline mentioned': return 6;
    default: return 0;
  }
}

function problemScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'executive-level priority':
    case 'critical business impact': return 20;
    case 'recognized operational problem': return 8;
    case 'mild inconvenience': return 2;
    default: return 0;
  }
}

function economicBuyerScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'buyer engaged in discussion':
    case 'buyer verbally supportive': return 10;
    case 'buyer identified, not engaged':
    case 'influencer identified': return 5;
    default: return 0;
  }
}

function icpScore(value?: string | null): number {
  switch (toKey(value)) {
    case 'strong icp fit': return 10;
    case 'partial icp fit':
    case 'out-of-profile but exploratory': return 5;
    default: return 0;
  }
}

function buyerDataQualityScore(fields: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source?: string;
}): number {
  const weights = {
    firstNameLastName: 16,
    email: 24,
    phone: 24,
    company: 16,
    jobTitle: 12,
    source: 8
  };
  const total = 100;
  let earned = 0;
  if ((fields.firstName ?? '').trim() && (fields.lastName ?? '').trim()) earned += weights.firstNameLastName;
  if ((fields.email ?? '').trim()) earned += weights.email;
  if ((fields.phone ?? '').trim()) earned += weights.phone;
  if ((fields.company ?? '').trim()) earned += weights.company;
  if ((fields.jobTitle ?? '').trim()) earned += weights.jobTitle;
  if ((fields.source ?? '').trim()) earned += weights.source;
  return Math.max(0, Math.min(100, Math.round((earned / total) * 100)));
}

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) throw new Error('Unable to authenticate for Alex score breakdown.');

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto('/app/leads');
}

function parseChipScore(text: string | null): number {
  const match = (text ?? '').match(/(\d+)\s*\/\s*(\d+)/);
  if (!match) return 0;
  return Number(match[1]);
}

test('Alex Johnson score breakdown audit', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`/app/leads/${ALEX_LEAD_ID}/edit`);
  await page.waitForURL('**/app/leads/**/edit');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });

  const leadScoreText = await page.locator('.lead-sticky-meta .score-chip').first().textContent();
  const uiLeadScore = parseChipScore(leadScoreText);

  const firstName = await page.locator('input[name="firstName"]').inputValue();
  const lastName = await page.locator('input[name="lastName"]').inputValue();
  const company = await page.locator('input[name="companyName"]').inputValue();
  const email = await page.locator('input[name="email"]').inputValue();
  const jobTitle = await page.locator('input[name="jobTitle"]').inputValue();
  const source = await page.locator('input[name="source"]').inputValue();

  let phone = '';
  const phoneMasked = page.locator('p-inputmask[name="phoneNumber"] input');
  if (await phoneMasked.count()) {
    phone = await phoneMasked.first().inputValue();
  } else {
    const phonePlain = page.locator('input[name="phoneNumberPlain"]');
    if (await phonePlain.count()) phone = await phonePlain.first().inputValue();
  }

  await page.locator('.lead-tab', { hasText: 'Qualification' }).first().click({ force: true });

  const budget = await page.locator('p-select[name="budgetAvailability"] .p-select-label').first().textContent();
  const readiness = await page.locator('p-select[name="readinessToSpend"] .p-select-label').first().textContent();
  const timeline = await page.locator('p-select[name="buyingTimeline"] .p-select-label').first().textContent();
  const problem = await page.locator('p-select[name="problemSeverity"] .p-select-label').first().textContent();
  const economic = await page.locator('p-select[name="economicBuyer"] .p-select-label').first().textContent();
  const icp = await page.locator('p-select[name="icpFit"] .p-select-label').first().textContent();

  const dataQuality = buyerDataQualityScore({ firstName, lastName, email, phone, company, jobTitle, source });
  const qRaw =
    budgetScore(budget) +
    readinessScore(readiness) +
    timelineScore(timeline) +
    problemScore(problem) +
    economicBuyerScore(economic) +
    icpScore(icp);
  const qualification = qRaw;
  const computedOverall = dataQuality;

  // eslint-disable-next-line no-console
  console.log('Alex score breakdown:', JSON.stringify({
    uiLeadScore,
    dataQuality,
    qualificationRaw100: qRaw,
    qualification100: qualification,
    computedOverall,
    factors: { budget, readiness, timeline, problem, economic, icp }
  }));

  expect(uiLeadScore).toBe(computedOverall);
});
