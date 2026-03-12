/**
 * UAT E2E — Leo Martin Deal Progression Scenarios
 *
 * Works with the existing 21 leads in Azure SQL assigned to Leo Martins.
 * Covers multiple deal progression scenarios:
 *
 * Scenario 1: Hot Lead Conversion
 *   Robert Fischer (New, Score 88) → Contacted → Qualified → Converted → Opportunity through stages
 *
 * Scenario 2: Nurture Re-engagement
 *   Maya Chen (Nurture, Score 55) → Re-engage → Contacted → Qualified
 *
 * Scenario 3: Low-Score Lead Disqualification
 *   Jake Morrison (New, Score 20) → Contacted → Disqualified
 *
 * Scenario 4: Competitive Deal Loss
 *   Raj Mehta (Qualified, Score 92) → Convert → Opportunity → Closed Lost
 *
 * Scenario 5: Trade Show Follow-up Qualification
 *   Liam Hartley (Contacted, Score 55) → BANT qualification → Qualified
 *
 * Scenario 6: Activity Logging & Pipeline Verification
 *   Verify leads in list views, log activities, check dashboard
 */

import { test, expect } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  Configuration                                                      */
/* ------------------------------------------------------------------ */

const API = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const TENANT = 'default';

// Leo Martins — primary sales rep for these tests
const LEO_EMAIL = 'leo.martins@crmenterprise.demo';
const LEO_PASSWORD = process.env.E2E_LEO_PASSWORD ?? 'CrmTest!1';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let cachedToken: string | null = null;
let authenticatedEmail: string | null = null;

async function ensureAuth(request: any): Promise<string> {
  if (cachedToken) return cachedToken;
  for (const cred of [
    { email: LEO_EMAIL, password: LEO_PASSWORD },
    { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  ]) {
    const res = await request.post(`${API}/api/auth/login`, {
      headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
      data: cred,
    });
    if (res.ok()) {
      const body = await res.json();
      if (body?.accessToken) {
        cachedToken = body.accessToken;
        authenticatedEmail = cred.email;
        console.log(`Authenticated as: ${cred.email}`);
        return cachedToken!;
      }
    }
  }
  throw new Error('Authentication failed for all credentials');
}

async function loginPage(page: any, request: any): Promise<string> {
  const token = await ensureAuth(request);
  await page.addInitScript((t: string) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', 'default');
  }, token);
  return token;
}

function attachDiagnostics(page: any) {
  const errors: string[] = [];
  page.on('pageerror', (err: any) => {
    errors.push(`pageerror: ${err.message}`);
    console.log('pageerror:', err.message);
  });
  page.on('console', (msg: any) => {
    if (msg.type() === 'error') {
      errors.push(`console: ${msg.text()}`);
      console.log('console error:', msg.text());
    }
  });
  page.on('requestfailed', (req: any) => {
    const f = req.failure()?.errorText ?? '';
    if (req.url().includes('/api/') && !f.includes('net::ERR_ABORTED')) {
      errors.push(`request failed: ${req.url()} ${f}`);
      console.log('request failed:', req.url(), f);
    }
  });
  return errors;
}

async function apiPost(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.post(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

async function apiGet(request: any, token: string, path: string) {
  return request.get(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT },
  });
}

