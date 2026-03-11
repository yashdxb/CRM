import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://localhost:5014';
const UI_BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const SALES_REP_EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const SALES_REP_PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const SALES_REP_ID = 'f0e4e045-d8cb-44ce-a16b-47931c7788ac';

type LeadRecord = {
  id: string;
  name: string;
  status: string;
  score: number | null;
  conversationScore: number | null;
  conversationScoreLabel: string | null;
  conversationScoreReasons: string[];
  conversationSignalAvailable: boolean | null;
  disqualifiedReason: string | null;
  lossReason: string | null;
  nurtureFollowUpAtUtc: string | null;
  isConverted: boolean;
  convertedOpportunityId: string | null;
  conversionReadiness: {
    score: number;
    label: string;
    summary: string;
    qualificationSignalScore: number | null;
    conversationSignalScore: number | null;
    conversationSignalAvailable: boolean;
    managerReviewRecommended: boolean;
    primaryGap: string | null;
    reasons: string[];
  } | null;
};

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': 'default'
    },
    data: { email: SALES_REP_EMAIL, password: SALES_REP_PASSWORD }
  });
  const payload = await response.json();
  expect(payload?.accessToken, 'Leo Martin login should succeed').toBeTruthy();

  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);

  await page.goto(`${UI_BASE_URL}/app/dashboard`);
  await expect(page).toHaveURL(/\/app\/dashboard/);
  return payload.accessToken as string;
}

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Tenant-Key': 'default'
  };
}

function uniqueEmail(local: string, domain: string) {
  return `${local}.${Date.now()}@${domain}`;
}

async function createLead(request, token: string, input: Record<string, unknown>) {
  const response = await request.post(`${API_BASE_URL}/api/leads`, {
    headers: authHeaders(token),
    data: input
  });
  expect(response.ok(), `lead create should succeed for ${JSON.stringify(input)}`).toBeTruthy();
  return (await response.json()) as { id: string };
}

async function deleteLead(request, token: string, leadId: string) {
  const response = await request.delete(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect([204, 404]).toContain(response.status());
}

async function cleanupLeadByName(request, token: string, name: string) {
  const response = await request.get(`${API_BASE_URL}/api/leads?search=${encodeURIComponent(name)}&page=1&pageSize=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `lead search should succeed for cleanup ${name}`).toBeTruthy();
  const payload = await response.json();
  const matches = (payload?.items ?? []).filter(
    (item: { id: string; name?: string }) => (item.name ?? '').trim().toLowerCase() === name.toLowerCase()
  );
  for (const match of matches) {
    await deleteLead(request, token, match.id);
  }
}

async function updateLead(request, token: string, leadId: string, input: Record<string, unknown>) {
  const response = await request.put(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: authHeaders(token),
    data: input
  });
  expect(response.status(), `lead update should succeed for ${leadId}`).toBe(204);
}

async function addCadenceTouch(request, token: string, leadId: string, channel: string, outcome: string, dueAt: string) {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/cadence-touch`, {
    headers: authHeaders(token),
    data: {
      channel,
      outcome,
      nextStepDueAtUtc: dueAt
    }
  });
  expect(response.ok(), `cadence touch should succeed for ${leadId}`).toBeTruthy();
}

async function createActivity(
  request,
  token: string,
  leadId: string,
  activity: {
    subject: string;
    description: string;
    outcome: string;
    type: string;
    dueDateUtc: string;
    completedDateUtc: string;
    nextStepSubject: string;
    nextStepDueDateUtc: string;
  }
) {
  const response = await request.post(`${API_BASE_URL}/api/activities`, {
    headers: authHeaders(token),
    data: {
      ...activity,
      priority: 'High',
      relatedEntityType: 'Lead',
      relatedEntityId: leadId,
      ownerId: SALES_REP_ID
    }
  });
  expect(response.status(), `activity create should succeed for ${leadId}`).toBe(201);
}

async function convertLead(request, token: string, leadId: string, input: Record<string, unknown>) {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/convert`, {
    headers: authHeaders(token),
    data: input
  });
  expect(response.ok(), `lead convert should succeed for ${leadId}`).toBeTruthy();
  return await response.json();
}

async function recycleLead(request, token: string, leadId: string) {
  const response = await request.post(`${API_BASE_URL}/api/leads/${leadId}/recycle-to-nurture`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `recycle to nurture should succeed for ${leadId}`).toBeTruthy();
}

async function getLead(request, token: string, leadId: string): Promise<LeadRecord> {
  const response = await request.get(`${API_BASE_URL}/api/leads/${leadId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'X-Tenant-Key': 'default'
    }
  });
  expect(response.ok(), `lead fetch should succeed for ${leadId}`).toBeTruthy();
  return (await response.json()) as LeadRecord;
}

