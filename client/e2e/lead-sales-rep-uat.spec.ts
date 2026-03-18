import { expect, test, type APIRequestContext, type APIResponse, type Page } from '@playwright/test';
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const UI_BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'leo.martin@crmenterprise.demo';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'ChangeThisRep!1';
const TENANT_KEY = process.env.E2E_TENANT_KEY ?? 'default';
const SQLCMD_PATH = process.env.CRM_SQLCMD_PATH ?? '/opt/homebrew/bin/sqlcmd';
const SQL_SERVER = process.env.CRM_SQL_SERVER ?? '127.0.0.1,1433';
const SQL_DATABASE = process.env.CRM_SQL_DATABASE ?? 'CRMEnterprise';
const SQL_USER = process.env.CRM_SQL_USER ?? 'sa';
const SQL_PASSWORD = process.env.CRM_SQL_PASSWORD ?? 'ChangeThisPassword!1';
const RESULTS_PATH = path.resolve(process.cwd(), '..', 'output', 'uat', 'leo-martin-lead-cycle-results.json');

type LeadRecord = {
  id: string;
  name: string;
  status: string;
  score: number;
  disqualificationReasonId?: string | null;
  lossReasonId?: string | null;
  lossCompetitor?: string | null;
  lossNotes?: string | null;
  nurtureFollowUpAtUtc?: string | null;
  qualifiedNotes?: string | null;
  budgetAvailability?: string | null;
  readinessToSpend?: string | null;
  buyingTimeline?: string | null;
  problemSeverity?: string | null;
  economicBuyer?: string | null;
  icpFit?: string | null;
  riskFlags: string[];
  scoreBreakdown: Array<{ factor: string; score: number; maxScore: number }>;
  conversationScore: number | null;
  conversationScoreLabel: string | null;
  conversationScoreReasons: string[];
  conversationSignalAvailable: boolean;
  isConverted: boolean;
  convertedOpportunityId?: string | null;
  conversionReadiness: {
    score: number;
    label: string;
    summary: string;
    qualificationSignalScore: number;
    conversationSignalScore: number | null;
    conversationSignalAvailable: boolean;
    managerReviewRecommended: boolean;
    primaryGap: string | null;
    reasons: string[];
  } | null;
};

type LoginResult = {
  accessToken: string;
  userId: string;
};

type ScenarioResult = {
  scenarioName: string;
  businessIntent: string;
  startingSignalProfile: string;
  expectedQualificationBand: string;
  lifecycleTarget: string;
  executionSteps: string[];
  expectedResult: string;
  actualResult: string;
  pass: boolean;
  defectFound: string | null;
  fixApplied: string | null;
};

type DefectSummary = {
  title: string;
  rootCause: string;
  fixApplied: string;
  retestResult: string;
};

type LeadPayload = Record<string, unknown>;

function parseJwtSubject(token: string): string {
  const parts = token.split('.');
  if (parts.length < 2) {
    throw new Error('Invalid JWT returned from login.');
  }

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8')) as Record<string, unknown>;
  const subject = payload.sub;
  if (typeof subject !== 'string' || subject.length === 0) {
    throw new Error('Login token did not include a subject claim.');
  }

  return subject;
}

function authHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Tenant-Key': TENANT_KEY
  };
}

function nowIso(offsetDays = 0, hourUtc = 14): string {
  const value = new Date();
  value.setUTCDate(value.getUTCDate() + offsetDays);
  value.setUTCHours(hourUtc, 0, 0, 0);
  return value.toISOString();
}

function createRealisticEmail(firstName: string, lastName: string, domain: string): string {
  const suffix = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  return `${firstName}.${lastName}.${suffix}`.toLowerCase().replace(/[^a-z0-9.@-]/g, '') + `@${domain}`;
}

function qualificationBand(score: number): string {
  if (score >= 75) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

function ensureResultsDirectory(): void {
  mkdirSync(path.dirname(RESULTS_PATH), { recursive: true });
}

function sqlLookup(table: 'LeadDisqualificationReasons' | 'LeadLossReasons', reasonName: string): string {
  const sql = `
SET NOCOUNT ON;
SELECT TOP 1 CONVERT(varchar(36), Id)
FROM dbo.${table}
WHERE Name = '${reasonName.replace(/'/g, "''")}';
`;
  const output = execFileSync(
    SQLCMD_PATH,
    ['-S', SQL_SERVER, '-U', SQL_USER, '-P', SQL_PASSWORD, '-C', '-d', SQL_DATABASE, '-h', '-1', '-W', '-Q', sql],
    { encoding: 'utf8' }
  );
  const id = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => /^[0-9a-fA-F-]{36}$/.test(line));

  if (!id) {
    throw new Error(`Could not resolve ${table} id for "${reasonName}".`);
  }

  return id;
}

async function expectBadRequest(response: APIResponse, expectedText: string | RegExp): Promise<void> {
  expect(response.status()).toBe(400);
  const body = await response.text();
  if (typeof expectedText === 'string') {
    expect(body).toContain(expectedText);
  } else {
    expect(body).toMatch(expectedText);
  }
}

async function loginViaUi(page: Page): Promise<void> {
  await page.goto(`${UI_BASE_URL}/login`);
  await page.getByPlaceholder('Enter your email').fill(SALES_REP_EMAIL);
  await page.getByPlaceholder('Enter your password').fill(SALES_REP_PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).first().click();
  await expect(page).toHaveURL(/\/app\/(dashboard|deals)/, { timeout: 20000 });
}

async function loginViaApi(request: APIRequestContext): Promise<LoginResult> {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': TENANT_KEY
    },
    data: {
      email: SALES_REP_EMAIL,
      password: SALES_REP_PASSWORD
    }
  });

  expect(response.ok()).toBeTruthy();
  const payload = (await response.json()) as { accessToken: string };
  return {
    accessToken: payload.accessToken,
    userId: parseJwtSubject(payload.accessToken)
  };
}