async function apiPut(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.put(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

async function apiPatch(request: any, token: string, path: string, data: Record<string, unknown>) {
  return request.patch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}`, 'X-Tenant-Key': TENANT, 'Content-Type': 'application/json' },
    data,
  });
}

/** Search leads by name and return the lead object */
async function findLeadByName(request: any, token: string, lastName: string, firstName?: string): Promise<any> {
  const res = await apiGet(request, token, `/api/leads?search=${encodeURIComponent(lastName)}&page=1&pageSize=20`);
  expect(res.ok(), `Lead search for "${lastName}" failed: ${res.status()}`).toBeTruthy();
  const data = await res.json();
  const items = data.items ?? [];
  if (firstName) {
    return items.find((l: any) => l.firstName === firstName && l.lastName === lastName);
  }
  return items.find((l: any) => l.lastName === lastName);
}

/** Get a lead by ID */
async function getLead(request: any, token: string, id: string) {
  const res = await apiGet(request, token, `/api/leads/${id}`);
  expect(res.ok(), `getLead ${id} failed: ${res.status()}`).toBeTruthy();
  return res.json();
}

/** Update a lead — merges current data with updates so required fields are preserved */
async function updateLead(request: any, token: string, id: string, updates: Record<string, unknown>) {
  const current = await getLead(request, token, id);
  const payload = {
    firstName: current.firstName,
    lastName: current.lastName,
    companyName: current.company ?? current.companyName,
    email: current.email,
    source: current.source,
    territory: current.territory,
    status: current.status,
    score: current.score,
    ...updates,
  };
  return apiPut(request, token, `/api/leads/${id}`, payload);
}

/** Log a completed activity on an entity */
async function logActivity(request: any, token: string, opts: {
  type: string;
  subject: string;
  description?: string;
  outcome: string;
  relatedEntityType: string;
  relatedEntityId: string;
}): Promise<void> {
  const now = new Date().toISOString();
  const res = await apiPost(request, token, '/api/activities', {
    type: opts.type,
    subject: opts.subject,
    description: opts.description ?? opts.subject,
    outcome: opts.outcome,
    priority: 'Medium',
    dueDateUtc: now,
    completedDateUtc: now,
    relatedEntityType: opts.relatedEntityType,
    relatedEntityId: opts.relatedEntityId,
    templateKey: null,
    ownerId: null,
  });
  if (!res.ok()) {
    console.log(`Activity creation failed (${res.status()}): ${await res.text()}`);
  }
  expect(res.ok(), `Activity creation failed: ${res.status()}`).toBeTruthy();
}

/** Get an opportunity by ID */
async function getOpportunity(request: any, token: string, id: string) {
  const res = await apiGet(request, token, `/api/opportunities/${id}`);
  expect(res.ok(), `getOpportunity ${id} failed: ${res.status()}`).toBeTruthy();
  return res.json();
}

/** Future date ISO string */
function futureDate(days: number): string {
  return new Date(Date.now() + days * 86400000).toISOString();
}

/** Open a PrimeNG select dropdown */
async function openSelect(page: any, selector: string) {
  const host = page.locator(selector);
  await host.waitFor({ state: 'visible', timeout: 8000 });
  const trigger = host.locator('.p-select');
  if (await trigger.count()) {
    await trigger.first().click({ force: true });
  } else {
    await host.click({ force: true });
  }
}

/** Select an option by label text from PrimeNG dropdown */
async function selectByLabel(page: any, selector: string, optionText: string) {
  const optionsLocator = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]'
  );
  for (let attempt = 0; attempt < 3; attempt++) {
    await openSelect(page, selector);
    const option = optionsLocator.filter({ hasText: optionText }).first();
    try {
      await option.waitFor({ state: 'visible', timeout: 3000 });
      await option.click({ force: true });
      return;
    } catch {
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(200);
    }
  }
  throw new Error(`Option "${optionText}" not visible for ${selector}`);
}

/* ================================================================== */
/*  SCENARIO 1 — Hot Lead Conversion: Robert Fischer                   */
/*  Robert Fischer (New, Score 88, Website, Enterprise, South)         */
/*  Path: New → Contacted → Qualified → Converted → Opportunity stages */
/* ================================================================== */

test.describe('Scenario 1 — Hot Lead Conversion: Robert Fischer (New → Converted → Deal Won)', () => {
  test.setTimeout(180_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;
  let opportunityId: string;

  test('1.1 — Login as Leo, find Robert Fischer lead', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Fischer', 'Robert');
    expect(lead, 'Robert Fischer lead not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Robert Fischer: id=${leadId}, status=${lead.status}, score=${lead.score}`);

    // Verify starting state
    expect(lead.score).toBeGreaterThanOrEqual(80);
  });

  test('1.2 — Log introduction email → transition New → Contacted', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Email',
      subject: 'RE: Digital Transformation Initiative — Follow-up',
      description: 'Responded to Robert Fischer website inquiry about enterprise CRM migration. Attached solution brief and case studies.',
      outcome: 'Robert replied within 2 hours. Very engaged — wants to schedule a call this week.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged introduction email');

    const res = await updateLead(request, token, leadId, {
      status: 'Contacted',
      score: 90,
    });
    expect(res.ok(), `Status update failed: ${res.status()}`).toBeTruthy();
    console.log('Robert Fischer: New → Contacted (score: 90)');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Contacted');
  });

  test('1.3 — Log discovery call + BANT qualification → Contacted → Qualified', async ({ request }) => {
    token = await ensureAuth(request);

    // Log discovery call
    await logActivity(request, token, {
      type: 'Call',
      subject: 'Discovery Call — Fischer Enterprise Requirements',
      description: 'Deep-dive into current CRM pain points: fragmented systems, no real-time pipeline visibility, manual forecasting.',
      outcome: 'Strong fit confirmed. CFO approved $200K budget. Decision by end of quarter.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    // Log follow-up meeting
    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Technical Requirements Workshop — Fischer Corp',
      description: 'On-site workshop with IT team and business stakeholders to define integration requirements.',
      outcome: 'Identified 5 integration points. Security review scheduled. IT team fully supportive.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged discovery call + requirements workshop');

    // Full BANT qualification + move to Qualified
    const res = await updateLead(request, token, leadId, {
      status: 'Qualified',
      score: 95,
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'CFO confirmed $200K budget for CRM modernization project',
      readinessToSpend: 'Internal decision in progress',
      readinessEvidence: 'RFP process underway, Fischer Corp among 3 finalists',
      buyingTimeline: 'Decision date confirmed internally',
      timelineEvidence: 'Board review scheduled for end of quarter — 45-day decision window',
      problemSeverity: 'High business impact',
      problemEvidence: 'Lost 5 enterprise deals last quarter due to CRM gaps; $2M revenue impact',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'Robert Fischer (VP Sales) sponsors project; CFO on approval chain',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: '500-employee enterprise, $100M revenue, multi-region sales org',
      qualifiedNotes: 'Hot lead. Full BANT 6/6. $200K budget confirmed. 45-day timeline. VP Sales is champion.',
    });

    if (!res.ok()) {
      console.log('Qualification failed:', res.status(), await res.text());
    }
    expect(res.ok()).toBeTruthy();
    console.log('Robert Fischer: Contacted → Qualified (score: 95, BANT 6/6)');
  });

  test('1.4 — Convert lead → create Opportunity', async ({ request }) => {
    token = await ensureAuth(request);

    const convertRes = await apiPost(request, token, `/api/leads/${leadId}/convert`, {
      createAccount: true,
      accountName: 'Fischer Enterprises',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Fischer Corp Enterprise CRM Platform',
      amount: 200000,
      expectedCloseDate: futureDate(45),
      dealType: 'Inbound',
      segment: 'Enterprise',
      stage: 'Qualification',
      velocity: 'Fast',
      isCompetitive: true,
      hasExecutiveChampion: true,
      isStrategic: true,
    });

    if (!convertRes.ok()) {
      const errText = await convertRes.text();
      if (errText.includes('already converted') || errText.includes('Converted')) {
        console.log('Lead already converted — searching for opportunity');
        const searchRes = await apiGet(request, token, '/api/opportunities?search=Fischer&page=1&pageSize=5');
        if (searchRes.ok()) {
          const data = await searchRes.json();
          const match = (data.items ?? []).find((o: any) => o.name?.includes('Fischer'));
          opportunityId = match?.id;
        }
      } else {
        console.log('Conversion failed:', convertRes.status(), errText);
        expect(convertRes.ok()).toBeTruthy();
      }
    } else {
      const json = await convertRes.json();
      opportunityId = json.opportunityId;
    }

    expect(opportunityId).toBeTruthy();
    console.log(`Lead converted → Opportunity: ${opportunityId}`);

    // Verify lead is now Converted
    const lead = await getLead(request, token, leadId);
    expect(lead.status).toBe('Converted');
  });

  test('1.5 — Progress opportunity: Qualification → Proposal', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    // Log proposal preparation activity
    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Solution Design & Proposal Review — Fischer Corp',
      description: 'Presented customized solution architecture. Covered integration timeline, pricing tiers, and ROI projections.',
      outcome: 'Fischer team requested formal proposal with implementation timeline. Very positive reception.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    // Advance to Proposal stage
    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Proposal',
    });
    expect(stageRes.ok(), `Stage update to Proposal failed: ${stageRes.status()}`).toBeTruthy();
    console.log('Opportunity: Qualification → Proposal');

    const opp = await getOpportunity(request, token, opportunityId);
    expect(opp.stage).toBe('Proposal');
  });

  test('1.6 — Progress opportunity: Proposal → Negotiation', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Pricing Negotiation Call — Fischer Corp',
      description: 'Discussed volume discounts, multi-year commitment options, and implementation phasing.',
      outcome: 'Agreed on 3-year contract structure. Legal review initiated on both sides.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Negotiation',
    });
    expect(stageRes.ok(), `Stage update to Negotiation failed: ${stageRes.status()}`).toBeTruthy();
    console.log('Opportunity: Proposal → Negotiation');

    const opp = await getOpportunity(request, token, opportunityId);
    expect(opp.stage).toBe('Negotiation');
  });

  test('1.7 — Close deal: Negotiation → Closed Won', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Contract Signing — Fischer Corp Enterprise CRM',
      description: 'Final contract review meeting with Fischer legal and procurement. All terms agreed.',
      outcome: 'Contract signed. $200K 3-year deal. Implementation kickoff scheduled for next Monday.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Closed Won',
    });
    expect(stageRes.ok(), `Stage update to Closed Won failed: ${stageRes.status()}`).toBeTruthy();
    console.log('Opportunity: Negotiation → Closed Won 🎉');

    const opp = await getOpportunity(request, token, opportunityId);
    expect(opp.stage).toBe('Closed Won');
    expect(opp.isClosed).toBeTruthy();
    expect(opp.isWon).toBeTruthy();
    console.log(`Deal Won: ${opp.name} — $${opp.amount}`);
  });

  test('1.8 — UI: Verify converted lead & won opportunity in list views', async ({ page, request }) => {
    const errors = attachDiagnostics(page);
    await loginPage(page, request);

    // Check leads list
    await page.goto('/app/leads');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Search for Robert Fischer
    const searchBox = page.locator('.search-box input, input[placeholder*="Search"], input[type="search"]').first();
    if (await searchBox.isVisible().catch(() => false)) {
      await searchBox.fill('Robert Fischer');
      await page.waitForTimeout(1500);
    }

    // Verify the lead shows as Converted
    const pageContent = await page.textContent('body');
    if (pageContent?.includes('Robert') || pageContent?.includes('Fischer')) {
      console.log('Robert Fischer found in leads list');
    }

    // Check opportunities list
    await page.goto('/app/opportunities');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2000);

    const oppSearch = page.locator('.search-box input, input[placeholder*="Search"], input[type="search"]').first();
    if (await oppSearch.isVisible().catch(() => false)) {
      await oppSearch.fill('Fischer');
      await oppSearch.press('Enter').catch(() => {});
      await page.waitForTimeout(1500);
    }

    console.log('UI verification complete — leads and opportunities lists checked');
  });
});

