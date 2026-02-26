import { test } from '@playwright/test';
const UI = process.env.E2E_BASE_URL ?? 'http://localhost:4201';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser0503@outlook.com',password:'yAsh@123'}}); const b=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');}, b.accessToken);} 

test('dump vite overlay', async ({page,request}) => {
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  page.on('console', m => console.log('CONSOLE', m.type(), m.text()));
  await login(page, request);
  await page.goto(`${UI}/app/leads/3b104395-182e-4836-8cce-ae2237928031/edit`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  const txt = await page.evaluate(() => {
    const el = document.querySelector('vite-error-overlay') as any;
    return el?.shadowRoot?.textContent || null;
  });
  console.log('OVERLAY', txt);
});
