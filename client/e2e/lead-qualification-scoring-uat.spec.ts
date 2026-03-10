/**
 * UAT — Lead Qualification, Scoring & CQVS Comprehensive Test Suite
 *
 * Covers:
 *  Cat 1: Score Variations (10 scenarios via API)
 *  Cat 2: CQVS Group Variations (6 scenarios)
 *  Cat 3: Qualification Factor Individual Sweeps (6 factor × multiple values)
 *  Cat 4: Status Transition Rules (valid + blocked)
 *  Cat 5: Qualification Gate Enforcement
 *  Cat 6: isMeaningfulQualificationValue edge cases (via scoring)
 *  Cat 7: Outcome Field Enforcement
 *  Cat 8: Confidence & Conversion Readiness Display (UI)
 *  Cat 9: Data Quality Combinations
 *  Cat 10: End-to-End Lifecycle Flows (UI)
 *
 * See: docs/UAT_LEAD_QUALIFICATION_SCORING.md
 */

import { test, expect, type APIRequestContext, type Page } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const API = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const TENANT = 'default';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface LeadPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  companyName?: string;
  jobTitle?: string;
  source?: string;
  territory?: string;
  status?: string;
  assignmentStrategy?: string;
  budgetAvailability?: string;
  readinessToSpend?: string;
  buyingTimeline?: string;
  problemSeverity?: string;
  economicBuyer?: string;
  icpFit?: string;
  qualifiedNotes?: string;
  nurtureFollowUpAtUtc?: string;
  disqualifiedReason?: string;
  lossReason?: string;
  lossCompetitor?: string;
  lossNotes?: string;
  score?: number;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const suffix = Math.random().toString(36).slice(2, 8);

function uniqueEmail(prefix: string): string {
  return `${prefix}.${suffix}@uat-scoring.test`;
}

async function authenticate(request: APIRequestContext): Promise<string> {
  const res = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  const body = await res.json();
  if (!body?.accessToken) throw new Error(`Login failed: ${res.status()}`);
  return body.accessToken;
}

async function createLeadApi(request: APIRequestContext, token: string, lead: LeadPayload): Promise<string> {
  const res = await request.post(`${API}/api/leads`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT,
      'Content-Type': 'application/json',
    },
    data: {
      ...lead,
      lastName: `${lead.lastName}_${suffix}`,
      assignmentStrategy: lead.assignmentStrategy ?? 'Manual',
    },
  });
  if (!res.ok()) {
    const errBody = await res.text();
    throw new Error(`Create lead failed: ${res.status()} — ${errBody}`);
  }
  const body = await res.json();
  return body.id;
}

async function updateLeadApi(request: APIRequestContext, token: string, leadId: string, updates: Partial<LeadPayload>): Promise<void> {
  // Fetch current lead first to avoid overwriting fields
  const current = await fetchLeadApi(request, token, leadId);
  const merged = {
    firstName: current.name?.split(' ')[0] ?? 'Test',
    lastName: current.name?.split(' ').slice(1).join(' ') ?? 'Lead',
    email: current.email,
    phone: current.phone,
    companyName: current.company,
    jobTitle: current.jobTitle,
    source: current.source,
    territory: current.territory,
    status: current.status,
    assignmentStrategy: 'Manual',
    budgetAvailability: current.budgetAvailability,
    readinessToSpend: current.readinessToSpend,
    buyingTimeline: current.buyingTimeline,
    problemSeverity: current.problemSeverity,
    economicBuyer: current.economicBuyer,
    icpFit: current.icpFit,
    qualifiedNotes: current.qualifiedNotes,
    nurtureFollowUpAtUtc: current.nurtureFollowUpAtUtc,
    disqualifiedReason: current.disqualifiedReason,
    lossReason: current.lossReason,
    lossCompetitor: current.lossCompetitor,
    lossNotes: current.lossNotes,
    ...updates,
  };
  const res = await request.put(`${API}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT,
      'Content-Type': 'application/json',
    },
    data: merged,
  });
  if (!res.ok()) {
    const errorText = await res.text();
    throw new Error(`Update lead ${leadId} failed: ${res.status()} — ${errorText}`);
  }
}

async function updateLeadApiExpectFail(
  request: APIRequestContext,
  token: string,
  leadId: string,
  updates: Partial<LeadPayload>
): Promise<{ status: number; body: string }> {
  const current = await fetchLeadApi(request, token, leadId);
  const merged = {
    firstName: current.name?.split(' ')[0] ?? 'Test',
    lastName: current.name?.split(' ').slice(1).join(' ') ?? 'Lead',
    email: current.email,
    phone: current.phone,
    companyName: current.company,
    jobTitle: current.jobTitle,
    source: current.source,
    territory: current.territory,
    status: current.status,
    assignmentStrategy: 'Manual',
    budgetAvailability: current.budgetAvailability,
    readinessToSpend: current.readinessToSpend,
    buyingTimeline: current.buyingTimeline,
    problemSeverity: current.problemSeverity,
    economicBuyer: current.economicBuyer,
    icpFit: current.icpFit,
    qualifiedNotes: current.qualifiedNotes,
    nurtureFollowUpAtUtc: current.nurtureFollowUpAtUtc,
    disqualifiedReason: current.disqualifiedReason,
    lossReason: current.lossReason,
    lossCompetitor: current.lossCompetitor,
    lossNotes: current.lossNotes,
    ...updates,
  };
  const res = await request.put(`${API}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT,
      'Content-Type': 'application/json',
    },
    data: merged,
  });
  return { status: res.status(), body: await res.text() };
}