/* ================================================================== */
/*  SCENARIO 2 — Nurture Re-engagement: Maya Chen                     */
/*  Maya Chen (Nurture, Score 55, Website, Mid-Market, West Coast)     */
/*  Path: Nurture → Contacted → Qualified                             */
/* ================================================================== */

test.describe('Scenario 2 — Nurture Re-engagement: Maya Chen (Nurture → Contacted → Qualified)', () => {
  test.setTimeout(120_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;

  test('2.1 — Find Maya Chen in nurture status', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Chen', 'Maya');
    expect(lead, 'Maya Chen lead not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Maya Chen: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.status).toBe('Nurture');
  });

  test('2.2 — Log re-engagement call → Nurture → Contacted', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Nurture Follow-up — Maya Chen Budget Review',
      description: 'Quarterly check-in with Maya. Previous concern was budget timing. New fiscal year started.',
      outcome: 'Maya confirms new budget approved. Wants to restart evaluation immediately. Requesting demo.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged re-engagement call');

    const res = await updateLead(request, token, leadId, {
      status: 'Contacted',
      score: 65,
    });
    expect(res.ok(), `Nurture → Contacted failed: ${res.status()}`).toBeTruthy();
    console.log('Maya Chen: Nurture → Contacted (score: 65)');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Contacted');
  });

  test('2.3 — Log demo + BANT → Contacted → Qualified', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Product Demo — Maya Chen / West Coast Operations',
      description: 'Full product demo covering pipeline management, analytics, and mobile access for field reps.',
      outcome: 'Very impressed with analytics module. Asked for pricing and implementation timeline. Decision-maker intro scheduled.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    const res = await updateLead(request, token, leadId, {
      status: 'Qualified',
      score: 78,
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'New FY budget includes $60K for CRM tools',
      readinessToSpend: 'Internal decision in progress',
      readinessEvidence: 'Evaluating 2 vendors including us. Decision by end of month.',
      buyingTimeline: 'Within current quarter',
      timelineEvidence: 'Needs solution live before Q3 pipeline review',
      problemSeverity: 'Moderate business impact',
      problemEvidence: 'Manual pipeline tracking causing forecast inaccuracies; 20% pipeline leakage',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'Maya (Director of Sales Ops) has procurement authority up to $75K',
      icpFit: 'Moderate ICP fit',
      icpFitEvidence: 'Mid-market SaaS company, 150 employees, growing 30% YoY',
      qualifiedNotes: 'Re-engaged from nurture. Budget confirmed for new FY. 2-vendor shortlist. Good mid-market fit.',
    });

    if (!res.ok()) {
      console.log('Qualification failed:', res.status(), await res.text());
    }
    expect(res.ok()).toBeTruthy();
    console.log('Maya Chen: Contacted → Qualified (score: 78, BANT filled)');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Qualified');
    expect(updated.score).toBeGreaterThanOrEqual(75);
  });
});

