import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const API = process.env.E2E_API_URL ?? 'http://localhost:5014';
const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
const TENANT = process.env.E2E_TENANT_KEY ?? 'default';
const OUT_DIR = path.resolve('..', 'output', 'playwright', 'demo-ui-audit');

async function login(page, request) {
  const response = await request.post(`${API}/api/auth/login`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Key': TENANT
    },
    data: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    }
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  await page.addInitScript(
    ([token, tenantKey]) => {
      localStorage.setItem('auth_token', token as string);
      localStorage.setItem('tenant_key', tenantKey as string);
    },
    [body.accessToken, TENANT]
  );
}

test('capture demo ui audit screens', async ({ page, request }) => {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await login(page, request);

  await page.setViewportSize({ width: 1600, height: 1000 });
  const demoLeadId = '54ea695b-ee08-4e9f-8b15-ff8ef7681721';

  await page.goto(`${BASE}/app/dashboard`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '01-dashboard.png'), fullPage: true });

  await page.goto(`${BASE}/app/risk-intelligence`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '02-risk-intelligence.png'), fullPage: true });

  await page.goto(`${BASE}/app/leads/${demoLeadId}/edit`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '03-lead-detail.png'), fullPage: true });

  await page.goto(`${BASE}/app/decisions/pending-action`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '04-decision-inbox.png'), fullPage: true });

  await page.goto(`${BASE}/app/reports`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '05-reports.png'), fullPage: true });

  await page.goto(`${BASE}/app/mailbox/inbox`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, '06-mailbox.png'), fullPage: true });
});
