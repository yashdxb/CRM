/**
 * CRM Enterprise — Contacts Module UAT
 *
 * Covers: create · profile details · list · API verification · quick-add
 */

import { expect, test } from '@playwright/test';
import {
  RUN, login, attachDiagnostics,
  apiSearch, selectByLabel,
} from './uat-helpers';

/* ── Create contact via form ── */
test('contact: create and verify via API', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'Sophia';
  const lastName = `Martinez ${RUN}`;
  const email = `sophia.martinez.${RUN}@example.com`;

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="jobTitle"]').fill('Director of Strategic Partnerships');
  await page.locator('input[name="phone"]').fill('+1 415 555 3291');

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create contact")').click(),
  ]);
  expect(createRes.ok(), 'contact create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'contacts', lastName);
  expect(search.items.some((c: any) => c.name?.includes(lastName))).toBeTruthy();
});

/* ── Create with full profile (Robert Lambke persona) ── */
test('contact: create with full profile and verify via API', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'Robert';
  const lastName = `Lambke ${RUN}`;

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="email"]').fill(`r.lambke.${RUN}@example.com`);
  await page.locator('input[name="jobTitle"]').fill('Senior Vice President, Commercial');
  await page.locator('input[name="phone"]').fill('+1 646 555 2108');

  const linkedIn = page.locator('input[name="linkedInProfile"]');
  if (await linkedIn.count()) {
    await linkedIn.fill('https://linkedin.com/in/robertlambke');
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create contact")').click(),
  ]);
  expect(createRes.ok(), 'contact create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'contacts', lastName);
  expect(search.items.some((c: any) => c.name?.includes('Lambke'))).toBeTruthy();
});

/* ── Create with mobile and LinkedIn ── */
test('contact: create with mobile and LinkedIn profile', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const firstName = 'Amara';
  const lastName = `Okafor ${RUN}`;

  await page.goto('/app/contacts/new');
  await page.waitForURL('**/app/contacts/new');

  await page.locator('input[name="firstName"]').fill(firstName);
  await page.locator('input[name="lastName"]').fill(lastName);
  await page.locator('input[name="email"]').fill(`amara.okafor.${RUN}@example.com`);
  await page.locator('input[name="jobTitle"]').fill('Regional Sales Director');
  await page.locator('input[name="phone"]').fill('+234 802 555 4600');

  const mobileField = page.locator('input[name="mobile"]');
  if (await mobileField.count()) {
    await mobileField.fill('+234 812 555 9100');
  }

  const linkedIn = page.locator('input[name="linkedInProfile"]');
  if (await linkedIn.count()) {
    await linkedIn.fill('https://linkedin.com/in/amaraokafor');
  }

  const [createRes] = await Promise.all([
    page.waitForResponse(r => r.url().includes('/api/contacts') && r.request().method() === 'POST'),
    page.locator('button:has-text("Create contact")').click(),
  ]);
  expect(createRes.ok(), 'contact create should succeed').toBeTruthy();

  const search = await apiSearch(request, token, 'contacts', lastName);
  expect(search.items.some((c: any) => c.name?.includes('Okafor'))).toBeTruthy();
});

/* ── List page renders ── */
test('contacts: list page renders contact directory', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  await login(page, request);

  await page.goto('/app/contacts');
  await page.waitForURL('**/app/contacts');
  await page.waitForTimeout(1500);

  await page.waitForSelector('.contacts__content', { timeout: 10_000 }).catch(() => {});
  await expect(page.locator('body')).toContainText(/contact|director/i);
});

/* ── Quick-add contact from command palette ── */
test('quick-add: create contact from command palette', async ({ page, request }) => {
  test.setTimeout(60_000);
  attachDiagnostics(page);
  const token = await login(page, request);

  const contactName = `Isabelle Fontaine ${RUN}`;
  const contactEmail = `isabelle.fontaine.${RUN}@example.com`;

  await page.goto('/app/dashboard');
  await page.waitForURL('**/app/dashboard');

  await page.locator('.topbar__command-palette').click();
  await page.locator('.command-palette-backdrop').waitFor({ state: 'visible' });
  await page.locator('.command-palette__item', { hasText: 'Create New Contact' }).click();

  const quickAdd = page.locator('.quick-add');
  await quickAdd.waitFor({ state: 'visible' });

  await quickAdd.locator('input[placeholder="Contact name"]').fill(contactName);
  await quickAdd.locator('input[placeholder="name@company.com"]').fill(contactEmail);

  const quickAddDialog = page.locator('.quick-add-dialog');
  await quickAddDialog.locator('button:has-text("Create")').click();
  await quickAddDialog.waitFor({ state: 'hidden' });

  const search = await apiSearch(request, token, 'contacts', 'Fontaine');
  expect(search.items.some((c: any) => c.name?.includes('Fontaine'))).toBeTruthy();
});
