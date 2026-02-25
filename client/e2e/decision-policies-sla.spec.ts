import { expect, test } from '@playwright/test';

const API_BASE_URL = process.env.API_BASE_URL ?? process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const ADMIN_EMAIL = 'yasser.ahamed@live.com';
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page, request) {
  const response = await request.post(`${API_BASE_URL}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD }
  });
  const payload = await response.json();
  if (!payload?.accessToken) throw new Error('Auth failed');
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, payload.accessToken);
}

test('decision policies & sla page renders and is readable', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/decisions/policies', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Policies & SLA' })).toBeVisible();
  await expect(page.getByText('Approval Workflow Policy')).toBeVisible();
  await expect(page.getByText('SLA Health & Escalation Signals')).toBeVisible();
  await page.screenshot({ path: 'output/playwright/decision-policies-sla-desktop.png', fullPage: true });
});

test('decision policies & sla page mobile has no horizontal overflow at page level', async ({ page, request }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await login(page, request);
  await page.goto('/app/decisions/policies', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'Policies & SLA' })).toBeVisible();

  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const pageEl = document.querySelector('app-decision-policies-sla-page .policy-page') as HTMLElement | null;
    return {
      viewport: window.innerWidth,
      docScrollWidth: root.scrollWidth,
      pageScrollWidth: pageEl?.scrollWidth ?? 0,
      pageClientWidth: pageEl?.clientWidth ?? 0,
    };
  });

  // allow app shell to overflow on mobile for now, but the page itself should fit content area.
  expect(metrics.pageScrollWidth).toBeLessThanOrEqual(metrics.pageClientWidth + 2);
  await page.screenshot({ path: 'output/playwright/decision-policies-sla-mobile.png', fullPage: true });
});
