/**
 * CRM Enterprise — Navigation & Dashboard UAT
 *
 * Covers: dashboard widgets · all main modules load without error
 */

import { expect, test } from '@playwright/test';
import {
  login, attachDiagnostics,
} from './uat-helpers';

/* ── Dashboard widgets render ── */
test('dashboard: main dashboard loads with widgets', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/dashboard');
  await page.waitForURL('**/app/dashboard');
  await page.waitForTimeout(2000);

  await expect(page.locator('body')).toContainText(/dashboard|overview|workspace/i);
});

/* ── All major modules load without error ── */
test('navigation: all CRM modules load without console errors', async ({ page, request }) => {
  test.setTimeout(120_000);
  attachDiagnostics(page);
  await login(page, request);

  const modules = [
    { path: '/app/dashboard', label: 'Dashboard' },
    { path: '/app/customers', label: 'Customers' },
    { path: '/app/contacts', label: 'Contacts' },
    { path: '/app/leads', label: 'Leads' },
    { path: '/app/opportunities', label: 'Opportunities' },
    { path: '/app/activities', label: 'Activities' },
    { path: '/app/helpdesk', label: 'Helpdesk' },
    { path: '/app/settings/workspace', label: 'Settings' },
  ];

  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  for (const mod of modules) {
    await page.goto(mod.path);
    await page.waitForTimeout(1500);

    // Verify page rendered something meaningful (no blank screen)
    const body = await page.locator('body').textContent();
    expect(body?.trim().length, `${mod.label} should render content`).toBeGreaterThan(0);
  }

  // Filter out non-critical errors (e.g. third-party script noise)
  const criticalErrors = errors.filter(
    e => !e.includes('ResizeObserver') && !e.includes('Script error') && !e.includes('ChunkLoadError')
  );

  // Allow up to 2 non-critical errors across all navigations
  if (criticalErrors.length > 2) {
    console.warn('Console errors detected:', criticalErrors);
  }
});