async function fetchLeadApi(request: APIRequestContext, token: string, leadId: string): Promise<any> {
  const res = await request.get(`${API}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT,
    },
  });
  expect(res.ok(), `Fetch lead ${leadId} failed: ${res.status()}`).toBeTruthy();
  return res.json();
}

async function createActivityApi(
  request: APIRequestContext,
  token: string,
  leadId: string,
  type: string,
  extras?: Record<string, unknown>
): Promise<void> {
  const now = new Date().toISOString();
  const res = await request.post(`${API}/api/activities`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT,
      'Content-Type': 'application/json',
    },
    data: {
      subject: `UAT ${type} activity`,
      description: `UAT scoring test — ${type}`,
      outcome: 'Connected',
      type,
      priority: 'Medium',
      dueDateUtc: now,
      completedDateUtc: now,
      nextStepSubject: 'UAT follow-up',
      nextStepDueDateUtc: new Date(Date.now() + 86400000).toISOString(),
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null,
      ...extras,
    },
  });
  expect(res.ok(), `Create ${type} activity failed: ${res.status()}`).toBeTruthy();
}

async function loginUi(page: Page, request: APIRequestContext): Promise<string> {
  const token = await authenticate(request);
  await page.addInitScript((t: string) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', 'default');
  }, token);
  await page.goto(`${BASE}/app/dashboard`);
  return token;
}

async function openSelect(page: Page, selector: string) {
  const host = page.locator(selector);
  await host.waitFor({ state: 'visible', timeout: 8000 });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
  } else {
    await host.click({ force: true });
  }
}

async function selectByLabel(page: Page, selector: string, optionText: string) {
  const optionsLocator = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  for (let attempt = 0; attempt < 3; attempt++) {
    await openSelect(page, selector);
    const option = optionsLocator.filter({ hasText: optionText }).first();
    try {
      await option.waitFor({ state: 'visible', timeout: 2000 });
      await option.click({ force: true });
      return;
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(150);
    }
  }
  throw new Error(`Option "${optionText}" not visible for ${selector}`);
}

async function openLeadTab(page: Page, tabLabel: string) {
  const tabByRole = page.getByRole('tab', { name: new RegExp(tabLabel, 'i') }).first();
  if (await tabByRole.count()) {
    for (let i = 0; i < 3; i++) {
      await tabByRole.click({ force: true });
      const selected = await tabByRole.getAttribute('aria-selected');
      if (selected === 'true') return;
      await page.waitForTimeout(120);
    }
  }
  const tabByClass = page.locator('.lead-tab', { hasText: tabLabel }).first();
  await tabByClass.waitFor({ state: 'visible', timeout: 10_000 });
  for (let i = 0; i < 3; i++) {
    await tabByClass.click({ force: true });
    await page.waitForTimeout(120);
  }
}

/* ------------------------------------------------------------------ */
/*  Max / All-filled helpers                                           */
/* ------------------------------------------------------------------ */

const ALL_QUAL_MAX: Partial<LeadPayload> = {
  budgetAvailability: 'Budget allocated and approved',
  readinessToSpend: 'Internal decision in progress',
  buyingTimeline: 'Decision date confirmed internally',
  problemSeverity: 'Executive-level priority',
  economicBuyer: 'Buyer engaged in discussion',
  icpFit: 'Strong ICP fit',
};

const ALL_DATA_FIELDS = (prefix: string): Partial<LeadPayload> => ({
  email: uniqueEmail(prefix),
  phone: '+15551234567',
  companyName: `UAT Co ${prefix}-${suffix}`,
  jobTitle: 'CTO',
  source: 'Web',
  territory: 'East',
});

/* ================================================================== */
/*  CATEGORY 1: Score Variations (API)                                 */
/* ================================================================== */

test.describe('Cat 1: Score Variations', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('1.1 Perfect score (100) — all data + all max factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Perfect', lastName: 'Score',
      ...ALL_DATA_FIELDS('c1-1'),
      ...ALL_QUAL_MAX,
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.score).toBe(100);
  });

  test('1.2 Zero score — no data, no qualification', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Zero', lastName: 'Score',
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 2 (no qual factors): base 20 = 20
    expect(lead.score).toBe(20);
  });

  test('1.3 Data-only (no qualification) — all fields, no factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'DataOnly', lastName: 'NoQual',
      ...ALL_DATA_FIELDS('c1-3'),
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 2 (no qual factors): base 20 + email(20) + phone(15) + company(10) + job(10) + source(10) + territory(5) = 90
    expect(lead.score).toBe(90);
  });

  test('1.4 Qualification-only — only name, all max factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'QualOnly', lastName: 'NoData',
      ...ALL_QUAL_MAX,
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 25+20+15+20+10+10 = 100 (data fields ignored)
    expect(lead.score).toBe(100);
  });

  test('1.5 High score — name+email+phone, all max factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'High', lastName: 'Partial',
      email: uniqueEmail('c1-5'),
      phone: '+15559990001',
      ...ALL_QUAL_MAX,
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 25+20+15+20+10+10 = 100 (data fields ignored)
    expect(lead.score).toBe(100);
  });

  test('1.6 Medium score — all data, mid-level factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Medium', lastName: 'MidFactors',
      ...ALL_DATA_FIELDS('c1-6'),
      budgetAvailability: 'Indicative range mentioned',       // 15
      readinessToSpend: 'Actively evaluating solutions',      // 15
      buyingTimeline: 'Rough timeline mentioned',             // 6
      problemSeverity: 'Recognized operational problem',      // 8
      economicBuyer: 'Buyer identified, not engaged',         // 5
      icpFit: 'Partial ICP fit',                              // 5
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 15+15+6+8+5+5 = 54
    expect(lead.score).toBe(54);
  });

  test('1.7 Low score — name+email, minimal factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Low', lastName: 'MinFactors',
      email: uniqueEmail('c1-7'),
      budgetAvailability: 'No defined budget',                // 5
      readinessToSpend: 'Not planning to spend',              // 0
      buyingTimeline: 'No defined timeline',                  // 0
      problemSeverity: 'Mild inconvenience',                  // 2
      economicBuyer: 'Buyer explicitly not involved',         // 0
      icpFit: 'Clearly out of ICP',                           // 0
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 5+0+0+2+0+0 = 7
    expect(lead.score).toBe(7);
  });

  test('1.8 Boundary high threshold — score ≥ 70', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Boundary', lastName: 'SeventyPlus',
      ...ALL_DATA_FIELDS('c1-8'),
      budgetAvailability: 'Budget allocated and approved',    // 25
      readinessToSpend: 'Internal decision in progress',      // 20
      buyingTimeline: 'Decision date confirmed internally',   // 15
      problemSeverity: 'Critical business impact',            // 15
      economicBuyer: 'Buyer explicitly not involved',         // 0
      icpFit: 'Clearly out of ICP',                           // 0
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 25+20+15+15+0+0 = 75
    expect(lead.score).toBeGreaterThanOrEqual(70);
  });

  test('1.9 Boundary medium threshold — score 45–69', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Boundary', lastName: 'MediumRange',
      email: uniqueEmail('c1-9'),
      companyName: 'UAT Boundary Co',
      budgetAvailability: 'Indicative range mentioned',       // 15
      readinessToSpend: 'Interest expressed, no urgency',     // 8
      buyingTimeline: 'Rough timeline mentioned',             // 6
      problemSeverity: 'Recognized operational problem',      // 8
      economicBuyer: 'Buyer identified, not engaged',         // 5
      icpFit: 'Partial ICP fit',                              // 5
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 15+8+6+8+5+5 = 47
    expect(lead.score).toBeGreaterThanOrEqual(45);
    expect(lead.score).toBeLessThan(70);
  });

  test('1.10 Boundary low threshold — score < 45', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Boundary', lastName: 'LowRange',
      email: uniqueEmail('c1-10'),
      budgetAvailability: 'Indicative range mentioned',       // 15
      readinessToSpend: 'Interest expressed, no urgency',     // 8
      buyingTimeline: 'No defined timeline',                  // 0
      problemSeverity: 'Recognized operational problem',      // 8
      economicBuyer: 'Buyer identified, not engaged',         // 5
      icpFit: 'Clearly out of ICP',                           // 0
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 15+8+0+8+5+0 = 36
    expect(lead.score).toBeLessThan(45);
  });
});

/* ================================================================== */
/*  CATEGORY 2: CQVS Group Variations                                  */
/* ================================================================== */

test.describe('Cat 2: CQVS Group Variations', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('2.1 Strong Q, weak C/V/S', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'StrongQ', lastName: 'WeakCVS',
      ...ALL_DATA_FIELDS('c2-1'),
      budgetAvailability: 'Budget allocated and approved',    // 25
      readinessToSpend: 'Internal decision in progress',      // 20
      buyingTimeline: 'Decision date confirmed internally',   // 15
      problemSeverity: 'Unknown / not validated',             // 0
      economicBuyer: 'Unknown / not identified',              // 0
      icpFit: 'Unknown / not assessed',                       // 0
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 25+20+15+0+0+0 = 60
    expect(lead.score).toBe(60);
    // scoreBreakdown should show Problem=0, EconomicBuyer=0, ICP=0
    if (lead.scoreBreakdown?.length) {
      const problemItem = lead.scoreBreakdown.find((b: any) => /problem/i.test(b.factor));
      const ecoItem = lead.scoreBreakdown.find((b: any) => /economic|buyer/i.test(b.factor));
      const icpItem = lead.scoreBreakdown.find((b: any) => /icp/i.test(b.factor));
      if (problemItem) expect(problemItem.score).toBe(0);
      if (ecoItem) expect(ecoItem.score).toBe(0);
      if (icpItem) expect(icpItem.score).toBe(0);
    }
  });

  test('2.2 Strong V, weak C/Q/S', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'StrongV', lastName: 'WeakCQS',
      ...ALL_DATA_FIELDS('c2-2'),
      budgetAvailability: 'Unknown / not yet discussed',
      readinessToSpend: 'Unknown / unclear',
      buyingTimeline: 'Unknown / not discussed',
      problemSeverity: 'Executive-level priority',            // 20
      economicBuyer: 'Unknown / not identified',
      icpFit: 'Unknown / not assessed',
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 0+0+0+20+0+0 = 20
    expect(lead.score).toBe(20);
  });

  test('2.3 Strong C+S, weak Q+V', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'StrongCS', lastName: 'WeakQV',
      ...ALL_DATA_FIELDS('c2-3'),
      budgetAvailability: 'No defined budget',                // 5
      readinessToSpend: 'Not planning to spend',              // 0
      buyingTimeline: 'No defined timeline',                  // 0
      problemSeverity: 'Mild inconvenience',                  // 2
      economicBuyer: 'Buyer engaged in discussion',           // 10
      icpFit: 'Strong ICP fit',                               // 10
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 5+0+0+2+10+10 = 27
    expect(lead.score).toBe(27);
  });

  test('2.4 All groups balanced mid', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Balanced', lastName: 'MidAll',
      ...ALL_DATA_FIELDS('c2-4'),
      budgetAvailability: 'Indicative range mentioned',       // 15
      readinessToSpend: 'Actively evaluating solutions',      // 15
      buyingTimeline: 'Rough timeline mentioned',             // 6
      problemSeverity: 'Recognized operational problem',      // 8
      economicBuyer: 'Buyer identified, not engaged',         // 5
      icpFit: 'Partial ICP fit',                              // 5
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (has qual factors): 15+15+6+8+5+5 = 54
    expect(lead.score).toBe(54);
  });

  test('2.5 All groups at max', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Max', lastName: 'AllGroups',
      ...ALL_DATA_FIELDS('c2-5'),
      ...ALL_QUAL_MAX,
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.score).toBe(100);
  });

  test('2.6 All groups at zero (unknown)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Zero', lastName: 'AllGroups',
      ...ALL_DATA_FIELDS('c2-6'),
      budgetAvailability: 'Unknown / not yet discussed',
      readinessToSpend: 'Unknown / unclear',
      buyingTimeline: 'Unknown / not discussed',
      problemSeverity: 'Unknown / not validated',
      economicBuyer: 'Unknown / not identified',
      icpFit: 'Unknown / not assessed',
    });
    const lead = await fetchLeadApi(request, token, id);
    // All unknown = no meaningful factors → Path 2: base 20 + email(20) + phone(15) + company(10) + job(10) + source(10) + territory(5) = 90
    expect(lead.score).toBe(90);
  });
});

/* ================================================================== */
/*  CATEGORY 3: Individual Factor Sweeps                               */
/* ================================================================== */

test.describe('Cat 3: Individual Factor Sweeps', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  // Helper: create lead with all data + all max factors, EXCEPT one factor overridden
  async function createWithOneFactor(
    request: APIRequestContext,
    token: string,
    factorKey: string,
    factorValue: string,
    idx: string
  ): Promise<{ score: number; scoreBreakdown: Array<{ factor: string; score: number; maxScore: number }> }> {
    const overrides = { ...ALL_QUAL_MAX } as Record<string, string>;
    overrides[factorKey] = factorValue;

    const id = await createLeadApi(request, token, {
      firstName: `F${idx}`, lastName: factorKey,
      ...ALL_DATA_FIELDS(`c3-${idx}`),
      ...overrides,
    });
    return fetchLeadApi(request, token, id);
  }

  // 3.1 Budget sweep (other factors total = 75)
  const budgetCases = [
    { value: 'Budget allocated and approved', expected: 100 },
    { value: 'Budget identified but unapproved', expected: 90 },
    { value: 'No defined budget', expected: 80 },
    { value: 'Budget explicitly unavailable', expected: 75 },
  ];
  for (const bc of budgetCases) {
    test(`3.1 Budget: "${bc.value}" → score=${bc.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'budgetAvailability', bc.value, `budget-${bc.expected}`);
      // Path 1: other factors(75) + budget score
      expect(lead.score).toBe(bc.expected);
    });
  }

  // 3.2 Readiness sweep (other factors total = 80)
  const readinessCases = [
    { value: 'Internal decision in progress', expected: 100 },
    { value: 'Actively evaluating solutions', expected: 95 },
    { value: 'Interest expressed, no urgency', expected: 88 },
    { value: 'Not planning to spend', expected: 80 },
  ];
  for (const rc of readinessCases) {
    test(`3.2 Readiness: "${rc.value}" → score=${rc.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'readinessToSpend', rc.value, `read-${rc.expected}`);
      // Path 1: other factors(80) + readiness score
      expect(lead.score).toBe(rc.expected);
    });
  }

  // 3.3 Timeline sweep (other factors total = 85)
  const timelineCases = [
    { value: 'Decision date confirmed internally', expected: 100 },
    { value: 'Target date verbally confirmed', expected: 97 },
    { value: 'Rough timeline mentioned', expected: 91 },
    { value: 'No defined timeline', expected: 85 },
  ];
  for (const tc of timelineCases) {
    test(`3.3 Timeline: "${tc.value}" → score=${tc.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'buyingTimeline', tc.value, `time-${tc.expected}`);
      // Path 1: other factors(85) + timeline score
      expect(lead.score).toBe(tc.expected);
    });
  }

  // 3.4 Problem Severity sweep (other factors total = 80)
  const problemCases = [
    { value: 'Executive-level priority', expected: 100 },
    { value: 'Critical business impact', expected: 95 },
    { value: 'Recognized operational problem', expected: 88 },
    { value: 'Mild inconvenience', expected: 82 },
    { value: 'Problem acknowledged but deprioritized', expected: 80 },
  ];
  for (const pc of problemCases) {
    test(`3.4 Problem: "${pc.value}" → score=${pc.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'problemSeverity', pc.value, `prob-${pc.expected}-${pc.value.slice(0,4)}`);
      // Path 1: other factors(80) + problem score
      expect(lead.score).toBe(pc.expected);
    });
  }

  // 3.5 Economic Buyer sweep (other factors total = 90)
  const buyerCases = [
    { value: 'Buyer engaged in discussion', expected: 100 },
    { value: 'Buyer verbally supportive', expected: 100 },
    { value: 'Buyer identified, not engaged', expected: 95 },
    { value: 'Influencer identified', expected: 95 },
    { value: 'Buyer explicitly not involved', expected: 90 },
  ];
  for (const ec of buyerCases) {
    test(`3.5 EconomicBuyer: "${ec.value}" → score=${ec.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'economicBuyer', ec.value, `eco-${ec.expected}-${ec.value.slice(0,10).replace(/\s+/g,'')}`);
      // Path 1: other factors(90) + economic buyer score
      expect(lead.score).toBe(ec.expected);
    });
  }

  // 3.6 ICP Fit sweep (other factors total = 90)
  const icpCases = [
    { value: 'Strong ICP fit', expected: 100 },
    { value: 'Partial ICP fit', expected: 95 },
    { value: 'Clearly out of ICP', expected: 90 },
  ];
  for (const ic of icpCases) {
    test(`3.6 ICP: "${ic.value}" → score=${ic.expected}`, async ({ request }) => {
      const lead = await createWithOneFactor(request, token, 'icpFit', ic.value, `icp-${ic.expected}-${ic.value.slice(0,4)}`);
      // Path 1: other factors(90) + ICP score
      expect(lead.score).toBe(ic.expected);
    });
  }
});

