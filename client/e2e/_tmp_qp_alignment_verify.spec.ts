import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('qualification policy container alignment', async ({ page, request }) => {
  await login(page, request);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto(`${BASE}/app/settings/qualification-policy`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const m = await page.evaluate(() => {
    const r = (s:string) => (document.querySelector(s) as HTMLElement | null)?.getBoundingClientRect() ?? null;
    const hero = r('app-qualification-policy-page .hero-section');
    const data = r('app-qualification-policy-page .data-card');
    return {
      hero: hero ? { x: hero.x, width: hero.width, right: hero.right } : null,
      data: data ? { x: data.x, width: data.width, right: data.right } : null,
      deltaLeft: hero && data ? Math.round((data.x - hero.x) * 100) / 100 : null,
      deltaRight: hero && data ? Math.round((hero.right - data.right) * 100) / 100 : null
    };
  });
  console.log('ALIGN=', JSON.stringify(m));
  await page.screenshot({ path: 'output/playwright/qualification-policy-alignment-fix.png', fullPage: false });
});