async function createLead(request: APIRequestContext, token: string, payload: LeadPayload): Promise<LeadRecord> {
  const response = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: authHeaders(token),
    data: payload
  });
  expect(response.status(), `Lead create failed for ${JSON.stringify(payload)}`).toBe(201);
  return (await response.json()) as LeadRecord;
}

async function updateLead(request: APIRequestContext, token: string, leadId: string, payload: LeadPayload): Promise<void> {
  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: authHeaders(token),
    data: payload
  });
  expect(response.status(), `Lead update failed for ${leadId}`).toBe(204);
}

async function updateLeadExpectBadRequest(request: APIRequestContext, token: string, leadId: string, payload: LeadPayload, expectedText: string | RegExp): Promise<void> {
  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: authHeaders(token),
    data: payload
  });
  await expectBadRequest(response, expectedText);
}

async function createCompletedActivity(request: APIRequestContext, token: string, ownerId: string, leadId: string, subject: string, description: string): Promise<void> {
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: authHeaders(token),
    data: {
      subject,
      description,
      outcome: 'Completed with clear customer next steps.',
      type: 'Meeting',
      priority: 'High',
      dueDateUtc: nowIso(-1, 13),
      completedDateUtc: nowIso(-1, 14),
      nextStepSubject: `Follow up on ${subject}`,
      nextStepDueDateUtc: nowIso(2, 15),
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId
    }
  });
  expect(response.status()).toBe(201);
}

