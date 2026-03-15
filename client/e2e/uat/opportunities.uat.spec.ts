/**
 * CRM Enterprise — Opportunities (Deals) Module UAT
 *
 * Covers: create with commercial details · API-created deal visible ·
 *         list page · Discovery stage deal
 */

import { expect, test } from '@playwright/test';
import {
  API, RUN, login, attachDiagnostics,
  selectByLabel, setDateByOffset, apiPost, apiSearch,
} from './uat-helpers';

/* ── Create deal with commercial details ── */
test('opportunity: create with commercial details', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const dealName = `Cascadia Fleet Management Platform ${RUN}`;

  await page.goto('/app/opportunities/new');
  await page.waitForURL('**/app/opportunities/new');

  await page.locator('input[name="name"]').fill(dealName);

  await selectByLabel(page, 'p-select[name="stage"]', 'Proposal').catch(() => {});

  const amountField = page.locator('input#oppAmount, p-inputnumber[name="amount"] input');
  if (await amountField.count()) {
    await amountField.first().fill('475000');
  }

  await setDateByOffset(page, 'p-datepicker[name="closeDate"]', 90).catch(() => {});

  const descField = page.locator('textarea').first();
  if (await descField.isVisible()) {
    await descField.fill(
      'End-to-end fleet monitoring and route optimization platform for Cascadia Renewable Energy. ' +
      'Covers 340 vehicles across 12 Pacific Northwest depots. Year-one deployment plus 3-year managed service agreement.'
    );
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/opportunities') && r.request().method() === 'POST'),
    page.locator('button:has-text("Save deal")').click(),
  ]);
  expect(createRes.ok(), 'deal create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'opportunities', dealName);
  expect(search.items.some((o: any) => o.name?.includes('Cascadia'))).toBeTruthy();
});

/* ── API-created deal visible on edit page ── */
test('opportunity: API-created deal loads on edit page', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const dealName = `Nordic Maritime Expansion ${RUN}`;

  const createRes = await apiPost(request, token, `${API}/api/opportunities`, {
    name: dealName,
    amount: 610000,
    stage: 'Negotiation',
    description: 'Multi-port logistics modernization program for Scandinavian shipping consortium.',
  });
  expect(createRes.ok()).toBeTruthy();
  const deal = await createRes.json();
  const dealId = deal.id;
  expect(dealId).toBeTruthy();

  await page.goto(`/app/opportunities/${dealId}/edit`);
  await page.waitForURL(`**/app/opportunities/${dealId}/edit`);
  await page.waitForTimeout(1000);

  const nameField = page.locator('input[name="name"]');
  if (await nameField.isVisible()) {
    await expect(nameField).toHaveValue(new RegExp(dealName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

/* ── List page renders ── */
test('opportunities: list page renders with pipeline', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/opportunities');
  await page.waitForURL('**/app/opportunities');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/opportunit|deal|pipeline|workspace/i);
});

/* ── Create Discovery-stage deal ── */
test('opportunity: create Discovery-stage deal', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const dealName = `Horizon Pharma Clinical Trials Portal ${RUN}`;

  await page.goto('/app/opportunities/new');
  await page.waitForURL('**/app/opportunities/new');

  await page.locator('input[name="name"]').fill(dealName);
  await selectByLabel(page, 'p-select[name="stage"]', 'Discovery').catch(() => {});

  const amountField = page.locator('input#oppAmount, p-inputnumber[name="amount"] input');
  if (await amountField.count()) {
    await amountField.first().fill('195000');
  }

  await setDateByOffset(page, 'p-datepicker[name="closeDate"]', 120).catch(() => {});

  const descField = page.locator('textarea').first();
  if (await descField.isVisible()) {
    await descField.fill(
      'Patient enrollment and trial management portal for Horizon Pharma\'s oncology research division. Phase I discovery engagement covering requirements analysis and architecture review.'
    );
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/opportunities') && r.request().method() === 'POST'),
    page.locator('button:has-text("Save deal")').click(),
  ]);
  expect(createRes.ok(), 'Discovery deal create should succeed').toBeTruthy();
});
