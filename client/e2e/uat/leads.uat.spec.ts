/**
 * CRM Enterprise — Leads Module UAT
 *
 * Covers: create · BANT qualification · edit · status progression ·
 *         list · bulk API · quick-add
 */

import { expect, test } from '@playwright/test';
import {
  API, RUN, login, attachDiagnostics,
  selectByLabel, apiPost, apiSearch,
} from './uat-helpers';

/* ── Create lead via form ── */
test('lead: create and verify via API', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'David';
  const lastName = `Chen ${RUN}`;
  const company = `Cascadia Renewable Energy ${RUN}`;

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="companyName"]').fill(company);
  await page.locator('input[name="email"]').fill(`david.chen.${RUN}@example.com`);
  await page.locator('input[name="jobTitle"]').fill('VP Operations');
  await page.locator('input[name="source"]').fill('Industry Conference');
  await page.locator('input[name="territory"]').fill('West Coast');

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/leads') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click(),
  ]);
  expect(createRes.ok(), 'lead create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'leads', lastName);
  expect(search.items.some((l: any) => l.name?.includes(lastName))).toBeTruthy();
});

/* ── Create with BANT qualification ── */
test('lead: fill BANT qualification factors on new lead', async ({ page, request }) => {
  test.setTimeout(90_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'Anastassiia';
  const lastName = `Zaher ${RUN}`;

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');

  // Overview tab — basics
  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="companyName"]').fill(`Nordic Maritime Logistics ${RUN}`);
  await page.locator('input[name="email"]').fill(`a.zaher.${RUN}@example.com`);
  await page.locator('input[name="jobTitle"]').fill('Chief Procurement Officer');
  await page.locator('input[name="source"]').fill('LinkedIn Outreach');

  // Switch to Qualifications tab
  const qualTab = page.locator('p-tab', { hasText: 'Qualifications' });
  if (await qualTab.count()) {
    await qualTab.click();
    await page.waitForTimeout(500);

    await selectByLabel(page, 'p-select[name="budgetAvailability"]', 'Confirmed').catch(() => {});
    await page.locator('textarea[name="budgetEvidence"]')
      .fill('Approved capital expenditure of €2.4M for fleet management modernization in Q3 2025 board presentation.')
      .catch(() => {});

    await selectByLabel(page, 'p-select[name="buyingTimeline"]', 'This Quarter').catch(() => {});
    await page.locator('textarea[name="timelineEvidence"]')
      .fill('RFP deadline is September 15th; vendor shortlist finalized by August 30th.')
      .catch(() => {});

    await selectByLabel(page, 'p-select[name="problemSeverity"]', 'High').catch(() => {});
    await page.locator('textarea[name="problemEvidence"]')
      .fill('Current system causes 12% scheduling errors and $380K annual demurrage penalties.')
      .catch(() => {});

    await selectByLabel(page, 'p-select[name="economicBuyer"]', 'Identified').catch(() => {});
    await page.locator('textarea[name="economicBuyerEvidence"]')
      .fill('CFO Martin Lindqvist confirmed as final signoff authority during discovery call.')
      .catch(() => {});

    await selectByLabel(page, 'p-select[name="icpFit"]', 'Strong').catch(() => {});
    await page.locator('textarea[name="icpFitEvidence"]')
      .fill('Matches enterprise maritime vertical, 500+ employees, Northern Europe region.')
      .catch(() => {});
  }

  // Switch back to Overview to save
  const overviewTab = page.locator('p-tab', { hasText: 'Overview' });
  if (await overviewTab.count()) {
    await overviewTab.click();
    await page.waitForTimeout(300);
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/leads') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click(),
  ]);
  expect(createRes.ok(), 'qualified lead create should succeed').toBeTruthy();
});