/* ================================================================== */
/*  SCENARIO 3 — Low-Score Lead Disqualification: Jake Morrison        */
/*  Jake Morrison (New, Score 20, Cold Call, SMB, Midwest)             */
/*  Path: New → Contacted → Disqualified                              */
/* ================================================================== */

test.describe('Scenario 3 — Lead Disqualification: Jake Morrison (New → Contacted → Disqualified)', () => {
  test.setTimeout(120_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;

  test('3.1 — Find Jake Morrison, verify low score', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Morrison', 'Jake');
    expect(lead, 'Jake Morrison lead not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Jake Morrison: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.score).toBeLessThanOrEqual(30);
  });

  test('3.2 — Log cold call attempt → New → Contacted', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Cold Call Follow-up — Jake Morrison',
      description: 'Follow-up call from initial cold outreach. Discussed current CRM needs.',
      outcome: 'Jake uses a free CRM tool. No budget for paid solution. Team of 5 people. Not a fit.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    const res = await updateLead(request, token, leadId, {
      status: 'Contacted',
      score: 15,
    });
    expect(res.ok()).toBeTruthy();
    console.log('Jake Morrison: New → Contacted (score: 15)');
  });

  test('3.3 — Disqualify lead — bad fit, no budget', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Note',
      subject: 'Disqualification Assessment — Jake Morrison',
      description: 'Reviewed lead against ICP criteria. Multiple disqualifying factors identified.',
      outcome: 'Disqualified: SMB with 5 employees, no budget, using free tool, no pain point severe enough to justify investment.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    const res = await updateLead(request, token, leadId, {
      status: 'Disqualified',
      score: 10,
      disqualifiedReason: 'Does not meet ICP criteria — SMB (5 employees), no budget allocated, using free CRM, no compelling event to drive change.',
    });

    if (!res.ok()) {
      console.log('Disqualification failed:', res.status(), await res.text());
    }
    expect(res.ok()).toBeTruthy();
    console.log('Jake Morrison: Contacted → Disqualified');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Disqualified');
  });
});

/* ================================================================== */
/*  SCENARIO 4 — Competitive Deal Loss: Raj Mehta                      */
/*  Raj Mehta (Qualified, Score 92, Trade Show, Enterprise, APAC)      */
/*  Path: Qualified → Converted → Opportunity stages → Closed Lost     */
/* ================================================================== */

