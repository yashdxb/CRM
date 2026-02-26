import { test } from '@playwright/test';
const API='http://127.0.0.1:5014';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');}, p.accessToken);} 

test('topbar and footer fixed', async ({page,request})=>{
  await login(page,request);
  await page.goto('/app/dashboard',{waitUntil:'networkidle'});
  const before = await page.evaluate(() => {
    const top = document.querySelector('app-topbar .topbar') as HTMLElement | null;
    const footer = document.querySelector('.app-footer') as HTMLElement | null;
    const content = document.querySelector('.content') as HTMLElement | null;
    const topRect = top?.getBoundingClientRect();
    const footerRect = footer?.getBoundingClientRect();
    return {
      topPos: top ? getComputedStyle(top).position : null,
      footerPos: footer ? getComputedStyle(footer).position : null,
      topTop: topRect?.top ?? null,
      footerBottomDelta: footerRect ? Math.round(window.innerHeight - footerRect.bottom) : null,
      contentTop: content?.getBoundingClientRect().top ?? null
    };
  });
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(300);
  const after = await page.evaluate(() => {
    const top = document.querySelector('app-topbar .topbar') as HTMLElement | null;
    const footer = document.querySelector('.app-footer') as HTMLElement | null;
    const topRect = top?.getBoundingClientRect();
    const footerRect = footer?.getBoundingClientRect();
    return {
      topTop: topRect?.top ?? null,
      footerBottomDelta: footerRect ? Math.round(window.innerHeight - footerRect.bottom) : null
    };
  });
  console.log('FIXED_CHECK', JSON.stringify({before, after}));
  await page.screenshot({ path: 'output/playwright/top-footer-fixed-verify.png', fullPage: true });
});