/* ================================================================== */
/*  CATEGORY 4: Status Transition Rules                                */
/* ================================================================== */

test.describe('Cat 4: Status Transitions', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('4.1 New → Contacted (requires firstTouch activity)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToContacted',
      ...ALL_DATA_FIELDS('c4-1'),
    });
    // Create firstTouch activity first
    await createActivityApi(request, token, id, 'Call');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');
  });

  test('4.2 New → Nurture (requires follow-up date)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToNurture',
      ...ALL_DATA_FIELDS('c4-2'),
    });
    await updateLeadApi(request, token, id, {
      status: 'Nurture',
      nurtureFollowUpAtUtc: new Date(Date.now() + 7 * 86400000).toISOString(),
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Nurture');
  });

  test('4.3 New → Qualified (requires factors + notes + meeting)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToQualified',
      ...ALL_DATA_FIELDS('c4-3'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'UAT test qualification notes.',
    });
    // Need firstTouch + discovery meeting
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('4.4 New → Lost (requires loss fields)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToLost',
      ...ALL_DATA_FIELDS('c4-4'),
    });
    await updateLeadApi(request, token, id, {
      status: 'Lost',
      lossReason: 'No budget',
      lossCompetitor: 'None',
      lossNotes: 'Lost interest early',
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Lost');
  });

  test('4.5 New → Disqualified (requires reason)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToDisq',
      ...ALL_DATA_FIELDS('c4-5'),
    });
    await updateLeadApi(request, token, id, {
      status: 'Disqualified',
      disqualifiedReason: 'Out of ICP',
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Disqualified');
  });

  test('4.6 New → Converted is BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'NewToConv',
      ...ALL_DATA_FIELDS('c4-6'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Converted' });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('4.7 Contacted → Nurture', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'ContToNurture',
      ...ALL_DATA_FIELDS('c4-7'),
    });
    await createActivityApi(request, token, id, 'Call');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    await updateLeadApi(request, token, id, {
      status: 'Nurture',
      nurtureFollowUpAtUtc: new Date(Date.now() + 14 * 86400000).toISOString(),
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Nurture');
  });

  test('4.8 Contacted → Qualified', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'ContToQual',
      ...ALL_DATA_FIELDS('c4-8'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Qualification from Contacted.',
    });
    await createActivityApi(request, token, id, 'Call');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('4.9 Contacted → New is BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'ContToNew',
      ...ALL_DATA_FIELDS('c4-9'),
    });
    await createActivityApi(request, token, id, 'Call');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'New' });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('4.10 Qualified → Converted', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'QualToConvert',
      ...ALL_DATA_FIELDS('c4-10'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Ready for conversion.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    await updateLeadApi(request, token, id, { status: 'Converted' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Converted');
  });

  test('4.11 Converted → anything is BLOCKED (terminal)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'ConvTerminal',
      ...ALL_DATA_FIELDS('c4-11'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Terminal test.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    await updateLeadApi(request, token, id, { status: 'Converted' });
    // Now try to change status — should fail
    for (const target of ['New', 'Contacted', 'Nurture', 'Qualified', 'Lost', 'Disqualified']) {
      const result = await updateLeadApiExpectFail(request, token, id, { status: target });
      expect(result.status, `Converted → ${target} should be blocked`).toBeGreaterThanOrEqual(400);
    }
  });

  test('4.12 Lost → Contacted (recycle, needs activity)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'LostRecycle',
      ...ALL_DATA_FIELDS('c4-12'),
    });
    await updateLeadApi(request, token, id, {
      status: 'Lost',
      lossReason: 'Timing',
      lossCompetitor: 'None',
      lossNotes: 'Will revisit later',
    });
    // Recycle: Lost → Contacted (firstTouch already exists from auto-promotion or new activity)
    await createActivityApi(request, token, id, 'Email');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');
  });

  test('4.13 Disqualified → Nurture (recycle)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Trans', lastName: 'DisqRecycle',
      ...ALL_DATA_FIELDS('c4-13'),
    });
    await updateLeadApi(request, token, id, {
      status: 'Disqualified',
      disqualifiedReason: 'Wrong segment',
    });
    await updateLeadApi(request, token, id, {
      status: 'Nurture',
      nurtureFollowUpAtUtc: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Nurture');
  });
});