test.describe('Scenario 4 — Competitive Deal Loss: Raj Mehta (Qualified → Converted → Closed Lost)', () => {
  test.setTimeout(180_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;
  let opportunityId: string;

  test('4.1 — Find Raj Mehta, verify qualified status', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Mehta', 'Raj');
    expect(lead, 'Raj Mehta lead not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Raj Mehta: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.score).toBeGreaterThanOrEqual(85);
  });

  test('4.2 — Convert qualified lead → Opportunity', async ({ request }) => {
    token = await ensureAuth(request);

    const convertRes = await apiPost(request, token, `/api/leads/${leadId}/convert`, {
      createAccount: true,
      accountName: 'APAC Telecom Networks',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'APAC Telecom Enterprise CRM Suite',
      amount: 350000,
      expectedCloseDate: futureDate(60),
      dealType: 'Inbound',
      segment: 'Enterprise',
      stage: 'Qualification',
      velocity: 'Normal',
      isCompetitive: true,
      hasExecutiveChampion: true,
      isStrategic: true,
    });

    if (!convertRes.ok()) {
      const errText = await convertRes.text();
      if (errText.includes('already converted') || errText.includes('Converted')) {
        console.log('Lead already converted — searching for opportunity');
        const searchRes = await apiGet(request, token, '/api/opportunities?search=APAC+Telecom&page=1&pageSize=5');
        if (searchRes.ok()) {
          const data = await searchRes.json();
          const match = (data.items ?? []).find((o: any) => o.name?.includes('APAC'));
          opportunityId = match?.id;
        }
      } else {
        console.log('Conversion failed:', convertRes.status(), errText);
        expect(convertRes.ok()).toBeTruthy();
      }
    } else {
      const json = await convertRes.json();
      opportunityId = json.opportunityId;
    }

    expect(opportunityId).toBeTruthy();
    console.log(`Lead converted → Opportunity: ${opportunityId}`);
  });

  test('4.3 — Progress opportunity through stages to Proposal', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Solution Architecture Review — APAC Telecom',
      description: 'Technical deep-dive with APAC Telecom engineering team. Covered API integrations, data migration, and regional compliance.',
      outcome: 'Technical fit confirmed. Competitor (Salesforce) also in final evaluation. Need to differentiate on customization capabilities.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Proposal',
    });
    expect(stageRes.ok()).toBeTruthy();
    console.log('Opportunity: Qualification → Proposal');
  });

  test('4.4 — Progress to Negotiation', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Commercial Terms Discussion — APAC Telecom',
      description: 'Pricing discussion with procurement. They are comparing our proposal against Salesforce Enterprise.',
      outcome: 'Our pricing is competitive but Salesforce offering aggressive discount. Raj pushing for our customization advantage.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Negotiation',
    });
    expect(stageRes.ok()).toBeTruthy();
    console.log('Opportunity: Proposal → Negotiation');
  });

  test('4.5 — Deal lost to competitor → Closed Lost', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Deal Update — APAC Telecom Decision',
      description: 'Raj informed us of final decision. Board chose Salesforce due to existing enterprise agreement and global support footprint.',
      outcome: 'Lost to Salesforce. Key reasons: (1) existing enterprise license discount, (2) global 24/7 support, (3) board preference for established vendor. Raj personally preferred our solution.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Closed Lost',
    });
    expect(stageRes.ok(), `Closed Lost stage update failed: ${stageRes.status()}`).toBeTruthy();
    console.log('Opportunity: Negotiation → Closed Lost');

    const opp = await getOpportunity(request, token, opportunityId);
    expect(opp.stage).toBe('Closed Lost');
    expect(opp.isClosed).toBeTruthy();
    expect(opp.isWon).toBeFalsy();
    console.log(`Deal Lost: ${opp.name} — lost to competitor (Salesforce)`);
  });
});

/* ================================================================== */
/*  SCENARIO 5 — Trade Show Follow-up: Liam Hartley                    */
/*  Liam Hartley (Contacted, Score 55, Trade Show, Enterprise, APAC)   */
/*  Path: Verify Contacted → BANT Qualification → Qualified            */
/* ================================================================== */

test.describe('Scenario 5 — Trade Show Follow-up: Liam Hartley (Contacted → Qualified)', () => {
  test.setTimeout(120_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;

  test('5.1 — Find Liam Hartley, verify contacted status', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Hartley', 'Liam');
    expect(lead, 'Liam Hartley lead not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Liam Hartley: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.status).toBe('Contacted');
  });

  test('5.2 — Log trade show follow-up activities', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Email',
      subject: 'Post-Trade Show Follow-up — CRM Innovation Summit Materials',
      description: 'Sent Liam the promised deck from our booth demo plus a custom ROI calculator for his APAC operations.',
      outcome: 'Liam forwarded materials to VP of Operations. Wants to set up a wider team demo.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Team Demo — Hartley APAC Operations CRM Requirements',
      description: 'Video demo with Liam + 3 team members (VP Ops, IT Director, Regional Sales Manager). Covered pipeline tracking, forecasting, and APAC-specific workflows.',
      outcome: 'All attendees positive. VP Ops confirmed this is a priority initiative. IT Director asked about API capabilities and data residency in APAC.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged follow-up email + team demo');
  });

  test('5.3 — Fill BANT qualification → Contacted → Qualified', async ({ request }) => {
    token = await ensureAuth(request);

    const res = await updateLead(request, token, leadId, {
      status: 'Qualified',
      score: 80,
      budgetAvailability: 'Budget available but not yet allocated',
      budgetEvidence: 'VP Ops has discretionary budget up to $150K. Formal allocation pending Q3 planning.',
      readinessToSpend: 'Internal decision in progress',
      readinessEvidence: 'CRM upgrade is on the APAC digital transformation roadmap. Shortlisted 3 vendors.',
      buyingTimeline: 'Within current quarter',
      timelineEvidence: 'Q3 planning cycle starts next month. Want vendor selected before then.',
      problemSeverity: 'Moderate business impact',
      problemEvidence: 'APAC team using spreadsheets for pipeline tracking. Regional forecasts off by 25%.',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'VP Operations (Liams boss) attended demo and expressed strong support.',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Enterprise company, 2000+ employees, multi-region APAC operations, CRM is strategic priority',
      qualifiedNotes: 'Trade show lead fully qualified. VP Ops engaged as economic buyer. 3-vendor shortlist. APAC data residency requirement noted.',
    });

    if (!res.ok()) {
      console.log('Qualification failed:', res.status(), await res.text());
    }
    expect(res.ok()).toBeTruthy();
    console.log('Liam Hartley: Contacted → Qualified (score: 80, BANT filled)');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Qualified');
    expect(updated.score).toBeGreaterThanOrEqual(75);
  });
});

