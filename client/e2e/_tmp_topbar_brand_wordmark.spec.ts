import { test } from '@playwright/test';
const API='http://127.0.0.1:5014';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');}, p.accessToken);} 

test('topbar wordmark with crm breathing chip', async ({ page, request }) => {
  await login(page, request);
  await page.goto('/app/dashboard', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const top = document.querySelector('app-topbar .topbar') as HTMLElement | null;
    const brand = document.querySelector('app-topbar .topbar__brand') as HTMLElement | null;
    const main = document.querySelector('app-topbar .topbar__brand-main') as HTMLElement | null;
    const crm = document.querySelector('app-topbar .topbar__brand-crm') as HTMLElement | null;
    const logo = document.querySelector('app-topbar .topbar__logo') as HTMLElement | null;
    const crmStyle = crm ? getComputedStyle(crm) : null;
    return {
      topbarHeight: top ? Math.round(top.getBoundingClientRect().height) : null,
      brandText: brand?.textContent?.replace(/\s+/g,' ').trim() ?? null,
      mainText: main?.textContent?.trim() ?? null,
      crmText: crm?.textContent?.trim() ?? null,
      logoExists: !!logo,
      crmAnimationName: crmStyle?.animationName ?? null,
      crmBg: crmStyle?.backgroundImage ?? null,
      topbarPos: top ? getComputedStyle(top).position : null
    };
  });
  console.log('TOPBAR_BRAND_CHECK', JSON.stringify(info));
  await page.screenshot({ path: 'output/playwright/topbar-wordmark-crm-breathe.png', fullPage: false });
});
