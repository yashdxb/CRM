/**
 * CRM Enterprise — Customers Module UAT
 *
 * Covers: create · edit · search · list · bulk · delete
 */

import { expect, test } from '@playwright/test';
import {
  API, RUN, login, attachDiagnostics, headers,
  searchWith, apiPost, apiGet, apiSearch,
} from './uat-helpers';

/* ── Create customer via UI ── */
test('customer: create via form and verify on list', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const name = `Meridian Health Partners ${RUN}`;
  const phone = '+1 212 555 8740';
  const email = `intake@meridianhealth-${RUN}.example.com`;

  await page.goto('/app/customers/new');
  await page.waitForURL('**/app/customers/new');

  await page.locator('input[name="name"]').fill(name);
  await page.locator('input[name="phone"]').fill(phone);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="industry"]').fill('Healthcare');
  await page.locator('input[name="website"]').fill('https://meridianhealth.example.com');
  await page.locator('textarea[name="description"]').fill(
    'Regional health network with 14 clinics across the tri-state area. Primary focus on outpatient services and preventive care programs.',
  );

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/customers') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create customer")').click(),
  ]);
  expect(createRes.ok(), 'customer create should succeed').toBeTruthy();

  await page.goto('/app/customers');
  await searchWith(page, '.search-input', name);
  await expect(page.locator('.data-table')).toContainText(name);
});

/* ── API create → UI edit ── */
test('customer: API create then edit via UI', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const name = `Northshore Capital Advisors ${RUN}`;

  const createRes = await apiPost(request, token, `${API}/api/customers`, {
    name,
    industry: 'Financial Services',
    phone: '+1 312 555 6120',
    website: 'https://northshorecapital.example.com',
    description: 'Boutique investment advisory firm managing $1.2B in assets across institutional clients.',
  });
  expect(createRes.ok()).toBeTruthy();
  const created = await createRes.json();
  const customerId = created.id;
  expect(customerId).toBeTruthy();

  await page.goto(`/app/customers/${customerId}/edit`);
  await page.waitForURL(`**/app/customers/${customerId}/edit`);

  const descField = page.locator('textarea[name="description"]');
  await descField.waitFor({ state: 'visible' });
  await descField.fill(
    'Boutique investment advisory firm managing $1.8B in assets. Recently expanded into ESG-focused fund management with 3 new mandates.',
  );

  const [updateRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes(`/api/customers/${customerId}`) && r.request().method() === 'PUT'),
    page.locator('button:has-text("Update customer")').click(),
  ]);
  expect(updateRes.ok(), 'customer update should succeed').toBeTruthy();
});

/* ── Bulk creation and list verification ── */
test('customer: bulk API creation and list verification', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const companies = [
    { name: `Pinnacle Construction Group ${RUN}`, industry: 'Construction' },
    { name: `Verdant Agriculture Holdings ${RUN}`, industry: 'Agriculture' },
    { name: `Summit Aerospace Technologies ${RUN}`, industry: 'Aerospace' },
  ];

  for (const company of companies) {
    const res = await apiPost(request, token, `${API}/api/customers`, {
      name: company.name,
      industry: company.industry,
      description: 'Enterprise account created during comprehensive validation run.',
    });
    expect(res.ok(), `create ${company.name} should succeed`).toBeTruthy();
  }

  await page.goto('/app/customers');
  await page.waitForURL('**/app/customers');
  await searchWith(page, '.search-input', `Pinnacle Construction Group ${RUN}`);
  await expect(page.locator('.data-table')).toContainText('Pinnacle Construction Group');
});

/* ── Create with full profile ── */
test('customer: create with full profile details', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  const name = `Oakhaven Pharmaceuticals ${RUN}`;

  await page.goto('/app/customers/new');
  await page.waitForURL('**/app/customers/new');

  await page.locator('input[name="name"]').fill(name);
  await page.locator('input[name="industry"]').fill('Pharmaceuticals');
  await page.locator('input[name="phone"]').fill('+41 44 555 7830');
  await page.locator('input[name="email"]').fill(`procurement@oakhaven-${RUN}.example.com`);
  await page.locator('input[name="website"]').fill('https://oakhaven-pharma.example.com');
  await page.locator('textarea[name="description"]').fill(
    'Swiss-based pharmaceutical company specializing in rare disease therapeutics. FDA-approved pipeline includes 4 compounds in Phase III trials.',
  );

  try {
    const { selectByLabel } = await import('./uat-helpers');
    await selectByLabel(page, 'p-select[name="lifecycleStage"]', 'Customer');
  } catch { /* lifecycle stage dropdown may not be present */ }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/customers') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create customer")').click(),
  ]);
  expect(createRes.ok(), 'customer create should succeed').toBeTruthy();
});

/* ── API create → delete → verify gone ── */
test('customer: API create then delete and verify removal', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const name = `Ephemeral Ventures Corp ${RUN}`;

  const createRes = await apiPost(request, token, `${API}/api/customers`, {
    name,
    industry: 'Technology',
  });
  expect(createRes.ok()).toBeTruthy();
  const { id } = await createRes.json();

  const deleteRes = await request.delete(`${API}/api/customers/${id}`, {
    headers: headers(token, false),
  });
  expect(deleteRes.ok(), 'customer delete should succeed').toBeTruthy();

  const getRes = await apiGet(request, token, `${API}/api/customers/${id}`);
  expect(getRes.status()).toBe(404);
});
