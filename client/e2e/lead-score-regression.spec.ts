import { expect, test } from '@playwright/test';

const API_BASE_URL =
  process.env.API_BASE_URL ??
  process.env.E2E_API_URL ??
  'https://crm-enterprise-api-dev-01122345.azurewebsites.net';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

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
    throw new Error('Unable to authenticate against the API for score regression test.');
  }

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto('/app/dashboard');
  return payload.accessToken as string;
}

async function openSelect(page, selector) {
  const selectHost = page.locator(selector);
  await selectHost.waitFor({ state: 'visible' });
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
  } else {
    await selectHost.click({ force: true });
  }
}

async function selectByLabel(page, selector, optionText) {
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  const option = options.filter({ hasText: optionText }).first();
  let visible = false;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await openSelect(page, selector);
    try {
      await option.waitFor({ state: 'visible', timeout: 2000 });
      visible = true;
      break;
    } catch {
      await page.keyboard.press('Escape').catch(() => null);
      await page.waitForTimeout(150);
    }
  }
  if (!visible) {
    throw new Error(`Option "${optionText}" not visible for selector ${selector}`);
  }
  await option.click({ force: true });
}

async function getLeadScore(page): Promise<number> {
  const chip = page.locator('.lead-sticky-meta .score-chip').first();
  await chip.waitFor({ state: 'visible' });
  const text = (await chip.textContent()) ?? '';
  const match = text.match(/(\d+)\s*\/\s*100/i);
  if (!match) {
    throw new Error(`Unable to parse lead score from chip text: ${text}`);
  }
  return Number(match[1]);
}

async function getQualificationScore(page): Promise<number> {
  const chip = page.locator('.lead-sticky-meta .confidence-chip').first();
  await chip.waitFor({ state: 'visible' });
  const text = (await chip.textContent()) ?? '';
  const match = text.match(/(\d+)\s*\/\s*100/i);
  return match ? Number(match[1]) : 0;
}

test('lead score stays data-driven while qualification score increases with positive factors', async ({ page, request }) => {
  await login(page, request);
  const suffix = Date.now();
  const firstName = `ScoreCheck${suffix}`;
  const lastName = 'Positive';
  await page.goto('/app/leads/new');
  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="companyName"]').fill(`Blue Harbor Logistics ${suffix}`);
  await page.locator('input[name="email"]').fill(`scorecheck${suffix}@blueharborlogistics.com`);
  await page.locator('input[name="jobTitle"]').fill('Ops Director');
  await page.locator('input[name="source"]').fill('Referral');
  await page.locator('input[name="territory"]').fill('West');
  const createPromise = page.waitForResponse(
    (response) => response.url().includes('/api/leads') && response.request().method() === 'POST',
    { timeout: 30_000 }
  );
  await page.locator('button[type="submit"]').click();
  const createResponse = await createPromise;
  if (!createResponse.ok()) {
    // eslint-disable-next-line no-console
    console.log('create lead via UI failed:', createResponse.status(), await createResponse.text());
  }
  expect(createResponse.ok()).toBeTruthy();
  await page.waitForURL('**/app/leads/**/edit');
  await page.locator('form.lead-form').waitFor({ state: 'visible' });
  await page.locator('.lead-tab', { hasText: 'Qualification' }).first().click({ force: true });

  const qualificationCheckpoints: number[] = [];
  qualificationCheckpoints.push(await getQualificationScore(page));

  await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Budget allocated and approved');
  qualificationCheckpoints.push(await getQualificationScore(page));
  const leadScoreBaseline = await getLeadScore(page);

  await selectByLabel(page, 'p-select[name="readinessToSpend"]', 'Internal decision in progress');
  qualificationCheckpoints.push(await getQualificationScore(page));
  await expect.poll(() => getLeadScore(page)).toBe(leadScoreBaseline);

  await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'Decision date confirmed internally');
  qualificationCheckpoints.push(await getQualificationScore(page));
  await expect.poll(() => getLeadScore(page)).toBe(leadScoreBaseline);

  await selectByLabel(page, 'p-select[name="problemSeverity"]', 'Critical business impact');
  qualificationCheckpoints.push(await getQualificationScore(page));
  await expect.poll(() => getLeadScore(page)).toBe(leadScoreBaseline);

  await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Buyer engaged in discussion');
  qualificationCheckpoints.push(await getQualificationScore(page));
  await expect.poll(() => getLeadScore(page)).toBe(leadScoreBaseline);

  await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong ICP fit');
  qualificationCheckpoints.push(await getQualificationScore(page));
  await expect.poll(() => getLeadScore(page)).toBe(leadScoreBaseline);

  for (let i = 1; i < qualificationCheckpoints.length; i += 1) {
    expect(qualificationCheckpoints[i]).toBeGreaterThanOrEqual(qualificationCheckpoints[i - 1]);
  }
});
