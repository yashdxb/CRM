import { test, expect } from '@playwright/test';
const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
const EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'yasser.ahamed@live.com';
const PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'yAsh@123';
async function apiLogin(page:any, request:any){
  const r = await request.post(`${API}/api/auth/login`, { headers: {'Content-Type':'application/json','X-Tenant-Key':'default'}, data: { email: EMAIL, password: PASSWORD } });
  expect(r.ok()).toBeTruthy();
  const b = await r.json();
  await page.addInitScript((t:string)=>{ localStorage.setItem('auth_token', t); localStorage.setItem('tenant_key','default'); }, b.accessToken);
}

test('footer sticky dark glass', async ({ page, request }) => {
  await apiLogin(page, request);
  await page.goto(`${UI}/app/dashboard`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const footer = page.locator('footer.app-footer');
  await expect(footer).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const metrics = await page.evaluate(() => {
    const el = document.querySelector('footer.app-footer') as HTMLElement | null;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), bottom: Math.round(r.bottom),
      viewportH: window.innerHeight,
      position: cs.position,
      bg: cs.backgroundImage,
      color: cs.color,
      stickyAtBottom: Math.abs(Math.round(r.bottom) - window.innerHeight) <= 16
    };
  });
  console.log('FOOTER_METRICS', JSON.stringify(metrics));
  await page.screenshot({ path: 'output/playwright/footer-sticky-dark-glass.png', fullPage: false });
});