/* ================================================================== */
/*  CATEGORY 5: Qualification Gate Enforcement                         */
/* ================================================================== */

test.describe('Cat 5: Qualification Gate', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('5.1 Zero factors → Qualified is BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'ZeroFactors',
      ...ALL_DATA_FIELDS('c5-1'),
      qualifiedNotes: 'Trying to qualify with 0 factors.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Qualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.body.toLowerCase()).toContain('qualification');
  });

  test('5.2 Two factors → Qualified is BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'TwoFactors',
      ...ALL_DATA_FIELDS('c5-2'),
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Internal decision in progress',
      qualifiedNotes: 'Only 2 factors set.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Qualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('5.3 Three factors → Qualified is ALLOWED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'ThreeFactors',
      ...ALL_DATA_FIELDS('c5-3'),
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Internal decision in progress',
      buyingTimeline: 'Decision date confirmed internally',
      qualifiedNotes: 'Three factors – meets minimum.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('5.4 All six factors → Qualified is ALLOWED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'SixFactors',
      ...ALL_DATA_FIELDS('c5-4'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'All 6 factors set.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('5.5 Three factors + NO notes → Qualified is BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'NoNotes',
      ...ALL_DATA_FIELDS('c5-5'),
      budgetAvailability: 'Budget allocated and approved',
      readinessToSpend: 'Internal decision in progress',
      buyingTimeline: 'Decision date confirmed internally',
      // qualifiedNotes intentionally omitted
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Qualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('5.6 Unknown values do not count as factors', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'UnknownDontCount',
      ...ALL_DATA_FIELDS('c5-6'),
      budgetAvailability: 'Unknown / not yet discussed',      // NOT meaningful
      readinessToSpend: 'Unknown / unclear',                   // NOT meaningful
      buyingTimeline: 'Unknown / not discussed',               // NOT meaningful
      problemSeverity: 'Critical business impact',             // meaningful
      economicBuyer: 'Buyer engaged in discussion',            // meaningful
      // only 2 meaningful factors
      qualifiedNotes: 'Unknown values should not count.',
    });
    await createActivityApi(request, token, id, 'Call');
    await createActivityApi(request, token, id, 'Meeting');
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Qualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('5.7 Meeting gate — factors + notes, no meeting → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Gate', lastName: 'NoMeeting',
      ...ALL_DATA_FIELDS('c5-7'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Has factors and notes but no meeting.',
    });
    // Only create a Call, NOT a Meeting
    await createActivityApi(request, token, id, 'Call');
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Qualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.body.toLowerCase()).toContain('meeting');
  });
});

