import { test } from '@playwright/test';
const API = process.env.E2E_API_URL ?? 'http://127.0.0.1:5014';
async function login(page:any, request:any){const r=await request.post(`${API}/api/auth/login`,{headers:{'Content-Type':'application/json','X-Tenant-Key':'default'},data:{email:'yasser.ahamed@live.com',password:'yAsh@123'}}); const p=await r.json(); await page.addInitScript((t:string)=>{localStorage.setItem('auth_token',t);localStorage.setItem('tenant_key','default');}, p.accessToken);} 

test('inspect roles hierarchy dom', async ({page, request})=>{
 await login(page, request);
 await page.goto('/app/settings/roles', {waitUntil:'networkidle'});
 await page.getByRole('button', { name: /Hierarchy/i }).click();
 await page.waitForTimeout(1500);
 const info = await page.evaluate(() => ({
   wrapper: !!document.querySelector('.orgchart-wrapper'),
   orgNodeCount: document.querySelectorAll('.org-node').length,
   pNodeCount: document.querySelectorAll('.p-organizationchart-node-content').length,
   text: (document.querySelector('.orgchart-wrapper') as HTMLElement | null)?.innerText?.slice(0,500) ?? ''
 }));
 console.log('INFO', JSON.stringify(info));
 await page.screenshot({ path: 'output/playwright/roles-hierarchy-inspect.png', fullPage: true });
});
