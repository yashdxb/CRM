import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? process.env.E2E_ADMIN_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

type Scenario = {
  key: 'A' | 'B' | 'C' | 'D';
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  jobTitle: string;
  source: string;
  territory: string;
  status: 'Qualified' | 'Nurture' | 'Disqualified' | 'Lost';
  budgetAvailability: string;
  readinessToSpend: string;
  buyingTimeline: string;
  problemSeverity: string;
  economicBuyer: string;
  icpFit: string;
  qualifiedNotes?: string;
  nurtureFollowUpAtUtc?: string;
  disqualifiedReason?: string;
  lossReason?: string;
  lossCompetitor?: string;
  lossNotes?: string;
};

const scenarios: Scenario[] = [
  {
    key: 'A',
    firstName: 'Alex',
    lastName: 'Johnson',
    companyName: 'Blue Harbor Logistics',
    email: 'alex@blueharborlogistics.com',
    phone: '+14155550134',
    jobTitle: 'Ops Director',
    source: 'Referral',
    territory: 'West',
    status: 'Qualified',
    budgetAvailability: 'Budget allocated and approved',
    readinessToSpend: 'Ready to proceed pending final step',
    buyingTimeline: 'Target date verbally confirmed',
    problemSeverity: 'Critical business impact',
    economicBuyer: 'Buyer engaged in discussion',
    icpFit: 'Strong ICP fit',
    qualifiedNotes: 'Pain confirmed, buyer engaged, timeline agreed.'
  },
  {
    key: 'B',
    firstName: 'Maya',
    lastName: 'Chen',
    companyName: 'Harborline Foods',
    email: 'maya@harborlinefoods.com',
    phone: '+13125550188',
    jobTitle: 'Supply Chain Manager',
    source: 'Web',
    territory: 'Midwest',
    status: 'Nurture',
    budgetAvailability: 'Budget identified but unapproved',
    readinessToSpend: 'Interest expressed, no urgency',
    buyingTimeline: 'No defined timeline',
    problemSeverity: 'Recognized operational problem',
    economicBuyer: 'Buyer identified, not engaged',
    icpFit: 'Strong ICP fit',
    nurtureFollowUpAtUtc: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    key: 'C',
    firstName: 'Omar',
    lastName: 'Reed',
    companyName: 'QuickServe Retail',
    email: 'omar@quickserveretail.com',
    phone: '+16465550197',
    jobTitle: 'Store Operations Lead',
    source: 'Cold outbound',
    territory: 'East',
    status: 'Disqualified',
    budgetAvailability: 'No defined budget',
    readinessToSpend: 'Not planning to spend',
    buyingTimeline: 'Unknown / not discussed',
    problemSeverity: 'Mild inconvenience',
    economicBuyer: 'Unknown / not identified',
    icpFit: 'Clearly out of ICP',
    disqualifiedReason: 'No budget / not ICP',
    qualifiedNotes: 'Single location; not enterprise fit.'
  },
  {
    key: 'D',
    firstName: 'Priya',
    lastName: 'Nair',
    companyName: 'Meridian Freight',
    email: 'priya@meridianfreight.com',
    phone: '+12025550119',
    jobTitle: 'VP Operations',
    source: 'Partner',
    territory: 'East',
    status: 'Lost',
    budgetAvailability: 'Budget allocated and approved',
    readinessToSpend: 'Ready to proceed pending final step',
    buyingTimeline: 'Target date verbally confirmed',
    problemSeverity: 'High business impact',
    economicBuyer: 'Buyer engaged in discussion',
    icpFit: 'Strong ICP fit',
    lossReason: 'Selected competitor',
    lossCompetitor: 'Competitor X',
    lossNotes: 'Chose incumbent due to shorter procurement timeline'
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
    throw new Error('Unable to authenticate against API.');
  }
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
  await page.goto('/app/leads');
  return payload.accessToken as string;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': 'default',
    'Content-Type': 'application/json'
  };
}

function extractGuid(text: string): string | null {
  return text.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)?.[0] ?? null;
}

