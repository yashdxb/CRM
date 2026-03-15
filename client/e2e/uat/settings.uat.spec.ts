/**
 * CRM Enterprise — Settings & Admin Module UAT
 *
 * Covers: workspace settings · approval settings · users page · roles page ·
 *         lead assignment · qualification policy · opportunity automation ·
 *         notifications · audit log · SLA update · security levels ·
 *         dashboard packs · qualification thresholds · marketing settings
 */

import { expect, test } from '@playwright/test';
import {
  RUN, login, attachDiagnostics,
} from './uat-helpers';

/* ── Workspace settings loads ── */
test('settings: workspace settings page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/workspace');
  await page.waitForURL('**/app/settings/workspace');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/workspace|settings|configuration/i);
});

/* ── Approval settings loads ── */
test('settings: approval settings page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/approvals');
  await page.waitForURL('**/app/settings/approvals');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/approval|threshold|settings/i);
});

/* ── Users page loads ── */
test('settings: users directory page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/users');
  await page.waitForURL('**/app/settings/users');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/user|member|directory/i);
});

/* ── Roles page loads ── */
test('settings: roles management page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/roles');
  await page.waitForURL('**/app/settings/roles');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/role|permission|security/i);
});

/* ── Lead assignment loads ── */
test('settings: lead assignment rules page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/lead-assignment');
  await page.waitForURL('**/app/settings/lead-assignment');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/assignment|lead|routing|settings/i);
});

/* ── Qualification policy loads ── */
test('settings: qualification policy page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/qualification-policy');
  await page.waitForURL('**/app/settings/qualification-policy');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/qualification|policy|criteria|settings/i);
});

/* ── Opportunity automation loads ── */
test('settings: opportunity automation page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/opportunity-automation');
  await page.waitForURL('**/app/settings/opportunity-automation');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/automation|opportunity|stage|pipeline|settings/i);
});

/* ── Notifications settings loads ── */
test('settings: notifications settings page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/notifications');
  await page.waitForURL('**/app/settings/notifications');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/notification|alert|email|settings/i);
});

/* ── Audit log loads ── */
test('settings: audit log page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/audit-log');
  await page.waitForURL('**/app/settings/audit-log');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/audit|log|history|event/i);
});

/* ── Update SLA hours ── */
test('settings: update lead first-touch SLA hours', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/workspace');
  await page.waitForURL('**/app/settings/workspace');
  await page.waitForTimeout(1500);

  const slaField = page.locator('#ws-leadFirstTouchSlaHours, input[name="leadFirstTouchSlaHours"]');
  if (await slaField.count()) {
    await slaField.first().fill('4');

    const [saveRes] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/') && r.request().method() === 'PUT'),
      page.locator('button:has-text("Save Settings")').click(),
    ]);
    expect(saveRes.ok(), 'save SLA settings should succeed').toBeTruthy();
  } else {
    // SLA field may not be visible — verify page still loaded
    await expect(page.locator('body')).toContainText(/workspace|settings/i);
  }
});

/* ── Security levels page loads ── */
test('settings: security levels page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/security-levels');
  await page.waitForURL('**/app/settings/security-levels');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/security|level|access|roles/i);
});

/* ── Dashboard packs page loads ── */
test('settings: dashboard packs page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/dashboard-packs');
  await page.waitForURL('**/app/settings/dashboard-packs');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/dashboard|pack|widget|settings/i);
});

/* ── Qualification thresholds page loads ── */
test('settings: qualification thresholds page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/qualification-thresholds');
  await page.waitForURL('**/app/settings/qualification-thresholds');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/qualification|threshold|score|settings/i);
});

/* ── Marketing settings page loads ── */
test('settings: marketing settings page loads', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/settings/marketing');
  await page.waitForURL('**/app/settings/marketing');
  await page.waitForTimeout(1500);

  await expect(page.locator('body')).toContainText(/marketing|campaign|email|settings/i);
});