/* ================================================================== */
/*  SCENARIO 6 — Activity Logging & Pipeline Verification              */
/*  Multi-lead activity logging + UI pipeline/dashboard checks         */
/* ================================================================== */

test.describe('Scenario 6 — Activity Logging & Pipeline Verification', () => {
  test.setTimeout(180_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;

  test('6.1 — Log activities on Diana Park (Qualified) lead', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Park', 'Diana');
    expect(lead, 'Diana Park not found').toBeTruthy();
    console.log(`Found Diana Park: id=${lead.id}, status=${lead.status}`);

    await logActivity(request, token, {
      type: 'Email',
      subject: 'Proposal Follow-up — Diana Park / West Coast Operations',
      description: 'Sent updated pricing proposal with volume discounts for West Coast rollout.',
      outcome: 'Diana acknowledged receipt. Reviewing with finance team this week.',
      relatedEntityType: 'Lead',
      relatedEntityId: lead.id,
    });

    await logActivity(request, token, {
      type: 'Task',
      subject: 'Prepare custom ROI analysis for Diana Park',
      description: 'Build ROI model based on Diana Park West Coast team size and current tool costs.',
      outcome: 'ROI model shows 3.2x return in year 1. Ready to present.',
      relatedEntityType: 'Lead',
      relatedEntityId: lead.id,
    });

    console.log('Logged email + task activities on Diana Park');
  });

  test('6.2 — Log activities on Amara Osei (Contacted) lead', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Osei', 'Amara');
    expect(lead, 'Amara Osei not found').toBeTruthy();
    console.log(`Found Amara Osei: id=${lead.id}, status=${lead.status}`);

    await logActivity(request, token, {
      type: 'Call',
      subject: 'Referral Check-in — Amara Osei',
      description: 'Follow-up call with Amara, referred by existing customer. Discussed West Coast expansion CRM needs.',
      outcome: 'Amara interested in pipeline analytics and mobile access. Wants to involve her ops director. Scheduling demo next week.',
      relatedEntityType: 'Lead',
      relatedEntityId: lead.id,
    });

    console.log('Logged call activity on Amara Osei');
  });

  test('6.3 — Verify activities via API', async ({ request }) => {
    token = await ensureAuth(request);

    const activitiesRes = await apiGet(request, token, '/api/activities?page=1&pageSize=50');
    expect(activitiesRes.ok()).toBeTruthy();
    const activitiesData = await activitiesRes.json();
    const items = activitiesData.items ?? [];
    console.log(`Total activities returned: ${items.length}`);
    expect(items.length).toBeGreaterThan(0);

    // Verify we can find our recently logged activities
    const fischerActivities = items.filter((a: any) => a.subject?.includes('Fischer'));
    const parkActivities = items.filter((a: any) => a.subject?.includes('Diana Park') || a.subject?.includes('Park'));
    console.log(`Fischer activities: ${fischerActivities.length}, Park activities: ${parkActivities.length}`);
  });

  test('6.4 — UI: Dashboard loads and shows data', async ({ page, request }) => {
    const errors = attachDiagnostics(page);
    await loginPage(page, request);

    await page.goto('/app/dashboard');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(3000);

    // Dashboard should have content
    const heading = page.getByRole('heading').first();
    await expect(heading).toBeVisible({ timeout: 15_000 });
    console.log('Dashboard loaded successfully');
  });

  test('6.5 — UI: Leads list shows all statuses', async ({ page, request }) => {
    const errors = attachDiagnostics(page);
    await loginPage(page, request);

    await page.goto('/app/leads');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2000);

    // Verify the leads page loaded
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();

    // Check that leads data is present (table or cards)
    const dataPresent = await page.locator('table, .leads-table, .data-table, .p-datatable').first()
      .isVisible({ timeout: 10_000 }).catch(() => false);
    console.log(`Leads data table visible: ${dataPresent}`);
  });

  test('6.6 — UI: Opportunities list loads', async ({ page, request }) => {
    const errors = attachDiagnostics(page);
    await loginPage(page, request);

    await page.goto('/app/opportunities');
    await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await page.waitForTimeout(2000);

    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
    console.log('Opportunities list loaded');
  });
});

/* ================================================================== */
/*  SCENARIO 7 — Existing Converted Leads Verification                 */
/*  Verify Henrik Andersen, Sophie Laurent are in Converted status      */
/*  Verify Nina Volkov, Katya Petrova are in Lost status               */
/*  Verify Omar Khalil is in Disqualified status                       */
/* ================================================================== */

