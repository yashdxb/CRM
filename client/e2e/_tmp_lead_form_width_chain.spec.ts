import { test } from '@playwright/test';
const API='http://127.0.0.1:5014'; const BASE='http://127.0.0.1:4204';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t)=>{localStorage.setItem('auth_token',t as string); localStorage.setItem('tenant_key','default');},p.accessToken);} 

test('lead form width chain', async ({page,request})=>{
 await login(page,request);
 await page.goto(`${BASE}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`,{waitUntil:'domcontentloaded'});
 await page.locator('form.lead-form').waitFor();
 const dims = await page.evaluate(() => {
   const sels = ['main.content','.lead-form-page','.page-header','.header-content','.form-container','form.lead-form','.section-block'];
   const out:any = {};
   for (const s of sels) {
     const el = document.querySelector(s) as HTMLElement | null;
     out[s] = el ? { w: el.getBoundingClientRect().width, mw: getComputedStyle(el).maxWidth, p: getComputedStyle(el).padding } : null;
   }
   return out;
 });
 console.log(JSON.stringify(dims, null, 2));
});
