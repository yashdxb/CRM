import { test, expect } from '@playwright/test';

const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';

async function apiLogin(page:any, request:any) {
  const r = await request.post(`${API}/api/auth/login`, {
    headers: { 'Content-Type': 'application/json', 'X-Tenant-Key': 'default' },
    data: { email: EMAIL, password: PASSWORD }
  });
  expect(r.ok()).toBeTruthy();
  const b = await r.json();
  await page.addInitScript((t:string) => {
    localStorage.setItem('auth_token', t);
    localStorage.setItem('tenant_key', 'default');
  }, b.accessToken);
}

test('topbar thin verify', async ({ page, request }) => {
  await apiLogin(page, request);
  await page.goto(`${UI}/app/dashboard`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const topbar = page.locator('app-topbar .topbar');
  await expect(topbar).toBeVisible();
  const box = await topbar.boundingBox();
  const metrics = await page.evaluate(() => {
    const topbar = document.querySelector('app-topbar .topbar') as HTMLElement | null;
    const title = document.querySelector('app-topbar .brand-title') as HTMLElement | null;
    const subtitle = document.querySelector('app-topbar .brand-subtitle') as HTMLElement | null;
    const badge = document.querySelector('app-notification-center .notification-trigger .badge') as HTMLElement | null;
    const btn = document.querySelector('app-notification-center .notification-trigger') as HTMLElement | null;
    const bb = badge?.getBoundingClientRect();
    const tb = btn?.getBoundingClientRect();
    return {
      topbarHeight: topbar ? Math.round(topbar.getBoundingClientRect().height) : null,
      titleText: title?.textContent?.trim() ?? null,
      subtitleVisible: !!subtitle && getComputedStyle(subtitle).display !== 'none',
      badgeText: badge?.textContent?.trim() ?? null,
      badgeRect: bb ? { x: bb.x, y: bb.y, w: bb.width, h: bb.height, right: bb.right } : null,
      bellRect: tb ? { x: tb.x, y: tb.y, w: tb.width, h: tb.height, right: tb.right } : null,
      badgeClippedRight: !!(bb && tb && bb.right > tb.right)
    };
  });
  console.log('TOPBAR_METRICS', JSON.stringify({ box, metrics }));
  await page.screenshot({ path: 'output/playwright/topbar-thin-verify.png', fullPage: false });
});