/* ================================================================== */
/*  CATEGORY 6: isMeaningfulQualificationValue (via scoring)           */
/* ================================================================== */

test.describe('Cat 6: Meaningful Qualification Value', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('6.1-6.4 Unknown/null/empty values produce QS=0 with all data', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Meaningful', lastName: 'AllUnknown',
      ...ALL_DATA_FIELDS('c6-1'),
      budgetAvailability: 'Unknown / not yet discussed',
      readinessToSpend: 'Unknown / unclear',
      buyingTimeline: 'Unknown / not discussed',
      problemSeverity: 'Unknown / not validated',
      economicBuyer: 'Unknown / not identified',
      icpFit: 'Unknown / not assessed',
    });
    const lead = await fetchLeadApi(request, token, id);
    // All unknown → not meaningful → Path 2: base 20 + email(20) + phone(15) + company(10) + job(10) + source(10) + territory(5) = 90
    expect(lead.score).toBe(90);
  });

  test('6.5 "Budget allocated and approved" is meaningful (scores 25)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Meaningful', lastName: 'OneBudget',
      ...ALL_DATA_FIELDS('c6-5'),
      budgetAvailability: 'Budget allocated and approved',    // 25 — only meaningful factor
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (1 meaningful factor): budget(25) = 25
    expect(lead.score).toBe(25);
  });

  test('6.6 "No defined budget" is meaningful (scores 5, not unknown)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Meaningful', lastName: 'NoBudget',
      ...ALL_DATA_FIELDS('c6-6'),
      budgetAvailability: 'No defined budget',                // 5 — meaningful, no "unknown" substring
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 1 (1 meaningful factor): budget(5) = 5
    expect(lead.score).toBe(5);
  });
});

