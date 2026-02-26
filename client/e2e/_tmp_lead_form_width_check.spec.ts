import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://localhost:4201';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('lead form width visual check', async ({page,request})=>{
 await login(page,request);
 await page.goto(`${BASE}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`,{waitUntil:'domcontentloaded'});
 await page.locator('form.lead-form').waitFor();
 const dims = await page.evaluate(()=>{
  const form = document.querySelector('.form-container') as HTMLElement | null;
  const header = document.querySelector('.header-content') as HTMLElement | null;
  const section = document.querySelector('.section-block') as HTMLElement | null;
  return {
   viewport: window.innerWidth,
   formWidth: form?.getBoundingClientRect().width,
   headerWidth: header?.getBoundingClientRect().width,
   sectionWidth: section?.getBoundingClientRect().width
  };
 });
 console.log('WIDTHS=', JSON.stringify(dims));
 await page.screenshot({path:'output/playwright/lead-form-width-after-tweak.png', fullPage:true});
});