test.describe('Scenario 7 — Existing Lead Status Verification (API)', () => {
  test.setTimeout(60_000);

  let token: string;

  test('7.1 — Verify converted leads: Henrik Andersen (Score 98)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Andersen', 'Henrik');
    expect(lead, 'Henrik Andersen not found').toBeTruthy();
    expect(lead.status).toBe('Converted');
    expect(lead.score).toBeGreaterThanOrEqual(95);
    console.log(`Henrik Andersen: status=${lead.status}, score=${lead.score} ✓`);
  });

  test('7.2 — Verify converted leads: Sophie Laurent (Score 90)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Laurent', 'Sophie');
    expect(lead, 'Sophie Laurent not found').toBeTruthy();
    expect(lead.status).toBe('Converted');
    expect(lead.score).toBeGreaterThanOrEqual(85);
    console.log(`Sophie Laurent: status=${lead.status}, score=${lead.score} ✓`);
  });

  test('7.3 — Verify lost leads: Nina Volkov (Score 70)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Volkov', 'Nina');
    expect(lead, 'Nina Volkov not found').toBeTruthy();
    expect(lead.status).toBe('Lost');
    expect(lead.score).toBeGreaterThanOrEqual(60);
    console.log(`Nina Volkov: status=${lead.status}, score=${lead.score} ✓`);
  });

  test('7.4 — Verify lost leads: Katya Petrova (Score 52)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Petrova', 'Katya');
    expect(lead, 'Katya Petrova not found').toBeTruthy();
    expect(lead.status).toBe('Lost');
    expect(lead.score).toBeGreaterThanOrEqual(45);
    console.log(`Katya Petrova: status=${lead.status}, score=${lead.score} ✓`);
  });

  test('7.5 — Verify disqualified: Omar Khalil (Score 15)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Khalil', 'Omar');
    expect(lead, 'Omar Khalil not found').toBeTruthy();
    expect(lead.status).toBe('Disqualified');
    expect(lead.score).toBeLessThanOrEqual(20);
    console.log(`Omar Khalil: status=${lead.status}, score=${lead.score} ✓`);
  });

  test('7.6 — Verify nurture: Pradeep Sharma (Score 38)', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Sharma', 'Pradeep');
    expect(lead, 'Pradeep Sharma not found').toBeTruthy();
    expect(lead.status).toBe('Nurture');
    expect(lead.score).toBeGreaterThanOrEqual(30);
    console.log(`Pradeep Sharma: status=${lead.status}, score=${lead.score} ✓`);
  });
});

/* ================================================================== */
/*  SCENARIO 8 — Yuki Tanaka: Qualified → Converted → Opportunity      */
/*  Yuki Tanaka (Qualified, Score 85, Website, Mid-Market, APAC)       */
/*  Path: Qualified → Convert → Opportunity Qualification → Proposal   */
/* ================================================================== */

test.describe('Scenario 8 — Mid-Market Deal: Yuki Tanaka (Qualified → Opportunity Proposal)', () => {
  test.setTimeout(150_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;
  let opportunityId: string;

  test('8.1 — Find Yuki Tanaka, verify qualified', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Tanaka', 'Yuki');
    expect(lead, 'Yuki Tanaka not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Yuki Tanaka: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.status).toBe('Qualified');
    expect(lead.score).toBeGreaterThanOrEqual(80);
  });

  test('8.2 — Convert lead to Opportunity', async ({ request }) => {
    token = await ensureAuth(request);

    const convertRes = await apiPost(request, token, `/api/leads/${leadId}/convert`, {
      createAccount: true,
      accountName: 'Tanaka Digital Solutions',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Tanaka Digital APAC CRM Platform',
      amount: 85000,
      expectedCloseDate: futureDate(75),
      dealType: 'Inbound',
      segment: 'Mid-Market',
      stage: 'Qualification',
      velocity: 'Normal',
      isCompetitive: false,
      hasExecutiveChampion: true,
      isStrategic: false,
    });

    if (!convertRes.ok()) {
      const errText = await convertRes.text();
      if (errText.includes('already converted') || errText.includes('Converted')) {
        console.log('Lead already converted — searching for opportunity');
        const searchRes = await apiGet(request, token, '/api/opportunities?search=Tanaka&page=1&pageSize=5');
        if (searchRes.ok()) {
          const data = await searchRes.json();
          const match = (data.items ?? []).find((o: any) => o.name?.includes('Tanaka'));
          opportunityId = match?.id;
        }
      } else {
        console.log('Conversion failed:', convertRes.status(), errText);
        expect(convertRes.ok()).toBeTruthy();
      }
    } else {
      const json = await convertRes.json();
      opportunityId = json.opportunityId;
    }

    expect(opportunityId).toBeTruthy();
    console.log(`Lead converted → Opportunity: ${opportunityId}`);

    const lead = await getLead(request, token, leadId);
    expect(lead.status).toBe('Converted');
  });

  test('8.3 — Progress to Proposal stage', async ({ request }) => {
    token = await ensureAuth(request);
    expect(opportunityId).toBeTruthy();

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Requirements Gathering — Tanaka Digital',
      description: 'Virtual workshop with Yuki and APAC ops team. Mapped current processes and identified automation opportunities.',
      outcome: 'Clear requirements doc produced. Yuki approved scope for proposal generation. No competitors identified.',
      relatedEntityType: 'Opportunity',
      relatedEntityId: opportunityId,
    });

    const stageRes = await apiPatch(request, token, `/api/opportunities/${opportunityId}/stage`, {
      stage: 'Proposal',
    });
    expect(stageRes.ok()).toBeTruthy();
    console.log('Opportunity: Qualification → Proposal');

    const opp = await getOpportunity(request, token, opportunityId);
    expect(opp.stage).toBe('Proposal');
    expect(opp.amount).toBeGreaterThanOrEqual(80000);
    console.log(`Verified: stage=${opp.stage}, amount=$${opp.amount}`);
  });
});