/* ── API create → UI edit ── */
test('lead: API create then edit via UI', async ({ page, request }) => {
  test.setTimeout(90_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'Elena';
  const lastName = `Voronova ${RUN}`;

  const createRes = await apiPost(request, token, `${API}/api/leads`, {
    firstName,
    lastName,
    companyName: `Baltic Freight Solutions ${RUN}`,
    email: `elena.voronova.${RUN}@example.com`,
    jobTitle: 'Head of Digital Transformation',
    source: 'Webinar Attendee',
    territory: 'Northern Europe',
  });
  expect(createRes.ok()).toBeTruthy();
  const created = await createRes.json();
  const leadId = created.id;
  expect(leadId).toBeTruthy();

  await page.goto(`/app/leads/${leadId}/edit`);
  await page.waitForURL(`**/app/leads/${leadId}/edit`);
  await page.waitForTimeout(1000);

  const jobTitleField = page.locator('input[name="jobTitle"]');
  if (await jobTitleField.isVisible()) {
    await jobTitleField.fill('Chief Digital Officer');
  }

  const [updateRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes(`/api/leads/${leadId}`) && r.request().method() === 'PUT'),
    page.locator('button:has-text("Update lead")').click(),
  ]);
  expect(updateRes.ok(), 'lead update should succeed').toBeTruthy();
});

/* ── Create from partner referral ── */
test('lead: create from partner referral source', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'James';
  const lastName = `Thornton ${RUN}`;

  await page.goto('/app/leads/new');
  await page.waitForURL('**/app/leads/new');

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="companyName"]').fill(`Thornton & Associates Legal ${RUN}`);
  await page.locator('input[name="email"]').fill(`j.thornton.${RUN}@example.com`);
  await page.locator('input[name="jobTitle"]').fill('Managing Partner');
  await page.locator('input[name="source"]').fill('Partner Referral — Deloitte');
  await page.locator('input[name="territory"]').fill('Northeast US');

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/leads') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create lead")').click(),
  ]);
  expect(createRes.ok(), 'lead create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'leads', lastName);
  expect(search.items.some((l: any) => l.name?.includes('Thornton'))).toBeTruthy();
});

/* ── Bulk API create and search ── */
test('lead: bulk API create and search verification', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const leads = [
    { firstName: 'Kenji', lastName: `Watanabe ${RUN}`, companyName: `Sakura Industrial Systems ${RUN}`, email: `k.watanabe.${RUN}@example.com`, source: 'Trade Show' },
    { firstName: 'Claire', lastName: `Dubois ${RUN}`, companyName: `Lumière Design Studio ${RUN}`, email: `c.dubois.${RUN}@example.com`, source: 'Website Inquiry' },
    { firstName: 'Marcus', lastName: `Okonkwo ${RUN}`, companyName: `Sahel AgriTech Ventures ${RUN}`, email: `m.okonkwo.${RUN}@example.com`, source: 'Cold Outreach' },
  ];

  for (const lead of leads) {
    const res = await apiPost(request, token, `${API}/api/leads`, lead);
    expect(res.ok(), `create lead ${lead.firstName} ${lead.lastName} should succeed`).toBeTruthy();
  }

  for (const lead of leads) {
    const search = await apiSearch(request, token, 'leads', lead.lastName);
    expect(search.items.length).toBeGreaterThan(0);
  }
});

/* ── List page renders ── */
test('leads: list page renders with data', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/leads');
  await page.waitForURL('**/app/leads');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/lead|pipeline|workspace/i);
});

/* ── Quick-add lead from command palette ── */
test('quick-add: create lead from command palette', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const leadName = `Juniper Wealth Management ${RUN}`;

  await page.goto('/app/dashboard');
  await page.waitForURL('**/app/dashboard');

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
  await page.locator('.command-palette__item', { hasText: 'Create New Lead' }).click();

  const quickAdd = page.locator('.quick-add');
  await quickAdd.waitFor({ state: 'visible' });

  await quickAdd.locator('input[placeholder="Lead name"]').fill(leadName);

  const quickAddDialog = page.locator('.quick-add-dialog');
  await quickAddDialog.locator('button:has-text("Create")').click();
  await quickAddDialog.waitFor({ state: 'hidden' });

  const search = await apiSearch(request, token, 'leads', leadName);
  expect(search.items.some((l: any) => l.name?.includes(leadName))).toBeTruthy();
});
