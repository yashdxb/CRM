import { test, expect } from '@playwright/test';

const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:4200';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function login(page:any, request:any) {
  const resp = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  const body = await resp.json();
  if (!resp.ok() || !body?.accessToken) throw new Error(`login failed ${resp.status()}`);
  await page.addInitScript((token) => {
    localStorage.setItem('auth_token', token as string);
    localStorage.setItem('tenant_key', 'default');
  }, body.accessToken);
}

test('topbar shows logo and stays thin', async ({ page, request }) => {
  await login(page, request);
  await page.goto(`${BASE}/app/dashboard`, { waitUntil: 'domcontentloaded' });
  const topbar = page.locator('header.topbar');
  await expect(topbar).toBeVisible();
  const logo = page.locator('.topbar__logo');
  await expect(logo).toBeVisible();
  await expect(page.locator('.topbar__title')).toHaveCount(0);

  const metrics = await page.evaluate(() => {
    const topbar = document.querySelector('header.topbar') as HTMLElement | null;
    const logo = document.querySelector('.topbar__logo') as HTMLImageElement | null;
    const cs = topbar ? getComputedStyle(topbar) : null;
    return {
      topbarHeight: topbar?.getBoundingClientRect().height ?? 0,
      topbarPosition: cs?.position,
      topbarTop: cs?.top,
      logoH: logo?.getBoundingClientRect().height ?? 0,
      logoW: logo?.getBoundingClientRect().width ?? 0
    };
  });
  console.log('TOPBAR_METRICS=', metrics);

  await page.screenshot({ path: 'output/playwright/topbar-logo-verify.png', fullPage: false });
});