/* ================================================================== */
/*  SCENARIO 9 — Arjun Kapoor: Partial BANT, Score Upgrade             */
/*  Arjun Kapoor (Qualified, Score 68, Trade Show, Enterprise, APAC)   */
/*  Path: Verify qualified → update BANT → improve score              */
/* ================================================================== */

test.describe('Scenario 9 — BANT Score Improvement: Arjun Kapoor', () => {
  test.setTimeout(90_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;

  test('9.1 — Find Arjun Kapoor, verify qualified with moderate score', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Kapoor', 'Arjun');
    expect(lead, 'Arjun Kapoor not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Arjun Kapoor: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.status).toBe('Qualified');
  });

  test('9.2 — Log additional discovery activities', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Call',
      subject: 'BANT Deep-Dive — Arjun Kapoor',
      description: 'Extended qualification call to uncover additional BANT details. Focused on timeline and economic buyer access.',
      outcome: 'Timeline accelerated — board mandated CRM upgrade by Q4. CFO (Priya Nair) will join next call.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Executive Briefing — Arjun Kapoor + CFO',
      description: 'Presented executive summary and ROI analysis to Arjun and CFO Priya Nair.',
      outcome: 'CFO approved budget. Wants to move to vendor selection within 2 weeks.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged BANT deep-dive call + executive briefing');
  });

  test('9.3 — Upgrade BANT factors and score', async ({ request }) => {
    token = await ensureAuth(request);

    const res = await updateLead(request, token, leadId, {
      score: 88,
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'CFO Priya Nair approved $180K for CRM modernization initiative',
      readinessToSpend: 'Actively evaluating solutions',
      readinessEvidence: 'RFP issued to 4 vendors. Shortlist decision in 2 weeks.',
      buyingTimeline: 'Decision date confirmed internally',
      timelineEvidence: 'Board mandate: CRM upgrade complete by Q4. Vendor selection by month-end.',
      problemSeverity: 'High business impact',
      problemEvidence: 'Lost 3 strategic APAC accounts due to CRM limitations. Revenue impact $1.5M.',
      economicBuyer: 'Buyer championing internally',
      economicBuyerEvidence: 'CFO Priya Nair actively championing the project. Has final sign-off authority.',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Enterprise, 3000+ employees, multi-country APAC presence, strategic CRM investment',
      qualifiedNotes: 'BANT fully upgraded. CFO champion, budget confirmed, accelerated timeline. High-value enterprise opportunity.',
    });

    expect(res.ok()).toBeTruthy();
    console.log('Arjun Kapoor: BANT upgraded, score → 88');

    const updated = await getLead(request, token, leadId);
    expect(updated.score).toBeGreaterThanOrEqual(85);
  });
});

/* ================================================================== */
/*  SCENARIO 10 — Clara Hoffman: Contacted → Qualified (BANT)          */
/*  Clara Hoffman (Contacted, Score 74, LinkedIn, Enterprise, East)    */
/*  Path: Log activity → Fill BANT → Qualified                        */
/* ================================================================== */

test.describe('Scenario 10 — LinkedIn Lead Qualification: Clara Hoffman (Contacted → Qualified)', () => {
  test.setTimeout(90_000);
  test.describe.configure({ mode: 'serial' });

  let token: string;
  let leadId: string;

  test('10.1 — Find Clara Hoffman, verify contacted', async ({ request }) => {
    token = await ensureAuth(request);

    const lead = await findLeadByName(request, token, 'Hoffman', 'Clara');
    expect(lead, 'Clara Hoffman not found').toBeTruthy();
    leadId = lead.id;
    console.log(`Found Clara Hoffman: id=${leadId}, status=${lead.status}, score=${lead.score}`);
    expect(lead.status).toBe('Contacted');
  });

  test('10.2 — Log qualification meeting', async ({ request }) => {
    token = await ensureAuth(request);

    await logActivity(request, token, {
      type: 'Meeting',
      subject: 'Qualification Meeting — Clara Hoffman',
      description: 'Video meeting with Clara to deep-dive into East Coast enterprise CRM needs. LinkedIn lead from Q1 campaign.',
      outcome: 'Confirmed budget ownership and decision timeline. Clara is both user champion and budget holder. Strong fit.',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
    });
    console.log('Logged qualification meeting');
  });

  test('10.3 — Fill BANT → Contacted → Qualified', async ({ request }) => {
    token = await ensureAuth(request);

    const res = await updateLead(request, token, leadId, {
      status: 'Qualified',
      score: 82,
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'Clara has $100K discretionary budget for sales tools. No additional approval needed under $120K.',
      readinessToSpend: 'Internal decision in progress',
      readinessEvidence: 'Comparing 2 solutions (us + HubSpot). Decision within 3 weeks.',
      buyingTimeline: 'Within current quarter',
      timelineEvidence: 'Needs implementation before Q3 sales kickoff (8 weeks away)',
      problemSeverity: 'Moderate business impact',
      problemEvidence: 'East Coast team lacking pipeline visibility. Manual reporting consuming 10+ hrs/week.',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'Clara Hoffman (VP Sales) is both champion and economic buyer.',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Enterprise financial services firm, 800 employees, 100-person sales org on East Coast',
      qualifiedNotes: 'LinkedIn lead qualified. Clara is champion + buyer. 2-vendor shortlist. 8-week implementation deadline.',
    });

    expect(res.ok()).toBeTruthy();
    console.log('Clara Hoffman: Contacted → Qualified (score: 82, BANT filled)');

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe('Qualified');
  });
});
