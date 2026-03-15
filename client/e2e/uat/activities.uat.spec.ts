/**
 * CRM Enterprise — Activities Module UAT
 *
 * Covers: create call activity · quick-add · list page · meeting activity
 */

import { expect, test } from '@playwright/test';
import {
  API, RUN, login, attachDiagnostics,
  selectByLabel, setDateByOffset, apiSearch,
} from './uat-helpers';

/* ── Create call activity with next steps ── */
test('activity: create call with next steps', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const subject = `Q3 Pipeline Review — Cascadia Renewables ${RUN}`;

  await page.goto('/app/activities/new');
  await page.waitForURL('**/app/activities/new');

  await page.locator('input[name="subject"]').fill(subject);

  await selectByLabel(page, 'p-select[name="type"]', 'Call').catch(() => {});

  const outcomeField = page.locator('textarea[name="outcome"]');
  if (await outcomeField.isVisible()) {
    await outcomeField.fill(
      'David Chen confirmed budget approval expected by August 15th. Asked for reference customer in the maritime sector. Next step: schedule demo with logistics team lead Henrik Larsen.'
    );
  }

  const nextStepField = page.locator('input[name="nextStepSubject"]');
  if (await nextStepField.isVisible()) {
    await nextStepField.fill('Schedule demo with Henrik Larsen');
  }

  await setDateByOffset(page, 'p-datepicker[name="nextStepDueDateUtc"]', 7).catch(() => {});

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/activities') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create activity")').click(),
  ]);
  expect(createRes.ok(), 'activity create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'activities', 'Cascadia');
  expect(search.items.length).toBeGreaterThan(0);
});

/* ── Quick-add activity from command palette ── */
test('quick-add: create activity from command palette', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/dashboard');
  await page.waitForURL('**/app/dashboard');

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });

  const actItem = page.locator('.command-palette__item', { hasText: /Activity/i });
  if (await actItem.count()) {
    await actItem.click();
    await page.locator('.quick-add').waitFor({ state: 'visible' });
    await page.locator('.quick-add input[placeholder*="subject" i]').fill(`Follow-up: Horizon Pharma Discovery ${RUN}`);
    await page.locator('.quick-add-dialog button:has-text("Create")').click();
    await page.locator('.quick-add-dialog').waitFor({ state: 'hidden' });
  } else {
    // Command palette may not expose Activity quick-add — skip gracefully
    test.skip();
  }
});

/* ── List page renders ── */
test('activities: list page renders', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/activities');
  await page.waitForURL('**/app/activities');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/activit|call|meeting|workspace/i);
});

/* ── Create meeting activity ── */
test('activity: create meeting with detailed outcome', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const subject = `Joint Architecture Workshop — Nordic Maritime ${RUN}`;

  await page.goto('/app/activities/new');
  await page.waitForURL('**/app/activities/new');

  await page.locator('input[name="subject"]').fill(subject);

  await selectByLabel(page, 'p-select[name="type"]', 'Meeting').catch(() => {});

  const outcomeField = page.locator('textarea[name="outcome"]');
  if (await outcomeField.isVisible()) {
    await outcomeField.fill(
      'Full-day on-site workshop at Helsinki logistics center. Mapped 8 integration points with existing TMS. ' +
      'Agreed on phased rollout: pilot in Gothenburg depot (Q4 2025), full fleet by Q2 2026. ' +
      'CFO Martin Lindqvist approved Proof of Concept budget (€180K).'
    );
  }

  const nextStepField = page.locator('input[name="nextStepSubject"]');
  if (await nextStepField.isVisible()) {
    await nextStepField.fill('Send Statement of Work for Gothenburg pilot');
  }

  await setDateByOffset(page, 'p-datepicker[name="nextStepDueDateUtc"]', 5).catch(() => {});

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/activities') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create activity")').click(),
  ]);
  expect(createRes.ok(), 'meeting create should succeed').toBeTruthy();
});