async function addCadenceTouch(request: APIRequestContext, token: string, leadId: string, channel: string, outcome: string): Promise<void> {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/cadence-touch`, {
    headers: authHeaders(token),
    data: {
      channel,
      outcome,
      nextStepDueAtUtc: nowIso(3, 16)
    }
  });
  expect(response.ok()).toBeTruthy();
}

async function getLead(request: APIRequestContext, token: string, leadId: string): Promise<LeadRecord> {
  const response = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT_KEY
    }
  });
  expect(response.ok()).toBeTruthy();
  return (await response.json()) as LeadRecord;
}

async function convertLead(request: APIRequestContext, token: string, leadId: string, payload: LeadPayload) {
  return await request.post(`${API_BASE_URL}/api/leads/${leadId}/convert`, {
    headers: authHeaders(token),
    data: payload
  });
}

async function recycleLead(request: APIRequestContext, token: string, leadId: string) {
  return await request.post(`${API_BASE_URL}/api/leads/${leadId}/recycle-to-nurture`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': TENANT_KEY
    }
  });
}

function buildLeadPayload(
  ownerId: string,
  lead: {
    firstName: string;
    lastName: string;
    companyName: string;
    domain: string;
    jobTitle: string;
    source: string;
    phone?: string;
  }
): LeadPayload {
  return {
    firstName: lead.firstName,
    lastName: lead.lastName,
    companyName: lead.companyName,
    email: createRealisticEmail(lead.firstName, lead.lastName, lead.domain),
    phone: lead.phone ?? '+1 (416) 555-0188',
    jobTitle: lead.jobTitle,
    source: lead.source,
    ownerId,
    status: 'New'
  };
}

function qualifiedPayload(base: LeadPayload, overrides: Record<string, unknown>): LeadPayload {
  return {
    ...base,
    status: 'Qualified',
    ...overrides
  };
}

test('Leo Martin lead lifecycle coverage', async ({ page, request }) => {
  ensureResultsDirectory();

  const scenarioResults: ScenarioResult[] = [];
  const defectSummaries: DefectSummary[] = [
    {
      title: 'Problem severity scoring mismatch',
      rootCause: 'Server-side lead qualification scoring did not recognize "High business impact" and undervalued "Critical business impact" compared with the client scoring model.',
      fixApplied: 'Updated server-side scoring and epistemic mapping so the API now scores "High business impact" at 15 and "Critical business impact" at 20, aligned with the UI.',
      retestResult: 'Retest requires the high-business-impact scenario to outscore the otherwise identical recognized-operational-problem scenario and pass all lifecycle assertions.'
    }
  ];

  const recordScenario = (entry: ScenarioResult) => scenarioResults.push(entry);

  try {
    await loginViaUi(page);
    const login = await loginViaApi(request);
    const disqualificationReasonId = sqlLookup('LeadDisqualificationReasons', 'No budget / funding');
    const lossReasonId = sqlLookup('LeadLossReasons', 'Lost to competitor');

    const baseLeads = {
      baseline: {
        firstName: 'Amelia',
        lastName: 'Foster',
        companyName: 'Harbourline Advisory',
        ownerId: login.userId,
        status: 'New'
      },
      negative: buildLeadPayload(login.userId, {
        firstName: 'Karim',
        lastName: 'Nasser',
        companyName: 'Pine Street Leasing',
        domain: 'pinestreetleasing.com',
        jobTitle: 'Operations Coordinator',
        source: 'Inbound Call'
      }),
      assumed: buildLeadPayload(login.userId, {
        firstName: 'Elena',
        lastName: 'Popov',
        companyName: 'Crescent Ridge Holdings',
        domain: 'crescentridgeholdings.com',
        jobTitle: 'Project Analyst',
        source: 'Industry Event'
      }),
      mixed: buildLeadPayload(login.userId, {
        firstName: 'Julian',
        lastName: 'Mercer',
        companyName: 'Silver Birch Realty',
        domain: 'silverbirchrealty.com',
        jobTitle: 'Director of Operations',
        source: 'Referral'
      }),
      strong: buildLeadPayload(login.userId, {
        firstName: 'Grace',
        lastName: 'Holloway',
        companyName: 'North Point Capital',
        domain: 'northpointcapital.com',
        jobTitle: 'VP of Asset Operations',
        source: 'Executive Referral'
      }),
      contradiction: buildLeadPayload(login.userId, {
        firstName: 'Mateo',
        lastName: 'Alvarez',
        companyName: 'Summerset Offices',
        domain: 'summersetoffices.com',
        jobTitle: 'Portfolio Director',
        source: 'Partner Referral'
      }),
      noTimeline: buildLeadPayload(login.userId, {
        firstName: 'Helen',
        lastName: 'Zhou',
        companyName: 'Beacon Centre Management',
        domain: 'beaconcentre.ca',
        jobTitle: 'Operations Lead',
        source: 'Partner Referral'
      }),
      buyerGap: buildLeadPayload(login.userId, {
        firstName: 'Rami',
        lastName: 'Dabbous',
        companyName: 'Keystone Property Trust',
        domain: 'keystonepropertytrust.com',
        jobTitle: 'Regional Operations Manager',
        source: 'Website'
      }),
      weakFit: buildLeadPayload(login.userId, {
        firstName: 'Ingrid',
        lastName: 'Solberg',
        companyName: 'Oak Transit Services',
        domain: 'oaktransitservices.com',
        jobTitle: 'Business Analyst',
        source: 'Outbound Prospecting'
      }),
      highImpact: buildLeadPayload(login.userId, {
        firstName: 'Nathan',
        lastName: 'Cole',
        companyName: 'Easton Harbour Group',
        domain: 'eastonharbourgroup.com',
        jobTitle: 'Director of Portfolio Systems',
        source: 'Referral'
      }),
      override: buildLeadPayload(login.userId, {
        firstName: 'Lucia',
        lastName: 'Ferrer',
        companyName: 'Bluehaven Estates',
        domain: 'bluehavenestates.com',
        jobTitle: 'Operations Supervisor',
        source: 'Inbound Call'
      }),
      managerApproval: buildLeadPayload(login.userId, {
        firstName: 'Owen',
        lastName: 'Matthis',
        companyName: 'Westridge Logistics Park',
        domain: 'westridgelogisticspark.com',
        jobTitle: 'Site Coordinator',
        source: 'Website'
      }),
      closure: buildLeadPayload(login.userId, {
        firstName: 'Farah',
        lastName: 'Rahman',
        companyName: 'Lakeside Retail Partners',
        domain: 'lakesideretailpartners.com',
        jobTitle: 'Operations Manager',
        source: 'Industry Event'
      })
    };

    const baseline = await createLead(request, login.accessToken, baseLeads.baseline);
    const baselineDetail = await getLead(request, login.accessToken, baseline.id);
    expect(qualificationBand(baselineDetail.score)).toBe('Low');
    recordScenario({
      scenarioName: 'Baseline unknown lead',
      businessIntent: 'Confirm the lowest realistic baseline when a lead has no validated qualification evidence.',
      startingSignalProfile: 'Only core contact details are present. No activity history and no qualification factors are recorded.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Remain in New',
      executionSteps: ['Create the lead with realistic contact data only.', 'Read back the lead score and lifecycle state.'],
      expectedResult: 'Lead remains New with a low qualification band and no conversion readiness.',
      actualResult: `Lead stayed ${baselineDetail.status} with score ${baselineDetail.score} (${qualificationBand(baselineDetail.score)}).`,
      pass: baselineDetail.status === 'New' && qualificationBand(baselineDetail.score) === 'Low',
      defectFound: null,
      fixApplied: null
    });

    const negative = await createLead(request, login.accessToken, baseLeads.negative);
    await createCompletedActivity(request, login.accessToken, login.userId, negative.id, 'Initial disqualification review', 'Reviewed Pine Street Leasing requirements and confirmed no active buying conditions.');
    await updateLead(request, login.accessToken, negative.id, qualifiedPayload(baseLeads.negative, {
      qualifiedNotes: 'Karim confirmed there is no approved spend, no active project, no timeline, no buyer involvement, and the fit is weak.',
      budgetAvailability: 'Budget explicitly unavailable',
      budgetEvidence: 'Customer call',
      readinessToSpend: 'Not planning to spend',
      readinessEvidence: 'Customer call',
      buyingTimeline: 'No defined timeline',
      timelineEvidence: 'Customer call',
      problemSeverity: 'Problem acknowledged but deprioritized',
      problemEvidence: 'Customer call',
      economicBuyer: 'Buyer explicitly not involved',
      economicBuyerEvidence: 'Customer call',
      icpFit: 'Clearly out of ICP',
      icpFitEvidence: 'Account research'
    }));
    const negativeDetail = await getLead(request, login.accessToken, negative.id);
    expect(qualificationBand(negativeDetail.score)).toBe('Low');
    recordScenario({
      scenarioName: 'Explicitly negative lead',
      businessIntent: 'Validate that explicit negative signals keep a lead in the lowest qualification band even when evidence exists.',
      startingSignalProfile: 'Budget unavailable, no spend intent, no timeline, buyer not involved, weak fit.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Qualified with low score',
      executionSteps: ['Create the lead.', 'Log a completed activity.', 'Qualify with explicit negative evidence.'],
      expectedResult: 'Lead can be qualified for auditability but remains low-scoring and unattractive for conversion.',
      actualResult: `Lead moved to ${negativeDetail.status} with score ${negativeDetail.score} (${qualificationBand(negativeDetail.score)}).`,
      pass: negativeDetail.status === 'Qualified' && qualificationBand(negativeDetail.score) === 'Low',
      defectFound: null,
      fixApplied: null
    });

    const assumed = await createLead(request, login.accessToken, baseLeads.assumed);
    await createCompletedActivity(request, login.accessToken, login.userId, assumed.id, 'Early discovery call', 'Elena described an early-stage interest with very limited buying certainty.');
    await updateLead(request, login.accessToken, assumed.id, qualifiedPayload(baseLeads.assumed, {
      qualifiedNotes: 'Elena expressed interest and described a possible evaluation path, but the evidence remains assumed and early.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Discovery notes',
      readinessToSpend: 'Interest expressed, no urgency',
      readinessEvidence: 'Discovery notes',
      buyingTimeline: 'Rough timeline mentioned',
      timelineEvidence: 'Discovery notes',
      problemSeverity: 'Recognized operational problem',
      problemEvidence: 'Discovery notes',
      economicBuyer: 'Influencer identified',
      economicBuyerEvidence: 'Discovery notes',
      icpFit: 'Partial ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const assumedDetail = await getLead(request, login.accessToken, assumed.id);
    expect(qualificationBand(assumedDetail.score)).toBe('Low');
    recordScenario({
      scenarioName: 'Early-interest assumed lead',
      businessIntent: 'Cover the low-qualification path where evidence exists but remains tentative and assumption-heavy.',
      startingSignalProfile: 'Indicative budget, low urgency, rough timeline, influencer-only buyer access, partial ICP fit.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Qualified with low score',
      executionSteps: ['Create the lead.', 'Log a completed discovery activity.', 'Qualify with assumed, early-stage evidence.'],
      expectedResult: 'Lead qualifies but remains low-scoring because the buying motion is still weak.',
      actualResult: `Lead moved to ${assumedDetail.status} with score ${assumedDetail.score} (${qualificationBand(assumedDetail.score)}).`,
      pass: assumedDetail.status === 'Qualified' && qualificationBand(assumedDetail.score) === 'Low',
      defectFound: null,
      fixApplied: null
    });

    const mixed = await createLead(request, login.accessToken, baseLeads.mixed);
    await updateLeadExpectBadRequest(request, login.accessToken, mixed.id, {
      status: 'Contacted'
    }, 'Contacted status is activity-driven');
    await createCompletedActivity(request, login.accessToken, login.userId, mixed.id, 'Operations discovery workshop', 'Julian reviewed reporting friction, budget range, and an informal implementation timeline.');
    await updateLead(request, login.accessToken, mixed.id, { ...baseLeads.mixed, status: 'Contacted' });
    await updateLeadExpectBadRequest(request, login.accessToken, mixed.id, qualifiedPayload(baseLeads.mixed, {
      qualifiedNotes: 'Julian has a visible pain point, but only two factors have been documented so far.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Workshop notes',
      readinessToSpend: 'Actively evaluating solutions',
      readinessEvidence: 'Workshop notes'
    }), 'At least 3 qualification factors are required');
    await updateLead(request, login.accessToken, mixed.id, qualifiedPayload(baseLeads.mixed, {
      qualifiedNotes: 'Julian confirmed an active evaluation, a rough timeline, and a real operational reporting problem, but buyer engagement is still incomplete.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Workshop notes',
      readinessToSpend: 'Actively evaluating solutions',
      readinessEvidence: 'Workshop notes',
      buyingTimeline: 'Rough timeline mentioned',
      timelineEvidence: 'Workshop notes',
      problemSeverity: 'Recognized operational problem',
      problemEvidence: 'Workshop notes',
      economicBuyer: 'Buyer identified, not engaged',
      economicBuyerEvidence: 'Stakeholder map',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const mixedDetail = await getLead(request, login.accessToken, mixed.id);
    expect(qualificationBand(mixedDetail.score)).toBe('Medium');
    recordScenario({
      scenarioName: 'Mid-funnel mixed-signal lead',
      businessIntent: 'Cover the medium qualification path and validate activity-driven Contacted plus minimum-factor enforcement for qualification.',
      startingSignalProfile: 'Balanced mix of validated and incomplete evidence with buyer engagement still weak.',
      expectedQualificationBand: 'Medium',
      lifecycleTarget: 'Contacted then Qualified',
      executionSteps: ['Attempt Contacted without activity and confirm it is blocked.', 'Add a completed activity and set Contacted.', 'Attempt to qualify with fewer than three factors and confirm it is blocked.', 'Qualify with a mixed signal set.'],
      expectedResult: 'Lifecycle gates enforce Contacted and Qualified rules, then the lead lands in a medium qualification band.',
      actualResult: `Lead progressed to ${mixedDetail.status} with score ${mixedDetail.score} (${qualificationBand(mixedDetail.score)}).`,
      pass: mixedDetail.status === 'Qualified' && qualificationBand(mixedDetail.score) === 'Medium',
      defectFound: null,
      fixApplied: null
    });

    const strong = await createLead(request, login.accessToken, baseLeads.strong);
    await addCadenceTouch(request, login.accessToken, strong.id, 'Email', 'Shared commercial rollout detail after an executive referral and confirmed follow-up with finance.');
    await createCompletedActivity(request, login.accessToken, login.userId, strong.id, 'Executive qualification meeting', 'Grace and the finance sponsor confirmed approved funding, a near-term decision date, and direct buyer engagement.');
    await updateLead(request, login.accessToken, strong.id, qualifiedPayload(baseLeads.strong, {
      qualifiedNotes: 'Grace confirmed a critical reporting initiative, approved funding, an internal decision date, and direct buyer participation.',
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'Written confirmation',
      readinessToSpend: 'Ready to proceed pending final step',
      readinessEvidence: 'Executive meeting',
      buyingTimeline: 'Decision date confirmed internally',
      timelineEvidence: 'Executive meeting',
      problemSeverity: 'Critical business impact',
      problemEvidence: 'Executive meeting',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'Executive meeting',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const strongDetail = await getLead(request, login.accessToken, strong.id);
    expect(qualificationBand(strongDetail.score)).toBe('High');
    const strongConversionResponse = await convertLead(request, login.accessToken, strong.id, {
      createAccount: true,
      accountName: 'North Point Capital',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'North Point Capital Reporting Rollout',
      amount: 210000,
      expectedCloseDate: nowIso(21, 12),
      dealType: 'Net-New',
      segment: 'Mid-Market',
      stage: 'Qualification',
      isCompetitive: true,
      hasExecutiveChampion: true,
      isStrategic: true,
      velocity: 'Fast',
      managerApproved: false
    });
    expect(strongConversionResponse.ok()).toBeTruthy();
    const strongConverted = await getLead(request, login.accessToken, strong.id);
    recordScenario({
      scenarioName: 'Strong verified lead',
      businessIntent: 'Validate the clean happy-path conversion for a high-confidence lead.',
      startingSignalProfile: 'Approved budget, committed timeline, critical pain, engaged buyer, strong ICP fit.',
      expectedQualificationBand: 'High',
      lifecycleTarget: 'Qualified then Converted',
      executionSteps: ['Create the lead.', 'Add cadence evidence and a completed executive meeting.', 'Qualify with strong validated factors.', 'Convert without override.'],
      expectedResult: 'Lead scores high and converts cleanly without override or manager approval.',
      actualResult: `Lead scored ${strongDetail.score}, converted successfully, and ended in ${strongConverted.status}.`,
      pass: strongConverted.status === 'Converted' && strongConverted.isConverted,
      defectFound: null,
      fixApplied: null
    });

    const contradiction = await createLead(request, login.accessToken, baseLeads.contradiction);
    await createCompletedActivity(request, login.accessToken, login.userId, contradiction.id, 'Contradiction review session', 'Mateo described an approved budget envelope but no current intent to spend.');
    await updateLead(request, login.accessToken, contradiction.id, qualifiedPayload(baseLeads.contradiction, {
      qualifiedNotes: 'Mateo has funding authority but stated the team is not planning to spend this quarter despite a documented need.',
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'Customer meeting',
      readinessToSpend: 'Not planning to spend',
      readinessEvidence: 'Customer meeting',
      buyingTimeline: 'Target date verbally confirmed',
      timelineEvidence: 'Customer meeting',
      problemSeverity: 'High business impact',
      problemEvidence: 'Customer meeting',
      economicBuyer: 'Buyer verbally supportive',
      economicBuyerEvidence: 'Customer meeting',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const contradictionDetail = await getLead(request, login.accessToken, contradiction.id);
    expect(contradictionDetail.riskFlags.join(' ')).toMatch(/budget confirmed but no initiative/i);
    recordScenario({
      scenarioName: 'Budget contradiction lead',
      businessIntent: 'Validate contradictory signals where funding exists but active spend intent is missing.',
      startingSignalProfile: 'Approved budget paired with no intention to spend now.',
      expectedQualificationBand: 'Medium',
      lifecycleTarget: 'Qualified with risk flag',
      executionSteps: ['Create the lead.', 'Log a completed review meeting.', 'Qualify with contradictory funding and readiness signals.'],
      expectedResult: 'Lead qualifies but carries an explicit readiness risk.',
      actualResult: `Lead scored ${contradictionDetail.score} and exposed risk flags: ${contradictionDetail.riskFlags.join('; ')}.`,
      pass: contradictionDetail.status === 'Qualified' && contradictionDetail.riskFlags.some((flag) => /budget confirmed but no initiative/i.test(flag)),
      defectFound: null,
      fixApplied: null
    });

    const noTimeline = await createLead(request, login.accessToken, baseLeads.noTimeline);
    await createCompletedActivity(request, login.accessToken, login.userId, noTimeline.id, 'Timeline discovery call', 'Helen confirmed a real problem and budget range, but no delivery timing could be committed.');
    await updateLead(request, login.accessToken, noTimeline.id, qualifiedPayload(baseLeads.noTimeline, {
      qualifiedNotes: 'Helen confirmed a valid reporting issue and buying interest, but no timeline has been defined yet.',
      budgetAvailability: 'Budget allocated and approved',
      budgetEvidence: 'Written confirmation',
      readinessToSpend: 'Internal decision in progress',
      readinessEvidence: 'Written confirmation',
      buyingTimeline: 'No defined timeline',
      timelineEvidence: 'Discovery call',
      problemSeverity: 'High business impact',
      problemEvidence: 'Written confirmation',
      economicBuyer: 'Buyer engaged in discussion',
      economicBuyerEvidence: 'Written confirmation',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const noTimelineDetail = await getLead(request, login.accessToken, noTimeline.id);
    expect(noTimelineDetail.conversionReadiness?.primaryGap).toBe('Buying timeline');
    expect(noTimelineDetail.conversionReadiness?.reasons.join(' ')).toMatch(/Buying timeline remains the weakest conversion signal/i);
    recordScenario({
      scenarioName: 'No-timeline risk lead',
      businessIntent: 'Validate that the system surfaces timeline risk even when the rest of the lead looks commercially viable.',
      startingSignalProfile: 'Buyer engaged and problem is real, but no timeline exists.',
      expectedQualificationBand: 'High',
      lifecycleTarget: 'Qualified with timeline risk',
      executionSteps: ['Create the lead.', 'Log a completed discovery call.', 'Qualify with no defined timeline.'],
      expectedResult: 'Lead qualifies but flags timing risk.',
      actualResult: `Lead scored ${noTimelineDetail.score} with primary gap "${noTimelineDetail.conversionReadiness?.primaryGap ?? 'n/a'}".`,
      pass: noTimelineDetail.status === 'Qualified' && qualificationBand(noTimelineDetail.score) === 'High' && noTimelineDetail.conversionReadiness?.primaryGap === 'Buying timeline',
      defectFound: null,
      fixApplied: null
    });

    const buyerGap = await createLead(request, login.accessToken, baseLeads.buyerGap);
    await createCompletedActivity(request, login.accessToken, login.userId, buyerGap.id, 'Buyer access review', 'Rami described the initiative and budget range but could not bring the buyer into the process.');
    await updateLead(request, login.accessToken, buyerGap.id, qualifiedPayload(baseLeads.buyerGap, {
      qualifiedNotes: 'Rami is carrying the evaluation, but the economic buyer has only been identified and not yet engaged directly.',
      budgetAvailability: 'Budget identified but unapproved',
      budgetEvidence: 'Review call',
      readinessToSpend: 'Actively evaluating solutions',
      readinessEvidence: 'Review call',
      buyingTimeline: 'Target date verbally confirmed',
      timelineEvidence: 'Review call',
      problemSeverity: 'High business impact',
      problemEvidence: 'Review call',
      economicBuyer: 'Buyer identified, not engaged',
      economicBuyerEvidence: 'Stakeholder review',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const buyerGapDetail = await getLead(request, login.accessToken, buyerGap.id);
    expect(buyerGapDetail.riskFlags.join(' ')).toMatch(/buyer/i);
    recordScenario({
      scenarioName: 'Buyer-not-engaged risk lead',
      businessIntent: 'Validate the risk path where the opportunity looks real but buyer engagement is still missing.',
      startingSignalProfile: 'Commercial motion exists, but buyer access is incomplete.',
      expectedQualificationBand: 'Medium',
      lifecycleTarget: 'Qualified with buyer gap',
      executionSteps: ['Create the lead.', 'Log a completed review call.', 'Qualify with buyer identified but not engaged.'],
      expectedResult: 'Lead qualifies and surfaces buyer-engagement risk.',
      actualResult: `Lead scored ${buyerGapDetail.score} with primary gap "${buyerGapDetail.conversionReadiness?.primaryGap ?? 'n/a'}".`,
      pass: buyerGapDetail.status === 'Qualified' && /buyer/i.test(buyerGapDetail.riskFlags.join(' ')),
      defectFound: null,
      fixApplied: null
    });

    const weakFit = await createLead(request, login.accessToken, baseLeads.weakFit);
    await createCompletedActivity(request, login.accessToken, login.userId, weakFit.id, 'Fit review session', 'Ingrid is responsive, but Oak Transit Services sits outside the core customer profile.');
    await updateLead(request, login.accessToken, weakFit.id, qualifiedPayload(baseLeads.weakFit, {
      qualifiedNotes: 'Ingrid is engaged, but the account profile remains a weak strategic fit.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Fit review',
      readinessToSpend: 'Interest expressed, no urgency',
      readinessEvidence: 'Fit review',
      buyingTimeline: 'Rough timeline mentioned',
      timelineEvidence: 'Fit review',
      problemSeverity: 'Recognized operational problem',
      problemEvidence: 'Fit review',
      economicBuyer: 'Influencer identified',
      economicBuyerEvidence: 'Fit review',
      icpFit: 'Clearly out of ICP',
      icpFitEvidence: 'Account research'
    }));
    const weakFitDetail = await getLead(request, login.accessToken, weakFit.id);
    expect(weakFitDetail.riskFlags.join(' ')).toMatch(/icp/i);
    recordScenario({
      scenarioName: 'Weak-ICP lead',
      businessIntent: 'Validate that weak strategic fit remains visible even when the lead is responsive.',
      startingSignalProfile: 'Responsive contact but clearly out of the ideal customer profile.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Qualified with ICP warning',
      executionSteps: ['Create the lead.', 'Log a completed fit review session.', 'Qualify with a weak ICP assessment.'],
      expectedResult: 'Lead remains low-scoring and carries ICP risk.',
      actualResult: `Lead scored ${weakFitDetail.score} with risk flags: ${weakFitDetail.riskFlags.join('; ')}.`,
      pass: weakFitDetail.status === 'Qualified' && /icp/i.test(weakFitDetail.riskFlags.join(' ')),
      defectFound: null,
      fixApplied: null
    });

    const highImpact = await createLead(request, login.accessToken, baseLeads.highImpact);
    await createCompletedActivity(request, login.accessToken, login.userId, highImpact.id, 'Severity validation session', 'Nathan confirmed a severe operational bottleneck with leadership attention but not quite a critical outage.');
    await updateLead(request, login.accessToken, highImpact.id, qualifiedPayload(baseLeads.highImpact, {
      qualifiedNotes: 'Nathan confirmed a materially severe reporting issue with leadership attention, but it is not yet a critical outage.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Validation session',
      readinessToSpend: 'Actively evaluating solutions',
      readinessEvidence: 'Validation session',
      buyingTimeline: 'Rough timeline mentioned',
      timelineEvidence: 'Validation session',
      problemSeverity: 'High business impact',
      problemEvidence: 'Validation session',
      economicBuyer: 'Buyer identified, not engaged',
      economicBuyerEvidence: 'Validation session',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const highImpactDetail = await getLead(request, login.accessToken, highImpact.id);
    expect(highImpactDetail.score).toBeGreaterThan(mixedDetail.score);
    recordScenario({
      scenarioName: 'High-business-impact lead',
      businessIntent: 'Retest the server-side scoring fix for the high-business-impact branch.',
      startingSignalProfile: 'Same commercial posture as the mixed-signal lead, but with higher validated problem severity.',
      expectedQualificationBand: 'Medium',
      lifecycleTarget: 'Qualified with corrected scoring',
      executionSteps: ['Create the lead.', 'Log a completed validation session.', 'Qualify with "High business impact".', 'Compare the resulting score against the recognized-operational-problem scenario.'],
      expectedResult: 'The high-business-impact lead scores above the comparable recognized-operational-problem scenario.',
      actualResult: `High-impact score was ${highImpactDetail.score} versus ${mixedDetail.score} for the comparable lower-severity scenario.`,
      pass: highImpactDetail.status === 'Qualified' && highImpactDetail.score > mixedDetail.score,
      defectFound: 'Prior to the fix, this branch was not scored correctly on the server.',
      fixApplied: 'Aligned the server-side problem severity score map with the client scoring model.',
    });

    const override = await createLead(request, login.accessToken, baseLeads.override);
    await createCompletedActivity(request, login.accessToken, login.userId, override.id, 'Commercial review call', 'Lucia described a legitimate problem and a viable account, but evidence remains incomplete.');
    await updateLead(request, login.accessToken, override.id, qualifiedPayload(baseLeads.override, {
      qualifiedNotes: 'Lucia described a real problem and a workable account, but budget and buyer proof are still incomplete.',
      budgetAvailability: 'Indicative range mentioned',
      budgetEvidence: 'Review call',
      readinessToSpend: 'Interest expressed, no urgency',
      readinessEvidence: 'Review call',
      buyingTimeline: 'Rough timeline mentioned',
      timelineEvidence: 'Review call',
      problemSeverity: 'High business impact',
      problemEvidence: 'Review call',
      economicBuyer: 'Influencer identified',
      economicBuyerEvidence: 'Review call',
      icpFit: 'Strong ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const overrideDetail = await getLead(request, login.accessToken, override.id);
    expect(qualificationBand(overrideDetail.score)).toBe('Medium');
    const overrideBlocked = await convertLead(request, login.accessToken, override.id, {
      createAccount: true,
      accountName: 'Bluehaven Estates',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Bluehaven Estates Reporting Plan',
      amount: 98000,
      expectedCloseDate: nowIso(28, 12),
      dealType: 'Net-New',
      segment: 'SMB',
      stage: 'Qualification',
      isCompetitive: true,
      hasExecutiveChampion: false,
      isStrategic: false,
      velocity: 'Normal',
      managerApproved: false
    });
    await expectBadRequest(overrideBlocked, 'Override reason is required');
    const overrideAllowed = await convertLead(request, login.accessToken, override.id, {
      createAccount: true,
      accountName: 'Bluehaven Estates',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Bluehaven Estates Reporting Plan',
      amount: 98000,
      expectedCloseDate: nowIso(28, 12),
      dealType: 'Net-New',
      segment: 'SMB',
      stage: 'Qualification',
      isCompetitive: true,
      hasExecutiveChampion: false,
      isStrategic: false,
      velocity: 'Normal',
      managerApproved: false,
      overrideReason: 'Commercial interest is credible and the sponsor requested a proposal despite incomplete proof on buyer access and budget confirmation.'
    });
    expect(overrideAllowed.ok()).toBeTruthy();
    const overrideConverted = await getLead(request, login.accessToken, override.id);
    recordScenario({
      scenarioName: 'Override-threshold lead',
      businessIntent: 'Validate the conversion path that requires an override reason but not manager approval.',
      startingSignalProfile: 'Commercially plausible medium-scoring lead with incomplete proof on the weakest factors.',
      expectedQualificationBand: 'Medium',
      lifecycleTarget: 'Qualified then Converted with override',
      executionSteps: ['Create and qualify the lead.', 'Attempt conversion without override reason and confirm it is blocked.', 'Retry conversion with a business override reason.'],
      expectedResult: 'Conversion is blocked until an override reason is supplied.',
      actualResult: `Lead scored ${overrideDetail.score}; the first conversion was blocked and the second ended in ${overrideConverted.status}.`,
      pass: overrideConverted.status === 'Converted',
      defectFound: null,
      fixApplied: null
    });

    const managerApproval = await createLead(request, login.accessToken, baseLeads.managerApproval);
    await createCompletedActivity(request, login.accessToken, login.userId, managerApproval.id, 'Initial qualification review', 'Owen described a real but weakly funded initiative with little buyer engagement.');
    await updateLead(request, login.accessToken, managerApproval.id, qualifiedPayload(baseLeads.managerApproval, {
      qualifiedNotes: 'Owen described a real issue, but the budget is not defined, urgency is low, the buyer is not engaged, and fit is only partial.',
      budgetAvailability: 'No defined budget',
      budgetEvidence: 'Review notes',
      readinessToSpend: 'Interest expressed, no urgency',
      readinessEvidence: 'Review notes',
      buyingTimeline: 'No defined timeline',
      timelineEvidence: 'Review notes',
      problemSeverity: 'Recognized operational problem',
      problemEvidence: 'Review notes',
      economicBuyer: 'Buyer identified, not engaged',
      economicBuyerEvidence: 'Review notes',
      icpFit: 'Partial ICP fit',
      icpFitEvidence: 'Account research'
    }));
    const managerApprovalDetail = await getLead(request, login.accessToken, managerApproval.id);
    expect(qualificationBand(managerApprovalDetail.score)).toBe('Low');
    const approvalBlocked = await convertLead(request, login.accessToken, managerApproval.id, {
      createAccount: true,
      accountName: 'Westridge Logistics Park',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Westridge Logistics Reporting Program',
      amount: 87000,
      expectedCloseDate: nowIso(35, 12),
      dealType: 'Net-New',
      segment: 'SMB',
      stage: 'Qualification',
      isCompetitive: true,
      hasExecutiveChampion: false,
      isStrategic: false,
      velocity: 'Normal',
      managerApproved: false,
      overrideReason: 'The site team needs a path forward even though the opportunity remains under review.'
    });
    await expectBadRequest(approvalBlocked, 'Manager approval is required');
    const approvalAllowed = await convertLead(request, login.accessToken, managerApproval.id, {
      createAccount: true,
      accountName: 'Westridge Logistics Park',
      createContact: true,
      createOpportunity: true,
      opportunityName: 'Westridge Logistics Reporting Program',
      amount: 87000,
      expectedCloseDate: nowIso(35, 12),
      dealType: 'Net-New',
      segment: 'SMB',
      stage: 'Qualification',
      isCompetitive: true,
      hasExecutiveChampion: false,
      isStrategic: false,
      velocity: 'Normal',
      managerApproved: true,
      overrideReason: 'The regional manager approved converting the opportunity so the team can formalize scope while the commercial proof matures.'
    });
    expect(approvalAllowed.ok()).toBeTruthy();
    const managerApprovalConverted = await getLead(request, login.accessToken, managerApproval.id);
    recordScenario({
      scenarioName: 'Manager-approval lead',
      businessIntent: 'Validate the low-score conversion path that requires both override rationale and manager approval.',
      startingSignalProfile: 'Weak commercial proof, low score, and incomplete buying structure.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Qualified then Converted with manager approval',
      executionSteps: ['Create and qualify the lead.', 'Attempt conversion with override but without manager approval and confirm it is blocked.', 'Retry conversion with both manager approval and override reason.'],
      expectedResult: 'Conversion only succeeds after manager approval is supplied.',
      actualResult: `Lead scored ${managerApprovalDetail.score}; the first conversion was blocked and the approved retry ended in ${managerApprovalConverted.status}.`,
      pass: managerApprovalConverted.status === 'Converted',
      defectFound: null,
      fixApplied: null
    });

    const closure = await createLead(request, login.accessToken, baseLeads.closure);
    const recycleBlocked = await recycleLead(request, login.accessToken, closure.id);
    await expectBadRequest(recycleBlocked, 'Only Lost or Disqualified leads can be recycled to Nurture');
    const disqualifiedBlocked = await request.put(`${API_BASE_URL}/api/leads/${closure.id}`, {
      headers: authHeaders(login.accessToken),
      data: {
        ...baseLeads.closure,
        status: 'Disqualified'
      }
    });
    await expectBadRequest(disqualifiedBlocked, 'Disqualification reason is required');
    await updateLead(request, login.accessToken, closure.id, {
      ...baseLeads.closure,
      status: 'Disqualified',
      disqualificationReasonId
    });
    const recycleAfterDisqualified = await recycleLead(request, login.accessToken, closure.id);
    expect(recycleAfterDisqualified.status()).toBe(204);
    const lostBlocked = await request.put(`${API_BASE_URL}/api/leads/${closure.id}`, {
      headers: authHeaders(login.accessToken),
      data: {
        ...baseLeads.closure,
        status: 'Lost',
        lossReasonId
      }
    });
    await expectBadRequest(lostBlocked, 'Competitor is required');
    await updateLead(request, login.accessToken, closure.id, {
      ...baseLeads.closure,
      status: 'Lost',
      lossReasonId,
      lossCompetitor: 'Cobalt Metrics',
      lossNotes: 'Farah chose a competing implementation partner after the commercial review.',
      qualifiedNotes: 'Farah evaluated the solution seriously before choosing a competitor.'
    });
    const recycleAfterLost = await recycleLead(request, login.accessToken, closure.id);
    expect(recycleAfterLost.status()).toBe(204);
    const closureDetail = await getLead(request, login.accessToken, closure.id);
    expect(closureDetail.status).toBe('Nurture');
    expect(closureDetail.nurtureFollowUpAtUtc).toBeTruthy();
    recordScenario({
      scenarioName: 'Closure-and-recycle lead',
      businessIntent: 'Validate disqualified and lost closure enforcement plus recycle-to-nurture behavior.',
      startingSignalProfile: 'Lead starts New, then exercises closure validation rules and recycle flows.',
      expectedQualificationBand: 'Low',
      lifecycleTarget: 'Disqualified, recycled, Lost, recycled',
      executionSteps: ['Attempt recycle from New and confirm it is blocked.', 'Attempt Disqualified without reason and confirm it is blocked.', 'Disqualify with a valid reason and recycle to Nurture.', 'Attempt Lost without full required fields and confirm it is blocked.', 'Mark Lost with reason, competitor, and notes, then recycle again.'],
      expectedResult: 'Closure rules are enforced and recycle only works from Lost or Disqualified states.',
      actualResult: `Lead ended in ${closureDetail.status} with nurture follow-up ${closureDetail.nurtureFollowUpAtUtc}.`,
      pass: closureDetail.status === 'Nurture' && !!closureDetail.nurtureFollowUpAtUtc,
      defectFound: null,
      fixApplied: null
    });

    expect(scenarioResults).toHaveLength(13);
    expect(scenarioResults.every((item) => item.pass)).toBeTruthy();
  } finally {
    const passed = scenarioResults.filter((item) => item.pass).length;
    const failed = scenarioResults.filter((item) => !item.pass).length;

    writeFileSync(
      RESULTS_PATH,
      JSON.stringify(
        {
          title: 'Leo Martin Lead Lifecycle UAT',
          generatedAtUtc: new Date().toISOString(),
          totalScenarios: scenarioResults.length,
          passed,
          failed,
          blocked: 0,
          defects: defectSummaries,
          scenarios: scenarioResults
        },
        null,
        2
      )
    );
  }
});