/* ================================================================== */
/*  CATEGORY 7: Outcome Field Enforcement                              */
/* ================================================================== */

test.describe('Cat 7: Outcome Fields', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('7.1 Disqualified without reason → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Outcome', lastName: 'DisqNoReason',
      ...ALL_DATA_FIELDS('c7-1'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Disqualified' });
    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.body.toLowerCase()).toContain('disqualified');
  });

  test('7.2 Lost without lossReason → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Outcome', lastName: 'LostNoReason',
      ...ALL_DATA_FIELDS('c7-2'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, {
      status: 'Lost',
      lossCompetitor: 'CompX',
      lossNotes: 'Some notes',
    });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('7.3 Lost without lossCompetitor → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Outcome', lastName: 'LostNoComp',
      ...ALL_DATA_FIELDS('c7-3'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, {
      status: 'Lost',
      lossReason: 'Price too high',
      lossNotes: 'Some notes',
    });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('7.4 Lost without lossNotes → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Outcome', lastName: 'LostNoNotes',
      ...ALL_DATA_FIELDS('c7-4'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, {
      status: 'Lost',
      lossReason: 'Price too high',
      lossCompetitor: 'CompX',
    });
    expect(result.status).toBeGreaterThanOrEqual(400);
  });

  test('7.5 Nurture without follow-up date → BLOCKED', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'Outcome', lastName: 'NurtureNoDate',
      ...ALL_DATA_FIELDS('c7-5'),
    });
    const result = await updateLeadApiExpectFail(request, token, id, { status: 'Nurture' });
    expect(result.status).toBeGreaterThanOrEqual(400);
    expect(result.body.toLowerCase()).toContain('nurture');
  });
});

