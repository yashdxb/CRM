/**
 * CRM Enterprise — Shared UAT Helpers
 *
 * Reusable constants, authentication, PrimeNG selectors, date helpers, and
 * API utilities shared across all module-level UAT spec files.
 *
 * IMPORTANT:
 *   • All emails use "@example.com" (RFC 2606 — guaranteed non-deliverable).
 *   • No real email-send endpoints are invoked.
 */

import { expect, type APIRequestContext, type Page } from '@playwright/test';

/* ──────────────────────── constants ──────────────────────── */

export const API   = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
export const BASE  = process.env.E2E_BASE_URL ?? 'https://www.northedgesystem.com';
export const ADMIN_EMAIL    = process.env.E2E_ADMIN_EMAIL    ?? 'yasser.ahamed@live.com';
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
export const TENANT = 'default';

/** Short unique suffix to prevent name collisions across runs */
export const RUN = Date.now().toString(36).slice(-5);

/* ──────────────────────── auth ──────────────────────── */

export function headers(token: string, json = true) {
  const h: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'X-Tenant-Key': TENANT,
  };
  if (json) h['Content-Type'] = 'application/json';
  return h;
}

let cachedToken: string | null = null;

export async function login(page: Page, request: APIRequestContext): Promise<string> {
  if (cachedToken) {
    await page.addInitScript((token: string) => {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('tenant_key', 'default');
    }, cachedToken);
    return cachedToken;
  }

  const res = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': TENANT },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  });
  const body = await res.json();
  if (!body?.accessToken) throw new Error('Login failed — no accessToken returned');

  cachedToken = body.accessToken;
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, cachedToken);

  return cachedToken!;
}

export async function getOwnerId(request: APIRequestContext, token: string): Promise<string> {
  const res = await request.get(`${API}/api/users/lookup?max=1`, {
    headers: headers(token, false),
  });
  expect(res.ok(), 'user lookup should succeed').toBeTruthy();
  const users = await res.json();
  expect(users.length).toBeGreaterThan(0);
  return users[0].id;
}

/* ──────────────────────── diagnostics ──────────────────────── */

export function attachDiagnostics(page: Page) {
  page.on('pageerror', (err: Error) => console.log('[pageerror]', err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console.error]', msg.text());
  });
  page.on('requestfailed', (req) => {
    if (req.url().includes('/api/')) {
      console.log('[request-failed]', req.method(), req.url(), req.failure()?.errorText);
    }
  });
}

/* ──────────────────────── PrimeNG select ──────────────────────── */

export async function openSelect(page: Page, selector: string) {
  const selectHost = page.locator(selector);
  const trigger = selectHost.locator('.p-select');
  if (await trigger.count()) {
    await trigger.click();
  } else {
    await selectHost.click();
  }
}

export async function selectByLabel(page: Page, selector: string, optionText: string) {
  await openSelect(page, selector);
  const options = page.locator(
    '.p-select-panel .p-select-item, .p-select-overlay .p-select-item, .p-overlay .p-select-item, [role="option"]',
  );
  const option = options.filter({ hasText: optionText }).first();
  await option.waitFor({ state: 'visible', timeout: 5000 });
  await option.click({ force: true });
}

/* ──────────────────────── date picker ──────────────────────── */

export async function setDateByOffset(page: Page, selector: string, offsetDays: number) {
  const input = page.locator(`${selector} input`);
  await input.waitFor({ state: 'visible' });
  await input.click();

  const target = new Date(Date.now() + offsetDays * 86_400_000);
  const targetDay = target.getDate();
  const targetMonth = target.getMonth();
  const targetYear = target.getFullYear();

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  const dialog = page.getByRole('dialog', { name: 'Choose Date' });
  await dialog.waitFor({ state: 'visible' });

  for (let i = 0; i < 12; i++) {
    const mText = (await dialog.locator('button[aria-label="Choose Month"]').innerText()).trim();
    const yText = (await dialog.locator('button[aria-label="Choose Year"]').innerText()).trim();
    if (monthNames.indexOf(mText) === targetMonth && Number(yText) === targetYear) break;
    await dialog.getByRole('button', { name: 'Next Month' }).click();
    await page.waitForTimeout(150);
  }

  await dialog.getByRole('gridcell', { name: String(targetDay) }).first().click();
  await input.press('Tab');
}

/* ──────────────────────── search ──────────────────────── */

export async function searchWith(page: Page, selector: string, term: string) {
  const input = page.locator(selector);
  await input.waitFor({ state: 'visible' });
  await input.fill(term);
  await page.waitForTimeout(400);
}

/* ──────────────────────── API utilities ──────────────────────── */

export async function apiPost(request: APIRequestContext, token: string, url: string, data: any) {
  return request.post(url, { headers: headers(token), data });
}

export async function apiGet(request: APIRequestContext, token: string, url: string) {
  return request.get(url, { headers: headers(token, false) });
}

export async function apiSearch(
  request: APIRequestContext,
  token: string,
  endpoint: string,
  term: string,
) {
  const res = await apiGet(
    request,
    token,
    `${API}/api/${endpoint}?search=${encodeURIComponent(term)}&page=1&pageSize=10`,
  );
  if (!res.ok()) return { items: [] };
  const body = await res.json();
  return { items: Array.isArray(body?.items) ? body.items : [] };
}
