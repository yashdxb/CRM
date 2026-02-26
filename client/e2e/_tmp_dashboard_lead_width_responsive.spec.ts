import { test, expect } from '@playwright/test';

const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_SALES_REP_EMAIL ?? 'yasser0503@outlook.com';
const PASSWORD = process.env.E2E_SALES_REP_PASSWORD ?? 'yAsh@123';
const LEAD_ID = '3b104395-182e-4836-8cce-ae2237928031';

async function login(page: any, request: any) {
  const resp = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const json = await resp.json();
  if (!resp.ok() || !json?.accessToken) throw new Error(`Login failed ${resp.status()}`);
  await page.addInitScript((token: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('tenant_key', 'default');
  }, json.accessToken);
}

async function measure(page: any, selector: string) {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel) as HTMLElement | null;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), width: Math.round(r.width), right: Math.round(r.right) };
  }, selector);
}

test('dashboard and lead containers are full-width lane and responsive', async ({ page, request }) => {
  await login(page, request);

  for (const vp of [
    { name: 'desktop', width: 1600, height: 900 },
    { name: 'tablet', width: 834, height: 1194 },
    { name: 'mobile', width: 390, height: 844 }
  ]) {
    await page.setViewportSize({ width: vp.width, height: vp.height });

    await page.goto(`${BASE}/app/dashboard`, { waitUntil: 'networkidle' });
    const dashboard = {
      pageContainer: await measure(page, '.dashboard.page-container, .page-container.dashboard'),
      pageContent: await measure(page, '.page-content'),
      docScrollW: await page.evaluate(() => document.documentElement.scrollWidth),
      bodyScrollW: await page.evaluate(() => document.body.scrollWidth),
      viewportW: await page.evaluate(() => window.innerWidth)
    };

    await page.goto(`${BASE}/app/leads/${LEAD_ID}/edit`, { waitUntil: 'networkidle' });
    const lead = {
      headerContent: await measure(page, '.header-content'),
      formContainer: await measure(page, '.form-container'),
      relatedSummary: await measure(page, '.related-summary'),
      docScrollW: await page.evaluate(() => document.documentElement.scrollWidth),
      bodyScrollW: await page.evaluate(() => document.body.scrollWidth),
      viewportW: await page.evaluate(() => window.innerWidth)
    };

    console.log(vp.name, JSON.stringify({ dashboard, lead }));
    expect(dashboard.docScrollW).toBeLessThanOrEqual(vp.width);
    expect(lead.docScrollW).toBeLessThanOrEqual(vp.width);

    await page.screenshot({ path: `output/playwright/${vp.name}-dashboard-lead-width-check.png`, fullPage: false });
  }
});