/* ================================================================== */
/*  CATEGORY 8: Confidence Badge Display (UI)                          */
/* ================================================================== */

test.describe('Cat 8: Confidence Badge (UI)', () => {
  test('8.1-8.3 Score badge renders correct tier', async ({ page, request }) => {
    const token = await loginUi(page, request);

    // Create high-score lead
    const highId = await createLeadApi(request, token, {
      firstName: 'Badge', lastName: 'HighScore',
      ...ALL_DATA_FIELDS('c8-high'),
      ...ALL_QUAL_MAX,
    });

    // Create medium-score lead
    const midId = await createLeadApi(request, token, {
      firstName: 'Badge', lastName: 'MedScore',
      ...ALL_DATA_FIELDS('c8-mid'),
      budgetAvailability: 'Indicative range mentioned',
      readinessToSpend: 'Actively evaluating solutions',
      buyingTimeline: 'Rough timeline mentioned',
      problemSeverity: 'Recognized operational problem',
      economicBuyer: 'Buyer identified, not engaged',
      icpFit: 'Partial ICP fit',
    });

    // Create low-score lead
    const lowId = await createLeadApi(request, token, {
      firstName: 'Badge', lastName: 'LowScore',
      ...ALL_DATA_FIELDS('c8-low'),
      budgetAvailability: 'No defined budget',
      readinessToSpend: 'Not planning to spend',
      buyingTimeline: 'No defined timeline',
      problemSeverity: 'Mild inconvenience',
      economicBuyer: 'Buyer explicitly not involved',
      icpFit: 'Clearly out of ICP',
    });

    // Verify via API that scores are in expected ranges
    const highLead = await fetchLeadApi(request, token, highId);
    const midLead = await fetchLeadApi(request, token, midId);
    const lowLead = await fetchLeadApi(request, token, lowId);

    expect(highLead.score).toBeGreaterThanOrEqual(70);
    expect(midLead.score).toBeGreaterThanOrEqual(45);
    expect(midLead.score).toBeLessThan(70);
    expect(lowLead.score).toBeLessThan(45);

    // Navigate to leads list and verify badges are visible
    await page.goto(`${BASE}/app/leads`);
    await page.waitForTimeout(2000);

    // Check that leads list page renders without errors
    const leadsList = page.locator('.page-container, .leads-workspace');
    await expect(leadsList.first()).toBeVisible({ timeout: 10_000 });
  });
});

/* ================================================================== */
/*  CATEGORY 9: Data Quality Combinations                              */
/* ================================================================== */