async function createOrReuseLead(request, token: string, scenario: Scenario): Promise<string> {
  const create = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: authHeaders(token),
    data: {
      firstName: scenario.firstName,
      lastName: scenario.lastName,
      email: scenario.email,
      phone: scenario.phone,
      companyName: scenario.companyName,
      jobTitle: scenario.jobTitle,
      status: 'New',
      ownerId: null,
      assignmentStrategy: 'Manual',
      source: scenario.source,
      territory: scenario.territory,
      autoScore: true,
      score: 0
    }
  });

  if (create.ok()) {
    const lead = await create.json();
    return lead.id as string;
  }

  const body = await create.text();
  if (create.status() === 400 && body.toLowerCase().includes('duplicate lead detected')) {
    const existingId = extractGuid(body);
    if (existingId) return existingId;
  }
  throw new Error(`Scenario ${scenario.key} create failed: ${create.status()} ${body}`);
}

async function getLead(request, token: string, leadId: string) {
  const response = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  if (!response.ok()) {
    throw new Error(`Load lead failed ${leadId}: ${response.status()} ${await response.text()}`);
  }
  return response.json();
}

async function createDiscoveryMeeting(request, token: string, leadId: string) {
  const nowIso = new Date().toISOString();
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: authHeaders(token),
    data: {
      subject: 'Discovery meeting',
      description: 'Scenario seed discovery call.',
      outcome: 'Connected',
      type: 'Meeting',
      priority: 'High',
      dueDateUtc: nowIso,
      completedDateUtc: nowIso,
      nextStepSubject: 'Scenario follow-up',
      nextStepDueDateUtc: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: null
    }
  });
  if (!response.ok()) {
    throw new Error(`Discovery activity failed for ${leadId}: ${response.status()} ${await response.text()}`);
  }
}

async function applyScenario(request, token: string, scenario: Scenario, leadId: string) {
  const lead = await getLead(request, token, leadId);
  const [firstName, ...rest] = (lead.name as string).split(' ');

  const update = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: authHeaders(token),
    data: {
      firstName: firstName || scenario.firstName,
      lastName: rest.join(' ') || scenario.lastName,
      email: scenario.email,
      phone: scenario.phone,
      companyName: scenario.companyName,
      jobTitle: scenario.jobTitle,
      status: scenario.status,
      ownerId: lead.ownerId ?? null,
      assignmentStrategy: lead.ownerId ? 'Manual' : null,
      source: scenario.source,
      territory: scenario.territory,
      autoScore: true,
      score: lead.score ?? 0,
      accountId: lead.accountId ?? null,
      contactId: lead.contactId ?? null,
      disqualifiedReason: scenario.disqualifiedReason ?? null,
      lossReason: scenario.lossReason ?? null,
      lossCompetitor: scenario.lossCompetitor ?? null,
      lossNotes: scenario.lossNotes ?? null,
      nurtureFollowUpAtUtc: scenario.nurtureFollowUpAtUtc ?? null,
      qualifiedNotes: scenario.qualifiedNotes ?? null,
      budgetAvailability: scenario.budgetAvailability,
      budgetEvidence: lead.budgetEvidence ?? null,
      readinessToSpend: scenario.readinessToSpend,
      readinessEvidence: lead.readinessEvidence ?? null,
      buyingTimeline: scenario.buyingTimeline,
      timelineEvidence: lead.timelineEvidence ?? null,
      problemSeverity: scenario.problemSeverity,
      problemEvidence: lead.problemEvidence ?? null,
      economicBuyer: scenario.economicBuyer,
      economicBuyerEvidence: lead.economicBuyerEvidence ?? null,
      icpFit: scenario.icpFit,
      icpFitEvidence: lead.icpFitEvidence ?? null
    }
  });

  if (!update.ok()) {
    throw new Error(`Scenario ${scenario.key} update failed: ${update.status()} ${await update.text()}`);
  }
}

test('seed local lead scenarios A to D', async ({ page, request }) => {
  test.setTimeout(120_000);
  const token = await login(page, request);

  for (const scenario of scenarios) {
    const leadId = await createOrReuseLead(request, token, scenario);
    if (scenario.status === 'Qualified') {
      await createDiscoveryMeeting(request, token, leadId);
    }
    await applyScenario(request, token, scenario, leadId);

    const updated = await getLead(request, token, leadId);
    expect(updated.status).toBe(scenario.status);
    console.log(`[Scenario ${scenario.key}] ${scenario.firstName} ${scenario.lastName} -> ${updated.status} (id=${leadId})`);
  }
});
