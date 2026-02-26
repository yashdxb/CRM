import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('qp width quick witness', async ({ page, request }) => {
  await login(page, request);
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.goto(`${BASE}/app/settings/qualification-policy`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const m = await page.evaluate(() => {
    const q = (s:string) => document.querySelector(s) as HTMLElement | null;
    const w = (s:string) => q(s)?.getBoundingClientRect().width ?? null;
    return {
      url: location.pathname,
      viewport: innerWidth,
      mainContentW: w('main.content'),
      pageContainerW: w('app-qualification-policy-page .page-container'),
      dataSectionW: w('app-qualification-policy-page .data-section'),
      settingsLayoutW: w('app-qualification-policy-page .settings-layout'),
      dataCardW: w('app-qualification-policy-page .data-card'),
      cols: (q('app-qualification-policy-page .settings-layout') ? getComputedStyle(q('app-qualification-policy-page .settings-layout')!).gridTemplateColumns : null),
      hasPolicyHeader: !!document.querySelector('app-qualification-policy-page .data-card .data-header')
    };
  });
  console.log('MEASURE=', JSON.stringify(m));
  await page.screenshot({ path: 'output/playwright/qualification-policy-gap-fixed-verify-wide.png', fullPage: false });
});