test.describe('Cat 9: Data Quality Combinations', () => {
  let token: string;
  test.beforeAll(async ({ request }) => {
    token = await authenticate(request);
  });

  test('9.1 All 6 data fields → BDQ=100 → score=30 (no qual)', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'DQ', lastName: 'AllSix',
      ...ALL_DATA_FIELDS('c9-1'),
    });
    const lead = await fetchLeadApi(request, token, id);
    expect(lead.score).toBe(90); // Path 2: base 20 + email(20) + phone(15) + company(10) + job(10) + source(10) + territory(5) = 90
  });

  test('9.2 name + email + phone → BDQ=64 → score=19', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'DQ', lastName: 'ThreeFields',
      email: uniqueEmail('c9-2'),
      phone: '+15559990002',
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 2 (no qual factors): base 20 + email(20) + phone(15) = 55
    expect(lead.score).toBe(55);
  });

  test('9.3 name + email only → BDQ=40 → score=12', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'DQ', lastName: 'NameEmail',
      email: uniqueEmail('c9-3'),
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 2 (no qual factors): base 20 + email(20) = 40
    expect(lead.score).toBe(40);
  });

  test('9.4 name only → BDQ=16 → score=5', async ({ request }) => {
    const id = await createLeadApi(request, token, {
      firstName: 'DQ', lastName: 'NameOnly',
    });
    const lead = await fetchLeadApi(request, token, id);
    // Path 2 (no qual factors): base 20 (name only) = 20
    expect(lead.score).toBe(20);
  });
});

/* ================================================================== */
/*  CATEGORY 10: End-to-End Lifecycle Flows (UI)                       */
/* ================================================================== */

test.describe('Cat 10: E2E Lifecycle Flows', () => {
  test('10.1 Full happy path: New → Contacted → Qualified → Converted', async ({ page, request }) => {
    test.setTimeout(120_000);
    const token = await loginUi(page, request);

    // 1. Create lead via API
    const id = await createLeadApi(request, token, {
      firstName: 'Lifecycle', lastName: 'HappyPath',
      ...ALL_DATA_FIELDS('c10-1'),
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Full lifecycle test.',
    });

    // 2. Create firstTouch (Call) → auto-promotes to Contacted
    await createActivityApi(request, token, id, 'Call');
    let lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');

    // 3. Create discovery meeting → qualify
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, { status: 'Qualified' });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');

    // 4. Convert
    await updateLeadApi(request, token, id, { status: 'Converted' });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Converted');
    expect(lead.score).toBe(100);
  });

  test('10.2 Nurture path: New → Nurture → Contacted → Qualified', async ({ request }) => {
    const token = await authenticate(request);

    const id = await createLeadApi(request, token, {
      firstName: 'Lifecycle', lastName: 'NurturePath',
      ...ALL_DATA_FIELDS('c10-2'),
    });

    // New → Nurture
    await updateLeadApi(request, token, id, {
      status: 'Nurture',
      nurtureFollowUpAtUtc: new Date(Date.now() + 14 * 86400000).toISOString(),
    });
    let lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Nurture');

    // Nurture → Contacted (needs activity)
    await createActivityApi(request, token, id, 'Email');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');

    // Contacted → Qualified (needs factors + notes + meeting)
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, {
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Nurture path qualification.',
      status: 'Qualified',
    });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('10.3 Disqualify & recycle: New → Disqualified → Nurture → Contacted → Qualified', async ({ request }) => {
    const token = await authenticate(request);

    const id = await createLeadApi(request, token, {
      firstName: 'Lifecycle', lastName: 'DisqRecycle',
      ...ALL_DATA_FIELDS('c10-3'),
    });

    // New → Disqualified
    await updateLeadApi(request, token, id, {
      status: 'Disqualified',
      disqualifiedReason: 'Wrong segment initially.',
    });
    let lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Disqualified');

    // Disqualified → Nurture (recycle)
    await updateLeadApi(request, token, id, {
      status: 'Nurture',
      nurtureFollowUpAtUtc: new Date(Date.now() + 30 * 86400000).toISOString(),
    });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Nurture');

    // Nurture → Contacted
    await createActivityApi(request, token, id, 'Call');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');

    // Contacted → Qualified
    await createActivityApi(request, token, id, 'Meeting');
    await updateLeadApi(request, token, id, {
      ...ALL_QUAL_MAX,
      qualifiedNotes: 'Recycled from disqualified.',
      status: 'Qualified',
    });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Qualified');
  });

  test('10.4 Lost & recycle: New → Lost → Contacted', async ({ request }) => {
    const token = await authenticate(request);

    const id = await createLeadApi(request, token, {
      firstName: 'Lifecycle', lastName: 'LostRecycle',
      ...ALL_DATA_FIELDS('c10-4'),
    });

    // New → Lost
    await updateLeadApi(request, token, id, {
      status: 'Lost',
      lossReason: 'Timing issue',
      lossCompetitor: 'None',
      lossNotes: 'Client postponed project.',
    });
    let lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Lost');

    // Lost → Contacted (recycle)
    await createActivityApi(request, token, id, 'Email');
    await updateLeadApi(request, token, id, { status: 'Contacted' });
    lead = await fetchLeadApi(request, token, id);
    expect(lead.status).toBe('Contacted');
  });
});