test('Leo Martin lead UAT covers realistic signal, trigger, and outcome scenarios', async ({ page, request }) => {
  const token = await login(page, request);
  const disqualificationReason = 'No budget / funding';

  const now = Date.now();
  const inDays = (days: number, hour = 15) =>
    new Date(now + days * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000).toISOString();
  const daysAgo = (days: number, hour = 14) =>
    new Date(now - days * 24 * 60 * 60 * 1000 + hour * 60 * 60 * 1000).toISOString();

  await cleanupLeadByName(request, token, 'Nora Patel');
  await cleanupLeadByName(request, token, 'Marcus Chen');
  await cleanupLeadByName(request, token, 'Alina Dobrev');
  await cleanupLeadByName(request, token, 'Priya Khanna');
  await cleanupLeadByName(request, token, 'Omar El-Sayed');
  await cleanupLeadByName(request, token, 'Sofia Marin');
  await cleanupLeadByName(request, token, 'Ethan Ross');
  await cleanupLeadByName(request, token, 'Daniela Rios');
  await cleanupLeadByName(request, token, 'Victor Petrescu');
  await cleanupLeadByName(request, token, 'Samira Haddad');

  // LEO-01 Strong engagement -> qualified -> converted
  const noraEmail = uniqueEmail('nora.patel', 'northshorecapital.ca');
  const nora = await createLead(request, token, {
    firstName: 'Nora',
    lastName: 'Patel',
    companyName: 'North Shore Capital',
    email: noraEmail,
    jobTitle: 'Operations Director',
    source: 'Website',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    token,
    nora.id,
    'Email',
    'Sent a commercial follow-up summarizing the current evaluation path and requested a planning call with finance.',
    inDays(2)
  );
  await addCadenceTouch(
    request,
    token,
    nora.id,
    'Call',
    'Completed a discovery call where Nora confirmed an approved budget range and identified Daniel Shah as the finance stakeholder.',
    inDays(3)
  );
  await createActivity(request, token, nora.id, {
    subject: 'Discovery meeting with Nora Patel and Daniel Shah',
    description:
      'Met with Nora Patel and Daniel Shah, Finance Director at North Shore Capital, to review operational reporting pain points, budget range, and the six-week buying timeline.',
    outcome: 'Qualified economic buyer context confirmed and commercial next step requested.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Prepare commercial response for North Shore Capital',
    nextStepDueDateUtc: inDays(3)
  });
  await updateLead(request, token, nora.id, {
    firstName: 'Nora',
    lastName: 'Patel',
    email: noraEmail,
    companyName: 'North Shore Capital',
    jobTitle: 'Operations Director',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Website',
    qualifiedNotes:
      'Nora Patel and Daniel Shah confirmed an active six-week evaluation for reporting automation, approved a working budget range, and requested a commercial follow-up after the discovery meeting.',
    budgetAvailability: 'Indicative range mentioned',
    budgetEvidence: 'Email confirmation',
    readinessToSpend: 'Actively evaluating solutions',
    readinessEvidence: 'Discovery call notes',
    buyingTimeline: 'Rough timeline mentioned',
    timelineEvidence: 'Discovery meeting notes',
    problemSeverity: 'Recognized operational problem',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer identified, not engaged',
    economicBuyerEvidence: 'Org chart reference',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account research',
    buyerType: 'Investor',
    motivationUrgency: 'Within 30 days',
    financingReadiness: 'Budget allocated',
    preApprovalStatus: 'Confirmed',
    preferredArea: 'Greater Toronto Area',
    preferredPropertyType: 'Mixed-use commercial',
    budgetBand: '$100K-$250K'
  });
  let noraLead = await getLead(request, token, nora.id);
  expect(noraLead.status).toBe('Qualified');
  expect(noraLead.conversationScore ?? 0).toBeGreaterThanOrEqual(75);
  expect(noraLead.conversationScoreLabel).toBe('High');
  expect(noraLead.conversionReadiness?.label).toMatch(/Monitor|Coach|Ready/i);
  const noraConversion = await convertLead(request, token, nora.id, {
    createAccount: true,
    accountName: 'North Shore Capital',
    createContact: true,
    createOpportunity: true,
    opportunityName: 'North Shore Capital Reporting Automation',
    amount: 184000,
    expectedCloseDate: '2026-04-24T00:00:00Z',
    dealType: 'Net-New',
    segment: 'Mid-Market',
    stage: 'Qualification',
    isCompetitive: true,
    hasExecutiveChampion: false,
    isStrategic: true,
    velocity: 'Fast',
    managerApproved: false,
    overrideReason:
      'Discovery meeting confirmed an active six-week buying cycle, approved budget range, and finance stakeholder alignment even though some evidence still needs stronger validation.'
  });
  noraLead = await getLead(request, token, nora.id);
  expect(noraLead.status).toBe('Converted');
  expect(noraLead.isConverted).toBeTruthy();
  expect(noraLead.convertedOpportunityId).toBe(noraConversion.opportunityId);

  // LEO-02 Strong conversation, weak qualification
  const marcusEmail = uniqueEmail('marcus.chen', 'parklineestates.ca');
  const marcus = await createLead(request, token, {
    firstName: 'Marcus',
    lastName: 'Chen',
    companyName: 'Parkline Estates',
    email: marcusEmail,
    jobTitle: 'Director of Leasing Operations',
    source: 'Referral',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    token,
    marcus.id,
    'Email',
    'Sent the requested overview of operating-reporting options and proposed a planning session for early next week.',
    inDays(2)
  );
  await createActivity(request, token, marcus.id, {
    subject: 'Discovery call with Marcus Chen',
    description:
      'Marcus Chen outlined reporting friction across leasing operations and asked for examples of implementation timelines.',
    outcome: 'Confirmed active interest but no budget or buyer commitment yet.',
    type: 'Call',
    dueDateUtc: daysAgo(2),
    completedDateUtc: daysAgo(2),
    nextStepSubject: 'Send planning options to Marcus Chen',
    nextStepDueDateUtc: inDays(4)
  });
  await createActivity(request, token, marcus.id, {
    subject: 'Planning meeting with Marcus Chen',
    description:
      'Reviewed current spreadsheet-driven workflow and current stakeholder involvement in the evaluation.',
    outcome: 'Conversation momentum is strong, but commercial proof points remain incomplete.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Request budget and buying-process details',
    nextStepDueDateUtc: inDays(3)
  });
  const marcusLead = await getLead(request, token, marcus.id);
  expect(marcusLead.conversationScore ?? 0).toBeGreaterThanOrEqual(45);
  expect(marcusLead.conversationSignalAvailable).toBeTruthy();
  expect(marcusLead.conversionReadiness?.managerReviewRecommended).toBeTruthy();
  expect(marcusLead.conversionReadiness?.primaryGap).toBeTruthy();

  // LEO-03 Qualified but stale engagement
  const alinaEmail = uniqueEmail('alina.dobrev', 'meridianurban.ca');
  const alina = await createLead(request, token, {
    firstName: 'Alina',
    lastName: 'Dobrev',
    companyName: 'Meridian Urban Partners',
    email: alinaEmail,
    jobTitle: 'Investment Operations Manager',
    source: 'Industry Event',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await createActivity(request, token, alina.id, {
    subject: 'Early discovery meeting with Alina Dobrev',
    description:
      'Reviewed manual reporting pain and current evaluation goals for Meridian Urban Partners.',
    outcome: 'Initial fit confirmed, but follow-up momentum did not continue.',
    type: 'Meeting',
    dueDateUtc: daysAgo(28),
    completedDateUtc: daysAgo(28),
    nextStepSubject: 'Reconnect with Alina on commercial timing',
    nextStepDueDateUtc: daysAgo(21)
  });
  await updateLead(request, token, alina.id, {
    firstName: 'Alina',
    lastName: 'Dobrev',
    email: alinaEmail,
    companyName: 'Meridian Urban Partners',
    jobTitle: 'Investment Operations Manager',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Industry Event',
    qualifiedNotes:
      'Alina outlined a valid operational reporting problem and initial evaluation need, but recent buying momentum has cooled.',
    budgetAvailability: 'Indicative range mentioned',
    budgetEvidence: 'Meeting notes',
    readinessToSpend: 'Actively evaluating solutions',
    readinessEvidence: 'Meeting notes',
    buyingTimeline: 'Rough timeline mentioned',
    timelineEvidence: 'Meeting notes',
    problemSeverity: 'Recognized operational problem',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer identified, not engaged',
    economicBuyerEvidence: 'Org chart reference',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account research'
  });
  const alinaLead = await getLead(request, token, alina.id);
  expect(alinaLead.status).toBe('Qualified');
  expect(alinaLead.conversationScoreLabel).toMatch(/Low|Medium/i);
  expect(alinaLead.conversionReadiness?.managerReviewRecommended).toBeTruthy();
  expect(alinaLead.conversionReadiness?.label).toMatch(/Coach|At Risk|Monitor/i);

  // LEO-04 Disqualified with explicit configured reason
  const priyaEmail = uniqueEmail('priya.khanna', 'cedargroveadvisors.ca');
  const priya = await createLead(request, token, {
    firstName: 'Priya',
    lastName: 'Khanna',
    companyName: 'Cedar Grove Advisors',
    email: priyaEmail,
    jobTitle: 'Office Operations Lead',
    source: 'Inbound Call',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await updateLead(request, token, priya.id, {
    firstName: 'Priya',
    lastName: 'Khanna',
    companyName: 'Cedar Grove Advisors',
    email: priyaEmail,
    jobTitle: 'Office Operations Lead',
    status: 'Disqualified',
    ownerId: SALES_REP_ID,
    source: 'Inbound Call',
    disqualifiedReason: disqualificationReason
  });
  const priyaLead = await getLead(request, token, priya.id);
  expect(priyaLead.status).toBe('Disqualified');
  expect(priyaLead.disqualifiedReason).toBe(disqualificationReason);

  // LEO-05 Recycle to nurture
  const omarEmail = uniqueEmail('omar.elsayed', 'brookfieldtenant.ca');
  const omar = await createLead(request, token, {
    firstName: 'Omar',
    lastName: 'El-Sayed',
    companyName: 'Brookfield Tenant Advisory',
    email: omarEmail,
    jobTitle: 'Tenant Strategy Consultant',
    source: 'Partner Referral',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await updateLead(request, token, omar.id, {
    firstName: 'Omar',
    lastName: 'El-Sayed',
    companyName: 'Brookfield Tenant Advisory',
    email: omarEmail,
    jobTitle: 'Tenant Strategy Consultant',
    status: 'Disqualified',
    ownerId: SALES_REP_ID,
    source: 'Partner Referral',
    disqualifiedReason: disqualificationReason
  });
  await recycleLead(request, token, omar.id);
  const omarLead = await getLead(request, token, omar.id);
  expect(omarLead.status).toBe('Nurture');
  expect(omarLead.nurtureFollowUpAtUtc).toBeTruthy();

  // LEO-06 Fully validated buyer-ready lead
  const sofiaEmail = uniqueEmail('sofia.marin', 'sterlingharbourrealty.ca');
  const sofia = await createLead(request, token, {
    firstName: 'Sofia',
    lastName: 'Marin',
    companyName: 'Sterling Harbour Realty',
    email: sofiaEmail,
    jobTitle: 'Director of Brokerage Operations',
    source: 'Executive Referral',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    token,
    sofia.id,
    'Email',
    'Shared implementation timeline and answered buyer-side commercial questions after the executive referral introduction.',
    inDays(1)
  );
  await createActivity(request, token, sofia.id, {
    subject: 'Qualification call with Sofia Marin',
    description:
      'Reviewed brokerage workflow bottlenecks, approved budget, and final decision steps with Sofia Marin and the internal sponsor group.',
    outcome: 'Decision date, budget, and engaged buyer were all confirmed with high confidence.',
    type: 'Call',
    dueDateUtc: daysAgo(2),
    completedDateUtc: daysAgo(2),
    nextStepSubject: 'Finalize executive proposal for Sterling Harbour Realty',
    nextStepDueDateUtc: inDays(2)
  });
  await createActivity(request, token, sofia.id, {
    subject: 'Buyer validation meeting with Sterling Harbour Realty',
    description:
      'Met with Sofia Marin and the budget owner to confirm a critical operational reporting project, approved funding, and the final internal sign-off sequence.',
    outcome: 'Qualified buyer actively engaged and requesting final approval package.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Send final approval package to Sterling Harbour Realty',
    nextStepDueDateUtc: inDays(1)
  });
  await updateLead(request, token, sofia.id, {
    firstName: 'Sofia',
    lastName: 'Marin',
    email: sofiaEmail,
    companyName: 'Sterling Harbour Realty',
    jobTitle: 'Director of Brokerage Operations',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Executive Referral',
    qualifiedNotes:
      'Sofia Marin confirmed approved funding, a committed internal timeline, and direct buyer participation in the final approval process.',
    budgetAvailability: 'Budget allocated and approved',
    budgetEvidence: 'Written confirmation',
    readinessToSpend: 'Ready to proceed pending final step',
    readinessEvidence: 'Meeting notes',
    buyingTimeline: 'Decision date confirmed internally',
    timelineEvidence: 'Written confirmation',
    problemSeverity: 'Critical business impact',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer engaged in discussion',
    economicBuyerEvidence: 'Written confirmation',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account research'
  });
  const sofiaLead = await getLead(request, token, sofia.id);
  expect(sofiaLead.conversationScore ?? 0).toBeGreaterThanOrEqual(70);
  expect(sofiaLead.conversionReadiness?.label).toBe('Ready');
  expect(sofiaLead.conversionReadiness?.managerReviewRecommended).toBeFalsy();

  // LEO-07 Minimal-signal / insufficient-evidence lead
  const ethanEmail = uniqueEmail('ethan.ross', 'harboreightholdings.ca');
  const ethan = await createLead(request, token, {
    firstName: 'Ethan',
    lastName: 'Ross',
    companyName: 'Harbor Eight Holdings',
    email: ethanEmail,
    jobTitle: 'Analyst',
    source: 'Web Form',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  const ethanLead = await getLead(request, token, ethan.id);
  expect(ethanLead.conversationSignalAvailable).toBeTruthy();
  expect(ethanLead.conversationScore ?? 0).toBeLessThanOrEqual(45);
  expect(ethanLead.conversationScoreLabel).toMatch(/Low|Medium/i);
  expect(ethanLead.conversionReadiness?.label).toBe('At Risk');
  expect(ethanLead.conversionReadiness?.reasons.join(' ')).toMatch(/outbound|weakest conversion signal|Very few touches/i);

  // LEO-08 Buyer engaged but budget blocked
  const danielaEmail = uniqueEmail('daniela.rios', 'crestlaneproperty.ca');
  const daniela = await createLead(request, token, {
    firstName: 'Daniela',
    lastName: 'Rios',
    companyName: 'Crestlane Property Group',
    email: danielaEmail,
    jobTitle: 'Regional Operations Lead',
    source: 'Partner Introduction',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    token,
    daniela.id,
    'Email',
    'Sent the requested rollout outline after the partner introduction and aligned on a budget-holder review session.',
    inDays(2)
  );
  await createActivity(request, token, daniela.id, {
    subject: 'Working session with Daniela Rios',
    description:
      'Reviewed portfolio reporting requirements and confirmed strong operational pain with an engaged buyer, but the capital budget remains frozen.',
    outcome: 'Buyer engagement is strong, but budget remains the main blocker.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Request budget reopening timeline from Crestlane',
    nextStepDueDateUtc: inDays(4)
  });
  await updateLead(request, token, daniela.id, {
    firstName: 'Daniela',
    lastName: 'Rios',
    email: danielaEmail,
    companyName: 'Crestlane Property Group',
    jobTitle: 'Regional Operations Lead',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Partner Introduction',
    qualifiedNotes:
      'Daniela and the budget owner are engaged, but the project is blocked by a frozen budget despite a real operational need and timeline.',
    budgetAvailability: 'Budget explicitly unavailable',
    budgetEvidence: 'Meeting notes',
    readinessToSpend: 'Actively evaluating solutions',
    readinessEvidence: 'Meeting notes',
    buyingTimeline: 'Target date verbally confirmed',
    timelineEvidence: 'Meeting notes',
    problemSeverity: 'High business impact',
    problemEvidence: 'Meeting notes',
    economicBuyer: 'Buyer engaged in discussion',
    economicBuyerEvidence: 'Meeting notes',
    icpFit: 'Strong ICP fit',
    icpFitEvidence: 'Account research'
  });
  const danielaLead = await getLead(request, token, daniela.id);
  expect(danielaLead.conversationScore ?? 0).toBeGreaterThanOrEqual(50);
  expect(danielaLead.conversionReadiness?.label).toMatch(/Monitor|Coach/);
  expect(danielaLead.conversionReadiness?.primaryGap).toBe('Budget availability');
  expect(danielaLead.conversionReadiness?.reasons.join(' ')).toMatch(/Budget availability remains the weakest conversion signal/i);

  // LEO-09 Active engagement but weak ICP fit
  const victorEmail = uniqueEmail('victor.petrescu', 'westlinetenant.ca');
  const victor = await createLead(request, token, {
    firstName: 'Victor',
    lastName: 'Petrescu',
    companyName: 'Westline Tenant Partners',
    email: victorEmail,
    jobTitle: 'Portfolio Analyst',
    source: 'Outbound Prospecting',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await addCadenceTouch(
    request,
    token,
    victor.id,
    'Email',
    'Shared a tailored overview after an outbound introduction and scheduled a fit-check conversation.',
    inDays(2)
  );
  await createActivity(request, token, victor.id, {
    subject: 'Fit-check call with Victor Petrescu',
    description:
      'Victor outlined interest in the product, but the operating model and company profile remain outside the strongest ICP range.',
    outcome: 'Conversation is active, though strategic fit is weak.',
    type: 'Call',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Decide whether to continue or disqualify Westline Tenant Partners',
    nextStepDueDateUtc: inDays(3)
  });
  await createActivity(request, token, victor.id, {
    subject: 'Discovery meeting with Victor Petrescu',
    description:
      'Met with Victor Petrescu to review process fit, expected use case, and whether Westline Tenant Partners is a practical ICP match.',
    outcome: 'Discovery completed, but the strategic fit remains weak despite active engagement.',
    type: 'Meeting',
    dueDateUtc: daysAgo(1),
    completedDateUtc: daysAgo(1),
    nextStepSubject: 'Review whether Westline should advance beyond qualification',
    nextStepDueDateUtc: inDays(3)
  });
  await updateLead(request, token, victor.id, {
    firstName: 'Victor',
    lastName: 'Petrescu',
    email: victorEmail,
    companyName: 'Westline Tenant Partners',
    jobTitle: 'Portfolio Analyst',
    status: 'Qualified',
    ownerId: SALES_REP_ID,
    source: 'Outbound Prospecting',
    qualifiedNotes:
      'Victor is responsive and interested, but the account profile remains a weak fit for the ideal customer profile.',
    budgetAvailability: 'Indicative range mentioned',
    budgetEvidence: 'Customer call',
    readinessToSpend: 'Interest expressed, no urgency',
    readinessEvidence: 'Customer call',
    buyingTimeline: 'Rough timeline mentioned',
    timelineEvidence: 'Customer call',
    problemSeverity: 'Recognized operational problem',
    problemEvidence: 'Customer call',
    economicBuyer: 'Influencer identified',
    economicBuyerEvidence: 'Customer call',
    icpFit: 'Clearly out of ICP',
    icpFitEvidence: 'Account research'
  });
  const victorLead = await getLead(request, token, victor.id);
  expect(victorLead.conversationSignalAvailable).toBeTruthy();
  expect(victorLead.conversionReadiness?.label).toMatch(/Coach|At Risk/);
  expect(victorLead.conversionReadiness?.reasons.join(' ')).toMatch(/ICP fit|Weak ICP fit/i);

  // LEO-10 Lost with explicit loss reason
  const samiraEmail = uniqueEmail('samira.haddad', 'elmridgeadvisory.ca');
  const samira = await createLead(request, token, {
    firstName: 'Samira',
    lastName: 'Haddad',
    companyName: 'Elm Ridge Advisory',
    email: samiraEmail,
    jobTitle: 'Transactions Coordinator',
    source: 'Industry Event',
    status: 'New',
    ownerId: SALES_REP_ID
  });
  await updateLead(request, token, samira.id, {
    firstName: 'Samira',
    lastName: 'Haddad',
    companyName: 'Elm Ridge Advisory',
    email: samiraEmail,
    jobTitle: 'Transactions Coordinator',
    status: 'Lost',
    ownerId: SALES_REP_ID,
    source: 'Industry Event',
    lossReason: 'Lost to competitor',
    lossCompetitor: 'Vertex Property Cloud',
    lossNotes: 'Elm Ridge selected Vertex Property Cloud after procurement prioritized their existing finance integration.'
  });
  const samiraLead = await getLead(request, token, samira.id);
  expect(samiraLead.status).toBe('Lost');
  expect(samiraLead.lossReason).toBe('Lost to competitor');

  // UI validation for Leo's working set
  await page.goto(`${UI_BASE_URL}/app/leads`);
  await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();
  await page.getByPlaceholder(/Search leads/i).fill('Nora Patel');
  await expect(page.getByText('Nora Patel').first()).toBeVisible();
  await expect(page.getByText(/Converted/i).first()).toBeVisible();

  await page.getByPlaceholder(/Search leads/i).fill('Marcus Chen');
  await expect(page.getByText('Marcus Chen').first()).toBeVisible();

  await page.getByPlaceholder(/Search leads/i).fill('Sofia Marin');
  await expect(page.getByText('Sofia Marin').first()).toBeVisible();
  await expect(page.getByText(/Ready/i).first()).toBeVisible();

  await page.goto(`${UI_BASE_URL}/app/leads/${marcus.id}/edit`);
  const qualificationTab = page.getByRole('tab', { name: /Qualifications/i }).first();
  await qualificationTab.click();
  const qualificationPanel = page.locator('p-tabpanel[value="qualification"]:not([hidden])');
  await expect(qualificationPanel.getByText('Conversation Score').first()).toBeVisible();
  await expect(qualificationPanel.getByText('Conversion readiness').first()).toBeVisible();
  await expect(qualificationPanel.getByText(/Manager review recommended/i).first()).toBeVisible();

  await page.goto(`${UI_BASE_URL}/app/leads/${sofia.id}/edit`);
  await page.getByRole('tab', { name: /Qualifications/i }).first().click();
  const sofiaQualificationPanel = page.locator('p-tabpanel[value="qualification"]:not([hidden])');
  await expect(sofiaQualificationPanel.getByText(/Ready/i).first()).toBeVisible();
  await expect(sofiaQualificationPanel.getByText(/Conversation Score/i).first()).toBeVisible();
});
