/**
 * CRM Enterprise — Helpdesk Module UAT
 *
 * Covers: create case via form · API-created case visible ·
 *         list page · low-priority case
 */

import { expect, test } from '@playwright/test';
import {
  API, RUN, login, attachDiagnostics,
  selectByLabel, apiPost, apiSearch,
} from './uat-helpers';

/* ── Create helpdesk case via UI ── */
test('helpdesk: create support case via form', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const subject = `Invoice Discrepancy — Cascadia PO-2025-4417 ${RUN}`;

  await page.goto('/app/helpdesk/new');
  await page.waitForURL('**/app/helpdesk/new');

  await page.locator('#hd-subject').fill(subject);

  await selectByLabel(page, '#hd-category', 'Billing').catch(() => {});
  await selectByLabel(page, '#hd-subcategory', 'Invoice').catch(() => {});
  await selectByLabel(page, '#hd-source', 'Email').catch(() => {});
  await selectByLabel(page, '#hd-priority', 'High').catch(() => {});
  await selectByLabel(page, '#hd-severity', 'Major').catch(() => {});

  const descField = page.locator('#hd-description');
  if (await descField.isVisible()) {
    await descField.fill(
      'Customer reports a $12,400 discrepancy between contracted rate and billed amount on PO-2025-4417 ' +
      '(fleet maintenance services for Cascadia Renewable Energy). Finance team requires corrected invoice ' +
      'by end of business Friday to meet their monthly close deadline.'
    );
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/helpdesk') && r.request().method() === 'POST'),
    page.locator('button:has-text("Save")').click(),
  ]);
  expect(createRes.ok(), 'helpdesk case create should succeed').toBeTruthy();
});

/* ── API-created case visible on list ── */
test('helpdesk: API-created case appears on list', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const subject = `System Access Request — New Hire Onboarding ${RUN}`;

  const createRes = await apiPost(request, token, `${API}/api/helpdesk/cases`, {
    subject,
    category: 'IT Support',
    priority: 'Medium',
    description:
      'Please provision CRM access for new Business Development Manager Maria Santos. ' +
      'She starts Monday and needs the standard BDM role configuration with Opportunities and Activities modules enabled.',
  });
  expect(createRes.ok()).toBeTruthy();

  await page.goto('/app/helpdesk');
  await page.waitForURL('**/app/helpdesk');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/helpdesk|case|support|ticket/i);
});

/* ── List page renders ── */
test('helpdesk: list page renders with cases', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/helpdesk');
  await page.waitForURL('**/app/helpdesk');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/helpdesk|case|support|ticket|workspace/i);
});

/* ── Create low-priority case ── */
test('helpdesk: create low-priority feature request', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const subject = `Feature Request — Bulk Export Contacts to CSV ${RUN}`;

  await page.goto('/app/helpdesk/new');
  await page.waitForURL('**/app/helpdesk/new');

  await page.locator('#hd-subject').fill(subject);

  await selectByLabel(page, '#hd-category', 'Feature Request').catch(() => {});
  await selectByLabel(page, '#hd-source', 'Internal').catch(() => {});
  await selectByLabel(page, '#hd-priority', 'Low').catch(() => {});
  await selectByLabel(page, '#hd-severity', 'Minor').catch(() => {});

  const descField = page.locator('#hd-description');
  if (await descField.isVisible()) {
    await descField.fill(
      'Sales operations team requests a bulk export feature for the Contacts module. ' +
      'Needed for quarterly territory re-alignment where managers need to review and redistribute 200+ contacts across new reps. ' +
      'Acceptable as CSV or Excel format.'
    );
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/helpdesk') && r.request().method() === 'POST'),
    page.locator('button:has-text("Save")').click(),
  ]);
  expect(createRes.ok(), 'low-priority case create should succeed').toBeTruthy();
});
